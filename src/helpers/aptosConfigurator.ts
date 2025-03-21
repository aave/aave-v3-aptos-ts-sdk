import {
  Account,
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
  Ed25519PrivateKey,
  PrivateKey,
  PrivateKeyVariants,
} from "@aptos-labs/ts-sdk";
import { PoolClient } from "../clients/poolClient";
import { UnderlyingTokensClient } from "../clients/underlyingTokensClient";
import { AptosProvider, AptosProviderConfig } from "../clients/aptosProvider";
import { OracleClient } from "../clients/oracleClient";
import { priceFeeds } from "./priceFeeds";
import { ONE_OCTA } from "./constants";
import { RateClient } from "../clients";

/**
 * Interface representing the configuration of a reserve in the Aave protocol.
 *
 * @property priceInMarketReferenceCurrency - The price of the reserve in the market reference currency.
 * @property maxSupply - The maximum supply of the reserve.
 * @property name - The name of the reserve.
 * @property symbol - The symbol of the reserve.
 * @property decimals - The number of decimals of the reserve.
 * @property iconUri - The URI of the icon representing the reserve.
 * @property projectUri - The URI of the project associated with the reserve.
 * @property treasury - The account address of the treasury.
 * @property aTokenName - The name of the aToken associated with the reserve.
 * @property aTokenSymbol - The symbol of the aToken associated with the reserve.
 * @property variableDebtTokenName - The name of the variable debt token associated with the reserve.
 * @property variableDebtTokenSymbol - The symbol of the variable debt token associated with the reserve.
 * @property optimalUsageRatio - The optimal usage ratio of the reserve.
 * @property baseVariableBorrowRate - The base variable borrow rate of the reserve.
 * @property variableRateSlope1 - The first slope of the variable rate of the reserve.
 * @property variableRateSlope2 - The second slope of the variable rate of the reserve.
 * @property ltv - The loan-to-value ratio of the reserve.
 * @property liquidationThreshold - The liquidation threshold of the reserve.
 * @property liquidationBonus - The liquidation bonus of the reserve.
 * @property reserveFactor - The reserve factor of the reserve.
 * @property borrowCap - The borrowing cap of the reserve.
 * @property supplyCap - The supply cap of the reserve.
 * @property borrowingEnabled - Whether borrowing is enabled for the reserve.
 * @property flashloanEnabled - Whether flashloans are enabled for the reserve.
 * @property eModeCategoryId - The eMode category ID of the reserve.
 * @property borrowableInIsolation - Whether the reserve is borrowable in isolation mode.
 * @property active - Whether the reserve is active.
 * @property paused - Whether the reserve is paused.
 * @property freezed - Whether the reserve is freezed.
 * @property debtCeiling - The debt ceiling of the reserve.
 */
export interface ReserveConfig {
  priceInMarketReferenceCurrency: bigint;
  maxSupply: bigint;
  name: string;
  symbol: string;
  decimals: number;
  iconUri: string;
  projectUri: string;
  treasury: AccountAddress;
  aTokenName: string;
  aTokenSymbol: string;
  variableDebtTokenName: string;
  variableDebtTokenSymbol: string;
  optimalUsageRatio: bigint;
  baseVariableBorrowRate: bigint;
  variableRateSlope1: bigint;
  variableRateSlope2: bigint;
  ltv: bigint;
  liquidationThreshold: bigint;
  liquidationBonus: bigint;
  reserveFactor: bigint;
  borrowCap: bigint;
  supplyCap: bigint;
  borrowingEnabled: boolean;
  flashloanEnabled: boolean;
  eModeCategoryId: number;
  borrowableInIsolation: boolean;
  active: boolean;
  paused: boolean;
  freezed: boolean;
  debtCeiling: bigint;
}

