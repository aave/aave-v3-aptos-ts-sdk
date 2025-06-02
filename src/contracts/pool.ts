import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

/**
 * Represents the PoolContract interface which defines the function addresses for pool operations
 * within the AAVE protocol on the Aptos blockchain.
 *
 * @remarks
 * This interface is used by the corresponding client classes to make actual calls to the blockchain.
 * The constructor initializes all function addresses by combining:
 * - The pool manager's account address from the provider
 * - The module name (pool, pool_configurator, emode_logic, etc.)
 * - The specific function name
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const pool = new PoolContract(provider);
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 */
export class PoolContract {
  // Pool Collector Functions
  collectorGetCollectedFeesFuncAddr: MoveFunctionId;
  collectorAddressFeeFuncAddr: MoveFunctionId;
  collectorIsFundsAdminFuncAddr: MoveFunctionId;
  collectorWithdrawFuncAddr: MoveFunctionId;

  // Pool Fee Manager Functions
  feeManagerSetAptFeeFuncAddr: MoveFunctionId;
  feeManagerTransferAptFeeFuncAddr: MoveFunctionId;
  feeManagerGetAptFeeFuncAddr: MoveFunctionId;
  feeManagerGetFeeCollectorAddressFuncAddr: MoveFunctionId;
  feeManagerGetFeeCollectorAptBalanceFuncAddr: MoveFunctionId;
  feeManagerGetTotalFeesFuncAddr: MoveFunctionId;
  feeManagerGetFeeConfigObjectAddressFuncAddr: MoveFunctionId;

  // Pool Token Logic Functions
  poolTokenLogicMintToTreasuryFuncAddr: MoveFunctionId;
  poolTokenLogicTransferFuncAddr: MoveFunctionId;
  poolTokenLogicSetIncentivesControllerFuncAddr: MoveFunctionId;

  // Pool Functions
  poolResetIsolationModeTotalDebtFuncAddr: MoveFunctionId;
  poolRescueTokensFuncAddr: MoveFunctionId;
  poolSetBridgeProtocolFeeFuncAddr: MoveFunctionId;
  poolSetFlashloanPremiumsFuncAddr: MoveFunctionId;

  // Pool View Functions
  poolGetReserveConfigurationFuncAddr: MoveFunctionId;
  poolGetReserveDataFuncAddr: MoveFunctionId;
  getReserveDataAndReservesCountFuncAddr: MoveFunctionId;
  poolGetReservesCountFuncAddr: MoveFunctionId;
  poolGetNormalizedDebtByReserveData: MoveFunctionId;
  poolGetReservesListFuncAddr: MoveFunctionId;
  poolGetReserveAddressByIdFuncAddr: MoveFunctionId;
  poolGetReserveNormalizedVariableDebtFuncAddr: MoveFunctionId;
  poolGetReserveNormalizedIncomeFuncAddr: MoveFunctionId;
  poolGetUserConfigurationFuncAddr: MoveFunctionId;
  poolGetNumberOfActiveReservesFuncAddr: MoveFunctionId;
  poolGetNumberOfActiveAndDroppedReservesFuncAddr: MoveFunctionId;
  poolGetBridgeProtocolFeeFuncAddr: MoveFunctionId;
  poolGetFlashloanPremiumTotalFuncAddr: MoveFunctionId;
  poolGetFlashloanPremiumToProtocolFuncAddr: MoveFunctionId;
  poolMaxNumberReservesFuncAddr: MoveFunctionId;
  poolScaledATokenTotalSupplyFuncAddr: MoveFunctionId;
  poolScaledATokenBalanceOfFuncAddr: MoveFunctionId;
  poolScaledVariableTokenTotalSupplyFuncAddr: MoveFunctionId;
  poolScaledVariableTokenBalanceOfFuncAddr: MoveFunctionId;
  poolGetReserveLiquidityIndex: MoveFunctionId;
  poolGetReserveConfigurationByReserveData: MoveFunctionId;
  poolGetReserveCurrentLiquidityRate: MoveFunctionId;
  poolGetReserveVariableBorrowIndex: MoveFunctionId;
  poolGetReserveCurrentVariableBorrowRate: MoveFunctionId;
  poolGetReserveLastUpdateTimestamp: MoveFunctionId;
  poolGetReserveLiquidationGracePeriodUntil: MoveFunctionId;
  poolGetReserveVirtualUnderlyingBalance: MoveFunctionId;
  poolGetReserveId: MoveFunctionId;
  poolGetReserveATokenAddress: MoveFunctionId;
  poolGetReserveVariableDebtTokenAddress: MoveFunctionId;
  poolGetReserveAccruedToTreasury: MoveFunctionId;
  poolGetReserveUnbacked: MoveFunctionId;
  poolGetReserveIsolationModeTotalDebt: MoveFunctionId;
  poolGetReserveDeficitFuncAddr: MoveFunctionId;

