import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
  MoveOptionType,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { OracleContract } from "../contracts/oracle";
import { AptosProvider } from "./aptosProvider";
import { mapToBigInt } from "../helpers/common";

/**
 * The `OracleClient` class provides methods to interact with the oracle contract on the Aptos blockchain.
 * It extends the `AptosContractWrapperBaseClass` and includes functionalities to retrieve and set asset prices,
 * manage feed IDs, and obtain oracle-related addresses.
 *
 * @remarks
 * This client is designed to work with the oracle contracts and provides a high-level API for price feed
 * operations. The client can be instantiated in two ways:
 * 1. Using the constructor directly with a provider and optional signer
 * 2. Using the static buildWithDefaultSigner method which automatically configures the client with the provider's oracle profile account
 *
 * @example
 * ```typescript
 * // Using buildWithDefaultSigner
 * const provider = new AptosProvider();
 * const client = OracleClient.buildWithDefaultSigner(provider);
 *
 * // Using constructor directly
 * const provider = new AptosProvider();
 * const signer = provider.getOracleProfileAccount();
 * const client = new OracleClient(provider, signer);
 *
 * // Get asset price
 * const price = await client.getAssetPrice(assetAddress);
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 * @param signer - Optional Ed25519Account signer for transaction signing.
 */
export class OracleClient extends AptosContractWrapperBaseClass {
  oracleContract: OracleContract;