/**
 * Configuration for EMode (Efficiency Mode) in the Aave protocol.
 *
 * @interface EModeConfig
 *
 * @property {number} categoryId - The unique identifier for the EMode category.
 * @property {number} ltv - Loan-to-Value ratio, representing the maximum borrowing power of the asset.
 * @property {number} liquidationThreshold - The threshold at which the asset will be considered for liquidation.
 * @property {number} liquidationBonus - The bonus applied to the liquidator's reward.
 * @property {AccountAddress} oracle - The address of the oracle providing price feeds for the asset.
 * @property {string} label - A human-readable label for the EMode category.
 */
interface EModeConfig {
  categoryId: number;
  ltv: number;
  liquidationThreshold: number;
  liquidationBonus: number;
  oracle: AccountAddress;
  label: string;
}

/**
 * Configuration for the price of an asset.
 *
 * @interface AssetPriceConfig
 * @property {string} symbol - The symbol of the asset.
 * @property {AccountAddress} address - The account address of the asset.
 * @property {bigint} priceInMarketReferenceCurrency - The price of the asset in the market reference currency.
 */
interface AssetPriceConfig {
  symbol: string;
  address: AccountAddress;
  priceInMarketReferenceCurrency: bigint;
}

/**
 * Interface representing the configuration for a token.
 *
 * @interface TokenConfig
 * @property {bigint} maxSupply - The maximum supply of the token.
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimal places the token uses.
 * @property {string} iconUri - The URI of the token's icon.
 * @property {string} projectUri - The URI of the token's project.
 */
interface TokenConfig {
  maxSupply: bigint;
  name: string;
  symbol: string;
  decimals: number;
  iconUri: string;
  projectUri: string;
}

/**
 * Configuration for a reserve strategy.
 *
 * @interface ReserveStrategyConfig
 *
 * @property {string} symbol - The symbol representing the reserve.
 * @property {AccountAddress} address - The account address associated with the reserve.
 * @property {bigint} optimalUsageRatio - The optimal usage ratio for the reserve.
 * @property {bigint} baseVariableBorrowRate - The base variable borrow rate for the reserve.
 * @property {bigint} variableRateSlope1 - The first slope of the variable rate for the reserve.
 * @property {bigint} variableRateSlope2 - The second slope of the variable rate for the reserve.
 */
interface ReserveStrategyConfig {
  symbol: string;
  address: AccountAddress;
  optimalUsageRatio: bigint;
  baseVariableBorrowRate: bigint;
  variableRateSlope1: bigint;
  variableRateSlope2: bigint;
}

/**
 * A utility type that adds an `address` property of type `AccountAddress` to an existing type `T`.
 *
 * @template T - The original type to which the `address` property will be added.
 */
type WithAccountAddress<T> = T & { address: AccountAddress };

export class AptosConfigurator {
  provider: AptosProvider;
  poolClient: PoolClient;
  rateClient: RateClient;
  oracleClient: OracleClient;
  underlyingTokenClient: UnderlyingTokensClient;
  mnemonic?: string;

  /**
   * Constructs an instance of the AptosConfigurator.
   *
   * @param {AptosProviderConfig} config - The configuration for the Aptos provider.
   * @param {string} poolPK - The private key for the pool account.
   * @param {string} oraclePK - The private key for the oracle account.
   * @param {string} underlyingTokensPK - The private key for the underlying tokens account.
   * @param {string} [mnemonic] - An optional mnemonic for the account.
   */
  constructor(
    config: AptosProviderConfig,
    poolPK: string,
    oraclePK: string,
    ratePK: string,
    underlyingTokensPK: string,
    mnemonic?: string,
  ) {
    this.provider = AptosProvider.fromConfig(config);

    const poolSigner = Account.fromPrivateKey({
      privateKey: new Ed25519PrivateKey(
        PrivateKey.formatPrivateKey(poolPK, PrivateKeyVariants.Ed25519),
      ),
    });

    const oracleSigner = Account.fromPrivateKey({
      privateKey: new Ed25519PrivateKey(
        PrivateKey.formatPrivateKey(oraclePK, PrivateKeyVariants.Ed25519),
      ),
    });

    const rateSigner = Account.fromPrivateKey({
      privateKey: new Ed25519PrivateKey(
        PrivateKey.formatPrivateKey(ratePK, PrivateKeyVariants.Ed25519),
      ),
    });

    const underlyingTokenSigner = Account.fromPrivateKey({
      privateKey: new Ed25519PrivateKey(
        PrivateKey.formatPrivateKey(
          underlyingTokensPK,
          PrivateKeyVariants.Ed25519,
        ),
      ),
    });
    this.underlyingTokenClient = new UnderlyingTokensClient(
      this.provider,
      underlyingTokenSigner,
    );
    this.poolClient = new PoolClient(this.provider, poolSigner);
    this.oracleClient = new OracleClient(this.provider, oracleSigner);
    this.rateClient = new RateClient(this.provider, rateSigner);
    this.mnemonic = mnemonic;
  }

