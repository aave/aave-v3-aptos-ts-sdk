import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { PeripheryContract } from "../contracts/periphery";
import { Metadata } from "../helpers/interfaces";

/**
 * The `TransferStrategyClient` class provides methods to interact with the Transfer Strategy contract on the Aptos blockchain.
 * It extends the `AptosContractWrapperBaseClass` and includes functionalities for managing reward transfer strategies,
 * emergency withdrawals, and retrieving strategy-related data within the AAVE protocol.
 *
 * @remarks
 * This client is designed to work with the Transfer Strategy contract and provides a high-level API for managing reward
 * distribution strategies. The client can be instantiated in two ways:
 * 1. Using the constructor directly with a provider and optional signer
 * 2. Using the static buildWithDefaultSigner method which automatically configures the client with the provider's pool profile account
 *
 * @example
 * ```typescript
 * // Using buildWithDefaultSigner
 * const provider = new AptosProvider();
 * const client = TransferStrategyClient.buildWithDefaultSigner(provider);
 *
 * // Using constructor directly
 * const provider = new AptosProvider();
 * const signer = provider.getPoolProfileAccount();
 * const client = new TransferStrategyClient(provider, signer);
 *
 * // Create a new pull rewards transfer strategy
 * const tx = await client.createPullRewardsTransferStrategy(
 *   rewardsAdminAddress,
 *   incentivesControllerAddress,
 *   rewardsVaultAddress
 * );
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 * @param signer - Optional Ed25519Account signer for transaction signing.
 */
export class TransferStrategyClient extends AptosContractWrapperBaseClass {
  peripheryContract: PeripheryContract;

  /**
   * Creates an instance of TransferStrategyClient.
   *
   * @param provider - The Aptos blockchain provider.
   * @param signer - Optional Ed25519 account signer.
   */
  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.peripheryContract = new PeripheryContract(provider);
  }

  /**
   * Creates an instance of TransferStrategyClient using the default signer from the provided AptosProvider.
   *
   * @param provider - The AptosProvider instance to use for creating the TransferStrategyClient.
   * @returns A new instance of TransferStrategyClient.
   */
  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): TransferStrategyClient {
    const client = new TransferStrategyClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }

  /**
   * Creates a new pull rewards transfer strategy.
   *
   * @param rewardsAdmin - The address of the rewards admin
   * @param incentivesController - The address of the incentives controller
   * @param rewardsVault - The signer capability of the rewards vault
   * @returns A promise that resolves to a CommittedTransactionResponse
   * @throws Will throw an error if the sender is not an emission admin
   */
  public async createPullRewardsTransferStrategy(
    rewardsAdmin: AccountAddress,
    incentivesController: AccountAddress,
    rewardsVault: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.createPullRewardsTransferStrategyFuncAddr,
      [rewardsAdmin, incentivesController, rewardsVault],
    );
  }

  /**
   * Performs an emergency withdrawal of rewards from the transfer strategy.
   * Only the rewards admin can call this function.
   *
   * @param token - The address of the token to withdraw
   * @param to - The address to which tokens will be transferred
   * @param amount - The amount of tokens to transfer
   * @param strategy - The pull rewards transfer strategy object
   * @returns A promise that resolves to a CommittedTransactionResponse
   * @throws Will throw an error if the caller is not the rewards admin
   */
  public async pullRewardsTransferStrategyEmergencyWithdrawal(
    token: AccountAddress,
    to: AccountAddress,
    amount: bigint,
    strategy: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract
        .pullRewardsTransferStrategyEmergencyWithdrawalFuncAddr,
      [token, to, amount.toString(), strategy],
    );
  }

  /**
   * Gets the incentives controller address for a pull rewards transfer strategy.
   *
   * @param strategy - The pull rewards transfer strategy object
   * @returns A promise that resolves to the address of the incentives controller
   */
  public async pullRewardsTransferStrategyGetIncentivesController(
    strategy: AccountAddress,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract
        .pullRewardsTransferStrategyGetIncentivesControllerFuncAddr,
      [strategy],
    );
    return AccountAddress.fromString(resp as string);
  }

  /**
   * Gets the rewards admin address for a pull rewards transfer strategy.
   *
   * @param strategy - The pull rewards transfer strategy object
   * @returns A promise that resolves to the address of the rewards admin
   */
  public async pullRewardsTransferStrategyGetRewardsAdmin(
    strategy: AccountAddress,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.pullRewardsTransferStrategyGetRewardsAdminFuncAddr,
      [strategy],
    );
    return AccountAddress.fromString(resp as string);
  }

  /**
   * Gets the rewards vault address for a pull rewards transfer strategy.
   *
   * @param strategy - The pull rewards transfer strategy object
   * @returns A promise that resolves to the address of the rewards vault
   */
  public async pullRewardsTransferStrategyGetRewardsVault(
    strategy: AccountAddress,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.pullRewardsTransferStrategyGetRewardsVaultFuncAddr,
      [strategy],
    );
    return AccountAddress.fromString(resp as string);
  }
}
