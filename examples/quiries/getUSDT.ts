import {
  Account,
  Ed25519PrivateKey,
  InputEntryFunctionData,
  MoveFunctionId,
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
      description: "Sender's Ed25519 private key",
      demandOption: true,
    })
    .option("amount", {
      alias: "a",
      type: "number",
      description: "Amount to faucet (u64)",
      demandOption: true,
    })
    .option("moduleAddress", {
      alias: "m",
      type: "string",
      description: "Module address of the USDT asset",
      demandOption: true,
    })
    .example(
      "pnpm run get-usdt --privateKey 0xabc123  --amount 100000000 --module-address 0x24246c14448a5994d9f23e3b978da2a354e64b6dfe54220debb8850586c448cc",
      "Mint 100 USDT to 0xaddr1 (account with private key 0xabc123)",
    )
    .parse();

  const privateKey: string = argv.privateKey.startsWith("0x")
    ? argv.privateKey
    : "0x" + argv.privateKey;

  const amount = BigInt(argv.amount);
  const moduleId = argv.moduleAddress.startsWith("0x")
    ? argv.moduleAddress
    : "0x" + argv.moduleAddress;

  const moduleFullPath: MoveFunctionId = `${moduleId}::usdt::faucet`;

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
      functionArguments: [amount],
    };

    const tx = await aptosProvider.getAptos().transaction.build.simple({
      sender: signerAccount.accountAddress,
      data: payload,
    });

    const submittedTx = await aptosProvider
      .getAptos()
      .signAndSubmitTransaction({
        signer: signerAccount,
        transaction: tx,
      });

    console.log(`✅ Called faucet with amount ${amount.toString()}`);
    console.log(`🔗 Tx Hash: ${submittedTx.hash}`);
  } catch (err) {
    console.error("❌ Error calling faucet:", err);
  }
};

main();
