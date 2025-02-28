// ----------------
// MATH
// ----------------

import { AccountAddress } from "@aptos-labs/ts-sdk";

export const ONE_OCTA = 100_000_000;
export const PERCENTAGE_FACTOR = "10000";
export const HALF_PERCENTAGE = (BigInt(PERCENTAGE_FACTOR) / 2n).toString();
export const WAD = (BigInt(10) ** 18n).toString();
export const HALF_WAD = (BigInt(WAD) / 2n).toString();
export const RAY = (BigInt(10) ** 27n).toString();
export const HALF_RAY = (BigInt(RAY) / 2n).toString();
export const WAD_RAY_RATIO = (10e8).toString();
export const oneEther = (10e17).toString();
export const oneRay = (10e26).toString();
export const MAX_UINT_AMOUNT =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";
export const MAX_BORROW_CAP = "68719476735";
export const MAX_SUPPLY_CAP = "68719476735";
export const MAX_UNBACKED_MINT_CAP = "68719476735";
export const ONE_YEAR = "31536000";
export const ZERO_ADDRESS = AccountAddress.ZERO;
export const ONE_ADDRESS = "0x1";
// ----------------
// PROTOCOL GLOBAL PARAMS
// ----------------
export const MOCK_USD_PRICE_IN_WEI = "5848466240000000";
export const USD_ADDRESS = "0x10F7Fc1F91Ba351f9C629c5947AD69bD03C05b96";
export const AAVE_REFERRAL = 0;
export const INTEREST_RATE_MODES = {
  NONE: 0,
  VARIABLE: 2,
};
