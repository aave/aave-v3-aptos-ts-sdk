import { AccountAddress, Network } from "@aptos-labs/ts-sdk";
import { AptosProviderConfig } from "../clients/aptosProvider";

/**
 * Configuration object for the Aave V3 Testnet on Aptos.
 *
 * @constant
 * @type {AptosProviderConfig}
 * @property {Network} network - The network type, set to TESTNET.
 * @property {Object} addresses - The addresses for various Aave components.
 * @property {AccountAddress} addresses.A_TOKENS - Address for Aave A Tokens.
 * @property {AccountAddress} addresses.AAVE_MOCK_UNDERLYINGS - Address for mock underlying tokens.
 * @property {AccountAddress} addresses.VARIABLE_TOKENS - Address for variable tokens.
 * @property {AccountAddress} addresses.AAVE_ACL - Address for Aave ACL.
 * @property {AccountAddress} addresses.AAVE_CONFIG - Address for Aave configuration.
 * @property {AccountAddress} addresses.AAVE_ORACLE - Address for Aave oracle.
 * @property {AccountAddress} addresses.AAVE_POOL - Address for Aave pool.
 * @property {AccountAddress} addresses.AAVE_DATA - Address for Aave data.
 * @property {AccountAddress} assets.APT - Address for APT asset.
 * @property {AccountAddress} assets.USDC - Address for USDC asset.
 * @property {AccountAddress} assets.USDT - Address for USDT asset.
 * @property {AccountAddress} assets.sUSDe - Address for sUSDe asset.
 */
export const DEFAULT_TESTNET_CONFIG: AptosProviderConfig = {
  network: Network.TESTNET,
  addresses: {
    A_TOKENS: AccountAddress.fromString(
      "013d0ea11f0fc34c7015f1165ffedfab30bfbbff2339b751ca4647b5ef86355e",
    ),
    AAVE_MOCK_UNDERLYINGS: AccountAddress.fromString(
      "e648d33e904826379289bbdb9822420df694e16899209204ccbba31f75261362",
    ),
    VARIABLE_TOKENS: AccountAddress.fromString(
      "85eb6f334001962d33f9ea5bf6aff5d0fa5822e4addc28a41528868bd8b871a9",
    ),
    AAVE_ACL: AccountAddress.fromString(
      "6d55c5b6576849cc6f0b90697c42dfbf9e6d3e025d51a41c2f0432d2d65c9824",
    ),
    AAVE_CONFIG: AccountAddress.fromString(
      "cc1b69d99e947aff535b23adbbb7fbfa16d5f5030f8e6f0f02c4eea07ba07b86",
    ),
    AAVE_ORACLE: AccountAddress.fromString(
      "f94c9646439f038a0dfe35811783e1940adbb7392169d540b0cba8d72f5f273b",
    ),
    AAVE_POOL: AccountAddress.fromString(
      "592c08420009a731eaddc0dc28e74dfc026d26afc540bd5add4353142b4b1468",
    ),
    AAVE_DATA: AccountAddress.fromString(
      "a206e35d14b6bb800e4b513374db7c81d4b2453a85831e4f211e9d7b251a1e70",
    ),
    AAVE_MATH: AccountAddress.fromString(
      "533eb45236c1dd3d868cc498a9cd0bd503fabd33565d1f627c26f62ce216e3d6",
    ),
  },
  assets: {
    APT: AccountAddress.fromString(
      "0x000000000000000000000000000000000000000000000000000000000000001a",
    ),
    USDC: AccountAddress.fromString(
      "0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832",
    ),
    USDT: AccountAddress.fromString(
      "0xd5d0d561493ea2b9410f67da804653ae44e793c2423707d4f11edb2e38192050",
    ),
    sUSDe: AccountAddress.fromString(
      "0x8e67e42c4ff61e16dca908b737d1260b312143c1f7ba1577309f075a27cb4d90",
    ),
  },
};
