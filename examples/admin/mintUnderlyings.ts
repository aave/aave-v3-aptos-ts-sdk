import {
  Account,
  AccountAddress,
  Ed25519PrivateKey,
  PrivateKey,
  PrivateKeyVariants,
} from "@aptos-labs/ts-sdk";
import { UnderlyingTokensClient } from "../../src/clients/underlyingTokensClient";
import { PoolClient } from "../../src/clients/poolClient";
import { AptosProvider } from "../../src/clients";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs/testnet";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const main = async () => {
  const argv = await yargs(hideBin(process.argv))
    .option("privateKey", {
      alias: "k",
      type: "string",
      description: "Private key of the underlying token manager",
      demandOption: true,
    })
    .option("recipients", {
      alias: "r",
      type: "string",
      array: true,
      description: "One or more Aptos addresses to fund",
      demandOption: true,
    })
    .option("amount", {
      alias: "a",
      type: "number",
      description: "Amount to mint for each token and recipient (as u64)",
      demandOption: true,
    })
    .example(
      "pnpm run fund-underlying -k 0xabc123... -r 0xaddr1 0xaddr2 -a 1000",
      "Mint 1000 of all reserve tokens to both recipients",
    )
    .help()
    .parse();

  const privateKey = argv.privateKey.startsWith("0x")
    ? argv.privateKey
    : "0x" + argv.privateKey;
  const recipients = argv.recipients.map((addr) =>
    AccountAddress.fromString(addr),
  );
  const fundAmount = BigInt(argv.amount);

  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);
  const underlyingTokensClient = new UnderlyingTokensClient(aptosProvider);
  const poolClient = new PoolClient(aptosProvider);

  try {
    const allReserveUnderlyingTokens = await poolClient.getAllReservesTokens();
    console.log(`📦 Found ${allReserveUnderlyingTokens.length} reserve tokens`);
    console.log(
      `👥 Funding ${recipients.length} recipient(s) with ${fundAmount} each\n`,
    );

    const signer = Account.fromPrivateKey({
      privateKey: new Ed25519PrivateKey(
        PrivateKey.formatPrivateKey(privateKey, PrivateKeyVariants.Ed25519),
      ),
    });
    underlyingTokensClient.setSigner(signer);

    for (const token of allReserveUnderlyingTokens) {
      console.log(
        `🔹 Token: ${token.symbol} (${token.tokenAddress.toString()})`,
      );

      for (const recipient of recipients) {
        const txReceipt = await underlyingTokensClient.mint(
          recipient,
          fundAmount,
          token.tokenAddress,
        );

        console.log(
          `   ✅ Funded ${recipient.toString()} with ${fundAmount} ${token.symbol}`,
        );
        console.log(`   🔗 Tx Hash: ${txReceipt.hash}`);
      }

      console.log(""); // separator
    }

    console.log("🎉 All recipients funded with all underlying reserve tokens.");
  } catch (ex) {
    console.error("❌ Exception:", ex);
  }
};

main();
