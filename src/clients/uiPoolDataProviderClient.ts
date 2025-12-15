import { AccountAddress, Ed25519Account } from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { UiPoolDataProviderContract } from "../contracts/uiPoolDataProvider";
import { SECONDS_PER_YEAR } from "../helpers";
import { calculateCompoundedRate } from "../math/rates";
import { FixedPointNumber } from "../math";

/**
 * Represents the aggregated reserve data for a specific asset in the Aave protocol.
 *
 * @property {string} underlyingAsset - The address of the underlying asset.
 * @property {string} name - The name of the asset.
 * @property {string} symbol - The symbol of the asset.
 * @property {number} decimals - The number of decimals of the asset.
 * @property {bigint} baseLTVasCollateral - The loan-to-value ratio for the asset when used as collateral.
 * @property {bigint} reserveLiquidationThreshold - The threshold at which the asset can be liquidated.
 * @property {bigint} reserveLiquidationBonus - The bonus applied during liquidation.
 * @property {bigint} reserveFactor - The reserve factor for the asset.
 * @property {boolean} usageAsCollateralEnabled - Whether the asset can be used as collateral.
 * @property {boolean} borrowingEnabled - Whether borrowing is enabled for the asset.
 * @property {boolean} isActive - Whether the asset is active.
 * @property {boolean} isFrozen - Whether the asset is frozen.
 * @property {bigint} liquidityIndex - The liquidity index of the asset.
 * @property {bigint} variableBorrowIndex - The variable borrow index of the asset.
 * @property {bigint} liquidityRate - The liquidity rate of the asset.
 * @property {bigint} variableBorrowRate - The variable borrow rate of the asset.
 * @property {number} lastUpdateTimestamp - The timestamp of the last update.
 * @property {string} aTokenAddress - The address of the aToken contract.
 * @property {string} variableDebtTokenAddress - The address of the variable debt token contract.
 * @property {bigint} availableLiquidity - The available liquidity of the asset.
 * @property {bigint} totalScaledVariableDebt - The total scaled variable debt of the asset.
 * @property {bigint} priceInMarketReferenceCurrency - The price of the asset in the market reference currency.
 * @property {string} priceOracle - The address of the price oracle.
 * @property {bigint} variableRateSlope1 - The first slope of the variable rate.
 * @property {bigint} variableRateSlope2 - The second slope of the variable rate.
 * @property {bigint} baseVariableBorrowRate - The base variable borrow rate.
 * @property {bigint} optimalUsageRatio - The optimal usage ratio.
 * @property {boolean} isPaused - Whether the asset is paused.
 * @property {boolean} isSiloedBorrowing - Whether the asset has siloed borrowing.
 * @property {bigint} accruedToTreasury - The amount accrued to the treasury.
 * @property {bigint} isolationModeTotalDebt - The total debt in isolation mode.
 * @property {boolean} flashLoanEnabled - Whether flash loans are enabled for the asset.
 * @property {bigint} debtCeiling - The debt ceiling for the asset.
 * @property {number} debtCeilingDecimals - The number of decimals for the debt ceiling.
 * @property {number} eModeCategoryId - The eMode category ID.
 * @property {bigint} borrowCap - The borrow cap for the asset.
 * @property {bigint} supplyCap - The supply cap for the asset.
 * @property {number} eModeLtv - The loan-to-value ratio in eMode.
 * @property {number} eModeLiquidationThreshold - The liquidation threshold in eMode.
 * @property {number} eModeLiquidationBonus - The liquidation bonus in eMode.
 * @property {string} eModeLabel - The label for eMode.
 * @property {boolean} borrowableInIsolation - Whether the asset is borrowable in isolation.
 */
