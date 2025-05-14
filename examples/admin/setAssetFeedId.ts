import dotenv from "dotenv";
import {
  Account,
  Ed25519PrivateKey,
  PrivateKey,
  PrivateKeyVariants,
} from "@aptos-labs/ts-sdk";
import { OracleClient, PoolClient } from "../../src/clients";
import { priceFeeds } from "../../src/helpers/priceFeeds";
import { AptosProvider } from "../../src/clients/aptosProvider";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs/testnet";

// Load environment variables
dotenv.config();

const main = async () => {
  console.log("🔧 Initializing Aptos Oracle Price Feed Setter...");

  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);

  const privateKeyEnv = process.env.AAVE_ORACLE_PRIVATE_KEY;
  if (!privateKeyEnv) {
    console.error(
      "❌ Environment variable AAVE_ORACLE_PRIVATE_KEY is missing.",
    );
    process.exit(1);
  }

  const oracleAccount = Account.fromPrivateKey({
    privateKey: new Ed25519PrivateKey(
      PrivateKey.formatPrivateKey(privateKeyEnv, PrivateKeyVariants.Ed25519),
    ),
  });

  const oracleClient = new OracleClient(aptosProvider, oracleAccount);
  const poolClient = new PoolClient(aptosProvider);

  try {
    const assets = await poolClient.getAllReservesTokens();

    console.log(
      `📊 Found ${assets.length} assets. Processing price feeds...\n`,
    );

    for (const asset of assets) {
      const priceFeedId = priceFeeds.get(asset.symbol);

      if (!priceFeedId) {
        console.warn(`⚠️ No price feed configured for ${asset.symbol}`);
        continue;
      }

      const txReceipt = await oracleClient.setAssetFeedId(
        asset.tokenAddress,
        priceFeedId,
      );

      console.log(`✅ Set price feed for ${asset.symbol}`);
      console.log(`   • Token Address : ${asset.tokenAddress.toString()}`);
      console.log(`   • Feed ID       : ${priceFeedId}`);
      console.log(`   • Tx Hash       : ${txReceipt.hash}\n`);
    }

    console.log("🎉 Done setting all available price feeds.");
  } catch (err) {
    console.error("❌ Error while setting price feeds:", err);
  }
};

main();
