import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { PeripheryContract } from "../contracts/periphery";
import { Metadata } from "../helpers/interfaces";
import { mapToBigInt } from "../helpers/common";

/**
 * Represents the configuration for pulling rewards transfer strategy.
 *
 * @property {AccountAddress} rewardsAdmin - The address of the rewards admin.
 * @property {AccountAddress} incentivesController - The address of the incentives controller.
 * @property {AccountAddress} rewardsVault - The address of the rewards vault.
 */
export type PullRewardsTransferStrategy = {
  rewardsAdmin: AccountAddress;
  incentivesController: AccountAddress;
  rewardsVault: AccountAddress;
};

/**
 * Represents the data for a reward configuration.
 *
 * @property {bigint} index - The current index of the reward.
 * @property {bigint} emissionPerSecond - The emission rate per second.
 * @property {bigint} lastUpdateTimestamp - The timestamp of the last update.
 * @property {bigint} distributionEnd - The timestamp when distribution ends.
 * @property {Map<AccountAddress, UserData>} usersData - Map of user addresses to their reward data.
 */
export type RewardData = {
  index: bigint;
  emissionPerSecond: bigint;
  lastUpdateTimestamp: bigint;
  distributionEnd: bigint;
  usersData: Map<AccountAddress, UserData>;
};

/**
 * Represents the data for a user's rewards.
 *
 * @property {bigint} index - The user's current index.
 * @property {bigint} accrued - The amount of rewards accrued by the user.
 */
export type UserData = {
  index: bigint;
  accrued: bigint;
};

/**
 * Represents the balance information for a user's asset.
 *
 * @property {AccountAddress} asset - The address of the asset.
 * @property {bigint} userBalance - The user's balance of the asset.
 * @property {bigint} totalSupply - The total supply of the asset.
 */
export type UserAssetBalance = {
  asset: AccountAddress;
  userBalance: bigint;
  totalSupply: bigint;
};

/**
 * Represents the data for an asset's rewards configuration.
 *
 * @property {Map<AccountAddress, RewardData>} rewards - Map of reward addresses to their data.
 * @property {Map<bigint, AccountAddress>} availableRewards - Map of reward indices to their addresses.
 * @property {bigint} availableRewardsCount - The number of available rewards.
 * @property {number} decimals - The number of decimals for the asset.
 */
export type AssetData = {
  rewards: Map<AccountAddress, RewardData>;
  availableRewards: Map<bigint, AccountAddress>;
  availableRewardsCount: bigint;
  decimals: number;
};

/**
 * The `RewardsControllerClient` class provides methods to interact with the Rewards Controller contract on the Aptos blockchain.
 * It extends the `AptosContractWrapperBaseClass` and includes functionalities for managing rewards, claiming rewards,
 * and retrieving reward-related data within the AAVE protocol.
 *
 * @remarks
 * This client is designed to work with the Rewards Controller contract and provides a high-level API for reward operations.
 * The client can be instantiated in two ways:
 * 1. Using the constructor directly with a provider and optional signer
 * 2. Using the static buildWithDefaultSigner method which automatically configures the client with the provider's pool profile account
 *
 * @example
 * ```typescript
 * // Using buildWithDefaultSigner
 * const provider = new AptosProvider();
 * const client = RewardsControllerClient.buildWithDefaultSigner(provider);
 *
 * // Using constructor directly
 * const provider = new AptosProvider();
 * const signer = provider.getPoolProfileAccount();
 * const client = new RewardsControllerClient(provider, signer);
 *
 * // Claim rewards for specific assets
 * const tx = await client.claimRewards(
 *   [assetAddress],
 *   1000n,
 *   recipientAddress,
 *   rewardAddress,
 *   rewardsControllerAddress
 * );
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 * @param signer - Optional Ed25519Account signer for transaction signing.
 */
export class RewardsControllerClient extends AptosContractWrapperBaseClass {
  peripheryContract: PeripheryContract;

