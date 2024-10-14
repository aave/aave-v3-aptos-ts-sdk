import { Account, Ed25519Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";
import { PoolClient } from "../../src/clients/poolClient";
import { AptosProvider, CoreClient } from "../../src/clients";
import { testnetConfig } from "../../src/configs/testnet";

const USER_APTOS_ACCOUNT_PRIVATE_KEY = "0x0";
const CURRENCY_TO_BORROW = "DAI";
const AMOUNT_TO_BORROW = "100";

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
      (token) => token.symbol === CURRENCY_TO_BORROW,
    );
    if (!underlyingToken) {
      throw new Error(`${underlyingToken} token was not found`);
    }
    const borrowAmount = BigInt(AMOUNT_TO_BORROW);
    console.log("Underlying token: ", underlyingToken?.tokenAddress.toString());
    console.log("Value to borrow: ", borrowAmount.toString());

    const txHash = await coreClient.borrow(
      underlyingToken.tokenAddress,
      borrowAmount,
      2,
      0,
      userAccount.accountAddress,
    );

    console.info("Transaction executed: ", txHash.hash);
  } catch (ex) {
    console.error("Expection = ", ex);
  }
})();
