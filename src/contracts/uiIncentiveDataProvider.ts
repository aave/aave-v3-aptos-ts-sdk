import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

/**
 * Class representing the UI Incentive Data Provider Contract.
 *
 * This class provides methods to interact with the AAVE protocol's UI Incentive Data Provider V3.
 * It initializes various addresses and methods required to retrieve incentive data.
 *
 * @remarks
 * The constructor retrieves the Periphery Manager's account address from the provided AptosProvider instance
 * and constructs the necessary addresses and method names for interacting with the incentive data provider.
 *
 * @property uiIncentiveDataProviderV3DataAddress - The address for the UI Incentive Data Provider V3 data.
 * @property uiIncentiveDataProviderV3DataObject - The object address for the UI Incentive Data Provider V3 data.
 * @property getFullReservesIncentiveData - The method name for retrieving full reserves incentive data.
 * @property getReservesIncentivesData - The method name for retrieving reserves incentives data.
 * @property getUserReservesIncentivesData - The method name for retrieving user reserves incentives data.
 *
 * @constructor
 * @param provider - The AptosProvider instance used to interact with the AAVE protocol.
 */
export class UiIncentiveDataProviderContract {
  /**
   * -------------------------------------------------------------------------
   * UI Incentive Data Provider
   * -------------------------------------------------------------------------
   */

  // View
  getFullReservesIncentiveData: MoveFunctionId;

  getReservesIncentivesData: MoveFunctionId;

  getUserReservesIncentivesData: MoveFunctionId;

  /**
   * Creates an instance of the UIIncentiveDataProvider.
   *
   * @param provider - The AptosProvider instance used to interact with the AAVE protocol.
   *
   * @remarks
   * This constructor initializes various addresses and methods related to the UI Incentive Data Provider V3.
   * It retrieves the Periphery Manager's account address from the provider and constructs the necessary
   * addresses and method names for interacting with the incentive data provider.
   *
   * @property uiIncentiveDataProviderV3DataAddress - The address for the UI Incentive Data Provider V3 data.
   * @property uiIncentiveDataProviderV3DataObject - The object address for the UI Incentive Data Provider V3 data.
   * @property getFullReservesIncentiveData - The method name for retrieving full reserves incentive data.
   * @property getReservesIncentivesData - The method name for retrieving reserves incentives data.
   * @property getUserReservesIncentivesData - The method name for retrieving user reserves incentives data.
   */
  constructor(provider: AptosProvider) {
    const PeripheryManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const PeripheryManagerAccountAddress = PeripheryManager.toString();

    this.getFullReservesIncentiveData = `${PeripheryManagerAccountAddress}::ui_incentive_data_provider_v3::get_full_reserves_incentive_data`;
    this.getReservesIncentivesData = `${PeripheryManagerAccountAddress}::ui_incentive_data_provider_v3::get_reserves_incentives_data`;
    this.getUserReservesIncentivesData = `${PeripheryManagerAccountAddress}::ui_incentive_data_provider_v3::get_user_reserves_incentives_data`;
  }
}
