import { AccountAddress, Ed25519Account } from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { UiIncentiveDataProviderContract } from "../contracts/uiIncentiveDataProvider";
import { Metadata } from "../helpers/interfaces";

export type AggregatedReserveIncentiveData = {
  underlyingAsset: AccountAddress;
  aIncentiveData: IncentiveData;
  vIncentiveData: IncentiveData;
};

export type IncentiveData = {
  tokenAddress: AccountAddress;
  incentiveControllerAddress: AccountAddress;
  rewardsTokenInformation: [RewardInfo];
};

export type RewardInfo = {
  rewardTokenSymbol: string;
  rewardTokenAddress: AccountAddress;
  rewardOracleAddress: AccountAddress;
  emissionPerSecond: bigint;
  incentivesLastUpdateTimestamp: bigint;
  tokenIncentivesIndex: bigint;
  emissionEndTimestamp: bigint;
  rewardPriceFeed: bigint;
  rewardTokenDecimals: number;
  precision: number;
  priceFeedDecimals: number;
};

export type UserReserveIncentiveData = {
  underlyingAsset: AccountAddress;
  aTokenIncentivesUserData: UserIncentiveData;
  vTokenIncentivesUserData: UserIncentiveData;
};

export type UserIncentiveData = {
  tokenAddress: AccountAddress;
  incentiveControllerAddress: AccountAddress;
  userRewardsInformation: [UserRewardInfo];
};

export type UserRewardInfo = {
  rewardTokenSymbol: string;
  rewardOracleAddress: AccountAddress;
  rewardTokenAddress: AccountAddress;
  userUnclaimedRewards: bigint;
  tokenIncentivesUserIndex: bigint;
  rewardPriceFeed: bigint;
  priceFeedDecimals: number;
  rewardTokenDecimals: number;
};

const mapIncentiveData = (rewardTokenInfo: any): RewardInfo =>
  ({
    rewardTokenSymbol: rewardTokenInfo.reward_token_symbol as string,
    rewardTokenAddress: AccountAddress.fromString(
      rewardTokenInfo.reward_token_address.toString(),
    ),
    rewardOracleAddress: AccountAddress.fromString(
      rewardTokenInfo.reward_oracle_address.toString(),
    ),
    emissionPerSecond: BigInt(rewardTokenInfo.emission_per_second),
    incentivesLastUpdateTimestamp: BigInt(
      rewardTokenInfo.incentives_last_update_timestamp,
    ),
    tokenIncentivesIndex: BigInt(rewardTokenInfo.token_incentives_index),
    emissionEndTimestamp: BigInt(rewardTokenInfo.emission_end_timestamp),
    rewardPriceFeed: BigInt(rewardTokenInfo.reward_price_feed),
    rewardTokenDecimals: rewardTokenInfo.reward_token_decimals as number,
    precision: rewardTokenInfo.precision as number,
    priceFeedDecimals: rewardTokenInfo.price_feed_decimals as number,
  }) as RewardInfo;

const mapUserIncentiveData = (rewardTokenInfo: any): UserRewardInfo =>
  ({
    rewardTokenSymbol: rewardTokenInfo.reward_token_symbol as string,
    rewardOracleAddress: AccountAddress.fromString(
      rewardTokenInfo.reward_oracle_address.toString(),
    ),
    rewardTokenAddress: AccountAddress.fromString(
      rewardTokenInfo.reward_token_address.toString(),
    ),
    userUnclaimedRewards: BigInt(rewardTokenInfo.user_unclaimed_rewards),
    tokenIncentivesUserIndex: BigInt(
      rewardTokenInfo.token_incentives_user_index,
    ),
    rewardPriceFeed: BigInt(rewardTokenInfo.reward_price_feed),
    priceFeedDecimals: rewardTokenInfo.price_feed_decimals as number,
    rewardTokenDecimals: rewardTokenInfo.reward_token_decimals as number,
  }) as UserRewardInfo;

const getUserReservesIncentivesDataInternal = (
  userReservesIncentivesDataRaw: Array<any>,
): [UserReserveIncentiveData] => {
  const userReservesIncentives = userReservesIncentivesDataRaw.map((item) => {
    const aIncentiveUserData = item.a_token_incentives_user_data;
    const aRewardsTokenInformation =
      aIncentiveUserData.user_rewards_information as Array<any>;
    const vIncentiveUserData = item.v_token_incentives_user_data;
    const vRewardsTokenInformation =
      vIncentiveUserData.user_rewards_information as Array<any>;

    return {
      underlyingAsset: AccountAddress.fromString(
        item.underlying_asset.toString(),
      ),
      aTokenIncentivesUserData: {
        tokenAddress: AccountAddress.fromString(
          aIncentiveUserData.token_address.toString(),
        ),
        incentiveControllerAddress: AccountAddress.fromString(
          aIncentiveUserData.incentive_controller_address.toString(),
        ),
        userRewardsInformation:
          aRewardsTokenInformation.map(mapUserIncentiveData),
      } as UserIncentiveData,
      vTokenIncentivesUserData: {
        tokenAddress: AccountAddress.fromString(
          vIncentiveUserData.token_address.toString(),
        ),
        incentiveControllerAddress: AccountAddress.fromString(
          vIncentiveUserData.incentive_controller_address.toString(),
        ),
        userRewardsInformation:
          vRewardsTokenInformation.map(mapUserIncentiveData),
      } as UserIncentiveData,
    } as UserReserveIncentiveData;
  });

  return userReservesIncentives as [UserReserveIncentiveData];
};