  // Pool Configurator Functions
  poolConfiguratorInitReservesFuncAddr: MoveFunctionId;
  poolConfiguratorDropReserveFuncAddr: MoveFunctionId;
  poolConfiguratorSetAssetEmodeCategoryFuncAddr: MoveFunctionId;
  poolConfiguratorSetBorrowCapFuncAddr: MoveFunctionId;
  poolConfiguratorSetBorrowableInIsolationFuncAddr: MoveFunctionId;
  poolConfiguratorSetDebtCeilingFuncAddr: MoveFunctionId;
  poolConfiguratorSetEmodeCategoryFuncAddr: MoveFunctionId;
  poolConfiguratorSetLiquidationProtocolFeeFuncAddr: MoveFunctionId;
  poolConfiguratorSetPoolPauseFuncAddr: MoveFunctionId;
  poolConfiguratorSetPoolPauseNoGracePeriodFuncAddr: MoveFunctionId;
  poolConfiguratorSetReserveActiveFuncAddr: MoveFunctionId;
  poolConfiguratorSetReserveBorrowingFuncAddr: MoveFunctionId;
  poolConfiguratorConfigureReserveAsCollateralFuncAddr: MoveFunctionId;
  poolConfiguratorSetReserveFactorFuncAddr: MoveFunctionId;
  poolConfiguratorSetReserveFlashLoaningFuncAddr: MoveFunctionId;
  poolConfiguratorSetReserveFreezeFuncAddr: MoveFunctionId;
  poolConfiguratorGetPendingLtvFuncAddr: MoveFunctionId;
  poolConfiguratorSetReservePauseFuncAddr: MoveFunctionId;
  poolConfiguratorSetReservePauseNoGracePeriodFuncAddr: MoveFunctionId;
  poolConfiguratorDisableLiquidationGracePeriodFuncAddr: MoveFunctionId;
  poolConfiguratorSetSiloedBorrowingFuncAddr: MoveFunctionId;
  poolConfiguratorSetSupplyCapFuncAddr: MoveFunctionId;
  poolConfiguratorUpdateFlashloanPremiumToProtocolFuncAddr: MoveFunctionId;
  poolConfiguratorUpdateInterestRateStrategyFuncAddr: MoveFunctionId;
  poolConfiguratorUpdateFlashloanPremiumTotalFuncAddr: MoveFunctionId;

  // E Mode Logic Functions
  poolSetUserEmodeFuncAddr: MoveFunctionId;
  poolGetEmodeCategoryDataFuncAddr: MoveFunctionId;
  poolGetUserEmodeFuncAddr: MoveFunctionId;
  poolGetEmodeEmodeLabelFuncAddr: MoveFunctionId;
  poolGetEmodeEmodeLiquidationBonusFuncAddr: MoveFunctionId;
  poolIsInEmodeCategoryFuncAddr: MoveFunctionId;
  poolGetEmodeConfigurationFuncAddr: MoveFunctionId;

  // Pool Data Provider Functions
  getAllReservesTokensFuncAddr: MoveFunctionId;
  getAllATokensFuncAddr: MoveFunctionId;
  getAllVariableTokensFuncAddr: MoveFunctionId;
  getReserveConfigurationDataFuncAddr: MoveFunctionId;
  getReserveEModeCategoryFuncAddr: MoveFunctionId;
  getReserveCapsFuncAddr: MoveFunctionId;
  getPausedFuncAddr: MoveFunctionId;
  getSiloedBorrowingFuncAddr: MoveFunctionId;
  getLiquidationProtocolFeeTokensFuncAddr: MoveFunctionId;
  getDebtCeilingFuncAddr: MoveFunctionId;
  getDebtCeilingDecimalsFuncAddr: MoveFunctionId;
  getReserveDataFuncAddr: MoveFunctionId;
  getATokenTotalSupplyFuncAddr: MoveFunctionId;
  getTotalDebtFuncAddr: MoveFunctionId;
  getUserReserveDataFuncAddr: MoveFunctionId;
  getReserveTokensAddressesFuncAddr: MoveFunctionId;
  getFlashLoanEnabledFuncAddr: MoveFunctionId;
  getReserveDeficitFuncAddr: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const PoolManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const PoolManagerAccountAddress = PoolManager.toString();

