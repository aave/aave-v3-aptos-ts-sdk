import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

export class PeripheryContract {
  // emission manager
  EmissionManagerAddress: MoveFunctionId;
  EmissionManagerObject: MoveFunctionId;
  ConfigureAssets: MoveFunctionId;
  SetPullRewardsTransferStrategy: MoveFunctionId;
  SetDistributionEnd: MoveFunctionId;
  SetEmissionPerSecond: MoveFunctionId;
  SetClaimer: MoveFunctionId;
  SetEmissionAdmin: MoveFunctionId;
  SetRewardsController: MoveFunctionId;
  GetEmissionAdmin: MoveFunctionId;

  // rewards controller
  RewardsControllerAddress: MoveFunctionId;
  RewardsControllerObject: MoveFunctionId;
  GetClaimer: MoveFunctionId;
  GetRewardOracle: MoveFunctionId;
  GetPullRewardsTransferStrategy: MoveFunctionId;
  ClaimRewards: MoveFunctionId;
  ClaimRewardsOnBehalf: MoveFunctionId;
  ClaimRewardsToSelf: MoveFunctionId;
  ClaimAllRewards: MoveFunctionId;
  ClaimAllRewardsOnBehalf: MoveFunctionId;
  ClaimAllRewardsToSelf: MoveFunctionId;
  LookupAssetData: MoveFunctionId;
  LookupRewardsData: MoveFunctionId;
  LookupUserData: MoveFunctionId;
  GetRewardsData: MoveFunctionId;
  GetUserData: MoveFunctionId;
  GetAssetIndex: MoveFunctionId;
  GetDistributionEnd: MoveFunctionId;
  GetRewardsByAsset: MoveFunctionId;
  GetRewardsList: MoveFunctionId;
  GetUserAssetIndex: MoveFunctionId;
  GetUserAccruedRewards: MoveFunctionId;
  GetUserRewards: MoveFunctionId;
  GetAllUserRewards: MoveFunctionId;
  GetAssetDecimals: MoveFunctionId;

  // transfer strategy
  CreatePullRewardsTransferStrategy: MoveFunctionId;
  PullRewardsTransferStrategyEmergencyWithdrawal: MoveFunctionId;
  PullRewardsTransferStrategyGetIncentivesController: MoveFunctionId;
  PullRewardsTransferStrategyGetRewardsAdmin: MoveFunctionId;
  PullRewardsTransferStrategyGetRewardsVault: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const PeripheryManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    // admin controlled ecosystem reserve
    const PeripheryManagerAccountAddress = PeripheryManager.toString();

    // emission manager
    this.EmissionManagerAddress = `${PeripheryManagerAccountAddress}::emission_manager::emission_manager_address`;
    this.EmissionManagerObject = `${PeripheryManagerAccountAddress}::emission_manager::emission_manager_object`;
    this.ConfigureAssets = `${PeripheryManagerAccountAddress}::emission_manager::configure_assets`;
    this.SetPullRewardsTransferStrategy = `${PeripheryManagerAccountAddress}::emission_manager::set_pull_rewards_transfer_strategy`;
    this.SetDistributionEnd = `${PeripheryManagerAccountAddress}::emission_manager::set_distribution_end`;
    this.SetEmissionPerSecond = `${PeripheryManagerAccountAddress}::emission_manager::set_emission_per_second`;
    this.SetClaimer = `${PeripheryManagerAccountAddress}::emission_manager::set_claimer`;
    this.SetEmissionAdmin = `${PeripheryManagerAccountAddress}::emission_manager::set_emission_admin`;
    this.SetRewardsController = `${PeripheryManagerAccountAddress}::emission_manager::set_rewards_controller`;
    this.GetEmissionAdmin = `${PeripheryManagerAccountAddress}::emission_manager::get_emission_admin`;

