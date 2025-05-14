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
 * - `supplyFuncAddr`: Address for the supply logic.
 * - `withdrawFuncAddr`: Address for the withdraw logic.
 * - `setUserUseReserveAsCollateralFuncAddr`: Address for setting user reserve as collateral.
 * - `borrowFuncAddr`: Address for the borrow logic.
 * - `repayFuncAddr`: Address for the repay logic.
 * - `repayWithATokensFuncAddr`: Address for repaying with A tokens.
 * - `liquidationCallFuncAddr`: Address for the liquidation call logic.
 * - `getUserAccountDataFuncAddr`: Address for retrieving user account data.
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
  supplyFuncAddr: MoveFunctionId;

  withdrawFuncAddr: MoveFunctionId;

  setUserUseReserveAsCollateralFuncAddr: MoveFunctionId;

  borrowFuncAddr: MoveFunctionId;

  repayFuncAddr: MoveFunctionId;

  repayWithATokensFuncAddr: MoveFunctionId;

  liquidationCallFuncAddr: MoveFunctionId;

  getUserAccountDataFuncAddr: MoveFunctionId;

  /**
   * Constructs a new instance of the SupplyBorrowManager class.
   *
   * @param provider - An instance of AptosProvider used to interact with the Aptos blockchain.
   *
   * Initializes various function addresses for supply, borrow, and liquidation logic
   * by retrieving the profile address associated with AAVE_POOL from the provider.
   *
   * The following function addresses are set:
   * - `supplyFuncAddr`: Address for the supply logic.
   * - `withdrawFuncAddr`: Address for the withdraw logic.
   * - `setUserUseReserveAsCollateralFuncAddr`: Address for setting user reserve as collateral.
   * - `borrowFuncAddr`: Address for the borrow logic.
   * - `repayFuncAddr`: Address for the repay logic.
   * - `repayWithATokensFuncAddr`: Address for repaying with A tokens.
   * - `liquidationCallFuncAddr`: Address for the liquidation call logic.
   * - `getUserAccountDataFuncAddr`: Address for retrieving user account data.
   */
  constructor(provider: AptosProvider) {
    const SupplyBorrowManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const SupplyBorrowManagerAccountAddress = SupplyBorrowManager.toString();
    this.supplyFuncAddr = `${SupplyBorrowManagerAccountAddress}::supply_logic::supply`;
    this.withdrawFuncAddr = `${SupplyBorrowManagerAccountAddress}::supply_logic::withdraw`;
    this.setUserUseReserveAsCollateralFuncAddr = `${SupplyBorrowManagerAccountAddress}::supply_logic::set_user_use_reserve_as_collateral`;
    this.borrowFuncAddr = `${SupplyBorrowManagerAccountAddress}::borrow_logic::borrow`;
    this.repayFuncAddr = `${SupplyBorrowManagerAccountAddress}::borrow_logic::repay`;
    this.repayWithATokensFuncAddr = `${SupplyBorrowManagerAccountAddress}::borrow_logic::repay_with_a_tokens`;
    this.liquidationCallFuncAddr = `${SupplyBorrowManagerAccountAddress}::liquidation_logic::liquidation_call`;
    this.getUserAccountDataFuncAddr = `${SupplyBorrowManagerAccountAddress}::user_logic::get_user_account_data`;
  }
}
