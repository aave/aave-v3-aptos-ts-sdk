import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

/**
 * AclManagerContract class provides methods to manage ACL (Access Control List) roles and permissions
 * within the AAVE protocol on the Aptos blockchain.
 *
 * @class AclManagerContract
 *
 * @property {MoveFunctionId} hasRoleFuncAddr - Address of the function to check if an account has a specific role.
 * @property {MoveFunctionId} grantRoleFuncAddr - Address of the function to grant a role to an account.
 * @property {MoveFunctionId} renounceRoleFuncAddr - Address of the function to renounce a role from an account.
 * @property {MoveFunctionId} revokeRoleFuncAddr - Address of the function to revoke a role from an account.
 * @property {MoveFunctionId} addPoolAdminFuncAddr - Address of the function to add a pool admin.
 * @property {MoveFunctionId} removePoolAdminFuncAddr - Address of the function to remove a pool admin.
 * @property {MoveFunctionId} isPoolAdminFuncAddr - Address of the function to check if an account is a pool admin.
 * @property {MoveFunctionId} addEmergencyAdminFuncAddr - Address of the function to add an emergency admin.
 * @property {MoveFunctionId} removeEmergencyAdminFuncAddr - Address of the function to remove an emergency admin.
 * @property {MoveFunctionId} isEmergencyAdminFuncAddr - Address of the function to check if an account is an emergency admin.
 * @property {MoveFunctionId} addRiskAdminFuncAddr - Address of the function to add a risk admin.
 * @property {MoveFunctionId} removeRiskAdminFuncAddr - Address of the function to remove a risk admin.
 * @property {MoveFunctionId} isRiskAdminFuncAddr - Address of the function to check if an account is a risk admin.
 * @property {MoveFunctionId} addFlashBorrowerFuncAddr - Address of the function to add a flash borrower.
 * @property {MoveFunctionId} removeFlashBorrowerFuncAddr - Address of the function to remove a flash borrower.
 * @property {MoveFunctionId} isFlashBorrowerFuncAddr - Address of the function to check if an account is a flash borrower.
 * @property {MoveFunctionId} addBridgeFuncAddr - Address of the function to add a bridge.
 * @property {MoveFunctionId} removeBridgeFuncAddr - Address of the function to remove a bridge.
 * @property {MoveFunctionId} isBridgeFuncAddr - Address of the function to check if an account is a bridge.
 * @property {MoveFunctionId} addAssetListingAdminFuncAddr - Address of the function to add an asset listing admin.
 * @property {MoveFunctionId} removeAssetListingAdminFuncAddr - Address of the function to remove an asset listing admin.
 * @property {MoveFunctionId} isAssetListingAdminFuncAddr - Address of the function to check if an account is an asset listing admin.
 * @property {MoveFunctionId} getPoolAdminRoleFuncAddr - Address of the function to get the pool admin role.
 * @property {MoveFunctionId} getEmergencyAdminRoleFuncAddr - Address of the function to get the emergency admin role.
 * @property {MoveFunctionId} getRiskAdminRoleFuncAddr - Address of the function to get the risk admin role.
 * @property {MoveFunctionId} getFlashBorrowerRoleFuncAddr - Address of the function to get the flash borrower role.
 * @property {MoveFunctionId} getBridgeRoleFuncAddr - Address of the function to get the bridge role.
 * @property {MoveFunctionId} getAssetListingAdminRoleFuncAddr - Address of the function to get the asset listing admin role.
 * @property {MoveFunctionId} defaultAdminRole - Address of the function to get the default admin role.
 * @property {MoveFunctionId} getRoleAdmin - Address of the function to get the admin role of a specific role.
 * @property {MoveFunctionId} setRoleAdmin - Address of the function to set the admin role of a specific role.
 *
 * @constructor
 * @param {AptosProvider} provider - The provider to interact with the Aptos blockchain.
 */
export class AclManagerContract {
  hasRoleFuncAddr: MoveFunctionId;
  grantRoleFuncAddr: MoveFunctionId;
  renounceRoleFuncAddr: MoveFunctionId;
  revokeRoleFuncAddr: MoveFunctionId;
  defaultAdminRole: MoveFunctionId;
  getRoleAdmin: MoveFunctionId;
  setRoleAdmin: MoveFunctionId;

  addPoolAdminFuncAddr: MoveFunctionId;
  removePoolAdminFuncAddr: MoveFunctionId;
  isPoolAdminFuncAddr: MoveFunctionId;
  getPoolAdminRoleFuncAddr: MoveFunctionId;

