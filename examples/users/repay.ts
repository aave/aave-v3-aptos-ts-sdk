import {
  Account,
  Ed25519Account,
  Ed25519PrivateKey,
  PrivateKey,
  PrivateKeyVariants,
} from "@aptos-labs/ts-sdk";
import { MaxUint256 } from "ethers";
import { BigNumber } from "bignumber.js";
import { PoolClient } from "../../src/clients/poolClient";
import { AptosProvider, CoreClient } from "../../src/clients";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs";

const USER_APTOS_ACCOUNT_PRIVATE_KEY = "0x0";
const CURRENCY_TO_REPAY = "DAI";
const INTEREST_RATE_STRATEGY = 2;
const USE_A_TOKENS = true;

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
      (token) => token.symbol === CURRENCY_TO_REPAY,
    );
    if (!underlyingToken) {
      throw new Error(`${underlyingToken} token was not found`);
    }
    const AMOUNT_TO_REPAY = new BigNumber(MaxUint256.toString())
      .minus(1)
      .toFixed(0);
    const repayAmount = BigInt(AMOUNT_TO_REPAY);
    console.log("Underlying token: ", underlyingToken?.tokenAddress.toString());
    console.log("Value to repay: ", repayAmount.toString());
    console.log("Interest rate strategy: ", INTEREST_RATE_STRATEGY);
    console.log("Using A Tokens?: ", USE_A_TOKENS);

    const txHash = USE_A_TOKENS
      ? await coreClient.repayWithATokens(
          underlyingToken.tokenAddress,
          repayAmount,
          INTEREST_RATE_STRATEGY,
        )
      : await coreClient.repay(
          underlyingToken.tokenAddress,
          repayAmount,
          INTEREST_RATE_STRATEGY,
          userAccount.accountAddress,
        );

    console.info("Transaction executed: ", txHash.hash);
  } catch (ex) {
    console.error("Expection = ", ex);
  }
})();
