import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { Metadata } from "../helpers/interfaces";
import { AptosProvider } from "./aptosProvider";
import { TokensContract } from "../contracts/tokens";
import { mapToBigInt } from "../helpers/common";

/**
 * The `UnderlyingTokensClient` class provides methods to interact with underlying tokens on the Aptos blockchain.
 * It extends the `AptosContractWrapperBaseClass` and includes functionalities for creating, minting, burning,
 * and managing underlying tokens within the AAVE protocol.
 *
 * @remarks
 * This client is designed to work with the underlying token contracts and provides a high-level API for token operations.
 * The client can be instantiated in two ways:
 * 1. Using the constructor directly with a provider and optional signer
 * 2. Using the static buildWithDefaultSigner method which automatically configures the client with the provider's pool profile account
 *
 * @example
 * ```typescript
 * // Using buildWithDefaultSigner
 * const provider = new AptosProvider();
 * const client = UnderlyingTokensClient.buildWithDefaultSigner(provider);
 *
 * // Using constructor directly
 * const provider = new AptosProvider();
 * const signer = provider.getPoolProfileAccount();
 * const client = new UnderlyingTokensClient(provider, signer);
 *
 * // Create a new token
 * const tx = await client.createToken(
 *   1000000n,  // maximumSupply
 *   "My Token", // name
 *   "MTK",     // symbol
 *   8,         // decimals
 *   "https://example.com/icon.png",  // iconUri
 *   "https://example.com"            // projectUri
 * );
 *
 * // Mint tokens to an address
 * const metadataAddress = await client.getMetadataBySymbol("MTK");
 * const tx = await client.mint(userAddress, 1000n, metadataAddress);
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 * @param signer - Optional Ed25519Account signer for transaction signing.
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
      this.tokensContract.underlyingCreateTokenFuncAddr,
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
      this.tokensContract.underlyingMintFuncAddr,
      [to, amount.toString(), metadataAddress],
    );
  }

  /**
   * Burns a specified amount of tokens to a given account address.
   *
   * @param from - The account address to which the tokens will be burned.
   * @param amount - The amount of tokens to burn, represented as a bigint.
   * @param metadataAddress - The account address of the metadata.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async burn(
    from: AccountAddress,
    amount: bigint,
    metadataAddress: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.tokensContract.underlyingBurnFuncAddr,
      [from, amount.toString(), metadataAddress],
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
      this.tokensContract.underlyingGetMetadataBySymbolFuncAddr,
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
      this.tokensContract.underlyingGetTokenAccountAddressFuncAddr,
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
      await this.callViewMethod(this.tokensContract.underlyingSupplyFuncAddr, [
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
        this.tokensContract.underlyingMaximumFuncAddr,
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
      this.tokensContract.underlyingNameFuncAddr,
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
      this.tokensContract.underlyingSymbolFuncAddr,
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
        this.tokensContract.underlyingDecimalsFuncAddr,
        [metadataAddress],
      )
    ).map(mapToBigInt);
    return resp;
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
        this.tokensContract.underlyingBalanceOfFuncAddr,
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
  public async tokenAddress(symbol: string): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.underlyingTokenAddressFuncAddr,
      [symbol],
    );
    return AccountAddress.fromString(resp as string);
  }
}
