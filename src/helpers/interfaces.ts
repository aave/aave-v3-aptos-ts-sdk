import "./wadraymath";

/**
 * Represents metadata information.
 */
export interface Metadata {
  inner: string;
}

/**
 * Interface representing the data related to a user's reserve in the Aave protocol.
 *
 * @property {bigint} scaledATokenBalance - The scaled balance of AToken held by the user.
 * @property {bigint} currentATokenBalance - The current balance of AToken held by the user.
 * @property {bigint} currentVariableDebt - The current variable debt of the user.
 * @property {bigint} scaledVariableDebt - The scaled variable debt of the user.
 * @property {bigint} liquidityRate - The liquidity rate of the reserve.
 * @property {boolean} usageAsCollateralEnabled - Indicates if the reserve can be used as collateral.
 * @property {bigint} walletBalance - The balance of the user's wallet.
 * @property {bigint | string | boolean} [key: string] - Additional properties that can be of type bigint, string, or boolean.
 */
export interface UserReserveData {
  scaledATokenBalance: bigint;
  currentATokenBalance: bigint;
  currentVariableDebt: bigint;
  scaledVariableDebt: bigint;
  liquidityRate: bigint;
  usageAsCollateralEnabled: boolean;
  walletBalance: bigint;
  [key: string]: bigint | string | boolean;
}

/**
 * Interface representing the data structure for a reserve in the Aave V3 protocol on Aptos.
 *
 * @interface ReserveData
 *
 * @property {string} address - The address of the reserve.
 * @property {string} symbol - The symbol of the reserve.
 * @property {bigint} decimals - The number of decimals of the reserve.
 * @property {bigint} reserveFactor - The reserve factor of the reserve.
 * @property {bigint} availableLiquidity - The available liquidity in the reserve.
 * @property {bigint} totalLiquidity - The total liquidity in the reserve.
 * @property {bigint} totalVariableDebt - The total variable debt in the reserve.
 * @property {bigint} scaledVariableDebt - The scaled variable debt in the reserve.
 * @property {bigint} variableBorrowRate - The variable borrow rate of the reserve.
 * @property {bigint} supplyUsageRatio - The supply usage ratio of the reserve.
 * @property {bigint} borrowUsageRatio - The borrow usage ratio of the reserve.
 * @property {bigint} liquidityIndex - The liquidity index of the reserve.
 * @property {bigint} variableBorrowIndex - The variable borrow index of the reserve.
 * @property {string} aTokenAddress - The address of the aToken associated with the reserve.
 * @property {bigint} lastUpdateTimestamp - The timestamp of the last update of the reserve data.
 * @property {bigint} liquidityRate - The liquidity rate of the reserve.
 * @property {bigint} unbacked - The amount of unbacked liquidity in the reserve.
 * @property {bigint} accruedToTreasuryScaled - The amount accrued to the treasury, scaled.
 * @property {bigint | string} [key: string] - Additional properties of the reserve, which can be either a bigint or a string.
 */
export interface ReserveData {
  address: string;
  symbol: string;
  decimals: bigint;
  reserveFactor: bigint;
  availableLiquidity: bigint;
  totalLiquidity: bigint;
  totalVariableDebt: bigint;
  scaledVariableDebt: bigint;
  variableBorrowRate: bigint;
  supplyUsageRatio: bigint;
  borrowUsageRatio: bigint;
  liquidityIndex: bigint;
  variableBorrowIndex: bigint;
  aTokenAddress: string;
  lastUpdateTimestamp: bigint;
  liquidityRate: bigint;
  unbacked: bigint;
  accruedToTreasuryScaled: bigint;
  [key: string]: bigint | string;
}
