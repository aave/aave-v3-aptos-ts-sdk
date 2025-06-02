import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { SupplyBorrowContract } from "../contracts/supplyBorrow";
import { mapToBigInt } from "../helpers/common";

/**
 * The `CoreClient` class provides methods to interact with the Aave protocol on the Aptos blockchain.
 * It extends the `AptosContractWrapperBaseClass` and includes functionalities for supplying, borrowing,
 * repaying, and managing assets within the Aave protocol.
 *
 * @remarks
 * This client is designed to work with the core Aave protocol contracts and provides a high-level API for
 * supply, borrow, and liquidation operations. The client can be instantiated in two ways:
 * 1. Using the constructor directly with a provider and optional signer
 * 2. Using the static buildWithDefaultSigner method which automatically configures the client with the provider's pool profile account
 *
 * @example
 * ```typescript
 * // Using buildWithDefaultSigner
 * const provider = new AptosProvider();
 * const client = CoreClient.buildWithDefaultSigner(provider);
 *
 * // Using constructor directly
 * const provider = new AptosProvider();
 * const signer = provider.getPoolProfileAccount();
 * const client = new CoreClient(provider, signer);
 *
 * // Supply assets to the protocol
 * const tx = await client.supply(assetAddress, 1000n, userAddress, 0);
 * ```
 *
 * @class
 * @extends {AptosContractWrapperBaseClass}
 */
export class CoreClient extends AptosContractWrapperBaseClass {
  supplyBorrowContract: SupplyBorrowContract;