  /**
   * Sets multiple E-Modes by calling the setEMode method for each EModeConfig in the provided array.
   *
   * @param eModes - An array of EModeConfig objects to be set.
   * @returns A promise that resolves to an array of CommittedTransactionResponse objects, each representing the result of setting an E-Mode.
   */
  async setEModes(
    eModes: EModeConfig[],
  ): Promise<CommittedTransactionResponse[]> {
    const receipts: CommittedTransactionResponse[] = [];
    for (const eMode of eModes) {
      const receipt = await this.setEMode(eMode);
      receipts.push(receipt);
    }
    return receipts;
  }

  /**
   * Sets the EMode configuration for the pool.
   *
   * @param {EModeConfig} eMode - The configuration object for EMode.
   * @returns {Promise<CommittedTransactionResponse>} - A promise that resolves to the transaction response.
   *
   * @example
   * const eModeConfig = {
   *   categoryId: 1,
   *   ltv: 75,
   *   liquidationThreshold: 80,
   *   liquidationBonus: 5,
   *   oracle: '0xOracleAddress',
   *   label: 'Stablecoins'
   * };
   *
   * const receipt = await setEMode(eModeConfig);
   * console.log(`Transaction hash: ${receipt.hash}`);
   */
  async setEMode(eMode: EModeConfig): Promise<CommittedTransactionResponse> {
    const receipt = await this.poolClient.setEmodeCategory(
      eMode.categoryId,
      eMode.ltv,
      eMode.liquidationThreshold,
      eMode.liquidationBonus,
      eMode.oracle,
      eMode.label,
    );
    console.log(
      `EMODE ${eMode.label} with id ${eMode.categoryId} was setup, tx hash ${receipt.hash}`,
    );
    return receipt;
  }

  /**
   * Sets the reserve interest rate strategy for a given asset.
   *
   * @param strategy - The configuration object for the reserve strategy.
   * @returns A promise that resolves to the committed transaction response.
   *
   * @example
   * ```typescript
   * const strategyConfig: ReserveStrategyConfig = {
   *   address: '0x...',
   *   optimalUsageRatio: 0.8,
   *   baseVariableBorrowRate: 0.02,
   *   variableRateSlope1: 0.04,
   *   variableRateSlope2: 0.75,
   *   symbol: 'DAI'
   * };
   *
   * const receipt = await setReserveInterestRateStrategy(strategyConfig);
   * console.log(`Transaction hash: ${receipt.hash}`);
   * ```
   */
  async setReserveInterestRateStrategy(
    strategy: ReserveStrategyConfig,
  ): Promise<CommittedTransactionResponse> {
    const receipt = await this.rateClient.setReserveInterestRateStrategy(
      strategy.address,
      strategy.optimalUsageRatio,
      strategy.baseVariableBorrowRate,
      strategy.variableRateSlope1,
      strategy.variableRateSlope2,
    );
    console.log(
      `Strategy for asset ${strategy.symbol} was setup, tx ${receipt.hash}`,
    );
    return receipt;
  }

