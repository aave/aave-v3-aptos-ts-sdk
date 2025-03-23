import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { mapToBigInt } from "../helpers/common";
import { RateContract } from "../contracts/rate";

export class RateClient extends AptosContractWrapperBaseClass {
  rateContract: RateContract;

  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.rateContract = new RateContract(provider);
  }

  /**
   * Creates an instance of `RateClient` using the default signer provided by the `AptosProvider`.
   *
   * @param provider - An instance of `AptosProvider` which provides the necessary configurations and signer.
   * @returns A new instance of `RateClient` initialized with the default signer.
   */
  public static buildWithDefaultSigner(provider: AptosProvider): RateClient {
    return new RateClient(provider, provider.getRateProfileAccount());
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
      this.rateContract.SetReserveInterestRateStrategyFuncAddr,
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
        this.rateContract.GetGetOptimalUsageRatioFuncAddr,
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
        this.rateContract.GetGetMaxExcessUsageRatioFuncAddr,
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
        this.rateContract.GetVariableRateSlope1FuncAddr,
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
        this.rateContract.GetVariableRateSlope2FuncAddr,
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
        this.rateContract.GetBaseVariableBorrowRateFuncAddr,
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
        this.rateContract.GetMaxVariableBorrowRateFuncAddr,
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
   * @param aTokenUnderlyingBalance - The balance of the aToken underlying.
   * @returns An object containing the current liquidity rate and current variable borrow rate.
   */
  public async calculateInterestRates(
    unbacked: bigint,
    liquidityAdded: bigint,
    liquidityTaken: bigint,
    totalVariableDebt: bigint,
    reserveFactor: bigint,
    reserve: AccountAddress,
    reserveSymbol: string,
    aTokenUnderlyingBalance: bigint,
  ): Promise<{
    currentLiquidityRate: bigint;
    currentVariableBorrowRate: bigint;
  }> {
    const [currentLiquidityRate, currentVariableBorrowRate] = (
      await this.callViewMethod(
        this.rateContract.CalculateInterestRatesFuncAddr,
        [
          unbacked.toString(),
          liquidityAdded.toString(),
          liquidityTaken.toString(),
          totalVariableDebt.toString(),
          reserveFactor.toString(),
          reserve,
          reserveSymbol,
          aTokenUnderlyingBalance,
        ],
      )
    ).map(mapToBigInt);
    return {
      currentLiquidityRate,
      currentVariableBorrowRate,
    };
  }

  /**
   * Asserts that interest rate exists for a given asset.
   *
   * @param asset - The account address of the asset.
   * @param reserveSymbol - The reserve symbol.
   */
  public async assertInterestRateExists(
    asset: AccountAddress,
    reserveSymbol: string,
  ): Promise<void> {
    await this.callViewMethod(
      this.rateContract.GetGetOptimalUsageRatioFuncAddr,
      [asset, reserveSymbol],
    );
  }
}
