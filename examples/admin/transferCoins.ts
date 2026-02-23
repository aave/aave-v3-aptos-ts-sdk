import {
  Account,
  Ed25519PrivateKey,
  PrivateKey,
  PrivateKeyVariants,
  AccountAddress,
} from "@aptos-labs/ts-sdk";
import { AptosProvider } from "../../src/clients";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs/testnet";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const main = async () => {
  const argv = await yargs(hideBin(process.argv))
    .option("privateKey", {
      alias: "k",
      type: "string",
      description: "Private key of the underlying token manager",
      demandOption: true,
    })
    .option("recipient", {
      alias: "r",
      type: "string",
      description: "Aptos address to fund",
      demandOption: true,
    })
    .option("amount", {
      alias: "a",
      type: "number",
      description: "Amount to mint for each token and recipient (as u64)",
      demandOption: true,
    })
    .example(
      "APTOS_PROVIDER_TYPE=APTOS/ALCHEMY APTOS_API_KEY=... pnpm run transfer-coins -k 0xabc123 -r 0xrecipient -a 1000",
      "Transfer 1000 coins to the recipient using the provided private key",
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
    const fundAmount = BigInt(argv.amount);
    const recipient = AccountAddress.fromString(argv.recipient);

    const transaction = await aptosProvider
      .getAptos()
      .transaction.build.simple({
        sender: signer.accountAddress,
        data: {
          function: "0x1::aptos_account::transfer",
          typeArguments: [],
          functionArguments: [recipient, fundAmount],
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
    console.log("🎉 Coin transfer complete!");
  } catch (ex) {
    console.error("❌ Exception:", ex);
  }
};

main();
