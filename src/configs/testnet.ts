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
      "e2b42cab2f84bf57edaf87bcaffee409c2b3d5243e3def00d9d2f7dec568d867",
    ),
    AAVE_ACL: AccountAddress.fromString(
      "b23539ad6490a465e92e751943a3eaedf4b48d7d844ff59adf2ae66bcb09f53d",
    ),
    AAVE_CONFIG: AccountAddress.fromString(
      "4fb5d8348c8873295f97136bbe1c43d976fb18a4a966a85e21d16958eaecef99",
    ),
    AAVE_ORACLE: AccountAddress.fromString(
      "cb9eb79a52f41933192c2e1e37a9e72bfd726fdb9a687cd6cfe45527e52f4e41",
    ),
    AAVE_POOL: AccountAddress.fromString(
      "bd7912c555a06809c2e385eab635ff0ef52b1fa062ce865c785c67694a12bb12",
    ),
    AAVE_DATA: AccountAddress.fromString(
      "f1099f135ddddad1c065203431be328a408b0ca452ada70374ce26bd2b32fdd3",
    ),
    AAVE_MATH: AccountAddress.fromString(
      "f6f896cefd7b1b1e85ff56033981cf92dcd5d6e93b1349a7ab5003761c52498d",
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
    GHO: AccountAddress.fromString(
      "0x2afa0044d69edb73dca4103b79a293952b0a50feb96c328c56d87bf20de5b163",
    ),
  },
  aptosApiKey: process.env.NODE_API_KEY,
};