  /**
   * Creates an instance of OracleClient.
   *
   * @param provider - The Aptos blockchain provider.
   * @param signer - Optional Ed25519 account signer.
   */
  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.oracleContract = new OracleContract(provider);
  }

  /**
   * Creates an instance of OracleClient using the default signer from the provided AptosProvider.
   *
   * @param provider - The AptosProvider instance to use for creating the OracleClient.
   * @returns A new instance of OracleClient.
   */
  public static buildWithDefaultSigner(provider: AptosProvider): OracleClient {
    const client = new OracleClient(
      provider,
      provider.getOracleProfileAccount(),
    );
    return client;
  }

  /**
   * Returns if an asset price is capped or not.
   *
   * @param asset - The address of the asset for which we are checking if there is a cap.
   * @returns A promise that resolves to a boolean.
   */
  public async isAssetPriceCapped(asset: AccountAddress): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.oracleContract.isAssetPriceCappedFuncAddr,
      [asset],
    );
    return resp as boolean;
  }

  /**
   * Retrieves the price of a specified asset.
   *
   * @param asset - The address of the asset for which the price is being requested.
   * @returns A promise that resolves to the price of the asset as a bigint.
   */
  public async getAssetPrice(asset: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(this.oracleContract.getAssetPriceFuncAddr, [
        asset,
      ])
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the price cap of a specified asset.
   *
   * @param asset - The address of the asset for which the price cap is being requested.
   * @returns A promise that resolves to the price cap of the asset as a bigint.
   */
  public async getPriceCap(asset: AccountAddress): Promise<MoveOptionType> {
    const [resp] = await this.callViewMethod(
      this.oracleContract.getPriceCapFuncAddr,
      [asset],
    );
    return resp;
  }

  /**
   * Retrieves the prices of the specified assets.
   *
   * @param assets - An array of account addresses representing the assets.
   * @returns A promise that resolves to an array of bigints, each representing the price of an asset.
   */
  public async getAssetsPrices(
    assets: Array<AccountAddress>,
  ): Promise<Array<bigint>> {
    return (
      (await this.callViewMethod(this.oracleContract.getAssetsPricesFuncAddr, [
        assets,
      ])) as Array<any>
    ).map((item) => mapToBigInt(item));
  }

  /**
   * Retrieves the oracle address from the oracle contract.
   *
   * @returns {Promise<AccountAddress>} A promise that resolves to the oracle address.
   */
  public async getOracleAddress(): Promise<AccountAddress> {
    const [resp] = (
      await this.callViewMethod(
        this.oracleContract.getOracleAddressFuncAddr,
        [],
      )
    ).map((item) => AccountAddress.fromString(item as string));
    return resp;
  }

  /**
   * Retrieves the oracle asset price decimals.
   *
   * @returns {Promise<AccountAddress>} A promise that resolves to the asset price decimals of the oracle.
   */
  public async getAssetPriceDecimals(): Promise<number> {
    const [resp] = await this.callViewMethod(
      this.oracleContract.getAssetPriceDecimalsFuncAddr,
      [],
    );
    return resp as number;
  }

  /**
   * Sets a price cap stable adapter for a given asset.
   *
   * @param asset - The account address of the asset for which the stable price adapter is being set.
   * @param priceCap - The price cap.
   * @returns A promise that resolves to a CommittedTransactionResponse once the transaction is committed.
   */
  public async setPriceCapStableAdapter(
    asset: AccountAddress,
    priceCap: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.oracleContract.setPriceCapStableAdapter,
      [asset, priceCap],
    );
  }

  /**
   * Removes a price cap stable adapter for a given asset.
   *
   * @param asset - The account address of the asset for which the stable price adapter is being remved.
   * @returns A promise that resolves to a CommittedTransactionResponse once the transaction is committed.
   */
  public async removePriceCapStableAdapter(
    asset: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.oracleContract.removePriceCapStableAdapter,
      [asset],
    );
  }

  /**
   * Sets the feed ID for a given asset in the oracle contract.
   *
   * @param asset - The account address of the asset for which the feed ID is being set.
   * @param feedId - The feed ID to be associated with the asset, represented as a Uint8Array.
   * @returns A promise that resolves to a CommittedTransactionResponse once the transaction is committed.
   */
  public async setAssetFeedId(
    asset: AccountAddress,
    feedId: Uint8Array,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.oracleContract.setAssetFeedIdFuncAddr,
      [asset, feedId],
    );
  }

  /**
   * Sets a custom price for a given asset.
   *
   * @param asset - The account address of the asset for which the feed ID is being set.
   * @param customPrice - The custom price of the asset.
   * @returns A promise that resolves to a CommittedTransactionResponse once the transaction is committed.
   */
  public async setAssetCustomPrice(
    asset: AccountAddress,
    customPrice: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.oracleContract.setAssetCustomPriceFuncAddr,
      [asset, customPrice],
    );
  }

  /**
   * Sets the feed IDs for a batch of assets in the oracle contract.
   *
   * @param assets - An array of account addresses representing the assets.
   * @param feedIds - An array of Uint8Array representing the feed IDs for the assets.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async batchSetAssetFeedIds(
    assets: Array<AccountAddress>,
    feedIds: Array<Uint8Array>,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.oracleContract.batchSetAssetFeedIdsFuncAddr,
      [assets, feedIds],
    );
  }

  /**
   * Sets the custom prices for a batch of assets in the oracle contract.
   *
   * @param assets - An array of account addresses representing the assets.
   * @param customPrices - An array of bigints representing the custom prices of the assets.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async batchSetAssetCustomPrices(
    assets: Array<AccountAddress>,
    customPrices: Array<bigint>,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.oracleContract.batchSetAssetCustomPricesFuncAddr,
      [assets, customPrices],
    );
  }

  /**
   * Removes the feed ID associated with a given asset.
   *
   * @param asset - The address of the asset for which the feed ID should be removed.
   * @returns A promise that resolves to the response of the committed transaction.
   */
  public async removeAssetFeedId(
    asset: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.oracleContract.removeAssetFeedIdFuncAddr,
      [asset],
    );
  }

  /**
   * Removes the feed IDs for a batch of assets from the oracle contract.
   *
   * @param assets - An array of account addresses representing the assets whose feed IDs are to be removed.
   * @returns A promise that resolves to a `CommittedTransactionResponse` indicating the result of the transaction.
   */
  public async batchRemoveAssetFeedIds(
    assets: Array<AccountAddress>,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.oracleContract.removeAssetFeedIdsFuncAddr,
      [assets],
    );
  }

  /**
   * Removes the custom price associated with a given asset.
   *
   * @param asset - The address of the asset for which the custom price should be removed.
   * @returns A promise that resolves to the response of the committed transaction.
   */
  public async removeAssetCustomPrice(
    asset: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.oracleContract.removeAssetCustomPriceFuncAddr,
      [asset],
    );
  }

  /**
   * Removes the custom prices for a batch of assets from the oracle contract.
   *
   * @param assets - An array of account addresses representing the assets whose custom prices are to be removed.
   * @returns A promise that resolves to a `CommittedTransactionResponse` indicating the result of the transaction.
   */
  public async batchRemoveAssetCustomPrices(
    assets: Array<AccountAddress>,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.oracleContract.batchRemoveAssetCustomPricesFuncAddr,
      [assets],
    );
  }
}
