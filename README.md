# Deploy to AEweb GitHub action

This is a very simple GitHub action that allows you to deploy to Archethic decentralised webhosting.
The action works by running part of the [aeweb-cli](https://github.com/archethic-foundation/aeweb-cli) code.

## Usage

To get started using the action, create a folder called .github and inside it, create another folder called workflows.
Finally inside the workflows folder, create a file called main.yml with the following contents:

```yaml
on: [push]

jobs:
  deploy_to_aeweb:
    runs-on: ubuntu-latest
    name: A job to deploy file to AEweb
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Deploy to AEweb
        id: deploy
        uses: archethic-foundation/aeweb-github-action@v1.6.3
        with:
          seed: ${{ secrets.ARCH_BASE_SEED }}
          endpoint: "https://testnet.archethic.net" #Endpoint you want to deploy to
          path: "./web_site_test" #Path to the folder you want to deploy
```

In your Repo, go to Settings -> Secrets and click on "New Secret". Then enter *ARCH_BASE_SEED* as the seed to your transaction chain.

**The seed should never be hardcoded in your code.**

Please make sure you have sufficient funds in your chain to deploy your file/folder.

## Keychain's integration

if you want to leverage your decentralized keychain you can use one your service to deploy website.

```yaml
on: [push]

jobs:
  deploy_to_aeweb:
    runs-on: ubuntu-latest
    name: A job to deploy file to AEweb
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Deploy to AEweb
        id: deploy
        uses: archethic-foundation/aeweb-github-action@v1.6.3
        with:
          seed: ${{ secrets.ARCH_BASE_SEED }}
          endpoint: "https://testnet.archethic.net" #Endpoint you want to deploy to
          path: "./web_site_test" #Path to the folder you want to deploy
          keychainFundingService: "archethic-wallet-TEST_AEWEB" # Service to fund the website's chain
          keychainWebsiteService: "archethic-wallet-WEBSITE1" # Service to identify the website's chain
```

If you want to use the wallet, you have to provide your passphrase composed of 24 words i the Github's secret: *ARCH_BASE_SEED*

## Notes

Be careful, the action does not yet support max fees limitation. 
More your website will be big and how many updates you will do, more you will need to fund the website's chain. 

## That's all !

You can now push your project to GitHub and it will be automatically deployed to Archethic Blockchain !
