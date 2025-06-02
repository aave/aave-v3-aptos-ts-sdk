import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

/**
 * Represents the OracleContract interface which defines the function addresses for price oracle operations
 * within the AAVE protocol on the Aptos blockchain.
 *
 * @remarks
 * This interface is used by the corresponding client classes to make actual calls to the blockchain.
 * The constructor initializes all function addresses by combining:
 * - The oracle manager's account address from the provider
 * - The module name (oracle)
 * - The specific function name
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const oracle = new OracleContract(provider);
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 */
export class OracleContract {
  isAssetPriceCappedFuncAddr: MoveFunctionId;
  getAssetPriceFuncAddr: MoveFunctionId;
  getPriceCapFuncAddr: MoveFunctionId;
  getAssetsPricesFuncAddr: MoveFunctionId;
  setAssetFeedIdFuncAddr: MoveFunctionId;
  setPriceCapStableAdapter: MoveFunctionId;
  removePriceCapStableAdapter: MoveFunctionId;
  setAssetCustomPriceFuncAddr: MoveFunctionId;
  batchSetAssetFeedIdsFuncAddr: MoveFunctionId;
  batchSetAssetCustomPricesFuncAddr: MoveFunctionId;
  batchRemoveAssetCustomPricesFuncAddr: MoveFunctionId;
  removeAssetFeedIdFuncAddr: MoveFunctionId;
  removeAssetFeedIdsFuncAddr: MoveFunctionId;
  removeAssetCustomPriceFuncAddr: MoveFunctionId;
  getOracleAddressFuncAddr: MoveFunctionId;
  getAssetPriceDecimalsFuncAddr: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const OracleManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_ORACLE,
    );
    const OracleManagerAccountAddress = OracleManager.toString();
    this.isAssetPriceCappedFuncAddr = `${OracleManagerAccountAddress}::oracle::is_asset_price_capped`;
    this.getAssetPriceFuncAddr = `${OracleManagerAccountAddress}::oracle::get_asset_price`;
    this.getAssetPriceDecimalsFuncAddr = `${OracleManagerAccountAddress}::oracle::get_asset_price_decimals`;
    this.getPriceCapFuncAddr = `${OracleManagerAccountAddress}::oracle::get_price_cap`;
    this.getAssetsPricesFuncAddr = `${OracleManagerAccountAddress}::oracle::get_assets_prices`;
    this.setPriceCapStableAdapter = `${OracleManagerAccountAddress}::oracle::set_price_cap_stable_adapter`;
    this.removePriceCapStableAdapter = `${OracleManagerAccountAddress}::oracle::remove_price_cap_stable_adapter`;
    this.setAssetFeedIdFuncAddr = `${OracleManagerAccountAddress}::oracle::set_asset_feed_id`;
    this.batchSetAssetFeedIdsFuncAddr = `${OracleManagerAccountAddress}::oracle::batch_set_asset_feed_ids`;
    this.batchSetAssetCustomPricesFuncAddr = `${OracleManagerAccountAddress}::oracle::batch_set_asset_custom_prices`;
    this.removeAssetFeedIdFuncAddr = `${OracleManagerAccountAddress}::oracle::remove_asset_feed_id`;
    this.removeAssetFeedIdsFuncAddr = `${OracleManagerAccountAddress}::oracle::batch_remove_asset_feed_ids`;
    this.removeAssetCustomPriceFuncAddr = `${OracleManagerAccountAddress}::oracle::remove_asset_custom_price`;
    this.getOracleAddressFuncAddr = `${OracleManagerAccountAddress}::oracle::oracle_address`;
    this.setAssetCustomPriceFuncAddr = `${OracleManagerAccountAddress}::oracle::set_asset_custom_price`;
    this.batchRemoveAssetCustomPricesFuncAddr = `${OracleManagerAccountAddress}::oracle::batch_remove_asset_custom_prices`;
  }
}
