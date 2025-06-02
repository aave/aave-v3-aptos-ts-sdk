import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

/**
 * Represents the AclManagerContract interface which defines the function addresses for managing ACL (Access Control List) roles and permissions
 * within the AAVE protocol on the Aptos blockchain.
 *
 * @remarks
 * This interface is used by the corresponding client classes to make actual calls to the blockchain.
 * The constructor initializes all function addresses by combining:
 * - The ACL manager's account address from the provider
 * - The module name (acl_manage)
 * - The specific function name
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const aclManager = new AclManagerContract(provider);
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 */
export class AclManagerContract {
  // Core role management functions
  hasRoleFuncAddr: MoveFunctionId;
  grantRoleFuncAddr: MoveFunctionId;
  renounceRoleFuncAddr: MoveFunctionId;
  revokeRoleFuncAddr: MoveFunctionId;
  defaultAdminRole: MoveFunctionId;
  getRoleAdmin: MoveFunctionId;
  setRoleAdmin: MoveFunctionId;

  // Pool management functions
  addPoolAdminFuncAddr: MoveFunctionId;
  removePoolAdminFuncAddr: MoveFunctionId;
  isPoolAdminFuncAddr: MoveFunctionId;
  getPoolAdminRoleFuncAddr: MoveFunctionId;

  // Emergency control functions
  addEmergencyAdminFuncAddr: MoveFunctionId;
  removeEmergencyAdminFuncAddr: MoveFunctionId;
  isEmergencyAdminFuncAddr: MoveFunctionId;
  getEmergencyAdminRoleFuncAddr: MoveFunctionId;

  // Risk management functions
  addRiskAdminFuncAddr: MoveFunctionId;
  removeRiskAdminFuncAddr: MoveFunctionId;
  isRiskAdminFuncAddr: MoveFunctionId;
  getRiskAdminRoleFuncAddr: MoveFunctionId;

  // Flash loan functions
  addFlashBorrowerFuncAddr: MoveFunctionId;
  removeFlashBorrowerFuncAddr: MoveFunctionId;
  isFlashBorrowerFuncAddr: MoveFunctionId;
  getFlashBorrowerRoleFuncAddr: MoveFunctionId;

  // Bridge functions
  addBridgeFuncAddr: MoveFunctionId;
  removeBridgeFuncAddr: MoveFunctionId;
  isBridgeFuncAddr: MoveFunctionId;
  getBridgeRoleFuncAddr: MoveFunctionId;

  // Asset listing functions
  addAssetListingAdminFuncAddr: MoveFunctionId;
  removeAssetListingAdminFuncAddr: MoveFunctionId;
  isAssetListingAdminFuncAddr: MoveFunctionId;
  getAssetListingAdminRoleFuncAddr: MoveFunctionId;

  // Funds management functions
  addFundsAdminFuncAddr: MoveFunctionId;
  removeFundsAdminFuncAddr: MoveFunctionId;
  isFundsAdminFuncAddr: MoveFunctionId;
  getFundsAdminRoleFuncAddr: MoveFunctionId;

  // Emission control functions
  addEmissionAdminFuncAddr: MoveFunctionId;
  removeEmissionAdminFuncAddr: MoveFunctionId;
  isEmissionAdminFuncAddr: MoveFunctionId;
  getEmissionAdminRoleFuncAddr: MoveFunctionId;

  // Ecosystem reserve functions
  addAdminControlledEcosystemReserveAdminFuncAddr: MoveFunctionId;
  removeAdminControlledEcosystemReserveAdminFuncAddr: MoveFunctionId;
  isAdminControlledEcosystemReserveAdminFuncAddr: MoveFunctionId;
  getAdminControlledEcosystemReserveAdminFuncAddr: MoveFunctionId;

  // Rewards controller functions
  addRewardsControllerAdminFuncAddr: MoveFunctionId;
  removeRewardsControllerAdminFuncAddr: MoveFunctionId;
  isRewardsControllerAdminFuncAddr: MoveFunctionId;
  getRewardsControllerAdminFuncAddr: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const AclManager = provider.getProfileAddressByName(AAVE_PROFILES.AAVE_ACL);
    const AclManagerAccountAddress = AclManager.toString();
    // Core role management functions
    this.hasRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::has_role`;
    this.grantRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::grant_role`;
    this.renounceRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::renounce_role`;
    this.revokeRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::revoke_role`;
    this.defaultAdminRole = `${AclManagerAccountAddress}::acl_manage::default_admin_role`;
    this.getRoleAdmin = `${AclManagerAccountAddress}::acl_manage::get_role_admin`;
    this.setRoleAdmin = `${AclManagerAccountAddress}::acl_manage::set_role_admin`;

    // Pool management functions
    this.addPoolAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_pool_admin`;
    this.removePoolAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_pool_admin`;
    this.isPoolAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_pool_admin`;
    this.getPoolAdminRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_pool_admin_role`;

    // Emergency control functions
    this.addEmergencyAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_emergency_admin`;
    this.removeEmergencyAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_emergency_admin`;
    this.isEmergencyAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_emergency_admin`;
    this.getEmergencyAdminRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_emergency_admin_role`;

    // Risk management functions
    this.addRiskAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_risk_admin`;
    this.removeRiskAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_risk_admin`;
    this.isRiskAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_risk_admin`;
    this.getRiskAdminRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_risk_admin_role`;

    // Flash loan functions
    this.addFlashBorrowerFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_flash_borrower`;
    this.removeFlashBorrowerFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_flash_borrower`;
    this.isFlashBorrowerFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_flash_borrower`;
    this.getFlashBorrowerRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_flash_borrower_role`;

    // Bridge functions
    this.addBridgeFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_bridge`;
    this.removeBridgeFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_bridge`;
    this.isBridgeFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_bridge`;
    this.getBridgeRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_bridge_role`;

    // Asset listing functions
    this.addAssetListingAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_asset_listing_admin`;
    this.removeAssetListingAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_asset_listing_admin`;
    this.isAssetListingAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_asset_listing_admin`;
    this.getAssetListingAdminRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_asset_listing_admin_role`;

    // Funds management functions
    this.addFundsAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_funds_admin`;
    this.removeFundsAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_funds_admin`;
    this.isFundsAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_funds_admin`;
    this.getFundsAdminRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_funds_admin_role`;

    // Emission control functions
    this.addEmissionAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_emission_admin`;
    this.removeEmissionAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_emission_admin`;
    this.isEmissionAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_emission_admin`;
    this.getEmissionAdminRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_emission_admin_role`;

    // Ecosystem reserve functions
    this.addAdminControlledEcosystemReserveAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_admin_controlled_ecosystem_reserve_funds_admin`;
    this.removeAdminControlledEcosystemReserveAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_admin_controlled_ecosystem_reserve_funds_admin`;
    this.isAdminControlledEcosystemReserveAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_admin_controlled_ecosystem_reserve_funds_admin`;
    this.getAdminControlledEcosystemReserveAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_admin_controlled_ecosystem_reserve_funds_admin_role`;

    // Rewards controller functions
    this.addRewardsControllerAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_rewards_controller_admin`;
    this.removeRewardsControllerAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_rewards_controller_admin`;
    this.isRewardsControllerAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_rewards_controller_admin`;
    this.getRewardsControllerAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_rewards_controller_admin_role`;
  }
}

export const FLASH_BORROW_ADMIN_ROLE = "FLASH_BORROWER";
