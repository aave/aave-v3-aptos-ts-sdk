import { AptosProvider } from "../../src/clients";
import { PoolAddressesProviderClient } from "../../src/clients/poolAddressesProviderClient";
import { testnetConfig } from "../../src/configs/testnet";

(async () => {
  // global aptos provider
  const aptosProvider = AptosProvider.fromConfig(testnetConfig);

  // pool addresses provider
  const poolAddressesProviderClient = new PoolAddressesProviderClient(
    aptosProvider,
  );

  try {
    // get acl admin
    const aclAdmin = await poolAddressesProviderClient.getAclAdmin();
    console.log("Acl Admin Account Address: ", aclAdmin?.toString());
    const aclManager = await poolAddressesProviderClient.getAclManager();
    console.log("Acl Manager Account Address: ", aclManager?.toString());
    const pool = poolAddressesProviderClient.getPool();
    console.log("Pool Account Account Address: ", pool.toString());
    const poolConfigurator =
      await poolAddressesProviderClient.getPoolConfigurator();
    console.log(
      "Pool Configurator Account Address: ",
      poolConfigurator?.toString(),
    );
    const poolDataProvider =
      await poolAddressesProviderClient.getPoolDataProvider();
    console.log(
      "Pool Data Provider Account Address: ",
      poolDataProvider?.toString(),
    );
    const priceOracle = await poolAddressesProviderClient.getPriceOracle();
    console.log("Price Oracle Account Address: ", priceOracle?.toString());
    const priceOracleSentinel =
      await poolAddressesProviderClient.getPriceOracleSentinel();
    console.log(
      "Price Oracle Sentinel Account Address: ",
      priceOracleSentinel?.toString(),
    );
  } catch (ex) {
    console.error("Expection = ", ex);
  }
})();
