import {
  Account,
  AccountAddress,
  Ed25519PrivateKey,
  PrivateKey,
  PrivateKeyVariants,
} from "@aptos-labs/ts-sdk";
import { UnderlyingTokensClient } from "../../src/clients/underlyingTokensClient";
import { PoolClient } from "../../src/clients/poolClient";
import { AptosProvider } from "../../src/clients";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs/testnet";

const UNDERLYING_MANAGER_PRIVATE_KEY = "0x0";
const ADDRESSES_TO_FUND = ["0x0"].map((addr) =>
  AccountAddress.fromString(addr),
);
const fundAmount = BigInt(1000);

(async () => {
  // global aptos provider
  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);
  // all underlying-tokens-related operations client
  const underlyingTokensClient = new UnderlyingTokensClient(aptosProvider);
  // all pool-related operations client
  const poolClient = new PoolClient(aptosProvider);

  try {
    // get all reserve underlying tokens
    const allReserveUnderlyingTokens = await poolClient.getAllReservesTokens();

    // set the tx sender
    const underlyingManagerAccount = Account.fromPrivateKey({
      privateKey: new Ed25519PrivateKey(
        PrivateKey.formatPrivateKey(
          UNDERLYING_MANAGER_PRIVATE_KEY,
          PrivateKeyVariants.Ed25519,
        ),
      ),
    });
    underlyingTokensClient.setSigner(underlyingManagerAccount);

    // get details for each underlying token
    for (const reserveUnderlyingToken of allReserveUnderlyingTokens) {
      for (const addressToFund of ADDRESSES_TO_FUND) {
        const txReceipt = await underlyingTokensClient.mint(
          addressToFund,
          fundAmount,
          reserveUnderlyingToken.tokenAddress,
        );
        console.log(`User addresses ${addressToFund.toString()} funded with ${fundAmount.toString()} ${
          reserveUnderlyingToken.symbol
        }
        Tx Hash = ${txReceipt.hash}`);
      }
    }
  } catch (ex) {
    console.error("Expection = ", ex);
  }
})();
