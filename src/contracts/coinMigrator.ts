import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

export class CoinMigratorContract {
  // Resource Func Addr
  CoinToFaFuncAddr: MoveFunctionId;
  FaToCoinFuncAddr: MoveFunctionId;
  GetFaAddrFuncAddr: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const CoinMigratorManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const CoinMigratorAccountAddress = CoinMigratorManager.toString();
    this.CoinToFaFuncAddr = `${CoinMigratorAccountAddress}::coin_migrator::coin_to_fa`;
    this.FaToCoinFuncAddr = `${CoinMigratorAccountAddress}::coin_migrator::fa_to_coin`;
    this.GetFaAddrFuncAddr = `${CoinMigratorAccountAddress}::coin_migrator::get_fa_address`;
  }
}
