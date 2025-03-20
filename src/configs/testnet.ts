import { Network } from "@aptos-labs/ts-sdk";
import { AptosProviderConfig } from "../clients/aptosProvider";
import { ZERO_ADDRESS } from "../helpers";

/**
 * Configuration object for the Aave V3 Testnet on Aptos.
 *
 * @constant
 * @type {AptosProviderConfig}
 * @property {Network} network - The network type, set to TESTNET.
 * @property {Object} addresses - The addresses for various Aave components.
 * @property {string} addresses.A_TOKENS - Address for Aave A Tokens.
 * @property {string} addresses.UNDERLYING_TOKENS - Address for underlying tokens.
 * @property {string} addresses.VARIABLE_TOKENS - Address for variable tokens.
 * @property {string} addresses.AAVE_ACL - Address for Aave ACL.
 * @property {string} addresses.AAVE_CONFIG - Address for Aave configuration.
 * @property {string} addresses.AAVE_ORACLE - Address for Aave oracle.
 * @property {string} addresses.AAVE_POOL - Address for Aave pool.
 * @property {string} addresses.AAVE_RATE - Address for Aave rate.
 * @property {string} addresses.AAVE_DATA - Address for Aave data.
 */
export const DEFAULT_TESTNET_CONFIG: AptosProviderConfig = {
  network: Network.LOCAL,
  addresses: {
    A_TOKENS:
      "e671301ec5ecfe5de46b87a87c6f479c788f1a7cfafc1b474bc0b0a4330b0c15",
    UNDERLYING_TOKENS:
      "014066b3e527b0b87a6216b7cf1379f1f828de5e0aceea9b4a0b9a421945a933",
    VARIABLE_TOKENS:
      "e900ccb0df257158941427d94abbecfa6f9693c1a4da0ddac02ad82baf197e55",
    AAVE_ACL:
      "024e01fa503119e76bf9eea69eec59884fc3da82f5ea23bf5f20f8ce358a4606",
    AAVE_CONFIG:
      "a888dd108ea636a234c973b8b72b9cadf0c7ae94d6f355c64dde9fdc275724ee",
    AAVE_ORACLE:
      "c1b23ac8ce67df6361b241bfa30a22c9b177fe39c471334a514eea977e6673a9",
    AAVE_POOL:
      "d5044d9f4b80910ef7b8910a68d2ac257d14319fb9315ddce1ca5190878bc8ea",
    AAVE_RATE:
      "800010ed1fe94674af83640117490d459e20441eab132c17e7ff39b7ae07a722",
    AAVE_DATA:
      "568ea1b4c9d473897be294ad40402c0102a3f3416bd8a5f25769bbfb571313bc",
  },
};

/**
 * Generates an empty configuration object for the Aptos testnet.
 *
 * @returns {AptosProviderConfig} An object containing default addresses set to ZERO_ADDRESS for the Aptos testnet.
 *
 * @example
 * const config = EMPTY_TESTNET_CONFIG();
 * console.log(config.network); // Output: Network.TESTNET
 * console.log(config.addresses.A_TOKENS); // Output: ZERO_ADDRESS
 */
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

/**
 * Generates an empty local configuration for the Aptos provider.
 *
 * @returns {AptosProviderConfig} An object containing the local network configuration with all addresses set to ZERO_ADDRESS.
 */
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
