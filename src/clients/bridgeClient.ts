import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { BridgeContract } from "../contracts/bridge";
import { AptosProvider } from "./aptosProvider";

/**
 * The `BridgeClient` class provides methods to interact with the bridge contract on the Aptos blockchain.
 * It extends the `AptosContractWrapperBaseClass` and includes functionalities to back unbacked assets
 * and mint unbacked tokens.
 */
export class BridgeClient extends AptosContractWrapperBaseClass {
  bridgeContract: BridgeContract;

  /**
   * Creates an instance of BridgeClient.
   *
   * @param provider - The Aptos blockchain provider.
   * @param signer - Optional Ed25519 account signer.
   */
  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.bridgeContract = new BridgeContract(provider);
  }

  /**
   * Creates an instance of `BridgeClient` using the default signer provided by the `AptosProvider`.
   *
   * @param provider - The `AptosProvider` instance used to create the `BridgeClient`.
   * @returns A new instance of `BridgeClient` initialized with the default signer.
   */
  public static buildWithDefaultSigner(provider: AptosProvider): BridgeClient {
    const client = new BridgeClient(provider, provider.getPoolProfileAccount());
    return client;
  }

  /**
   * Initiates a transaction to back unbacked assets.
   *
   * @param asset - The address of the asset to be backed.
   * @param amount - The amount of the asset to be backed, represented as a bigint.
   * @param fee - The fee associated with the transaction, represented as a bigint.
   * @returns A promise that resolves to a CommittedTransactionResponse once the transaction is committed.
   */
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

  /**
   * Mints unbacked tokens for a specified asset.
   *
   * @param asset - The address of the asset to mint.
   * @param amount - The amount of the asset to mint, represented as a bigint.
   * @param onBehalfOf - The address on whose behalf the asset is being minted.
   * @param referralCode - A referral code for tracking purposes.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
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
