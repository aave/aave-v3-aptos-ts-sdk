import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
  SimpleTransaction,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { SupplyBorrowContract } from "../contracts/supply_borrow";
import { mapToBigInt } from "../helpers/common";

export class CoreClient extends AptosContractWrapperBaseClass {
  supplyBorrowContract: SupplyBorrowContract;

  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer || provider.getPoolProfileAccount());
    this.supplyBorrowContract = new SupplyBorrowContract(provider);
  }

  /// User supplies
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

  /// User withdraws
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

  /// User borrows
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

  /// User repays
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

  /// User repays with A tokens
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
  public async finalizeTransfer(
    asset: AccountAddress,
    from: AccountAddress,
    to: AccountAddress,
    amount: bigint,
    balance_from_before: bigint,
    balance_to_before: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.supplyBorrowContract.FinalizeTransferFuncAddr,
      [
        asset,
        from,
        to,
        amount.toString(),
        balance_from_before.toString(),
        balance_to_before.toString(),
      ],
    );
  }

  /// User liquidates a position
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

  /// User finalizes the transfer
  public async setUserUseReserveAsCollateral(
    asset: AccountAddress,
    useAsCollateral: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.supplyBorrowContract.SetUserUseReserveAsCollateralFuncAddr,
      [asset, useAsCollateral],
    );
  }

  /// Returns all user account data
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
