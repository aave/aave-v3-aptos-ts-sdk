import {
  Account,
  Ed25519Account,
  Ed25519PrivateKey,
  PrivateKey,
  PrivateKeyVariants,
} from "@aptos-labs/ts-sdk";
import { PoolClient } from "../../src/clients/poolClient";
import { AptosProvider, CoreClient } from "../../src/clients";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs";

const USER_APTOS_ACCOUNT_PRIVATE_KEY = "0x0";
const CURRENCY_TO_WITHDRAW = "DAI";
const AMOUNT_TO_WITHDRAW = "100";

(async () => {
  // global aptos provider
  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);
  // all pool-related operations client
  const poolClient = new PoolClient(aptosProvider);
  // user account
  const aptosPrivateKey = new Ed25519PrivateKey(
    PrivateKey.formatPrivateKey(
      USER_APTOS_ACCOUNT_PRIVATE_KEY,
      PrivateKeyVariants.Ed25519,
    ),
  );
  const userAccount = Account.fromPrivateKey({ privateKey: aptosPrivateKey });
  const coreClient = new CoreClient(
    aptosProvider,
    userAccount as Ed25519Account,
  );

  try {
    const allReserveUnderlyingTokens = await poolClient.getAllReservesTokens();
    const underlyingToken = allReserveUnderlyingTokens.find(
      (token) => token.symbol === CURRENCY_TO_WITHDRAW,
    );
    if (!underlyingToken) {
      throw new Error(`${underlyingToken} token was not found`);
    }
    const withdrawAmount = BigInt(AMOUNT_TO_WITHDRAW);
    console.log("Underlying token: ", underlyingToken.tokenAddress.toString());
    console.log("Value to withdraw: ", withdrawAmount.toString());

    const txHash = await coreClient.withdraw(
      underlyingToken.tokenAddress,
      withdrawAmount,
      userAccount.accountAddress,
    );

    console.info("Transaction executed: ", txHash.hash);
  } catch (ex) {
    console.error("Expection = ", ex);
  }
})();
