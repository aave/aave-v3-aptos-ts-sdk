import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { PeripheryContract } from "../contracts/periphery";
import { Metadata } from "../helpers/interfaces";

export class AdminConrolledEcosystemReserveClient extends AptosContractWrapperBaseClass {
  peripheryContract: PeripheryContract;

  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.peripheryContract = new PeripheryContract(provider);
  }

  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): AdminConrolledEcosystemReserveClient {
    const client = new AdminConrolledEcosystemReserveClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }

  public async checkIsFundsAdmin(): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.CheckIsFundsAdmin,
      [],
    );
    return resp as boolean;
  }

  public async getRevision(): Promise<number> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.GetRevision,
      [],
    );
    return resp as number;
  }

  public async getFundsAdmin(): Promise<AccountAddress> {
    const [resp] = (
      await this.callViewMethod(this.peripheryContract.GetFundsAdmin, [])
    ).map((item) => AccountAddress.fromString(item as string));
    return resp;
  }

  public async adminControlledEcosystemReserveAddress(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.AdminControlledEcosystemReserveAddress,
      [],
    );
    return AccountAddress.fromString(resp as string);
  }

  public async adminControlledEcosystemReserveObject(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.AdminControlledEcosystemReserveObject,
      [],
    );
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  public async transferOut(
    assetMetadata: AccountAddress,
    receiver: AccountAddress,
    amount: BigInt,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(this.peripheryContract.TransferOut, [
      assetMetadata,
      receiver,
      amount.toString(),
    ]);
  }
}
