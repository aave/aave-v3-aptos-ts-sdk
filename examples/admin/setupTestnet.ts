import dotenv from "dotenv";
import { Account, AccountAddress, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";
import { AptosProvider } from "../../src/clients/aptosProvider";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs/testnet";
import { PoolClient, UnderlyingTokensClient } from "../../src/clients";

dotenv.config();

const eModes = [
  {
    categoryId: 1,
    ltv: BigInt(9000),
    liquidationThreshold: BigInt(9300),
    liquidationBonus: BigInt(10200),
    oracle: AccountAddress.ZERO,
    label: "ETH correlated",
  },
  {
    categoryId: 2,
    ltv: BigInt(9500),
    liquidationThreshold: BigInt(9700),
    liquidationBonus: BigInt(10100),
    oracle: AccountAddress.ZERO,
    label: "Stablecoins",
  },
];

interface ReserveConfig {
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
}

interface ReserveConfigWithDeployedAsset extends ReserveConfig {
  underlyingAsset: AccountAddress;
}

const reserves: ReserveConfig[] = [
  {
    maxSupply: 25610806455078778_000_000n,
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    iconUri: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png",
    projectUri: "https://app.aave.com/",
    treasury: AccountAddress.ZERO,
    aTokenName: "Aave USDC",
    aTokenSymbol: "aUSDC",
    variableDebtTokenName: "Aave Variable Debt USDC",
    variableDebtTokenSymbol: "vUSDC",
    optimalUsageRatio: 920000000000000000000000000n,
    baseVariableBorrowRate: 0n,
    variableRateSlope1: 65000000000000000000000000n,
    variableRateSlope2: 600000000000000000000000000n,
    ltv: 7500n,
    liquidationThreshold: 7800n,
    liquidationBonus: 10450n,
    reserveFactor: 1000n,
    borrowCap: 2100000000n,
    supplyCap: 2250000000n,
    borrowingEnabled: true,
    flashloanEnabled: true,
    eModeCategoryId: 2,
  },
  {
    maxSupply: 52986637760874451_000_000n,
    name: "Tether USD",
    symbol: "USDT",
    decimals: 6,
    iconUri:
      "https://assets.coingecko.com/coins/images/325/standard/Tether.png",
    projectUri: "https://app.aave.com/",
    treasury: AccountAddress.ZERO,
    aTokenName: "Aave USDT",
    aTokenSymbol: "aUSDT",
    variableDebtTokenName: "Aave Variable Debt USDT",
    variableDebtTokenSymbol: "vUSDT",
    optimalUsageRatio: 920000000000000000000000000n,
    baseVariableBorrowRate: 0n,
    variableRateSlope1: 65000000000000000000000000n,
    variableRateSlope2: 750000000000000000000000000n,
    ltv: 7500n,
    liquidationThreshold: 7800n,
    liquidationBonus: 10450n,
    reserveFactor: 1000n,
    borrowCap: 2250000000n,
    supplyCap: 2500000000n,
    borrowingEnabled: true,
    flashloanEnabled: true,
    eModeCategoryId: 2,
  },
];

if (!process.env.UNDERLYING_TOKENS_PRIVATE_KEY) {
  throw new Error(`UNDERLYING_TOKENS_PRIVATE_KEY env was not found`);
}

const underlyingTokensSigner = Account.fromPrivateKey({
  privateKey: new Ed25519PrivateKey(process.env.UNDERLYING_TOKENS_PRIVATE_KEY),
});

if (!process.env.AAVE_POOL_PRIVATE_KEY) {
  throw new Error(`AAVE_POOL_PRIVATE_KEY env was not found`);
}

const poolSigner = Account.fromPrivateKey({
  privateKey: new Ed25519PrivateKey(process.env.AAVE_POOL_PRIVATE_KEY),
});

(async () => {
  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);

  const poolClient = new PoolClient(aptosProvider, poolSigner);
  const underlyingTokenClient = new UnderlyingTokensClient(
    aptosProvider,
    underlyingTokensSigner,
  );

  const reservesWithAsset: Array<ReserveConfigWithDeployedAsset> = [];

  // create tokens that dont exist
  for (const reserve of reserves) {
    const tokenAddress = await underlyingTokenClient.getMetadataBySymbol(
      reserve.symbol,
    );
    if (!tokenAddress) {
      await underlyingTokenClient.createToken(
        reserve.maxSupply,
        reserve.name,
        reserve.symbol,
        reserve.decimals,
        reserve.iconUri,
        reserve.projectUri,
      );
      const address = await underlyingTokenClient.getMetadataBySymbol(
        reserve.symbol,
      );
      reservesWithAsset.push({
        ...reserve,
        underlyingAsset: address,
      });
    } else {
      // const maxSupply = await underlyingTokenClient.maximum(tokenAddress);
      const decimals = await underlyingTokenClient.decimals(tokenAddress);
      const name = await underlyingTokenClient.name(tokenAddress);
      // console.log(maxSupply);
      reservesWithAsset.push({
        ...reserve,
        // maxSupply,
        decimals: Number(decimals),
        name,
        underlyingAsset: tokenAddress,
      });
    }
  }

  // configure eModes

  for (const eMode of eModes) {
    await poolClient.setEmodeCategory(
      eMode.categoryId,
      eMode.ltv,
      eMode.liquidationThreshold,
      eMode.liquidationBonus,
      eMode.oracle,
      eMode.label,
    );
  }

  // create rate strategies

  for (const reserve of reservesWithAsset) {
    await poolClient.setReserveInterestRateStrategy(
      reserve.underlyingAsset,
      reserve.optimalUsageRatio,
      reserve.baseVariableBorrowRate,
      reserve.variableRateSlope1,
      reserve.variableRateSlope2,
    );
  }

  // init reserves that dont exist

  const reservesToInit = {
    assets: [] as Array<AccountAddress>,
    decimals: [] as Array<number>,
    treasury: [] as Array<AccountAddress>,
    aTokenName: [] as Array<string>,
    aTokenSymbol: [] as Array<string>,
    variableDebtTokenName: [] as Array<string>,
    variableDebtTokenSymbol: [] as Array<string>,
  };

  const currentReserves = await poolClient.getReservesList();

  reservesWithAsset.forEach((reserve) => {
    if (!currentReserves.find((elem) => elem.equals(reserve.underlyingAsset))) {
      reservesToInit.assets.push(reserve.underlyingAsset);
      reservesToInit.decimals.push(reserve.decimals);
      reservesToInit.treasury.push(reserve.treasury);
      reservesToInit.aTokenName.push(reserve.aTokenName);
      reservesToInit.aTokenSymbol.push(reserve.aTokenSymbol);
      reservesToInit.variableDebtTokenName.push(reserve.variableDebtTokenName);
      reservesToInit.variableDebtTokenSymbol.push(
        reserve.variableDebtTokenSymbol,
      );
    }
  });

  if (reservesToInit.assets.length > 0) {
    await poolClient.initReserves(
      reservesToInit.assets,
      reservesToInit.decimals,
      reservesToInit.treasury,
      reservesToInit.aTokenName,
      reservesToInit.aTokenSymbol,
      reservesToInit.variableDebtTokenName,
      reservesToInit.variableDebtTokenSymbol,
    );
  }

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

  for (const reserve of reservesWithAsset) {
    reservesToConfigure.asset.push(reserve.underlyingAsset);
    reservesToConfigure.ltv.push(reserve.ltv);
    reservesToConfigure.liquidationThreshold.push(reserve.liquidationThreshold);
    reservesToConfigure.liquidationBonus.push(reserve.liquidationBonus);
    reservesToConfigure.reserveFactor.push(reserve.reserveFactor);
    reservesToConfigure.borrowCap.push(reserve.borrowCap);
    reservesToConfigure.supplyCap.push(reserve.supplyCap);
    reservesToConfigure.borrowingEnabled.push(reserve.borrowingEnabled);
    reservesToConfigure.flashloanEnabled.push(reserve.flashloanEnabled);
  }

  await poolClient.configureReserves(
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

  for (const reserve of reservesWithAsset) {
    await poolClient.setAssetEmodeCategory(
      reserve.underlyingAsset,
      reserve.eModeCategoryId,
    );
  }
})();
