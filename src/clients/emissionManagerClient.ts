import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
  MoveVector,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { PeripheryContract } from "../contracts/periphery";
import { Metadata } from "../helpers/interfaces";

/**
 * Represents the configuration for pulling rewards transfer strategy.
 *
 * @property {AccountAddress} rewardsAdmin - The address of the rewards admin.
 * @property {AccountAddress} incentivesController - The address of the incentives controller.
 * @property {AccountAddress} rewardsVault - The address of the rewards vault.
 */
export type PullRewardsTransferStrategy = {
  rewardsAdmin: AccountAddress;
  incentivesController: AccountAddress;
  rewardsVault: AccountAddress;
};

/**
 * Represents the input configuration for rewards.
 *
 * @property {bigint} emissionPerSecond - The emission rate per second.
 * @property {bigint} totalSupply - The total supply of the reward token.
 * @property {bigint} distributionEnd - The timestamp when distribution ends.
 * @property {AccountAddress} asset - The address of the asset.
 * @property {AccountAddress} reward - The address of the reward token.
 * @property {AccountAddress} pullRewardsTransferStrategy - The address of the pull rewards transfer strategy.
 */
export type RewardsConfigInput = {
  emissionPerSecond: bigint;
  totalSupply: bigint;
  distributionEnd: bigint;
  asset: AccountAddress;
  reward: AccountAddress;
  pullRewardsTransferStrategy: AccountAddress;
};

/**
 * The `EmissionManagerClient` class provides methods to interact with the emission management system
 * of the Aave protocol on the Aptos blockchain. It extends the `AptosContractWrapperBaseClass` and
 * includes functionalities for configuring rewards, managing emission rates, and controlling
 * distribution parameters.
 *
 * @remarks
 * This client is designed to work with the emission management contracts and provides a high-level API
 * for reward configuration and management. The client can be instantiated in two ways:
 * 1. Using the constructor directly with a provider and optional signer
 * 2. Using the static buildWithDefaultSigner method which automatically configures the client with the provider's pool profile account
 *
 * @example
 * ```typescript
 * // Using buildWithDefaultSigner
 * const provider = new AptosProvider();
 * const client = EmissionManagerClient.buildWithDefaultSigner(provider);
 *
 * // Using constructor directly
 * const provider = new AptosProvider();
 * const signer = provider.getPoolProfileAccount();
 * const client = new EmissionManagerClient(provider, signer);
 *
 * // Configure asset emissions
 * const tx = await client.configureAssets(
 *   [1000n], // emissionsPerSecond
 *   [2000n], // maxEmissionRates
 *   [1735689600n], // distributionEnds
 *   [assetAddress], // assets
 *   [rewardAddress], // rewards
 *   [strategyAddress] // pullRewardsTransferStrategies
 * );
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 * @param signer - Optional Ed25519Account signer for transaction signing.
 */
export class EmissionManagerClient extends AptosContractWrapperBaseClass {
  peripheryContract: PeripheryContract;

