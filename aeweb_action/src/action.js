import Archethic, { Crypto, Utils } from '@archethicjs/sdk';
import AEWeb from '@archethicjs/aeweb-cli';
import bip39 from "bip39";
import tls from 'tls';
import { X509Certificate } from 'crypto'
 
import { normalizeFolderPath, getFolderFiles } from './file.js'
import { estimateTxsFees, getSeeds, sendTransactions, fetchLastRefTx } from './utils.js'

import * as core from '@actions/core';

const { deriveAddress } = Crypto
const { formatBigInt, originPrivateKey, uint8ArrayToHex } = Utils

export async function handler(baseSeed, folderPath, endpoint, keychainFundingService, keychainWebsiteService, sslKey, sslCertificate, sendTxTimeout, percentageOfConfirmations) {
  if (sslKey && sslCertificate) {
    console.log("Validation of the SSL certificate & key...")
    if (validCertificate(sslCertificate, sslKey)) {
      console.log("SSL certificate & key are valid")
    }
    else {
      throw "SSL key or certificate are invalid"
    }
  }

  const normalizedFolderPath = normalizeFolderPath(folderPath)

  console.log("Connecting to Archethic endpoint...")

  // Initialize endpoint connection
  const normalizedEndpoint = new URL(endpoint).origin;
  const archethic = new Archethic(normalizedEndpoint)
  await archethic.connect()

  let keychain

  if (keychainFundingService) {
    let keychainSeed = baseSeed
    if (bip39.validateMnemonic(baseSeed)) {
      console.log("Validate mnemonic")
      keychainSeed = bip39.mnemonicToEntropy(baseSeed)
    }

    console.log("Fetching keychain...")

    keychain = await archethic.account.getKeychain(keychainSeed)
    if (!keychain.services[keychainFundingService]) {
      throw `The keychain doesn't include the ${keychainFundingService} service`
    }

    if (!keychain.services[keychainWebsiteService]) {
      throw `The keychain doesn't include the ${keychainWebsiteService} service`
    }

    console.log("Keychain loaded with the funding/website services")
  }

  let baseAddress, refAddress, filesAddress
  let refSeed, filesSeed

  if (keychain) {
    baseAddress = keychain.deriveAddress(keychainFundingService, 0)
    refAddress = keychain.deriveAddress(keychainWebsiteService, 0)
    filesAddress = keychain.deriveAddress(keychainWebsiteService, 0, "files")
  } else {
    // Get seeds
    const extendedSeeds = getSeeds(baseSeed)
    refSeed = extendedSeeds.refSeed
    filesSeed = extendedSeeds.filesSeed

    // Get genesis addresses
    baseAddress = deriveAddress(baseSeed, 0)
    refAddress = deriveAddress(refSeed, 0)
    filesAddress = deriveAddress(filesSeed, 0)
  }

  // Get the chains size
  const baseIndex = await archethic.transaction.getTransactionIndex(baseAddress)
  const refIndex = await archethic.transaction.getTransactionIndex(refAddress)
  let filesIndex = await archethic.transaction.getTransactionIndex(filesAddress)

  let isWebsiteUpdate = false
  let prevRefTxContent

  // Check if website is already deployed
  if ((refIndex) !== 0) {
    console.log("Check last update...")
    isWebsiteUpdate = true;
    const lastRefTx = await fetchLastRefTx(refAddress, archethic);
    prevRefTxContent = JSON.parse(lastRefTx.data.content);
  }

  const aeweb = new AEWeb(archethic, prevRefTxContent)
  if (sslKey && sslCertificate) {
    aeweb.addSSLCertificate(sslCertificate, sslKey)
  }

  // Convert directory structure into array of file content
  console.log('Analyzing website folder...')

  getFolderFiles(normalizedFolderPath).forEach(({ filePath, data }) => {
    aeweb.addFile(filePath, data)
  })

  let transactions;

  if (isWebsiteUpdate) {
    let modifiedFiles = aeweb.listModifiedFiles();
    let removedFiles = aeweb.listRemovedFiles();

    // Stop the action if not update is present
    if (!modifiedFiles.length && !removedFiles.length) {
      console.log("There is not changes in the website folder for a new deployment.")
      return;
    }
  }

  console.log('Building files transactions...')

  // when files changes does exist
  if (!isWebsiteUpdate || (aeweb.listModifiedFiles().length)) {
    // Sign files transactions
    transactions = aeweb.getFilesTransactions().map((tx, i) => {
      const index = filesIndex
      filesIndex++
      console.log(`Building file transaction (#${i + 1})`)

      if (keychain) {
        return keychain
          .buildTransaction(tx, keychainWebsiteService, index, "files")
          .originSign(originPrivateKey)
      }
      return tx.build(filesSeed, index).originSign(originPrivateKey)
    })
  }

  console.log('Building reference transaction...')
  const refTx = await aeweb.getRefTransaction(transactions)
  // Sign ref transaction
  if (keychain) {
    keychain
      .buildTransaction(refTx, keychainWebsiteService, refIndex)
      .originSign(originPrivateKey)
  } else {
    refTx
      .build(refSeed, refIndex)
      .originSign(originPrivateKey)
  }

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

  if (keychain) {
    keychain
      .buildTransaction(transferTx, keychainFundingService, baseIndex)
      .originSign(originPrivateKey)
  } else {
    transferTx
      .build(baseSeed, baseIndex)
      .originSign(originPrivateKey)
  }
  transactions.unshift(transferTx)

  const { fee, rates } = await archethic.transaction.getTransactionFee(transferTx)
  const fees = new Number(formatBigInt(fee + refTxFees + filesTxFees))

  console.log(`Total Fee Requirement would be: ${fees} UCO ($${(rates.usd * fees).toFixed(2)}) for ${transactions.length} transactions`)

  await sendTransactions(transactions, 0, normalizedEndpoint, sendTxTimeout, percentageOfConfirmations)
  console.log(`Website is deployed at: ${normalizedEndpoint}/api/web_hosting/${uint8ArrayToHex(refAddress)}/`)
 
  const websiteURL = `${normalizedEndpoint}/api/web_hosting/${uint8ArrayToHex(refAddress)}/`;
  core.setOutput('website_url', websiteURL);
 
}

function validCertificate(cert, key) {
  try {
    tls.createSecureContext({ cert, key })
    const { validTo } = new X509Certificate(cert);
    return new Date(validTo) > new Date()
  }
  catch (error) {
    if (error.code === 'ERR_OSSL_X509_KEY_VALUES_MISMATCH') {
      return false;
    }
    throw error;
  }

}
