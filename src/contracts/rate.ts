import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients";

/**
 * Represents the PoolContract class which interacts with the AAVE protocol on the Aptos blockchain.
 *
 * This class initializes various function addresses for interacting with the AAVE protocol.
 *
 * The function addresses are categorized into several sections:
 *
 * - **Pool**: Functions related to pool operations such as minting to treasury, resetting isolation mode total debt, rescuing tokens, setting bridge protocol fees, and setting flashloan premiums.
 * - **Pool View**: Functions for retrieving pool data such as revision, reserve configuration, reserve data, reserves count, reserves list, reserve address by ID, reserve normalized variable debt, reserve normalized income, user configuration, bridge protocol fee, flashloan premium total, flashloan premium to protocol, max number of reserves, scaled AToken total supply, scaled AToken balance, scaled variable token total supply, and scaled variable token balance.
 * - **Pool Configurator**: Functions for configuring the pool such as initializing reserves, dropping reserves, setting asset emode category, setting borrow cap, setting borrowable in isolation, setting debt ceiling, setting emode category, setting liquidation protocol fee, setting pool pause, setting reserve active, setting reserve borrowing, configuring reserve as collateral, setting reserve factor, setting reserve flash loaning, setting reserve freeze, setting reserve pause, setting siloed borrowing, setting supply cap, setting unbacked mint cap, updating bridge protocol fee, updating flashloan premium to protocol, and updating flashloan premium total.
 * - **E Mode Logic**: Functions for emode logic such as setting user emode, configuring emode category, getting emode category data, and getting user emode.
 * - **Default Reserve Interest Rate Strategy**: Functions for default reserve interest rate strategy such as setting reserve interest rate strategy, getting optimal usage ratio, getting max excess usage ratio, getting variable rate slope1, getting variable rate slope2, getting base variable borrow rate, getting max variable borrow rate, and calculating interest rates.
 * - **Pool Data Provider**: Functions for pool data provider such as getting all reserves tokens, getting all ATokens, getting all variable tokens, getting reserve configuration data, getting reserve emode category, getting reserve caps, getting paused status, getting siloed borrowing, getting liquidation protocol fee tokens, getting unbacked mint cap, getting debt ceiling, getting debt ceiling decimals, getting reserve data, getting AToken total supply, getting total debt, getting user reserve data, getting reserve tokens addresses, and getting flash loan enabled status.
 * - **Pool Addresses Provider**: Functions for pool addresses provider such as checking if ID mapped account exists, getting market ID, getting address, getting pool, getting pool configurator, getting price oracle, getting ACL manager, getting ACL admin, getting price oracle sentinel, getting pool data provider, setting market ID, setting address, setting pool implementation, setting pool configurator, setting price oracle, setting ACL manager, setting ACL admin, setting price oracle sentinel, and setting pool data provider.
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 */
export class RateContract {
  // Resource Func Addr

  /**
   * -------------------------------------------------------------------------
   * default_reserve_interest_rate_strategy
   * -------------------------------------------------------------------------=
   */
  // Entry
  SetReserveInterestRateStrategyFuncAddr: MoveFunctionId;

  // View
  GetGetOptimalUsageRatioFuncAddr: MoveFunctionId;

  GetGetMaxExcessUsageRatioFuncAddr: MoveFunctionId;

  GetVariableRateSlope1FuncAddr: MoveFunctionId;

  GetVariableRateSlope2FuncAddr: MoveFunctionId;

  GetBaseVariableBorrowRateFuncAddr: MoveFunctionId;

  GetMaxVariableBorrowRateFuncAddr: MoveFunctionId;

  CalculateInterestRatesFuncAddr: MoveFunctionId;

  AssetInterestRateExists: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const RateManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_RATE,
    );
    const RateManagerAccountAddress = RateManager.toString();

    /**
     * -------------------------------------------------------------------------
     * default_reserve_interest_rate_strategy
     * -------------------------------------------------------------------------
     */
    this.SetReserveInterestRateStrategyFuncAddr = `${RateManagerAccountAddress}::default_reserve_interest_rate_strategy::set_reserve_interest_rate_strategy`;
    this.AssetInterestRateExists = `${RateManagerAccountAddress}::interest_rate_strategy::asset_interest_rate_exists`;
    this.GetGetOptimalUsageRatioFuncAddr = `${RateManagerAccountAddress}::interest_rate_strategy::get_optimal_usage_ratio`;
    this.GetVariableRateSlope1FuncAddr = `${RateManagerAccountAddress}::interest_rate_strategy::get_variable_rate_slope1`;
    this.GetVariableRateSlope2FuncAddr = `${RateManagerAccountAddress}::interest_rate_strategy::get_variable_rate_slope2`;
    this.GetBaseVariableBorrowRateFuncAddr = `${RateManagerAccountAddress}::interest_rate_strategy::get_base_variable_borrow_rate`;
    this.GetMaxVariableBorrowRateFuncAddr = `${RateManagerAccountAddress}::interest_rate_strategy::get_max_variable_borrow_rate`;
    this.GetGetMaxExcessUsageRatioFuncAddr = `${RateManagerAccountAddress}::interest_rate_strategy::get_max_excess_usage_ratio`;
    this.CalculateInterestRatesFuncAddr = `${RateManagerAccountAddress}::interest_rate_strategy::calculate_interest_rates`;
  }
}
