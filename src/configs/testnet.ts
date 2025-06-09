import { AccountAddress, Network } from "@aptos-labs/ts-sdk";
import { AptosProviderConfig } from "../clients/aptosProvider";

/**
 * Configuration object for the Aave V3 Testnet on Aptos.
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
export const DEFAULT_TESTNET_CONFIG: AptosProviderConfig = {
  network: Network.TESTNET,
  addresses: {
    AAVE_MOCK_UNDERLYINGS: AccountAddress.fromString(
      "b00d6bcf3a364911272a68a88cdac1f65f8edac70d130aa9ac3f5102dbbbc191",
    ),
    AAVE_ACL: AccountAddress.fromString(
      "568f29f6f6b7c98a3dd01f6a8aedb78d8762bab680cc86eb71dfd9ae36da9be2",
    ),
    AAVE_CONFIG: AccountAddress.fromString(
      "25caba811383306e7ea3e71e5509e5f7eaebecb1eaa9e3d92886a6d4b257e807",
    ),
    AAVE_ORACLE: AccountAddress.fromString(
      "2fde62d8da9c2d84d57f05c6001234978b576aa08dad812f174678ed038f7b42",
    ),
    AAVE_POOL: AccountAddress.fromString(
      "1620b721b1bc9e78f0a625b96eedb7180f9002d239e8c1495a892abb59364b0a",
    ),
    AAVE_DATA: AccountAddress.fromString(
      "8947b37ff5127ae48182a8edab19d888f6a6c7b4cd76424461505ece250c37b2",
    ),
    AAVE_MATH: AccountAddress.fromString(
      "843039cec95dcc3e9da8cd6dc1abbfb636a011290b43152daf7223e49c312d50",
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
