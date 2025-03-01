import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { FlashLoanContract } from "../contracts/flashloan";

/**
 * The FlashloanClient class provides methods to interact with the flash loan functionality
 * of the Aave V3 protocol on the Aptos blockchain. It extends the AptosContractWrapperBaseClass
 * and uses the FlashLoanContract to execute flash loan transactions.
 */
export class FlashloanClient extends AptosContractWrapperBaseClass {
  flashloanContract: FlashLoanContract;

  /**
   * Creates an instance of FlashloanClient.
   *
   * @param provider - The AptosProvider instance to interact with the Aptos blockchain.
   * @param signer - Optional Ed25519Account instance for signing transactions.
   */
  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.flashloanContract = new FlashLoanContract(provider);
  }

  /**
   * Creates an instance of FlashloanClient using the default signer.
   *
   * @param provider - The AptosProvider instance to use for creating the FlashloanClient.
   * @returns A new instance of FlashloanClient.
   */
  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): FlashloanClient {
    const client = new FlashloanClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }

  /**
   * Executes a flash loan transaction.
   *
   * @param receiverAddress - The address of the contract receiving the funds.
   * @param assets - An array of asset addresses to be borrowed.
   * @param amounts - An array of amounts corresponding to each asset to be borrowed.
   * @param interestRateModes - An array of interest rate modes for each asset.
   * @param onBehalfOf - The address on whose behalf the flash loan is executed.
   * @param referralCode - A referral code for potential rewards.
   * @returns A promise that resolves to a boolean indicating the success of the flash loan transaction.
   */
  public async flashloan(
    receiverAddress: AccountAddress,
    assets: Array<AccountAddress>,
    amounts: Array<bigint>,
    interestRateModes: Array<number>,
    onBehalfOf: AccountAddress,
    referralCode: number,
  ): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.flashloanContract.FlashLoanFuncAddr,
      [
        receiverAddress,
        assets,
        amounts,
        interestRateModes,
        onBehalfOf,
        referralCode,
      ],
    );
    return resp as boolean;
  }

  /**
   * Executes a simple flash loan transaction.
   *
   * @param receiverAddress - The address of the account that will receive the flash loan.
   * @param asset - The address of the asset to be borrowed.
   * @param amount - The amount of the asset to be borrowed.
   * @param referralCode - A referral code for the transaction.
   * @returns A promise that resolves to the response of the committed transaction.
   */
  public async flashloanSimple(
    receiverAddress: AccountAddress,
    asset: AccountAddress,
    amount: bigint,
    referralCode: number,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.flashloanContract.FlashLoanSimpleFuncAddr,
      [receiverAddress, asset, amount, referralCode],
    );
  }
}