export type AggregatedReserveData = {
  underlyingAsset: string;
  name: string;
  symbol: string;
  decimals: number;
  baseLTVasCollateral: bigint;
  reserveLiquidationThreshold: bigint;
  reserveLiquidationBonus: bigint;
  reserveFactor: bigint;
  usageAsCollateralEnabled: boolean;
  borrowingEnabled: boolean;
  isActive: boolean;
  isFrozen: boolean;
  // base data
  liquidityIndex: bigint;
  variableBorrowIndex: bigint;
  liquidityRate: bigint;
  variableBorrowRate: bigint;
  lastUpdateTimestamp: number;
  aTokenAddress: string;
  variableDebtTokenAddress: string;
  //
  availableLiquidity: bigint;
  totalScaledVariableDebt: bigint;
  priceInMarketReferenceCurrency: bigint;
  variableRateSlope1: bigint;
  variableRateSlope2: bigint;
  baseVariableBorrowRate: bigint;
  optimalUsageRatio: bigint;
  // v3 only
  isPaused: boolean;
  isSiloedBorrowing: boolean;
  accruedToTreasury: bigint;
  isolationModeTotalDebt: bigint;
  flashLoanEnabled: boolean;
  //
  debtCeiling: bigint;
  debtCeilingDecimals: number;
  eModeCategoryId: number;
  borrowCap: bigint;
  supplyCap: bigint;
  // e_mode
  eModeLtv: number;
  eModeLiquidationThreshold: number;
  eModeLiquidationBonus: number;
  eModeLabel: string;
  borrowableInIsolation: boolean;
  // liquidation
  deficit: bigint;
  virtualUnderlyingBalance: bigint;
  isVirtualAccActive: boolean;
  // special computed values
  variableBorrowAPY: number;
  supplyAPY: number;
};

/**
 * Represents the base currency data for a market.
 *
 * @typedef {Object} BaseCurrencyData
 * @property {number} marketReferenceCurrencyDecimals - The number of decimals for the market reference currency.
 * @property {bigint} marketReferenceCurrencyPriceInUsd - The price of the market reference currency in USD.
 * @property {bigint} networkBaseTokenPriceInUsd - The price of the network base token in USD.
 * @property {number} networkBaseTokenPriceDecimals - The number of decimals for the network base token price.
 */
export type BaseCurrencyData = {
  marketReferenceCurrencyDecimals: number;
  marketReferenceCurrencyPriceInUsd: bigint;
  networkBaseTokenPriceInUsd: bigint;
  networkBaseTokenPriceDecimals: number;
};

/**
 * Represents the data related to a user's reserve in the Aave protocol.
 *
 * @property {string} underlyingAsset - The address of the underlying asset.
 * @property {bigint} scaledATokenBalance - The scaled balance of AToken held by the user.
 * @property {boolean} usageAsCollateralEnabledOnUser - Indicates if the user has enabled the asset as collateral.
 * @property {bigint} scaledVariableDebt - The scaled variable debt of the user.
 * @property {number} decimals - The number of decimals of the underlying asset.
 */
export type UserReserveData = {
  underlyingAsset: string;
  scaledATokenBalance: bigint;
  usageAsCollateralEnabledOnUser: boolean;
  scaledVariableDebt: bigint;
  decimals: number;
};

/**
 * Represents the data structure for reserves and base currency information.
 *
 * @typedef {Object} ReservesData
 * @property {AggregatedReserveData[]} reservesData - An array of aggregated reserve data.
 * @property {BaseCurrencyData} baseCurrencyData - The data related to the base currency.
 */
export type ReservesData = {
  reservesData: AggregatedReserveData[];
  baseCurrencyData: BaseCurrencyData;
};

/**
 * Represents the data structure for user reserves.
 *
 * @typedef {Object} UserReservesData
 * @property {UserReserveData[]} userReserves - An array of user reserve data objects.
 * @property {number} userEmodeCategoryId - The ID of the user's e-mode category.
 */
export type UserReservesData = {
  userReserves: UserReserveData[];
  userEmodeCategoryId: number;
};

