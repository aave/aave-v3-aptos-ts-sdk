import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AclManagerContract } from "../contracts/aclManage";
import { AptosProvider } from "./aptosProvider";

/**
 * Represents the AclClient class which provides methods to interact with the ACL (Access Control List) manager contract
 * within the AAVE protocol on the Aptos blockchain.
 *
 * @remarks
 * This client extends AptosContractWrapperBaseClass and provides a comprehensive set of methods for managing roles and permissions,
 * including core role management, pool administration, emergency controls, risk management, and various specialized admin roles.
 * Each method corresponds to a specific ACL operation in the AAVE protocol.
 *
 * The client can be instantiated in two ways:
 * 1. Using the constructor directly with a provider and optional signer
 * 2. Using the static buildWithDefaultSigner method which automatically configures the client with the provider's ACL profile account
 *
 * @example
 * ```typescript
 * // Using buildWithDefaultSigner
 * const provider = new AptosProvider();
 * const aclClient = AclClient.buildWithDefaultSigner(provider);
 *
 * // Using constructor directly
 * const provider = new AptosProvider();
 * const signer = provider.getAclProfileAccount();
 * const aclClient = new AclClient(provider, signer);
 *
 * // Check if an address has a specific role
 * const hasRole = await aclClient.hasRole("POOL_ADMIN", userAddress);
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 * @param signer - Optional Ed25519Account signer for transaction signing.
 */
export class AclClient extends AptosContractWrapperBaseClass {
  AclManagerContract: AclManagerContract;

