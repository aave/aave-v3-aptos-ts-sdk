import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { PoolContract } from "../contracts/pool";
import { mapToBigInt } from "../helpers/common";

/**
 * Represents the configuration map for a reserve.
 *
 * @typedef {Object} ReserveConfigurationMap
 * @property {number} data - The data associated with the reserve configuration.
 */
export type ReserveConfigurationMap = {
  data: number;
};

/**
 * Represents the configuration map for a user.
 *
 * @property {number} data - The data associated with the user's configuration.
 */
export type UserConfigurationMap = {
  data: number;
};

/**
 * Represents the data associated with a token.
 */
export interface TokenData {
  symbol: string;
  tokenAddress: AccountAddress;
}

/**
 * Interface representing the reserve data of a user.
 */
export interface UserReserveData {
  currentATokenBalance: bigint;
  currentVariableDebt: bigint;
  scaledVariableDebt: bigint;
  liquidityRate: bigint;
  usageAsCollateralEnabled: boolean;
}

/**
 * Represents the data structure for a reserve in the Aave V3 protocol.
 */
export type ReserveData = {
  /**
   * Stores the reserve configuration.
   * @type {Object} configuration - The configuration object containing data.
   * @property {number} data - The configuration data.
   */
  configuration: { data: number };

  /**
   * The liquidity index, expressed in ray.
   * @type {number}
   */
  liquidityIndex: number;

  /**
   * The current supply rate, expressed in ray.
   * @type {bigint}
   */
  currentLiquidityRate: bigint;

  /**
   * The variable borrow index, expressed in ray.
   * @type {bigint}
   */
  variableBorrowIndex: bigint;

  /**
   * The current variable borrow rate, expressed in ray.
   * @type {bigint}
   */
  currentVariableBorrowRate: bigint;

  /**
   * The timestamp of the last update.
   * @type {number}
   */
  lastUpdateTimestamp: number;

  /**
   * The ID of the reserve, representing the position in the list of active reserves.
   * @type {number}
   */
  id: number;

  /**
   * The address of the aToken.
   * @type {AccountAddress}
   */
  aTokenAddress: AccountAddress;

  /**
   * The address of the stable debt token.
   * @type {AccountAddress}
   */
  stableDebtTokenAddress: AccountAddress;

  /**
   * The address of the variable debt token.
   * @type {AccountAddress}
   */
  variableDebtTokenAddress: AccountAddress;

  /**
   * The current treasury balance, scaled.
   * @type {bigint}
   */
  accruedToTreasury: bigint;

  /**
   * The outstanding unbacked aTokens minted through the bridging feature.
   * @type {bigint}
   */
  unbacked: bigint;

  /**
   * The outstanding debt borrowed against this asset in isolation mode.
   * @type {bigint}
   */
  isolationModeTotalDebt: bigint;
};

/**
 * Represents the reserve data structure for Aave V3 on Aptos.
 *
 * @typedef {Object} ReserveData2
 * @property {bigint} reserveUnbacked - The amount of unbacked reserves.
 * @property {bigint} reserveAccruedToTreasury - The amount of reserves accrued to the treasury.
 * @property {bigint} aTokenSupply - The total supply of aTokens.
 * @property {bigint} varTokenSupply - The total supply of variable debt tokens.
 * @property {bigint} reserveCurrentLiquidityRate - The current liquidity rate of the reserve.
 * @property {bigint} reserveCurrentVariableBorrowRate - The current variable borrow rate of the reserve.
 * @property {bigint} reserveLiquidityIndex - The liquidity index of the reserve.
 * @property {bigint} reserveVarBorrowIndex - The variable borrow index of the reserve.
 * @property {bigint} reserveLastUpdateTimestamp - The timestamp of the last update to the reserve data.
 */
export type ReserveData2 = {
  reserveUnbacked: bigint;
  reserveAccruedToTreasury: bigint;
  aTokenSupply: bigint;
  varTokenSupply: bigint;
  reserveCurrentLiquidityRate: bigint;
  reserveCurrentVariableBorrowRate: bigint;
  reserveLiquidityIndex: bigint;
  reserveVarBorrowIndex: bigint;
  reserveLastUpdateTimestamp: bigint;
};

/**
 * Represents the configuration data for a reserve in the Aave protocol.
 *
 * @typedef {Object} ReserveConfigurationData
 * @property {bigint} decimals - The number of decimals for the reserve's asset.
 * @property {bigint} ltv - The loan-to-value ratio for the reserve.
 * @property {bigint} liquidationThreshold - The threshold at which the reserve can be liquidated.
 * @property {bigint} liquidationBonus - The bonus applied during liquidation.
 * @property {bigint} reserveFactor - The reserve factor for the reserve.
 * @property {boolean} usageAsCollateralEnabled - Indicates if the reserve can be used as collateral.
 * @property {boolean} borrowingEnabled - Indicates if borrowing is enabled for the reserve.
 * @property {boolean} isActive - Indicates if the reserve is active.
 * @property {boolean} isFrozen - Indicates if the reserve is frozen.
 */
export type ReserveConfigurationData = {
  decimals: bigint;
  ltv: bigint;
  liquidationThreshold: bigint;
  liquidationBonus: bigint;
  reserveFactor: bigint;
  usageAsCollateralEnabled: boolean;
  borrowingEnabled: boolean;
  isActive: boolean;
  isFrozen: boolean;
};

