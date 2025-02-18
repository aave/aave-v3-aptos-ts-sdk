import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { BridgeContract } from "../contracts/bridge";
import { AptosProvider } from "./aptosProvider";

export class BridgeClient extends AptosContractWrapperBaseClass {
  bridgeContract: BridgeContract;

  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.bridgeContract = new BridgeContract(provider);
  }

  public static buildWithDefaultSigner(provider: AptosProvider): BridgeClient {
    const client = new BridgeClient(provider, provider.getPoolProfileAccount());
    return client;
  }

  public async backUnbacked(
    asset: AccountAddress,
    amount: bigint,
    fee: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.bridgeContract.BackUnbackedFuncAddr,
      [asset, amount.toString(), fee.toString()],
    );
  }

  public async mintUnbacked(
    asset: AccountAddress,
    amount: bigint,
    onBehalfOf: AccountAddress,
    referralCode: number,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.bridgeContract.MintUnbackedFuncAddr,
      [asset, amount.toString(), onBehalfOf, referralCode],
    );
  }
}