  /**
   * Creates an instance of CoreClient.
   *
   * @param provider - The AptosProvider instance to interact with the Aptos blockchain.
   * @param signer - Optional Ed25519Account instance used for signing transactions.
   */
  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.supplyBorrowContract = new SupplyBorrowContract(provider);
  }

  /**
   * Creates an instance of CoreClient using the default signer from the provided AptosProvider.
   *
   * @param provider - The AptosProvider instance to use for creating the CoreClient.
   * @returns A new instance of CoreClient.
   */
  public static buildWithDefaultSigner(provider: AptosProvider): CoreClient {
    const client = new CoreClient(provider, provider.getPoolProfileAccount());
    return client;
  }

  /**
   * Supplies a specified amount of an asset on behalf of a given account.
   *
   * @param asset - The address of the fungible asset to supply.
   * @param amount - The amount of the fungible asset to supply, represented as a bigint.
   * @param onBehalfOf - The address of the account on whose behalf the asset is being supplied.
   * @param referralCode - A referral code for tracking referrals.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async supply(
    asset: AccountAddress,
    amount: bigint,
    onBehalfOf: AccountAddress,
    referralCode: number,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.supplyBorrowContract.supplyFuncAddr,
      [asset, amount.toString(), onBehalfOf, referralCode],
    );
  }

  /**
   * Supplies a specified amount of a coin on behalf of a given account.
   *
   * @param coinType - The type of the coin to supply.
   * @param amount - The amount of the coin to supply, represented as a bigint.
   * @param onBehalfOf - The address of the account on whose behalf the asset is being supplied.
   * @param referralCode - A referral code for tracking referrals.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async supplyCoin(
    coinType: string,
    amount: bigint,
    onBehalfOf: AccountAddress,
    referralCode: number,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.supplyBorrowContract.supplyCoinFuncAddr,
      [amount.toString(), onBehalfOf, referralCode],
      [coinType],
    );
  }

  /**
   * Withdraws a specified amount of an asset to a given account address.
   *
   * @param asset - The address of the asset to withdraw.
   * @param amount - The amount of the asset to withdraw, represented as a bigint.
   * @param to - The account address to which the asset will be withdrawn.
   * @returns A promise that resolves to a CommittedTransactionResponse once the transaction is committed.
   */
  public async withdraw(
    asset: AccountAddress,
    amount: bigint,
    to: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.supplyBorrowContract.withdrawFuncAddr,
      [asset, amount.toString(), to],
    );
  }

  /**
   * Borrows a specified amount of an asset on behalf of a user.
   *
   * @param asset - The address of the asset to borrow.
   * @param amount - The amount of the asset to borrow.
   * @param interestRateMode - The interest rate mode (e.g., stable or variable).
   * @param referralCode - The referral code for the transaction.
   * @param onBehalfOf - The address of the user on whose behalf the asset is borrowed.
   * @returns A promise that resolves to the response of the committed transaction.
   */
  public async borrow(
    asset: AccountAddress,
    amount: bigint,
    interestRateMode: number,
    referralCode: number,
    onBehalfOf: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.supplyBorrowContract.borrowFuncAddr,
      [asset, amount.toString(), interestRateMode, referralCode, onBehalfOf],
    );
  }

  /**
   * Repays a borrowed amount for a specific asset.
   *
   * @param asset - The address of the asset to repay.
   * @param amount - The amount to repay, specified as a bigint.
   * @param interestRateMode - The interest rate mode (e.g., stable or variable).
   * @param onBehalfOf - The address of the account on whose behalf the repayment is made.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async repay(
    asset: AccountAddress,
    amount: bigint,
    interestRateMode: number,
    onBehalfOf: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.supplyBorrowContract.repayFuncAddr,
      [asset, amount.toString(), interestRateMode, onBehalfOf],
    );
  }

  /**
   * Repays a loan using aTokens.
   *
   * @param asset - The address of the asset to repay.
   * @param amount - The amount of the asset to repay, in bigint.
   * @param interestRateMode - The interest rate mode (e.g., stable or variable).
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async repayWithATokens(
    asset: AccountAddress,
    amount: bigint,
    interestRateMode: number,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.supplyBorrowContract.repayWithATokensFuncAddr,
      [asset, amount.toString(), interestRateMode],
    );
  }

  /**
   * Executes a liquidation call on the Aave protocol.
   *
   * @param collateralAsset - The address of the collateral asset.
   * @param debtAsset - The address of the debt asset.
   * @param user - The address of the user whose position is being liquidated.
   * @param debtToCover - The amount of debt to cover in the liquidation.
   * @param receiveAToken - A boolean indicating whether to receive aTokens as collateral.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async liquidationCall(
    collateralAsset: AccountAddress,
    debtAsset: AccountAddress,
    user: AccountAddress,
    debtToCover: bigint,
    receiveAToken: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.supplyBorrowContract.liquidationCallFuncAddr,
      [collateralAsset, debtAsset, user, debtToCover.toString(), receiveAToken],
    );
  }

  /**
   * Sets whether a user should use a specific reserve as collateral.
   *
   * @param asset - The address of the asset to be used as collateral.
   * @param useAsCollateral - A boolean indicating whether to use the asset as collateral.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async setUserUseReserveAsCollateral(
    asset: AccountAddress,
    useAsCollateral: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.supplyBorrowContract.setUserUseReserveAsCollateralFuncAddr,
      [asset, useAsCollateral],
    );
  }

  /**
   * Retrieves the account data for a specific user.
   *
   * @param user - The address of the user's account.
   * @returns A promise that resolves to an object containing the user's account data:
   * - `totalCollateralBase`: The total collateral in base units.
   * - `totalDebtBase`: The total debt in base units.
   * - `availableBorrowsBase`: The available amount for borrowing in base units.
   * - `currentLiquidationThreshold`: The current liquidation threshold in base units.
   * - `ltv`: The loan-to-value ratio in base units.
   * - `healthFactor`: The health factor in base units.
   */
  public async getUserAccountData(user: AccountAddress): Promise<{
    totalCollateralBase: bigint;
    totalDebtBase: bigint;
    availableBorrowsBase: bigint;
    currentLiquidationThreshold: bigint;
    ltv: bigint;
    healthFactor: bigint;
  }> {
    const [
      totalCollateralBase,
      totalDebtBase,
      availableBorrowsBase,
      currentLiquidationThreshold,
      ltv,
      healthFactor,
    ] = (
      await this.callViewMethod(
        this.supplyBorrowContract.getUserAccountDataFuncAddr,
        [user],
      )
    ).map(mapToBigInt);
    return {
      totalCollateralBase,
      totalDebtBase,
      availableBorrowsBase,
      currentLiquidationThreshold,
      ltv,
      healthFactor,
    };
  }
}