  /**
   * Sets the borrowable in isolation status for a list of reserves.
   *
   * @param reservesConfig - An array of reserve configurations, each containing an account address and the borrowable in isolation status.
   * @returns A promise that resolves to an array of committed transaction responses.
   *
   * @example
   * ```typescript
   * const reservesConfig = [
   *   { address: '0x...', borrowableInIsolation: true, symbol: 'USDC' },
   *   { address: '0x...', borrowableInIsolation: false, symbol: 'DAI' },
   * ];
   * const receipts = await setReservesBorrowableInIsolation(reservesConfig);
   * console.log(receipts);
   * ```
   */
  async setReservesBorrowableInIsolation(
    reservesConfig: WithAccountAddress<ReserveConfig>[],
  ): Promise<CommittedTransactionResponse[]> {
    const receipts: CommittedTransactionResponse[] = [];
    for (const reserve of reservesConfig) {
      const receipt = await this.poolClient.setBorrowableInIsolation(
        reserve.address,
        reserve.borrowableInIsolation,
      );
      console.log(
        `RESERVE ${reserve.symbol} was configured with borrowableInIsolation ${reserve.borrowableInIsolation}, tx ${receipt.hash}`,
      );
      receipts.push(receipt);
    }
    return receipts;
  }

  /**
   * Sets the interest rate strategy for multiple reserves.
   *
   * @param {ReserveStrategyConfig[]} strategies - An array of reserve strategy configurations.
   * @returns {Promise<CommittedTransactionResponse[]>} A promise that resolves to an array of committed transaction responses.
   */
  async setReservesInterestRateStrategy(
    strategies: ReserveStrategyConfig[],
  ): Promise<CommittedTransactionResponse[]> {
    const receipts: CommittedTransactionResponse[] = [];
    for (const strategy of strategies) {
      const receipt = await this.setReserveInterestRateStrategy(strategy);
      receipts.push(receipt);
    }
    return receipts;
  }

  /**
   * Sets the price of multiple assets using the oracle client.
   *
   * @param assets - An array of asset price configurations.
   * Each configuration includes the asset's address, symbol, and price in the market reference currency.
   *
   * @returns A promise that resolves to an array of committed transaction responses.
   * Each response contains details about the transaction that set the asset's price.
   */
  async setAssetsPrice(assets: AssetPriceConfig[]) {
    const receipts: CommittedTransactionResponse[] = [];
    for (const asset of assets) {
      const receipt = await this.oracleClient.setAssetFeedId(
        asset.address,
        priceFeeds[asset.symbol],
      );
      console.log(
        `TOKEN ${asset.symbol} price set at ${asset.priceInMarketReferenceCurrency}, tx hash ${receipt.hash}`,
      );
      receipts.push(receipt);
    }
    return receipts;
  }

  /**
   * Creates tokens based on the provided configuration and returns an array of tokens with their associated account addresses.
   *
   * @template T - The type of the token configuration.
   * @param {T[]} tokens - An array of token configurations.
   * @returns {Promise<WithAccountAddress<T>[]>} A promise that resolves to an array of tokens with their associated account addresses.
   */
  async createTokens<T extends TokenConfig>(
    tokens: T[],
  ): Promise<WithAccountAddress<T>[]> {
    const tokenWithAddress: WithAccountAddress<T>[] = [];
    for (const token of tokens) {
      await this.underlyingTokenClient.createToken(
        token.maxSupply,
        token.name,
        token.symbol,
        token.decimals,
        token.iconUri,
        token.projectUri,
      );
      const address = await this.underlyingTokenClient.getMetadataBySymbol(
        token.symbol,
      );
      tokenWithAddress.push({
        ...token,
        address,
      });
    }
    return tokenWithAddress;
  }

