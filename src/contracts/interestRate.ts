import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients";

/**
 * Represents the InterestRateContract interface which defines the function addresses for interest rate operations
 * within the AAVE protocol on the Aptos blockchain.
 *
 * @remarks
 * This interface is used by the corresponding client classes to make actual calls to the blockchain.
 * The constructor initializes all function addresses by combining:
 * - The pool manager's account address from the provider
 * - The module name (default_reserve_interest_rate_strategy)
 * - The specific function name
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const interestRate = new InterestRateContract(provider);
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 */
export class InterestRateContract {
  // Resource Functions
  setReserveInterestRateStrategyFuncAddr: MoveFunctionId;
  getReserveInterestRateStrategyFuncAddr: MoveFunctionId;
  getReserveInterestRateStrategyBspFuncAddr: MoveFunctionId;
  getGetOptimalUsageRatioFuncAddr: MoveFunctionId;
  getVariableRateSlope1FuncAddr: MoveFunctionId;
  getVariableRateSlope2FuncAddr: MoveFunctionId;
  getBaseVariableBorrowRateFuncAddr: MoveFunctionId;
  getMaxVariableBorrowRateFuncAddr: MoveFunctionId;
  calculateInterestRatesFuncAddr: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const PoolManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const PoolManagerAccountAddress = PoolManager.toString();
    this.setReserveInterestRateStrategyFuncAddr = `${PoolManagerAccountAddress}::default_reserve_interest_rate_strategy::set_reserve_interest_rate_strategy`;
    this.getReserveInterestRateStrategyFuncAddr = `${PoolManagerAccountAddress}::default_reserve_interest_rate_strategy::get_reserve_interest_rate_strategy`;
    this.getReserveInterestRateStrategyBspFuncAddr = `${PoolManagerAccountAddress}::default_reserve_interest_rate_strategy::get_reserve_interest_rate_strategy_bsp`;
    this.getGetOptimalUsageRatioFuncAddr = `${PoolManagerAccountAddress}::default_reserve_interest_rate_strategy::get_optimal_usage_ratio`;
    this.getVariableRateSlope1FuncAddr = `${PoolManagerAccountAddress}::default_reserve_interest_rate_strategy::get_variable_rate_slope1`;
    this.getVariableRateSlope2FuncAddr = `${PoolManagerAccountAddress}::default_reserve_interest_rate_strategy::get_variable_rate_slope2`;
    this.getBaseVariableBorrowRateFuncAddr = `${PoolManagerAccountAddress}::default_reserve_interest_rate_strategy::get_base_variable_borrow_rate`;
    this.getMaxVariableBorrowRateFuncAddr = `${PoolManagerAccountAddress}::default_reserve_interest_rate_strategy::get_max_variable_borrow_rate`;
    this.calculateInterestRatesFuncAddr = `${PoolManagerAccountAddress}::default_reserve_interest_rate_strategy::calculate_interest_rates`;
  }
}
