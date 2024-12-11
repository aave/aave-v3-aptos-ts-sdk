import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

export class BridgeContract {
  // Resource Func Addr
  MintUnbackedFuncAddr: MoveFunctionId;

  BackUnbackedFuncAddr: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const BridgeManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const BridgeManagerAccountAddress = BridgeManager.toString();
    this.MintUnbackedFuncAddr = `${BridgeManagerAccountAddress}::bridge_logic::mint_unbacked`;
    this.BackUnbackedFuncAddr = `${BridgeManagerAccountAddress}::bridge_logic::back_unbacked`;
  }
}
