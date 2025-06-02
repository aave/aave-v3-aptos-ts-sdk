import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

/**
 * Represents the SupplyBorrowContract interface which defines the function addresses for supply, borrow, and liquidation operations
 * within the AAVE protocol on the Aptos blockchain.
 *
 * @remarks
 * This interface is used by the corresponding client classes to make actual calls to the blockchain.
 * The constructor initializes all function addresses by combining:
 * - The supply/borrow manager's account address from the provider
 * - The module name (supply_logic, borrow_logic, liquidation_logic, user_logic)
 * - The specific function name
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const supplyBorrow = new SupplyBorrowContract(provider);
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 */
export class SupplyBorrowContract {
  // Supply Functions
  supplyFuncAddr: MoveFunctionId;
  supplyCoinFuncAddr: MoveFunctionId;
  withdrawFuncAddr: MoveFunctionId;
  setUserUseReserveAsCollateralFuncAddr: MoveFunctionId;

  // Borrow Functions
  borrowFuncAddr: MoveFunctionId;
  repayFuncAddr: MoveFunctionId;
  repayWithATokensFuncAddr: MoveFunctionId;

  // Liquidation Functions
  liquidationCallFuncAddr: MoveFunctionId;

  // User Functions
  getUserAccountDataFuncAddr: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const SupplyBorrowManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const SupplyBorrowManagerAccountAddress = SupplyBorrowManager.toString();

    // Supply Functions
    this.supplyFuncAddr = `${SupplyBorrowManagerAccountAddress}::supply_logic::supply`;
    this.supplyCoinFuncAddr = `${SupplyBorrowManagerAccountAddress}::supply_logic::supply_coin`;
    this.withdrawFuncAddr = `${SupplyBorrowManagerAccountAddress}::supply_logic::withdraw`;
    this.setUserUseReserveAsCollateralFuncAddr = `${SupplyBorrowManagerAccountAddress}::supply_logic::set_user_use_reserve_as_collateral`;

    // Borrow Functions
    this.borrowFuncAddr = `${SupplyBorrowManagerAccountAddress}::borrow_logic::borrow`;
    this.repayFuncAddr = `${SupplyBorrowManagerAccountAddress}::borrow_logic::repay`;
    this.repayWithATokensFuncAddr = `${SupplyBorrowManagerAccountAddress}::borrow_logic::repay_with_a_tokens`;

    // Liquidation Functions
    this.liquidationCallFuncAddr = `${SupplyBorrowManagerAccountAddress}::liquidation_logic::liquidation_call`;

    // User Functions
    this.getUserAccountDataFuncAddr = `${SupplyBorrowManagerAccountAddress}::user_logic::get_user_account_data`;
  }
}
