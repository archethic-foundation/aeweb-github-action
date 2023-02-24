import { exit } from 'process';
import core from '@actions/core'
import { handler }  from "./action.js"

try {
  await handler(core.getInput("seed"), core.getInput("path"), core.getInput("endpoint"), core.getInput("keychainFundingService"), core.getInput("keychainWebsiteService"))
  exit(0)
}
catch (e) {
  console.log(e)
  exit(1)
}
