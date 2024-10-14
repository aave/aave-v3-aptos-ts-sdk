import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

export class AclManagerContract {
  // Resource Func Addr
  hasRoleFuncAddr: MoveFunctionId;

  grantRoleFuncAddr: MoveFunctionId;

  renounceRoleFuncAddr: MoveFunctionId;

  revokeRoleFuncAddr: MoveFunctionId;

  addPoolAdminFuncAddr: MoveFunctionId;

  AddPoolAdminFuncAddr: MoveFunctionId;

  removePoolAdminFuncAddr: MoveFunctionId;

  isPoolAdminFuncAddr: MoveFunctionId;

  addEmergencyAdminFuncAddr: MoveFunctionId;

  removeEmergencyAdminFuncAddr: MoveFunctionId;

  isEmergencyAdminFuncAddr: MoveFunctionId;

  addRiskAdminFuncAddr: MoveFunctionId;

  removeRiskAdminFuncAddr: MoveFunctionId;

  isRiskAdminFuncAddr: MoveFunctionId;

  addFlashBorrowerFuncAddr: MoveFunctionId;

  removeFlashBorrowerFuncAddr: MoveFunctionId;

  isFlashBorrowerFuncAddr: MoveFunctionId;

  addBridgeFuncAddr: MoveFunctionId;

  removeBridgeFuncAddr: MoveFunctionId;

  isBridgeFuncAddr: MoveFunctionId;

  addAssetListingAdminFuncAddr: MoveFunctionId;

  removeAssetListingAdminFuncAddr: MoveFunctionId;

  isAssetListingAdminFuncAddr: MoveFunctionId;

  getPoolAdminRoleFuncAddr: MoveFunctionId;

  getEmergencyAdminRoleFuncAddr: MoveFunctionId;

  getRiskAdminRoleFuncAddr: MoveFunctionId;

  getFlashBorrowerRoleFuncAddr: MoveFunctionId;

  getBridgeRoleFuncAddr: MoveFunctionId;

  getAssetListingAdminRoleFuncAddr: MoveFunctionId;

  grantDefaultAdminRole: MoveFunctionId;

  defaultAdminRole: MoveFunctionId;

  getRoleAdmin: MoveFunctionId;

  setRoleAdmin: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const AclManager = provider.getProfileAccountByName(AAVE_PROFILES.AAVE_ACL);
    const AclManagerAccountAddress = AclManager.toString();
    this.hasRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::has_role`;
    this.grantRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::grant_role`;
    this.renounceRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::renounce_role`;
    this.revokeRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::revoke_role`;
    this.addPoolAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_pool_admin`;
    this.removePoolAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_pool_admin`;
    this.isPoolAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_pool_admin`;
    this.addEmergencyAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_emergency_admin`;
    this.removeEmergencyAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_emergency_admin`;
    this.isEmergencyAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_emergency_admin`;
    this.addRiskAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_risk_admin`;
    this.removeRiskAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_risk_admin`;
    this.isRiskAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_risk_admin`;
    this.addFlashBorrowerFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_flash_borrower`;
    this.removeFlashBorrowerFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_flash_borrower`;
    this.isFlashBorrowerFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_flash_borrower`;
    this.addBridgeFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_bridge`;
    this.removeBridgeFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_bridge`;
    this.isBridgeFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_bridge`;
    this.addAssetListingAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_asset_listing_admin`;
    this.removeAssetListingAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_asset_listing_admin`;
    this.isAssetListingAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_asset_listing_admin`;
    this.getPoolAdminRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_pool_admin_role`;
    this.getEmergencyAdminRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_emergency_admin_role`;
    this.getRiskAdminRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_risk_admin_role`;
    this.getFlashBorrowerRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_flash_borrower_role`;
    this.getBridgeRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_bridge_role`;
    this.getAssetListingAdminRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_asset_listing_admin_role`;
    this.grantDefaultAdminRole = `${AclManagerAccountAddress}::acl_manage::grant_default_admin_role`;
    this.defaultAdminRole = `${AclManagerAccountAddress}::acl_manage::default_admin_role`;
    this.getRoleAdmin = `${AclManagerAccountAddress}::acl_manage::get_role_admin`;
    this.setRoleAdmin = `${AclManagerAccountAddress}::acl_manage::set_role_admin`;
  }
}

// Mock Account
export const FLASH_BORROW_ADMIN_ROLE = "FLASH_BORROWER";
