import { ATokensClient } from "../../src/clients/aTokensClient";
import { UnderlyingTokensClient } from "../../src/clients/underlyingTokensClient";
import { UiPoolDataProviderClient } from "../../src/clients/uiPoolDataProvider";
import { PoolClient } from "../../src/clients/poolClient";
import { AptosProvider } from "../../src/clients/aptosProvider";
import { testnetConfig } from "../../src/configs/testnet";
import { VariableTokensClient } from "../../src/clients/variableTokensClient";

(async () => {
  // global aptos provider
  const aptosProvider = AptosProvider.fromConfig(testnetConfig);

  // all atokens-related operations client
  const aTokensClient = new ATokensClient(aptosProvider);
  // all underlying-tokens-related operations client
  const underlyingTokensClient = new UnderlyingTokensClient(aptosProvider);
  // all variable-tokens-related operations client
  // const variableTokensClient = new VariableTokensClient(aptosProvider);
  // all pool-related operations client
  const poolClient = new PoolClient(aptosProvider);
  // all core-related operations client (supply, borrow, withdraw, repay)
  // const coreClient = new CoreClient(aptosProvider);
  const varTokensClient = new VariableTokensClient(aptosProvider);
  // special ui functions client
  const uiPoolDataProviderClient = new UiPoolDataProviderClient(aptosProvider);

  try {
    // get all reserve underlying tokens
    const allReserveUnderlyingTokens = await poolClient.getAllReservesTokens();

    // get details for each underlying token
    for (const reserveUnderlyingToken of allReserveUnderlyingTokens) {
      console.log(
        "[UNDERLYING_TOKEN] Token Metadata Address: ",
        reserveUnderlyingToken.tokenAddress.toString(),
      );
      const tokenSymbol = await underlyingTokensClient.symbol(
        reserveUnderlyingToken.tokenAddress,
      );
      console.log("[UNDERLYING_TOKEN] Token Symbol: ", tokenSymbol);
      const tokenName = await underlyingTokensClient.name(
        reserveUnderlyingToken.tokenAddress,
      );
      console.log("[UNDERLYING_TOKEN] Token Name: ", tokenName);
      const tokenDecimals = await underlyingTokensClient.decimals(
        reserveUnderlyingToken.tokenAddress,
      );
      console.log("[UNDERLYING_TOKEN] Token Decimals: ", Number(tokenDecimals));
      console.log("==========================================================");
    }

    // get all atokens in the protocol
    const allATokens = await poolClient.getAllATokens();

    // get details for each underlying token
    for (const aToken of allATokens) {
      console.log(
        "[ATOKEN] Token Metadata Address: ",
        aToken.tokenAddress.toString(),
      );
      const tokenSymbol = await aTokensClient.symbol(aToken.tokenAddress);
      console.log("[ATOKEN] Token Symbol: ", tokenSymbol);
      const tokenName = await aTokensClient.name(aToken.tokenAddress);
      console.log("[ATOKEN] Token Name: ", tokenName);
      const tokenDecimals = await aTokensClient.decimals(aToken.tokenAddress);
      console.log("[ATOKEN] Token Decimals: ", Number(tokenDecimals));
      const tokenSupply = await aTokensClient.scaledTotalSupply(
        aToken.tokenAddress,
      );
      console.log("[ATOKEN] Scaled Token Supply: ", Number(tokenSupply));
      console.log("==========================================================");
    }

    const allVarTokens = await poolClient.getAllVariableTokens();

    // get details for each variable token
    for (const varToken of allVarTokens) {
      console.log(
        "[VARTOKEN] Token Metadata Address: ",
        varToken.tokenAddress.toString(),
      ); // same as asset metadata address
      const assetAddress = await varTokensClient.getUnderlyingAssetAddress(
        varToken.tokenAddress,
      );
      console.log("[VARTOKEN] Asset Address: ", assetAddress.toString());
      const tokenSymbol = await varTokensClient.symbol(varToken.tokenAddress);
      console.log("[VARTOKEN] Token Symbol: ", tokenSymbol);
      const tokenName = await varTokensClient.name(varToken.tokenAddress);
      console.log("[VARTOKEN] Token Name: ", tokenName);
      const tokenDecimals = await varTokensClient.decimals(
        varToken.tokenAddress,
      );
      console.log("[VARTOKEN] Token Decimals: ", Number(tokenDecimals));
      const tokenSupply = await varTokensClient.scaledTotalSupplyOf(
        varToken.tokenAddress,
      );
      console.log("[VARTOKEN] Scaled Token Supply: ", Number(tokenSupply));
      console.log("==========================================================");
    }

    // get reserves count
    const reservesCount = await poolClient.getReservesCount();
    console.log("[RESERVES] Total reserves count: ", Number(reservesCount));
    console.log("==========================================================");

    // get reserves addresses
    const reserveAddresses = await poolClient.getReservesList();
    for (const reserveAddress of reserveAddresses) {
      console.log("[RESERVES] Reserve addresses: ", reserveAddress.toString());
    }
    console.log("==========================================================");

    const uiPoolDataProviderV32DataAddress =
      await uiPoolDataProviderClient.uiPoolDataProviderV32DataAddress();
    console.log(
      "[UI DATA POOL PROVIDER] Address: ",
      uiPoolDataProviderV32DataAddress.toString(),
    );
    console.log("==========================================================");

    const reservesList = await uiPoolDataProviderClient.getReservesList();
    console.log(
      "[UI DATA POOL PROVIDER] Reserves List: ",
      reservesList.map((item) => item.toString()).join(","),
    );
    console.log("==========================================================");

    const reservesData = await uiPoolDataProviderClient.getReservesData();
    console.log("[UI DATA POOL PROVIDER] Reserves Data: ", reservesData);
    console.log("==========================================================");
  } catch (ex) {
    console.error("Expection = ", ex);
  }
})();
