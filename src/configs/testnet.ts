import { Network } from "@aptos-labs/ts-sdk";
import { AptosProviderConfig } from "../clients/aptosProvider";
import { ZERO_ADDRESS } from "../helpers";

export const DEFAULT_TESTNET_CONFIG: AptosProviderConfig = {
  network: Network.TESTNET,
  addresses: {
    A_TOKENS:
      "d0f9ff25e799cc9e830a12c16b19e96c80afd2cd2519e0650e7decdd817f3976",
    UNDERLYING_TOKENS:
      "8b36f64859c4abec40091ec600e58b483973a7574c66d0f5a7275c694faba16f",
    VARIABLE_TOKENS:
      "05d20cb8dd9803cbd33fd0ac339fa7ab6b54b6f1d287b89ca32a2063e61d51cb",
    AAVE_ACL:
      "b182d0c56e55710e44988b595a2645610212fdc07c6df34570db2c1f4eabbd76",
    AAVE_CONFIG:
      "380926568a74174ad655d6b95b66a5b43346274a6af914ddb7058506b049a9f9",
    AAVE_ORACLE:
      "929eb88d39b33d1be520549b0beae339957f06bc7cdf0d2fe5a2fd2f3a2b51c4",
    AAVE_POOL:
      "a8734ac972ca939d20f7772a01871f41d03e3e9c6da4e60378c6aed88be7dcdd",
    AAVE_RATE:
      "96404732ae801b4ec029cc2621697e8d08dd2a815ad56e1d2f1d056d67cb7774",
  },
};

export const EMPTY_TESTNET_CONFIG = (): AptosProviderConfig => {
  return {
    network: Network.TESTNET,
    addresses: {
      A_TOKENS: ZERO_ADDRESS.toString(),
      UNDERLYING_TOKENS: ZERO_ADDRESS.toString(),
      VARIABLE_TOKENS: ZERO_ADDRESS.toString(),
      AAVE_ACL: ZERO_ADDRESS.toString(),
      AAVE_CONFIG: ZERO_ADDRESS.toString(),
      AAVE_ORACLE: ZERO_ADDRESS.toString(),
      AAVE_POOL: ZERO_ADDRESS.toString(),
      AAVE_RATE: ZERO_ADDRESS.toString(),
    },
  } as AptosProviderConfig;
};

export const EMPTY_LOCAL_CONFIG = (): AptosProviderConfig => {
  return {
    network: Network.LOCAL,
    addresses: {
      A_TOKENS: ZERO_ADDRESS.toString(),
      UNDERLYING_TOKENS: ZERO_ADDRESS.toString(),
      VARIABLE_TOKENS: ZERO_ADDRESS.toString(),
      AAVE_ACL: ZERO_ADDRESS.toString(),
      AAVE_CONFIG: ZERO_ADDRESS.toString(),
      AAVE_ORACLE: ZERO_ADDRESS.toString(),
      AAVE_POOL: ZERO_ADDRESS.toString(),
      AAVE_RATE: ZERO_ADDRESS.toString(),
    },
  } as AptosProviderConfig;
};
