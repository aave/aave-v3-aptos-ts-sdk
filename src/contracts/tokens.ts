import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

export class TokensContract {
  // Resource Func Addr
  // Underlying Token
  UnderlyingCreateTokenFuncAddr: MoveFunctionId;

  UnderlyingGetMetadataBySymbolFuncAddr: MoveFunctionId;

  UnderlyingGetTokenAccountAddressFuncAddr: MoveFunctionId;

  UnderlyingMintFuncAddr: MoveFunctionId;

  UnderlyingSupplyFuncAddr: MoveFunctionId;

  UnderlyingMaximumFuncAddr: MoveFunctionId;

  UnderlyingNameFuncAddr: MoveFunctionId;

  UnderlyingSymbolFuncAddr: MoveFunctionId;

  UnderlyingDecimalsFuncAddr: MoveFunctionId;

  UnderlyingBalanceOfFuncAddr: MoveFunctionId;

  UnderlyingTokenAddressFuncAddr: MoveFunctionId;

  // A Token
  ATokenCreateTokenFuncAddr: MoveFunctionId;

  ATokenGetMetadataBySymbolFuncAddr: MoveFunctionId;

  ATokenGetTokenAccountAddressFuncAddr: MoveFunctionId;

  ATokenGetReserveTreasuryAddressFuncAddr: MoveFunctionId;

  ATokenGetUnderlyingAssetAddressFuncAddr: MoveFunctionId;

  ATokenScaledTotalSupplyFuncAddr: MoveFunctionId;

  ATokenNameFuncAddr: MoveFunctionId;

  ATokenSymbolFuncAddr: MoveFunctionId;

  ATokenDecimalsFuncAddr: MoveFunctionId;

  ATokenScaledBalanceOfFuncAddr: MoveFunctionId;

  ATokenRescueTokensFuncAddr: MoveFunctionId;

  ATokenGetScaledUserBalanceAndSupplyFuncAddr: MoveFunctionId;

  ATokenGetGetPreviousIndexFuncAddr: MoveFunctionId;

  ATokenGetRevisionFuncAddr: MoveFunctionId;

  ATokenTokenAddressFuncAddr: MoveFunctionId;

  ATokenAssetMetadataFuncAddr: MoveFunctionId;

  // Variable Token
  VariableCreateTokenFuncAddr: MoveFunctionId;

  VariableGetMetadataBySymbolFuncAddr: MoveFunctionId;

  VariableGetTokenAddressFuncAddr: MoveFunctionId;

  VariableGetAssetMetadataFuncAddr: MoveFunctionId;

  VariableGetUnderlyingAddressFuncAddr: MoveFunctionId;

  VariableNameFuncAddr: MoveFunctionId;

  VariableSymbolFuncAddr: MoveFunctionId;

  VariableDecimalsFuncAddr: MoveFunctionId;

  VariableScaledBalanceOfFuncAddr: MoveFunctionId;

  VariableScaledTotalSupplyFuncAddr: MoveFunctionId;

  VariableGetScaledUserBalanceAndSupplyFuncAddr: MoveFunctionId;

  VariableGetPreviousIndexFuncAddr: MoveFunctionId;

  VariableGetRevisionFuncAddr: MoveFunctionId;

  constructor(provider: AptosProvider) {
    // Underlying Token
    const AaveTokensManager = provider.getProfileAccountByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const AaveTokensManagerAccountAddress = AaveTokensManager.toString();
    // Resource Func Addr
    // Underlying Token
    this.UnderlyingCreateTokenFuncAddr = `${AaveTokensManagerAccountAddress}::mock_underlying_token_factory::create_token`;
    this.UnderlyingGetMetadataBySymbolFuncAddr = `${AaveTokensManagerAccountAddress}::mock_underlying_token_factory::get_metadata_by_symbol`;
    this.UnderlyingGetTokenAccountAddressFuncAddr = `${AaveTokensManagerAccountAddress}::mock_underlying_token_factory::get_token_account_address`;
    this.UnderlyingMintFuncAddr = `${AaveTokensManagerAccountAddress}::mock_underlying_token_factory::mint`;
    this.UnderlyingSupplyFuncAddr = `${AaveTokensManagerAccountAddress}::mock_underlying_token_factory::supply`;
    this.UnderlyingMaximumFuncAddr = `${AaveTokensManagerAccountAddress}::mock_underlying_token_factory::maximum`;
    this.UnderlyingNameFuncAddr = `${AaveTokensManagerAccountAddress}::mock_underlying_token_factory::name`;
    this.UnderlyingSymbolFuncAddr = `${AaveTokensManagerAccountAddress}::mock_underlying_token_factory::symbol`;
    this.UnderlyingDecimalsFuncAddr = `${AaveTokensManagerAccountAddress}::mock_underlying_token_factory::decimals`;
    this.UnderlyingBalanceOfFuncAddr = `${AaveTokensManagerAccountAddress}::mock_underlying_token_factory::balance_of`;
    this.UnderlyingTokenAddressFuncAddr = `${AaveTokensManagerAccountAddress}::mock_underlying_token_factory::token_address`;

    // A Token
    this.ATokenCreateTokenFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::create_token`;
    this.ATokenGetMetadataBySymbolFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::asset_metadata`;
    this.ATokenGetTokenAccountAddressFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::get_token_account_address`;
    this.ATokenGetReserveTreasuryAddressFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::get_reserve_treasury_address`;
    this.ATokenGetUnderlyingAssetAddressFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::get_underlying_asset_address`;
    this.ATokenScaledTotalSupplyFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::scaled_total_supply`;
    this.ATokenNameFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::name`;
    this.ATokenSymbolFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::symbol`;
    this.ATokenDecimalsFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::decimals`;
    this.ATokenScaledBalanceOfFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::scaled_balance_of`;
    this.ATokenRescueTokensFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::rescue_tokens`;
    this.ATokenGetScaledUserBalanceAndSupplyFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::get_scaled_user_balance_and_supply`;
    this.ATokenGetGetPreviousIndexFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::get_previous_index`;
    this.ATokenGetRevisionFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::get_revision`;
    this.ATokenTokenAddressFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::token_address`;
    this.ATokenAssetMetadataFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::asset_metadata`;

    // Variable Token
    this.VariableCreateTokenFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::create_token`;
    this.VariableGetMetadataBySymbolFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::asset_metadata`;
    this.VariableGetTokenAddressFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::token_address`;
    this.VariableGetAssetMetadataFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::asset_metadata`;
    this.VariableGetUnderlyingAddressFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::get_underlying_asset_address`;
    this.VariableNameFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::name`;
    this.VariableSymbolFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::symbol`;
    this.VariableDecimalsFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::decimals`;
    this.VariableScaledBalanceOfFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::scaled_balance_of`;
    this.VariableScaledTotalSupplyFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::scaled_total_supply`;
    this.VariableGetScaledUserBalanceAndSupplyFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::get_scaled_user_balance_and_supply`;
    this.VariableGetPreviousIndexFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::get_previous_index`;
    this.VariableGetRevisionFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::get_revision`;
  }
}