    // Pool Collector
    this.collectorGetCollectedFeesFuncAddr = `${PoolManagerAccountAddress}::collector::get_collected_fees`;
    this.collectorAddressFeeFuncAddr = `${PoolManagerAccountAddress}::collector::collector_address`;
    this.collectorIsFundsAdminFuncAddr = `${PoolManagerAccountAddress}::collector::is_funds_admin`;
    this.collectorWithdrawFuncAddr = `${PoolManagerAccountAddress}::collector::withdraw`;

    // Pool Fee Manager
    this.feeManagerSetAptFeeFuncAddr = `${PoolManagerAccountAddress}::fee_manager::set_apt_fee`;
    this.feeManagerTransferAptFeeFuncAddr = `${PoolManagerAccountAddress}::fee_manager::transfer_apt_fee`;
    this.feeManagerGetAptFeeFuncAddr = `${PoolManagerAccountAddress}::fee_manager::get_apt_fee`;
    this.feeManagerGetFeeCollectorAddressFuncAddr = `${PoolManagerAccountAddress}::fee_manager::get_fee_collector_address`;
    this.feeManagerGetFeeCollectorAptBalanceFuncAddr = `${PoolManagerAccountAddress}::fee_manager::get_fee_collector_apt_balance`;
    this.feeManagerGetTotalFeesFuncAddr = `${PoolManagerAccountAddress}::fee_manager::get_total_fees`;
    this.feeManagerGetFeeConfigObjectAddressFuncAddr = `${PoolManagerAccountAddress}::fee_manager::get_fee_config_object_address`;

    // Pool Token Logic
    this.poolTokenLogicMintToTreasuryFuncAddr = `${PoolManagerAccountAddress}::pool_token_logic::mint_to_treasury`;
    this.poolTokenLogicTransferFuncAddr = `${PoolManagerAccountAddress}::pool_token_logic::transfer`;
    this.poolTokenLogicSetIncentivesControllerFuncAddr = `${PoolManagerAccountAddress}::pool_token_logic::set_incentives_controller`;

    // Pool
    this.poolResetIsolationModeTotalDebtFuncAddr = `${PoolManagerAccountAddress}::pool::reset_isolation_mode_total_debt`;
    this.poolRescueTokensFuncAddr = `${PoolManagerAccountAddress}::pool::rescue_tokens`;
    this.poolSetBridgeProtocolFeeFuncAddr = `${PoolManagerAccountAddress}::pool::set_bridge_protocol_fee`;
    this.poolSetFlashloanPremiumsFuncAddr = `${PoolManagerAccountAddress}::pool::set_flashloan_premiums`;

