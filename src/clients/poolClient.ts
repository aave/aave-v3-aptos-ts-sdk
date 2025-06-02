import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
  MoveOption,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { AptosProvider } from "./aptosProvider";
import { PoolContract } from "../contracts/pool";
import { mapToBigInt } from "../helpers/common";
import { Object } from "../helpers/interfaces";

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
   * @type {bigint}
   */
  liquidityIndex: bigint;

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
   * The current deficit, expressed in ray.
   * @type {bigint}
   */
  deficit: bigint;

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
   * Timestamp until when liquidations are not allowed on the reserve, if set to past liquidations will be allowed (u40 -> u64).
   * @type {number}
   */
  liquidationGracePeriodUntil: number;

  /**
   * The address of the aToken.
   * @type {AccountAddress}
   */
  aTokenAddress: AccountAddress;

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
   * The outstanding debt borrowed against this asset in isolation mode.
   * @type {bigint}
   */
  isolationModeTotalDebt: bigint;

  /**
   * The amount of underlying accounted for by the protocol.
   * @type {bigint}
   */
  virtualUnderlyingBalance: bigint;
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

/**
 * The `PoolClient` class provides methods to interact with the Aave protocol's pool contracts on the Aptos blockchain.
 * It extends the `AptosContractWrapperBaseClass` and includes functionalities for managing reserves, configuring
 * pool parameters, handling user positions, and managing protocol fees.
 *
 * @remarks
 * This client is designed to work with the core pool contracts and provides a high-level API for pool operations.
 * The client can be instantiated in two ways:
 * 1. Using the constructor directly with a provider and optional signer
 * 2. Using the static buildWithDefaultSigner method which automatically configures the client with the provider's pool profile account
 *
 * @example
 * ```typescript
 * // Using buildWithDefaultSigner
 * const provider = new AptosProvider();
 * const client = PoolClient.buildWithDefaultSigner(provider);
 *
 * // Using constructor directly
 * const provider = new AptosProvider();
 * const signer = provider.getPoolProfileAccount();
 * const client = new PoolClient(provider, signer);
 *
 * // Get reserve data
 * const reserveData = await client.getReserveData(assetAddress);
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 * @param signer - Optional Ed25519Account signer for transaction signing.
 */
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
   * Mints the assets accrued through the reserve factor to the treasury in the form of aTokens.
   *
   * @param assets - An array of account addresses representing the assets to be minted to the treasury.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async mintToTreasury(
    assets: Array<AccountAddress>,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.poolTokenLogicMintToTreasuryFuncAddr,
      [assets],
    );
  }

  /**
   * Transfers aTokens from the user to the recipient.
   *
   * @param recipient The recipient of the aTokens
   * @param amount The amount of aTokens to transfer
   * @param aTokenAddress The Metadata of the aToken
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async transfer(
    recipient: AccountAddress,
    amount: bigint,
    aTokenAddress: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.poolTokenLogicTransferFuncAddr,
      [recipient, amount, aTokenAddress],
    );
  }

  /**
   * Sets the incentives controllers.
   *
   * @param underlyingAssets - An array of account addresses representing the assets on which to set incentives controllers.
    @param incentivesControllers - An array of account addresses representing the addresses of the incentives controllers.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async setIncentivesControllers(
    underlyingAssets: Array<AccountAddress>,
    incentivesControllers: Array<MoveOption<AccountAddress>>,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.poolTokenLogicSetIncentivesControllerFuncAddr,
      [underlyingAssets, incentivesControllers],
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
      this.poolContract.poolResetIsolationModeTotalDebtFuncAddr,
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
      this.poolContract.poolRescueTokensFuncAddr,
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
      this.poolContract.poolSetBridgeProtocolFeeFuncAddr,
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
      this.poolContract.poolSetFlashloanPremiumsFuncAddr,
      [flashloanPremiumTotal.toString(), flashloanPremiumToProtocol.toString()],
    );
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
      this.poolContract.poolGetReserveConfigurationFuncAddr,
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
    const [resp] = await this.callViewMethod(
      this.poolContract.poolGetReserveDataFuncAddr,
      [asset],
    );
    const object = AccountAddress.fromString((resp as Object).inner);
    return {
      configuration: await this.getReserveConfigurationByReserveData(object),
      liquidityIndex: await this.getReserveLiquidityIndex(object),
      currentLiquidityRate: await this.getReserveCurrentLiquidityRate(object),
      variableBorrowIndex: await this.getReserveVariableBorrowIndex(object),
      currentVariableBorrowRate:
        await this.getReserveCurrentVariableBorrowRate(object),
      deficit: await this.getReserveDeficit(object),
      lastUpdateTimestamp: await this.getReserveLastUpdateTimestamp(object),
      id: await this.getReserveId(object),
      liquidationGracePeriodUntil:
        await this.getLiquidationGracePeriodUntil(object),
      aTokenAddress: await this.getReserveATokenAddress(object),
      variableDebtTokenAddress:
        await this.getReserveVariableDebtTokenAddress(object),
      virtualUnderlyingBalance: await this.getVirtualUnderlyingBalance(object),
      accruedToTreasury: await this.getReserveAccruedToTreasury(object),
      isolationModeTotalDebt:
        await this.getReserveIsolationModeTotalDebt(object),
    } as ReserveData;
  }

  public async getReserveConfigurationByReserveData(
    object: AccountAddress,
  ): Promise<ReserveConfigurationMap> {
    const [resp] = await this.callViewMethod(
      this.poolContract.poolGetReserveConfigurationByReserveData,
      [object],
    );
    return resp as ReserveConfigurationMap;
  }

  public async getReserveLiquidityIndex(
    object: AccountAddress,
  ): Promise<bigint> {
    const [resp] = await this.callViewMethod(
      this.poolContract.poolGetReserveLiquidityIndex,
      [object],
    );
    return BigInt(resp.toString());
  }

  public async getReserveCurrentLiquidityRate(
    object: AccountAddress,
  ): Promise<bigint> {
    const [resp] = await this.callViewMethod(
      this.poolContract.poolGetReserveCurrentLiquidityRate,
      [object],
    );
    return BigInt(resp.toString());
  }

  public async getReserveVariableBorrowIndex(
    object: AccountAddress,
  ): Promise<bigint> {
    const [resp] = await this.callViewMethod(
      this.poolContract.poolGetReserveVariableBorrowIndex,
      [object],
    );
    return BigInt(resp.toString());
  }

  public async getReserveCurrentVariableBorrowRate(
    object: AccountAddress,
  ): Promise<bigint> {
    const [resp] = await this.callViewMethod(
      this.poolContract.poolGetReserveCurrentVariableBorrowRate,
      [object],
    );
    return BigInt(resp.toString());
  }

  public async getReserveLastUpdateTimestamp(
    object: AccountAddress,
  ): Promise<number> {
    const [resp] = await this.callViewMethod(
      this.poolContract.poolGetReserveLastUpdateTimestamp,
      [object],
    );
    return resp as number;
  }

  public async getLiquidationGracePeriodUntil(
    object: AccountAddress,
  ): Promise<number> {
    const [resp] = await this.callViewMethod(
      this.poolContract.poolGetReserveLiquidationGracePeriodUntil,
      [object],
    );
    return resp as number;
  }

  public async getVirtualUnderlyingBalance(
    object: AccountAddress,
  ): Promise<bigint> {
    const [resp] = await this.callViewMethod(
      this.poolContract.poolGetReserveVirtualUnderlyingBalance,
      [object],
    );
    return BigInt(resp.toString());
  }

  public async getReserveId(object: AccountAddress): Promise<number> {
    const [resp] = await this.callViewMethod(
      this.poolContract.poolGetReserveId,
      [object],
    );
    return resp as number;
  }

  public async getReserveATokenAddress(
    object: AccountAddress,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.poolContract.poolGetReserveATokenAddress,
      [object],
    );
    return AccountAddress.fromString(resp as string);
  }

  public async getReserveVariableDebtTokenAddress(
    object: AccountAddress,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.poolContract.poolGetReserveVariableDebtTokenAddress,
      [object],
    );
    return AccountAddress.fromString(resp as string);
  }

  public async getReserveAccruedToTreasury(
    object: AccountAddress,
  ): Promise<bigint> {
    const [resp] = await this.callViewMethod(
      this.poolContract.poolGetReserveAccruedToTreasury,
      [object],
    );
    return BigInt(resp.toString());
  }

  public async getReserveIsolationModeTotalDebt(
    object: AccountAddress,
  ): Promise<bigint> {
    const [resp] = await this.callViewMethod(
      this.poolContract.poolGetReserveIsolationModeTotalDebt,
      [object],
    );
    return BigInt(resp.toString());
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
      this.poolContract.getReserveDataAndReservesCountFuncAddr,
      [asset],
    );
    const respRaw = resp.at(0) as any;
    const reserveData = {
      configuration: respRaw.configuration as { data: number },
      liquidityIndex: BigInt(respRaw.liquidity_index),
      currentLiquidityRate: BigInt(respRaw.current_liquidity_rate.toString()),
      variableBorrowIndex: BigInt(respRaw.variable_borrow_index.toString()),
      currentVariableBorrowRate: BigInt(
        respRaw.current_variable_borrow_rate.toString(),
      ),
      deficit: BigInt(respRaw.deficit.toString()),
      lastUpdateTimestamp: respRaw.last_update_timestamp as number,
      id: respRaw.id as number,
      liquidationGracePeriodUntil:
        respRaw.liquidation_grace_period_until as number,
      aTokenAddress: AccountAddress.fromString(
        respRaw.a_token_address as string,
      ),
      variableDebtTokenAddress: AccountAddress.fromString(
        respRaw.variable_debt_token_address as string,
      ),
      accruedToTreasury: BigInt(respRaw.accrued_to_treasury.toString()),
      isolationModeTotalDebt: BigInt(
        respRaw.isolation_mode_total_debt.toString(),
      ),
      virtualUnderlyingBalance: BigInt(
        respRaw.virtual_underlying_balance.toString(),
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
        this.poolContract.poolGetReservesCountFuncAddr,
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
          this.poolContract.poolGetReservesListFuncAddr,
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
      this.poolContract.poolGetReserveAddressByIdFuncAddr,
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
        this.poolContract.poolGetReserveNormalizedVariableDebtFuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the normalized debt by reserve data.
   *
   * @param reserveData - The address of the reserve data.
   * @returns A promise that resolves to the normalized debt as a bigint.
   */
  public async getNormalizedDebtByReserveData(
    reserveData: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.poolGetNormalizedDebtByReserveData,
        [reserveData],
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
        this.poolContract.poolGetReserveNormalizedIncomeFuncAddr,
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
      this.poolContract.poolGetUserConfigurationFuncAddr,
      [account],
    );
    return resp as UserConfigurationMap;
  }

  /**
   * Retrieves the number of active reserves.
   *
   * @returns A promise that resolves to the number of active reserves.
   */
  public async numberOfActiveReserves(): Promise<number> {
    const [resp] = await this.callViewMethod(
      this.poolContract.poolGetNumberOfActiveReservesFuncAddr,
      [],
    );
    return resp as number;
  }

  /**
   * Retrieves the number of active and dropped reserves.
   *
   * @returns A promise that resolves to the number of active and dropped reserves.
   */
  public async numberOfActiveAndDroppedReserves(): Promise<number> {
    const [resp] = await this.callViewMethod(
      this.poolContract.poolGetNumberOfActiveAndDroppedReservesFuncAddr,
      [],
    );
    return resp as number;
  }

  /**
   * Retrieves the bridge protocol fee from the pool contract.
   *
   * @returns {Promise<bigint>} A promise that resolves to the bridge protocol fee as a bigint.
   */
  public async getBridgeProtocolFee(): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.poolGetBridgeProtocolFeeFuncAddr,
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
        this.poolContract.poolGetFlashloanPremiumTotalFuncAddr,
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
        this.poolContract.poolGetFlashloanPremiumToProtocolFuncAddr,
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
        this.poolContract.poolMaxNumberReservesFuncAddr,
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
   * @param incentivesController - An array of addresses representing the incentives controllers.
   * @param optimalUsageRatio - An array of numbers representing the optimal usage ratios.
   * @param baseVariableBorrowRate - An array of numbers representing the base variable borrow rates.
   * @param variableRateSlope1 - An array of numbers representing the variable rate slopes 1.
   * @param variableRateSlope2 - An array of numbers representing the variable rate slopes 2.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async initReserves(
    underlyingAsset: Array<AccountAddress>,
    treasury: Array<AccountAddress>,
    aTokenName: Array<string>,
    aTokenSymbol: Array<string>,
    variableDebtTokenName: Array<string>,
    variableDebtTokenSymbol: Array<string>,
    incentivesController: Array<MoveOption<AccountAddress>>,
    optimalUsageRatio: Array<bigint>,
    baseVariableBorrowRate: Array<bigint>,
    variableRateSlope1: Array<bigint>,
    variableRateSlope2: Array<bigint>,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.poolConfiguratorInitReservesFuncAddr,
      [
        underlyingAsset,
        treasury,
        aTokenName,
        aTokenSymbol,
        variableDebtTokenName,
        variableDebtTokenSymbol,
        incentivesController,
        optimalUsageRatio,
        baseVariableBorrowRate,
        variableRateSlope1,
        variableRateSlope2,
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
      this.poolContract.poolConfiguratorDropReserveFuncAddr,
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
      this.poolContract.poolConfiguratorSetAssetEmodeCategoryFuncAddr,
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
      this.poolContract.poolConfiguratorSetBorrowCapFuncAddr,
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
      this.poolContract.poolConfiguratorSetBorrowableInIsolationFuncAddr,
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
   * @param label - The label for the eMode category.
   * @returns A promise that resolves to the committed transaction response.
   */
  public async setEmodeCategory(
    categoryId: number,
    ltv: number,
    liquidationThreshold: number,
    liquidationBonus: number,
    label: string,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.poolConfiguratorSetEmodeCategoryFuncAddr,
      [categoryId, ltv, liquidationThreshold, liquidationBonus, label],
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
      this.poolContract.poolConfiguratorSetLiquidationProtocolFeeFuncAddr,
      [asset, newFee.toString()],
    );
  }

  /**
   * Pauses or unpauses the pool.
   *
   * @param paused - A boolean indicating whether to pause (true) or unpause (false) the pool.
   * @param gracePeriod - The grace period the pause is applied for.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async setPoolPause(
    paused: boolean,
    gracePeriod: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.poolConfiguratorSetPoolPauseFuncAddr,
      [paused, gracePeriod],
    );
  }

  /**
   * Pauses or unpauses the pool without setting any grace period.
   *
   * @param paused - A boolean indicating whether to pause (true) or unpause (false) the pool.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async setPoolPauseNoGracePeriod(
    paused: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.poolConfiguratorSetPoolPauseNoGracePeriodFuncAddr,
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
      this.poolContract.poolConfiguratorSetReserveActiveFuncAddr,
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
      this.poolContract.poolConfiguratorSetReserveBorrowingFuncAddr,
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
      this.poolContract.poolConfiguratorSetDebtCeilingFuncAddr,
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
      this.poolContract.poolConfiguratorConfigureReserveAsCollateralFuncAddr,
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
      this.poolContract.poolConfiguratorSetReserveFactorFuncAddr,
      [asset, newReserveFactor.toString()],
    );
  }

  /**
   * Retrieves the pending ltv for an asset from the pool contract.
   *
   * @returns {Promise<bigint>} A promise that resolves to the pending ltv as a bigint.
   */
  public async getPendingLtv(asset: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.poolConfiguratorGetPendingLtvFuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return resp;
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
      this.poolContract.poolConfiguratorSetReserveFlashLoaningFuncAddr,
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
      this.poolContract.poolConfiguratorSetReserveFreezeFuncAddr,
      [asset, freeze],
    );
  }

  /**
   * Sets the paused state of a reserve with a grace period.
   *
   * @param asset - The address of the asset to be paused or unpaused.
   * @param paused - A boolean indicating whether to pause (true) or unpause (false) the reserve.
   * @param gracePeriod - A number indicationg the grace period.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async setReservePaused(
    asset: AccountAddress,
    paused: boolean,
    gracePeriod: bigint = 0n,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.poolConfiguratorSetReservePauseFuncAddr,
      [asset, paused, gracePeriod],
    );
  }

  /**
   * Sets the paused state of a reserve without a grace period.
   *
   * @param asset - The address of the asset to be paused or unpaused.
   * @param paused - A boolean indicating whether to pause (true) or unpause (false) the reserve.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async setReservePausedNoGracePeriod(
    asset: AccountAddress,
    paused: boolean,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.poolConfiguratorSetReservePauseNoGracePeriodFuncAddr,
      [asset, paused],
    );
  }

  /**
   * Disables the liquidation with no grace period.
   *
   * @param asset - The address of the asset.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async disableLiquidationdNoGracePeriod(
    asset: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.poolConfiguratorDisableLiquidationGracePeriodFuncAddr,
      [asset],
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
      this.poolContract.poolConfiguratorSetSiloedBorrowingFuncAddr,
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
      this.poolContract.poolConfiguratorSetSupplyCapFuncAddr,
      [asset, newSupplyCap.toString()],
    );
  }

  /**
   * Updates the interest rate strategy.
   *
   * @param asset - The account address of the asset for which the interest rate strategy is to be applied.
   * @param optimalUsageRatio - The optimal usage ratio of the interest rate strategy which is to be applied.
   * @param baseVariableBorrowRate - The base variable borrow rate for which the interest rate strategy is to be applied.
   * @param variableRateSlope1 - The variable rate slope 1 of the interest rate strategy which is to be applied.
   * @param variableRateSlope2 -  The variable rate slope 2 of the interest rate strategy which is to be applied.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async updateInterestRateStrategy(
    asset: AccountAddress,
    optimalUsageRatio: bigint,
    baseVariableBorrowRate: bigint,
    variableRateSlope1: bigint,
    variableRateSlope2: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.poolConfiguratorUpdateInterestRateStrategyFuncAddr,
      [
        asset,
        optimalUsageRatio,
        baseVariableBorrowRate,
        variableRateSlope1,
        variableRateSlope2,
      ],
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
        .poolConfiguratorUpdateFlashloanPremiumToProtocolFuncAddr,
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
      this.poolContract.poolConfiguratorUpdateFlashloanPremiumTotalFuncAddr,
      [newFlashloanPremiumTotal.toString()],
    );
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
      this.poolContract.poolSetUserEmodeFuncAddr,
      [categoryId],
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
      this.poolContract.poolGetEmodeCategoryDataFuncAddr,
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
      this.poolContract.poolGetUserEmodeFuncAddr,
      [user],
    );
    return resp as number;
  }

  /**
   * Retrieves the eMode (efficiency mode) label from the pool contract.
   *
   * @param emodeCategory - The emode cateogory number.
   * @returns A promise that resolves to the emode label as a sting.
   */
  public async getEmodeEmodeLabel(emodeCategory: number): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.poolContract.poolGetEmodeEmodeLabelFuncAddr,
      [emodeCategory],
    );
    return resp as string;
  }

  /**
   * Retrieves the eMode (efficiency mode) liquidation bonus from the pool contract.
   *
   * @param userEmodeCategory - The emode cateogory of the user.
   * @returns A promise that resolves to the emode liquidation bonus as a number.
   */
  public async getEmodeEmodeLiquidationBonus(
    userEmodeCategory: number,
  ): Promise<number> {
    const [resp] = await this.callViewMethod(
      this.poolContract.poolGetEmodeEmodeLiquidationBonusFuncAddr,
      [userEmodeCategory],
    );
    return resp as number;
  }

  /**
   * Checks if the combination user and asset categories are an emode or not.
   *
   * @param emodeUserCategory - The emode cateogory of the user.
   * @param emodeAssetCategory - The emode cateogory of the asset.
   * @returns A promise that resolves to a boolean.
   */
  public async isInEmodeCategory(
    emodeUserCategory: number,
    emodeAssetCategory: number,
  ): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.poolContract.poolIsInEmodeCategoryFuncAddr,
      [emodeUserCategory, emodeAssetCategory],
    );
    return resp as boolean;
  }

  /**
   * Retrieves the user account data by user emode category from the pool contract.
   *
   * @param userEmodeCategory - The emode cateogory of the user.
   * @returns A promise that resolves to the emode ltv and liquidation threshold as a number.
   */
  public async getUserAccountData(userEmodeCategory: number): Promise<{
    ltv: bigint;
    liquidationThreshold: bigint;
  }> {
    const [ltv, liquidationThreshold] = (
      await this.callViewMethod(
        this.poolContract.poolGetEmodeConfigurationFuncAddr,
        [userEmodeCategory],
      )
    ).map(mapToBigInt);
    return {
      ltv,
      liquidationThreshold,
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
          this.poolContract.getAllReservesTokensFuncAddr,
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
        await this.callViewMethod(this.poolContract.getAllATokensFuncAddr, [])
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
          this.poolContract.getAllVariableTokensFuncAddr,
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
      this.poolContract.getReserveConfigurationDataFuncAddr,
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
      this.poolContract.getReserveEModeCategoryFuncAddr,
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
      this.poolContract.getReserveCapsFuncAddr,
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
    const [isPaused] = await this.callViewMethod(
      this.poolContract.getPausedFuncAddr,
      [asset],
    );
    return isPaused as boolean;
  }

  /**
   * Retrieves the siloed borrowing status for a given asset.
   *
   * @param asset - The account address of the asset to check.
   * @returns A promise that resolves to a boolean indicating whether the asset has siloed borrowing enabled.
   */
  public async getSiloedBorrowing(asset: AccountAddress): Promise<boolean> {
    const [isSiloedBorrowing] = await this.callViewMethod(
      this.poolContract.getSiloedBorrowingFuncAddr,
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
    const [liquidationProtocolFee] = (
      await this.callViewMethod(
        this.poolContract.getLiquidationProtocolFeeTokensFuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return liquidationProtocolFee;
  }

  /**
   * Retrieves the debt ceiling for a given asset.
   *
   * @param asset - The account address of the asset for which to get the debt ceiling.
   * @returns A promise that resolves to the debt ceiling as a bigint.
   */
  public async getDebtCeiling(asset: AccountAddress): Promise<bigint> {
    const [debtCeiling] = (
      await this.callViewMethod(this.poolContract.getDebtCeilingFuncAddr, [
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
        this.poolContract.getDebtCeilingDecimalsFuncAddr,
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
      reserveAccruedToTreasury,
      aTokenSupply,
      varTokenSupply,
      reserveCurrentLiquidityRate,
      reserveCurrentVariableBorrowRate,
      reserveLiquidityIndex,
      reserveVarBorrowIndex,
      reserveLastUpdateTimestamp,
    ] = await this.callViewMethod(
      this.poolContract.getReserveEModeCategoryFuncAddr,
      [asset],
    );
    return {
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
        this.poolContract.getATokenTotalSupplyFuncAddr,
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
      await this.callViewMethod(this.poolContract.getTotalDebtFuncAddr, [asset])
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
      this.poolContract.getUserReserveDataFuncAddr,
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
        this.poolContract.getReserveTokensAddressesFuncAddr,
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
      this.poolContract.getFlashLoanEnabledFuncAddr,
      [asset],
    );
    return isFlashloanEnabled as boolean;
  }

  /**
   * Retrieves the reserve deficit for a given asset.
   *
   * @param asset - The address of the asset to check.
   * @returns A promise that resolves to a bigint.
   */
  public async getReserveDeficit(asset: AccountAddress): Promise<bigint> {
    const [reserveDeficit] = (
      await this.callViewMethod(
        this.poolContract.poolGetReserveDeficitFuncAddr,
        [asset],
      )
    ).map(mapToBigInt);
    return reserveDeficit;
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
        this.poolContract.poolScaledATokenTotalSupplyFuncAddr,
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
        this.poolContract.poolScaledATokenBalanceOfFuncAddr,
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
        this.poolContract.poolScaledVariableTokenTotalSupplyFuncAddr,
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
        this.poolContract.poolScaledVariableTokenBalanceOfFuncAddr,
        [owner, varTokenAddress],
      )
    ).map(mapToBigInt);
    return balance;
  }

  /**
   * Sets a new apt fee to the fee manager.
   *
   * @param newAptFee - The new apt fee to apply.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async feeManagerSetAptFee(
    newAptFee: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.feeManagerSetAptFeeFuncAddr,
      [newAptFee],
    );
  }

  /**
   * Transfers the collected fees by the fee manager to a given account.
   *
   * @param to - The account address to whom to transfer the collected fees.
   * @param amount - The collected fee amount to transfer.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async feeManagerTransferAptFee(
    to: AccountAddress,
    amount: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.feeManagerTransferAptFeeFuncAddr,
      [to, amount],
    );
  }

  /**
   * Retrieves the apt fee of the manager.
   *
   * @returns A promise that resolves to the apt fee as a bigint.
   */
  public async getFeeManagerGetAptFee(): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.feeManagerGetAptFeeFuncAddr,
        [],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the fee collector address.
   *
   * @returns A promise that resolves to the fee collector address.
   */
  public async getFeeManagerCollectorAddress(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.poolContract.feeManagerGetFeeCollectorAddressFuncAddr,
      [],
    );
    return AccountAddress.fromString(resp as string);
  }

  /**
   * Retrieves the fee collector apt balance.
   *
   * @returns A promise that resolves to the fee collector apt balance.
   */
  public async getFeeManagerCollectorAptBalance(): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.feeManagerGetFeeCollectorAptBalanceFuncAddr,
        [],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the total fees collected by the fee manager.
   *
   * @returns A promise that resolves to the fee collector total collected fees.
   */
  public async getFeeManagerTotalFees(): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.feeManagerGetTotalFeesFuncAddr,
        [],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the fee manager object address.
   *
   * @returns A promise that resolves to the fee manager object address.
   */
  public async getFeeManagerGetFeeConfigObjectAddress(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.poolContract.feeManagerGetFeeConfigObjectAddressFuncAddr,
      [],
    );
    return AccountAddress.fromString(resp as string);
  }

  /**
   * Returns if the address is the funds admin of the collector.
   *
   * @returns A promise that resolves to a boolean.
   */
  public async getCollectorIsFundsAdmin(
    account: AccountAddress,
  ): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.poolContract.collectorIsFundsAdminFuncAddr,
      [account],
    );
    return resp as boolean;
  }

  /**
   * Transfers the collected fees by the collector to a given account.
   *
   * @param asset - The asset address.
   * @param receiver - The account address to whom to transfer the collected fees.
   * @param amount - The collected fee amount to transfer.
   * @returns A promise that resolves to a CommittedTransactionResponse.
   */
  public async collectorWithdraw(
    asset: AccountAddress,
    receiver: AccountAddress,
    amount: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.collectorWithdrawFuncAddr,
      [asset, receiver, amount],
    );
  }

  /**
   * Retrieves the collector address.
   *
   * @returns A promise that resolves to the collector address.
   */
  public async getCollectorAddress(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.poolContract.collectorAddressFeeFuncAddr,
      [],
    );
    return AccountAddress.fromString(resp as string);
  }

  /**
   * Retrieves the total fees collected by the collector.
   *
   * @returns A promise that resolves to the fee collector total collected fees.
   */
  public async getCollectorCollectedFees(): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.poolContract.collectorGetCollectedFeesFuncAddr,
        [],
      )
    ).map(mapToBigInt);
    return resp;
  }
}
