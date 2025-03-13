import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AclManagerContract } from "../contracts/aclManage";
import { AptosProvider } from "./aptosProvider";

/**
 * AclClient class provides methods to interact with the ACL (Access Control List) manager contract.
 * It extends the AptosContractWrapperBaseClass and provides various methods to manage roles and permissions.
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
   * Builds an AclClient instance with the default signer.
   * @param provider - The AptosProvider instance.
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
   * Adds a pool admin.
   * @param user - The account address of the user.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async addPoolAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.AddPoolAdminFuncAddr,
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
}