    // Pool View
    this.poolGetReserveConfigurationFuncAddr = `${PoolManagerAccountAddress}::pool::get_reserve_configuration`;
    this.poolGetReserveDataFuncAddr = `${PoolManagerAccountAddress}::pool::get_reserve_data`;
    this.getReserveDataAndReservesCountFuncAddr = `${PoolManagerAccountAddress}::pool::get_reserve_data_and_reserves_count`;
    this.poolGetReservesCountFuncAddr = `${PoolManagerAccountAddress}::pool::get_reserves_count`;
    this.poolGetNormalizedDebtByReserveData = `${PoolManagerAccountAddress}::pool::get_normalized_debt_by_reserve_data`;
    this.poolGetReservesListFuncAddr = `${PoolManagerAccountAddress}::pool::get_reserves_list`;
    this.poolGetReserveAddressByIdFuncAddr = `${PoolManagerAccountAddress}::pool::get_reserve_address_by_id`;
    this.poolGetReserveNormalizedVariableDebtFuncAddr = `${PoolManagerAccountAddress}::pool::get_reserve_normalized_variable_debt`;
    this.poolGetReserveNormalizedIncomeFuncAddr = `${PoolManagerAccountAddress}::pool::get_reserve_normalized_income`;
    this.poolGetUserConfigurationFuncAddr = `${PoolManagerAccountAddress}::pool::get_user_configuration`;
    this.poolGetNumberOfActiveReservesFuncAddr = `${PoolManagerAccountAddress}::pool::number_of_active_reserves`;
    this.poolGetNumberOfActiveAndDroppedReservesFuncAddr = `${PoolManagerAccountAddress}::pool::number_of_active_and_dropped_reserves`;
    this.poolGetBridgeProtocolFeeFuncAddr = `${PoolManagerAccountAddress}::pool::get_bridge_protocol_fee`;
    this.poolGetFlashloanPremiumTotalFuncAddr = `${PoolManagerAccountAddress}::pool::get_flashloan_premium_total`;
    this.poolGetFlashloanPremiumToProtocolFuncAddr = `${PoolManagerAccountAddress}::pool::get_flashloan_premium_to_protocol`;
    this.poolMaxNumberReservesFuncAddr = `${PoolManagerAccountAddress}::pool::max_number_reserves`;
    this.poolScaledATokenTotalSupplyFuncAddr = `${PoolManagerAccountAddress}::pool::scaled_a_token_total_supply`;
    this.poolScaledATokenBalanceOfFuncAddr = `${PoolManagerAccountAddress}::pool::scaled_a_token_balance_of`;
    this.poolScaledVariableTokenTotalSupplyFuncAddr = `${PoolManagerAccountAddress}::pool::scaled_variable_token_total_supply`;
    this.poolScaledVariableTokenBalanceOfFuncAddr = `${PoolManagerAccountAddress}::pool::scaled_variable_token_balance_of`;
    this.poolGetReserveLiquidityIndex = `${PoolManagerAccountAddress}::pool::get_reserve_liquidity_index`;
    this.poolGetReserveConfigurationByReserveData = `${PoolManagerAccountAddress}::pool::get_reserve_configuration_by_reserve_data`;
    this.poolGetReserveCurrentLiquidityRate = `${PoolManagerAccountAddress}::pool::get_reserve_current_liquidity_rate`;
    this.poolGetReserveVariableBorrowIndex = `${PoolManagerAccountAddress}::pool::get_reserve_variable_borrow_index`;
    this.poolGetReserveCurrentVariableBorrowRate = `${PoolManagerAccountAddress}::pool::get_reserve_current_variable_borrow_rate`;
    this.poolGetReserveLastUpdateTimestamp = `${PoolManagerAccountAddress}::pool::get_reserve_last_update_timestamp`;
    this.poolGetReserveLiquidationGracePeriodUntil = `${PoolManagerAccountAddress}::pool::get_liquidation_grace_period`;
    this.poolGetReserveVirtualUnderlyingBalance = `${PoolManagerAccountAddress}::pool::get_reserve_virtual_underlying_balance`;
    this.poolGetReserveId = `${PoolManagerAccountAddress}::pool::get_reserve_id`;
    this.poolGetReserveATokenAddress = `${PoolManagerAccountAddress}::pool::get_reserve_a_token_address`;
    this.poolGetReserveVariableDebtTokenAddress = `${PoolManagerAccountAddress}::pool::get_reserve_variable_debt_token_address`;
    this.poolGetReserveAccruedToTreasury = `${PoolManagerAccountAddress}::pool::get_reserve_accrued_to_treasury`;
    this.poolGetReserveUnbacked = `${PoolManagerAccountAddress}::pool::get_reserve_unbacked`;
    this.poolGetReserveIsolationModeTotalDebt = `${PoolManagerAccountAddress}::pool::get_reserve_isolation_mode_total_debt`;
    this.poolGetReserveDeficitFuncAddr = `${PoolManagerAccountAddress}::pool::get_reserve_deficit`;

