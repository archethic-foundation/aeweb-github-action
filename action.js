import Archethic, { Crypto, Utils } from 'archethic';
import AEWeb from 'aeweb';

import { normalizeFolderPath, getFolderFiles } from './file.js'
import { estimateTxsFees, getSeeds, sendTransactions } from './utils.js'

const { deriveAddress } = Crypto
const { originPrivateKey, fromBigInt, uint8ArrayToHex } = Utils

export async function handler(baseSeed, folderPath, endpoint) {
  const normalizedFolderPath = normalizeFolderPath(folderPath)

  // Initialize endpoint connection
  const normalizedEndpoint = new URL(endpoint).origin;
  const archethic = new Archethic(normalizedEndpoint)
  await archethic.connect()

  const aeweb = new AEWeb(archethic)

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

  // Convert directory structure into array of file content
  console.log('Creating file structure and compress content...')

  getFolderFiles(normalizedFolderPath).forEach(({ filePath, data}) => {
    aeweb.addFile(filePath, data)
  })

  console.log('Building files transactions...')

  // Sign files transactions
  const transactions = aeweb.getFilesTransactions().map((tx, i) => {
    const index = filesIndex
    filesIndex++
    console.log(`Building file transaction (#${i+1})`)
    return tx.build(filesSeed, index).originSign(originPrivateKey)
  })

  console.log('Building reference transaction...')
  const refTx = await aeweb.getRefTransaction(transactions)
  // Sign ref transaction
  refTx.build(refSeed, refIndex).originSign(originPrivateKey)

  transactions.push(refTx)


  // Create transfer transaction to fund the chains
  console.log("Create funding transaction...")
  const transferTx = archethic.transaction.new()
    .setType('transfer')
    .addUCOTransfer(refAddress, refTxFees)
    .addUCOTransfer(filesAddress, filesTxFees)

  transferTx.build(baseSeed, baseIndex).originSign(originPrivateKey)
  transactions.unshift(transferTx)

  console.log('Estimate fees...')
  // Estimation of fees
  const { refTxFees, filesTxFees } = await estimateTxsFees(archethic, transactions)
  const { fee, rates } = await archethic.transaction.getTransactionFee(transferTx)
  const fees = fromBigInt(fee + refTxFees + filesTxFees)

  console.log(`Total Fee Requirement would be: ${fees} UCO ($${(rates.usd * fees).toFixed(2)}) for ${transactions.length} transactions`)

  await sendTransactions(transactions, 0, normalizedEndpoint)
  console.log(`Website is deployed at: ${normalizedEndpoint}/api/web_hosting/${uint8ArrayToHex(refAddress)}/`)
}
