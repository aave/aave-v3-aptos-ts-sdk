import { Network } from "@aptos-labs/ts-sdk";
import { AptosProviderConfig } from "../clients/aptosProvider";
import { ZERO_ADDRESS } from "../helpers";

/**
 * Generates an empty local configuration for the Aptos provider.
 *
 * @returns {AptosProviderConfig} An object containing the local network configuration with all addresses set to ZERO_ADDRESS.
 */
export const EMPTY_LOCAL_CONFIG = (): AptosProviderConfig => {
  return {
    network: Network.LOCAL,
    addresses: {
      A_TOKENS: ZERO_ADDRESS,
      AAVE_MOCK_UNDERLYINGS: ZERO_ADDRESS,
      VARIABLE_TOKENS: ZERO_ADDRESS,
      AAVE_ACL: ZERO_ADDRESS,
      AAVE_CONFIG: ZERO_ADDRESS,
      AAVE_ORACLE: ZERO_ADDRESS,
      AAVE_POOL: ZERO_ADDRESS,
      AAVE_DATA: ZERO_ADDRESS,
      AAVE_MATH: ZERO_ADDRESS,
    },
    assets: {
      APT: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      USDT: ZERO_ADDRESS,
      sUSDe: ZERO_ADDRESS,
    },
  } as AptosProviderConfig;
};
