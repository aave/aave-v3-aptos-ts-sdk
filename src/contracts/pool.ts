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
   * Pool
   * -------------------------------------------------------------------------=
   */
  // Entry
  PoolMintToTreasuryFuncAddr: MoveFunctionId;

  PoolResetIsolationModeTotalDebtFuncAddr: MoveFunctionId;

  PoolRescueTokensFuncAddr: MoveFunctionId;

  PoolSetBridgeProtocolFeeFuncAddr: MoveFunctionId;

  PoolSetFlashloanPremiumsFuncAddr: MoveFunctionId;

  // Pool View
  PoolGetRevisionFuncAddr: MoveFunctionId;

  PoolGetReserveConfigurationFuncAddr: MoveFunctionId;

  PoolGetReserveDataFuncAddr: MoveFunctionId;

  GetReserveDataAndReservesCountFuncAddr: MoveFunctionId;

  PoolGetReservesCountFuncAddr: MoveFunctionId;

  PoolGetReservesListFuncAddr: MoveFunctionId;

  PoolGetReserveAddressByIdFuncAddr: MoveFunctionId;

  PoolGetReserveNormalizedVariableDebtFuncAddr: MoveFunctionId;

  PoolGetReserveNormalizedIncomeFuncAddr: MoveFunctionId;

  PoolGetUserConfigurationFuncAddr: MoveFunctionId;

  PoolGetBridgeProtocolFeeFuncAddr: MoveFunctionId;

  PoolGetFlashloanPremiumTotalFuncAddr: MoveFunctionId;

  PoolGetFlashloanPremiumToProtocolFuncAddr: MoveFunctionId;

  PoolMaxNumberReservesFuncAddr: MoveFunctionId;

  PoolScaledATokenTotalSupplyFuncAddr: MoveFunctionId;

  PoolScaledATokenBalanceOfFuncAddr: MoveFunctionId;

  PoolScaledVariableTokenTotalSupplyFuncAddr: MoveFunctionId;

  PoolScaledVariableTokenBalanceOfFuncAddr: MoveFunctionId;

  /**
   * -------------------------------------------------------------------------
   * Pool Configurator
   * -------------------------------------------------------------------------=
   */
  // Entry
  PoolConfiguratorInitReservesFuncAddr: MoveFunctionId;

  PoolConfiguratorDropReserveFuncAddr: MoveFunctionId;

  PoolConfiguratorSetAssetEmodeCategoryFuncAddr: MoveFunctionId;

  PoolConfiguratorSetBorrowCapFuncAddr: MoveFunctionId;

  PoolConfiguratorSetBorrowableInIsolationFuncAddr: MoveFunctionId;

  PoolConfiguratorSetDebtCeilingFuncAddr: MoveFunctionId;

  PoolConfiguratorSetEmodeCategoryFuncAddr: MoveFunctionId;

  PoolConfiguratorSetLiquidationProtocolFeeFuncAddr: MoveFunctionId;

  PoolConfiguratorSetPoolPauseFuncAddr: MoveFunctionId;

  PoolConfiguratorSetReserveActiveFuncAddr: MoveFunctionId;

  PoolConfiguratorSetReserveBorrowingFuncAddr: MoveFunctionId;

  PoolConfiguratorConfigureReserveAsCollateralFuncAddr: MoveFunctionId;

  PoolConfiguratorSetReserveFactorFuncAddr: MoveFunctionId;

  PoolConfiguratorSetReserveFlashLoaningFuncAddr: MoveFunctionId;

  PoolConfiguratorSetReserveFreezeFuncAddr: MoveFunctionId;

  PoolConfiguratorSetReservePauseFuncAddr: MoveFunctionId;

  PoolConfiguratorSetSiloedBorrowingFuncAddr: MoveFunctionId;

  PoolConfiguratorSetSupplyCapFuncAddr: MoveFunctionId;

  PoolConfiguratorSetUnbackedMintCapFuncAddr: MoveFunctionId;

  PoolConfiguratorUpdateBridgeProtocolFeeFuncAddr: MoveFunctionId;

  PoolConfiguratorUpdateFlashloanPremiumToProtocolFuncAddr: MoveFunctionId;

  PoolConfiguratorUpdateFlashloanPremiumTotalFuncAddr: MoveFunctionId;

  // View
  PoolConfiguratorGetRevisionFuncAddr: MoveFunctionId;

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
  PoolSetUserEmodeFuncAddr: MoveFunctionId;

  PoolConfigureEmodeCategoryFuncAddr: MoveFunctionId;

  // View
  PoolGetEmodeCategoryDataFuncAddr: MoveFunctionId;

  PoolGetUserEmodeFuncAddr: MoveFunctionId;

  // Generic Logic
  // Internal methods are tested in other modules

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

  /**
   * -------------------------------------------------------------------------
   * pool data provider
   * -------------------------------------------------------------------------=
   */
  // View
  GetAllReservesTokensFuncAddr: MoveFunctionId;

  GetAllATokensFuncAddr: MoveFunctionId;

  GetAllVariableTokensFuncAddr: MoveFunctionId;

  GetReserveConfigurationDataFuncAddr: MoveFunctionId;

  GetReserveEModeCategoryFuncAddr: MoveFunctionId;

  GetReserveCapsFuncAddr: MoveFunctionId;

  GetPausedFuncAddr: MoveFunctionId;

  GetSiloedBorrowingFuncAddr: MoveFunctionId;

  GetLiquidationProtocolFeeTokensFuncAddr: MoveFunctionId;

  GetUnbackedMintCapFuncAddr: MoveFunctionId;

  GetDebtCeilingFuncAddr: MoveFunctionId;

  GetDebtCeilingDecimalsFuncAddr: MoveFunctionId;

  GetReserveDataFuncAddr: MoveFunctionId;

  GetATokenTotalSupplyFuncAddr: MoveFunctionId;

  GetTotalDebtFuncAddr: MoveFunctionId;

  GetUserReserveDataFuncAddr: MoveFunctionId;

  GetReserveTokensAddressesFuncAddr: MoveFunctionId;

  GetFlashLoanEnabledFuncAddr: MoveFunctionId;

  /**
   * -------------------------------------------------------------------------
   * pool addresses provider
   * -------------------------------------------------------------------------=
   */
  // View
  HasIdMappedAccountFuncAddr: MoveFunctionId;

  GetMarketIdFuncAddr: MoveFunctionId;

  GetAddressFuncAddr: MoveFunctionId;

  GetPoolFuncAddr: MoveFunctionId;

  GetPoolConfiguratorFuncAddr: MoveFunctionId;

  GetPriceOracleFuncAddr: MoveFunctionId;

  GetAclManagerFuncAddr: MoveFunctionId;

  GetAclAdminFuncAddr: MoveFunctionId;

  GetPriceOracleSentinelFuncAddr: MoveFunctionId;

  GetPoolDataProviderFuncAddr: MoveFunctionId;

  // Entry
  SetMarketIdFuncAddr: MoveFunctionId;

  SetAddressFuncAddr: MoveFunctionId;

  SetPoolImplFuncAddr: MoveFunctionId;

  SetPoolConfiguratorFuncAddr: MoveFunctionId;

  SetPriceOracleFuncAddr: MoveFunctionId;

  SetAclManagerFuncAddr: MoveFunctionId;

  SetAclAdminFuncAddr: MoveFunctionId;

  SetPriceOracleSentinelFuncAddr: MoveFunctionId;

  SetPoolDataProviderFuncAddr: MoveFunctionId;

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
     * Pool
     * -------------------------------------------------------------------------=
     */
    this.PoolMintToTreasuryFuncAddr = `${PoolManagerAccountAddress}::pool::mint_to_treasury`;
    this.PoolResetIsolationModeTotalDebtFuncAddr = `${PoolManagerAccountAddress}::pool::reset_isolation_mode_total_debt`;
    this.PoolRescueTokensFuncAddr = `${PoolManagerAccountAddress}::pool::rescue_tokens`;
    this.PoolSetBridgeProtocolFeeFuncAddr = `${PoolManagerAccountAddress}::pool::set_bridge_protocol_fee`;
    this.PoolSetFlashloanPremiumsFuncAddr = `${PoolManagerAccountAddress}::pool::set_flashloan_premiums`;

    /**
     * -------------------------------------------------------------------------
     * pool
     * -------------------------------------------------------------------------
     */
    this.PoolGetRevisionFuncAddr = `${PoolManagerAccountAddress}::pool::get_revision`;
    this.PoolGetReserveConfigurationFuncAddr = `${PoolManagerAccountAddress}::pool::get_reserve_configuration`;
    this.PoolGetReserveDataFuncAddr = `${PoolManagerAccountAddress}::pool::get_reserve_data`;
    this.GetReserveDataAndReservesCountFuncAddr = `${PoolManagerAccountAddress}::pool::get_reserve_data_and_reserves_count`;
    this.PoolGetReservesCountFuncAddr = `${PoolManagerAccountAddress}::pool::get_reserves_count`;
    this.PoolGetReservesListFuncAddr = `${PoolManagerAccountAddress}::pool::get_reserves_list`;
    this.PoolGetReserveAddressByIdFuncAddr = `${PoolManagerAccountAddress}::pool::get_reserve_address_by_id`;
    this.PoolGetReserveNormalizedVariableDebtFuncAddr = `${PoolManagerAccountAddress}::pool::get_reserve_normalized_variable_debt`;
    this.PoolGetReserveNormalizedIncomeFuncAddr = `${PoolManagerAccountAddress}::pool::get_reserve_normalized_income`;
    this.PoolGetUserConfigurationFuncAddr = `${PoolManagerAccountAddress}::pool::get_user_configuration`;
    this.PoolGetBridgeProtocolFeeFuncAddr = `${PoolManagerAccountAddress}::pool::get_bridge_protocol_fee`;
    this.PoolGetFlashloanPremiumTotalFuncAddr = `${PoolManagerAccountAddress}::pool::get_flashloan_premium_total`;
    this.PoolGetFlashloanPremiumToProtocolFuncAddr = `${PoolManagerAccountAddress}::pool::get_flashloan_premium_to_protocol`;
    this.PoolMaxNumberReservesFuncAddr = `${PoolManagerAccountAddress}::pool::max_number_reserves`;
    this.PoolScaledATokenTotalSupplyFuncAddr = `${PoolManagerAccountAddress}::pool::scaled_a_token_total_supply`;
    this.PoolScaledATokenBalanceOfFuncAddr = `${PoolManagerAccountAddress}::pool::scaled_a_token_balance_of`;
    this.PoolScaledVariableTokenTotalSupplyFuncAddr = `${PoolManagerAccountAddress}::pool::scaled_variable_token_total_supply`;
    this.PoolScaledVariableTokenBalanceOfFuncAddr = `${PoolManagerAccountAddress}::pool::scaled_variable_token_balance_of`;

    /**
     * -------------------------------------------------------------------------
     * Pool Configurator
     * -------------------------------------------------------------------------=
     */
    this.PoolConfiguratorInitReservesFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::init_reserves`;
    this.PoolConfiguratorDropReserveFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::drop_reserve`;
    this.PoolConfiguratorSetAssetEmodeCategoryFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_asset_emode_category`;
    this.PoolConfiguratorSetBorrowCapFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_borrow_cap`;
    this.PoolConfiguratorSetBorrowableInIsolationFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_borrowable_in_isolation`;
    this.PoolConfiguratorSetDebtCeilingFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_debt_ceiling`;
    this.PoolConfiguratorSetEmodeCategoryFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_emode_category`;
    this.PoolConfiguratorSetLiquidationProtocolFeeFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_liquidation_protocol_fee`;
    this.PoolConfiguratorSetPoolPauseFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_pool_pause`;
    this.PoolConfiguratorSetReserveActiveFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_reserve_active`;
    this.PoolConfiguratorSetReserveBorrowingFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_reserve_borrowing`;
    this.PoolConfiguratorConfigureReserveAsCollateralFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::configure_reserve_as_collateral`;
    this.PoolConfiguratorSetReserveFactorFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_reserve_factor`;
    this.PoolConfiguratorSetReserveFlashLoaningFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_reserve_flash_loaning`;
    this.PoolConfiguratorSetReserveFreezeFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_reserve_freeze`;
    this.PoolConfiguratorSetReservePauseFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_reserve_pause`;
    this.PoolConfiguratorSetSiloedBorrowingFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_siloed_borrowing`;
    this.PoolConfiguratorSetSupplyCapFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_supply_cap`;
    this.PoolConfiguratorSetUnbackedMintCapFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::set_unbacked_mint_cap`;
    this.PoolConfiguratorUpdateBridgeProtocolFeeFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::update_bridge_protocol_fee`;
    this.PoolConfiguratorUpdateFlashloanPremiumToProtocolFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::update_flashloan_premium_to_protocol`;
    this.PoolConfiguratorUpdateFlashloanPremiumTotalFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::update_flashloan_premium_total`;

    /**
     * -------------------------------------------------------------------------
     * E Mode Logic
     * -------------------------------------------------------------------------=
     */
    this.PoolConfiguratorGetRevisionFuncAddr = `${PoolManagerAccountAddress}::pool_configurator::get_revision`;
    this.PoolSetUserEmodeFuncAddr = `${PoolManagerAccountAddress}::emode_logic::set_user_emode`;
    this.PoolConfigureEmodeCategoryFuncAddr = `${PoolManagerAccountAddress}::emode_logic::configure_emode_category`;
    this.PoolGetEmodeCategoryDataFuncAddr = `${PoolManagerAccountAddress}::emode_logic::get_emode_category_data`;
    this.PoolGetUserEmodeFuncAddr = `${PoolManagerAccountAddress}::emode_logic::get_user_emode`;

    /**
     * -------------------------------------------------------------------------
     * default_reserve_interest_rate_strategy
     * -------------------------------------------------------------------------
     */
    this.SetReserveInterestRateStrategyFuncAddr = `${PoolManagerAccountAddress}::default_reserve_interest_rate_strategy::set_reserve_interest_rate_strategy`;
    this.GetGetOptimalUsageRatioFuncAddr = `${PoolManagerAccountAddress}::default_reserve_interest_rate_strategy::get_optimal_usage_ratio`;
    this.GetGetMaxExcessUsageRatioFuncAddr = `${PoolManagerAccountAddress}::default_reserve_interest_rate_strategy::get_max_excess_usage_ratio`;
    this.GetVariableRateSlope1FuncAddr = `${PoolManagerAccountAddress}::default_reserve_interest_rate_strategy::get_variable_rate_slope1`;
    this.GetVariableRateSlope2FuncAddr = `${PoolManagerAccountAddress}::default_reserve_interest_rate_strategy::get_variable_rate_slope2`;
    this.GetBaseVariableBorrowRateFuncAddr = `${PoolManagerAccountAddress}::default_reserve_interest_rate_strategy::get_base_variable_borrow_rate`;
    this.GetMaxVariableBorrowRateFuncAddr = `${PoolManagerAccountAddress}::default_reserve_interest_rate_strategy::get_max_variable_borrow_rate`;
    this.CalculateInterestRatesFuncAddr = `${PoolManagerAccountAddress}::default_reserve_interest_rate_strategy::calculate_interest_rates`;

    /**
     * -------------------------------------------------------------------------
     * pool data provider
     * -------------------------------------------------------------------------=
     */
    this.GetAllReservesTokensFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_all_reserves_tokens`;
    this.GetAllATokensFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_all_a_tokens`;
    this.GetAllVariableTokensFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_all_var_tokens`;
    this.GetReserveConfigurationDataFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_reserve_configuration_data`;
    this.GetReserveEModeCategoryFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_reserve_emode_category`;
    this.GetReserveCapsFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_reserve_caps`;
    this.GetPausedFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_paused`;
    this.GetSiloedBorrowingFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_siloed_borrowing`;
    this.GetLiquidationProtocolFeeTokensFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_liquidation_protocol_fee`;
    this.GetUnbackedMintCapFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_unbacked_mint_cap`;
    this.GetDebtCeilingFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_debt_ceiling`;
    this.GetDebtCeilingDecimalsFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_debt_ceiling_decimals`;
    this.GetReserveDataFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_reserve_data`;
    this.GetATokenTotalSupplyFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_a_token_total_supply`;
    this.GetTotalDebtFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_total_debt`;
    this.GetUserReserveDataFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_user_reserve_data`;
    this.GetReserveTokensAddressesFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_reserve_tokens_addresses`;
    this.GetFlashLoanEnabledFuncAddr = `${PoolManagerAccountAddress}::pool_data_provider::get_flash_loan_enabled`;

    /**
     * -------------------------------------------------------------------------
     * pool addresses provider
     * -------------------------------------------------------------------------
     */
    this.HasIdMappedAccountFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::has_id_mapped_account`;
    this.GetMarketIdFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::get_market_id`;
    this.GetAddressFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::get_address`;
    this.GetPoolFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::get_pool`;
    this.GetPoolConfiguratorFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::get_pool_configurator`;
    this.GetPriceOracleFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::get_price_oracle`;
    this.GetAclManagerFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::get_acl_manager`;
    this.GetAclAdminFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::get_acl_admin`;
    this.GetPriceOracleSentinelFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::get_price_oracle_sentinel`;
    this.GetPoolDataProviderFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::get_pool_data_provider`;

    this.SetMarketIdFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::set_market_id`;
    this.SetAddressFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::set_address`;
    this.SetPoolImplFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::set_pool_impl`;
    this.SetPoolConfiguratorFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::set_pool_configurator`;
    this.SetPriceOracleFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::set_price_oracle`;
    this.SetAclManagerFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::set_acl_manager`;
    this.SetAclAdminFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::set_acl_admin`;
    this.SetPriceOracleSentinelFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::set_price_oracle_sentinel`;
    this.SetPoolDataProviderFuncAddr = `${PoolManagerAccountAddress}::pool_addresses_provider::set_pool_data_provider`;
  }
}
