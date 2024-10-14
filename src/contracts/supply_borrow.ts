import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

export class SupplyBorrowContract {
  // Resource Func Addr
  // Supply
  /// Entry
  SupplyFuncAddr: MoveFunctionId;

  WithdrawFuncAddr: MoveFunctionId;

  FinalizeTransferFuncAddr: MoveFunctionId;

  SetUserUseReserveAsCollateralFuncAddr: MoveFunctionId;

  DepositFuncAddr: MoveFunctionId;

  // Borrow
  /// Entry
  BorrowFuncAddr: MoveFunctionId;

  RepayFuncAddr: MoveFunctionId;

  RepayWithATokensFuncAddr: MoveFunctionId;

  // Liquidation
  /// Entry
  LiquidationCallFuncAddr: MoveFunctionId;

  // User Logic
  /// View
  GetUserAccountDataFuncAddr: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const SupplyBorrowManager = provider.getProfileAccountByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const SupplyBorrowManagerAccountAddress = SupplyBorrowManager.toString();
    this.SupplyFuncAddr = `${SupplyBorrowManagerAccountAddress}::supply_logic::supply`;
    this.WithdrawFuncAddr = `${SupplyBorrowManagerAccountAddress}::supply_logic::withdraw`;
    this.FinalizeTransferFuncAddr = `${SupplyBorrowManagerAccountAddress}::supply_logic::finalize_transfer`;
    this.SetUserUseReserveAsCollateralFuncAddr = `${SupplyBorrowManagerAccountAddress}::supply_logic::set_user_use_reserve_as_collateral`;
    this.BorrowFuncAddr = `${SupplyBorrowManagerAccountAddress}::borrow_logic::borrow`;
    this.RepayFuncAddr = `${SupplyBorrowManagerAccountAddress}::borrow_logic::repay`;
    this.RepayWithATokensFuncAddr = `${SupplyBorrowManagerAccountAddress}::borrow_logic::repay_with_a_tokens`;
    this.LiquidationCallFuncAddr = `${SupplyBorrowManagerAccountAddress}::liquidation_logic::liquidation_call`;
    this.GetUserAccountDataFuncAddr = `${SupplyBorrowManagerAccountAddress}::user_logic::get_user_account_data`;
  }
}
