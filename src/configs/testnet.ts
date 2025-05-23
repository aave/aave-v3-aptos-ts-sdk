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
 * @property {string} addresses.AAVE_MOCK_UNDERLYINGS - Address for mock underlying tokens.
 * @property {string} addresses.VARIABLE_TOKENS - Address for variable tokens.
 * @property {string} addresses.AAVE_ACL - Address for Aave ACL.
 * @property {string} addresses.AAVE_CONFIG - Address for Aave configuration.
 * @property {string} addresses.AAVE_ORACLE - Address for Aave oracle.
 * @property {string} addresses.AAVE_POOL - Address for Aave pool.
 * @property {string} addresses.AAVE_DATA - Address for Aave data.
 */
export const DEFAULT_TESTNET_CONFIG: AptosProviderConfig = {
  network: Network.TESTNET,
  addresses: {
    A_TOKENS:
      "013d0ea11f0fc34c7015f1165ffedfab30bfbbff2339b751ca4647b5ef86355e",
    AAVE_MOCK_UNDERLYINGS:
      "e648d33e904826379289bbdb9822420df694e16899209204ccbba31f75261362",
    VARIABLE_TOKENS:
      "85eb6f334001962d33f9ea5bf6aff5d0fa5822e4addc28a41528868bd8b871a9",
    AAVE_ACL:
      "6d55c5b6576849cc6f0b90697c42dfbf9e6d3e025d51a41c2f0432d2d65c9824",
    AAVE_CONFIG:
      "cc1b69d99e947aff535b23adbbb7fbfa16d5f5030f8e6f0f02c4eea07ba07b86",
    AAVE_ORACLE:
      "f94c9646439f038a0dfe35811783e1940adbb7392169d540b0cba8d72f5f273b",
    AAVE_POOL:
      "592c08420009a731eaddc0dc28e74dfc026d26afc540bd5add4353142b4b1468",
    AAVE_DATA:
      "a206e35d14b6bb800e4b513374db7c81d4b2453a85831e4f211e9d7b251a1e70",
    AAVE_MATH:
      "533eb45236c1dd3d868cc498a9cd0bd503fabd33565d1f627c26f62ce216e3d6",
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
      AAVE_MOCK_UNDERLYINGS: ZERO_ADDRESS.toString(),
      VARIABLE_TOKENS: ZERO_ADDRESS.toString(),
      AAVE_ACL: ZERO_ADDRESS.toString(),
      AAVE_CONFIG: ZERO_ADDRESS.toString(),
      AAVE_ORACLE: ZERO_ADDRESS.toString(),
      AAVE_POOL: ZERO_ADDRESS.toString(),
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
      AAVE_MOCK_UNDERLYINGS: ZERO_ADDRESS.toString(),
      VARIABLE_TOKENS: ZERO_ADDRESS.toString(),
      AAVE_ACL: ZERO_ADDRESS.toString(),
      AAVE_CONFIG: ZERO_ADDRESS.toString(),
      AAVE_ORACLE: ZERO_ADDRESS.toString(),
      AAVE_POOL: ZERO_ADDRESS.toString(),
    },
  } as AptosProviderConfig;
};