  /**
   * Creates an instance of EmissionManagerClient.
   *
   * @param provider - The Aptos blockchain provider.
   * @param signer - Optional Ed25519 account signer.
   */
  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.peripheryContract = new PeripheryContract(provider);
  }

  /**
   * Creates an instance of EmissionManagerClient using the default signer from the provided AptosProvider.
   *
   * @param provider - The AptosProvider instance to use for creating the EmissionManagerClient.
   * @returns A new instance of EmissionManagerClient.
   */
  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): EmissionManagerClient {
    const client = new EmissionManagerClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }

  /**
   * Gets the address of the emission manager
   *
   * @returns The address of the emission manager object
   */
  public async emissionManagerAddress(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.emissionManagerAddressFuncAddr,
      [],
    );
    return AccountAddress.fromString(resp as string);
  }

  /**
   * Gets the emission manager object
   *
   * @returns The emission manager object
   */
  public async emissionManagerObject(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.emissionManagerObjectFuncAddr,
      [],
    );
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  /**
   * Configures multiple assets with their emission parameters
   *
   * @param emissionsPerSecond The emission rates per second for each asset
   * @param maxEmissionRates The maximum emission rates for each asset
   * @param distributionEnds The distribution end timestamps for each asset
   * @param assets The addresses of the assets to configure
   * @param rewards The addresses of the rewards for each asset
   * @param pullRewardsTransferStrategies The transfer strategies for pulling rewards
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async configureAssets(
    emissionsPerSecond: Array<bigint>,
    maxEmissionRates: Array<bigint>,
    distributionEnds: Array<bigint>,
    assets: Array<AccountAddress>,
    rewards: Array<AccountAddress>,
    pullRewardsTransferStrategies: Array<AccountAddress>,
  ): Promise<CommittedTransactionResponse> {
    const expectedLength = emissionsPerSecond.length;
    if (
      maxEmissionRates.length !== expectedLength ||
      distributionEnds.length !== expectedLength ||
      assets.length !== expectedLength ||
      rewards.length !== expectedLength ||
      pullRewardsTransferStrategies.length !== expectedLength
    ) {
      throw new Error("All input arrays must have the same length");
    }
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.configureAssetsFuncAddr,
      [
        emissionsPerSecond,
        maxEmissionRates,
        distributionEnds,
        assets,
        rewards,
        pullRewardsTransferStrategies,
      ],
    );
  }

  /**
   * Sets the pull rewards transfer strategy for a reward,
   * Only callable by the emission admin for the reward
   *
   * @param reward The address of the reward
   * @param pullRewardsTransferStrategy The transfer strategy for pulling rewards
   * @returns A promise that resolves to a CommittedTransactionResponse
   */
  public async setPullRewardsTransferStrategy(
    reward: AccountAddress,
    pullRewardsTransferStrategy: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.setPullRewardsTransferStrategyFuncAddr,
      [reward, pullRewardsTransferStrategy],
    );
  }

  /**
   * Sets the distribution end timestamp for a reward on an asset,
   * Only callable by the emission admin for the reward
   *
   * @param asset The address of the asset
   * @param reward The address of the reward
   * @param newDistributionEnd The new distribution end timestamp
   * @returns A promise that resolves to a CommittedTransactionResponse
   */
  public async setDistributionEnd(
    asset: AccountAddress,
    reward: AccountAddress,
    newDistributionEnd: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.setDistributionEndFuncAddr,
      [asset, reward, newDistributionEnd],
    );
  }

  /**
   * Sets the emission rate per second for rewards on an asset,
   * Only callable by the emission admin for all rewards
   *
   * @param asset The address of the asset
   * @param rewards The addresses of the rewards
   * @param newEmissionsPerSecond The new emission rates per second
   * @returns A promise that resolves to a CommittedTransactionResponse
   */
  public async setEmissionPerSecond(
    asset: AccountAddress,
    rewards: Array<AccountAddress>,
    newEmissionsPerSecond: Array<bigint>,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.setEmissionPerSecondFuncAddr,
      [asset, rewards, newEmissionsPerSecond],
    );
  }

  /**
   * Sets a claimer for a user,
   * Only callable by the admin
   *
   * @param user The address of the user
   * @param claimer The address of the claimer
   * @returns A promise that resolves to a CommittedTransactionResponse
   */
  public async setClaimer(
    user: AccountAddress,
    claimer: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.setClaimerFuncAddr,
      [user, claimer],
    );
  }

  /**
   * Sets the emission admin for a reward,
   * Only callable by the admin
   *
   * @param reward The address of the reward
   * @param newAdmin The address of the new admin
   * @returns A promise that resolves to a CommittedTransactionResponse
   */
  public async setAdmissionAdmin(
    reward: AccountAddress,
    newAdmin: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.setEmissionAdminFuncAddr,
      [reward, newAdmin],
    );
  }

  /**
   * Sets the rewards controller address,
   * Only callable by the admin
   *
   * @param rewardsController - The new rewards controller address (optional)
   * @returns A promise that resolves to a CommittedTransactionResponse
   */
  public async setRewardsController(
    rewardsController?: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.peripheryContract.setRewardsControllerFuncAddr,
      [rewardsController],
    );
  }

  /**
   * Gets the emission admin for a reward
   *
   * @param reward The address of the reward
   * @returns The address of the emission admin
   */
  public async getEmissionAdmin(
    reward: AccountAddress,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.getEmissionAdminFuncAddr,
      [reward],
    );
    return AccountAddress.fromString(resp as string);
  }

  /**
   * Gets the rewards controller
   * @returns The address of the rewards controller (or undefined if not set)
   */
  public async getRewardsController(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.peripheryContract.getRewardsControllerFuncAddr,
      [],
    );
    return AccountAddress.fromString(resp as string);
  }
}
