import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

export class UiIncentiveDataProviderContract {
  // Resource Func Addr
  /**
   * -------------------------------------------------------------------------
   * UI Incentive Data Provider
   * -------------------------------------------------------------------------=
   */

  // View
  uiIncentiveDataProviderV3DataAddress: MoveFunctionId;

  uiIncentiveDataProviderV3DataObject: MoveFunctionId;

  getFullReservesIncentiveData: MoveFunctionId;

  getReservesIncentivesData: MoveFunctionId;

  getUserReservesIncentivesData: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const PeripheryManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const PeripheryManagerAccountAddress = PeripheryManager.toString();

    this.uiIncentiveDataProviderV3DataAddress = `${PeripheryManagerAccountAddress}::ui_incentive_data_provider_v3::ui_incentive_data_provider_v3_data_address`;
    this.uiIncentiveDataProviderV3DataObject = `${PeripheryManagerAccountAddress}::ui_incentive_data_provider_v3::ui_incentive_data_provider_v3_data_object`;
    this.getFullReservesIncentiveData = `${PeripheryManagerAccountAddress}::ui_incentive_data_provider_v3::get_full_reserves_incentive_data`;
    this.getReservesIncentivesData = `${PeripheryManagerAccountAddress}::ui_incentive_data_provider_v3::get_reserves_incentives_data`;
    this.getUserReservesIncentivesData = `${PeripheryManagerAccountAddress}::ui_incentive_data_provider_v3::get_user_reserves_incentives_data`;
  }
}
