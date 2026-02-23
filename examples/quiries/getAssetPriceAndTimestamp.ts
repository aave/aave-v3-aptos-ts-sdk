import { OracleClient } from "../../src/clients/oracleClient";
import { AptosProvider } from "../../src/clients/aptosProvider";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs/testnet";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const main = async () => {
  const argv = await yargs(hideBin(process.argv))
    .option("asset", {
      alias: "a",
      type: "string",
      description: "Asset address to fetch the oracle price for",
      choices: ["APT", "USDT", "USDC", "sUSDe", "GHO"],
      demandOption: true,
    })
    .example(
      "APTOS_PROVIDER_TYPE=APTOS/ALCHEMY APTOS_API_KEY=... pnpm run get-asset-price -a 0xa61304...",
      "Fetch price for specified asset address",
    )
    .help()
    .parse();

  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);
  const oracleClient = new OracleClient(aptosProvider);
  const ASSET_ADDRESS =
    DEFAULT_TESTNET_CONFIG.assets[
      argv.asset as keyof typeof DEFAULT_TESTNET_CONFIG.assets
    ];

  try {
    const result = await oracleClient.getAssetPriceAndTimestmap(ASSET_ADDRESS);
    console.log(
      `✅ Got price for asset ${ASSET_ADDRESS.toString()} = ${result.price.toString()} and timestamp = ${result.timestamp.toString()}`,
    );
  } catch (ex) {
    console.error(
      "❌ Exception = ",
      ex instanceof Error ? ex.message : String(ex),
    );
  }
};

main();