const getReservesIncentivesDataInternal = (
  aggregatedIncentivesReserveDataRaw: Array<any>,
): [AggregatedReserveIncentiveData] => {
  const reservesIncentivesData = aggregatedIncentivesReserveDataRaw.map(
    (item) => {
      const aIncentiveData = item.a_incentive_data;
      const aRewardsTokenInformation =
        aIncentiveData.rewards_token_information as Array<any>;
      const vIncentiveData = item.v_incentive_data;
      const vRewardsTokenInformation =
        vIncentiveData.rewards_token_information as Array<any>;
      return {
        underlyingAsset: AccountAddress.fromString(
          item.underlying_asset.toString(),
        ),
        aIncentiveData: {
          tokenAddress: AccountAddress.fromString(
            aIncentiveData.token_address.toString(),
          ),
          incentiveControllerAddress: AccountAddress.fromString(
            aIncentiveData.incentive_controller_address.toString(),
          ),
          rewardsTokenInformation:
            aRewardsTokenInformation.map(mapIncentiveData),
        } as IncentiveData,
        vIncentiveData: {
          tokenAddress: AccountAddress.fromString(
            vIncentiveData.token_address.toString(),
          ),
          incentiveControllerAddress: AccountAddress.fromString(
            vIncentiveData.incentive_controller_address.toString(),
          ),
          rewardsTokenInformation:
            vRewardsTokenInformation.map(mapIncentiveData),
        } as IncentiveData,
      } as AggregatedReserveIncentiveData;
    },
  );

  return reservesIncentivesData as [AggregatedReserveIncentiveData];
};

export class UiIncentiveDataProviderClient extends AptosContractWrapperBaseClass {
  uiPoolDataProviderContract: UiIncentiveDataProviderContract;

  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.uiPoolDataProviderContract = new UiIncentiveDataProviderContract(
      provider,
    );
  }

  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): UiIncentiveDataProviderClient {
    const client = new UiIncentiveDataProviderClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }

  public async uiPoolDataProviderV3DataAddress(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.uiPoolDataProviderContract.uiIncentiveDataProviderV3DataAddress,
      [],
    );
    return AccountAddress.fromString(resp as string);
  }

  public async uiPoolDataProviderV3DataObject(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.uiPoolDataProviderContract.uiIncentiveDataProviderV3DataObject,
      [],
    );
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  public async getFullReservesIncentiveData(): Promise<{
    aggregatedReservesIncentivesData: [AggregatedReserveIncentiveData];
    userReserveIncentiveData: [UserReserveIncentiveData];
  }> {
    const resp = await this.callViewMethod(
      this.uiPoolDataProviderContract.getFullReservesIncentiveData,
      [],
    );

    const reservesIncentivesDataInternal = resp.at(0) as Array<any>;
    const aggregatedReservesIncentivesData = getReservesIncentivesDataInternal(
      reservesIncentivesDataInternal,
    );

    const userReservesIncentivesDataRaw = resp.at(1) as Array<any>;
    const userReserveIncentiveData = getUserReservesIncentivesDataInternal(
      userReservesIncentivesDataRaw,
    );

    return { aggregatedReservesIncentivesData, userReserveIncentiveData };
  }

  public async getReservesIncentivesData(): Promise<
    [AggregatedReserveIncentiveData]
  > {
    const resp = await this.callViewMethod(
      this.uiPoolDataProviderContract.getReservesIncentivesData,
      [],
    );
    const reservesIncentivesDataInternal = resp.at(0) as Array<any>;
    const aggregatedReservesIncentivesData = getReservesIncentivesDataInternal(
      reservesIncentivesDataInternal,
    );
    return aggregatedReservesIncentivesData as [AggregatedReserveIncentiveData];
  }

  public async getUserReservesIncentivesData(
    user: AccountAddress,
  ): Promise<[UserReserveIncentiveData]> {
    const resp = await this.callViewMethod(
      this.uiPoolDataProviderContract.getUserReservesIncentivesData,
      [user],
    );
    const userUserReservesIncentivesDataRaw = resp.at(0) as Array<any>;
    const userReserveIncentivesData = getUserReservesIncentivesDataInternal(
      userUserReservesIncentivesDataRaw,
    );
    return userReserveIncentivesData as [UserReserveIncentiveData];
  }
}
