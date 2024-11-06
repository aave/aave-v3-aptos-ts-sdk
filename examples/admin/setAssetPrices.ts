import dotenv from "dotenv";
import { Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";
import { OracleClient, PoolClient } from "../../src/clients";
import { AptosProvider } from "../../src/clients/aptosProvider";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs/testnet";

dotenv.config();

const priceMapper = {
  DAI: 100000000,
  USDC: 100000000,
  WETH: 300000000000,
  AAVE: 10000000000,
};

(async () => {
  // global aptos provider
  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);

  if (!process.env.AAVE_MOCK_ORACLE_PRIVATE_KEY) {
    throw new Error(`AAVE_MOCK_ORACLE_PRIVATE_KEY env was not found`);
  }

  const oracleManageAccount = Account.fromPrivateKey({
    privateKey: new Ed25519PrivateKey(process.env.AAVE_MOCK_ORACLE_PRIVATE_KEY),
  });

  const oracleClient = new OracleClient(aptosProvider, oracleManageAccount);
  const poolClient = new PoolClient(aptosProvider);

  const assets = await poolClient.getAllReservesTokens();
  for (const asset of assets) {
    const price = priceMapper[asset.symbol];
    if (price) {
      const txReceipt = await oracleClient.setAssetPrice(
        asset.tokenAddress,
        BigInt(price),
      );
      console.log(
        `Asset ${asset.symbol} price set to ${price} with tx hash ${txReceipt.hash}`,
      );
    }
  }
})();
