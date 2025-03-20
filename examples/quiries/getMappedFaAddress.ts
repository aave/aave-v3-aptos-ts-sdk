import { AptosProvider } from "../../src";
import { DEFAULT_TESTNET_CONFIG } from "../../src";
import { CoinMigratorClient } from "../../src/clients/coinMigratorClient";

(async () => {
  // global aptos provider
  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);

  // coin migrator client
  const coinMigratorClient = new CoinMigratorClient(aptosProvider);

  try {
    const coinType = "0x1::aptos_coin::AptosCoin";
    const faAddress = await coinMigratorClient.getFaAddress(coinType);
    console.log("[MAPPED COIN-FA] Address: ", faAddress.toString());
  } catch (ex) {
    console.error("Exception = ", ex);
  }
})();
