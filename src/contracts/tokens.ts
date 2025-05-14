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
 * - `underlyingCreateTokenFuncAddr`: Address for creating an underlying token.
 * - `underlyingGetMetadataBySymbolFuncAddr`: Address for getting metadata by symbol for an underlying token.
 * - `underlyingGetTokenAccountAddressFuncAddr`: Address for getting the token account address for an underlying token.
 * - `underlyingMintFuncAddr`: Address for minting an underlying token.
 * - `underlyingSupplyFuncAddr`: Address for supplying an underlying token.
 * - `underlyingMaximumFuncAddr`: Address for getting the maximum supply of an underlying token.
 * - `underlyingNameFuncAddr`: Address for getting the name of an underlying token.
 * - `underlyingSymbolFuncAddr`: Address for getting the symbol of an underlying token.
 * - `underlyingDecimalsFuncAddr`: Address for getting the decimals of an underlying token.
 * - `underlyingBalanceOfFuncAddr`: Address for getting the balance of an underlying token.
 * - `underlyingTokenAddressFuncAddr`: Address for getting the token address of an underlying token.
 *
 * - `aTokenCreateTokenFuncAddr`: Address for creating an A token.
 * - `aTokenGetMetadataBySymbolFuncAddr`: Address for getting metadata by symbol for an A token.
 * - `aTokenGetTokenAccountAddressFuncAddr`: Address for getting the token account address for an A token.
 * - `aTokenGetReserveTreasuryAddressFuncAddr`: Address for getting the reserve treasury address for an A token.
 * - `aTokenGetUnderlyingAssetAddressFuncAddr`: Address for getting the underlying asset address for an A token.
 * - `aTokenScaledTotalSupplyFuncAddr`: Address for getting the scaled total supply of an A token.
 * - `aTokenTotalSupplyFuncAddr`: Address for getting the total supply of an A token.
 * - `aTokenNameFuncAddr`: Address for getting the name of an A token.
 * - `aTokenSymbolFuncAddr`: Address for getting the symbol of an A token.
 * - `aTokenDecimalsFuncAddr`: Address for getting the decimals of an A token.
 * - `aTokenBalanceOfFuncAddr`: Address for getting the balance of an A token.
 * - `aTokenScaledBalanceOfFuncAddr`: Address for getting the scaled balance of an A token.
 * - `aTokenRescueTokensFuncAddr`: Address for rescuing tokens of an A token.
 * - `aTokenGetScaledUserBalanceAndSupplyFuncAddr`: Address for getting the scaled user balance and supply of an A token.
 * - `aTokenGetGetPreviousIndexFuncAddr`: Address for getting the previous index of an A token.
 * - `aTokenGetRevisionFuncAddr`: Address for getting the revision of an A token.
 * - `aTokenTokenAddressFuncAddr`: Address for getting the token address of an A token.
 * - `aTokenAssetMetadataFuncAddr`: Address for getting the asset metadata of an A token.
 *
 * - `variableCreateTokenFuncAddr`: Address for creating a variable token.
 * - `variableGetMetadataBySymbolFuncAddr`: Address for getting metadata by symbol for a variable token.
 * - `variableGetTokenAddressFuncAddr`: Address for getting the token address of a variable token.
 * - `variableGetAssetMetadataFuncAddr`: Address for getting the asset metadata of a variable token.
 * - `variableGetUnderlyingAddressFuncAddr`: Address for getting the underlying asset address of a variable token.
 * - `variableNameFuncAddr`: Address for getting the name of a variable token.
 * - `variableSymbolFuncAddr`: Address for getting the symbol of a variable token.
 * - `variableDecimalsFuncAddr`: Address for getting the decimals of a variable token.
 * - `variableScaledBalanceOfFuncAddr`: Address for getting the scaled balance of a variable token.
 * - `variableBalanceOfFuncAddr`: Address for getting the balance of a variable token.
 * - `variableScaledTotalSupplyFuncAddr`: Address for getting the scaled total supply of a variable token.
 * - `variableTotalSupplyFuncAddr`: Address for getting the total supply of a variable token.
 * - `variableGetScaledUserBalanceAndSupplyFuncAddr`: Address for getting the scaled user balance and supply of a variable token.
 * - `variableGetPreviousIndexFuncAddr`: Address for getting the previous index of a variable token.
 * - `variableGetRevisionFuncAddr`: Address for getting the revision of a variable token.
 */
export class TokensContract {
  // (Mock) Underlying Tokens
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

  // A Token
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

