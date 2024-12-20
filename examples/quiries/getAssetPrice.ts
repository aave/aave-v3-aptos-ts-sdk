import { AccountAddress } from "@aptos-labs/ts-sdk";
import { OracleClient } from "../../src/clients/oracleClient";
import { AptosProvider } from "../../src/clients/aptosProvider";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs/testnet";

const ASSET_ADDRESS = AccountAddress.fromString(
  "0xa613047dbb9ee69a7a1c84eaf4b31ed877a3eb2afd918a7cb015fc8fe2aab116",
);

(async () => {
  // global aptos provider
  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);
  const oracleClient = new OracleClient(aptosProvider);

  try {
    // // get asset price
    const assetPrice = await oracleClient.getAssetPrice(ASSET_ADDRESS);
    console.log(
      `Got Price for asset ${ASSET_ADDRESS.toString()} = ${assetPrice.toString()}`,
    );
  } catch (ex) {
    console.error("Expection = ", ex.toString());
  }
})();
