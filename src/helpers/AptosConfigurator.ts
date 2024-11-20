import {
  Account,
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
  Ed25519PrivateKey,
} from "@aptos-labs/ts-sdk";
import { PoolClient } from "../clients/poolClient";
import { UnderlyingTokensClient } from "../clients/underlyingTokensClient";
import { AptosProvider, AptosProviderConfig } from "../clients/aptosProvider";
import { OracleClient } from "../clients/oracleClient";

const ONE_OCTA = 100_000_000;

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

interface EModeConfig {
  categoryId: number;
  ltv: number;
  liquidationThreshold: number;
  liquidationBonus: number;
  oracle: AccountAddress;
  label: string;
}

interface AssetPriceConfig {
  symbol: string;
  address: AccountAddress;
  priceInMarketReferenceCurrency: bigint;
}

interface TokenConfig {
  maxSupply: bigint;
  name: string;
  symbol: string;
  decimals: number;
  iconUri: string;
  projectUri: string;
}

interface ReserveStrategyConfig {
  symbol: string;
  address: AccountAddress;
  optimalUsageRatio: bigint;
  baseVariableBorrowRate: bigint;
  variableRateSlope1: bigint;
  variableRateSlope2: bigint;
}

type WithAccountAddress<T> = T & { address: AccountAddress };

export class AptosConfigurator {
  provider: AptosProvider;
  poolClient: PoolClient;
  oracleClient: OracleClient;
  underlyingTokenClient: UnderlyingTokensClient;
  mnemonic?: string;

  constructor(
    config: AptosProviderConfig,
    poolPK: string,
    oraclePK: string,
    underlyingTokensPK: string,
    mnemonic?: string,
  ) {
    this.provider = AptosProvider.fromConfig(config);
    const poolSigner = Account.fromPrivateKey({
      privateKey: new Ed25519PrivateKey(poolPK),
    });
    const oracleSigner = Account.fromPrivateKey({
      privateKey: new Ed25519PrivateKey(oraclePK),
    });
    const underlyingTokenSigner = Account.fromPrivateKey({
      privateKey: new Ed25519PrivateKey(underlyingTokensPK),
    });
    this.underlyingTokenClient = new UnderlyingTokensClient(
      this.provider,
      underlyingTokenSigner,
    );
    this.poolClient = new PoolClient(this.provider, poolSigner);
    this.oracleClient = new OracleClient(this.provider, oracleSigner);
    this.mnemonic = mnemonic;
  }

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

  async setReserveInterestRateStrategy(
    strategy: ReserveStrategyConfig,
  ): Promise<CommittedTransactionResponse> {
    const receipt = await this.poolClient.setReserveInterestRateStrategy(
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

  async setAssetsPrice(assets: AssetPriceConfig[]) {
    const receipts: CommittedTransactionResponse[] = [];
    for (const asset of assets) {
      const receipt = await this.oracleClient.setAssetPrice(
        asset.address,
        asset.priceInMarketReferenceCurrency,
      );
      console.log(
        `TOKEN ${asset.symbol} price set at ${asset.priceInMarketReferenceCurrency}, tx hash ${receipt.hash}`,
      );
      receipts.push(receipt);
    }
    return receipts;
  }

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

  async try_createTokens<T extends TokenConfig>(
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

  async configReserves(
    reservesConfig: WithAccountAddress<ReserveConfig>[],
  ): Promise<CommittedTransactionResponse> {
    const reservesToConfigure = {
      asset: [] as Array<AccountAddress>,
      ltv: [] as Array<bigint>,
      liquidationThreshold: [] as Array<bigint>,
      liquidationBonus: [] as Array<bigint>,
      reserveFactor: [] as Array<bigint>,
      borrowCap: [] as Array<bigint>,
      supplyCap: [] as Array<bigint>,
      borrowingEnabled: [] as Array<boolean>,
      flashloanEnabled: [] as Array<boolean>,
    };
    for (const reserve of reservesConfig) {
      reservesToConfigure.asset.push(reserve.address);
      reservesToConfigure.ltv.push(reserve.ltv);
      reservesToConfigure.liquidationThreshold.push(
        reserve.liquidationThreshold,
      );
      reservesToConfigure.liquidationBonus.push(reserve.liquidationBonus);
      reservesToConfigure.reserveFactor.push(reserve.reserveFactor);
      reservesToConfigure.borrowCap.push(reserve.borrowCap);
      reservesToConfigure.supplyCap.push(reserve.supplyCap);
      reservesToConfigure.borrowingEnabled.push(reserve.borrowingEnabled);
      reservesToConfigure.flashloanEnabled.push(reserve.flashloanEnabled);
    }
    const receipt = await this.poolClient.configureReserves(
      reservesToConfigure.asset,
      reservesToConfigure.ltv,
      reservesToConfigure.liquidationThreshold,
      reservesToConfigure.liquidationBonus,
      reservesToConfigure.reserveFactor,
      reservesToConfigure.borrowCap,
      reservesToConfigure.supplyCap,
      reservesToConfigure.borrowingEnabled,
      reservesToConfigure.flashloanEnabled,
    );
    console.log(
      `RESERVES ${reservesConfig.map((r) => r.symbol)} were configured, tx ${receipt.hash}`,
    );
    return receipt;
  }

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

  async try_initReserves(
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
        reservesToInit.decimals,
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

  async setupProtocol(reservesConfig: ReserveConfig[], eModes: EModeConfig[]) {
    // create tokens if they dont exist and get addresses
    const tokens = await this.try_createTokens(reservesConfig);
    // set price of assets on the oracle
    await this.setAssetsPrice(tokens);
    // set emodes
    await this.setEModes(eModes);
    // set interest rate strategies
    await this.setReservesInterestRateStrategy(tokens);
    // try init reserves that are not initialized
    await this.try_initReserves(tokens);
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
