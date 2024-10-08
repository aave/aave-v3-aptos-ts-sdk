import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AptosProvider } from "../clients/aptosProvider";

export class OracleContract {
  // Resource Func Addr
  GetAssetPriceFuncAddr: MoveFunctionId;

  SetAssetPriceFuncAddr: MoveFunctionId;

  IsBorrowAllowedFuncAddr: MoveFunctionId;

  IsLiquidationAllowedFuncAddr: MoveFunctionId;

  SetGracePeriodFuncAddr: MoveFunctionId;

  GetGracePeriodFuncAddr: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const OracleManager = provider.getProfileAccountByName(
      "AAVE_MOCK_ORACLE_ADDRESS",
    );
    const OracleManagerAccountAddress = OracleManager.toString();
    this.GetAssetPriceFuncAddr = `${OracleManagerAccountAddress}::oracle::get_asset_price`;
    this.SetAssetPriceFuncAddr = `${OracleManagerAccountAddress}::oracle::set_asset_price`;
    this.IsBorrowAllowedFuncAddr = `${OracleManagerAccountAddress}::oracle_sentinel::is_borrow_allowed`;
    this.IsLiquidationAllowedFuncAddr = `${OracleManagerAccountAddress}::oracle_sentinel::is_liquidation_allowed`;
    this.SetGracePeriodFuncAddr = `${OracleManagerAccountAddress}::oracle_sentinel::set_grace_period`;
    this.GetGracePeriodFuncAddr = `${OracleManagerAccountAddress}::oracle_sentinel::get_grace_period`;
  }
}