  /**
   * Constructs an instance of AclClient.
   * @param provider - The AptosProvider instance.
   * @param signer - Optional Ed25519Account signer.
   */
  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.AclManagerContract = new AclManagerContract(provider);
  }

  /**
   * Creates an instance of AclClient using the default signer from the provided AptosProvider.
   *
   * @param provider - The AptosProvider instance to use for creating the AclClient.
   * @returns A new instance of AclClient.
   */
  public static buildWithDefaultSigner(provider: AptosProvider): AclClient {
    const client = new AclClient(provider, provider.getAclProfileAccount());
    return client;
  }

  /**
   * Checks if a user has a specific role.
   * @param role - The role to check.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a boolean indicating if the user has the role.
   */
  public async hasRole(role: string, user: AccountAddress): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.hasRoleFuncAddr,
      [role, user],
    );
    return resp as boolean;
  }

  /**
   * Grants a role to a user.
   * @param role - The role to grant.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async grantRole(
    role: string,
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.grantRoleFuncAddr,
      [role, user],
    );
  }

  /**
   * Renounces a role for a user.
   * @param role - The role to renounce.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async renounceRole(
    role: string,
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.grantRoleFuncAddr,
      [role, user],
    );
  }

  /**
   * Revokes a role from a user.
   * @param role - The role to revoke.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async revokeRole(
    role: string,
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.revokeRoleFuncAddr,
      [role, user],
    );
  }

  /**
   * Gets the default admin role.
   * @returns A promise that resolves to the default admin role as a string.
   */
  public async getDefaultAdminRole(): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.defaultAdminRole,
      [],
    );
    return resp as string;
  }

  /**
   * Gets the admin role for a specific role.
   * @param role - The role to get the admin role for.
   * @returns A promise that resolves to the admin role as a string.
   */
  public async getRoleAdmin(role: string): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.getRoleAdmin,
      [role],
    );
    return resp as string;
  }

  /**
   * Sets the admin role for a specific role.
   * @param role - The role to set the admin role for.
   * @param adminRole - The admin role to set.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async setRoleAdmin(
    role: string,
    adminRole: string,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(this.AclManagerContract.setRoleAdmin, [
      role,
      adminRole,
    ]);
  }

  /**
   * Adds a pool admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async addPoolAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.addPoolAdminFuncAddr,
      [user],
    );
  }

  /**
   * Removes a pool admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async removePoolAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.removePoolAdminFuncAddr,
      [user],
    );
  }

  /**
   * Checks if a user is a pool admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a boolean indicating if the user is a pool admin.
   */
  public async isPoolAdmin(user: AccountAddress): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.isPoolAdminFuncAddr,
      [user],
    );
    return resp as boolean;
  }

  /**
   * Gets the pool admin role.
   * @returns A promise that resolves to the pool admin role as a string.
   */
  public async getPoolAdminRole(): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.getPoolAdminRoleFuncAddr,
      [],
    );
    return resp as string;
  }

  /**
   * Adds an emergency admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async addEmergencyAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.addEmergencyAdminFuncAddr,
      [user],
    );
  }

  /**
   * Removes an emergency admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async removeEmergencyAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.removeEmergencyAdminFuncAddr,
      [user],
    );
  }

  /**
   * Checks if a user is an emergency admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a boolean indicating if the user is an emergency admin.
   */
  public async isEmergencyAdmin(user: AccountAddress): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.isEmergencyAdminFuncAddr,
      [user],
    );
    return resp as boolean;
  }

  /**
   * Gets the emergency admin role.
   * @returns A promise that resolves to the emergency admin role as a string.
   */
  public async getEmergencyAdminRole(): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.getEmergencyAdminRoleFuncAddr,
      [],
    );
    return resp as string;
  }

  /**
   * Adds a risk admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async addRiskAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.addRiskAdminFuncAddr,
      [user],
    );
  }

  /**
   * Removes a risk admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async removeRiskAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.removeRiskAdminFuncAddr,
      [user],
    );
  }

  /**
   * Checks if a user is a risk admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a boolean indicating if the user is a risk admin.
   */
  public async isRiskAdmin(user: AccountAddress): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.isRiskAdminFuncAddr,
      [user],
    );
    return resp as boolean;
  }

  /**
   * Gets the risk admin role.
   * @returns A promise that resolves to the risk admin role as a string.
   */
  public async getRiskAdminRole(): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.getRiskAdminRoleFuncAddr,
      [],
    );
    return resp as string;
  }

  /**
   * Adds a flash borrower.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async addFlashBorrower(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.addFlashBorrowerFuncAddr,
      [user],
    );
  }

  /**
   * Removes a flash borrower.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async removeFlashBorrower(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.removeFlashBorrowerFuncAddr,
      [user],
    );
  }

  /**
   * Checks if a user is a flash borrower.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a boolean indicating if the user is a flash borrower.
   */
  public async isFlashBorrower(user: AccountAddress): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.isFlashBorrowerFuncAddr,
      [user],
    );
    return resp as boolean;
  }

  /**
   * Gets the flash borrower role.
   * @returns A promise that resolves to the flash borrower role as a string.
   */
  public async getFlashBorrowerRole(): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.getFlashBorrowerRoleFuncAddr,
      [],
    );
    return resp as string;
  }

  /**
   * Adds a bridge.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async addBridge(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.addBridgeFuncAddr,
      [user],
    );
  }

  /**
   * Removes a bridge.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async removeBridge(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.removeBridgeFuncAddr,
      [user],
    );
  }

  /**
   * Checks if a user is a bridge.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a boolean indicating if the user is a bridge.
   */
  public async isBridge(user: AccountAddress): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.isBridgeFuncAddr,
      [user],
    );
    return resp as boolean;
  }

  /**
   * Gets the bridge role.
   * @returns A promise that resolves to the bridge role as a string.
   */
  public async getBridgeRole(): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.getBridgeRoleFuncAddr,
      [],
    );
    return resp as string;
  }

  /**
   * Adds an asset listing admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async addAssetListingAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.addAssetListingAdminFuncAddr,
      [user],
    );
  }

  /**
   * Removes an asset listing admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async removeAssetListingAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.removeAssetListingAdminFuncAddr,
      [user],
    );
  }

  /**
   * Checks if a user is an asset listing admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a boolean indicating if the user is an asset listing admin.
   */
  public async isAssetListingAdmin(user: AccountAddress): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.isAssetListingAdminFuncAddr,
      [user],
    );
    return resp as boolean;
  }

  /**
   * Gets the asset listing admin role.
   * @returns A promise that resolves to the asset listing admin role as a string.
   */
  public async getAssetListingAdminRole(): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.getAssetListingAdminRoleFuncAddr,
      [],
    );
    return resp as string;
  }

  /**
   * Adds a funds admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async addFundsAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.addFundsAdminFuncAddr,
      [user],
    );
  }

  /**
   * Removes a funds admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async removeFundsAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.removeFundsAdminFuncAddr,
      [user],
    );
  }

  /**
   * Checks if a user is a funds admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a boolean indicating if the user is a funds admin.
   */
  public async isFundsAdmin(user: AccountAddress): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.isFundsAdminFuncAddr,
      [user],
    );
    return resp as boolean;
  }

  /**
   * Gets the funds admin role.
   * @returns A promise that resolves to the funds admin role as a string.
   */
  public async getFundsAdminRole(): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.getFundsAdminRoleFuncAddr,
      [],
    );
    return resp as string;
  }

  /**
   * Adds an emission admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async addEmissionAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.addEmissionAdminFuncAddr,
      [user],
    );
  }

  /**
   * Removes an emissions admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async removeEmissionAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.removeEmissionAdminFuncAddr,
      [user],
    );
  }

  /**
   * Checks if a user is an emission admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a boolean indicating if the user is an emission admin.
   */
  public async isEmissionAdmin(user: AccountAddress): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.isEmissionAdminFuncAddr,
      [user],
    );
    return resp as boolean;
  }

  /**
   * Gets the emissions admin role.
   * @returns A promise that resolves to the emissions admin role as a string.
   */
  public async getEmissionAdminRole(): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.getEmissionAdminRoleFuncAddr,
      [],
    );
    return resp as string;
  }

  /**
   * Adds an admin controlled ecosystem reserve admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async addAdminControlledEcosystemReserveAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.addAdminControlledEcosystemReserveAdminFuncAddr,
      [user],
    );
  }

  /**
   * Removes an admin controlled ecosystem reserve admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async emoveAdminControlledEcosystemReserveAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract
        .removeAdminControlledEcosystemReserveAdminFuncAddr,
      [user],
    );
  }

  /**
   * Checks if a user is an admin controlled ecosystem reserve admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a boolean indicating if the user is an admin controlled ecosystem reserve admin.
   */
  public async isAdminControlledEcosystemReserveAdmin(
    user: AccountAddress,
  ): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.isAdminControlledEcosystemReserveAdminFuncAddr,
      [user],
    );
    return resp as boolean;
  }

  /**
   * Gets the admin controlled ecosystem reserve admin role.
   * @returns A promise that resolves to the admin controlled ecosystem reserve admin role as a string.
   */
  public async getAdminControlledEcosystemReserveAdmin(): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.getAdminControlledEcosystemReserveAdminFuncAddr,
      [],
    );
    return resp as string;
  }

  /**
   * Adds a rewards controller admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async addRewardsControllerAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.addRewardsControllerAdminFuncAddr,
      [user],
    );
  }

  /**
   * Removes a rewards controller admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async removeRewardsControllerAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.removeRewardsControllerAdminFuncAddr,
      [user],
    );
  }

  /**
   * Checks if a user is a rewards controller admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a boolean indicating if the user is a rewards controller admin.
   */
  public async isRewardsControllerAdminFunc(
    user: AccountAddress,
  ): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.isRewardsControllerAdminFuncAddr,
      [user],
    );
    return resp as boolean;
  }

  /**
   * Gets the rewards controller role.
   * @returns A promise that resolves to the rewards controller admin role as a string.
   */
  public async getRewardsControllerAdmin(): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.getRewardsControllerAdminFuncAddr,
      [],
    );
    return resp as string;
  }
}
