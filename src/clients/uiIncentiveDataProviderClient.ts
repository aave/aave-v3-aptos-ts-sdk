import { AccountAddress, Ed25519Account } from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { UiIncentiveDataProviderContract } from "../contracts/uiIncentiveDataProvider";
import { Metadata } from "../helpers/interfaces";

/**
 * Represents the aggregated incentive data for a reserve.
 *
 * @typedef {Object} AggregatedReserveIncentiveData
 * @property {AccountAddress} underlyingAsset - The address of the underlying asset.
 * @property {IncentiveData} aIncentiveData - The incentive data for the aToken.
 * @property {IncentiveData} vIncentiveData - The incentive data for the variable debt token.
 */
export type AggregatedReserveIncentiveData = {
  underlyingAsset: AccountAddress;
  aIncentiveData: IncentiveData;
  vIncentiveData: IncentiveData;
};

/**
 * Represents the incentive data for a specific token.
 *
 * @typedef {Object} IncentiveData
 *
 * @property {AccountAddress} tokenAddress - The address of the token.
 * @property {AccountAddress} incentiveControllerAddress - The address of the incentive controller.
 * @property {[RewardInfo]} rewardsTokenInformation - An array containing information about the rewards token.
 */
export type IncentiveData = {
  tokenAddress: AccountAddress;
  incentiveControllerAddress: AccountAddress;
  rewardsTokenInformation: [RewardInfo];
};

/**
 * Represents information about a reward token.
 *
 * @typedef {Object} RewardInfo
 *
 * @property {string} rewardTokenSymbol - The symbol of the reward token.
 * @property {AccountAddress} rewardTokenAddress - The address of the reward token.
 * @property {AccountAddress} rewardOracleAddress - The address of the reward oracle.
 * @property {bigint} emissionPerSecond - The emission rate of the reward token per second.
 * @property {bigint} incentivesLastUpdateTimestamp - The timestamp of the last update to the incentives.
 * @property {bigint} tokenIncentivesIndex - The index of the token incentives.
 * @property {bigint} emissionEndTimestamp - The timestamp when the emission ends.
 * @property {bigint} rewardPriceFeed - The price feed of the reward token.
 * @property {number} rewardTokenDecimals - The number of decimals of the reward token.
 * @property {number} precision - The precision of the reward calculations.
 * @property {number} priceFeedDecimals - The number of decimals in the price feed.
 */
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

/**
 * Represents the incentive data for a user's reserve.
 *
 * @typedef {Object} UserReserveIncentiveData
 * @property {AccountAddress} underlyingAsset - The address of the underlying asset.
 * @property {UserIncentiveData} aTokenIncentivesUserData - The incentive data for the aToken.
 * @property {UserIncentiveData} vTokenIncentivesUserData - The incentive data for the vToken.
 */
export type UserReserveIncentiveData = {
  underlyingAsset: AccountAddress;
  aTokenIncentivesUserData: UserIncentiveData;
  vTokenIncentivesUserData: UserIncentiveData;
};

/**
 * Represents the incentive data for a user.
 *
 * @typedef {Object} UserIncentiveData
 *
 * @property {AccountAddress} tokenAddress - The address of the token.
 * @property {AccountAddress} incentiveControllerAddress - The address of the incentive controller.
 * @property {[UserRewardInfo]} userRewardsInformation - An array containing information about user rewards.
 */
export type UserIncentiveData = {
  tokenAddress: AccountAddress;
  incentiveControllerAddress: AccountAddress;
  userRewardsInformation: [UserRewardInfo];
};

/**
 * Represents the reward information for a user.
 *
 * @typedef {Object} UserRewardInfo
 * @property {string} rewardTokenSymbol - The symbol of the reward token.
 * @property {AccountAddress} rewardOracleAddress - The address of the reward oracle.
 * @property {AccountAddress} rewardTokenAddress - The address of the reward token.
 * @property {bigint} userUnclaimedRewards - The amount of unclaimed rewards for the user.
 * @property {bigint} tokenIncentivesUserIndex - The user's index in the token incentives.
 * @property {bigint} rewardPriceFeed - The price feed of the reward.
 * @property {number} priceFeedDecimals - The number of decimals in the price feed.
 * @property {number} rewardTokenDecimals - The number of decimals in the reward token.
 */
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

