import { Account, Ed25519Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";
import { PoolClient } from "../../src/clients/poolClient";
import { AptosProvider, CoreClient } from "../../src/clients";
import { testnetConfig } from "../../src/configs/testnet";

const USER_APTOS_ACCOUNT_PRIVATE_KEY = "0x0";
const CURRENCY_TO_SUPPLY = "DAI";
const AMOUNT_TO_SUPPLY = "100";

(async () => {
  // global aptos provider
  const aptosProvider = AptosProvider.fromConfig(testnetConfig);
  // all pool-related operations client
  const poolClient = new PoolClient(aptosProvider);
  // user account
  const aptosPrivateKey = new Ed25519PrivateKey(USER_APTOS_ACCOUNT_PRIVATE_KEY);
  const userAccount = Account.fromPrivateKey({ privateKey: aptosPrivateKey });
  const coreClient = new CoreClient(
    aptosProvider,
    userAccount as Ed25519Account,
  );

  try {
    const allReserveUnderlyingTokens = await poolClient.getAllReservesTokens();
    const underlyingToken = allReserveUnderlyingTokens.find(
      (token) => token.symbol === CURRENCY_TO_SUPPLY,
    );
    if (!underlyingToken) {
      throw new Error(`${underlyingToken} token was not found`);
    }
    const supplyAmount = BigInt(AMOUNT_TO_SUPPLY);
    console.log("Underlying token: ", underlyingToken.tokenAddress.toString());
    console.log("Value to supply: ", supplyAmount.toString());

    const txHash = await coreClient.supply(
      underlyingToken.tokenAddress,
      supplyAmount,
      userAccount.accountAddress,
      0,
    );

    console.info("Transaction executed: ", txHash.hash);
  } catch (ex) {
    console.error("Expection = ", ex);
  }
})();