    // Pool Configurator
    this.poolConfiguratorInitReservesFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::init_reserves`;
    this.poolConfiguratorDropReserveFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::drop_reserve`;
    this.poolConfiguratorSetAssetEmodeCategoryFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_asset_emode_category`;
    this.poolConfiguratorSetBorrowCapFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_borrow_cap`;
    this.poolConfiguratorSetBorrowableInIsolationFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_borrowable_in_isolation`;
    this.poolConfiguratorSetDebtCeilingFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_debt_ceiling`;
    this.poolConfiguratorSetEmodeCategoryFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_emode_category`;
    this.poolConfiguratorSetLiquidationProtocolFeeFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_liquidation_protocol_fee`;
    this.poolConfiguratorSetPoolPauseFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_pool_pause`;
    this.poolConfiguratorSetPoolPauseNoGracePeriodFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_pool_pause_no_grace_period`;
    this.poolConfiguratorSetReserveActiveFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_reserve_active`;
    this.poolConfiguratorSetReserveBorrowingFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_reserve_borrowing`;
    this.poolConfiguratorConfigureReserveAsCollateralFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::configure_reserve_as_collateral`;
    this.poolConfiguratorSetReserveFactorFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_reserve_factor`;
    this.poolConfiguratorSetReserveFlashLoaningFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_reserve_flash_loaning`;
    this.poolConfiguratorSetReserveFreezeFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_reserve_freeze`;
    this.poolConfiguratorGetPendingLtvFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::get_pending_ltv`;
    this.poolConfiguratorSetReservePauseFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_reserve_pause`;
    this.poolConfiguratorSetReservePauseNoGracePeriodFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_reserve_pause_no_grace_period`;
    this.poolConfiguratorDisableLiquidationGracePeriodFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::disable_liquidation_grace_period`;
    this.poolConfiguratorSetSiloedBorrowingFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_siloed_borrowing`;
    this.poolConfiguratorSetSupplyCapFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_supply_cap`;
    this.poolConfiguratorUpdateFlashloanPremiumToProtocolFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::update_flashloan_premium_to_protocol`;
    this.poolConfiguratorUpdateInterestRateStrategyFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::update_interest_rate_strategy`;
    this.poolConfiguratorUpdateFlashloanPremiumTotalFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::update_flashloan_premium_total`;

    // E Mode Logic
    this.poolSetUserEmodeFuncAddr = `${PoolManagerAccountAddress}::emode_logic::set_user_emode`;
    this.poolGetEmodeCategoryDataFuncAddr = `${PoolManagerAccountAddress}::emode_logic::get_emode_category_data`;
    this.poolGetUserEmodeFuncAddr = `${PoolManagerAccountAddress}::emode_logic::get_user_emode`;
    this.poolGetEmodeEmodeLabelFuncAddr = `${PoolManagerAccountAddress}::emode_logic::get_emode_e_mode_label`;
    this.poolGetEmodeEmodeLiquidationBonusFuncAddr = `${PoolManagerAccountAddress}::emode_logic::get_emode_e_mode_liquidation_bonus`;
    this.poolIsInEmodeCategoryFuncAddr = `${PoolManagerAccountAddress}::emode_logic::is_in_emode_category`;
    this.poolGetEmodeConfigurationFuncAddr = `${PoolManagerAccountAddress}::emode_logic::get_emode_configuration`;

    // Pool Data Provider
    this.getAllReservesTokensFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_all_reserves_tokens`;
    this.getAllATokensFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_all_a_tokens`;
    this.getAllVariableTokensFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_all_var_tokens`;
    this.getReserveConfigurationDataFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_reserve_configuration_data`;
    this.getReserveEModeCategoryFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_reserve_emode_category`;
    this.getReserveCapsFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_reserve_caps`;
    this.getPausedFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_paused`;
    this.getSiloedBorrowingFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_siloed_borrowing`;
    this.getLiquidationProtocolFeeTokensFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_liquidation_protocol_fee`;
    this.getDebtCeilingFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_debt_ceiling`;
    this.getDebtCeilingDecimalsFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_debt_ceiling_decimals`;
    this.getReserveDataFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_reserve_data`;
    this.getATokenTotalSupplyFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_a_token_total_supply`;
    this.getTotalDebtFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_total_debt`;
    this.getUserReserveDataFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_user_reserve_data`;
    this.getReserveTokensAddressesFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_reserve_tokens_addresses`;
    this.getFlashLoanEnabledFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_flash_loan_enabled`;
  }
}