export class PoolClient extends AptosContractWrapperBaseClass {
  poolContract: PoolContract;

  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.poolContract = new PoolContract(provider);
  }

  /**
   * Creates an instance of `PoolClient` using the default signer provided by the `AptosProvider`.
   *
   * @param provider - An instance of `AptosProvider` which provides the necessary configurations and signer.
   * @returns A new instance of `PoolClient` initialized with the default signer.
   */
  public static buildWithDefaultSigner(provider: AptosProvider): PoolClient {
    const client = new PoolClient(provider, provider.getPoolProfileAccount());
    return client;
  }

  /**
   * Mints assets to the treasury.
   *
   * @param assets - An array of account addresses representing the assets to be minted to the treasury.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async mintToTreasury(
    assets: Array<AccountAddress>,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolMintToTreasuryFuncAddr,
      [assets],
    );
  }

  /**
   * Resets the total debt for an asset in isolation mode.
   *
   * @param asset - The account address of the asset for which the total debt is to be reset.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async resetIsolationModeTotalDebt(
    asset: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolResetIsolationModeTotalDebtFuncAddr,
      [asset],
    );
  }

  /**
   * Rescues tokens from the pool contract and sends them to a specified address.
   *
   * @param token - The address of the token to be rescued.
   * @param to - The address to which the rescued tokens will be sent.
   * @param amount - The amount of tokens to be rescued.
   * @returns A promise that resolves to the response of the committed transaction.
   */
  public async rescueTokens(
    token: AccountAddress,
    to: AccountAddress,
    amount: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolRescueTokensFuncAddr,
      [token, to, amount.toString()],
    );
  }

  /**
   * Sets the bridge protocol fee for the pool.
   *
   * @param protocolFee - The new protocol fee to be set, represented as a bigint.
   * @returns A promise that resolves to a CommittedTransactionResponse once the transaction is committed.
   */
  public async setBridgeProtocolFee(
    protocolFee: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolSetBridgeProtocolFeeFuncAddr,
      [protocolFee.toString()],
    );
  }

  /**
   * Sets the flashloan premiums for the pool.
   *
   * @param flashloanPremiumTotal - The total premium for the flashloan as a bigint.
   * @param flashloanPremiumToProtocol - The portion of the premium that goes to the protocol as a bigint.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async setFlashloanPremiums(
    flashloanPremiumTotal: bigint,
    flashloanPremiumToProtocol: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolSetFlashloanPremiumsFuncAddr,
      [flashloanPremiumTotal.toString(), flashloanPremiumToProtocol.toString()],
    );
  }

  /**
   * Retrieves the revision number of the pool contract.
   *
   * @returns {Promise<number>} A promise that resolves to the revision number of the pool contract.
   */
  public async getRevision(): Promise<number> {
    const [resp] = await this.callViewMethod(
      this.poolContract.PoolGetRevisionFuncAddr,
      [],
    );
    return resp as number;
  }

  /**
   * Retrieves the reserve configuration for a given asset.
   *
   * @param asset - The address of the asset for which to get the reserve configuration.
   * @returns A promise that resolves to the reserve configuration map of the specified asset.
   */
  public async getReserveConfiguration(
    asset: AccountAddress,
  ): Promise<ReserveConfigurationMap> {
    const [resp] = await this.callViewMethod(
      this.poolContract.PoolGetReserveConfigurationFuncAddr,
      [asset],
    );
    return resp as ReserveConfigurationMap;
  }

  /**
   * Retrieves the reserve data for a given asset.
   *
   * @param asset - The address of the asset for which to retrieve reserve data.
   * @returns A promise that resolves to the reserve data of the specified asset.
   */
  public async getReserveData(asset: AccountAddress): Promise<ReserveData> {
    const resp = await this.callViewMethod(
      this.poolContract.PoolGetReserveDataFuncAddr,
      [asset],
    );

    const respRaw = resp.at(0) as any;
    const reserveData = {
      configuration: respRaw.configuration as { data: number },
      liquidityIndex: respRaw.liquidity_index as number,
      currentLiquidityRate: BigInt(respRaw.current_liquidity_rate.toString()),
      variableBorrowIndex: BigInt(respRaw.variable_borrow_index.toString()),
      currentVariableBorrowRate: BigInt(
        respRaw.current_variable_borrow_rate.toString(),
      ),
      lastUpdateTimestamp: respRaw.last_update_timestamp as number,
      id: respRaw.id as number,
      variableDebtTokenAddress: AccountAddress.fromString(
        respRaw.variable_debt_token_address as string,
      ),
      accruedToTreasury: BigInt(respRaw.accrued_to_treasury.toString()),
      unbacked: BigInt(respRaw.unbacked.toString()),
      isolationModeTotalDebt: BigInt(
        respRaw.isolation_mode_total_debt.toString(),
      ),
    } as ReserveData;

    return reserveData;
  }

  /**
   * Retrieves reserve data and the count of reserves for a given asset.
   *
   * @param asset - The account address of the asset.
   * @returns A promise that resolves to an object containing the reserve data and the count of reserves.
   * @throws Will throw an error if the view method call fails.
   */
  public async getReserveDataAndReservesCount(
    asset: AccountAddress,
  ): Promise<{ reserveData: ReserveData; count: number }> {
    const resp = await this.callViewMethod(
      this.poolContract.GetReserveDataAndReservesCountFuncAddr,
      [asset],
    );
    const respRaw = resp.at(0) as any;
    const reserveData = {
      configuration: respRaw.configuration as { data: number },
      liquidityIndex: respRaw.liquidity_index as number,
      currentLiquidityRate: BigInt(respRaw.current_liquidity_rate.toString()),
      variableBorrowIndex: BigInt(respRaw.variable_borrow_index.toString()),
      currentVariableBorrowRate: BigInt(
        respRaw.current_variable_borrow_rate.toString(),
      ),
      lastUpdateTimestamp: respRaw.last_update_timestamp as number,
      id: respRaw.id as number,
      variableDebtTokenAddress: AccountAddress.fromString(
        respRaw.variable_debt_token_address as string,
      ),
      accruedToTreasury: BigInt(respRaw.accrued_to_treasury.toString()),
      unbacked: BigInt(respRaw.unbacked.toString()),
      isolationModeTotalDebt: BigInt(
        respRaw.isolation_mode_total_debt.toString(),
      ),
    } as ReserveData;

    return { reserveData, count: resp[1] as number };
  }

  /**
   * Retrieves the count of reserves from the pool contract.
   *
   * @returns {Promise<bigint>} A promise that resolves to the count of reserves as a bigint.
   */
  public async getReservesCount(): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.PoolGetReservesCountFuncAddr,
        [],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the list of reserve accounts from the pool contract.
   *
   * @returns {Promise<Array<AccountAddress>>} A promise that resolves to an array of AccountAddress objects representing the reserve accounts.
   */
  public async getReservesList(): Promise<Array<AccountAddress>> {
    const resp = (
      (
        await this.callViewMethod(
          this.poolContract.PoolGetReservesListFuncAddr,
          [],
        )
      ).at(0) as Array<unknown>
    ).map((item) => AccountAddress.fromString(item as string));
    return resp;
  }

  /**
   * Retrieves the reserve address associated with a given ID.
   *
   * @param id - The ID of the reserve to retrieve the address for.
   * @returns A promise that resolves to the `AccountAddress` of the reserve.
   */
  public async getReserveAddressById(id: number): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.poolContract.PoolGetReserveAddressByIdFuncAddr,
      [id],
    );
    return AccountAddress.fromString(resp as string);
  }

  /**
   * Retrieves the normalized variable debt for a given reserve asset.
   *
   * @param asset - The address of the reserve asset.
   * @returns A promise that resolves to the normalized variable debt as a bigint.
   */
  public async getReserveNormalizedVariableDebt(
    asset: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.PoolGetReserveNormalizedVariableDebtFuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the normalized income for a given reserve asset.
   *
   * @param asset - The address of the reserve asset.
   * @returns A promise that resolves to the normalized income of the reserve asset as a bigint.
   */
  public async getReserveNormalizedIncome(
    asset: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.PoolGetReserveNormalizedIncomeFuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the user configuration for a given account.
   *
   * @param account - The address of the account to retrieve the configuration for.
   * @returns A promise that resolves to the user's configuration map.
   */
  public async getUserConfiguration(
    account: AccountAddress,
  ): Promise<UserConfigurationMap> {
    const [resp] = await this.callViewMethod(
      this.poolContract.PoolGetUserConfigurationFuncAddr,
      [account],
    );
    return resp as UserConfigurationMap;
  }

  /**
   * Retrieves the bridge protocol fee from the pool contract.
   *
   * @returns {Promise<bigint>} A promise that resolves to the bridge protocol fee as a bigint.
   */
  public async getBridgeProtocolFee(): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.PoolGetBridgeProtocolFeeFuncAddr,
        [],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the total flashloan premium from the pool contract.
   *
   * This method calls the `PoolGetFlashloanPremiumTotalFuncAddr` function on the pool contract
   * and maps the response to a bigint.
   *
   * @returns {Promise<bigint>} A promise that resolves to the total flashloan premium as a bigint.
   */
  public async getFlashloanPremiumTotal(): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.PoolGetFlashloanPremiumTotalFuncAddr,
        [],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the flashloan premium to the protocol.
   *
   * This method calls a view function on the pool contract to get the flashloan premium
   * that is allocated to the protocol. The result is mapped to a bigint and returned.
   *
   * @returns {Promise<bigint>} A promise that resolves to the flashloan premium as a bigint.
   */
  public async getFlashloanPremiumToProtocol(): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.PoolGetFlashloanPremiumToProtocolFuncAddr,
        [],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the maximum number of reserves allowed in the pool.
   *
   * @returns {Promise<bigint>} A promise that resolves to the maximum number of reserves as a bigint.
   */
  public async getMaxNumberReserves(): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.PoolMaxNumberReservesFuncAddr,
        [],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Initializes the reserves in the pool.
   *
   * @param underlyingAsset - An array of account addresses representing the underlying assets.
   * @param treasury - An array of account addresses representing the treasury.
   * @param aTokenName - An array of strings representing the names of the aTokens.
   * @param aTokenSymbol - An array of strings representing the symbols of the aTokens.
   * @param variableDebtTokenName - An array of strings representing the names of the variable debt tokens.
   * @param variableDebtTokenSymbol - An array of strings representing the symbols of the variable debt tokens.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async initReserves(
    underlyingAsset: Array<AccountAddress>,
    treasury: Array<AccountAddress>,
    aTokenName: Array<string>,
    aTokenSymbol: Array<string>,
    variableDebtTokenName: Array<string>,
    variableDebtTokenSymbol: Array<string>,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorInitReservesFuncAddr,
      [
        underlyingAsset,
        treasury,
        aTokenName,
        aTokenSymbol,
        variableDebtTokenName,
        variableDebtTokenSymbol,
      ],
    );
  }

  /**
   * Drops a reserve from the pool.
   *
   * @param asset - The account address of the asset to be dropped.
   * @returns A promise that resolves to the committed transaction response.
   */
  public async dropReserve(
    asset: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorDropReserveFuncAddr,
      [asset],
    );
  }

  /**
   * Sets the eMode category for a specific asset.
   *
   * @param asset - The address of the asset for which the eMode category is being set.
   * @param newCategoryId - The new eMode category ID to be assigned to the asset.
   * @returns A promise that resolves to the response of the committed transaction.
   */
  public async setAssetEmodeCategory(
    asset: AccountAddress,
    newCategoryId: number,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetAssetEmodeCategoryFuncAddr,
      [asset, newCategoryId],
    );
  }

  /**
   * Sets the borrow cap for a specific asset.
   *
   * @param asset - The address of the asset for which the borrow cap is being set.
   * @param newBorrowCap - The new borrow cap value to be set for the asset.
   * @returns A promise that resolves to the response of the committed transaction.
   */
  public async setBorrowCap(
    asset: AccountAddress,
    newBorrowCap: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetBorrowCapFuncAddr,
      [asset, newBorrowCap.toString()],
    );
  }

  /**
   * Sets whether a specific asset is borrowable in isolation mode.
   *
   * @param asset - The address of the asset to be configured.
   * @param borrowable - A boolean indicating if the asset should be borrowable in isolation.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async setBorrowableInIsolation(
    asset: AccountAddress,
    borrowable: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetBorrowableInIsolationFuncAddr,
      [asset, borrowable],
    );
  }

  /**
   * Sets the eMode category for the pool.
   *
   * @param categoryId - The ID of the eMode category.
   * @param ltv - The loan-to-value ratio for the category.
   * @param liquidationThreshold - The liquidation threshold for the category.
   * @param liquidationBonus - The liquidation bonus for the category.
   * @param oracle - The oracle account address.
   * @param label - The label for the eMode category.
   * @returns A promise that resolves to the committed transaction response.
   */
  public async setEmodeCategory(
    categoryId: number,
    ltv: number,
    liquidationThreshold: number,
    liquidationBonus: number,
    oracle: AccountAddress,
    label: string,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetEmodeCategoryFuncAddr,
      [categoryId, ltv, liquidationThreshold, liquidationBonus, oracle, label],
    );
  }

  /**
   * Sets the liquidation protocol fee for a given asset.
   *
   * @param asset - The address of the asset for which the liquidation protocol fee is being set.
   * @param newFee - The new liquidation protocol fee to be set, represented as a bigint.
   * @returns A promise that resolves to a CommittedTransactionResponse once the transaction is committed.
   */
  public async setLiquidationProtocolFee(
    asset: AccountAddress,
    newFee: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetLiquidationProtocolFeeFuncAddr,
      [asset, newFee.toString()],
    );
  }

  /**
   * Pauses or unpauses the pool.
   *
   * @param paused - A boolean indicating whether to pause (true) or unpause (false) the pool.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async setPoolPause(
    paused: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetPoolPauseFuncAddr,
      [paused],
    );
  }

  /**
   * Sets the active status of a reserve.
   *
   * @param asset - The address of the asset's account.
   * @param active - A boolean indicating whether the reserve should be active (true) or inactive (false).
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async setReserveActive(
    asset: AccountAddress,
    active: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetReserveActiveFuncAddr,
      [asset, active],
    );
  }

  /**
   * Sets the borrowing status for a specific reserve asset.
   *
   * @param asset - The address of the asset for which borrowing is being enabled or disabled.
   * @param enabled - A boolean indicating whether borrowing should be enabled (true) or disabled (false) for the specified asset.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object once the transaction is committed.
   */
  public async setReserveBorrowing(
    asset: AccountAddress,
    enabled: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetReserveBorrowingFuncAddr,
      [asset, enabled],
    );
  }

  /**
   * Sets the debt ceiling for a specific asset.
   *
   * @param asset - The account address of the asset for which the debt ceiling is being set.
   * @param newDebtCeiling - The new debt ceiling value to be set, represented as a bigint.
   * @returns A promise that resolves to a CommittedTransactionResponse once the transaction is committed.
   */
  public async setDebtCeiling(
    asset: AccountAddress,
    newDebtCeiling: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetDebtCeilingFuncAddr,
      [asset, newDebtCeiling.toString()],
    );
  }

  /**
   * Configures a reserve as collateral by setting the loan-to-value (LTV),
   * liquidation threshold, and liquidation bonus for a given asset.
   *
   * @param asset - The address of the asset to be configured as collateral.
   * @param ltv - The loan-to-value ratio for the asset, represented as a bigint.
   * @param liquidationThreshold - The threshold at which the asset will be liquidated, represented as a bigint.
   * @param liquidationBonus - The bonus applied during liquidation, represented as a bigint.
   * @returns A promise that resolves to a CommittedTransactionResponse once the transaction is committed.
   */
  public async configureReserveAsCollateral(
    asset: AccountAddress,
    ltv: bigint,
    liquidationThreshold: bigint,
    liquidationBonus: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorConfigureReserveAsCollateralFuncAddr,
      [
        asset,
        ltv.toString(),
        liquidationThreshold.toString(),
        liquidationBonus.toString(),
      ],
    );
  }

  /**
   * Sets the reserve factor for a given asset.
   *
   * @param asset - The account address of the asset for which the reserve factor is being set.
   * @param newReserveFactor - The new reserve factor to be set, represented as a bigint.
   * @returns A promise that resolves to a CommittedTransactionResponse once the transaction is committed.
   */
  public async setReserveFactor(
    asset: AccountAddress,
    newReserveFactor: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetReserveFactorFuncAddr,
      [asset, newReserveFactor.toString()],
    );
  }

  /**
   * Enables or disables flash loaning for a specific reserve asset.
   *
   * @param asset - The address of the reserve asset.
   * @param enabled - A boolean indicating whether flash loaning should be enabled (true) or disabled (false).
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async setReserveFlashLoaning(
    asset: AccountAddress,
    enabled: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetReserveFlashLoaningFuncAddr,
      [asset, enabled],
    );
  }

  /**
   * Sets the freeze status of a reserve asset.
   *
   * @param asset - The address of the reserve asset to be frozen or unfrozen.
   * @param freeze - A boolean indicating whether to freeze (true) or unfreeze (false) the reserve asset.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async setReserveFreeze(
    asset: AccountAddress,
    freeze: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetReserveFreezeFuncAddr,
      [asset, freeze],
    );
  }

  /**
   * Sets the paused state of a reserve.
   *
   * @param asset - The address of the asset to be paused or unpaused.
   * @param paused - A boolean indicating whether to pause (true) or unpause (false) the reserve.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async setReservePaused(
    asset: AccountAddress,
    paused: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetReservePauseFuncAddr,
      [asset, paused],
    );
  }

  /**
   * Sets the siloed borrowing status for a given asset.
   *
   * @param asset - The address of the asset for which to set the siloed borrowing status.
   * @param newSiloed - A boolean indicating the new siloed borrowing status.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async setSiloedBorrowing(
    asset: AccountAddress,
    newSiloed: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetSiloedBorrowingFuncAddr,
      [asset, newSiloed],
    );
  }

  /**
   * Sets the supply cap for a given asset.
   *
   * @param asset - The account address of the asset for which the supply cap is being set.
   * @param newSupplyCap - The new supply cap value to be set for the asset.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async setSupplyCap(
    asset: AccountAddress,
    newSupplyCap: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetSupplyCapFuncAddr,
      [asset, newSupplyCap.toString()],
    );
  }

  /**
   * Sets the unbacked mint cap for a specific asset.
   *
   * @param asset - The address of the asset for which the unbacked mint cap is being set.
   * @param newUnbackedMintCap - The new unbacked mint cap value to be set.
   * @returns A promise that resolves to the response of the committed transaction.
   */
  public async setUnbackedMintCap(
    asset: AccountAddress,
    newUnbackedMintCap: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetUnbackedMintCapFuncAddr,
      [asset, newUnbackedMintCap.toString()],
    );
  }

  /**
   * Updates the bridge protocol fee in the pool contract.
   *
   * @param newBridgeProtocolFee - The new bridge protocol fee to be set, represented as a bigint.
   * @returns A promise that resolves to a CommittedTransactionResponse once the transaction is sent and the response is received.
   */
  public async updateBridgeProtocolFee(
    newBridgeProtocolFee: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorUpdateBridgeProtocolFeeFuncAddr,
      [newBridgeProtocolFee.toString()],
    );
  }

  /**
   * Updates the flashloan premium to protocol.
   *
   * @param newFlashloanPremiumToProtocol - The new flashloan premium to be set, represented as a bigint.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async updateFloashloanPremiumToProtocol(
    newFlashloanPremiumToProtocol: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract
        .PoolConfiguratorUpdateFlashloanPremiumToProtocolFuncAddr,
      [newFlashloanPremiumToProtocol.toString()],
    );
  }

  /**
   * Updates the flashloan premium total in the pool configurator.
   *
   * @param newFlashloanPremiumTotal - The new flashloan premium total as a bigint.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async updateFloashloanPremiumTotal(
    newFlashloanPremiumTotal: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorUpdateFlashloanPremiumTotalFuncAddr,
      [newFlashloanPremiumTotal.toString()],
    );
  }

  /**
   * Retrieves the revision number of the pool configurator.
   *
   * This method calls the `PoolConfiguratorGetRevisionFuncAddr` function on the pool contract
   * and maps the response to a bigint.
   *
   * @returns {Promise<bigint>} A promise that resolves to the revision number of the pool configurator.
   */
  public async getPoolConfiguratorRevision(): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.PoolConfiguratorGetRevisionFuncAddr,
        [],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Sets the user's eMode category.
   *
   * @param categoryId - The ID of the eMode category to set for the user.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async setUserEmode(
    categoryId: number,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolSetUserEmodeFuncAddr,
      [categoryId],
    );
  }

  /**
   * Configures an eMode category with the specified parameters.
   *
   * @param ltv - The loan-to-value ratio for the eMode category.
   * @param liquidationThreshold - The liquidation threshold for the eMode category.
   * @param liquidationBonus - The liquidation bonus for the eMode category.
   * @param priceSource - The account address that serves as the price source for the eMode category.
   * @param label - A label for the eMode category.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async configureEmodeCategory(
    ltv: number,
    liquidationThreshold: bigint,
    liquidationBonus: bigint,
    priceSource: AccountAddress,
    label: string,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfigureEmodeCategoryFuncAddr,
      [ltv, liquidationThreshold, liquidationBonus, priceSource, label],
    );
  }

  /**
   * Retrieves the eMode category data for a given category ID.
   *
   * @param id - The ID of the eMode category to retrieve data for.
   * @returns A promise that resolves to the eMode category data as a number.
   */
  public async getEmodeCategoryData(id: number): Promise<number> {
    const [resp] = await this.callViewMethod(
      this.poolContract.PoolGetEmodeCategoryDataFuncAddr,
      [id],
    );
    return resp as number;
  }

  /**
   * Retrieves the eMode (efficiency mode) of a user from the pool contract.
   *
   * @param user - The account address of the user.
   * @returns A promise that resolves to the eMode of the user as a number.
   */
  public async getUserEmode(user: AccountAddress): Promise<number> {
    const [resp] = await this.callViewMethod(
      this.poolContract.PoolGetUserEmodeFuncAddr,
      [user],
    );
    return resp as number;
  }

  /**
   * Sets the interest rate strategy for a given reserve asset.
   *
   * @param asset - The address of the reserve asset.
   * @param optimalUsageRatio - The optimal usage ratio for the reserve.
   * @param baseVariableBorrowRate - The base variable borrow rate for the reserve.
   * @param variableRateSlope1 - The first slope of the variable rate for the reserve.
   * @param variableRateSlope2 - The second slope of the variable rate for the reserve.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async setReserveInterestRateStrategy(
    asset: AccountAddress,
    optimalUsageRatio: bigint,
    baseVariableBorrowRate: bigint,
    variableRateSlope1: bigint,
    variableRateSlope2: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.SetReserveInterestRateStrategyFuncAddr,
      [
        asset,
        optimalUsageRatio.toString(),
        baseVariableBorrowRate.toString(),
        variableRateSlope1.toString(),
        variableRateSlope2.toString(),
      ],
    );
  }

  /**
   * Retrieves the optimal usage ratio for a given asset.
   *
   * @param asset - The account address of the asset for which to get the optimal usage ratio.
   * @returns A promise that resolves to the optimal usage ratio as a bigint.
   */
  public async getOptimalUsageRatio(asset: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.GetGetOptimalUsageRatioFuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the maximum excess usage ratio for a given asset.
   *
   * @param asset - The account address of the asset.
   * @returns A promise that resolves to a bigint representing the maximum excess usage ratio.
   */
  public async getMaxExcessUsageRatio(asset: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.GetGetMaxExcessUsageRatioFuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the variable rate slope 1 for a given asset.
   *
   * @param asset - The address of the asset for which to get the variable rate slope 1.
   * @returns A promise that resolves to a bigint representing the variable rate slope 1 of the specified asset.
   */
  public async getVariableRateSlope1(asset: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.GetVariableRateSlope1FuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the variable rate slope 2 for a given asset.
   *
   * @param asset - The address of the asset for which to get the variable rate slope 2.
   * @returns A promise that resolves to the variable rate slope 2 as a bigint.
   */
  public async getVariableRateSlope2(asset: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.GetVariableRateSlope2FuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the base variable borrow rate for a given asset.
   *
   * @param asset - The account address of the asset.
   * @returns A promise that resolves to the base variable borrow rate as a bigint.
   */
  public async getBaseVariableBorrowRate(
    asset: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.GetBaseVariableBorrowRateFuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the maximum variable borrow rate for a given asset.
   *
   * @param asset - The account address of the asset.
   * @returns A promise that resolves to the maximum variable borrow rate as a bigint.
   */
  public async getMaxVariableBorrowRate(
    asset: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.GetMaxVariableBorrowRateFuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Calculates the current liquidity rate and current variable borrow rate for a given reserve.
   *
   * @param unbacked - The amount of unbacked assets.
   * @param liquidityAdded - The amount of liquidity added to the reserve.
   * @param liquidityTaken - The amount of liquidity taken from the reserve.
   * @param totalVariableDebt - The total variable debt of the reserve.
   * @param reserveFactor - The reserve factor.
   * @param reserve - The address of the reserve account.
   * @param atokenAddress - The address of the aToken associated with the reserve.
   * @returns An object containing the current liquidity rate and current variable borrow rate.
   */
  public async calculateInterestRates(
    unbacked: bigint,
    liquidityAdded: bigint,
    liquidityTaken: bigint,
    totalVariableDebt: bigint,
    reserveFactor: bigint,
    reserve: AccountAddress,
    atokenAddress: AccountAddress,
  ): Promise<{
    currentLiquidityRate: bigint;
    currentVariableBorrowRate: bigint;
  }> {
    const [currentLiquidityRate, currentVariableBorrowRate] = (
      await this.callViewMethod(
        this.poolContract.CalculateInterestRatesFuncAddr,
        [
          unbacked.toString(),
          liquidityAdded.toString(),
          liquidityTaken.toString(),
          totalVariableDebt.toString(),
          reserveFactor.toString(),
          reserve,
          atokenAddress,
        ],
      )
    ).map(mapToBigInt);
    return {
      currentLiquidityRate,
      currentVariableBorrowRate,
    };
  }

  /**
   * Retrieves all reserve tokens from the pool contract.
   *
   * @returns {Promise<Array<TokenData>>} A promise that resolves to an array of TokenData objects.
   *
   * @throws {Error} If the call to the view method fails or returns an unexpected result.
   */
  public async getAllReservesTokens(): Promise<Array<TokenData>> {
    const resp = (
      (
        await this.callViewMethod(
          this.poolContract.GetAllReservesTokensFuncAddr,
          [],
        )
      ).at(0) as Array<any>
    ).map(
      (item) =>
        ({
          symbol: item.symbol as string,
          tokenAddress: AccountAddress.fromString(item.token_address as string),
        }) as TokenData,
    );
    return resp;
  }

  /**
   * Retrieves all AToken data from the pool contract.
   *
   * @returns {Promise<Array<TokenData>>} A promise that resolves to an array of TokenData objects.
   *
   * @example
   * const aTokens = await poolClient.getAllATokens();
   * console.log(aTokens);
   */
  public async getAllATokens(): Promise<Array<TokenData>> {
    const resp = (
      (
        await this.callViewMethod(this.poolContract.GetAllATokensFuncAddr, [])
      ).at(0) as Array<any>
    ).map(
      (item) =>
        ({
          symbol: item.symbol as string,
          tokenAddress: AccountAddress.fromString(item.token_address as string),
        }) as TokenData,
    );
    return resp;
  }

  /**
   * Retrieves all variable tokens from the pool contract.
   *
   * @returns {Promise<Array<TokenData>>} A promise that resolves to an array of TokenData objects.
   *
   * @remarks
   * This method calls the `GetAllVariableTokensFuncAddr` function of the pool contract to fetch
   * the variable tokens. The response is then mapped to an array of TokenData objects, each containing
   * the token symbol and token address.
   *
   * @example
   * ```typescript
   * const variableTokens = await poolClient.getAllVariableTokens();
   * console.log(variableTokens);
   * ```
   */
  public async getAllVariableTokens(): Promise<Array<TokenData>> {
    const resp = (
      (
        await this.callViewMethod(
          this.poolContract.GetAllVariableTokensFuncAddr,
          [],
        )
      ).at(0) as Array<any>
    ).map(
      (item) =>
        ({
          symbol: item.symbol as string,
          tokenAddress: AccountAddress.fromString(item.token_address as string),
        }) as TokenData,
    );
    return resp;
  }

  /**
   * Retrieves the reserve configuration data for a given asset.
   *
   * @param asset - The account address of the asset.
   * @returns A promise that resolves to an object containing the reserve configuration data.
   *
   * The returned object includes the following properties:
   * - `decimals`: The number of decimals for the asset.
   * - `ltv`: The loan-to-value ratio.
   * - `liquidationThreshold`: The liquidation threshold.
   * - `liquidationBonus`: The liquidation bonus.
   * - `reserveFactor`: The reserve factor.
   * - `usageAsCollateralEnabled`: A boolean indicating if the asset can be used as collateral.
   * - `borrowingEnabled`: A boolean indicating if borrowing is enabled for the asset.
   * - `isActive`: A boolean indicating if the asset is active.
   * - `isFrozen`: A boolean indicating if the asset is frozen.
   */
  public async getReserveConfigurationData(
    asset: AccountAddress,
  ): Promise<ReserveConfigurationData> {
    const [
      decimals,
      ltv,
      liquidationThreshold,
      liquidationBonus,
      reserveFactor,
      usageAsCollateralEnabled,
      borrowingEnabled,
      isActive,
      isFrozen,
    ] = await this.callViewMethod(
      this.poolContract.GetReserveConfigurationDataFuncAddr,
      [asset],
    );
    return {
      decimals: BigInt(decimals.toString()),
      ltv: BigInt(ltv.toString()),
      liquidationThreshold: BigInt(liquidationThreshold.toString()),
      liquidationBonus: BigInt(liquidationBonus.toString()),
      reserveFactor: BigInt(reserveFactor.toString()),
      usageAsCollateralEnabled: usageAsCollateralEnabled as boolean,
      borrowingEnabled: borrowingEnabled as boolean,
      isActive: isActive as boolean,
      isFrozen: isFrozen as boolean,
    };
  }

  /**
   * Retrieves the eMode category for a given reserve asset.
   *
   * @param asset - The account address of the reserve asset.
   * @returns A promise that resolves to the eMode category number of the specified asset.
   */
  public async getReserveEmodeCategory(asset: AccountAddress): Promise<number> {
    const [emodeCategory] = await this.callViewMethod(
      this.poolContract.GetReserveEModeCategoryFuncAddr,
      [asset],
    );
    return emodeCategory as number;
  }

  /**
   * Retrieves the reserve caps for a given asset.
   *
   * @param asset - The address of the asset account.
   * @returns A promise that resolves to an object containing the borrow cap and supply cap as big integers.
   */
  public async getReserveCaps(asset: AccountAddress): Promise<{
    borrowCap: bigint;
    supplyCap: bigint;
  }> {
    const [borrowCap, supplyCap] = await this.callViewMethod(
      this.poolContract.GetReserveCapsFuncAddr,
      [asset],
    );
    return {
      borrowCap: BigInt(borrowCap.toString()),
      supplyCap: BigInt(supplyCap.toString()),
    };
  }

  /**
   * Checks if the specified asset is paused.
   *
   * @param asset - The address of the asset to check.
   * @returns A promise that resolves to a boolean indicating whether the asset is paused.
   */
  public async getPaused(asset: AccountAddress): Promise<boolean> {
    const [isSiloedBorrowing] = await this.callViewMethod(
      this.poolContract.GetPausedFuncAddr,
      [asset],
    );
    return isSiloedBorrowing as boolean;
  }

  /**
   * Retrieves the siloed borrowing status for a given asset.
   *
   * @param asset - The account address of the asset to check.
   * @returns A promise that resolves to a boolean indicating whether the asset has siloed borrowing enabled.
   */
  public async getSiloedBorrowing(asset: AccountAddress): Promise<boolean> {
    const [isSiloedBorrowing] = await this.callViewMethod(
      this.poolContract.GetSiloedBorrowingFuncAddr,
      [asset],
    );
    return isSiloedBorrowing as boolean;
  }

  /**
   * Retrieves the liquidation protocol fee for a given asset.
   *
   * @param asset - The account address of the asset for which to retrieve the liquidation protocol fee.
   * @returns A promise that resolves to the liquidation protocol fee as a bigint.
   */
  public async getLiquidationProtocolFee(
    asset: AccountAddress,
  ): Promise<bigint> {
    const [isSiloedBorrowing] = (
      await this.callViewMethod(
        this.poolContract.GetLiquidationProtocolFeeTokensFuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return isSiloedBorrowing;
  }

  /**
   * Retrieves the unbacked mint cap for a given asset.
   *
   * @param asset - The account address of the asset.
   * @returns A promise that resolves to the unbacked mint cap as a bigint.
   */
  public async getUnbackedMintCap(asset: AccountAddress): Promise<bigint> {
    const [unbackedMintCap] = (
      await this.callViewMethod(this.poolContract.GetUnbackedMintCapFuncAddr, [
        asset,
      ])
    ).map(mapToBigInt);
    return unbackedMintCap;
  }

  /**
   * Retrieves the debt ceiling for a given asset.
   *
   * @param asset - The account address of the asset for which to get the debt ceiling.
   * @returns A promise that resolves to the debt ceiling as a bigint.
   */
  public async getDebtCeiling(asset: AccountAddress): Promise<bigint> {
    const [debtCeiling] = (
      await this.callViewMethod(this.poolContract.GetDebtCeilingFuncAddr, [
        asset,
      ])
    ).map(mapToBigInt);
    return debtCeiling;
  }

  /**
   * Retrieves the debt ceiling decimals from the pool contract.
   *
   * @returns {Promise<bigint>} A promise that resolves to the debt ceiling decimals as a bigint.
   */
  public async getDebtCeilingDecimals(): Promise<bigint> {
    const [debtCeiling] = (
      await this.callViewMethod(
        this.poolContract.GetDebtCeilingDecimalsFuncAddr,
        [],
      )
    ).map(mapToBigInt);
    return debtCeiling;
  }

  /**
   * Retrieves reserve data for a given asset.
   *
   * @param {AccountAddress} asset - The address of the asset to retrieve reserve data for.
   * @returns {Promise<ReserveData2>} A promise that resolves to an object containing reserve data.
   *
   * The returned object includes the following properties:
   * - `reserveUnbacked`: The amount of unbacked reserve.
   * - `reserveAccruedToTreasury`: The amount accrued to the treasury.
   * - `aTokenSupply`: The total supply of aTokens.
   * - `varTokenSupply`: The total supply of variable tokens.
   * - `reserveCurrentLiquidityRate`: The current liquidity rate of the reserve.
   * - `reserveCurrentVariableBorrowRate`: The current variable borrow rate of the reserve.
   * - `reserveLiquidityIndex`: The liquidity index of the reserve.
   * - `reserveVarBorrowIndex`: The variable borrow index of the reserve.
   * - `reserveLastUpdateTimestamp`: The timestamp of the last update to the reserve data.
   */
  public async getReserveData2(asset: AccountAddress): Promise<ReserveData2> {
    const [
      reserveUnbacked,
      reserveAccruedToTreasury,
      aTokenSupply,
      varTokenSupply,
      reserveCurrentLiquidityRate,
      reserveCurrentVariableBorrowRate,
      reserveLiquidityIndex,
      reserveVarBorrowIndex,
      reserveLastUpdateTimestamp,
    ] = await this.callViewMethod(
      this.poolContract.GetReserveEModeCategoryFuncAddr,
      [asset],
    );
    return {
      reserveUnbacked: BigInt(reserveUnbacked.toString()),
      reserveAccruedToTreasury: BigInt(reserveAccruedToTreasury.toString()),
      aTokenSupply: BigInt(aTokenSupply.toString()),
      varTokenSupply: BigInt(varTokenSupply.toString()),
      reserveCurrentLiquidityRate: BigInt(
        reserveCurrentLiquidityRate.toString(),
      ),
      reserveCurrentVariableBorrowRate: BigInt(
        reserveCurrentVariableBorrowRate.toString(),
      ),
      reserveLiquidityIndex: BigInt(reserveLiquidityIndex.toString()),
      reserveVarBorrowIndex: BigInt(reserveVarBorrowIndex.toString()),
      reserveLastUpdateTimestamp: BigInt(reserveLastUpdateTimestamp.toString()),
    } as ReserveData2;
  }

  /**
   * Retrieves the total supply of AToken for a given asset.
   *
   * @param asset - The account address of the asset.
   * @returns A promise that resolves to the total supply of the AToken as a bigint.
   */
  public async getATokenTotalSupply(asset: AccountAddress): Promise<bigint> {
    const [totalSupply] = (
      await this.callViewMethod(
        this.poolContract.GetATokenTotalSupplyFuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return totalSupply;
  }

  /**
   * Retrieves the total debt for a given asset.
   *
   * @param asset - The address of the asset account.
   * @returns A promise that resolves to the total debt as a bigint.
   */
  public async getTotalDebt(asset: AccountAddress): Promise<bigint> {
    const [totalDebt] = (
      await this.callViewMethod(this.poolContract.GetTotalDebtFuncAddr, [asset])
    ).map(mapToBigInt);
    return totalDebt;
  }

  /**
   * Retrieves the reserve data for a specific user and asset.
   *
   * @param asset - The address of the asset.
   * @param user - The address of the user.
   * @returns A promise that resolves to an object containing the user's reserve data.
   *
   * The returned object includes the following properties:
   * - `currentATokenBalance`: The current balance of A tokens held by the user.
   * - `currentVariableDebt`: The current variable debt of the user.
   * - `scaledVariableDebt`: The scaled variable debt of the user.
   * - `liquidityRate`: The liquidity rate of the reserve.
   * - `usageAsCollateralEnabled`: A boolean indicating if the asset is being used as collateral.
   */
  public async getUserReserveData(
    asset: AccountAddress,
    user: AccountAddress,
  ): Promise<UserReserveData> {
    const [
      currentATokenBalance,
      currentVariableDebt,
      scaledVariableDebt,
      liquidityRate,
      usageAsCollateralEnabled,
    ] = await this.callViewMethod(
      this.poolContract.GetUserReserveDataFuncAddr,
      [asset, user],
    );
    return {
      currentATokenBalance: BigInt(currentATokenBalance.toString()),
      currentVariableDebt: BigInt(currentVariableDebt.toString()),
      scaledVariableDebt: BigInt(scaledVariableDebt.toString()),
      liquidityRate: BigInt(liquidityRate.toString()),
      usageAsCollateralEnabled: usageAsCollateralEnabled as boolean,
    } as UserReserveData;
  }

  /**
   * Retrieves the addresses of the reserve tokens for a given asset.
   *
   * @param asset - The address of the asset for which to get the reserve token addresses.
   * @returns A promise that resolves to an object containing the addresses of the reserve AToken and the reserve Variable Debt Token.
   */
  public async getReserveTokensAddresses(asset: AccountAddress): Promise<{
    reserveATokenAddress: AccountAddress;
    reserveVariableDebtTokenAddress: AccountAddress;
  }> {
    const [reserveATokenAddress, reserveVariableDebtTokenAddress] =
      await this.callViewMethod(
        this.poolContract.GetReserveTokensAddressesFuncAddr,
        [asset],
      );
    return {
      reserveATokenAddress: AccountAddress.fromString(
        reserveATokenAddress as string,
      ),
      reserveVariableDebtTokenAddress: AccountAddress.fromString(
        reserveVariableDebtTokenAddress as string,
      ),
    };
  }

  /**
   * Checks if flash loans are enabled for a given asset.
   *
   * @param asset - The address of the asset to check.
   * @returns A promise that resolves to a boolean indicating whether flash loans are enabled for the specified asset.
   */
  public async getFlashloanEnabled(asset: AccountAddress): Promise<boolean> {
    const [isFlashloanEnabled] = await this.callViewMethod(
      this.poolContract.GetFlashLoanEnabledFuncAddr,
      [asset],
    );
    return isFlashloanEnabled as boolean;
  }

  /**
   * Retrieves the scaled total supply of an AToken.
   *
   * @param aTokenAddress - The address of the AToken.
   * @returns A promise that resolves to the scaled total supply of the AToken as a bigint.
   */
  public async getScaledATokenTotalSupply(
    aTokenAddress: AccountAddress,
  ): Promise<bigint> {
    const [totalSupply] = (
      await this.callViewMethod(
        this.poolContract.PoolScaledATokenTotalSupplyFuncAddr,
        [aTokenAddress],
      )
    ).map(mapToBigInt);
    return totalSupply;
  }

  /**
   * Retrieves the scaled AToken balance of a specified owner.
   *
   * @param owner - The address of the account owner whose balance is being queried.
   * @param aTokenAddress - The address of the AToken contract.
   * @returns A promise that resolves to the scaled AToken balance as a bigint.
   */
  public async getScaledATokenBalanceOf(
    owner: AccountAddress,
    aTokenAddress: AccountAddress,
  ): Promise<bigint> {
    const [balance] = (
      await this.callViewMethod(
        this.poolContract.PoolScaledATokenBalanceOfFuncAddr,
        [owner, aTokenAddress],
      )
    ).map(mapToBigInt);
    return balance;
  }

  /**
   * Retrieves the scaled total supply of variable tokens for a given aToken address.
   *
   * @param aTokenAddress - The address of the aToken whose scaled variable token total supply is to be fetched.
   * @returns A promise that resolves to the scaled total supply of variable tokens as a bigint.
   */
  public async getScaledVariableTokenTotalSupply(
    aTokenAddress: AccountAddress,
  ): Promise<bigint> {
    const [totalSupply] = (
      await this.callViewMethod(
        this.poolContract.PoolScaledVariableTokenTotalSupplyFuncAddr,
        [aTokenAddress],
      )
    ).map(mapToBigInt);
    return totalSupply;
  }

  /**
   * Retrieves the scaled variable token balance of a specified owner for a given variable token address.
   *
   * @param owner - The account address of the token owner.
   * @param varTokenAddress - The account address of the variable token.
   * @returns A promise that resolves to the scaled variable token balance as a bigint.
   */
  public async getScaledVariableTokenBalanceOf(
    owner: AccountAddress,
    varTokenAddress: AccountAddress,
  ): Promise<bigint> {
    const [balance] = (
      await this.callViewMethod(
        this.poolContract.PoolScaledVariableTokenBalanceOfFuncAddr,
        [owner, varTokenAddress],
      )
    ).map(mapToBigInt);
    return balance;
  }
}
