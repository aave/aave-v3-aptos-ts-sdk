import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

/**
 * Represents the TokensContract interface which defines the function addresses for token operations
 * within the AAVE protocol on the Aptos blockchain.
 *
 * @remarks
 * This interface is used by the corresponding client classes to make actual calls to the blockchain.
 * The constructor initializes all function addresses by combining:
 * - The token manager's account address from the provider
 * - The module name (mock_underlying_token_factory, a_token_factory, variable_debt_token_factory)
 * - The specific function name
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const tokens = new TokensContract(provider);
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 */
export class TokensContract {
  // Underlying Token Functions
  underlyingCreateTokenFuncAddr: MoveFunctionId;
  underlyingGetMetadataBySymbolFuncAddr: MoveFunctionId;
  underlyingGetTokenAccountAddressFuncAddr: MoveFunctionId;
  underlyingMintFuncAddr: MoveFunctionId;
  underlyingBurnFuncAddr: MoveFunctionId;
  underlyingSupplyFuncAddr: MoveFunctionId;
  underlyingMaximumFuncAddr: MoveFunctionId;
  underlyingNameFuncAddr: MoveFunctionId;
  underlyingSymbolFuncAddr: MoveFunctionId;
  underlyingDecimalsFuncAddr: MoveFunctionId;
  underlyingBalanceOfFuncAddr: MoveFunctionId;
  underlyingTokenAddressFuncAddr: MoveFunctionId;

  // A Token Functions
  aTokenGetMetadataBySymbolFuncAddr: MoveFunctionId;
  aTokenGetTokenAccountAddressFuncAddr: MoveFunctionId;
  aTokenGetReserveTreasuryAddressFuncAddr: MoveFunctionId;
  aTokenGetUnderlyingAssetAddressFuncAddr: MoveFunctionId;
  aTokenScaledTotalSupplyFuncAddr: MoveFunctionId;
  aTokenTotalSupplyFuncAddr: MoveFunctionId;
  aTokenNameFuncAddr: MoveFunctionId;
  aTokenSymbolFuncAddr: MoveFunctionId;
  aTokenDecimalsFuncAddr: MoveFunctionId;
  aTokenScaledBalanceOfFuncAddr: MoveFunctionId;
  aTokenBalanceOfFuncAddr: MoveFunctionId;
  aTokenRescueTokensFuncAddr: MoveFunctionId;
  aTokenGetScaledUserBalanceAndSupplyFuncAddr: MoveFunctionId;
  aTokenGetGetPreviousIndexFuncAddr: MoveFunctionId;
  aTokenTokenAddressFuncAddr: MoveFunctionId;
  aTokenAssetMetadataFuncAddr: MoveFunctionId;

  // Variable Token Functions
  variableGetMetadataBySymbolFuncAddr: MoveFunctionId;
  variableGetTokenAddressFuncAddr: MoveFunctionId;
  variableGetAssetMetadataFuncAddr: MoveFunctionId;
  variableGetUnderlyingAddressFuncAddr: MoveFunctionId;
  variableNameFuncAddr: MoveFunctionId;
  variableSymbolFuncAddr: MoveFunctionId;
  variableDecimalsFuncAddr: MoveFunctionId;
  variableScaledBalanceOfFuncAddr: MoveFunctionId;
  variableBalanceOfFuncAddr: MoveFunctionId;
  variableScaledTotalSupplyFuncAddr: MoveFunctionId;
  variableTotalSupplyFuncAddr: MoveFunctionId;
  variableGetScaledUserBalanceAndSupplyFuncAddr: MoveFunctionId;
  variableGetPreviousIndexFuncAddr: MoveFunctionId;

  constructor(provider: AptosProvider) {
    // Underlying Token
    const AaveTokensManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const AaveTokensManagerAccountAddress = AaveTokensManager.toString();

    const AaveMockUnderlyingsManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_MOCK_UNDERLYINGS,
    );
    const AaveMockUnderlyingsManagerAccountAddress =
      AaveMockUnderlyingsManager.toString();

