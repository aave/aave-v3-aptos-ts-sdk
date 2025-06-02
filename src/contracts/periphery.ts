import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

/**
 * Represents the PeripheryContract interface which defines the function addresses for periphery operations
 * within the AAVE protocol on the Aptos blockchain.
 *
 * @remarks
 * This interface is used by the corresponding client classes to make actual calls to the blockchain.
 * The constructor initializes all function addresses by combining:
 * - The periphery manager's account address from the provider
 * - The module name (emission_manager, rewards_controller, transfer_strategy)
 * - The specific function name
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const periphery = new PeripheryContract(provider);
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 */
export class PeripheryContract {
  // emission manager
  emissionManagerAddressFuncAddr: MoveFunctionId;
  emissionManagerObjectFuncAddr: MoveFunctionId;
  configureAssetsFuncAddr: MoveFunctionId;
  setPullRewardsTransferStrategyFuncAddr: MoveFunctionId;
  setDistributionEndFuncAddr: MoveFunctionId;
  setEmissionPerSecondFuncAddr: MoveFunctionId;
  setClaimerFuncAddr: MoveFunctionId;
  setEmissionAdminFuncAddr: MoveFunctionId;
  setRewardsControllerFuncAddr: MoveFunctionId;
  getEmissionAdminFuncAddr: MoveFunctionId;
  getRewardsControllerFuncAddr: MoveFunctionId;

  // rewards distribution
  claimRewardsFuncAddr: MoveFunctionId;
  claimRewardsOnBehalfFuncAddr: MoveFunctionId;
  claimRewardsToSelfFuncAddr: MoveFunctionId;
  claimAllRewardsFuncAddr: MoveFunctionId;
  claimAllRewardsOnBehalfFuncAddr: MoveFunctionId;
  claimAllRewardsToSelfFuncAddr: MoveFunctionId;

  // rewards controller
  rewardsControllerAddressFuncAddr: MoveFunctionId;
  rewardsControllerObjectFuncAddr: MoveFunctionId;
  getClaimerFuncAddr: MoveFunctionId;
  getRewardOracleFuncAddr: MoveFunctionId;
  getPullRewardsTransferStrategyFuncAddr: MoveFunctionId;
  lookupAssetDataFuncAddr: MoveFunctionId;
  lookupRewardsDataFuncAddr: MoveFunctionId;
  lookupUserDataFuncAddr: MoveFunctionId;
  getRewardsDataFuncAddr: MoveFunctionId;
  getUserDataFuncAddr: MoveFunctionId;
  getAssetIndexFuncAddr: MoveFunctionId;
  getDistributionEndFuncAddr: MoveFunctionId;
  getRewardsByAssetFuncAddr: MoveFunctionId;
  getRewardsListFuncAddr: MoveFunctionId;
  getUserAssetIndexFuncAddr: MoveFunctionId;
  getUserAccruedRewardsFuncAddr: MoveFunctionId;
  getUserRewardsFuncAddr: MoveFunctionId;
  getAllUserRewardsFuncAddr: MoveFunctionId;
  getAssetDecimalsFuncAddr: MoveFunctionId;

  // transfer strategy
  createPullRewardsTransferStrategyFuncAddr: MoveFunctionId;
  pullRewardsTransferStrategyEmergencyWithdrawalFuncAddr: MoveFunctionId;
  pullRewardsTransferStrategyGetIncentivesControllerFuncAddr: MoveFunctionId;
  pullRewardsTransferStrategyGetRewardsAdminFuncAddr: MoveFunctionId;
  pullRewardsTransferStrategyGetRewardsVaultFuncAddr: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const PeripheryManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const PeripheryManagerAccountAddress = PeripheryManager.toString();

