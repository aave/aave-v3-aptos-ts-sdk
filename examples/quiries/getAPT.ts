import {
  Account,
  AccountAddress,
  Ed25519PrivateKey,
  PrivateKey,
  PrivateKeyVariants,
} from "@aptos-labs/ts-sdk";
import { AptosProvider } from "../../src/clients";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs/testnet";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const main = async () => {
  const argv = await yargs(hideBin(process.argv))
    .option("privateKey", {
      alias: "k",
      type: "string",
      description: "Funder's Ed25519 private key (hex, with or without 0x)",
      demandOption: true,
    })
    .option("amount", {
      alias: "a",
      type: "number",
      description:
        "Amount of APT to send (as a number, will be converted to BigInt)",
      demandOption: true,
    })
    .option("recipients", {
      alias: "r",
      type: "string",
      description: "Recipient addresses (space-separated or multiple -r)",
      array: true,
      demandOption: true,
    })
    .example(
      "pnpm run get-aptos --privateKey 0xabc123 --amount 0.5 --recipients 0xaddr1 0xaddr2",
      "Fund 0xaddr1 and 0xaddr2 with 0.5 APT each",
    )
    .help()
    .parse();

  const aptFunderPrivateKey = argv.privateKey.startsWith("0x")
    ? argv.privateKey
    : "0x" + argv.privateKey;

  const fundAmount = BigInt(argv.amount * 1e8); // APT has 8 decimals
  const addressesToFund = (argv.recipients as string[]).map((addr) =>
    AccountAddress.fromString(addr),
  );
  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);

  try {
    const aptFunderAccount = Account.fromPrivateKey({
      privateKey: new Ed25519PrivateKey(
        PrivateKey.formatPrivateKey(
          aptFunderPrivateKey,
          PrivateKeyVariants.Ed25519,
        ),
      ),
    });

    for (const addressToFund of addressesToFund) {
      const transaction = await aptosProvider
        .getAptos()
        .transferCoinTransaction({
          sender: aptFunderAccount.accountAddress,
          recipient: addressToFund,
          amount: fundAmount,
        });

      const pendingTransaction = await aptosProvider
        .getAptos()
        .signAndSubmitTransaction({
          signer: aptFunderAccount,
          transaction,
        });

      console.log(
        `✅ Funded ${addressToFund.toString()} with ${argv.amount} APT`,
      );
      console.log(`Tx Hash: ${pendingTransaction.hash}\n`);
    }
  } catch (ex) {
    console.error("❌ Exception:", ex);
  }
};

main();
