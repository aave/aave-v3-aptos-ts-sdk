import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AclManagerContract } from "../contracts/acl_manage";
import { AptosProvider } from "./aptosProvider";

export class AclClient extends AptosContractWrapperBaseClass {
  AclManagerContract: AclManagerContract;

  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.AclManagerContract = new AclManagerContract(provider);
  }

  public async hasRole(role: string, user: AccountAddress): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.hasRoleFuncAddr,
      [role, user],
    );
    return resp as boolean;
  }

  public async grantRole(
    role: string,
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.grantRoleFuncAddr,
      [role, user],
    );
  }

  public async renounceRole(
    role: string,
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.grantRoleFuncAddr,
      [role, user],
    );
  }

  public async revokeRole(
    role: string,
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.revokeRoleFuncAddr,
      [role, user],
    );
  }

  public async addPoolAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.AddPoolAdminFuncAddr,
      [user],
    );
  }

  public async removePoolAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.removePoolAdminFuncAddr,
      [user],
    );
  }

  public async isPoolAdmin(user: AccountAddress): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.isPoolAdminFuncAddr,
      [user],
    );
    return resp as boolean;
  }

  public async addEmergencyAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.addEmergencyAdminFuncAddr,
      [user],
    );
  }

  public async removeEmergencyAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.removeEmergencyAdminFuncAddr,
      [user],
    );
  }

  public async isEmergencyAdmin(user: AccountAddress): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.isEmergencyAdminFuncAddr,
      [user],
    );
    return resp as boolean;
  }

  public async addRiskAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.addRiskAdminFuncAddr,
      [user],
    );
  }

  public async removeRiskAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.removeRiskAdminFuncAddr,
      [user],
    );
  }

  public async isRiskAdmin(user: AccountAddress): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.isRiskAdminFuncAddr,
      [user],
    );
    return resp as boolean;
  }

  public async addFlashBorrower(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.addFlashBorrowerFuncAddr,
      [user],
    );
  }

  public async removeFlashBorrower(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.removeFlashBorrowerFuncAddr,
      [user],
    );
  }

  public async isFlashBorrower(user: AccountAddress): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.isFlashBorrowerFuncAddr,
      [user],
    );
    return resp as boolean;
  }

  public async addBridge(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.addBridgeFuncAddr,
      [user],
    );
  }

  public async removeBridge(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.removeBridgeFuncAddr,
      [user],
    );
  }

  public async isBridge(user: AccountAddress): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.isBridgeFuncAddr,
      [user],
    );
    return resp as boolean;
  }

  public async addAssetListingAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.addAssetListingAdminFuncAddr,
      [user],
    );
  }

  public async removeAssetListingAdmin(
    user: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.removeAssetListingAdminFuncAddr,
      [user],
    );
  }

  public async isAssetListingAdmin(user: AccountAddress): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.isAssetListingAdminFuncAddr,
      [user],
    );
    return resp as boolean;
  }

  public async getPoolAdminRole(): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.getPoolAdminRoleFuncAddr,
      [],
    );
    return resp as string;
  }

  public async getEmergencyAdminRole(): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.getEmergencyAdminRoleFuncAddr,
      [],
    );
    return resp as string;
  }

  public async getRiskAdminRole(): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.getRiskAdminRoleFuncAddr,
      [],
    );
    return resp as string;
  }

  public async getFlashBorrowerRole(): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.getFlashBorrowerRoleFuncAddr,
      [],
    );
    return resp as string;
  }

  public async getBridgeRole(): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.getBridgeRoleFuncAddr,
      [],
    );
    return resp as string;
  }

  public async getAssetListingAdminRole(): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.getAssetListingAdminRoleFuncAddr,
      [],
    );
    return resp as string;
  }

  public async grantDefaultRoleAdmin(): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.AclManagerContract.grantDefaultAdminRole,
      [],
    );
  }

  public async getDefaultAdminRole(): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.defaultAdminRole,
      [],
    );
    return resp as string;
  }

  public async getRoleAdmin(role: string): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.AclManagerContract.getRoleAdmin,
      [role],
    );
    return resp as string;
  }

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
