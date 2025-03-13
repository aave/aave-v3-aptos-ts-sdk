import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { PeripheryContract } from "../contracts/periphery";
import { Metadata } from "../helpers/interfaces";

export class TransferStrategyClient extends AptosContractWrapperBaseClass {
  peripheryContract: PeripheryContract;

  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.peripheryContract = new PeripheryContract(provider);
  }

  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): TransferStrategyClient {
    const client = new TransferStrategyClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }
}