/**
 * The `UiPoolDataProviderClient` class provides methods to interact with the UI Pool Data Provider contract on the Aptos blockchain.
 * It extends the `AptosContractWrapperBaseClass` and includes functionalities for retrieving pool-related data in a format
 * suitable for UI applications, including reserve data, user reserve data, and base currency information within the AAVE protocol.
 *
 * @remarks
 * This client is designed to work with the UI Pool Data Provider contract and provides a high-level API for accessing
 * pool-related data in a format optimized for user interfaces. The client can be instantiated in two ways:
 * 1. Using the constructor directly with a provider and optional signer
 * 2. Using the static buildWithDefaultSigner method which automatically configures the client with the provider's pool profile account
 *
 * @example
 * ```typescript
 * // Using buildWithDefaultSigner
 * const provider = new AptosProvider();
 * const client = UiPoolDataProviderClient.buildWithDefaultSigner(provider);
 *
 * // Using constructor directly
 * const provider = new AptosProvider();
 * const signer = provider.getPoolProfileAccount();
 * const client = new UiPoolDataProviderClient(provider, signer);
 *
 * // Get reserves data including base currency information
 * const { reservesData, baseCurrencyData } = await client.getReservesData();
 *
 * // Get user-specific reserve data
 * const { userReserves, userEmodeCategoryId } = await client.getUserReserveData(userAddress);
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 * @param signer - Optional Ed25519Account signer for transaction signing.
 */
export class UiPoolDataProviderClient extends AptosContractWrapperBaseClass {
  uiPoolDataProviderContract: UiPoolDataProviderContract;

