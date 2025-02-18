import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { OracleContract } from "../contracts/oracle";
import { AptosProvider } from "./aptosProvider";
import { mapToBigInt } from "../helpers/common";

export class OracleClient extends AptosContractWrapperBaseClass {
  oracleContract: OracleContract;

  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.oracleContract = new OracleContract(provider);
  }

  public static buildWithDefaultSigner(provider: AptosProvider): OracleClient {
    const client = new OracleClient(
      provider,
      provider.getOracleProfileAccount(),
    );
    return client;
  }

  public async getAssetPrice(asset: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(this.oracleContract.GetAssetPriceFuncAddr, [
        asset,
      ])
    ).map(mapToBigInt);
    return resp;
  }

  public async getAssetsPrices(
    assets: Array<AccountAddress>,
  ): Promise<Array<bigint>> {
    return (
      (await this.callViewMethod(this.oracleContract.GetAssetsPricesFuncAddr, [
        assets,
      ])) as Array<any>
    ).map((item) => mapToBigInt(item));
  }

  public async setAssetFeedId(
    asset: AccountAddress,
    feedId: Uint8Array,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.oracleContract.SetAssetFeedIdFuncAddr,
      [asset, feedId],
    );
  }

  public async batchSetAssetFeedIds(
    assets: Array<AccountAddress>,
    feedIds: Array<Uint8Array>,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.oracleContract.BatchSetAssetFeedIdsFuncAddr,
      [assets, feedIds],
    );
  }

  public async removeAssetFeedId(
    asset: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.oracleContract.RemoveAssetFeedIdFuncAddr,
      [asset],
    );
  }

  public async batchRemoveAssetFeedIds(
    assets: Array<AccountAddress>,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.oracleContract.RemoveAssetFeedIdsFuncAddr,
      [assets],
    );
  }

  public async getOracleResourceAccount(): Promise<AccountAddress> {
    const [resp] = (
      await this.callViewMethod(
        this.oracleContract.GetOracleResourceAccountFuncAddr,
        [],
      )
    ).map((item) => AccountAddress.fromString(item as string));
    return resp;
  }

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
