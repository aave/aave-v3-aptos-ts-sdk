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
      "b7c5d1957622a6d965a4a53a5b69aea542dea6286297ee68d83f48a375e91194",
    ),
    AAVE_ACL: AccountAddress.fromString(
      "efd9ce5a75d51fea8974b3fedf08b13c346454f4921e7ce3dd40550341f02694",
    ),
    AAVE_CONFIG: AccountAddress.fromString(
      "94b0863c0f1f150dc79853d5b421360861cbbf97ecdb1302c5dc5787647b0d53",
    ),
    AAVE_ORACLE: AccountAddress.fromString(
      "32086123c0fb7df1e0766e627d15cd0b75c1dafa1948ac85a102d7d7e62bd3dd",
    ),
    AAVE_POOL: AccountAddress.fromString(
      "fbe127a6d4967d90aaddc551765d4078c198e0642c01904a3383d91b69d0cb0f",
    ),
    AAVE_DATA: AccountAddress.fromString(
      "83cb9d6e494e23ad278d4cbb7a769818a6f8452395ce204d77c8eb503a74e6ec",
    ),
    AAVE_MATH: AccountAddress.fromString(
      "e32e2ce629706062417da3b2fc29d8d1c4d67a00a344cabdb7492d1b9a3f7618",
    ),
  },
  assets: {
    APT: AccountAddress.fromString(
      "0x000000000000000000000000000000000000000000000000000000000000000a",
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
  aptosApiKey: process.env.NODE_API_KEY,
};
