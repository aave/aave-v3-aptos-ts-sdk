import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
  MoveFunctionId,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { Metadata } from "../helpers/interfaces";
import { AptosProvider } from "./aptosProvider";
import { TokensContract } from "../contracts/tokens";
import { mapToBigInt } from "../helpers/common";

/**
 * The `VariableTokensClient` class provides methods to interact with variable tokens on the Aptos blockchain.
 * It extends the `AptosContractWrapperBaseClass` and includes functionalities for managing variable debt tokens,
 * retrieving token metadata, balances, and other related information within the AAVE protocol.
 *
 * @remarks
 * This client is designed to work with variable debt tokens and provides a high-level API for token operations.
 * The client can be instantiated in two ways:
 * 1. Using the constructor directly with a provider and optional signer
 * 2. Using the static buildWithDefaultSigner method which automatically configures the client with the provider's pool profile account
 *
 * @example
 * ```typescript
 * // Using buildWithDefaultSigner
 * const provider = new AptosProvider();
 * const client = VariableTokensClient.buildWithDefaultSigner(provider);
 *
 * // Using constructor directly
 * const provider = new AptosProvider();
 * const signer = provider.getPoolProfileAccount();
 * const client = new VariableTokensClient(provider, signer);
 *
 * // Get token metadata and balance
 * const metadataAddress = await client.getMetadataBySymbol("USDC");
 * const balance = await client.balanceOf(userAddress, metadataAddress);
 *
 * // Get scaled balance and total supply
 * const { scaledUserBalance, supply } = await client.getScaledUserBalanceAndSupply(
 *   userAddress,
 *   metadataAddress
 * );
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 * @param signer - Optional Ed25519Account signer for transaction signing.
 */
export class VariableTokensClient extends AptosContractWrapperBaseClass {
  tokensContract: TokensContract;

  /**
   * Creates an instance of VariableTokensClient.
   *
   * @param provider - The AptosProvider instance to interact with the Aptos blockchain.
   * @param signer - Optional Ed25519Account instance used for signing transactions.
   */
  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.tokensContract = new TokensContract(provider);
  }

  /**
   * Creates an instance of `VariableTokensClient` using the default signer.
   *
   * @param provider - The `AptosProvider` instance to be used for creating the client.
   * @returns A new instance of `VariableTokensClient` initialized with the provided `AptosProvider`.
   */
  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): VariableTokensClient {
    const client = new VariableTokensClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }

  /**
   * Retrieves the metadata associated with a given token symbol for a specific account.
   *
   * @param symbol - The symbol of the token for which metadata is being requested.
   * @returns A promise that resolves to the account address containing the metadata.
   *
   * @throws Will throw an error if the call to the view method fails.
   */
  public async getMetadataBySymbol(symbol: string): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.variableGetMetadataBySymbolFuncAddr,
      [symbol],
    );
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  /**
   * Retrieves the token address for a given owner and token symbol.
   *
   * @param symbol - The symbol of the token.
   * @returns A promise that resolves to the account address of the token.
   */
  public async getTokenAddress(symbol: string): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.variableGetTokenAddressFuncAddr,
      [symbol],
    );
    return AccountAddress.fromString(resp as string);
  }

  /**
   * Retrieves the metadata of a specific asset for a given owner.
   *
   * @param symbol - The symbol of the asset.
   * @returns A promise that resolves to the account address containing the asset metadata.
   */
  public async getAssetMetadata(symbol: string): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.variableGetAssetMetadataFuncAddr,
      [symbol],
    );
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  /**
   * Retrieves the underlying asset address for a given metadata address.
   *
   * @param metadataAddress - The account address of the metadata.
   * @returns A promise that resolves to the account address of the underlying asset.
   */
  public async getUnderlyingAssetAddress(
    metadataAddress: AccountAddress,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.variableGetUnderlyingAddressFuncAddr,
      [metadataAddress],
    );
    return AccountAddress.fromString(resp as string);
  }

  /**
   * Retrieves the balance of variable tokens for a given owner and metadata address.
   *
   * @param owner - The account address of the token owner.
   * @param metadataAddress - The account address of the token metadata.
   * @returns A promise that resolves to the balance of the variable tokens as a bigint.
   */
  public async balanceOf(
    owner: AccountAddress,
    metadataAddress: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(this.tokensContract.variableBalanceOfFuncAddr, [
        owner,
        metadataAddress,
      ])
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the scaled balance of a specific token for a given owner.
   *
   * @param owner - The address of the account owner.
   * @param metadataAddress - The address of the token metadata.
   * @returns A promise that resolves to the scaled balance as a bigint.
   */
  public async scaledBalanceOf(
    owner: AccountAddress,
    metadataAddress: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.tokensContract.variableScaledBalanceOfFuncAddr,
        [owner, metadataAddress],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the scaled total supply of a token given its metadata address.
   *
   * @param metadataAddress - The address of the token's metadata.
   * @returns A promise that resolves to the scaled total supply of the token as a bigint.
   */
  public async scaledTotalSupply(
    metadataAddress: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.tokensContract.variableScaledTotalSupplyFuncAddr,
        [metadataAddress],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the total supply of a specific token.
   *
   * @param metadataAddress - The account address of the token metadata.
   * @returns A promise that resolves to the total supply of the token as a bigint.
   */
  public async totalSupply(metadataAddress: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.tokensContract.variableTotalSupplyFuncAddr,
        [metadataAddress],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the scaled user balance and supply for a given owner and metadata address.
   *
   * @param owner - The account address of the owner.
   * @param metadataAddress - The account address of the metadata.
   * @returns A promise that resolves to a bigint representing the scaled user balance and supply.
   */
  public async getScaledUserBalanceAndSupply(
    owner: AccountAddress,
    metadataAddress: AccountAddress,
  ): Promise<{ scaledUserBalance: bigint; supply: bigint }> {
    const [scaledUserBalance, supply] = (
      await this.callViewMethod(
        this.tokensContract.variableGetScaledUserBalanceAndSupplyFuncAddr,
        [owner, metadataAddress],
      )
    ).map(mapToBigInt);
    return { scaledUserBalance, supply };
  }

  /**
   * Retrieves the previous index for a given user and metadata address.
   *
   * @param user - The account address of the user.
   * @param metadataAddress - The account address of the metadata.
   * @returns A promise that resolves to a bigint representing the previous index.
   */
  public async getPreviousIndex(
    user: AccountAddress,
    metadataAddress: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.tokensContract.variableGetPreviousIndexFuncAddr,
        [user, metadataAddress],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the name associated with a given metadata address.
   *
   * @param metadataAddress - The address of the metadata to query.
   * @returns A promise that resolves to the name as a string.
   */
  public async name(metadataAddress: AccountAddress): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.variableNameFuncAddr,
      [metadataAddress],
    );
    return resp as string;
  }

  /**
   * Retrieves the symbol of a variable token given its metadata address.
   *
   * @param metadataAddress - The address of the token's metadata.
   * @returns A promise that resolves to the symbol of the token as a string.
   */
  public async symbol(metadataAddress: AccountAddress): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.variableSymbolFuncAddr,
      [metadataAddress],
    );
    return resp as string;
  }

  /**
   * Retrieves the number of decimals for a given token.
   *
   * @param metadataAddress - The address of the token's metadata.
   * @returns A promise that resolves to the number of decimals as a bigint.
   */
  public async decimals(metadataAddress: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(this.tokensContract.variableDecimalsFuncAddr, [
        metadataAddress,
      ])
    ).map(mapToBigInt);
    return resp;
  }
}
