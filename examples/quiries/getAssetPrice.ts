import { Account, AccountAddress, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";
import { OracleClient } from "../../src/clients/oracleClient";
import { AptosProvider } from "../../src/clients/aptosProvider";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs/testnet";
import { priceFeeds } from "../../src/helpers/priceFeeds";

const ASSET_ADDRESS = AccountAddress.fromString(
  "0xcd560b2ff2f35be40437bca2b6c8ee881cff44b7040df75d83e5e69ac4da928c",
);

(async () => {
  // global aptos provider
  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);
  const oracleClient = new OracleClient(aptosProvider);

  // oracle manager
  const aptosPrivateKey = new Ed25519PrivateKey(
    "0x1abea38f5d3507f87abb85a9e54b59f64662e65a84a40d16ba6c8a18ad9a7353",
  );
  const oracleManagerAccount = Account.fromPrivateKey({
    privateKey: aptosPrivateKey,
  });

  try {
    // const ra = await oracleClient.getOracleResourceAccount();
    // console.log(ra.toString());
    // const oa = await oracleClient.getOracleAddress();
    // console.log(oa.toString());

    // const tx = await oracleClient.withSigner(oracleManagerAccount).setAssetFeedId(ASSET_ADDRESS, priceFeeds.get("DAI") as Uint8Array);
    // console.log(
    //   `Set price feed id with hash = ${tx.hash}`,
    // );

    const assetPrice = await oracleClient.getAssetPrice(ASSET_ADDRESS);
    console.log(
      `Got Price for asset ${ASSET_ADDRESS.toString()} = ${assetPrice.toString()}`,
    );
  } catch (ex) {
    console.error("Expection = ", ex.toString());
  }
})();
