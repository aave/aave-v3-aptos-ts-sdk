import dotenv from "dotenv";
import { Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";
import { OracleClient, PoolClient } from "../../src/clients";
import { priceFeeds } from "../../src/helpers/priceFeeds";
import { AptosProvider } from "../../src/clients/aptosProvider";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs/testnet";

dotenv.config();

(async () => {
  // global aptos provider
  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);

  if (!process.env.AAVE_ORACLE_PRIVATE_KEY) {
    throw new Error(`AAVE_ORACLE_PRIVATE_KEY env was not found`);
  }

  const oracleManageAccount = Account.fromPrivateKey({
    privateKey: new Ed25519PrivateKey(process.env.AAVE_ORACLE_PRIVATE_KEY),
  });

  const oracleClient = new OracleClient(aptosProvider, oracleManageAccount);
  const poolClient = new PoolClient(aptosProvider);

  const assets = await poolClient.getAllReservesTokens();
  for (const asset of assets) {
    const priceFeedId = priceFeeds.get(asset.symbol);
    if (priceFeedId) {
      const txReceipt = await oracleClient.setAssetFeedId(
        asset.tokenAddress,
        priceFeedId,
      );
      console.log(
        `Asset ${asset.symbol} price set to ${priceFeedId} with tx hash ${txReceipt.hash}`,
      );
    }
  }
})();
