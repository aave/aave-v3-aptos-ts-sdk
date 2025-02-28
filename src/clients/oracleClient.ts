import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
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
 * This class is designed to work with the Aptos blockchain and requires an instance of `AptosProvider` and optionally `Ed25519Account` for signing transactions.
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const oracleClient = new OracleClient(provider);
 * const price = await oracleClient.getAssetPrice(assetAddress);
 * ```
 *
 * @public
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
   * Retrieves the price of a specified asset.
   *
   * @param asset - The address of the asset for which the price is being requested.
   * @returns A promise that resolves to the price of the asset as a bigint.
   */
  public async getAssetPrice(asset: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(this.oracleContract.GetAssetPriceFuncAddr, [
        asset,
      ])
    ).map(mapToBigInt);
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
      (await this.callViewMethod(this.oracleContract.GetAssetsPricesFuncAddr, [
        assets,
      ])) as Array<any>
    ).map((item) => mapToBigInt(item));
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
      this.oracleContract.SetAssetFeedIdFuncAddr,
      [asset, feedId],
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
      this.oracleContract.BatchSetAssetFeedIdsFuncAddr,
      [assets, feedIds],
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
      this.oracleContract.RemoveAssetFeedIdFuncAddr,
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
      this.oracleContract.RemoveAssetFeedIdsFuncAddr,
      [assets],
    );
  }

  /**
   * Retrieves the Oracle Resource Account address.
   *
   * This method calls the view method on the oracle contract to get the Oracle Resource Account address,
   * and then maps the response to an `AccountAddress` object.
   *
   * @returns {Promise<AccountAddress>} A promise that resolves to the `AccountAddress` of the Oracle Resource Account.
   */
  public async getOracleResourceAccount(): Promise<AccountAddress> {
    const [resp] = (
      await this.callViewMethod(
        this.oracleContract.GetOracleResourceAccountFuncAddr,
        [],
      )
    ).map((item) => AccountAddress.fromString(item as string));
    return resp;
  }

  /**
   * Retrieves the oracle address from the oracle contract.
   *
   * @returns {Promise<AccountAddress>} A promise that resolves to the oracle address.
   */
  public async getOracleAddress(): Promise<AccountAddress> {
    const [resp] = (
      await this.callViewMethod(
        this.oracleContract.GetOracleAddressFuncAddr,
        [],
      )
    ).map((item) => AccountAddress.fromString(item as string));
    return resp;
  }
}
