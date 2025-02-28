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
 * The `UnderlyingTokensClient` class provides methods to interact with underlying tokens
 * on the Aptos blockchain. It extends the `AptosContractWrapperBaseClass` and utilizes
 * the `TokensContract` to perform various operations such as creating tokens, minting tokens,
 * retrieving metadata, and more.
 *
 * @class UnderlyingTokensClient
 * @extends {AptosContractWrapperBaseClass}
 * @property {TokensContract} tokensContract - The contract instance for interacting with tokens.
 * @constructor
 * @param {AptosProvider} provider - The provider instance for interacting with the Aptos blockchain.
 * @param {Ed25519Account} [signer] - Optional signer account for signing transactions.
 *
 * @method static buildWithDefaultSigner
 * @param {AptosProvider} provider - The provider instance for creating the client.
 * @returns {UnderlyingTokensClient} A new instance of `UnderlyingTokensClient`.
 *
 * @method createToken
 * @param {bigint} maximumSupply - The maximum supply of the token.
 * @param {string} name - The name of the token.
 * @param {string} symbol - The symbol of the token.
 * @param {number} decimals - The number of decimal places for the token.
 * @param {string} iconUri - The URI of the token's icon.
 * @param {string} projectUri - The URI of the project's website or information page.
 * @returns {Promise<CommittedTransactionResponse>} A promise that resolves to a transaction response.
 *
 * @method mint
 * @param {AccountAddress} to - The account address to which the tokens will be minted.
 * @param {bigint} amount - The amount of tokens to mint.
 * @param {AccountAddress} metadataAddress - The account address of the metadata.
 * @returns {Promise<CommittedTransactionResponse>} A promise that resolves to a transaction response.
 *
 * @method getMetadataBySymbol
 * @param {string} symbol - The symbol of the token for which metadata is being requested.
 * @returns {Promise<AccountAddress>} A promise that resolves to an `AccountAddress` object containing the metadata.
 *
 * @method getTokenAccountAddress
 * @returns {Promise<AccountAddress>} A promise that resolves to an `AccountAddress` object containing the token account address.
 *
 * @method supply
 * @param {AccountAddress} metadataAddress - The address of the metadata to supply tokens for.
 * @returns {Promise<bigint>} A promise that resolves to the amount of tokens supplied as a bigint.
 *
 * @method maximum
 * @param {AccountAddress} metadataAddress - The address of the account metadata.
 * @returns {Promise<bigint | undefined>} A promise that resolves to a bigint representing the maximum value, or undefined if not available.
 *
 * @method name
 * @param {AccountAddress} metadataAddress - The address of the account metadata.
 * @returns {Promise<string>} A promise that resolves to the name of the underlying token as a string.
 *
 * @method symbol
 * @param {AccountAddress} metadataAddress - The address of the account metadata.
 * @returns {Promise<string>} A promise that resolves to the symbol of the underlying token as a string.
 *
 * @method decimals
 * @param {AccountAddress} metadataAddress - The address of the token's metadata.
 * @returns {Promise<bigint>} A promise that resolves to the number of decimals as a bigint.
 *
 * @method getMetadataAddress
 * @param {MoveFunctionId} funcAddr - The identifier of the Move function to call.
 * @param {string} coinName - The name of the coin for which to retrieve the metadata address.
 * @returns {Promise<AccountAddress>} A promise that resolves to the account address containing the metadata.
 *
 * @method getDecimals
 * @param {MoveFunctionId} funcAddr - The address of the Move function to call.
 * @param {AccountAddress} metadataAddr - The address of the account containing the token metadata.
 * @returns {Promise<bigint>} A promise that resolves to the decimal precision of the token as a bigint.
 *
 * @method balanceOf
 * @param {AccountAddress} owner - The account address of the token owner.
 * @param {AccountAddress} metadataAddress - The account address of the token metadata.
 * @returns {Promise<bigint>} A promise that resolves to the balance of underlying tokens as a bigint.
 *
 * @method getTokenAddress
 * @param {string} symbol - The symbol of the token whose address is to be retrieved.
 * @returns {Promise<AccountAddress>} A promise that resolves to the account address of the token.
 */
export class UnderlyingTokensClient extends AptosContractWrapperBaseClass {
  tokensContract: TokensContract;

