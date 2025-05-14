import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

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
export class PoolContract {
  // Resource Func Addr

  /**
   * -------------------------------------------------------------------------
   * Pool Collector
   * -------------------------------------------------------------------------
   */
  collectorGetCollectedFeesFuncAddr: MoveFunctionId;

  collectorAddressFeeFuncAddr: MoveFunctionId;

  collectorIsFundsAdminFuncAddr: MoveFunctionId;

  collectorWithdrawFuncAddr: MoveFunctionId;

  /**
   * -------------------------------------------------------------------------
   * Pool Fee Manager
   * -------------------------------------------------------------------------
   */
  feeManagerSetAptFeeFuncAddr: MoveFunctionId;

  feeManagerTransferAptFeeFuncAddr: MoveFunctionId;

  feeManagerGetAptFeeFuncAddr: MoveFunctionId;

  feeManagerGetFeeCollectorAddressFuncAddr: MoveFunctionId;

  feeManagerGetFeeCollectorAptBalanceFuncAddr: MoveFunctionId;

  feeManagerGetTotalFeesFuncAddr: MoveFunctionId;

  feeManagerGetFeeConfigObjectAddressFuncAddr: MoveFunctionId;

  /**
   * -------------------------------------------------------------------------
   * Pool Token Logic
   * -------------------------------------------------------------------------=
   */
  // Entry
  poolTokenLogicMintToTreasuryFuncAddr: MoveFunctionId;

  poolTokenLogicTransferFuncAddr: MoveFunctionId;

  poolTokenLogicSetIncentivesControllerFuncAddr: MoveFunctionId;

  /**
   * -------------------------------------------------------------------------
   * Pool
   * -------------------------------------------------------------------------=
   */
  // Entry
  poolResetIsolationModeTotalDebtFuncAddr: MoveFunctionId;

  poolRescueTokensFuncAddr: MoveFunctionId;

  poolSetBridgeProtocolFeeFuncAddr: MoveFunctionId;

  poolSetFlashloanPremiumsFuncAddr: MoveFunctionId;

  // Pool View
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

  /**
   * -------------------------------------------------------------------------
   * Pool Configurator
   * -------------------------------------------------------------------------=
   */
  // Entry
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

  /**
   * -------------------------------------------------------------------------
   * Isolation E Mode
   * @notice Internal methods are tested in other modules
   * -------------------------------------------------------------------------=
   */

  /**
   * -------------------------------------------------------------------------
   * E Mode Logic
   * -------------------------------------------------------------------------=
   */
  // Entry
  poolSetUserEmodeFuncAddr: MoveFunctionId;

  // View
  poolGetEmodeCategoryDataFuncAddr: MoveFunctionId;

  poolGetUserEmodeFuncAddr: MoveFunctionId;

  poolGetEmodeEmodeLabelFuncAddr: MoveFunctionId;

  poolGetEmodeEmodeLiquidationBonusFuncAddr: MoveFunctionId;

  poolIsInEmodeCategoryFuncAddr: MoveFunctionId;

  poolGetEmodeConfigurationFuncAddr: MoveFunctionId;

  // Generic Logic
  // Internal methods are tested in other modules

  /**
   * -------------------------------------------------------------------------
   * pool data provider
   * -------------------------------------------------------------------------=
   */
  // View
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

