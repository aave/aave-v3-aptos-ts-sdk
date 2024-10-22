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
    super(provider, signer || provider.getOracleProfileAccount());
    this.oracleContract = new OracleContract(provider);
  }

  public async setAssetPrice(
    asset: AccountAddress,
    price: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.oracleContract.SetAssetPriceFuncAddr,
      [asset, price.toString()],
    );
  }

  public async getAssetPrice(asset: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(this.oracleContract.GetAssetPriceFuncAddr, [
        asset,
      ])
    ).map(mapToBigInt);
    return resp;
  }

  public async isBorrowAllowed(): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.oracleContract.IsBorrowAllowedFuncAddr,
      [],
    );
    return resp as boolean;
  }

  public async isLiquidationAllowed(): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.oracleContract.IsLiquidationAllowedFuncAddr,
      [],
    );
    return resp as boolean;
  }

  public async setGracePeriod(
    newGracePeriod: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.oracleContract.SetGracePeriodFuncAddr,
      [newGracePeriod.toString()],
    );
  }

  public async getGracePeriod(): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(this.oracleContract.GetGracePeriodFuncAddr, [])
    ).map(mapToBigInt);
    return resp;
  }
}
