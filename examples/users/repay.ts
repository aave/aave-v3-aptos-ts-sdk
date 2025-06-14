import {
  Account,
  Ed25519Account,
  Ed25519PrivateKey,
  PrivateKey,
  PrivateKeyVariants,
} from "@aptos-labs/ts-sdk";
import { MaxUint256 } from "ethers";
import { BigNumber } from "bignumber.js";
import { PoolClient } from "../../src/clients/poolClient";
import { AptosProvider, CoreClient } from "../../src/clients";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const INTEREST_RATE_MODE = 2;

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
      description: "Symbol of the currency to repay (e.g. DAI)",
      demandOption: true,
    })
    .option("useATokens", {
      alias: "t",
      type: "boolean",
      description: "Use aTokens for repayment (default: true)",
      default: true,
    })
    .example(
      "pnpm run repay -k 0xabc123 -s DAI",
      "Repay full DAI debt using aTokens with default variable rate",
    )
    .help()
    .parse();

  const privateKey = argv.privateKey.startsWith("0x")
    ? argv.privateKey
    : "0x" + argv.privateKey;
  const currency = argv.symbol;
  const useATokens = argv.useATokens;

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

    const fullRepayAmount = new BigNumber(MaxUint256.toString())
      .minus(1)
      .toFixed(0);
    const repayAmount = BigInt(fullRepayAmount);

    console.log(
      "✅ Underlying token:",
      underlyingToken.tokenAddress.toString(),
    );
    console.log("💰 Repay amount:", repayAmount.toString());
    console.log("📈 Interest rate mode:", INTEREST_RATE_MODE);
    console.log("🔄 Using aTokens:", useATokens);

    const txHash = useATokens
      ? await coreClient.repayWithATokens(
          underlyingToken.tokenAddress,
          repayAmount,
          INTEREST_RATE_MODE,
        )
      : await coreClient.repay(
          underlyingToken.tokenAddress,
          repayAmount,
          INTEREST_RATE_MODE,
          userAccount.accountAddress,
        );

    console.info("✅ Transaction executed");
    console.info("🔗 Tx Hash:", txHash.hash);
  } catch (ex) {
    console.error("❌ Exception = ", ex);
  }
};

main();
