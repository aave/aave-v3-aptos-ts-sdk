import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
  MoveVector,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { PeripheryContract } from "../contracts/periphery";
import { Metadata } from "../helpers/interfaces";

export type PullRewardsTransferStrategy = {
  rewardsAdmin: AccountAddress;
  incentivesController: AccountAddress;
  rewardsVault: AccountAddress;
};

export type RewardsConfigInput = {
  emissionPerSecond: bigint;
  totalSupply: bigint;
  distributionEnd: bigint;
  asset: AccountAddress;
  reward: AccountAddress;
  pullRewardsTransferStrategy: AccountAddress;
};

export class EmissionManagerClient extends AptosContractWrapperBaseClass {
  peripheryContract: PeripheryContract;

  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.peripheryContract = new PeripheryContract(provider);
  }

  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): EmissionManagerClient {
    const client = new EmissionManagerClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }

  public async emissionManagerAddress(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.EmissionManagerAddress,
      [],
    );
    return AccountAddress.fromString(resp as string);
  }

  public async emissionManagerObject(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.EmissionManagerObject,
      [],
    );
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  // FIXME
  // public async configureAssets(config: Array<RewardsConfigInput>): Promise<CommittedTransactionResponse> {
  //   return this.sendTxAndAwaitResponse(
  //     this.peripheryContract.ConfigureAssets,
  //     [MoveVector.],
  //   );
  // }

  public async setPullRewardsTransferStrategy(
    reward: AccountAddress,
    pullRewardsTransferStrategy: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.SetPullRewardsTransferStrategy,
      [reward, pullRewardsTransferStrategy],
    );
  }

  public async setDistributionEnd(
    asset: AccountAddress,
    reward: AccountAddress,
    newDistributionEnd: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.SetDistributionEnd,
      [asset, reward, newDistributionEnd],
    );
  }

  public async setEmissionPerSecond(
    asset: AccountAddress,
    rewards: Array<AccountAddress>,
    newEmissionsPerSecond: Array<bigint>,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.SetDistributionEnd,
      [asset, rewards, newEmissionsPerSecond],
    );
  }

  public async setClaimer(
    user: AccountAddress,
    claimer: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(this.peripheryContract.SetClaimer, [
      user,
      claimer,
    ]);
  }

  public async setAdmissionAdmin(
    reward: AccountAddress,
    newAdmin: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.SetEmissionAdmin,
      [reward, newAdmin],
    );
  }

  public async setRewardsConroller(
    rewardsController?: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.SetRewardsController,
      [rewardsController],
    );
  }

  public async getEmissionAdmin(
    reward: AccountAddress,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.GetEmissionAdmin,
      [reward],
    );
    return AccountAddress.fromString(resp as string);
  }
}
