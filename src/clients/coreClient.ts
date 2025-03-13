import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
  SimpleTransaction,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { SupplyBorrowContract } from "../contracts/supplyBborrow";
import { mapToBigInt } from "../helpers/common";

/**
 * The `CoreClient` class provides methods to interact with the Aave protocol on the Aptos blockchain.
 * It extends the `AptosContractWrapperBaseClass` and includes functionalities for supplying, borrowing,
 * repaying, and managing assets within the Aave protocol.
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
   * Creates an instance of `CoreClient` using the provided `AptosProvider` and its default signer.
   *
   * @param provider - The `AptosProvider` instance used to initialize the `CoreClient`.
   * @returns A new instance of `CoreClient` initialized with the provided `AptosProvider` and its default signer.
   */
  public static buildWithDefaultSigner(provider: AptosProvider): CoreClient {
    const client = new CoreClient(provider, provider.getPoolProfileAccount());
    return client;
  }

  /**
   * Supplies a specified amount of an asset on behalf of a given account.
   *
   * @param asset - The address of the asset to supply.
   * @param amount - The amount of the asset to supply, represented as a bigint.
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
      this.supplyBorrowContract.SupplyFuncAddr,
      [asset, amount.toString(), onBehalfOf, referralCode],
    );
  }

  /**
   * Builds a supply transaction.
   *
   * @param user - The account address of the user initiating the supply.
   * @param asset - The account address of the asset to be supplied.
   * @param amount - The amount of the asset to be supplied, represented as a bigint.
   * @param onBehalfOf - The account address on whose behalf the supply is being made.
   * @param referralCode - The referral code for the transaction.
   * @returns A promise that resolves to a SimpleTransaction object.
   */
  public async buildSupply(
    user: AccountAddress,
    asset: AccountAddress,
    amount: bigint,
    onBehalfOf: AccountAddress,
    referralCode: number,
  ): Promise<SimpleTransaction> {
    return this.buildTx(user, this.supplyBorrowContract.SupplyFuncAddr, [
      asset,
      amount.toString(),
      onBehalfOf,
      referralCode,
    ]);
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
      this.supplyBorrowContract.WithdrawFuncAddr,
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
      this.supplyBorrowContract.BorrowFuncAddr,
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
      this.supplyBorrowContract.RepayFuncAddr,
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
      this.supplyBorrowContract.RepayWithATokensFuncAddr,
      [asset, amount.toString(), interestRateMode],
    );
  }

  /// User finalizes the transfer
  /**
   * Finalizes the transfer of an asset from one account to another.
   *
   * @param asset - The address of the asset being transferred.
   * @param from - The address of the account sending the asset.
   * @param to - The address of the account receiving the asset.
   * @param amount - The amount of the asset being transferred.
   * @param balanceFromBefore - The balance of the sender's account before the transfer.
   * @param balanceToBefore - The balance of the receiver's account before the transfer.
   * @returns A promise that resolves to the response of the committed transaction.
   */
  public async finalizeTransfer(
    asset: AccountAddress,
    from: AccountAddress,
    to: AccountAddress,
    amount: bigint,
    balanceFromBefore: bigint,
    balanceToBefore: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.supplyBorrowContract.FinalizeTransferFuncAddr,
      [
        asset,
        from,
        to,
        amount.toString(),
        balanceFromBefore.toString(),
        balanceToBefore.toString(),
      ],
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
      this.supplyBorrowContract.LiquidationCallFuncAddr,
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
      this.supplyBorrowContract.SetUserUseReserveAsCollateralFuncAddr,
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
        this.supplyBorrowContract.GetUserAccountDataFuncAddr,
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