  /**
   * Attempts to create tokens based on the provided token configurations.
   *
   * @template T - The type of the token configuration.
   * @param {T[]} tokens - An array of token configurations.
   * @returns {Promise<WithAccountAddress<T>[]>} - A promise that resolves to an array of tokens with their associated account addresses.
   *
   * @remarks
   * This method first checks if a token with the given symbol already exists by fetching its metadata.
   * If the token does not exist, it creates a new token with the provided configuration and retrieves its address.
   * If the token already exists, it fetches additional metadata such as the maximum supply, name, and decimals.
   *
   * @example
   * ```typescript
   * const tokens = [
   *   { symbol: 'TOKEN1', maxSupply: 1000, name: 'Token One', decimals: 18, iconUri: 'http://example.com/icon1.png', projectUri: 'http://example.com/project1' },
   *   { symbol: 'TOKEN2', maxSupply: 2000, name: 'Token Two', decimals: 18, iconUri: 'http://example.com/icon2.png', projectUri: 'http://example.com/project2' }
   * ];
   * const result = await tryCreateTokens(tokens);
   * console.log(result);
   * ```
   */
  async tryCreateTokens<T extends TokenConfig>(
    tokens: T[],
  ): Promise<WithAccountAddress<T>[]> {
    const tokenWithAddress: WithAccountAddress<T>[] = [];
    for (const token of tokens) {
      var tokenAddress: AccountAddress | undefined = undefined;
      try {
        tokenAddress = await this.underlyingTokenClient.getMetadataBySymbol(
          token.symbol,
        );
      } catch {
        tokenAddress = undefined;
      }
      if (!tokenAddress) {
        const tx = await this.underlyingTokenClient.createToken(
          token.maxSupply,
          token.name,
          token.symbol,
          token.decimals,
          token.iconUri,
          token.projectUri,
        );
        console.log(`TOKEN ${token.symbol} was created, tx ${tx.hash}`);
        const address = await this.underlyingTokenClient.getMetadataBySymbol(
          token.symbol,
        );
        tokenWithAddress.push({
          ...token,
          address,
        });
      } else {
        console.log(`TOKEN ${token.symbol} already exist`);
        const maxSupply =
          await this.underlyingTokenClient.maximum(tokenAddress);
        const data = await this.provider
          .getAptos()
          .getFungibleAssetMetadataByAssetType({
            assetType: tokenAddress.toString(),
          });
        tokenWithAddress.push({
          ...token,
          address: tokenAddress,
          name: data.name,
          decimals: data.decimals,
          maxSupply,
        });
      }
    }
    return tokenWithAddress;
  }

  /**
   * Sets the debt ceiling for a list of reserves if the current debt ceiling is different from the desired one.
   *
   * @param reservesConfig - An array of reserve configurations, each containing an account address and the desired debt ceiling.
   * @returns A promise that resolves to an array of committed transaction responses.
   *
   * @remarks
   * This method iterates over the provided reserve configurations and checks the current debt ceiling for each reserve.
   * If the current debt ceiling is different from the desired debt ceiling, it updates the debt ceiling and logs the transaction.
   *
   * @example
   * ```typescript
   * const reservesConfig = [
   *   { address: '0x1', debtCeiling: 1000, symbol: 'RESERVE1' },
   *   { address: '0x2', debtCeiling: 2000, symbol: 'RESERVE2' },
   * ];
   * const receipts = await aptosConfigurator.setReservesDebtCeiling(reservesConfig);
   * console.log(receipts);
   * ```
   */
  async setReservesDebtCeiling(
    reservesConfig: WithAccountAddress<ReserveConfig>[],
  ): Promise<CommittedTransactionResponse[]> {
    const receipts: CommittedTransactionResponse[] = [];
    for (const reserve of reservesConfig) {
      const currentDebtCeiling = await this.poolClient.getDebtCeiling(
        reserve.address,
      );
      if (currentDebtCeiling !== reserve.debtCeiling) {
        const receipt = await this.poolClient.setDebtCeiling(
          reserve.address,
          reserve.debtCeiling,
        );
        console.log(
          `RESERVE ${reserve.symbol} was configured with debt ceiling ${reserve.debtCeiling}, tx ${receipt.hash}`,
        );
        receipts.push(receipt);
      }
    }
    return receipts;
  }

