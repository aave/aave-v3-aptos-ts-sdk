import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { mapToBigInt } from "../helpers/common";
import { InterestRateContract } from "../contracts/interestRate";

export type InterestRateDataRay = {
  optimalUsageRatio: bigint;
  baseVariableBorrowRate: bigint;
  variableRateSlope1: bigint;
  variableRateSlope2: bigint;
};

export class InterestRateClient extends AptosContractWrapperBaseClass {
  interestRateContract: InterestRateContract;

  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.interestRateContract = new InterestRateContract(provider);
  }

  /**
   * Creates an instance of `InterestRateClient` using the default signer provided by the `AptosProvider`.
   *
   * @param provider - An instance of `AptosProvider` which provides the necessary configurations and signer.
   * @returns A new instance of `InterestRateClient` initialized with the default signer.
   */
  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): InterestRateClient {
    const client = new InterestRateClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }

  /**
   * Sets the interest rate strategy for a given reserve asset.
   *
   * @param reserve - The address of the reserve asset.
   * @param optimalUsageRatio - The optimal usage ratio for the reserve.
   * @param baseVariableBorrowRate - The base variable borrow rate for the reserve.
   * @param variableRateSlope1 - The first slope of the variable rate for the reserve.
   * @param variableRateSlope2 - The second slope of the variable rate for the reserve.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async setReserveInterestRateStrategy(
    reserve: AccountAddress,
    optimalUsageRatio: bigint,
    baseVariableBorrowRate: bigint,
    variableRateSlope1: bigint,
    variableRateSlope2: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.interestRateContract.setReserveInterestRateStrategyFuncAddr,
      [
        reserve,
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
        this.interestRateContract.getGetOptimalUsageRatioFuncAddr,
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
        this.interestRateContract.getGetMaxExcessUsageRatioFuncAddr,
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
        this.interestRateContract.getVariableRateSlope1FuncAddr,
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
        this.interestRateContract.getVariableRateSlope2FuncAddr,
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
        this.interestRateContract.getBaseVariableBorrowRateFuncAddr,
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
        this.interestRateContract.getMaxVariableBorrowRateFuncAddr,
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
   * @param virtualUnderlyingBalance - The virtual balance of the aToken underlying.
   * @returns An object containing the current liquidity rate and current variable borrow rate.
   */
  public async calculateInterestRates(
    unbacked: bigint,
    liquidityAdded: bigint,
    liquidityTaken: bigint,
    totalDebt: bigint,
    reserveFactor: bigint,
    reserve: AccountAddress,
    virtualUnderlyingBalance: bigint,
  ): Promise<{
    currentLiquidityRate: bigint;
    currentVariableBorrowRate: bigint;
  }> {
    const [currentLiquidityRate, currentVariableBorrowRate] = (
      await this.callViewMethod(
        this.interestRateContract.calculateInterestRatesFuncAddr,
        [
          unbacked,
          liquidityAdded,
          liquidityTaken,
          totalDebt,
          reserveFactor,
          reserve,
          virtualUnderlyingBalance,
        ],
      )
    ).map(mapToBigInt);
    return {
      currentLiquidityRate,
      currentVariableBorrowRate,
    };
  }

  /**
   *  Returns the full InterestRateData object for the given reserve, in ray
   *
   * @param reserve - The address of the reserve account.
   * @returns The InterestRateDataRay object for the given reserve.
   */
  public async getReserveInterestRateStrategy(
    reserve: AccountAddress,
  ): Promise<InterestRateDataRay> {
    const resp = await this.callViewMethod(
      this.interestRateContract.getReserveInterestRateStrategyFuncAddr,
      [reserve],
    );
    const respRaw = resp.at(0) as any;
    const reserveInterestRateStrategy = {
      optimalUsageRatio: BigInt(respRaw.optimal_usage_ratio.toString()),
      baseVariableBorrowRate: BigInt(
        respRaw.base_variable_borrow_rate.toString(),
      ),
      variableRateSlope1: BigInt(respRaw.variable_rate_slope1.toString()),
      variableRateSlope2: BigInt(respRaw.variable_rate_slope2.toString()),
    } as InterestRateDataRay;
    return reserveInterestRateStrategy;
  }

  /**
   *  Returns the full InterestRateData object for the given reserve, in bps
   *
   * @param reserve - The address of the reserve account.
   * @returns The InterestRateDataRay object for the given reserve.
   */
  public async getReserveInterestRateStrategyBps(
    reserve: AccountAddress,
  ): Promise<InterestRateDataRay> {
    const resp = await this.callViewMethod(
      this.interestRateContract.getReserveInterestRateStrategyBspFuncAddr,
      [reserve],
    );
    const respRaw = resp.at(0) as any;
    const reserveInterestRateStrategy = {
      optimalUsageRatio: BigInt(respRaw.optimal_usage_ratio.toString()),
      baseVariableBorrowRate: BigInt(
        respRaw.base_variable_borrow_rate.toString(),
      ),
      variableRateSlope1: BigInt(respRaw.variable_rate_slope1.toString()),
      variableRateSlope2: BigInt(respRaw.variable_rate_slope2.toString()),
    } as InterestRateDataRay;
    return reserveInterestRateStrategy;
  }
}
