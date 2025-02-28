import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

/**
 * The `SupplyBorrowContract` class encapsulates the logic for interacting with the supply, borrow, and liquidation
 * functionalities of the AAVE protocol on the Aptos blockchain.
 *
 * This class initializes various function addresses required for these operations by retrieving the profile address
 * associated with the AAVE_POOL from the provided `AptosProvider` instance.
 *
 * @remarks
 * The following function addresses are set during initialization:
 * - `SupplyFuncAddr`: Address for the supply logic.
 * - `WithdrawFuncAddr`: Address for the withdraw logic.
 * - `FinalizeTransferFuncAddr`: Address for the finalize transfer logic.
 * - `SetUserUseReserveAsCollateralFuncAddr`: Address for setting user reserve as collateral.
 * - `DepositFuncAddr`: Address for the deposit logic.
 * - `BorrowFuncAddr`: Address for the borrow logic.
 * - `RepayFuncAddr`: Address for the repay logic.
 * - `RepayWithATokensFuncAddr`: Address for repaying with A tokens.
 * - `LiquidationCallFuncAddr`: Address for the liquidation call logic.
 * - `GetUserAccountDataFuncAddr`: Address for retrieving user account data.
 *
 * @param provider - An instance of `AptosProvider` used to interact with the Aptos blockchain.
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const supplyBorrowContract = new SupplyBorrowContract(provider);
 * ```
 */
export class SupplyBorrowContract {
  SupplyFuncAddr: MoveFunctionId;

  WithdrawFuncAddr: MoveFunctionId;

  FinalizeTransferFuncAddr: MoveFunctionId;

  SetUserUseReserveAsCollateralFuncAddr: MoveFunctionId;

  DepositFuncAddr: MoveFunctionId;

  BorrowFuncAddr: MoveFunctionId;

  RepayFuncAddr: MoveFunctionId;

  RepayWithATokensFuncAddr: MoveFunctionId;

  LiquidationCallFuncAddr: MoveFunctionId;

  GetUserAccountDataFuncAddr: MoveFunctionId;

  /**
   * Constructs a new instance of the SupplyBorrowManager class.
   *
   * @param provider - An instance of AptosProvider used to interact with the Aptos blockchain.
   *
   * Initializes various function addresses for supply, borrow, and liquidation logic
   * by retrieving the profile address associated with AAVE_POOL from the provider.
   *
   * The following function addresses are set:
   * - `SupplyFuncAddr`: Address for the supply logic.
   * - `WithdrawFuncAddr`: Address for the withdraw logic.
   * - `FinalizeTransferFuncAddr`: Address for the finalize transfer logic.
   * - `SetUserUseReserveAsCollateralFuncAddr`: Address for setting user reserve as collateral.
   * - `BorrowFuncAddr`: Address for the borrow logic.
   * - `RepayFuncAddr`: Address for the repay logic.
   * - `RepayWithATokensFuncAddr`: Address for repaying with A tokens.
   * - `LiquidationCallFuncAddr`: Address for the liquidation call logic.
   * - `GetUserAccountDataFuncAddr`: Address for retrieving user account data.
   */
  constructor(provider: AptosProvider) {
    const SupplyBorrowManager = provider.getProfileAddressByName(
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
