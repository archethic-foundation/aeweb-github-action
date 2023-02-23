import Archethic, { Crypto, Utils } from 'archethic';
import AEWeb from 'aeweb';

import { normalizeFolderPath, getFolderFiles } from './file.js'
import { estimateTxsFees, getSeeds, sendTransactions, fetchLastRefTx } from './utils.js'

const { deriveAddress } = Crypto
const { originPrivateKey, fromBigInt, uint8ArrayToHex } = Utils

export async function handler(baseSeed, folderPath, endpoint) {
  const normalizedFolderPath = normalizeFolderPath(folderPath)

  // Initialize endpoint connection
  const normalizedEndpoint = new URL(endpoint).origin;
  const archethic = new Archethic(normalizedEndpoint)
  await archethic.connect()


  // Get seeds
  const { refSeed, filesSeed } = getSeeds(baseSeed)

  // Get genesis addresses
  const baseAddress = deriveAddress(baseSeed, 0)
  const refAddress = deriveAddress(refSeed, 0)
  const filesAddress = deriveAddress(filesSeed, 0)

  // Get the chains size
  const baseIndex = await archethic.transaction.getTransactionIndex(baseAddress)
  const refIndex = await archethic.transaction.getTransactionIndex(refAddress)
  let filesIndex = await archethic.transaction.getTransactionIndex(filesAddress)

  let isWebsiteUpdate = false
  let prevRefTxContent

  // Check if website is already deployed
  if ((refIndex) !== 0) {
    isWebsiteUpdate = true;
    const lastRefTx = await fetchLastRefTx(refAddress, archethic);
    prevRefTxContent = JSON.parse(lastRefTx.data.content);
  }

  const aeweb = new AEWeb(archethic, prevRefTxContent)

  // Convert directory structure into array of file content
  console.log('Creating file structure and compress content...')

  getFolderFiles(normalizedFolderPath).forEach(({ filePath, data }) => {
    aeweb.addFile(filePath, data)
  })

  console.log('Building files transactions...')

  let transactions;

  if (isWebsiteUpdate) {
    let modifiedFiles = aeweb.listModifiedFiles();
    let removedFiles = aeweb.listRemovedFiles();

    // Stop the action if not update is present
    if (!modifiedFiles.length && !removedFiles.length) {
      return;
    }
  }

  // when files changes does exist
  if (!isWebsiteUpdate || (aeweb.listModifiedFiles().length)) {
    // Sign files transactions
    transactions = aeweb.getFilesTransactions().map((tx, i) => {
      const index = filesIndex
      filesIndex++
      console.log(`Building file transaction (#${i + 1})`)
      return tx.build(filesSeed, index).originSign(originPrivateKey)
    })
  }

  console.log('Building reference transaction...')
  const refTx = await aeweb.getRefTransaction(transactions)
  // Sign ref transaction
  refTx.build(refSeed, refIndex).originSign(originPrivateKey)

  transactions.push(refTx)

  // Estimation of fees
  console.log('Estimate fees...')
  const { refTxFees, filesTxFees } = await estimateTxsFees(archethic, transactions)

  // Create transfer transaction to fund the chains
  console.log("Create funding transaction...")
  const transferTx = archethic.transaction.new()
    .setType('transfer')
    .addUCOTransfer(refAddress, refTxFees)

  //handle no new files tx, but update to ref tx
  if (filesTxFees) {
    transferTx.addUCOTransfer(filesAddress, filesTxFees)
  }

  transferTx.build(baseSeed, baseIndex).originSign(originPrivateKey)
  transactions.unshift(transferTx)

  const { fee, rates } = await archethic.transaction.getTransactionFee(transferTx)
  const fees = fromBigInt(fee + refTxFees + filesTxFees)

  console.log(`Total Fee Requirement would be: ${fees} UCO ($${(rates.usd * fees).toFixed(2)}) for ${transactions.length} transactions`)

  await sendTransactions(transactions, 0, normalizedEndpoint)
  console.log(`Website is deployed at: ${normalizedEndpoint}/api/web_hosting/${uint8ArrayToHex(refAddress)}/`)
}