/**
 * Maps the raw reward token information to a structured `RewardInfo` object.
 *
 * @param rewardTokenInfo - The raw reward token information.
 * @returns A `RewardInfo` object containing the mapped incentive data.
 *
 * @property rewardTokenSymbol - The symbol of the reward token.
 * @property rewardTokenAddress - The address of the reward token.
 * @property rewardOracleAddress - The address of the reward oracle.
 * @property emissionPerSecond - The emission rate of the reward token per second.
 * @property incentivesLastUpdateTimestamp - The timestamp of the last update to the incentives.
 * @property tokenIncentivesIndex - The index of the token incentives.
 * @property emissionEndTimestamp - The timestamp when the emission ends.
 * @property rewardPriceFeed - The price feed of the reward token.
 * @property rewardTokenDecimals - The number of decimals for the reward token.
 * @property precision - The precision of the reward token.
 * @property priceFeedDecimals - The number of decimals for the price feed.
 */
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

/**
 * Maps the given reward token information to a UserRewardInfo object.
 *
 * @param rewardTokenInfo - The reward token information to map.
 * @returns A UserRewardInfo object containing the mapped data.
 */
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

/**
 * Processes raw user reserves incentives data and maps it to structured user reserve incentive data.
 *
 * @param userReservesIncentivesDataRaw - An array of raw user reserves incentives data.
 * @returns An array containing the structured user reserve incentive data.
 */
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

/**
 * Processes raw aggregated incentives reserve data and maps it to a structured format.
 *
 * @param aggregatedIncentivesReserveDataRaw - An array of raw incentive data for reserves.
 * @returns An array containing a single `AggregatedReserveIncentiveData` object.
 */
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

  /**
   * Creates an instance of `UiIncentiveDataProviderClient` using the provided `AptosProvider`.
   * The client is initialized with the default signer obtained from the provider's pool profile account.
   *
   * @param provider - The `AptosProvider` instance used to create the client.
   * @returns A new instance of `UiIncentiveDataProviderClient`.
   */
  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): UiIncentiveDataProviderClient {
    const client = new UiIncentiveDataProviderClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }

  /**
   * Fetches the address of the UI Pool Data Provider V3.
   *
   * This method calls the `uiIncentiveDataProviderV3DataAddress` view method on the
   * `uiPoolDataProviderContract` to retrieve the address.
   *
   * @returns {Promise<AccountAddress>} A promise that resolves to an `AccountAddress` object
   * representing the address of the UI Pool Data Provider V3.
   */
  public async uiPoolDataProviderV3DataAddress(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.uiPoolDataProviderContract.uiIncentiveDataProviderV3DataAddress,
      [],
    );
    return AccountAddress.fromString(resp as string);
  }

  /**
   * Fetches the V3 data object from the UI Pool Data Provider.
   *
   * This method calls the `uiIncentiveDataProviderV3DataObject` view method on the
   * `uiPoolDataProviderContract` and returns the result as an `AccountAddress`.
   *
   * @returns {Promise<AccountAddress>} A promise that resolves to an `AccountAddress` object
   * representing the V3 data object.
   *
   * @throws {Error} If the call to the view method fails or the response cannot be parsed.
   */
  public async uiPoolDataProviderV3DataObject(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.uiPoolDataProviderContract.uiIncentiveDataProviderV3DataObject,
      [],
    );
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  /**
   * Fetches the full reserves incentive data from the UI Pool Data Provider contract.
   *
   * @returns {Promise<{ aggregatedReservesIncentivesData: [AggregatedReserveIncentiveData], userReserveIncentiveData: [UserReserveIncentiveData] }>}
   * A promise that resolves to an object containing:
   * - `aggregatedReservesIncentivesData`: An array of aggregated reserve incentive data.
   * - `userReserveIncentiveData`: An array of user reserve incentive data.
   */
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

  /**
   * Retrieves the incentives data for all reserves.
   *
   * @returns {Promise<[AggregatedReserveIncentiveData]>} A promise that resolves to an array containing the aggregated incentives data for all reserves.
   *
   * @throws {Error} If the call to the view method fails.
   */
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

  /**
   * Retrieves the incentives data for the user's reserves.
   *
   * @param user - The account address of the user.
   * @returns A promise that resolves to an array containing the user's reserve incentive data.
   */
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