  addEmergencyAdminFuncAddr: MoveFunctionId;
  removeEmergencyAdminFuncAddr: MoveFunctionId;
  isEmergencyAdminFuncAddr: MoveFunctionId;
  getEmergencyAdminRoleFuncAddr: MoveFunctionId;

  addRiskAdminFuncAddr: MoveFunctionId;
  removeRiskAdminFuncAddr: MoveFunctionId;
  isRiskAdminFuncAddr: MoveFunctionId;
  getRiskAdminRoleFuncAddr: MoveFunctionId;

  addFlashBorrowerFuncAddr: MoveFunctionId;
  removeFlashBorrowerFuncAddr: MoveFunctionId;
  isFlashBorrowerFuncAddr: MoveFunctionId;
  getFlashBorrowerRoleFuncAddr: MoveFunctionId;

  addBridgeFuncAddr: MoveFunctionId;
  removeBridgeFuncAddr: MoveFunctionId;
  isBridgeFuncAddr: MoveFunctionId;
  getBridgeRoleFuncAddr: MoveFunctionId;

  addAssetListingAdminFuncAddr: MoveFunctionId;
  removeAssetListingAdminFuncAddr: MoveFunctionId;
  isAssetListingAdminFuncAddr: MoveFunctionId;
  getAssetListingAdminRoleFuncAddr: MoveFunctionId;

  addFundsAdminFuncAddr: MoveFunctionId;
  removeFundsAdminFuncAddr: MoveFunctionId;
  isFundsAdminFuncAddr: MoveFunctionId;
  getFundsAdminRoleFuncAddr: MoveFunctionId;

  addEmissionAdminFuncAddr: MoveFunctionId;
  removeEmissionAdminFuncAddr: MoveFunctionId;
  isEmissionAdminFuncAddr: MoveFunctionId;
  getEmissionAdminRoleFuncAddr: MoveFunctionId;

  addAdminControlledEcosystemReserveAdminFuncAddr: MoveFunctionId;
  removeAdminControlledEcosystemReserveAdminFuncAddr: MoveFunctionId;
  isAdminControlledEcosystemReserveAdminFuncAddr: MoveFunctionId;
  getAdminControlledEcosystemReserveAdminFuncAddr: MoveFunctionId;

  addRewardsControllerAdminFuncAddr: MoveFunctionId;
  removeRewardsControllerAdminFuncAddr: MoveFunctionId;
  isRewardsControllerAdminFuncAddr: MoveFunctionId;
  getRewardsControllerAdminFuncAddr: MoveFunctionId;