  /**
   * Creates an instance of the UiPoolDataProvider client.
   *
   * @param provider - The Aptos blockchain provider.
   * @param signer - Optional Ed25519 account signer.
   */
  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.uiPoolDataProviderContract = new UiPoolDataProviderContract(provider);
  }

  /**
   * Creates an instance of `UiPoolDataProviderClient` using the default signer.
   *
   * @param provider - The `AptosProvider` instance to be used for creating the client.
   * @returns A new instance of `UiPoolDataProviderClient` initialized with the provided `AptosProvider`.
   */
  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): UiPoolDataProviderClient {
    const client = new UiPoolDataProviderClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }

  /**
   * Retrieves the list of reserve accounts.
   *
   * This method calls the `getReservesList` function on the `uiPoolDataProviderContract`
   * and returns an array of `AccountAddress` objects.
   *
   * @returns {Promise<Array<AccountAddress>>} A promise that resolves to an array of `AccountAddress` objects.
   */
  public async getReservesList(): Promise<Array<AccountAddress>> {
    const resp = (
      (
        await this.callViewMethod(
          this.uiPoolDataProviderContract.getReservesList,
          [],
        )
      ).at(0) as Array<any>
    ).map((item) => AccountAddress.fromString(item as string));
    return resp;
  }

  /**
   * Fetches and returns the reserves data and base currency data.
   *
   * @returns {Promise<ReservesData>} A promise that resolves to an object containing reserves data and base currency data.
   *
   * The reserves data includes:
   * - underlyingAsset: The address of the underlying asset.
   * - name: The name of the reserve.
   * - symbol: The symbol of the reserve.
   * - decimals: The number of decimals of the reserve.
   * - baseLTVasCollateral: The base loan-to-value ratio as collateral.
   * - reserveLiquidationThreshold: The reserve liquidation threshold.
   * - reserveLiquidationBonus: The reserve liquidation bonus.
   * - reserveFactor: The reserve factor.
   * - usageAsCollateralEnabled: Whether usage as collateral is enabled.
   * - borrowingEnabled: Whether borrowing is enabled.
   * - isActive: Whether the reserve is active.
   * - isFrozen: Whether the reserve is frozen.
   * - liquidityIndex: The liquidity index.
   * - variableBorrowIndex: The variable borrow index.
   * - liquidityRate: The liquidity rate.
   * - variableBorrowRate: The variable borrow rate.
   * - lastUpdateTimestamp: The timestamp of the last update.
   * - aTokenAddress: The address of the aToken.
   * - variableDebtTokenAddress: The address of the variable debt token.
   * - availableLiquidity: The available liquidity.
   * - totalScaledVariableDebt: The total scaled variable debt.
   * - priceInMarketReferenceCurrency: The price in market reference currency.
   * - variableRateSlope1: The variable rate slope 1.
   * - variableRateSlope2: The variable rate slope 2.
   * - baseVariableBorrowRate: The base variable borrow rate.
   * - optimalUsageRatio: The optimal usage ratio.
   * - isPaused: Whether the reserve is paused.
   * - isSiloedBorrowing: Whether siloed borrowing is enabled.
   * - accruedToTreasury: The amount accrued to the treasury.
   * - isolationModeTotalDebt: The total debt in isolation mode.
   * - flashLoanEnabled: Whether flash loans are enabled.
   * - debtCeiling: The debt ceiling.
   * - debtCeilingDecimals: The number of decimals for the debt ceiling.
   * - eModeCategoryId: The eMode category ID.
   * - borrowCap: The borrow cap.
   * - supplyCap: The supply cap.
   * - eModeLtv: The eMode loan-to-value ratio.
   * - eModeLiquidationThreshold: The eMode liquidation threshold.
   * - eModeLiquidationBonus: The eMode liquidation bonus.
   * - eModeLabel: The label for the eMode.
   * - borrowableInIsolation: Whether borrowing in isolation is enabled.
   *
   * The base currency data includes:
   * - marketReferenceCurrencyDecimals: The number of decimals for the market reference currency.
   * - marketReferenceCurrencyPriceInUsd: The price of the market reference currency in USD.
   * - networkBaseTokenPriceInUsd: The price of the network base token in USD.
   * - networkBaseTokenPriceDecimals: The number of decimals for the network base token price.
   */
  public async getReservesData(): Promise<ReservesData> {
    const resp = await this.callViewMethod(
      this.uiPoolDataProviderContract.getReservesData,
      [],
    );
    const aggregatedReserveDataRaw = resp.at(0) as Array<any>;
    const reservesData = aggregatedReserveDataRaw.map((item) => ({
      underlyingAsset: AccountAddress.from(
        item.underlying_asset.toString(),
      ).toString(),
      name: item.name as string,
      symbol: item.symbol as string,
      decimals: Number(item.decimals.toString()),
      baseLTVasCollateral: BigInt(item.base_ltv_as_collateral),
      reserveLiquidationThreshold: BigInt(item.reserve_liquidation_threshold),
      reserveLiquidationBonus: BigInt(item.reserve_liquidation_bonus),
      reserveFactor: BigInt(item.reserve_factor),
      usageAsCollateralEnabled: item.usage_as_collateral_enabled as boolean,
      borrowingEnabled: item.borrowing_enabled as boolean,
      isActive: item.is_active as boolean,
      isFrozen: item.is_frozen as boolean,
      // base data
      liquidityIndex: BigInt(item.liquidity_index),
      variableBorrowIndex: BigInt(item.variable_borrow_index),
      liquidityRate: BigInt(item.liquidity_rate),
      variableBorrowRate: BigInt(item.variable_borrow_rate),
      lastUpdateTimestamp: Number(item.last_update_timestamp.toString()),
      aTokenAddress: AccountAddress.from(
        item.a_token_address.toString(),
      ).toString(),
      variableDebtTokenAddress: item.variable_debt_token_address.toString(),
      //
      availableLiquidity: BigInt(item.available_liquidity),
      totalScaledVariableDebt: BigInt(item.total_scaled_variable_debt),
      priceInMarketReferenceCurrency: BigInt(
        item.price_in_market_reference_currency,
      ),
      variableRateSlope1: BigInt(item.variable_rate_slope1),
      variableRateSlope2: BigInt(item.variable_rate_slope2),
      baseVariableBorrowRate: BigInt(item.base_variable_borrow_rate),
      optimalUsageRatio: BigInt(item.optimal_usage_ratio),
      // v3 only
      isPaused: item.is_paused as boolean,
      isSiloedBorrowing: item.is_siloed_borrowing as boolean,
      accruedToTreasury: BigInt(item.accrued_to_treasury),
      isolationModeTotalDebt: BigInt(item.isolation_mode_total_debt),
      flashLoanEnabled: item.flash_loan_enabled as boolean,
      //
      debtCeiling: BigInt(item.debt_ceiling),
      debtCeilingDecimals: Number(item.debt_ceiling_decimals.toString()),
      eModeCategoryId: Number(item.e_mode_category_id.toString()),
      borrowCap: BigInt(item.borrow_cap),
      supplyCap: BigInt(item.supply_cap),
      // e_mode
      eModeLtv: Number(item.e_mode_ltv.toString()),
      eModeLiquidationThreshold: Number(
        item.e_mode_liquidation_threshold.toString(),
      ),
      eModeLiquidationBonus: Number(item.e_mode_liquidation_bonus.toString()),
      eModeLabel: item.e_mode_label as string,
      borrowableInIsolation: item.borrowable_in_isolation as boolean,
      // liquidation
      deficit: BigInt(item.deficit),
      virtualUnderlyingBalance: BigInt(item.virtual_underlying_balance),
      isVirtualAccActive: item.is_virtual_acc_active as boolean,
      // special computed values
      variableBorrowAPY: calculateCompoundedRate(
        new FixedPointNumber(item.variable_borrow_rate, 27),
        Number(SECONDS_PER_YEAR),
      ).toNumber(),
      supplyAPY: calculateCompoundedRate(
        new FixedPointNumber(item.liquidity_rate, 27),
        Number(SECONDS_PER_YEAR),
      ).toNumber(),
    })) as AggregatedReserveData[];

    const basicCurrencyInfoRaw = resp.at(1) as any;
    const baseCurrencyData = {
      marketReferenceCurrencyDecimals: Number(
        basicCurrencyInfoRaw.market_reference_currency_unit.toString(),
      ),
      marketReferenceCurrencyPriceInUsd: BigInt(
        basicCurrencyInfoRaw.market_reference_currency_price_in_usd,
      ),
      networkBaseTokenPriceInUsd: BigInt(
        basicCurrencyInfoRaw.network_base_token_price_in_usd.toString(),
      ),
      networkBaseTokenPriceDecimals: Number(
        basicCurrencyInfoRaw.network_base_token_price_decimals.toString(),
      ),
    } as BaseCurrencyData;

    return { reservesData, baseCurrencyData };
  }

  /**
   * Retrieves the reserve data for a specific user.
   *
   * @param user - The address of the user whose reserve data is being retrieved.
   * @returns A promise that resolves to an object containing the user's reserves data and eMode category ID.
   *
   * The returned object has the following structure:
   * - `userReserves`: An array of objects representing the user's reserves. Each object contains:
   *   - `underlyingAsset`: The address of the underlying asset.
   *   - `scaledATokenBalance`: The scaled balance of A tokens.
   *   - `usageAsCollateralEnabledOnUser`: A boolean indicating if the asset is being used as collateral by the user.
   *   - `scaledVariableDebt`: The scaled variable debt of the user.
   *   - `decimals`: The number of decimals for the asset.
   * - `userEmodeCategoryId`: The eMode category ID of the user.
   */
  public async getUserReserveData(user: string): Promise<UserReservesData> {
    const resp = await this.callViewMethod(
      this.uiPoolDataProviderContract.getUserReservesData,
      [user],
    );
    const userReserveDataRaw = resp.at(0) as Array<any>;
    const userReserves = userReserveDataRaw.map(
      (item) =>
        ({
          underlyingAsset: AccountAddress.from(
            item.underlying_asset.toString(),
          ).toString(),
          scaledATokenBalance: BigInt(item.scaled_a_token_balance),
          usageAsCollateralEnabledOnUser:
            item.usage_as_collateral_enabled_on_user as boolean,
          scaledVariableDebt: BigInt(item.scaled_variable_debt),
          decimals: Number(item.decimals.toString()),
        }) as UserReserveData,
    );

    const userEmodeCategoryId = resp.at(1) as number;

    return { userReserves, userEmodeCategoryId };
  }
}
