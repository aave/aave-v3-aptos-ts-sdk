import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AptosProvider } from "../clients/aptosProvider";

export class FlashLoanContract {
  // Resource Func Addr
  FlashLoanFuncAddr: MoveFunctionId;

  PayFlashLoanComplexFuncAddr: MoveFunctionId;

  FlashLoanSimpleFuncAddr: MoveFunctionId;

  PayFlashLoanSimpleFuncAddr: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const FlashLoanManager =
      provider.getProfileAccountByName("AAVE_POOL_ADDRESS");
    const FlashLoanManagerAccountAddress = FlashLoanManager.toString();
    this.FlashLoanFuncAddr = `${FlashLoanManagerAccountAddress}::flash_loan_logic::flashloan`;
    this.FlashLoanSimpleFuncAddr = `${FlashLoanManagerAccountAddress}::flash_loan_logic::flash_loan_simple`;
  }
}