  /**
   * Configures multiple reserves with the provided configuration settings.
   *
   * @param reservesConfig - An array of reserve configurations, each including the account address and various reserve parameters.
   * @returns A promise that resolves to undefined when all reserves have been configured.
   *
   * @remarks
   * This method sequentially configures each reserve by setting its collateral parameters, reserve factor, borrow cap, supply cap,
   * borrowing enabled status, and flash loaning enabled status using the `poolClient` instance.
   *
   * @example
   * ```typescript
   * const reservesConfig = [
   *   {
   *     address: '0x1',
   *     ltv: 75,
   *     liquidationThreshold: 80,
   *     liquidationBonus: 5,
   *     reserveFactor: 10,
   *     borrowCap: 1000,
   *     supplyCap: 2000,
   *     borrowingEnabled: true,
   *     flashloanEnabled: false,
   *   },
   *   // more reserve configurations
   * ];
   * await configReserves(reservesConfig);
   * ```
   */
  async configReserves(
    reservesConfig: WithAccountAddress<ReserveConfig>[],
  ): Promise<undefined> {
    for (const reserve of reservesConfig) {
      await this.poolClient.configureReserveAsCollateral(
        reserve.address,
        reserve.ltv,
        reserve.liquidationThreshold,
        reserve.liquidationBonus,
      );
      await this.poolClient.setReserveFactor(
        reserve.address,
        reserve.reserveFactor,
      );
      await this.poolClient.setBorrowCap(reserve.address, reserve.borrowCap);
      await this.poolClient.setSupplyCap(reserve.address, reserve.supplyCap);
      await this.poolClient.setReserveBorrowing(
        reserve.address,
        reserve.borrowingEnabled,
      );
      await this.poolClient.setReserveFlashLoaning(
        reserve.address,
        reserve.flashloanEnabled,
      );
    }
    return;
  }

  /**
   * Sets the eMode category for a list of reserves.
   *
   * @param reservesConfig - An array of reserve configurations, each containing an account address and eMode category ID.
   * @returns A promise that resolves to an array of committed transaction responses.
   *
   * @example
   * ```typescript
   * const reservesConfig = [
   *   { address: '0x...', eModeCategoryId: 1, symbol: 'ETH' },
   *   { address: '0x...', eModeCategoryId: 2, symbol: 'DAI' },
   * ];
   * const receipts = await setReservesEModeCategory(reservesConfig);
   * console.log(receipts);
   * ```
   */
  async setReservesEModeCategory(
    reservesConfig: WithAccountAddress<ReserveConfig>[],
  ): Promise<CommittedTransactionResponse[]> {
    const receipts: CommittedTransactionResponse[] = [];
    for (const reserve of reservesConfig) {
      const receipt = await this.poolClient.setAssetEmodeCategory(
        reserve.address,
        reserve.eModeCategoryId,
      );
      console.log(
        `RESERVE ${reserve.symbol} was configured with eMode ${reserve.eModeCategoryId}, tx ${receipt.hash}`,
      );
    }
    return receipts;
  }

  /**
   * Sets the active status of multiple reserves.
   *
   * @param reservesConfig - An array of reserve configurations, each containing an account address and reserve configuration details.
   * @returns A promise that resolves to an array of committed transaction responses.
   *
   * @example
   * ```typescript
   * const reservesConfig = [
   *   { address: '0x1', symbol: 'RESERVE1', active: true },
   *   { address: '0x2', symbol: 'RESERVE2', active: false },
   * ];
   * const receipts = await aptosConfigurator.setReservesActive(reservesConfig);
   * console.log(receipts);
   * ```
   */
  async setReservesActive(
    reservesConfig: WithAccountAddress<ReserveConfig>[],
  ): Promise<CommittedTransactionResponse[]> {
    const receipts: CommittedTransactionResponse[] = [];
    for (const reserve of reservesConfig) {
      const receipt = await this.poolClient.setReserveActive(
        reserve.address,
        reserve.active,
      );
      console.log(
        `RESERVE ${reserve.symbol} was set active=${reserve.active}, tx ${receipt.hash}`,
      );
    }
    return receipts;
  }

