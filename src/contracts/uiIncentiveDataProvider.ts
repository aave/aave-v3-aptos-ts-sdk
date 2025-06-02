import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

/**
 * Represents the UiIncentiveDataProviderContract interface which defines the function addresses for incentive data operations
 * within the AAVE protocol on the Aptos blockchain.
 *
 * @remarks
 * This interface is used by the corresponding client classes to make actual calls to the blockchain.
 * The constructor initializes all function addresses by combining:
 * - The periphery manager's account address from the provider
 * - The module name (ui_incentive_data_provider_v3)
 * - The specific function name
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const uiIncentiveData = new UiIncentiveDataProviderContract(provider);
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 */
export class UiIncentiveDataProviderContract {
  // View Functions
  getFullReservesIncentiveData: MoveFunctionId;
  getReservesIncentivesData: MoveFunctionId;
  getUserReservesIncentivesData: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const PeripheryManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const PeripheryManagerAccountAddress = PeripheryManager.toString();

    // View Functions
    this.getFullReservesIncentiveData = `${PeripheryManagerAccountAddress}::ui_incentive_data_provider_v3::get_full_reserves_incentive_data`;
    this.getReservesIncentivesData = `${PeripheryManagerAccountAddress}::ui_incentive_data_provider_v3::get_reserves_incentives_data`;
    this.getUserReservesIncentivesData = `${PeripheryManagerAccountAddress}::ui_incentive_data_provider_v3::get_user_reserves_incentives_data`;
  }
}
