import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

/**
 * Represents the UiPoolDataProviderContract interface which defines the function addresses for pool data operations
 * within the AAVE protocol on the Aptos blockchain.
 *
 * @remarks
 * This interface is used by the corresponding client classes to make actual calls to the blockchain.
 * The constructor initializes all function addresses by combining:
 * - The periphery manager's account address from the provider
 * - The module name (ui_pool_data_provider_v3)
 * - The specific function name
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const uiPoolData = new UiPoolDataProviderContract(provider);
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 */
export class UiPoolDataProviderContract {
  // View Functions
  getReservesList: MoveFunctionId;
  getReservesData: MoveFunctionId;
  getUserReservesData: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const PeripheryManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const PeripheryManagerAccountAddress = PeripheryManager.toString();

    // View Functions
    this.getReservesList = `${PeripheryManagerAccountAddress}::ui_pool_data_provider_v3::get_reserves_list`;
    this.getReservesData = `${PeripheryManagerAccountAddress}::ui_pool_data_provider_v3::get_reserves_data`;
    this.getUserReservesData = `${PeripheryManagerAccountAddress}::ui_pool_data_provider_v3::get_user_reserves_data`;
  }
}