  /**
   * Creates an instance of the UnderlyingTokensClient.
   *
   * @param provider - The AptosProvider instance to interact with the Aptos blockchain.
   * @param signer - Optional Ed25519Account instance for signing transactions.
   */
  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.tokensContract = new TokensContract(provider);
  }

  /**
   * Creates an instance of `UnderlyingTokensClient` using the default signer.
   *
   * @param provider - The `AptosProvider` instance to be used for creating the client.
   * @returns A new instance of `UnderlyingTokensClient`.
   */
  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): UnderlyingTokensClient {
    const client = new UnderlyingTokensClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }

  /**
   * Creates a new token with the specified parameters.
   *
   * @param maximumSupply - The maximum supply of the token as a bigint.
   * @param name - The name of the token.
   * @param symbol - The symbol of the token.
   * @param decimals - The number of decimal places for the token.
   * @param iconUri - The URI of the token's icon.
   * @param projectUri - The URI of the project's website or information page.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async createToken(
    maximumSupply: bigint,
    name: string,
    symbol: string,
    decimals: number,
    iconUri: string,
    projectUri: string,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.tokensContract.UnderlyingCreateTokenFuncAddr,
      [maximumSupply, name, symbol, decimals, iconUri, projectUri],
    );
  }

  /**
   * Mints a specified amount of tokens to a given account address.
   *
   * @param to - The account address to which the tokens will be minted.
   * @param amount - The amount of tokens to mint, represented as a bigint.
   * @param metadataAddress - The account address of the metadata.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async mint(
    to: AccountAddress,
    amount: bigint,
    metadataAddress: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.tokensContract.UnderlyingMintFuncAddr,
      [to, amount.toString(), metadataAddress],
    );
  }

  /**
   * Retrieves the metadata for a given token symbol.
   *
   * @param symbol - The symbol of the token for which metadata is being requested.
   * @returns A promise that resolves to an `AccountAddress` object containing the metadata.
   * @throws Will throw an error if the view method call fails or if the response cannot be parsed.
   */
  public async getMetadataBySymbol(symbol: string): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.UnderlyingGetMetadataBySymbolFuncAddr,
      [symbol],
    );
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  /**
   * Retrieves the token account address.
   *
   * This method calls the `UnderlyingGetTokenAccountAddressFuncAddr` function
   * of the `tokensContract` to get the token account address.
   *
   * @returns {Promise<AccountAddress>} A promise that resolves to an `AccountAddress` object.
   */
  public async getTokenAccountAddress(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.UnderlyingGetTokenAccountAddressFuncAddr,
      [],
    );
    return AccountAddress.fromString(resp as string);
  }

  /**
   * Supplies the underlying tokens for a given metadata address.
   *
   * @param {AccountAddress} metadataAddress - The address of the metadata to supply tokens for.
   * @returns {Promise<bigint>} A promise that resolves to the amount of tokens supplied as a bigint.
   */
  public async supply(metadataAddress: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(this.tokensContract.UnderlyingSupplyFuncAddr, [
        metadataAddress,
      ])
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the maximum value associated with a given metadata address.
   *
   * @param metadataAddress - The address of the account metadata.
   * @returns A promise that resolves to a bigint representing the maximum value, or undefined if not available.
   */
  public async maximum(
    metadataAddress: AccountAddress,
  ): Promise<bigint | undefined> {
    const [resp] = (
      await this.callViewMethod<[{ vec: [string | undefined] }]>(
        this.tokensContract.UnderlyingMaximumFuncAddr,
        [metadataAddress],
      )
    ).map((value) => {
      const unwrappedValue = value.vec[0];
      return unwrappedValue ? mapToBigInt(unwrappedValue) : undefined;
    });
    return resp;
  }

  /**
   * Retrieves the name of the underlying token associated with the given metadata address.
   *
   * @param metadataAddress - The address of the account metadata.
   * @returns A promise that resolves to the name of the underlying token as a string.
   */
  public async name(metadataAddress: AccountAddress): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.UnderlyingNameFuncAddr,
      [metadataAddress],
    );
    return resp as string;
  }

  /**
   * Retrieves the symbol of the underlying token associated with the given metadata address.
   *
   * @param metadataAddress - The address of the account metadata.
   * @returns A promise that resolves to the symbol of the underlying token as a string.
   */
  public async symbol(metadataAddress: AccountAddress): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.UnderlyingSymbolFuncAddr,
      [metadataAddress],
    );
    return resp as string;
  }

  /**
   * Retrieves the number of decimals for a given token's metadata address.
   *
   * @param {AccountAddress} metadataAddress - The address of the token's metadata.
   * @returns {Promise<bigint>} A promise that resolves to the number of decimals as a bigint.
   */
  public async decimals(metadataAddress: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.tokensContract.UnderlyingDecimalsFuncAddr,
        [metadataAddress],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the metadata address for a given coin name by calling a specified Move function.
   *
   * @param funcAddr - The identifier of the Move function to call.
   * @param coinName - The name of the coin for which to retrieve the metadata address.
   * @returns A promise that resolves to the account address containing the metadata.
   */
  public async getMetadataAddress(
    funcAddr: MoveFunctionId,
    coinName: string,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(funcAddr, [coinName]);
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  /**
   * Retrieves the decimal precision of a token.
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

  /**
   * Retrieves the balance of underlying tokens for a given owner and metadata address.
   *
   * @param owner - The account address of the token owner.
   * @param metadataAddress - The account address of the token metadata.
   * @returns A promise that resolves to the balance of underlying tokens as a bigint.
   */
  public async balanceOf(
    owner: AccountAddress,
    metadataAddress: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.tokensContract.UnderlyingBalanceOfFuncAddr,
        [owner, metadataAddress],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the token address for a given symbol.
   *
   * @param symbol - The symbol of the token whose address is to be retrieved.
   * @returns A promise that resolves to the account address of the token.
   */
  public async getTokenAddress(symbol: string): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.UnderlyingTokenAddressFuncAddr,
      [symbol],
    );
    return AccountAddress.fromString(resp as string);
  }
}
