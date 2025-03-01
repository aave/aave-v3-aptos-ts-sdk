import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

/**
 * The `BridgeContract` class provides methods to interact with the bridge logic on the Aptos blockchain.
 * It initializes the addresses for the `mint_unbacked` and `back_unbacked` functions using the profile
 * address associated with the AAVE_POOL profile.
 */
export class BridgeContract {
  MintUnbackedFuncAddr: MoveFunctionId;
  BackUnbackedFuncAddr: MoveFunctionId;

  /**
   * Constructs an instance of the Bridge class.
   *
   * @param provider - An instance of AptosProvider used to interact with the Aptos blockchain.
   *
   * This constructor initializes the BridgeManager by fetching the profile address associated with
   * the AAVE_POOL profile. It then converts this address to a string and uses it to set the addresses
   * for the `mint_unbacked` and `back_unbacked` functions within the bridge logic.
   */
  constructor(provider: AptosProvider) {
    const BridgeManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const BridgeManagerAccountAddress = BridgeManager.toString();
    this.MintUnbackedFuncAddr = `${BridgeManagerAccountAddress}::bridge_logic::mint_unbacked`;
    this.BackUnbackedFuncAddr = `${BridgeManagerAccountAddress}::bridge_logic::back_unbacked`;
  }
}
