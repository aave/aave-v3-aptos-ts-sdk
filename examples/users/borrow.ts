import {
  Account,
  Ed25519Account,
  Ed25519PrivateKey,
  PrivateKey,
  PrivateKeyVariants,
} from "@aptos-labs/ts-sdk";
import { PoolClient } from "../../src/clients/poolClient";
import { AptosProvider, CoreClient } from "../../src/clients";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const INTEREST_RATE_MODE = 2;
const REFERRAL_CODE = 0;

const main = async () => {
  const argv = await yargs(hideBin(process.argv))
    .option("privateKey", {
      alias: "k",
      type: "string",
      description: "User's Ed25519 private key",
      demandOption: true,
    })
    .option("symbol", {
      alias: "s",
      type: "string",
      description: "Symbol of the currency to borrow (e.g. DAI)",
      demandOption: true,
    })
    .option("amount", {
      alias: "a",
      type: "number",
      description: "Amount to borrow (as integer u64)",
      demandOption: true,
    })
    .example(
      "pnpm run borrow -k 0xabc123 -s DAI -a 100",
      "Borrow 100 units of DAI using the provided private key",
    )
    .help()
    .parse();

  const privateKey = argv.privateKey.startsWith("0x")
    ? argv.privateKey
    : "0x" + argv.privateKey;
  const currency = argv.symbol;
  const amount = BigInt(argv.amount);

  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);
  const poolClient = new PoolClient(aptosProvider);

  const aptosPrivateKey = new Ed25519PrivateKey(
    PrivateKey.formatPrivateKey(privateKey, PrivateKeyVariants.Ed25519),
  );
  const userAccount = Account.fromPrivateKey({ privateKey: aptosPrivateKey });
  const coreClient = new CoreClient(
    aptosProvider,
    userAccount as Ed25519Account,
  );

  try {
    const allReserveUnderlyingTokens = await poolClient.getAllReservesTokens();
    const underlyingToken = allReserveUnderlyingTokens.find(
      (token) => token.symbol === currency,
    );

    if (!underlyingToken) {
      throw new Error(`Token '${currency}' was not found`);
    }

    console.log(
      "✅ Underlying token address:",
      underlyingToken.tokenAddress.toString(),
    );
    console.log("📦 Borrow amount:", amount.toString());

    const txHash = await coreClient.borrow(
      underlyingToken.tokenAddress,
      amount,
      INTEREST_RATE_MODE, // interestRateMode
      REFERRAL_CODE, // referralCode
      userAccount.accountAddress,
    );

    console.info("✅ Transaction executed");
    console.info("🔗 Tx Hash:", txHash.hash);
  } catch (ex) {
    console.error("❌ Exception = ", ex);
  }
};

main();