  /**
   * Constructs a new instance of the Pool class.
   *
   * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
   *
   * This constructor initializes various function addresses for interacting with the AAVE protocol on the Aptos blockchain.
   *
   * The function addresses are categorized into several sections:
   *
   * - **Pool**: Functions related to pool operations such as minting to treasury, resetting isolation mode total debt, rescuing tokens, setting bridge protocol fees, and setting flashloan premiums.
   * - **pool**: Functions for retrieving pool data such as revision, reserve configuration, reserve data, reserves count, reserves list, reserve address by ID, reserve normalized variable debt, reserve normalized income, user configuration, bridge protocol fee, flashloan premium total, flashloan premium to protocol, max number of reserves, scaled AToken total supply, scaled AToken balance, scaled variable token total supply, and scaled variable token balance.
   * - **Pool Configurator**: Functions for configuring the pool such as initializing reserves, dropping reserves, setting asset emode category, setting borrow cap, setting borrowable in isolation, setting debt ceiling, setting emode category, setting liquidation protocol fee, setting pool pause, setting reserve active, setting reserve borrowing, configuring reserve as collateral, setting reserve factor, setting reserve flash loaning, setting reserve freeze, setting reserve pause, setting siloed borrowing, setting supply cap, setting unbacked mint cap, updating bridge protocol fee, updating flashloan premium to protocol, and updating flashloan premium total.
   * - **E Mode Logic**: Functions for emode logic such as getting revision, setting user emode, configuring emode category, getting emode category data, and getting user emode.
   * - **default_reserve_interest_rate_strategy**: Functions for default reserve interest rate strategy such as setting reserve interest rate strategy, getting optimal usage ratio, getting max excess usage ratio, getting variable rate slope1, getting variable rate slope2, getting base variable borrow rate, getting max variable borrow rate, and calculating interest rates.
   * - **pool data provider**: Functions for pool data provider such as getting all reserves tokens, getting all ATokens, getting all variable tokens, getting reserve configuration data, getting reserve emode category, getting reserve caps, getting paused status, getting siloed borrowing, getting liquidation protocol fee tokens, getting unbacked mint cap, getting debt ceiling, getting debt ceiling decimals, getting reserve data, getting AToken total supply, getting total debt, getting user reserve data, getting reserve tokens addresses, and getting flash loan enabled status.
   * - **pool addresses provider**: Functions for pool addresses provider such as checking if ID mapped account exists, getting market ID, getting address, getting pool, getting pool configurator, getting price oracle, getting ACL manager, getting ACL admin, getting price oracle sentinel, getting pool data provider, setting market ID, setting address, setting pool implementation, setting pool configurator, setting price oracle, setting ACL manager, setting ACL admin, setting price oracle sentinel, and setting pool data provider.
   */
  constructor(provider: AptosProvider) {
    const PoolManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const PoolManagerAccountAddress = PoolManager.toString();

    /**
     * -------------------------------------------------------------------------
     * Pool Collector
     * -------------------------------------------------------------------------
     */
    this.collectorGetCollectedFeesFuncAddr = `${PoolManagerAccountAddress}::collector::get_collected_fees`;
    this.collectorAddressFeeFuncAddr = `${PoolManagerAccountAddress}::collector::collector_address`;
    this.collectorIsFundsAdminFuncAddr = `${PoolManagerAccountAddress}::collector::is_funds_admin`;
    this.collectorWithdrawFuncAddr = `${PoolManagerAccountAddress}::collector::withdraw`;

    /**
     * -------------------------------------------------------------------------
     * Pool Fee Manager
     * -------------------------------------------------------------------------
     */
    this.feeManagerSetAptFeeFuncAddr = `${PoolManagerAccountAddress}::fee_manager::set_apt_fee`;
    this.feeManagerTransferAptFeeFuncAddr = `${PoolManagerAccountAddress}::fee_manager::transfer_apt_fee`;
    this.feeManagerGetAptFeeFuncAddr = `${PoolManagerAccountAddress}::fee_manager::get_apt_fee`;
    this.feeManagerGetFeeCollectorAddressFuncAddr = `${PoolManagerAccountAddress}::fee_manager::get_fee_collector_address`;
    this.feeManagerGetFeeCollectorAptBalanceFuncAddr = `${PoolManagerAccountAddress}::fee_manager::get_fee_collector_apt_balance`;
    this.feeManagerGetTotalFeesFuncAddr = `${PoolManagerAccountAddress}::fee_manager::get_total_fees`;
    this.feeManagerGetFeeConfigObjectAddressFuncAddr = `${PoolManagerAccountAddress}::fee_manager::get_fee_config_object_address`;

    /**
     * -------------------------------------------------------------------------
     * Pool Token Logic
     * -------------------------------------------------------------------------
     */
    this.poolTokenLogicMintToTreasuryFuncAddr = `${PoolManagerAccountAddress}::pool_token_logic::mint_to_treasury`;
    this.poolTokenLogicTransferFuncAddr = `${PoolManagerAccountAddress}::pool_token_logic::transfer`;
    this.poolTokenLogicSetIncentivesControllerFuncAddr = `${PoolManagerAccountAddress}::pool_token_logic::set_incentives_controller`;

    /**
     * -------------------------------------------------------------------------
     * Pool
     * -------------------------------------------------------------------------
     */
    this.poolResetIsolationModeTotalDebtFuncAddr = `${PoolManagerAccountAddress}::pool::reset_isolation_mode_total_debt`;
    this.poolRescueTokensFuncAddr = `${PoolManagerAccountAddress}::pool::rescue_tokens`;
    this.poolSetBridgeProtocolFeeFuncAddr = `${PoolManagerAccountAddress}::pool::set_bridge_protocol_fee`;
    this.poolSetFlashloanPremiumsFuncAddr = `${PoolManagerAccountAddress}::pool::set_flashloan_premiums`;

    /**
     * -------------------------------------------------------------------------
     * pool
     * -------------------------------------------------------------------------
     */
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

    /**
     * -------------------------------------------------------------------------
     * Pool Configurator
     * -------------------------------------------------------------------------
     */
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

    /**
     * -------------------------------------------------------------------------
     * E Mode Logic
     * -------------------------------------------------------------------------
     */
    this.poolSetUserEmodeFuncAddr = `${PoolManagerAccountAddress}::emode_logic::set_user_emode`;
    this.poolGetEmodeCategoryDataFuncAddr = `${PoolManagerAccountAddress}::emode_logic::get_emode_category_data`;
    this.poolGetUserEmodeFuncAddr = `${PoolManagerAccountAddress}::emode_logic::get_user_emode`;
    this.poolGetEmodeEmodeLabelFuncAddr = `${PoolManagerAccountAddress}::emode_logic::get_emode_e_mode_label`;
    this.poolGetEmodeEmodeLiquidationBonusFuncAddr = `${PoolManagerAccountAddress}::emode_logic::get_emode_e_mode_liquidation_bonus`;
    this.poolIsInEmodeCategoryFuncAddr = `${PoolManagerAccountAddress}::emode_logic::is_in_emode_category`;
    this.poolGetEmodeConfigurationFuncAddr = `${PoolManagerAccountAddress}::emode_logic::get_emode_configuration`;

    /**
     * -------------------------------------------------------------------------
     * pool data provider
     * -------------------------------------------------------------------------
     */
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