  /**
   * Pauses or unpauses a list of reserves.
   *
   * @param reservesConfig - An array of reserve configurations, each containing an account address and reserve configuration details.
   * @returns A promise that resolves to an array of committed transaction responses.
   *
   * @example
   * ```typescript
   * const reservesConfig = [
   *   { address: '0x...', symbol: 'USDC', paused: true },
   *   { address: '0x...', symbol: 'DAI', paused: false },
   * ];
   * const receipts = await setReservesPaused(reservesConfig);
   * receipts.forEach(receipt => console.log(receipt.hash));
   * ```
   */
  async setReservesPaused(
    reservesConfig: WithAccountAddress<ReserveConfig>[],
  ): Promise<CommittedTransactionResponse[]> {
    const receipts: CommittedTransactionResponse[] = [];
    for (const reserve of reservesConfig) {
      const receipt = await this.poolClient.setReservePaused(
        reserve.address,
        reserve.paused,
      );
      console.log(
        `RESERVE ${reserve.symbol} was set paused=${reserve.paused}, tx ${receipt.hash}`,
      );
    }
    return receipts;
  }

  /**
   * Sets the freeze status for multiple reserves.
   *
   * @param reservesConfig - An array of reserve configurations, each containing an account address and reserve configuration details.
   * @returns A promise that resolves to an array of committed transaction responses.
   *
   * @example
   * ```typescript
   * const reservesConfig = [
   *   { address: '0x1', symbol: 'USDC', freezed: true },
   *   { address: '0x2', symbol: 'DAI', freezed: false },
   * ];
   * const receipts = await aptosConfigurator.setReservesFreezed(reservesConfig);
   * console.log(receipts);
   * ```
   */
  async setReservesFreezed(
    reservesConfig: WithAccountAddress<ReserveConfig>[],
  ): Promise<CommittedTransactionResponse[]> {
    const receipts: CommittedTransactionResponse[] = [];
    for (const reserve of reservesConfig) {
      const receipt = await this.poolClient.setReserveFreeze(
        reserve.address,
        reserve.freezed,
      );
      console.log(
        `RESERVE ${reserve.symbol} was set freezed=${reserve.freezed}, tx ${receipt.hash}`,
      );
    }
    return receipts;
  }

  /**
   * Attempts to initialize reserves that are not already initialized.
   *
   * @param reservesConfig - An array of reserve configurations, each containing account address and reserve details.
   * @returns A promise that resolves to a `CommittedTransactionResponse` if reserves were initialized, or `undefined` if no reserves needed initialization.
   *
   * The function performs the following steps:
   * 1. Creates an object to hold the reserves that need to be initialized.
   * 2. Retrieves the current list of reserves from the pool client.
   * 3. Iterates over the provided reserve configurations and checks if each reserve is already initialized.
   *    - If a reserve is not initialized, it adds the reserve details to the `reservesToInit` object.
   *    - If a reserve is already initialized, it logs a message indicating that the reserve was already initialized.
   * 4. If there are any reserves to initialize, it calls the `initReserves` method on the pool client with the collected reserve details.
   *    - Logs a message indicating the reserves that were initialized and the transaction hash.
   *    - Returns the transaction receipt.
   * 5. If no reserves needed initialization, it returns `undefined`.
   */
  async tryInitReserves(
    reservesConfig: WithAccountAddress<ReserveConfig>[],
  ): Promise<CommittedTransactionResponse | undefined> {
    const reservesToInit = {
      assets: [] as Array<AccountAddress>,
      decimals: [] as Array<number>,
      treasury: [] as Array<AccountAddress>,
      aTokenName: [] as Array<string>,
      aTokenSymbol: [] as Array<string>,
      variableDebtTokenName: [] as Array<string>,
      variableDebtTokenSymbol: [] as Array<string>,
    };

    const currentReserves = await this.poolClient.getReservesList();

    reservesConfig.forEach((reserve) => {
      if (!currentReserves.find((elem) => elem.equals(reserve.address))) {
        reservesToInit.assets.push(reserve.address);
        reservesToInit.decimals.push(reserve.decimals);
        reservesToInit.treasury.push(reserve.treasury);
        reservesToInit.aTokenName.push(reserve.aTokenName);
        reservesToInit.aTokenSymbol.push(reserve.aTokenSymbol);
        reservesToInit.variableDebtTokenName.push(
          reserve.variableDebtTokenName,
        );
        reservesToInit.variableDebtTokenSymbol.push(
          reserve.variableDebtTokenSymbol,
        );
      } else {
        console.log(`RESERVE ${reserve.symbol} already was initialized`);
      }
    });

    if (reservesToInit.assets.length > 0) {
      const receipt = await this.poolClient.initReserves(
        reservesToInit.assets,
        reservesToInit.treasury,
        reservesToInit.aTokenName,
        reservesToInit.aTokenSymbol,
        reservesToInit.variableDebtTokenName,
        reservesToInit.variableDebtTokenSymbol,
      );
      console.log(
        `RESERVES ${reservesToInit.aTokenSymbol} were initialized, tx ${receipt.hash}`,
      );
      return receipt;
    }
    return undefined;
  }