    // emission manager
    this.emissionManagerAddressFuncAddr = `${PeripheryManagerAccountAddress}::emission_manager::emission_manager_address`;
    this.emissionManagerObjectFuncAddr = `${PeripheryManagerAccountAddress}::emission_manager::emission_manager_object`;
    this.configureAssetsFuncAddr = `${PeripheryManagerAccountAddress}::emission_manager::configure_assets`;
    this.setPullRewardsTransferStrategyFuncAddr = `${PeripheryManagerAccountAddress}::emission_manager::set_pull_rewards_transfer_strategy`;
    this.setDistributionEndFuncAddr = `${PeripheryManagerAccountAddress}::emission_manager::set_distribution_end`;
    this.setEmissionPerSecondFuncAddr = `${PeripheryManagerAccountAddress}::emission_manager::set_emission_per_second`;
    this.setClaimerFuncAddr = `${PeripheryManagerAccountAddress}::emission_manager::set_claimer`;
    this.setEmissionAdminFuncAddr = `${PeripheryManagerAccountAddress}::emission_manager::set_emission_admin`;
    this.setRewardsControllerFuncAddr = `${PeripheryManagerAccountAddress}::emission_manager::set_rewards_controller`;
    this.getEmissionAdminFuncAddr = `${PeripheryManagerAccountAddress}::emission_manager::get_emission_admin`;
    this.getRewardsControllerFuncAddr = `${PeripheryManagerAccountAddress}::emission_manager::get_rewards_controller`;

    // rewards distribution
    this.claimRewardsFuncAddr = `${PeripheryManagerAccountAddress}::emission_manager::claim_rewards`;
    this.claimRewardsOnBehalfFuncAddr = `${PeripheryManagerAccountAddress}::emission_manager::claim_rewards_on_behalf`;
    this.claimRewardsToSelfFuncAddr = `${PeripheryManagerAccountAddress}::emission_manager::claim_rewards_to_self`;
    this.claimAllRewardsFuncAddr = `${PeripheryManagerAccountAddress}::emission_manager::claim_all_rewards`;
    this.claimAllRewardsOnBehalfFuncAddr = `${PeripheryManagerAccountAddress}::emission_manager::claim_all_rewards_on_behalf`;
    this.claimAllRewardsToSelfFuncAddr = `${PeripheryManagerAccountAddress}::emission_manager::claim_all_rewards_to_self`;

    // rewards controller
    this.rewardsControllerAddressFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::rewards_controller_address`;
    this.rewardsControllerObjectFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::rewards_controller_object`;
    this.getClaimerFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::get_claimer`;
    this.getRewardOracleFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::get_reward_oracle`;
    this.getPullRewardsTransferStrategyFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::get_pull_rewards_transfer_strategy`;
    this.lookupAssetDataFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::lookup_asset_data`;
    this.lookupRewardsDataFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::lookup_rewards_data`;
    this.lookupUserDataFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::lookup_user_data`;
    this.getRewardsDataFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::get_rewards_data`;
    this.getUserDataFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::get_user_data`;
    this.getAssetIndexFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::get_asset_index`;
    this.getDistributionEndFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::get_distribution_end`;
    this.getRewardsByAssetFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::get_rewards_by_asset`;
    this.getRewardsListFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::get_rewards_list`;
    this.getUserAssetIndexFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::get_user_asset_index`;
    this.getUserAccruedRewardsFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::get_user_accrued_rewards`;
    this.getUserRewardsFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::get_user_rewards`;
    this.getAllUserRewardsFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::get_all_user_rewards`;
    this.getAssetDecimalsFuncAddr = `${PeripheryManagerAccountAddress}::rewards_controller::get_asset_decimals`;

    // transfer strategy
    this.createPullRewardsTransferStrategyFuncAddr = `${PeripheryManagerAccountAddress}::transfer_strategy::create_pull_rewards_transfer_strategy`;
    this.pullRewardsTransferStrategyEmergencyWithdrawalFuncAddr = `${PeripheryManagerAccountAddress}::transfer_strategy::pull_rewards_transfer_strategy_emergency_withdrawal`;
    this.pullRewardsTransferStrategyGetIncentivesControllerFuncAddr = `${PeripheryManagerAccountAddress}::transfer_strategy::pull_rewards_transfer_strategy_get_incentives_controller`;
    this.pullRewardsTransferStrategyGetRewardsAdminFuncAddr = `${PeripheryManagerAccountAddress}::transfer_strategy::pull_rewards_transfer_strategy_get_rewards_admin`;
    this.pullRewardsTransferStrategyGetRewardsVaultFuncAddr = `${PeripheryManagerAccountAddress}::transfer_strategy::pull_rewards_transfer_strategy_get_rewards_vault`;
  }
}
