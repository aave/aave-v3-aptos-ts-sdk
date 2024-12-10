import { AccountAddress } from "@aptos-labs/ts-sdk";
import { UnderlyingTokensClient } from "../../src/clients/underlyingTokensClient";
import { UiPoolDataProviderClient } from "../../src/clients/uiPoolDataProvider";
import { PoolClient } from "../../src/clients/poolClient";
import { AptosProvider } from "../../src/clients/aptosProvider";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs/testnet";

const USER_APTOS_ACCOUNT = "0x0";

(async () => {
  // global aptos provider
  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);

  const uiPoolDataProviderClient = new UiPoolDataProviderClient(aptosProvider);
  const poolClient = new PoolClient(aptosProvider);
  const underlyingTokensClient = new UnderlyingTokensClient(aptosProvider);
  const userAccount = AccountAddress.fromString(USER_APTOS_ACCOUNT);

  try {
    const allReserveUnderlyingTokens = await poolClient.getAllReservesTokens();
    const userReserveData = (
      await uiPoolDataProviderClient.getUserReserveData(userAccount.toString())
    ).userReserves;

    for (const userReserve of userReserveData) {
      const underlyingToken = allReserveUnderlyingTokens.find(
        (token) =>
          token.tokenAddress.toString() === userReserve.underlyingAsset,
      );
      if (!underlyingToken) {
        throw new Error(`${underlyingToken} token was not found`);
      }
      const underlyingTokenMetadata =
        await underlyingTokensClient.getMetadataBySymbol(
          underlyingToken.symbol,
        );
      const underlyingTokenBalance = await underlyingTokensClient.balanceOf(
        userAccount,
        underlyingTokenMetadata,
      );
      console.log(
        "UNDERLYING ASSET ADDRESS-SYMBOL: ",
        userReserve.underlyingAsset,
        underlyingToken.symbol,
      );
      console.log(
        "UNSCALED UNDERLYING ASSET BALANCE: ",
        underlyingTokenBalance,
      );
      console.log("SCALED ATOKEN BALANCE: ", userReserve.scaledATokenBalance);
      console.log("SCALED VARTOKEN BALANCE: ", userReserve.scaledVariableDebt);
      console.log("==========================================================");
    }
  } catch (ex) {
    console.error("Expection = ", ex);
  }
})();
