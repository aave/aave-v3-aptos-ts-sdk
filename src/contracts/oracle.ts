import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

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

  /**
   * Constructs an instance of the Oracle class.
   *
   * @param provider - An instance of `AptosProvider` used to interact with the Aptos blockchain.
   *
   * This constructor initializes various function addresses related to the Oracle contract by
   * fetching the OracleManager's account address from the provider and constructing the full
   * function addresses for different oracle operations.
   *
   * The following function addresses are initialized:
   * - `getAssetPriceFuncAddr`: Address for the `get_asset_price` function.
   * - `getAssetsPricesFuncAddr`: Address for the `get_assets_prices` function.
   * - `setAssetFeedIdFuncAddr`: Address for the `set_asset_feed_id` function.
   * - `batchSetAssetFeedIdsFuncAddr`: Address for the `batch_set_asset_feed_ids` function.
   * - `removeAssetFeedIdFuncAddr`: Address for the `remove_asset_feed_id` function.
   * - `removeAssetFeedIdsFuncAddr`: Address for the `batch_remove_asset_feed_ids` function.
   * - `getOracleResourceAccountFuncAddr`: Address for the `get_oracle_resource_account` function.
   * - `getOracleAddressFuncAddr`: Address for the `oracle_address` function.
   */
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
