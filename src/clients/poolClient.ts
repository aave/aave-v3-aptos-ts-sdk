import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { PoolContract } from "../contracts/pool";
import { mapToBigInt } from "../helpers/common";

export type ReserveConfigurationMap = {
  data: number;
};

export type UserConfigurationMap = {
  data: number;
};

export interface TokenData {
  symbol: string;
  tokenAddress: AccountAddress;
}

export interface UserReserveData {
  currentATokenBalance: bigint;
  currentVariableDebt: bigint;
  scaledVariableDebt: bigint;
  liquidityRate: bigint;
  usageAsCollateralEnabled: boolean;
}

export type ReserveData = {
  /// stores the reserve configuration
  configuration: { data: number };
  /// the liquidity index. Expressed in ray
  liquidityIndex: number;
  /// the current supply rate. Expressed in ray
  currentLiquidityRate: bigint;
  /// variable borrow index. Expressed in ray
  variableBorrowIndex: bigint;
  /// the current variable borrow rate. Expressed in ray
  currentVariableBorrowRate: bigint;
  /// timestamp of last update (u40 -> u64)
  lastUpdateTimestamp: number;
  /// the id of the reserve. Represents the position in the list of the active reserves
  id: number;
  /// aToken address
  aTokenAddress: AccountAddress;
  /// stableDebtToken address
  stableDebtTokenAddress: AccountAddress;
  /// variableDebtToken address
  variableDebtTokenAddress: AccountAddress;
  /// the current treasury balance, scaled
  accruedToTreasury: bigint;
  /// the outstanding unbacked aTokens minted through the bridging feature
  unbacked: bigint;
  /// the outstanding debt borrowed against this asset in isolation mode
  isolationModeTotalDebt: bigint;
};

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
    super(provider, signer || provider.getPoolProfileAccount());
    this.poolContract = new PoolContract(provider);
  }

  public async mintToTreasury(
    assets: Array<AccountAddress>,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolMintToTreasuryFuncAddr,
      [assets],
    );
  }

  public async resetIsolationModeTotalDebt(
    asset: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolResetIsolationModeTotalDebtFuncAddr,
      [asset],
    );
  }

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

  public async setBridgeProtocolFee(
    protocolFee: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolSetBridgeProtocolFeeFuncAddr,
      [protocolFee.toString()],
    );
  }

  public async setFlashloanPremiums(
    flashloanPremiumTotal: bigint,
    flashloanPremiumToProtocol: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolSetFlashloanPremiumsFuncAddr,
      [flashloanPremiumTotal.toString(), flashloanPremiumToProtocol.toString()],
    );
  }

  public async getRevision(): Promise<number> {
    const [resp] = await this.callViewMethod(
      this.poolContract.PoolGetRevisionFuncAddr,
      [],
    );
    return resp as number;
  }

  public async getReserveConfiguration(
    asset: AccountAddress,
  ): Promise<ReserveConfigurationMap> {
    const [resp] = await this.callViewMethod(
      this.poolContract.PoolGetReserveConfigurationFuncAddr,
      [asset],
    );
    return resp as ReserveConfigurationMap;
  }

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

  public async getReservesCount(): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.PoolGetReservesCountFuncAddr,
        [],
      )
    ).map(mapToBigInt);
    return resp;
  }

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

  public async getReserveAddressById(id: number): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.poolContract.PoolGetReserveAddressByIdFuncAddr,
      [id],
    );
    return AccountAddress.fromString(resp as string);
  }

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

  public async getUserConfiguration(
    account: AccountAddress,
  ): Promise<UserConfigurationMap> {
    const [resp] = await this.callViewMethod(
      this.poolContract.PoolGetUserConfigurationFuncAddr,
      [account],
    );
    return resp as UserConfigurationMap;
  }

  public async getBridgeProtocolFee(): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.PoolGetBridgeProtocolFeeFuncAddr,
        [],
      )
    ).map(mapToBigInt);
    return resp;
  }

  public async getFlashloanPremiumTotal(): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.PoolGetFlashloanPremiumTotalFuncAddr,
        [],
      )
    ).map(mapToBigInt);
    return resp;
  }

  public async getFlashloanPremiumToProtocol(): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.PoolGetFlashloanPremiumToProtocolFuncAddr,
        [],
      )
    ).map(mapToBigInt);
    return resp;
  }

  public async getMaxNumberReserves(): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.PoolMaxNumberReservesFuncAddr,
        [],
      )
    ).map(mapToBigInt);
    return resp;
  }

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

  public async dropReserve(
    asset: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorDropReserveFuncAddr,
      [asset],
    );
  }

  public async setAssetEmodeCategory(
    asset: AccountAddress,
    newCategoryId: number,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetAssetEmodeCategoryFuncAddr,
      [asset, newCategoryId],
    );
  }

  public async setBorrowCap(
    asset: AccountAddress,
    newBorrowCap: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetBorrowCapFuncAddr,
      [asset, newBorrowCap.toString()],
    );
  }

  public async setBorrowableInIsolation(
    asset: AccountAddress,
    borrowable: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetBorrowableInIsolationFuncAddr,
      [asset, borrowable],
    );
  }

  public async setEmodeCategory(
    categoryId: number,
    ltv: bigint,
    liquidationThreshold: bigint,
    liquidationBonus: bigint,
    oracle: AccountAddress,
    label: string,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetEmodeCategoryFuncAddr,
      [categoryId, ltv, liquidationThreshold, liquidationBonus, oracle, label],
    );
  }

  public async setLiquidationProtocolFee(
    asset: AccountAddress,
    newFee: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetLiquidationProtocolFeeFuncAddr,
      [asset, newFee.toString()],
    );
  }

  public async setPoolPause(
    paused: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetPoolPauseFuncAddr,
      [paused],
    );
  }

  public async setReserveActive(
    asset: AccountAddress,
    active: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetReserveActiveFuncAddr,
      [asset, active],
    );
  }

  public async setReserveBorrowing(
    asset: AccountAddress,
    enabled: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetReserveBorrowingFuncAddr,
      [asset, enabled],
    );
  }

  public async setDebtCeiling(
    asset: AccountAddress,
    newDebtCeiling: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetDebtCeilingFuncAddr,
      [asset, newDebtCeiling.toString()],
    );
  }

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

  public async setReserveFactor(
    asset: AccountAddress,
    newReserveFactor: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetReserveFactorFuncAddr,
      [asset, newReserveFactor.toString()],
    );
  }

  public async setReserveFlashLoaning(
    asset: AccountAddress,
    enabled: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetReserveFlashLoaningFuncAddr,
      [asset, enabled],
    );
  }

  public async setReserveFreeze(
    asset: AccountAddress,
    freeze: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetReserveFreezeFuncAddr,
      [asset, freeze],
    );
  }

  public async setReservePaused(
    asset: AccountAddress,
    paused: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetReservePauseFuncAddr,
      [asset, paused],
    );
  }

  public async setSiloedBorrowing(
    asset: AccountAddress,
    newSiloed: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetSiloedBorrowingFuncAddr,
      [asset, newSiloed],
    );
  }

  public async setSupplyCap(
    asset: AccountAddress,
    newSupplyCap: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetSupplyCapFuncAddr,
      [asset, newSupplyCap.toString()],
    );
  }

  public async setUnbackedMintCap(
    asset: AccountAddress,
    newUnbackedMintCap: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorSetUnbackedMintCapFuncAddr,
      [asset, newUnbackedMintCap.toString()],
    );
  }

  public async updateBridgeProtocolFee(
    newBridgeProtocolFee: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorUpdateBridgeProtocolFeeFuncAddr,
      [newBridgeProtocolFee.toString()],
    );
  }

  public async updateFloashloanPremiumToProtocol(
    newFlashloanPremiumToProtocol: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract
        .PoolConfiguratorUpdateFlashloanPremiumToProtocolFuncAddr,
      [newFlashloanPremiumToProtocol.toString()],
    );
  }

  public async updateFloashloanPremiumTotal(
    newFlashloanPremiumTotal: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolConfiguratorUpdateFlashloanPremiumTotalFuncAddr,
      [newFlashloanPremiumTotal.toString()],
    );
  }

  public async getPoolConfiguratorRevision(): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.PoolConfiguratorGetRevisionFuncAddr,
        [],
      )
    ).map(mapToBigInt);
    return resp;
  }

  public async setUserEmode(
    categoryId: number,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.PoolSetUserEmodeFuncAddr,
      [categoryId],
    );
  }

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

  public async getEmodeCategoryData(id: number): Promise<number> {
    const [resp] = await this.callViewMethod(
      this.poolContract.PoolGetEmodeCategoryDataFuncAddr,
      [id],
    );
    return resp as number;
  }

  public async getUserEmode(user: AccountAddress): Promise<number> {
    const [resp] = await this.callViewMethod(
      this.poolContract.PoolGetUserEmodeFuncAddr,
      [user],
    );
    return resp as number;
  }

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

  public async getOptimalUsageRatio(asset: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.GetGetOptimalUsageRatioFuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return resp;
  }

  public async getMaxExcessUsageRatio(asset: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.GetGetMaxExcessUsageRatioFuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return resp;
  }

  public async getVariableRateSlope1(asset: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.GetVariableRateSlope1FuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return resp;
  }

  public async getVariableRateSlope2(asset: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.GetVariableRateSlope2FuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return resp;
  }

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

  public async getReserveEmodeCategory(asset: AccountAddress): Promise<number> {
    const [emodeCategory] = await this.callViewMethod(
      this.poolContract.GetReserveEModeCategoryFuncAddr,
      [asset],
    );
    return emodeCategory as number;
  }

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

  public async getPaused(asset: AccountAddress): Promise<boolean> {
    const [isSiloedBorrowing] = await this.callViewMethod(
      this.poolContract.GetPausedFuncAddr,
      [asset],
    );
    return isSiloedBorrowing as boolean;
  }

  public async getSiloedBorrowing(asset: AccountAddress): Promise<boolean> {
    const [isSiloedBorrowing] = await this.callViewMethod(
      this.poolContract.GetSiloedBorrowingFuncAddr,
      [asset],
    );
    return isSiloedBorrowing as boolean;
  }

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

  public async getUnbackedMintCap(asset: AccountAddress): Promise<bigint> {
    const [unbackedMintCap] = (
      await this.callViewMethod(this.poolContract.GetUnbackedMintCapFuncAddr, [
        asset,
      ])
    ).map(mapToBigInt);
    return unbackedMintCap;
  }

  public async getDebtCeiling(asset: AccountAddress): Promise<bigint> {
    const [debtCeiling] = (
      await this.callViewMethod(this.poolContract.GetDebtCeilingFuncAddr, [
        asset,
      ])
    ).map(mapToBigInt);
    return debtCeiling;
  }

  public async getDebtCeilingDecimals(): Promise<bigint> {
    const [debtCeiling] = (
      await this.callViewMethod(
        this.poolContract.GetDebtCeilingDecimalsFuncAddr,
        [],
      )
    ).map(mapToBigInt);
    return debtCeiling;
  }

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

  public async getATokenTotalSupply(asset: AccountAddress): Promise<bigint> {
    const [totalSupply] = (
      await this.callViewMethod(
        this.poolContract.GetATokenTotalSupplyFuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return totalSupply;
  }

  public async getTotalDebt(asset: AccountAddress): Promise<bigint> {
    const [totalDebt] = (
      await this.callViewMethod(this.poolContract.GetTotalDebtFuncAddr, [asset])
    ).map(mapToBigInt);
    return totalDebt;
  }

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

  public async getFlashloanEnabled(asset: AccountAddress): Promise<boolean> {
    const [isFlashloanEnabled] = await this.callViewMethod(
      this.poolContract.GetFlashLoanEnabledFuncAddr,
      [asset],
    );
    return isFlashloanEnabled as boolean;
  }

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