    // rewards controller
    this.RewardsControllerAddress = `${PeripheryManagerAccountAddress}::rewards_controller::rewards_controller_address`;
    this.RewardsControllerObject = `${PeripheryManagerAccountAddress}::rewards_controller::rewards_controller_object`;
    this.GetClaimer = `${PeripheryManagerAccountAddress}::rewards_controller::get_claimer`;
    this.GetRewardOracle = `${PeripheryManagerAccountAddress}::rewards_controller::get_reward_oracle`;
    this.GetPullRewardsTransferStrategy = `${PeripheryManagerAccountAddress}::rewards_controller::get_pull_rewards_transfer_strategy`;
    this.ClaimRewards = `${PeripheryManagerAccountAddress}::rewards_controller::claim_rewards`;
    this.ClaimRewardsOnBehalf = `${PeripheryManagerAccountAddress}::rewards_controller::claim_rewards_on_behalf`;
    this.ClaimRewardsToSelf = `${PeripheryManagerAccountAddress}::rewards_controller::claim_rewards_to_self`;
    this.ClaimAllRewards = `${PeripheryManagerAccountAddress}::rewards_controller::claim_all_rewards`;
    this.ClaimAllRewardsOnBehalf = `${PeripheryManagerAccountAddress}::rewards_controller::claim_all_rewards_on_behalf`;
    this.ClaimAllRewardsToSelf = `${PeripheryManagerAccountAddress}::rewards_controller::claim_all_rewards_to_self`;
    this.LookupAssetData = `${PeripheryManagerAccountAddress}::rewards_controller::lookup_asset_data`;
    this.LookupRewardsData = `${PeripheryManagerAccountAddress}::rewards_controller::lookup_rewards_data`;
    this.LookupUserData = `${PeripheryManagerAccountAddress}::rewards_controller::lookup_user_data`;
    this.GetRewardsData = `${PeripheryManagerAccountAddress}::rewards_controller::get_rewards_data`;
    this.GetUserData = `${PeripheryManagerAccountAddress}::rewards_controller::get_user_data`;
    this.GetAssetIndex = `${PeripheryManagerAccountAddress}::rewards_controller::get_asset_index`;
    this.GetDistributionEnd = `${PeripheryManagerAccountAddress}::rewards_controller::get_distribution_end`;
    this.GetRewardsByAsset = `${PeripheryManagerAccountAddress}::rewards_controller::get_rewards_by_asset`;
    this.GetRewardsList = `${PeripheryManagerAccountAddress}::rewards_controller::get_rewards_list`;
    this.GetUserAssetIndex = `${PeripheryManagerAccountAddress}::rewards_controller::get_user_asset_index`;
    this.GetUserAccruedRewards = `${PeripheryManagerAccountAddress}::rewards_controller::get_user_accrued_rewards`;
    this.GetUserRewards = `${PeripheryManagerAccountAddress}::rewards_controller::get_user_rewards`;
    this.GetAllUserRewards = `${PeripheryManagerAccountAddress}::rewards_controller::get_all_user_rewards`;
    this.GetAssetDecimals = `${PeripheryManagerAccountAddress}::rewards_controller::get_asset_decimals`;

    // transfer strategy
    this.CreatePullRewardsTransferStrategy = `${PeripheryManagerAccountAddress}::transfer_strategy::create_pull_rewards_transfer_strategy`;
    this.PullRewardsTransferStrategyEmergencyWithdrawal = `${PeripheryManagerAccountAddress}::transfer_strategy::pull_rewards_transfer_strategy_emergency_withdrawal`;
    this.PullRewardsTransferStrategyGetIncentivesController = `${PeripheryManagerAccountAddress}::transfer_strategy::pull_rewards_transfer_strategy_get_incentives_controller`;
    this.PullRewardsTransferStrategyGetRewardsAdmin = `${PeripheryManagerAccountAddress}::transfer_strategy::pull_rewards_transfer_strategy_get_rewards_admin`;
    this.PullRewardsTransferStrategyGetRewardsVault = `${PeripheryManagerAccountAddress}::transfer_strategy::pull_rewards_transfer_strategy_get_rewards_vault`;
  }
}
