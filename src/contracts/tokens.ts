import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

/**
 * The `TokensContract` class provides methods to interact with various token contracts on the Aptos blockchain.
 * It includes functionality for managing underlying tokens, A tokens, and variable tokens.
 *
 * @remarks
 * This class initializes various function addresses required for token operations using the provided Aptos provider.
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const tokensContract = new TokensContract(provider);
 * ```
 *
 * @param provider - The Aptos provider used to get profile addresses and interact with the blockchain.
 *
 * Properties initialized:
 * - `UnderlyingCreateTokenFuncAddr`: Address for creating an underlying token.
 * - `UnderlyingGetMetadataBySymbolFuncAddr`: Address for getting metadata by symbol for an underlying token.
 * - `UnderlyingGetTokenAccountAddressFuncAddr`: Address for getting the token account address for an underlying token.
 * - `UnderlyingMintFuncAddr`: Address for minting an underlying token.
 * - `UnderlyingSupplyFuncAddr`: Address for supplying an underlying token.
 * - `UnderlyingMaximumFuncAddr`: Address for getting the maximum supply of an underlying token.
 * - `UnderlyingNameFuncAddr`: Address for getting the name of an underlying token.
 * - `UnderlyingSymbolFuncAddr`: Address for getting the symbol of an underlying token.
 * - `UnderlyingDecimalsFuncAddr`: Address for getting the decimals of an underlying token.
 * - `UnderlyingBalanceOfFuncAddr`: Address for getting the balance of an underlying token.
 * - `UnderlyingTokenAddressFuncAddr`: Address for getting the token address of an underlying token.
 *
 * - `ATokenCreateTokenFuncAddr`: Address for creating an A token.
 * - `ATokenGetMetadataBySymbolFuncAddr`: Address for getting metadata by symbol for an A token.
 * - `ATokenGetTokenAccountAddressFuncAddr`: Address for getting the token account address for an A token.
 * - `ATokenGetReserveTreasuryAddressFuncAddr`: Address for getting the reserve treasury address for an A token.
 * - `ATokenGetUnderlyingAssetAddressFuncAddr`: Address for getting the underlying asset address for an A token.
 * - `ATokenScaledTotalSupplyFuncAddr`: Address for getting the scaled total supply of an A token.
 * - `ATokenTotalSupplyFuncAddr`: Address for getting the total supply of an A token.
 * - `ATokenNameFuncAddr`: Address for getting the name of an A token.
 * - `ATokenSymbolFuncAddr`: Address for getting the symbol of an A token.
 * - `ATokenDecimalsFuncAddr`: Address for getting the decimals of an A token.
 * - `ATokenBalanceOfFuncAddr`: Address for getting the balance of an A token.
 * - `ATokenScaledBalanceOfFuncAddr`: Address for getting the scaled balance of an A token.
 * - `ATokenRescueTokensFuncAddr`: Address for rescuing tokens of an A token.
 * - `ATokenGetScaledUserBalanceAndSupplyFuncAddr`: Address for getting the scaled user balance and supply of an A token.
 * - `ATokenGetGetPreviousIndexFuncAddr`: Address for getting the previous index of an A token.
 * - `ATokenGetRevisionFuncAddr`: Address for getting the revision of an A token.
 * - `ATokenTokenAddressFuncAddr`: Address for getting the token address of an A token.
 * - `ATokenAssetMetadataFuncAddr`: Address for getting the asset metadata of an A token.
 *
 * - `VariableCreateTokenFuncAddr`: Address for creating a variable token.
 * - `VariableGetMetadataBySymbolFuncAddr`: Address for getting metadata by symbol for a variable token.
 * - `VariableGetTokenAddressFuncAddr`: Address for getting the token address of a variable token.
 * - `VariableGetAssetMetadataFuncAddr`: Address for getting the asset metadata of a variable token.
 * - `VariableGetUnderlyingAddressFuncAddr`: Address for getting the underlying asset address of a variable token.
 * - `VariableNameFuncAddr`: Address for getting the name of a variable token.
 * - `VariableSymbolFuncAddr`: Address for getting the symbol of a variable token.
 * - `VariableDecimalsFuncAddr`: Address for getting the decimals of a variable token.
 * - `VariableScaledBalanceOfFuncAddr`: Address for getting the scaled balance of a variable token.
 * - `VariableBalanceOfFuncAddr`: Address for getting the balance of a variable token.
 * - `VariableScaledTotalSupplyFuncAddr`: Address for getting the scaled total supply of a variable token.
 * - `VariableTotalSupplyFuncAddr`: Address for getting the total supply of a variable token.
 * - `VariableGetScaledUserBalanceAndSupplyFuncAddr`: Address for getting the scaled user balance and supply of a variable token.
 * - `VariableGetPreviousIndexFuncAddr`: Address for getting the previous index of a variable token.
 * - `VariableGetRevisionFuncAddr`: Address for getting the revision of a variable token.
 */
export class TokensContract {
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

  ATokenTotalSupplyFuncAddr: MoveFunctionId;

  ATokenNameFuncAddr: MoveFunctionId;

  ATokenSymbolFuncAddr: MoveFunctionId;

  ATokenDecimalsFuncAddr: MoveFunctionId;

  ATokenScaledBalanceOfFuncAddr: MoveFunctionId;

  ATokenBalanceOfFuncAddr: MoveFunctionId;

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

  VariableBalanceOfFuncAddr: MoveFunctionId;

  VariableScaledTotalSupplyFuncAddr: MoveFunctionId;

  VariableTotalSupplyFuncAddr: MoveFunctionId;

  VariableGetScaledUserBalanceAndSupplyFuncAddr: MoveFunctionId;

  VariableGetPreviousIndexFuncAddr: MoveFunctionId;

