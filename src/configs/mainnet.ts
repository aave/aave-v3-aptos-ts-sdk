import { AccountAddress, Network } from "@aptos-labs/ts-sdk";
import { AptosProviderConfig } from "../clients/aptosProvider";

/**
 * Configuration object for the Aave V3 Mainnet on Aptos.
 *
 * @constant
 * @type {AptosProviderConfig}
 * @property {Network} network - The network type, set to TESTNET.
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
    AAVE_MOCK_UNDERLYINGS: AccountAddress.fromString("0x0"),
    AAVE_ACL: AccountAddress.fromString("0x0"),
    AAVE_CONFIG: AccountAddress.fromString("0x0"),
    AAVE_ORACLE: AccountAddress.fromString("0x0"),
    AAVE_POOL: AccountAddress.fromString("0x0"),
    AAVE_DATA: AccountAddress.fromString("0x0"),
    AAVE_MATH: AccountAddress.fromString("0x0"),
  },
  assets: {
    APT: AccountAddress.fromString(
      "0x000000000000000000000000000000000000000000000000000000000000001a",
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
  },
};
