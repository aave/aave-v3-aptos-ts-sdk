import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AptosProvider } from "../clients/aptosProvider";

export class BridgeContract {
  // Resource Func Addr
  MintUnbackedFuncAddr: MoveFunctionId;

  BackUnbackedFuncAddr: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const BridgeManager = provider.getProfileAccountByName("AAVE_POOL_ADDRESS");
    const BridgeManagerAccountAddress = BridgeManager.toString();
    this.MintUnbackedFuncAddr = `${BridgeManagerAccountAddress}::bridge_logic::mint_unbacked`;
    this.BackUnbackedFuncAddr = `${BridgeManagerAccountAddress}::bridge_logic::back_unbacked`;
  }
}
