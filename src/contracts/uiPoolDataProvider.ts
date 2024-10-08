import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AptosProvider } from "../clients/aptosProvider";

export class UiPoolDataProviderContract {
  // Resource Func Addr
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

  constructor(provider: AptosProvider) {
    const PeripheryManager =
      provider.getProfileAccountByName("AAVE_POOL_ADDRESS");
    const PeripheryManagerAccountAddress = PeripheryManager.toString();

    this.uiPoolDataProviderV32DataAddress = `${PeripheryManagerAccountAddress}::ui_pool_data_provider_v3::ui_pool_data_provider_v3_data_address`;
    this.uiPoolDataProviderV3DataObject = `${PeripheryManagerAccountAddress}::ui_pool_data_provider_v3::ui_pool_data_provider_v3_data_object`;
    this.getReservesList = `${PeripheryManagerAccountAddress}::ui_pool_data_provider_v3::get_reserves_list`;
    this.getReservesData = `${PeripheryManagerAccountAddress}::ui_pool_data_provider_v3::get_reserves_data`;
    this.getUserReservesData = `${PeripheryManagerAccountAddress}::ui_pool_data_provider_v3::get_user_reserves_data`;
  }
}
