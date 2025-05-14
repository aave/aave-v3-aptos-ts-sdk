import {
  ATokensClient,
  VariableTokensClient,
  UnderlyingTokensClient,
  UiPoolDataProviderClient,
  PoolClient,
  AptosProvider,
} from "../../src/clients";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs/testnet";

(async () => {
  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);
  const aTokensClient = new ATokensClient(aptosProvider);
  const underlyingTokensClient = new UnderlyingTokensClient(aptosProvider);
  const varTokensClient = new VariableTokensClient(aptosProvider);
  const poolClient = new PoolClient(aptosProvider);
  const uiPoolDataProviderClient = new UiPoolDataProviderClient(aptosProvider);

  try {
    // === UNDERLYING TOKENS ===
    console.log("\n=== 🟡 UNDERLYING TOKENS ===\n");
    const allReserveUnderlyingTokens = await poolClient.getAllReservesTokens();
    for (const token of allReserveUnderlyingTokens) {
      const tokenAddress = token.tokenAddress.toString();
      const symbol = await underlyingTokensClient.symbol(token.tokenAddress);
      const name = await underlyingTokensClient.name(token.tokenAddress);
      const decimals = await underlyingTokensClient.decimals(
        token.tokenAddress,
      );
      console.log(`- ${symbol} (${name})`);
      console.log(`  Address : ${tokenAddress}`);
      console.log(`  Decimals: ${Number(decimals)}`);
      console.log("");
    }

    // === A TOKENS ===
    console.log("\n=== 🔵 A TOKENS ===\n");
    const allATokens = await poolClient.getAllATokens();
    for (const token of allATokens) {
      const tokenAddress = token.tokenAddress.toString();
      const symbol = await aTokensClient.symbol(token.tokenAddress);
      const name = await aTokensClient.name(token.tokenAddress);
      const decimals = await aTokensClient.decimals(token.tokenAddress);
      const supply = await aTokensClient.scaledTotalSupply(token.tokenAddress);
      console.log(`- ${symbol} (${name})`);
      console.log(`  Address : ${tokenAddress}`);
      console.log(`  Decimals: ${Number(decimals)}`);
      console.log(`  Supply  : ${Number(supply)}`);
      console.log("");
    }

    // === VARIABLE TOKENS ===
    console.log("\n=== 🔴 VARIABLE TOKENS ===\n");
    const allVarTokens = await poolClient.getAllVariableTokens();
    for (const token of allVarTokens) {
      const tokenAddress = token.tokenAddress.toString();
      const assetAddress = await varTokensClient.getUnderlyingAssetAddress(
        token.tokenAddress,
      );
      const symbol = await varTokensClient.symbol(token.tokenAddress);
      const name = await varTokensClient.name(token.tokenAddress);
      const decimals = await varTokensClient.decimals(token.tokenAddress);
      const supply = await varTokensClient.scaledTotalSupply(
        token.tokenAddress,
      );
      console.log(`- ${symbol} (${name})`);
      console.log(`  Address       : ${tokenAddress}`);
      console.log(`  Asset Address : ${assetAddress.toString()}`);
      console.log(`  Decimals      : ${Number(decimals)}`);
      console.log(`  Supply        : ${Number(supply)}`);
      console.log("");
    }

    // === RESERVES COUNT ===
    const reservesCount = await poolClient.getReservesCount();
    console.log("\n=== 📦 RESERVES COUNT ===");
    console.log(`Total reserves: ${Number(reservesCount)}`);

    // === RESERVES ADDRESSES ===
    const reserveAddresses = await poolClient.getReservesList();
    console.log("\n=== 🧾 RESERVE ADDRESSES ===");
    reserveAddresses.forEach((addr, i) =>
      console.log(`${i + 1}. ${addr.toString()}`),
    );

    // === UI POOL DATA PROVIDER ===
    console.log("\n=== 📊 UI POOL DATA PROVIDER ===");

    const reservesList = await uiPoolDataProviderClient.getReservesList();
    console.log("\nReserves List:");
    console.log(reservesList.map((r) => r.toString()).join(", "));

    const reservesData = await uiPoolDataProviderClient.getReservesData();
    console.log("\nReserves Data (raw):");
    console.dir(reservesData, { depth: null });

    console.log("\n✅ Done.\n");
  } catch (ex) {
    console.error("❌ Exception:", ex);
  }
})();
