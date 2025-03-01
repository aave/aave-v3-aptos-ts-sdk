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
 * The `ATokensClient` class provides methods to interact with AToken contracts on the Aptos blockchain.
 * It extends the `AptosContractWrapperBaseClass` and includes functionalities for creating tokens,
 * retrieving metadata, and managing token balances.
 *
 * @remarks
 * This client is designed to work with the AToken contracts and provides a high-level API for common operations.
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const client = new ATokensClient(provider);
 * const tokenAddress = await client.createToken(
 *   1000000n,
 *   "MyToken",
 *   "MTK",
 *   18,
 *   "https://example.com/icon.png",
 *   "https://example.com",
 *   "0x1",
 *   "0x2"
 * );
 * ```
 *
 * @public
 */
export class ATokensClient extends AptosContractWrapperBaseClass {
  tokensContract: TokensContract;

  /**
   * Creates an instance of the aTokensClient.
   *
   * @param provider - The AptosProvider instance to interact with the Aptos blockchain.
   * @param signer - Optional Ed25519Account instance used for signing transactions.
   */
  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.tokensContract = new TokensContract(provider);
  }

  /**
   * Creates an instance of ATokensClient using the default signer provided by the AptosProvider.
   *
   * @param provider - The AptosProvider instance to use for creating the ATokensClient.
   * @returns A new instance of ATokensClient configured with the default signer.
   */
  public static buildWithDefaultSigner(provider: AptosProvider): ATokensClient {
    const client = new ATokensClient(
      provider,
      provider.getATokensProfileAccount(),
    );
    return client;
  }

  /**
   * Creates a new token with the specified parameters.
   *
   * @param maximumSupply - The maximum supply of the token.
   * @param name - The name of the token.
   * @param symbol - The symbol of the token.
   * @param decimals - The number of decimal places the token uses.
   * @param iconUri - The URI of the token's icon.
   * @param projectUri - The URI of the project's website or information page.
   * @param underlyingAsset - The account address of the underlying asset.
   * @param treasuryAddress - The account address of the treasury.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async createToken(
    maximumSupply: bigint,
    name: string,
    symbol: string,
    decimals: number,
    iconUri: string,
    projectUri: string,
    underlyingAsset: AccountAddress,
    treasuryAddress: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.tokensContract.ATokenCreateTokenFuncAddr,
      [
        maximumSupply,
        name,
        symbol,
        decimals,
        iconUri,
        projectUri,
        underlyingAsset,
        treasuryAddress,
      ],
    );
  }

  /**
   * Rescues tokens from the contract and sends them to a specified address.
   *
   * @param token - The address of the token to be rescued.
   * @param to - The address to which the rescued tokens will be sent.
   * @param amount - The amount of tokens to be rescued.
   * @returns A promise that resolves to the response of the committed transaction.
   */
  public async rescueTokens(
    token: AccountAddress,
    to: AccountAddress,
    amount: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.tokensContract.ATokenRescueTokensFuncAddr,
      [token, to, amount.toString()],
    );
  }

  /**
   * Retrieves the revision number of the AToken contract.
   *
   * @returns {Promise<number>} A promise that resolves to the revision number of the AToken contract.
   */
  public async getRevision(): Promise<number> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.ATokenGetRevisionFuncAddr,
      [],
    );
    return resp as number;
  }

  /**
   * Retrieves the metadata of an AToken by its symbol for a given account owner.
   *
   * @param owner - The account address of the owner.
   * @param symbol - The symbol of the AToken.
   * @returns A promise that resolves to the account address containing the metadata.
   */
  public async getMetadataBySymbol(
    owner: AccountAddress,
    symbol: string,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.ATokenGetMetadataBySymbolFuncAddr,
      [owner, symbol],
    );
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  /**
   * Retrieves the token account address associated with the given metadata address.
   *
   * @param metadataAddress - The address of the metadata account.
   * @returns A promise that resolves to the token account address.
   */
  public async getTokenAccountAddress(
    metadataAddress: AccountAddress,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.ATokenGetTokenAccountAddressFuncAddr,
      [metadataAddress],
    );
    return AccountAddress.fromString(resp as string);
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
      this.tokensContract.ATokenTokenAddressFuncAddr,
      [owner, symbol],
    );
    return AccountAddress.fromString(resp as string);
  }

  /**
   * Retrieves the metadata of a specific asset for a given owner and symbol.
   *
   * @param owner - The account address of the asset owner.
   * @param symbol - The symbol of the asset.
   * @returns A promise that resolves to the account address containing the asset metadata.
   */
  public async assetMetadata(
    owner: AccountAddress,
    symbol: string,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.ATokenAssetMetadataFuncAddr,
      [owner, symbol],
    );
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  /**
   * Retrieves the reserve treasury address for a given metadata address.
   *
   * @param metadataAddress - The account address of the metadata.
   * @returns A promise that resolves to the account address of the reserve treasury.
   */
  public async getReserveTreasuryAddress(
    metadataAddress: AccountAddress,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.ATokenGetReserveTreasuryAddressFuncAddr,
      [metadataAddress],
    );
    return AccountAddress.fromString(resp as string);
  }

  /**
   * Retrieves the underlying asset address for a given metadata address.
   *
   * @param metadataAddress - The address of the metadata account.
   * @returns A promise that resolves to the underlying asset address.
   */
  public async getUnderlyingAssetAddress(
    metadataAddress: AccountAddress,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.ATokenGetUnderlyingAssetAddressFuncAddr,
      [metadataAddress],
    );
    return AccountAddress.fromString(resp as string);
  }

  /**
   * Retrieves the scaled balance of a specific account for a given token.
   *
   * @param owner - The address of the account whose scaled balance is being queried.
   * @param metadataAddress - The address of the token's metadata.
   * @returns A promise that resolves to the scaled balance of the specified account as a bigint.
   */
  public async scaledBalanceOf(
    owner: AccountAddress,
    metadataAddress: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.tokensContract.ATokenScaledBalanceOfFuncAddr,
        [owner, metadataAddress],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the balance of a specific token for a given account.
   *
   * @param owner - The address of the account whose token balance is being queried.
   * @param metadataAddress - The address of the token's metadata.
   * @returns A promise that resolves to the balance of the token as a bigint.
   */
  public async balanceOf(
    owner: AccountAddress,
    metadataAddress: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(this.tokensContract.ATokenBalanceOfFuncAddr, [
        owner,
        metadataAddress,
      ])
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the scaled total supply of a token.
   *
   * @param metadataAddress - The address of the token's metadata.
   * @returns A promise that resolves to the scaled total supply of the token as a bigint.
   */
  public async scaledTotalSupply(
    metadataAddress: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.tokensContract.ATokenScaledTotalSupplyFuncAddr,
        [metadataAddress],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the total supply of a token given its metadata address.
   *
   * @param {AccountAddress} metadataAddress - The address of the token's metadata.
   * @returns {Promise<bigint>} A promise that resolves to the total supply of the token as a bigint.
   */
  public async totalSupply(metadataAddress: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(this.tokensContract.ATokenTotalSupplyFuncAddr, [
        metadataAddress,
      ])
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the previous index for a given user and metadata address.
   *
   * @param user - The account address of the user.
   * @param metadataAddress - The account address of the metadata.
   * @returns A promise that resolves to the previous index as a bigint.
   */
  public async getPreviousIndex(
    user: AccountAddress,
    metadataAddress: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.tokensContract.ATokenGetGetPreviousIndexFuncAddr,
        [user, metadataAddress],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the scaled user balance and total supply for a given user and token metadata address.
   *
   * @param owner - The account address of the user whose balance is being queried.
   * @param metadataAddress - The account address of the token metadata.
   * @returns A promise that resolves to an object containing the scaled user balance and the total supply.
   */
  public async getScaledUserBalanceAndSupply(
    owner: AccountAddress,
    metadataAddress: AccountAddress,
  ): Promise<{ scaledUserBalance: bigint; supply: bigint }> {
    const [scaledUserBalance, supply] = (
      await this.callViewMethod(
        this.tokensContract.ATokenGetScaledUserBalanceAndSupplyFuncAddr,
        [owner, metadataAddress],
      )
    ).map(mapToBigInt);
    return { scaledUserBalance, supply };
  }

  /**
   * Retrieves the name of the token associated with the given metadata address.
   *
   * @param metadataAddress - The address of the account metadata.
   * @returns A promise that resolves to the name of the token as a string.
   */
  public async name(metadataAddress: AccountAddress): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.ATokenNameFuncAddr,
      [metadataAddress],
    );
    return resp as string;
  }

  /**
   * Retrieves the symbol of the AToken associated with the given metadata address.
   *
   * @param metadataAddress - The address of the account metadata.
   * @returns A promise that resolves to the symbol of the AToken as a string.
   */
  public async symbol(metadataAddress: AccountAddress): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.ATokenSymbolFuncAddr,
      [metadataAddress],
    );
    return resp as string;
  }

  /**
   * Retrieves the number of decimals for a given token.
   *
   * @param metadataAddress - The address of the token metadata.
   * @returns A promise that resolves to the number of decimals as a bigint.
   */
  public async decimals(metadataAddress: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(this.tokensContract.ATokenDecimalsFuncAddr, [
        metadataAddress,
      ])
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the metadata address for a given coin.
   *
   * @param funcAddr - The Move function identifier to call.
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
   * @param metadataAddr - The account address containing the token metadata.
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
