import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
  MoveOption,
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

export type RewardData = {
  index: bigint;
  emissionPerSecond: bigint;
  lastUpdateTimestamp: bigint;
  distributionEnd: bigint;
  usersData: Map<AccountAddress, UserData>;
};

export type UserData = {
  index: bigint;
  accrued: bigint;
};

export type UserAssetBalance = {
  asset: AccountAddress;
  userBalance: bigint;
  totalSupply: bigint;
};

export type AssetData = {
  rewards: Map<AccountAddress, RewardData>;
  availableRewards: Map<bigint, AccountAddress>;
  availableRewardsCount: bigint;
  decimals: number;
};

export class RewardsControllerClient extends AptosContractWrapperBaseClass {
  peripheryContract: PeripheryContract;

  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.peripheryContract = new PeripheryContract(provider);
  }

  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): RewardsControllerClient {
    const client = new RewardsControllerClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }

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

  public async getPullRewardsTransferStrategy(
    reward: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<PullRewardsTransferStrategy> {
    const resp = await this.callViewMethod(
      this.peripheryContract.GetPullRewardsTransferStrategy,
      [reward, rewardsControllerAddress],
    );
    const respRaw = resp.at(0) as any;
    return {
      rewardsAdmin: AccountAddress.fromString(respRaw.rewards_admin),
      incentivesController: AccountAddress.fromString(
        respRaw.incentives_controller,
      ),
    } as PullRewardsTransferStrategy;
  }

  public async claimRewards(
    assets: Array<AccountAddress>,
    amount: bigint,
    to: AccountAddress,
    reward: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.SetPullRewardsTransferStrategy,
      [assets, amount, to, reward, rewardsControllerAddress],
    );
  }

  public async claimRewardsOnBehalf(
    assets: Array<AccountAddress>,
    amount: bigint,
    user: AccountAddress,
    to: AccountAddress,
    reward: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.ClaimAllRewardsOnBehalf,
      [assets, amount, user, to, reward, rewardsControllerAddress],
    );
  }

  public async claimRewardsToSelf(
    assets: Array<AccountAddress>,
    amount: bigint,
    reward: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.ClaimRewardsToSelf,
      [assets, amount, reward, rewardsControllerAddress],
    );
  }

  public async claimAllRewards(
    assets: Array<AccountAddress>,
    to: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.ClaimRewardsToSelf,
      [assets, to, rewardsControllerAddress],
    );
  }

  public async claimAllRewardsOnBehalf(
    assets: Array<AccountAddress>,
    user: AccountAddress,
    to: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.ClaimAllRewardsOnBehalf,
      [assets, user, to, rewardsControllerAddress],
    );
  }

  public async claimAllRewardsToSelf(
    assets: Array<AccountAddress>,
    rewardsControllerAddress: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.ClaimAllRewardsToSelf,
      [assets, rewardsControllerAddress],
    );
  }

  public async lookupAssetData(
    reward: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<PullRewardsTransferStrategy> {
    const resp = await this.callViewMethod(
      this.peripheryContract.LookupAssetData,
      [reward, rewardsControllerAddress],
    );
    const respRaw = resp.at(0) as any;
    return {
      rewardsAdmin: AccountAddress.fromString(respRaw.rewards_admin),
      incentivesController: AccountAddress.fromString(
        respRaw.incentives_controller,
      ),
    } as PullRewardsTransferStrategy;
  }

  // public async lookupRewardsData(asset: AccountAddress, reward: AccountAddress, rewardsControllerAddress: AccountAddress): Promise<{assetData: AssetData, rewardData: RewardData}> {
  //   const resp = await this.callViewMethod(
  //     this.peripheryContract.LookupAssetData,
  //     [asset, reward, rewardsControllerAddress],
  //   );
  //   const assetDataRaw = resp.at(0) as any;
  //   const rewardDataRaw = resp.at(1) as any;
  //   const assetData = {
  //     rewards: AccountAddress.fromString(assetDataRaw.rewards_admin),
  //     availableRewards: AccountAddress.fromString(assetDataRaw.incentives_controller),
  //     availableRewardsCount: AccountAddress.fromString(assetDataRaw.incentives_controller),
  //     decimals: assetDataRaw.decimals as number,
  //   } as AssetData;

  //   const rewardData = {
  //     index: AccountAddress.fromString(rewardDataRaw.index),
  //     emissionPerSecond: AccountAddress.fromString(rewardDataRaw.emission_per_second),
  //     distributionEnd: ,
  //     lastUpdateTimestamp: ,
  //     usersData: ,
  //   } as RewardData;

  //   return {
  //     assetData,
  //     rewardData
  //   }
  // }
}
