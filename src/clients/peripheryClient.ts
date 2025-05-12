import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
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

export class PeripheryClient extends AptosContractWrapperBaseClass {
  peripheryContract: PeripheryContract;

  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.peripheryContract = new PeripheryContract(provider);
  }

  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): PeripheryClient {
    const client = new PeripheryClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }

  //===================

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
  // public async configureAssets(
  //   config: Array<RewardsConfigInput>,
  // ): Promise<CommittedTransactionResponse> {
  //   return this.sendTxAndAwaitResponse(this.peripheryContract.ConfigureAssets, [
  //     config,
  //   ]);
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
    rewards_controller?: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.SetRewardsController,
      [rewards_controller],
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

  // rewards controller
  public async rewardsControllerAddress(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.RewardsControllerAddress,
      [],
    );
    return AccountAddress.fromString(resp as string);
  }

  public async rewardsControllerObject(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.RewardsControllerObject,
      [],
    );
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  public async getClaimer(
    user: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.GetClaimer,
      [user, rewardsControllerAddress],
    );
    return AccountAddress.fromString(resp as string);
  }

  public async getRewardOracle(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.GetRewardOracle,
      [],
    );
    return AccountAddress.fromString(resp as string);
  }

  // FIX ME
  public async getPullRewardsTransferStrategy(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.GetPullRewardsTransferStrategy,
      [],
    );
    return AccountAddress.fromString(resp as string);
  }
}
