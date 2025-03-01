import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

/**
 * Represents a contract for handling flash loans on the Aptos blockchain.
 *
 * @remarks
 * This class provides functionality to interact with the flash loan logic
 * defined in the AAVE_POOL profile on the Aptos blockchain.
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const flashLoanContract = new FlashLoanContract(provider);
 * console.log(flashLoanContract.FlashLoanFuncAddr);
 * ```
 *
 * @public
 */
export class FlashLoanContract {
  FlashLoanFuncAddr: MoveFunctionId;

  PayFlashLoanComplexFuncAddr: MoveFunctionId;

  FlashLoanSimpleFuncAddr: MoveFunctionId;

  PayFlashLoanSimpleFuncAddr: MoveFunctionId;

  /**
   * Creates an instance of the FlashLoan class.
   *
   * @param provider - An instance of AptosProvider used to interact with the Aptos blockchain.
   *
   * This constructor initializes the FlashLoanManager by fetching the profile address associated with AAVE_POOL.
   * It then converts the FlashLoanManager address to a string and constructs the function addresses for
   * `flashloan` and `flash_loan_simple` logic.
   *
   * @property FlashLoanFuncAddr - The address of the flash loan function.
   * @property FlashLoanSimpleFuncAddr - The address of the simple flash loan function.
   */
  constructor(provider: AptosProvider) {
    const FlashLoanManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const FlashLoanManagerAccountAddress = FlashLoanManager.toString();
    this.FlashLoanFuncAddr = `${FlashLoanManagerAccountAddress}::flash_loan_logic::flashloan`;
    this.FlashLoanSimpleFuncAddr = `${FlashLoanManagerAccountAddress}::flash_loan_logic::flash_loan_simple`;
  }
}