  /**
   * Generates an Ed25519 account from a mnemonic and funds it with a specified amount.
   *
   * @param {number} index - The index to derive the account from the mnemonic.
   * @returns {Promise<Ed25519Account>} - A promise that resolves to the generated and funded Ed25519 account.
   * @throws {Error} - Throws an error if the mnemonic is not provided.
   */
  async generateAndFundSigner(index: number): Promise<Ed25519Account> {
    if (!this.mnemonic) {
      throw new Error("mnemonic is required to generate signer");
    }
    const account = Account.fromDerivationPath({
      mnemonic: this.mnemonic,
      path: `m/44'/637'/0'/0'/${index}`,
    });
    await this.provider.getAptos().fundAccount({
      accountAddress: account.accountAddress,
      amount: ONE_OCTA,
    });
    return account;
  }

  /**
   * Sets up the protocol by performing a series of configuration steps.
   *
   * @param reservesConfig - An array of reserve configurations.
   * @param eModes - An array of eMode configurations.
   *
   * @remarks
   * This method performs the following steps:
   * 1. Creates tokens if they do not exist and retrieves their addresses.
   * 2. Sets the price of assets on the oracle.
   * 3. Configures eModes.
   * 4. Sets interest rate strategies for the reserves.
   * 5. Initializes reserves that are not yet initialized.
   * 6. Configures reserves.
   * 7. Sets the eMode category for reserves.
   * 8. Sets reserves as borrowable in isolation.
   * 9. Activates reserves.
   * 10. Pauses reserves.
   * 11. Freezes reserves.
   * 12. Sets the debt ceiling for reserves.
   *
   * @returns A promise that resolves when the protocol setup is complete.
   */
  async setupProtocol(reservesConfig: ReserveConfig[], eModes: EModeConfig[]) {
    // create tokens if they dont exist and get addresses
    const tokens = await this.tryCreateTokens(reservesConfig);
    // set price of assets on the oracle
    await this.setAssetsPrice(tokens);
    // set emodes
    await this.setEModes(eModes);
    // set interest rate strategies
    await this.setReservesInterestRateStrategy(tokens);
    // try init reserves that are not initialized
    await this.tryInitReserves(tokens);
    // configure reserves
    await this.configReserves(tokens);
    // set reserves eMode category
    await this.setReservesEModeCategory(tokens);
    // set borrowable in isolation
    await this.setReservesBorrowableInIsolation(tokens);
    // set reserves active
    await this.setReservesActive(tokens);
    // set reserves paused
    await this.setReservesPaused(tokens);
    // set reserves freezed
    await this.setReservesFreezed(tokens);
    // set debt ceiling
    await this.setReservesDebtCeiling(tokens);
  }
}