  /**
   * Constructs an instance of the ACL Manager with the provided AptosProvider.
   * Initializes various function addresses related to ACL management.
   *
   * @param provider - The AptosProvider instance used to get the profile address for AAVE_ACL.
   *
   * Properties initialized:
   * - `hasRoleFuncAddr`: Address for the `has_role` function.
   * - `grantRoleFuncAddr`: Address for the `grant_role` function.
   * - `renounceRoleFuncAddr`: Address for the `renounce_role` function.
   * - `revokeRoleFuncAddr`: Address for the `revoke_role` function.
   * - `addPoolAdminFuncAddr`: Address for the `add_pool_admin` function.
   * - `removePoolAdminFuncAddr`: Address for the `remove_pool_admin` function.
   * - `isPoolAdminFuncAddr`: Address for the `is_pool_admin` function.
   * - `addEmergencyAdminFuncAddr`: Address for the `add_emergency_admin` function.
   * - `removeEmergencyAdminFuncAddr`: Address for the `remove_emergency_admin` function.
   * - `isEmergencyAdminFuncAddr`: Address for the `is_emergency_admin` function.
   * - `addRiskAdminFuncAddr`: Address for the `add_risk_admin` function.
   * - `removeRiskAdminFuncAddr`: Address for the `remove_risk_admin` function.
   * - `isRiskAdminFuncAddr`: Address for the `is_risk_admin` function.
   * - `addFlashBorrowerFuncAddr`: Address for the `add_flash_borrower` function.
   * - `removeFlashBorrowerFuncAddr`: Address for the `remove_flash_borrower` function.
   * - `isFlashBorrowerFuncAddr`: Address for the `is_flash_borrower` function.
   * - `addBridgeFuncAddr`: Address for the `add_bridge` function.
   * - `removeBridgeFuncAddr`: Address for the `remove_bridge` function.
   * - `isBridgeFuncAddr`: Address for the `is_bridge` function.
   * - `addAssetListingAdminFuncAddr`: Address for the `add_asset_listing_admin` function.
   * - `removeAssetListingAdminFuncAddr`: Address for the `remove_asset_listing_admin` function.
   * - `isAssetListingAdminFuncAddr`: Address for the `is_asset_listing_admin` function.
   * - `getPoolAdminRoleFuncAddr`: Address for the `get_pool_admin_role` function.
   * - `getEmergencyAdminRoleFuncAddr`: Address for the `get_emergency_admin_role` function.
   * - `getRiskAdminRoleFuncAddr`: Address for the `get_risk_admin_role` function.
   * - `getFlashBorrowerRoleFuncAddr`: Address for the `get_flash_borrower_role` function.
   * - `getBridgeRoleFuncAddr`: Address for the `get_bridge_role` function.
   * - `getAssetListingAdminRoleFuncAddr`: Address for the `get_asset_listing_admin_role` function.
   * - `defaultAdminRole`: Address for the `default_admin_role`.
   * - `getRoleAdmin`: Address for the `get_role_admin` function.
   * - `setRoleAdmin`: Address for the `set_role_admin` function.
   */
  constructor(provider: AptosProvider) {
    const AclManager = provider.getProfileAddressByName(AAVE_PROFILES.AAVE_ACL);
    const AclManagerAccountAddress = AclManager.toString();
    this.hasRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::has_role`;
    this.grantRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::grant_role`;
    this.renounceRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::renounce_role`;
    this.revokeRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::revoke_role`;
    this.defaultAdminRole = `${AclManagerAccountAddress}::acl_manage::default_admin_role`;
    this.getRoleAdmin = `${AclManagerAccountAddress}::acl_manage::get_role_admin`;
    this.setRoleAdmin = `${AclManagerAccountAddress}::acl_manage::set_role_admin`;

    this.addPoolAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_pool_admin`;
    this.removePoolAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_pool_admin`;
    this.isPoolAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_pool_admin`;
    this.getPoolAdminRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_pool_admin_role`;

    this.addEmergencyAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_emergency_admin`;
    this.removeEmergencyAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_emergency_admin`;
    this.isEmergencyAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_emergency_admin`;
    this.getEmergencyAdminRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_emergency_admin_role`;

    this.addRiskAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_risk_admin`;
    this.removeRiskAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_risk_admin`;
    this.isRiskAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_risk_admin`;
    this.getRiskAdminRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_risk_admin_role`;

    this.addFlashBorrowerFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_flash_borrower`;
    this.removeFlashBorrowerFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_flash_borrower`;
    this.isFlashBorrowerFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_flash_borrower`;
    this.getFlashBorrowerRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_flash_borrower_role`;

    this.addBridgeFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_bridge`;
    this.removeBridgeFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_bridge`;
    this.isBridgeFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_bridge`;
    this.getBridgeRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_bridge_role`;

    this.addAssetListingAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_asset_listing_admin`;
    this.removeAssetListingAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_asset_listing_admin`;
    this.isAssetListingAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_asset_listing_admin`;
    this.getAssetListingAdminRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_asset_listing_admin_role`;

    this.addFundsAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_funds_admin`;
    this.removeFundsAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_funds_admin`;
    this.isFundsAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_funds_admin`;
    this.getFundsAdminRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_funds_admin_role`;

    this.addEmissionAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_emission_admin`;
    this.removeEmissionAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_emission_admin`;
    this.isEmissionAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_emission_admin`;
    this.getEmissionAdminRoleFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_emission_admin_role`;

    this.addAdminControlledEcosystemReserveAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_admin_controlled_ecosystem_reserve_funds_admin`;
    this.removeAdminControlledEcosystemReserveAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_admin_controlled_ecosystem_reserve_funds_admin`;
    this.isAdminControlledEcosystemReserveAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_admin_controlled_ecosystem_reserve_funds_admin`;
    this.getAdminControlledEcosystemReserveAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_admin_controlled_ecosystem_reserve_funds_admin_role`;

    this.addRewardsControllerAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::add_rewards_controller_admin`;
    this.removeRewardsControllerAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::remove_rewards_controller_admin`;
    this.isRewardsControllerAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::is_rewards_controller_admin`;
    this.getRewardsControllerAdminFuncAddr = `${AclManagerAccountAddress}::acl_manage::get_rewards_controller_admin_role`;
  }
}

export const FLASH_BORROW_ADMIN_ROLE = "FLASH_BORROWER";
