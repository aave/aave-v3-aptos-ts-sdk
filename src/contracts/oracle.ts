import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

export class OracleContract {
  GetAssetPriceFuncAddr: MoveFunctionId;

  GetAssetsPricesFuncAddr: MoveFunctionId;

  SetAssetFeedIdFuncAddr: MoveFunctionId;

  BatchSetAssetFeedIdsFuncAddr: MoveFunctionId;

  RemoveAssetFeedIdFuncAddr: MoveFunctionId;

  RemoveAssetFeedIdsFuncAddr: MoveFunctionId;

  GetOracleResourceAccountFuncAddr: MoveFunctionId;

  GetOracleAddressFuncAddr: MoveFunctionId;

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
  }
}
