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

In your Repo, go to Settings -> Secrets and click on "New Secret". Then enter ARCH_BASE_SEED as the seed to your transaction chain.

**The seed should never be hardcoded in your code.**

Please make sure you have sufficient funds in your chain to deploy your file/folder.

## Notes

Be careful, the action does not yet support max fees limitation. You might spend a lot of UCOs if your website is too big.

## That's all !

You can now push your project to GitHub and it will be automatically deployed to Archethic Blockchain !
