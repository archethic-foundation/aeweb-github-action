import { handler } from "./src/action.js"
import path from "path"
import fs from "fs"

const SEED = process.env["INPUT_SEED"]
const ENDPOINT = process.env["INPUT_ENDPOINT"]
const PATH = process.env["GITHUB_WORKSPACE"] ? path.join(process.env["GITHUB_WORKSPACE"], process.env["INPUT_PATH"]) : process.env["INPUT_PATH"]
const KEYCHAIN_FUNDING_SERVICE = process.env["INPUT_KEYCHAINFUNDINGSERVICE"]
const KEYCHAIN_WEBSITE_SERVICE = process.env["INPUT_KEYCHAINWEBSITESERVICE"]
const SSL_CERTIFICATE_FILE = process.env["INPUT_SSLCERTIFICATEFILE"]
const SSL_KEY = process.env["INPUT_SSLKEY"]
const SEND_TRANSACTION_TIMEOUT = process.env["SEND_TRANSACTION_TIMEOUT"] || 60000
const PERCENTAGE_OF_CONFIRMATIONS = process.env["PERCENTAGE_OF_CONFIRMATIONS"] || 50

if (!SEED) {
  console.log("INPUT_SEED argument needs to be provided")
  process.exit(1)
}

if (!ENDPOINT) {
  console.log("INPUT_ENDPOINT argument needs to be provided")
  process.exit(1)
}

if (!PATH) {
  console.log("INPUT_PATH argument needs to be provided")
  process.exit(1)
}

let sslCertificate
if (SSL_CERTIFICATE_FILE) {
  sslCertificate = fs.readFileSync(path.join(PATH, SSL_CERTIFICATE_FILE), 'utf8')
}

try {
  await handler(SEED, PATH, ENDPOINT, KEYCHAIN_FUNDING_SERVICE, KEYCHAIN_WEBSITE_SERVICE, SSL_KEY, sslCertificate, SEND_TRANSACTION_TIMEOUT, PERCENTAGE_OF_CONFIRMATIONS)
  process.exit(0)
}
catch (e) {
  console.log(e)
  process.exit(1)
}