  /**
   * Creates an instance of RewardsControllerClient.
   *
   * @param provider - The Aptos blockchain provider.
   * @param signer - Optional Ed25519 account signer.
   */
  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.peripheryContract = new PeripheryContract(provider);
  }

  /**
   * Creates an instance of RewardsControllerClient using the default signer from the provided AptosProvider.
   *
   * @param provider - The AptosProvider instance to use for creating the RewardsControllerClient.
   * @returns A new instance of RewardsControllerClient.
   */
  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): RewardsControllerClient {
    const client = new RewardsControllerClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }

  /**
   * Gets the address of the rewards controller
   *
   * @returns The address of the rewards controller
   */
  public async rewardsControllerAddress(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.rewardsControllerAddressFuncAddr,
      [],
    );
    return AccountAddress.fromString(resp as string);
  }

  /**
   * Gets the rewards controller object
   *
   * @returns The rewards controller object
   */
  public async rewardsControllerObject(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.rewardsControllerObjectFuncAddr,
      [],
    );
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  /**
   * Gets the claimer for a user
   *
   * @param user - The user address
   * @param rewardsControllerAddress - The address of the rewards controller
   * @returns The claimer address if one exists
   */
  public async getClaimer(
    user: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.getClaimerFuncAddr,
      [user, rewardsControllerAddress],
    );
    return AccountAddress.fromString(resp as string);
  }

  public async getRewardOracle(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.getRewardOracleFuncAddr,
      [],
    );
    return AccountAddress.fromString(resp as string);
  }

  /**
   * Gets the pull rewards transfer strategy for a reward
   *
   * @param reward - The reward address
   * @param rewardsControllerAddress - The address of the rewards controller
   * @returns The pull rewards transfer strategy if one exists
   */
  public async getPullRewardsTransferStrategy(
    reward: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<PullRewardsTransferStrategy> {
    const resp = await this.callViewMethod(
      this.peripheryContract.getPullRewardsTransferStrategyFuncAddr,
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

  /**
   * Claims rewards for a user
   * @param assets Vector of asset addresses
   * @param amount The amount of rewards to claim
   * @param to The address to which rewards are transferred
   * @param reward The address of the reward
   * @param rewardsControllerAddress The address of the rewards controller
   * @returns The transaction response containing the amount of rewards claimed
   */
  public async claimRewards(
    assets: Array<AccountAddress>,
    amount: bigint,
    to: AccountAddress,
    reward: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.claimRewardsFuncAddr,
      [assets, amount, to, reward, rewardsControllerAddress],
    );
  }

  /**
   * Claims rewards on behalf of a user
   * @param assets Vector of asset addresses
   * @param amount The amount of rewards to claim
   * @param user The address of the user
   * @param to The address to which rewards are transferred
   * @param reward The address of the reward
   * @param rewardsControllerAddress The address of the rewards controller
   * @returns The transaction response containing the amount of rewards claimed
   */
  public async claimRewardsOnBehalf(
    assets: Array<AccountAddress>,
    amount: bigint,
    user: AccountAddress,
    to: AccountAddress,
    reward: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.claimRewardsOnBehalfFuncAddr,
      [assets, amount, user, to, reward, rewardsControllerAddress],
    );
  }

  /**
   * Claims rewards and transfers them to the caller
   * @param assets Vector of asset addresses
   * @param amount The amount of rewards to claim
   * @param reward The address of the reward
   * @param rewardsControllerAddress The address of the rewards controller
   * @returns The transaction response containing the amount of rewards claimed
   */
  public async claimRewardsToSelf(
    assets: Array<AccountAddress>,
    amount: bigint,
    reward: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.claimRewardsToSelfFuncAddr,
      [assets, amount, reward, rewardsControllerAddress],
    );
  }

  /**
   * Claims all rewards for a user
   * @param assets Vector of asset addresses
   * @param to The address to which rewards are transferred
   * @param rewardsControllerAddress The address of the rewards controller
   * @returns The transaction response containing a tuple of reward addresses and their corresponding amounts
   */
  public async claimAllRewards(
    assets: Array<AccountAddress>,
    to: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.claimAllRewardsFuncAddr,
      [assets, to, rewardsControllerAddress],
    );
  }

  /**
   * Claims all rewards on behalf of a user
   * @param assets Vector of asset addresses
   * @param user The address of the user
   * @param to The address to which rewards are transferred
   * @param rewardsControllerAddress The address of the rewards controller
   * @returns The transaction response containing a tuple of reward addresses and their corresponding amounts
   */
  public async claimAllRewardsOnBehalf(
    assets: Array<AccountAddress>,
    user: AccountAddress,
    to: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.claimAllRewardsOnBehalfFuncAddr,
      [assets, user, to, rewardsControllerAddress],
    );
  }

  /**
   * Claims all rewards and transfers them to the caller
   * @param assets Vector of asset addresses
   * @param rewardsControllerAddress The address of the rewards controller
   * @returns The transaction response containing a tuple of reward addresses and their corresponding amounts
   */
  public async claimAllRewardsToSelf(
    assets: Array<AccountAddress>,
    rewardsControllerAddress: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.claimAllRewardsToSelfFuncAddr,
      [assets, rewardsControllerAddress],
    );
  }

  /**
   * Looks up asset data for a specific asset
   *
   * @param asset - The asset address
   * @param rewardsControllerAddress - The address of the rewards controller
   * @returns The asset data if it exists
   */
  public async lookupAssetData(
    reward: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<PullRewardsTransferStrategy> {
    const resp = await this.callViewMethod(
      this.peripheryContract.lookupAssetDataFuncAddr,
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

  /**
   * Looks up rewards data for a specific asset and reward.
   *
   * @param asset - The address of the asset.
   * @param reward - The address of the reward token.
   * @param rewardsControllerAddress - The address of the rewards controller.
   * @returns A promise that resolves to an object containing:
   *          - assetData: Asset configuration data
   *          - rewardData: Reward configuration data
   *          Both fields will be undefined if their respective data doesn't exist.
   */
  public async lookupRewardsData(
    asset: AccountAddress,
    reward: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<{ assetData?: AssetData; rewardData?: RewardData }> {
    const [assetDataRaw, rewardDataRaw] = (await this.callViewMethod(
      this.peripheryContract.lookupRewardsDataFuncAddr,
      [asset, reward, rewardsControllerAddress],
    )) as [any | undefined, any | undefined];

    const assetData = assetDataRaw
      ? {
          rewards: new Map<AccountAddress, RewardData>(),
          availableRewards: new Map<bigint, AccountAddress>(),
          availableRewardsCount: BigInt(assetDataRaw.available_rewards_count),
          decimals: Number(assetDataRaw.decimals),
        }
      : undefined;

    const rewardData = rewardDataRaw
      ? {
          index: BigInt(rewardDataRaw.index),
          emissionPerSecond: BigInt(rewardDataRaw.emission_per_second),
          lastUpdateTimestamp: BigInt(rewardDataRaw.last_update_timestamp),
          distributionEnd: BigInt(rewardDataRaw.distribution_end),
          usersData: new Map<AccountAddress, UserData>(),
        }
      : undefined;

    return { assetData, rewardData };
  }

  /**
   * Retrieves the global reward data for a given asset and reward token from the Rewards Controller contract.
   *
   * @param asset - The address of the asset for which to fetch reward data.
   * @param reward - The address of the reward token.
   * @param rewardsControllerAddress - The address of the rewards controller.
   * @returns A promise that resolves to a `RewardData` object containing the global reward data. The `usersData` field will be an empty map.
   */
  public async getRewardsData(
    asset: AccountAddress,
    reward: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<RewardData> {
    const [index, emissionPerSecond, lastUpdateTimestamp, distributionEnd] = (
      await this.callViewMethod(this.peripheryContract.getRewardsDataFuncAddr, [
        asset,
        reward,
        rewardsControllerAddress,
      ])
    ).map(mapToBigInt);
    return {
      index,
      emissionPerSecond,
      lastUpdateTimestamp,
      distributionEnd,
      usersData: new Map<AccountAddress, UserData>(),
    };
  }

  /**
   * Gets user data for a specific asset, reward, and user.
   *
   * @param asset - The address of the asset.
   * @param reward - The address of the reward token.
   * @param user - The address of the user.
   * @param rewardsControllerAddress - The address of the rewards controller.
   * @returns A promise that resolves to a UserData object containing the user's index and accrued rewards as u256 values.
   *          If no user data exists, returns {index: 0n, accrued: 0n}.
   */
  public async getUserData(
    asset: AccountAddress,
    reward: AccountAddress,
    user: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<UserData> {
    const [index, accrued] = (
      await this.callViewMethod(this.peripheryContract.getUserDataFuncAddr, [
        asset,
        reward,
        user,
        rewardsControllerAddress,
      ])
    ).map(mapToBigInt);
    return { index, accrued };
  }

  /**
   * Gets the asset index for a specific asset and reward.
   *
   * @param asset - The address of the asset.
   * @param reward - The address of the reward token.
   * @param rewardsControllerAddress - The address of the rewards controller.
   * @returns A promise that resolves to a tuple containing the current asset index and new asset index as u256 values.
   *          If no rewards data exists, returns [0, 0].
   */
  public async getAssetIndex(
    asset: AccountAddress,
    reward: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<[bigint, bigint]> {
    const [currentIndex, newIndex] = (
      await this.callViewMethod(this.peripheryContract.getAssetIndexFuncAddr, [
        asset,
        reward,
        rewardsControllerAddress,
      ])
    ).map(mapToBigInt);
    return [currentIndex, newIndex];
  }

  /**
   * Gets the distribution end timestamp for a specific asset and reward.
   *
   * @param asset - The address of the asset.
   * @param reward - The address of the reward token.
   * @param rewardsControllerAddress - The address of the rewards controller.
   * @returns A promise that resolves to the distribution end timestamp as a u256 value.
   */
  public async getDistributionEnd(
    asset: AccountAddress,
    reward: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<bigint> {
    const [distributionEnd] = (
      await this.callViewMethod(
        this.peripheryContract.getDistributionEndFuncAddr,
        [asset, reward, rewardsControllerAddress],
      )
    ).map(mapToBigInt);
    return distributionEnd;
  }

  /**
   * Gets all rewards for a specific asset.
   *
   * @param asset - The address of the asset.
   * @param rewardsControllerAddress - The address of the rewards controller.
   * @returns A promise that resolves to an array of reward token addresses.
   *          If no rewards data exists for the asset, returns an empty array.
   */
  public async getRewardsByAsset(
    asset: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<AccountAddress[]> {
    const rewards = (await this.callViewMethod(
      this.peripheryContract.getRewardsByAssetFuncAddr,
      [asset, rewardsControllerAddress],
    )) as string[];
    return rewards.map((reward) => AccountAddress.fromString(reward));
  }

  /**
   * Gets all available rewards from the rewards controller.
   *
   * @param rewardsControllerAddress - The address of the rewards controller.
   * @returns A promise that resolves to an array of reward token addresses.
   *          If no rewards controller data exists, returns an empty array.
   */
  public async getRewardsList(
    rewardsControllerAddress: AccountAddress,
  ): Promise<AccountAddress[]> {
    const rewards = (await this.callViewMethod(
      this.peripheryContract.getRewardsListFuncAddr,
      [rewardsControllerAddress],
    )) as string[];
    return rewards.map((reward) => AccountAddress.fromString(reward));
  }

  /**
   * Gets the user asset index for a specific user, asset, and reward.
   *
   * @param user - The address of the user.
   * @param asset - The address of the asset.
   * @param reward - The address of the reward token.
   * @param rewardsControllerAddress - The address of the rewards controller.
   * @returns A promise that resolves to the user's asset index as a u256 value.
   */
  public async getUserAssetIndex(
    user: AccountAddress,
    asset: AccountAddress,
    reward: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<bigint> {
    const [index] = (
      await this.callViewMethod(
        this.peripheryContract.getUserAssetIndexFuncAddr,
        [user, asset, reward, rewardsControllerAddress],
      )
    ).map(mapToBigInt);
    return index;
  }

  /**
   * Gets the total accrued rewards for a specific user and reward across all assets.
   *
   * @param user - The address of the user.
   * @param reward - The address of the reward token.
   * @param rewardsControllerAddress - The address of the rewards controller.
   * @returns A promise that resolves to the total accrued rewards as a u256 value.
   *          If no rewards controller data exists, returns 0.
   */
  public async getUserAccruedRewards(
    user: AccountAddress,
    reward: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<bigint> {
    const [totalAccrued] = (
      await this.callViewMethod(
        this.peripheryContract.getUserAccruedRewardsFuncAddr,
        [user, reward, rewardsControllerAddress],
      )
    ).map(mapToBigInt);
    return totalAccrued;
  }

  /**
   * Gets the total rewards for a user across multiple assets for a specific reward token.
   *
   * @param assets - Array of asset addresses to check rewards for.
   * @param user - The address of the user.
   * @param reward - The address of the reward token.
   * @param rewardsControllerAddress - The address of the rewards controller.
   * @returns A promise that resolves to the total rewards as a u256 value.
   */
  public async getUserRewards(
    assets: AccountAddress[],
    user: AccountAddress,
    reward: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<bigint> {
    const [totalRewards] = (
      await this.callViewMethod(this.peripheryContract.getUserRewardsFuncAddr, [
        assets,
        user,
        reward,
        rewardsControllerAddress,
      ])
    ).map(mapToBigInt);
    return totalRewards;
  }

  /**
   * Gets all rewards for a user across multiple assets.
   *
   * @param assets - Array of asset addresses to check rewards for.
   * @param user - The address of the user.
   * @param rewardsControllerAddress - The address of the rewards controller.
   * @returns A promise that resolves to a tuple containing:
   *          - Array of reward token addresses
   *          - Array of corresponding reward amounts as u256 values
   *          If no rewards controller data exists, returns [[], []].
   */
  public async getAllUserRewards(
    assets: AccountAddress[],
    user: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<[AccountAddress[], bigint[]]> {
    const [rewardsList, unclaimedAmounts] = (
      await this.callViewMethod(
        this.peripheryContract.getAllUserRewardsFuncAddr,
        [assets, user, rewardsControllerAddress],
      )
    ).map((item, index) => (index === 0 ? item : mapToBigInt(item))) as [
      string[],
      bigint[],
    ];

    return [
      rewardsList.map((reward) => AccountAddress.fromString(reward)),
      unclaimedAmounts,
    ];
  }

  /**
   * Gets the number of decimals for a specific asset.
   *
   * @param asset - The address of the asset.
   * @param rewardsControllerAddress - The address of the rewards controller.
   * @returns A promise that resolves to the number of decimals as a number.
   */
  public async getAssetDecimals(
    asset: AccountAddress,
    rewardsControllerAddress: AccountAddress,
  ): Promise<number> {
    const [decimals] = (
      await this.callViewMethod(
        this.peripheryContract.getAssetDecimalsFuncAddr,
        [asset, rewardsControllerAddress],
      )
    ).map(mapToBigInt);
    return Number(decimals);
  }
}
