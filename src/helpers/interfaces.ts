import "./wadraymath";

// Common Interfaces
export interface Metadata {
  inner: string;
}

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
