import {
  ATokensClient,
  VariableTokensClient,
  UiPoolDataProviderClient,
  PoolClient,
  AptosProvider,
} from "../../src/clients";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs/testnet";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const main = async () => {
  await yargs(hideBin(process.argv))
    .example(
      "APTOS_PROVIDER_TYPE=APTOS/ALCHEMY APTOS_API_KEY=... pnpm run get-protocol-data",
      "Fetch all protocol data",
    )
    .help()
    .parse();

  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);
  const aTokensClient = new ATokensClient(aptosProvider);
  const varTokensClient = new VariableTokensClient(aptosProvider);
  const poolClient = new PoolClient(aptosProvider);
  const uiPoolDataProviderClient = new UiPoolDataProviderClient(aptosProvider);

  try {
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

    // === RESERVES ADDRESSES ===
    const reserveAddresses = await poolClient.getReservesList();
    console.log("\n=== 🧾 RESERVE ADDRESSES ===");
    reserveAddresses.forEach((addr, i) =>
      console.log(`${i + 1}. ${addr.toString()}`),
    );

    console.log("\n=== 📦 RESERVES COUNT ===");
    console.log(`Total reserves: ${Number(reserveAddresses.length)}`);

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
};

main();
