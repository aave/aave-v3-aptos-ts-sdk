import {
  Account,
  Ed25519PrivateKey,
  PrivateKey,
  PrivateKeyVariants,
  APTOS_COIN,
} from "@aptos-labs/ts-sdk";
import { AptosProvider } from "../../src/clients";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs/testnet";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import dotenv from "dotenv";
dotenv.config();

const main = async () => {
  const argv = await yargs(hideBin(process.argv))
    .option("privateKey", {
      alias: "k",
      type: "string",
      description: "Private key of the underlying token manager",
      demandOption: true,
    })
    .example(
      "pnpm run create-coin-store -k 0xabc123",
      "Create a coin store for AptosCoin using the provided private key",
    )
    .help()
    .parse();

  const privateKey = argv.privateKey.startsWith("0x")
    ? argv.privateKey
    : "0x" + argv.privateKey;

  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);

  try {
    const signer = Account.fromPrivateKey({
      privateKey: new Ed25519PrivateKey(
        PrivateKey.formatPrivateKey(privateKey, PrivateKeyVariants.Ed25519),
      ),
    });

    const transaction = await aptosProvider
      .getAptos()
      .transaction.build.simple({
        sender: signer.accountAddress,
        data: {
          function: "0x1::managed_coin::register",
          typeArguments: [APTOS_COIN],
          functionArguments: [],
        },
      });

    // Sign and submit the transaction
    const submittedTx = await aptosProvider
      .getAptos()
      .signAndSubmitTransaction({
        signer: signer,
        transaction,
      });

    console.log("Submitted tx hash:", submittedTx.hash);

    // Optionally wait for confirmation
    await aptosProvider
      .getAptos()
      .waitForTransaction({ transactionHash: submittedTx.hash });
    console.log("🎉 Coin registration complete!");
  } catch (ex) {
    console.error("❌ Exception:", ex);
  }
};

main();
