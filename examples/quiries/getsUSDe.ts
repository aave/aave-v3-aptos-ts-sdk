import {
  Account,
  Ed25519PrivateKey,
  PrivateKey,
  PrivateKeyVariants,
  AccountAddress,
  MoveFunctionId,
  InputEntryFunctionData,
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
      description: "Sender's Ed25519 private key (hex)",
      demandOption: true,
    })
    .option("symbol", {
      alias: "s",
      type: "string",
      description: "Token symbol (only 'sUSDe' or 'USDe' allowed)",
      choices: ["sUSDe", "USDe"],
      demandOption: true,
    })
    .option("amount", {
      alias: "a",
      type: "number",
      description: "Amount to mint (u64)",
      demandOption: true,
    })
    .option("destination", {
      alias: "d",
      type: "string",
      description: "Destination address to receive minted tokens",
      demandOption: true,
    })
    .option("moduleAddress", {
      alias: "m",
      type: "string",
      description: "Module address of the USDE/sUSDe asset",
      demandOption: true,
    })
    .example(
      "pnpm run get-susde --privateKey 0xabc123 --symbol sUSDe --destination 0xaddr1 --amount 100000000 --module-address 0xc7a799e2b03f3ffa3ed4239ab9ecec797cc97d51fbee2cb7bf93eb201f356b36",
      "Mint 100000 units of sUSDe/USDe to 0xaddr1 (account with private key 0xabc123)",
    )
    .help()
    .parse();

  const privateKey = argv.privateKey.startsWith("0x")
    ? argv.privateKey
    : "0x" + argv.privateKey;
  const symbol = argv.symbol;
  const amount = BigInt(argv.amount);
  const destination = AccountAddress.fromString(argv.destination);
  const moduleId = argv.moduleAddress.startsWith("0x")
    ? argv.moduleAddress
    : "0x" + argv.moduleAddress;
  const moduleFullPath: MoveFunctionId = `${moduleId}::token_factory::mint`;

  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);
  const signerAccount = Account.fromPrivateKey({
    privateKey: new Ed25519PrivateKey(
      PrivateKey.formatPrivateKey(privateKey, PrivateKeyVariants.Ed25519),
    ),
  });

  try {
    const payload: InputEntryFunctionData = {
      function: moduleFullPath,
      typeArguments: [],
      functionArguments: [symbol, amount, destination],
    };

    const transaction = await aptosProvider
      .getAptos()
      .transaction.build.simple({
        sender: signerAccount.accountAddress,
        data: payload,
      });

    const submittedTx = await aptosProvider
      .getAptos()
      .signAndSubmitTransaction({
        signer: signerAccount,
        transaction,
      });

    console.log(
      `✅ Minted ${amount} of '${symbol}' to ${destination.toString()}`,
    );
    console.log(`🔗 Tx Hash: ${submittedTx.hash}`);
  } catch (err) {
    console.error("❌ Error calling mint:", err);
  }
};

main();