    // Underlying Token Functions
    this.underlyingCreateTokenFuncAddr = `${AaveMockUnderlyingsManagerAccountAddress}::mock_underlying_token_factory::create_token`;
    this.underlyingGetMetadataBySymbolFuncAddr = `${AaveMockUnderlyingsManagerAccountAddress}::mock_underlying_token_factory::get_metadata_by_symbol`;
    this.underlyingGetTokenAccountAddressFuncAddr = `${AaveMockUnderlyingsManagerAccountAddress}::mock_underlying_token_factory::get_token_account_address`;
    this.underlyingMintFuncAddr = `${AaveMockUnderlyingsManagerAccountAddress}::mock_underlying_token_factory::mint`;
    this.underlyingBurnFuncAddr = `${AaveMockUnderlyingsManagerAccountAddress}::mock_underlying_token_factory::burn`;
    this.underlyingSupplyFuncAddr = `${AaveMockUnderlyingsManagerAccountAddress}::mock_underlying_token_factory::supply`;
    this.underlyingMaximumFuncAddr = `${AaveMockUnderlyingsManagerAccountAddress}::mock_underlying_token_factory::maximum`;
    this.underlyingNameFuncAddr = `${AaveMockUnderlyingsManagerAccountAddress}::mock_underlying_token_factory::name`;
    this.underlyingSymbolFuncAddr = `${AaveMockUnderlyingsManagerAccountAddress}::mock_underlying_token_factory::symbol`;
    this.underlyingDecimalsFuncAddr = `${AaveMockUnderlyingsManagerAccountAddress}::mock_underlying_token_factory::decimals`;
    this.underlyingBalanceOfFuncAddr = `${AaveMockUnderlyingsManagerAccountAddress}::mock_underlying_token_factory::balance_of`;
    this.underlyingTokenAddressFuncAddr = `${AaveMockUnderlyingsManagerAccountAddress}::mock_underlying_token_factory::token_address`;

    // A Token Functions
    this.aTokenGetMetadataBySymbolFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::asset_metadata`;
    this.aTokenGetTokenAccountAddressFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::get_token_account_address`;
    this.aTokenGetReserveTreasuryAddressFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::get_reserve_treasury_address`;
    this.aTokenGetUnderlyingAssetAddressFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::get_underlying_asset_address`;
    this.aTokenScaledTotalSupplyFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::scaled_total_supply`;
    this.aTokenTotalSupplyFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::total_supply`;
    this.aTokenNameFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::name`;
    this.aTokenSymbolFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::symbol`;
    this.aTokenDecimalsFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::decimals`;
    this.aTokenBalanceOfFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::balance_of`;
    this.aTokenScaledBalanceOfFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::scaled_balance_of`;
    this.aTokenRescueTokensFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::rescue_tokens`;
    this.aTokenGetScaledUserBalanceAndSupplyFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::get_scaled_user_balance_and_supply`;
    this.aTokenGetGetPreviousIndexFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::get_previous_index`;
    this.aTokenTokenAddressFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::token_address`;
    this.aTokenAssetMetadataFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::asset_metadata`;

    // Variable Token Functions
    this.variableGetMetadataBySymbolFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::asset_metadata`;
    this.variableGetTokenAddressFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::token_address`;
    this.variableGetAssetMetadataFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::asset_metadata`;
    this.variableGetUnderlyingAddressFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::get_underlying_asset_address`;
    this.variableNameFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::name`;
    this.variableSymbolFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::symbol`;
    this.variableDecimalsFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::decimals`;
    this.variableScaledBalanceOfFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::scaled_balance_of`;
    this.variableBalanceOfFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::balance_of`;
    this.variableScaledTotalSupplyFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::scaled_total_supply`;
    this.variableTotalSupplyFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::total_supply`;
    this.variableGetScaledUserBalanceAndSupplyFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::get_scaled_user_balance_and_supply`;
    this.variableGetPreviousIndexFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::get_previous_index`;
  }
}