  // Variable Token
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

  /**
   * Constructs an instance of the token manager with the provided Aptos provider.
   * Initializes various function addresses for managing underlying tokens, A tokens, and variable tokens.
   *
   * @param provider - The Aptos provider used to get profile addresses and interact with the blockchain.
   *
   * Properties initialized:
   * - `underlyingCreateTokenFuncAddr`: Address for creating an underlying token.
   * - `underlyingGetMetadataBySymbolFuncAddr`: Address for getting metadata by symbol for an underlying token.
   * - `underlyingGetTokenAccountAddressFuncAddr`: Address for getting the token account address for an underlying token.
   * - `underlyingMintFuncAddr`: Address for minting an underlying token.
   * - `underlyingBurnFuncAddr`: Address for burning an underlying token.
   * - `underlyingSupplyFuncAddr`: Address for supplying an underlying token.
   * - `underlyingMaximumFuncAddr`: Address for getting the maximum supply of an underlying token.
   * - `underlyingNameFuncAddr`: Address for getting the name of an underlying token.
   * - `underlyingSymbolFuncAddr`: Address for getting the symbol of an underlying token.
   * - `underlyingDecimalsFuncAddr`: Address for getting the decimals of an underlying token.
   * - `underlyingBalanceOfFuncAddr`: Address for getting the balance of an underlying token.
   * - `underlyingTokenAddressFuncAddr`: Address for getting the token address of an underlying token.
   *
   * - `aTokenGetMetadataBySymbolFuncAddr`: Address for getting metadata by symbol for an A token.
   * - `aTokenGetTokenAccountAddressFuncAddr`: Address for getting the token account address for an A token.
   * - `aTokenGetReserveTreasuryAddressFuncAddr`: Address for getting the reserve treasury address for an A token.
   * - `aTokenGetUnderlyingAssetAddressFuncAddr`: Address for getting the underlying asset address for an A token.
   * - `aTokenScaledTotalSupplyFuncAddr`: Address for getting the scaled total supply of an A token.
   * - `aTokenTotalSupplyFuncAddr`: Address for getting the total supply of an A token.
   * - `aTokenNameFuncAddr`: Address for getting the name of an A token.
   * - `aTokenSymbolFuncAddr`: Address for getting the symbol of an A token.
   * - `aTokenDecimalsFuncAddr`: Address for getting the decimals of an A token.
   * - `aTokenBalanceOfFuncAddr`: Address for getting the balance of an A token.
   * - `aTokenScaledBalanceOfFuncAddr`: Address for getting the scaled balance of an A token.
   * - `aTokenRescueTokensFuncAddr`: Address for rescuing tokens of an A token.
   * - `aTokenGetScaledUserBalanceAndSupplyFuncAddr`: Address for getting the scaled user balance and supply of an A token.
   * - `aTokenGetGetPreviousIndexFuncAddr`: Address for getting the previous index of an A token.
   * - `aTokenTokenAddressFuncAddr`: Address for getting the token address of an A token.
   * - `aTokenAssetMetadataFuncAddr`: Address for getting the asset metadata of an A token.
   *
   * - `variableGetMetadataBySymbolFuncAddr`: Address for getting metadata by symbol for a variable token.
   * - `variableGetTokenAddressFuncAddr`: Address for getting the token address of a variable token.
   * - `variableGetAssetMetadataFuncAddr`: Address for getting the asset metadata of a variable token.
   * - `variableGetUnderlyingAddressFuncAddr`: Address for getting the underlying asset address of a variable token.
   * - `variableNameFuncAddr`: Address for getting the name of a variable token.
   * - `variableSymbolFuncAddr`: Address for getting the symbol of a variable token.
   * - `variableDecimalsFuncAddr`: Address for getting the decimals of a variable token.
   * - `variableScaledBalanceOfFuncAddr`: Address for getting the scaled balance of a variable token.
   * - `variableBalanceOfFuncAddr`: Address for getting the balance of a variable token.
   * - `variableScaledTotalSupplyFuncAddr`: Address for getting the scaled total supply of a variable token.
   * - `variableTotalSupplyFuncAddr`: Address for getting the total supply of a variable token.
   * - `variableGetScaledUserBalanceAndSupplyFuncAddr`: Address for getting the scaled user balance and supply of a variable token.
   * - `variableGetPreviousIndexFuncAddr`: Address for getting the previous index of a variable token.
   */
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

    // Resource Func Addr
    // Underlying Token
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

    // A Token
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

    // Variable Token
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
