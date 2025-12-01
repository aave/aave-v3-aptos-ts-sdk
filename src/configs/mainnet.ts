import { AccountAddress, Network } from "@aptos-labs/ts-sdk";
import { AptosProviderConfig } from "../clients/aptosProvider";
import { ZERO_ADDRESS } from "../helpers";

/**
 * Configuration object for the Aave V3 Mainnet on Aptos.
 *
 * @constant
 * @type {AptosProviderConfig}
 * @property {Network} network - The network type, set to MAINNET.
 * @property {Object} addresses - The addresses for various Aave components.
 * @property {AccountAddress} addresses.AAVE_MOCK_UNDERLYINGS - Address for mock underlying tokens.
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
export const DEFAULT_MAINNET_CONFIG: AptosProviderConfig = {
  network: Network.MAINNET,
  addresses: {
    AAVE_MOCK_UNDERLYINGS: AccountAddress.fromString(
      "12b05c42ac3209a3c6ffadff4ebb6c3e983e5115f26031d56652815b49a14245",
    ),
    AAVE_ACL: AccountAddress.fromString(
      "34c3e6af238f3a7fa3f3b0088cbc4b194d21f62e65a15b79ae91364de5a81a3a",
    ),
    AAVE_CONFIG: AccountAddress.fromString(
      "531069f4741cdead39d70b76e5779863864654fae6db8a752a244ff2f9916c15",
    ),
    AAVE_ORACLE: AccountAddress.fromString(
      "249676f3faddb83d64fd101baa3f84a171ae02505d796e3edbf4861038a4b5cc",
    ),
    AAVE_POOL: AccountAddress.fromString(
      "39ddcd9e1a39fa14f25e3f9ec8a86074d05cc0881cbf667df8a6ee70942016fb",
    ),
    AAVE_DATA: AccountAddress.fromString(
      "5eb5cc775c5a446db0f3a1c944e11563b97e6a7e1387b9fb459aa26168f738dc",
    ),
    AAVE_MATH: AccountAddress.fromString(
      "c0338eea778de2a5348824ddbfcec033c7f7cbe18da6da40869562906b63c78c",
    ),
  },
  assets: {
    APT: AccountAddress.fromString(
      "0x000000000000000000000000000000000000000000000000000000000000000a",
    ),
    USDC: AccountAddress.fromString(
      "0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b",
    ),
    USDT: AccountAddress.fromString(
      "0x357b0b74bc833e95a115ad22604854d6b0fca151cecd94111770e5d6ffc9dc2b",
    ),
    sUSDe: AccountAddress.fromString(
      "0xb30a694a344edee467d9f82330bbe7c3b89f440a1ecd2da1f3bca266560fce69",
    ),
    GHO: ZERO_ADDRESS, // TODO: update when deployed
  },
};
