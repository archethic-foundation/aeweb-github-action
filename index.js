import fs from 'fs';
import archethic, { Crypto, Utils } from 'archethic';
import aeweb from 'aeweb';

import path, { resolve } from 'path';
import { exit } from 'process';

import core from '@actions/core'

const { deriveAddress } = Crypto
const { originPrivateKey, fromBigInt, uint8ArrayToHex } = Utils

const handler = async function () {

  try {

    let folderPath = path.normalize(core.getInput('path').endsWith(path.sep) ? core.getInput('path').slice(0, -1) : core.getInput('path'))

    // Initialize endpoint connection
    const endpoint = new URL(core.getInput('endpoint')).origin;

    const archethic = new Archethic(endpoint)
    const aeweb = new AEWeb(archethic)

    // Get seeds
    const baseSeed = core.getInput('seed');
    const { refSeed, filesSeed } = getSeeds(seed)

    // Get genesis addresses
    const baseAddress = deriveAddress(baseSeed, 0)
    const refAddress = deriveAddress(refSeed, 0)
    const filesAddress = deriveAddress(filesSeed, 0)

    const refIndex = await archethic.getTransactionIndex(firstRefAddress, endpoint)

    let filesIndex = await archethic.getTransactionIndex(firstFilesAddress, endpoint)

    // Convert directory structure into array of file content
    console.log('Creating file structure and compress content...')
    getFiles(folderPath).forEach(({ filePath, data}) => {
      aeweb.addFile(filePath, data)
    })

    // Sign files transactions
    const transactions = aeweb.getFilesTransactions()
    transactions = transactions.map(tx => {
      const index = filesIndex
      filesIndex++
      return tx.build(filesSeed, index).originSign(originPrivateKey)
    })

    const refTransaction = await aeweb.getRefTransactions(transactions)
    // Sign ref transaction
    refTx.build(refSeed, refIndex).originSign(originPrivateKey)

    transactions.push(refTx)

    // Estimation of fees
    const { refTxFees, filesTxFees } = await cli.estimateTxsFees(archethic, transactions)

    // Create transfer transaction to fund the chains
    const transferTx = archethic.transaction.new()
         .setType('transfer')
         .addUCOTransfer(refAddress, refTxFees)
         .addUCOTransfer(filesAddress, filesTxFees)

    transferTx.build(baseSeed, baseIndex).originSign(originPrivateKey)
    transactions.unshift(transferTx)

    const { fee, rates } = await archethic.transaction.getTransactionFee(transferTx)
    const fees = fromBigInt(fee + refTxFees + filesTxFees)

    console.log(`Total Fee Requirement would be: ${fees} UCO ${(rates.usd * fees).toFixed(2)}, for ${nbTxs} transactions`)

    await sendTransactions(transactions, 0, endpoint).then(() => {
      console.log(`Website is deployed at: ${endpoint}/api/web_hosting/${uint8ArrayToHex(refAddress)}/`)
      exit(0)
    })
    .catch(error => {
      console.log('Transaction validation error : ' + error)
      exit(1)
    })

    exit(0)
  } catch (e) {
    console.log(e)
    exit(1)
  }
}

function handleFile(aeweb, file, files) {
  const data = fs.readFileSync(file)
  aeweb.addFile(file, data) 
}

function handleDirectory(aeweb, entry, files) {
  const stats = fs.statSync(entry)

  if (stats.isDirectory()) {
    fs.readdirSync(entry).forEach(child => {
      handleDirectory(aeweb, entry + path.sep + child, files)
    });
  } else {
    handleFile(aeweb, entry, files)
  }
}

function getSeeds(seed) {
  return {
    refSeed: baseSeed + 'aeweb_ref',
    filesSeed: baseSeed + 'aeweb_files'
  }
}

function getFiles(folderPath, includeGitIgnoredFiles = false) {
  let files = []
  const filters = []
  if (fs.statSync(folderPath).isDirectory()) {
    handleDirectory(folderPath, files, includeGitIgnoredFiles, filters)

    files = files.map((file) => {
      file.filePath = file.filePath.replace(folderPath, '')
      return file
    })
  } else {
   const data = fs.readFileSync(folderPath)
   const file_path = PathLib.basename(folderPath)
   files.push({ "filePath": file_path, data })
  }

  return files
}

async function sendTransactions(transactions, index, endpoint) {
  return new Promise(async (resolve, reject) => {
    console.log(`Transaction ${index + 1} ...`)
    const tx = transactions[index]

    tx
      .on('requiredConfirmation', async (nbConf) => {
        console.log('Transaction confirmed !')
        console.log(`See transaction in explorer: ${endpoint}/explorer/transaction/${uint8ArrayToHex(tx.address)}`)
        console.log('-----------')

        if (index + 1 == transactions.length) {
          resolve()
        } else {
          sendTransactions(transactions, index + 1, endpoint)
            .then(() => resolve())
            .catch(error => reject(error))
        }
      })
      .on('error', (context, reason) => reject(reason))
      .on('timeout', (nbConf) => reject('Transaction fell in timeout'))
      .on('sent', () => console.log('Waiting transaction validation...'))
      .send(75)
  })
}

await handler()
