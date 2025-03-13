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
 * It extends the `AptosContractWrapperBaseClass` and utilizes the `TokensContract` for various token operations.
 *
 * @remarks
 * This client allows for creating new variable tokens, retrieving token metadata, balances, and other related information.
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const client = VariableTokensClient.buildWithDefaultSigner(provider);
 * const tokenAddress = await client.createToken(
 *   1000000n,
 *   "MyToken",
 *   "MTK",
 *   18,
 *   "https://example.com/icon.png",
 *   "https://example.com",
 *   "0x1"
 * );
 * const balance = await client.balanceOf("0x1", tokenAddress);
 * console.log(`Balance: ${balance}`);
 * ```
 *
 * @public
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
   * Creates a new variable token with the specified parameters.
   *
   * @param maximumSupply - The maximum supply of the token.
   * @param name - The name of the token.
   * @param symbol - The symbol of the token.
   * @param decimals - The number of decimal places the token uses.
   * @param iconUri - The URI of the token's icon.
   * @param projectUri - The URI of the project's website or information page.
   * @param underlyingAsset - The account address of the underlying asset.
   * @returns A promise that resolves to the committed transaction response.
   */
  public async createToken(
    maximumSupply: bigint,
    name: string,
    symbol: string,
    decimals: number,
    iconUri: string,
    projectUri: string,
    underlyingAsset: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.tokensContract.VariableCreateTokenFuncAddr,
      [
        maximumSupply,
        name,
        symbol,
        decimals,
        iconUri,
        projectUri,
        underlyingAsset,
      ],
    );
  }

  /**
   * Retrieves the revision number of the variable tokens contract.
   *
   * @returns {Promise<number>} A promise that resolves to the revision number.
   *
   * @throws {Error} If the call to the view method fails.
   */
  public async getRevision(): Promise<number> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.VariableGetRevisionFuncAddr,
      [],
    );
    return resp as number;
  }

  /**
   * Retrieves the metadata associated with a given token symbol for a specific account.
   *
   * @param owner - The account address of the token owner.
   * @param symbol - The symbol of the token for which metadata is being requested.
   * @returns A promise that resolves to the account address containing the metadata.
   *
   * @throws Will throw an error if the call to the view method fails.
   */
  public async getMetadataBySymbol(
    owner: AccountAddress,
    symbol: string,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.VariableGetMetadataBySymbolFuncAddr,
      [owner, symbol],
    );
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  /**
   * Retrieves the token address for a given owner and token symbol.
   *
   * @param owner - The account address of the token owner.
   * @param symbol - The symbol of the token.
   * @returns A promise that resolves to the account address of the token.
   */
  public async getTokenAddress(
    owner: AccountAddress,
    symbol: string,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.VariableGetTokenAddressFuncAddr,
      [owner, symbol],
    );
    return AccountAddress.fromString(resp as string);
  }

  /**
   * Retrieves the metadata of a specific asset for a given owner.
   *
   * @param owner - The account address of the asset owner.
   * @param symbol - The symbol of the asset.
   * @returns A promise that resolves to the account address containing the asset metadata.
   */
  public async getAssetMetadata(
    owner: AccountAddress,
    symbol: string,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.VariableGetAssetMetadataFuncAddr,
      [owner, symbol],
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
      this.tokensContract.VariableGetUnderlyingAddressFuncAddr,
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
      await this.callViewMethod(this.tokensContract.VariableBalanceOfFuncAddr, [
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
        this.tokensContract.VariableScaledBalanceOfFuncAddr,
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
  public async scaledTotalSupplyOf(
    metadataAddress: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.tokensContract.VariableScaledTotalSupplyFuncAddr,
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
  public async totalSupplyOf(metadataAddress: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.tokensContract.VariableTotalSupplyFuncAddr,
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
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.tokensContract.VariableGetScaledUserBalanceAndSupplyFuncAddr,
        [owner, metadataAddress],
      )
    ).map(mapToBigInt);
    return resp;
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
        this.tokensContract.VariableGetPreviousIndexFuncAddr,
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
      this.tokensContract.VariableNameFuncAddr,
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
      this.tokensContract.VariableSymbolFuncAddr,
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
      await this.callViewMethod(this.tokensContract.VariableDecimalsFuncAddr, [
        metadataAddress,
      ])
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the decimal precision for a given token.
   *
   * @param funcAddr - The address of the Move function to call.
   * @param metadataAddr - The address of the account containing the token metadata.
   * @returns A promise that resolves to the decimal precision of the token as a bigint.
   */
  public async getDecimals(
    funcAddr: MoveFunctionId,
    metadataAddr: AccountAddress,
  ): Promise<bigint> {
    const [res] = (await this.callViewMethod(funcAddr, [metadataAddr])).map(
      mapToBigInt,
    );
    return res;
  }
}
