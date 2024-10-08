import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { FlashLoanContract } from "../contracts/flashloan";

export class FlashloanClient extends AptosContractWrapperBaseClass {
  flashloanContract: FlashLoanContract;

  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.flashloanContract = new FlashLoanContract(provider);
  }

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
