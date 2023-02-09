import { Utils } from "archethic";

const { uint8ArrayToHex } = Utils;

export function getSeeds(baseSeed) {
  return {
    refSeed: baseSeed + "aeweb_ref",
    filesSeed: baseSeed + "aeweb_files",
  };
}

export async function estimateTxsFees(archethic, transactions) {
  const slippage = 1.01;

  let transactionsFees = transactions.map((tx) => {
    return new Promise(async (resolve, _reject) => {
      const { fee } = await archethic.transaction.getTransactionFee(tx);
      resolve(fee);
    });
  });

  transactionsFees = await Promise.all(transactionsFees);

  // Last transaction of the list is the reference transaction
  const fee = transactionsFees.pop();
  const refTxFees = Math.trunc(fee * slippage);

  let filesTxFees = transactionsFees.reduce((total, fee) => (total += fee), 0);
  filesTxFees = Math.trunc(filesTxFees * slippage);

  return { refTxFees, filesTxFees };
}

export async function sendTransactions(transactions, index, endpoint) {
  return new Promise(async (resolve, reject) => {
    console.log(`Transaction ${index + 1} ...`);
    const tx = transactions[index];

    tx.on("requiredConfirmation", async (nbConf) => {
      console.log("Transaction confirmed !");
      console.log(
        `See transaction in explorer: ${endpoint}/explorer/transaction/${uint8ArrayToHex(
          tx.address
        )}`
      );
      console.log("-----------");

      if (index + 1 == transactions.length) {
        resolve();
      } else {
        sendTransactions(transactions, index + 1, endpoint)
          .then(() => resolve())
          .catch((error) => reject(error));
      }
    })
      .on("error", (context, reason) => reject(reason))
      .on("timeout", (nbConf) => reject("Transaction fell in timeout"))
      .on("sent", () => console.log("Waiting transaction validation..."))
      .send(75);
  });
}

export async function fetchLastRefTx(txnAddress, archethic) {

  if (typeof txnAddress !== "string" && !(txnAddress instanceof Uint8Array)) {
    throw "'address' must be a string or Uint8Array";
  }

  if (typeof txnAddress == "string") {
    if (!isHex(txnAddress)) {
      throw "'address' must be in hexadecimal form if it's string";
    }
  }

  if (txnAddress instanceof Uint8Array) {
    txnAddress = uint8ArrayToHex(txnAddress);
  }

  const query = `query {
    lastTransaction(address: "${txnAddress}"){
      data{
        content
      }
    }
  }`;

  return archethic.requestNode(async (endpoint) => {
    const url = new URL("/api", endpoint);

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query
      }),
    })
      .then(handleResponse)
      .then(({ data: { lastTransaction: data } }) => {
        return data;
      });
  })
}

function handleResponse(response) {
  return new Promise(function(resolve, reject) {
    if (response.status >= 200 && response.status <= 299) {
      response.json().then(resolve);
    } else {
      reject(response.statusText);
    }
  });
}
