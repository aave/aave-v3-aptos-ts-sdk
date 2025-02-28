import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

export class OracleContract {
  GetAssetPriceFuncAddr: MoveFunctionId;

  GetAssetsPricesFuncAddr: MoveFunctionId;

  SetAssetFeedIdFuncAddr: MoveFunctionId;

  SetMockFeedIdFuncAddr: MoveFunctionId;

  SetMockPriceFuncAddr: MoveFunctionId;

  BatchSetAssetFeedIdsFuncAddr: MoveFunctionId;

  RemoveAssetFeedIdFuncAddr: MoveFunctionId;

  RemoveAssetFeedIdsFuncAddr: MoveFunctionId;

  GetOracleResourceAccountFuncAddr: MoveFunctionId;

  GetOracleAddressFuncAddr: MoveFunctionId;

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
   * - `GetAssetPriceFuncAddr`: Address for the `get_asset_price` function.
   * - `GetAssetsPricesFuncAddr`: Address for the `get_assets_prices` function.
   * - `SetAssetFeedIdFuncAddr`: Address for the `set_asset_feed_id` function.
   * - `BatchSetAssetFeedIdsFuncAddr`: Address for the `batch_set_asset_feed_ids` function.
   * - `RemoveAssetFeedIdFuncAddr`: Address for the `remove_asset_feed_id` function.
   * - `RemoveAssetFeedIdsFuncAddr`: Address for the `batch_remove_asset_feed_ids` function.
   * - `GetOracleResourceAccountFuncAddr`: Address for the `get_oracle_resource_account` function.
   * - `GetOracleAddressFuncAddr`: Address for the `oracle_address` function.
   */
  constructor(provider: AptosProvider) {
    const OracleManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_ORACLE,
    );
    const OracleManagerAccountAddress = OracleManager.toString();
    this.GetAssetPriceFuncAddr = `${OracleManagerAccountAddress}::oracle::get_asset_price`;
    this.GetAssetsPricesFuncAddr = `${OracleManagerAccountAddress}::oracle::get_assets_prices`;
    this.SetAssetFeedIdFuncAddr = `${OracleManagerAccountAddress}::oracle::set_asset_feed_id`;
    this.BatchSetAssetFeedIdsFuncAddr = `${OracleManagerAccountAddress}::oracle::batch_set_asset_feed_ids`;
    this.RemoveAssetFeedIdFuncAddr = `${OracleManagerAccountAddress}::oracle::remove_asset_feed_id`;
    this.RemoveAssetFeedIdsFuncAddr = `${OracleManagerAccountAddress}::oracle::batch_remove_asset_feed_ids`;
    this.GetOracleResourceAccountFuncAddr = `${OracleManagerAccountAddress}::oracle_base::get_oracle_resource_account`;
    this.GetOracleAddressFuncAddr = `${OracleManagerAccountAddress}::oracle_base::oracle_address`;
    this.SetMockFeedIdFuncAddr = `${OracleManagerAccountAddress}::oracle::set_chainlink_mock_feed`;
    this.SetMockPriceFuncAddr = `${OracleManagerAccountAddress}::oracle::set_chainlink_mock_price`;
  }
}