  VariableGetRevisionFuncAddr: MoveFunctionId;

  /**
   * Constructs an instance of the token manager with the provided Aptos provider.
   * Initializes various function addresses for managing underlying tokens, A tokens, and variable tokens.
   *
   * @param provider - The Aptos provider used to get profile addresses and interact with the blockchain.
   *
   * Properties initialized:
   * - `UnderlyingCreateTokenFuncAddr`: Address for creating an underlying token.
   * - `UnderlyingGetMetadataBySymbolFuncAddr`: Address for getting metadata by symbol for an underlying token.
   * - `UnderlyingGetTokenAccountAddressFuncAddr`: Address for getting the token account address for an underlying token.
   * - `UnderlyingMintFuncAddr`: Address for minting an underlying token.
   * - `UnderlyingSupplyFuncAddr`: Address for supplying an underlying token.
   * - `UnderlyingMaximumFuncAddr`: Address for getting the maximum supply of an underlying token.
   * - `UnderlyingNameFuncAddr`: Address for getting the name of an underlying token.
   * - `UnderlyingSymbolFuncAddr`: Address for getting the symbol of an underlying token.
   * - `UnderlyingDecimalsFuncAddr`: Address for getting the decimals of an underlying token.
   * - `UnderlyingBalanceOfFuncAddr`: Address for getting the balance of an underlying token.
   * - `UnderlyingTokenAddressFuncAddr`: Address for getting the token address of an underlying token.
   *
   * - `ATokenCreateTokenFuncAddr`: Address for creating an A token.
   * - `ATokenGetMetadataBySymbolFuncAddr`: Address for getting metadata by symbol for an A token.
   * - `ATokenGetTokenAccountAddressFuncAddr`: Address for getting the token account address for an A token.
   * - `ATokenGetReserveTreasuryAddressFuncAddr`: Address for getting the reserve treasury address for an A token.
   * - `ATokenGetUnderlyingAssetAddressFuncAddr`: Address for getting the underlying asset address for an A token.
   * - `ATokenScaledTotalSupplyFuncAddr`: Address for getting the scaled total supply of an A token.
   * - `ATokenTotalSupplyFuncAddr`: Address for getting the total supply of an A token.
   * - `ATokenNameFuncAddr`: Address for getting the name of an A token.
   * - `ATokenSymbolFuncAddr`: Address for getting the symbol of an A token.
   * - `ATokenDecimalsFuncAddr`: Address for getting the decimals of an A token.
   * - `ATokenBalanceOfFuncAddr`: Address for getting the balance of an A token.
   * - `ATokenScaledBalanceOfFuncAddr`: Address for getting the scaled balance of an A token.
   * - `ATokenRescueTokensFuncAddr`: Address for rescuing tokens of an A token.
   * - `ATokenGetScaledUserBalanceAndSupplyFuncAddr`: Address for getting the scaled user balance and supply of an A token.
   * - `ATokenGetGetPreviousIndexFuncAddr`: Address for getting the previous index of an A token.
   * - `ATokenGetRevisionFuncAddr`: Address for getting the revision of an A token.
   * - `ATokenTokenAddressFuncAddr`: Address for getting the token address of an A token.
   * - `ATokenAssetMetadataFuncAddr`: Address for getting the asset metadata of an A token.
   *
   * - `VariableCreateTokenFuncAddr`: Address for creating a variable token.
   * - `VariableGetMetadataBySymbolFuncAddr`: Address for getting metadata by symbol for a variable token.
   * - `VariableGetTokenAddressFuncAddr`: Address for getting the token address of a variable token.
   * - `VariableGetAssetMetadataFuncAddr`: Address for getting the asset metadata of a variable token.
   * - `VariableGetUnderlyingAddressFuncAddr`: Address for getting the underlying asset address of a variable token.
   * - `VariableNameFuncAddr`: Address for getting the name of a variable token.
   * - `VariableSymbolFuncAddr`: Address for getting the symbol of a variable token.
   * - `VariableDecimalsFuncAddr`: Address for getting the decimals of a variable token.
   * - `VariableScaledBalanceOfFuncAddr`: Address for getting the scaled balance of a variable token.
   * - `VariableBalanceOfFuncAddr`: Address for getting the balance of a variable token.
   * - `VariableScaledTotalSupplyFuncAddr`: Address for getting the scaled total supply of a variable token.
   * - `VariableTotalSupplyFuncAddr`: Address for getting the total supply of a variable token.
   * - `VariableGetScaledUserBalanceAndSupplyFuncAddr`: Address for getting the scaled user balance and supply of a variable token.
   * - `VariableGetPreviousIndexFuncAddr`: Address for getting the previous index of a variable token.
   * - `VariableGetRevisionFuncAddr`: Address for getting the revision of a variable token.
   */
  constructor(provider: AptosProvider) {
    // Underlying Token
    const AaveTokensManager = provider.getProfileAddressByName(
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
    this.ATokenTotalSupplyFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::total_supply`;
    this.ATokenNameFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::name`;
    this.ATokenSymbolFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::symbol`;
    this.ATokenDecimalsFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::decimals`;
    this.ATokenBalanceOfFuncAddr = `${AaveTokensManagerAccountAddress}::a_token_factory::balance_of`;
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
    this.VariableBalanceOfFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::balance_of`;
    this.VariableScaledTotalSupplyFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::scaled_total_supply`;
    this.VariableTotalSupplyFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::total_supply`;
    this.VariableGetScaledUserBalanceAndSupplyFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::get_scaled_user_balance_and_supply`;
    this.VariableGetPreviousIndexFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::get_previous_index`;
    this.VariableGetRevisionFuncAddr = `${AaveTokensManagerAccountAddress}::variable_debt_token_factory::get_revision`;
  }
}
