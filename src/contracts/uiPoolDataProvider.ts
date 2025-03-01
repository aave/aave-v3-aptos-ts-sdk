import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

/**
 * Class representing the UI Pool Data Provider contract.
 *
 * This class provides methods to interact with the AAVE protocol's UI Pool Data Provider.
 *
 * @remarks
 * The class initializes various properties that represent the addresses of different functions
 * and data objects within the AAVE protocol.
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const uiPoolDataProvider = new UiPoolDataProviderContract(provider);
 * ```
 *
 * @public
 */
export class UiPoolDataProviderContract {
  /**
   * -------------------------------------------------------------------------
   * UI Pool Data Provider
   * -------------------------------------------------------------------------=
   */

  // View
  uiPoolDataProviderV32DataAddress: MoveFunctionId;

  uiPoolDataProviderV3DataObject: MoveFunctionId;

  getReservesList: MoveFunctionId;

  getReservesData: MoveFunctionId;

  getUserReservesData: MoveFunctionId;

  /**
   * Constructs an instance of the UIPoolDataProvider class.
   *
   * @param provider - An instance of AptosProvider used to interact with the AAVE protocol.
   *
   * Initializes the following properties:
   * - `uiPoolDataProviderV32DataAddress`: The address of the UI Pool Data Provider V3.2 data.
   * - `uiPoolDataProviderV3DataObject`: The address of the UI Pool Data Provider V3 data object.
   * - `getReservesList`: The address of the function to get the list of reserves.
   * - `getReservesData`: The address of the function to get the data of reserves.
   * - `getUserReservesData`: The address of the function to get the data of user reserves.
   */
  constructor(provider: AptosProvider) {
    const PeripheryManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const PeripheryManagerAccountAddress = PeripheryManager.toString();

    this.uiPoolDataProviderV32DataAddress = `${PeripheryManagerAccountAddress}::ui_pool_data_provider_v3::ui_pool_data_provider_v3_data_address`;
    this.uiPoolDataProviderV3DataObject = `${PeripheryManagerAccountAddress}::ui_pool_data_provider_v3::ui_pool_data_provider_v3_data_object`;
    this.getReservesList = `${PeripheryManagerAccountAddress}::ui_pool_data_provider_v3::get_reserves_list`;
    this.getReservesData = `${PeripheryManagerAccountAddress}::ui_pool_data_provider_v3::get_reserves_data`;
    this.getUserReservesData = `${PeripheryManagerAccountAddress}::ui_pool_data_provider_v3::get_user_reserves_data`;
  }
}
