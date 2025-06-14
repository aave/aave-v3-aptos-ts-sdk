import { AccountAddress } from "@aptos-labs/ts-sdk";
import { UiPoolDataProviderClient } from "../../src/clients/uiPoolDataProviderClient";
import { PoolClient } from "../../src/clients/poolClient";
import { AptosProvider } from "../../src/clients/aptosProvider";
import { DEFAULT_TESTNET_CONFIG } from "../../src/configs/testnet";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const main = async () => {
  const argv = await yargs(hideBin(process.argv))
    .option("account", {
      alias: "a",
      type: "string",
      description: "User Aptos account address",
      demandOption: true,
    })
    .example("pnpm run get-user-data -a 0x123...", "Fetch user's reserve data")
    .help()
    .parse();

  const aptosProvider = AptosProvider.fromConfig(DEFAULT_TESTNET_CONFIG);
  const uiPoolDataProviderClient = new UiPoolDataProviderClient(aptosProvider);
  const poolClient = new PoolClient(aptosProvider);
  const userAccount = AccountAddress.fromString(argv.account);

  try {
    const allReserveUnderlyingTokens = await poolClient.getAllReservesTokens();
    const userReserveData = (
      await uiPoolDataProviderClient.getUserReserveData(userAccount.toString())
    ).userReserves;

    for (const userReserve of userReserveData) {
      const underlyingToken = allReserveUnderlyingTokens.find(
        (token) =>
          token.tokenAddress.toString() === userReserve.underlyingAsset,
      );

      if (!underlyingToken) {
        throw new Error(
          `Token with address ${userReserve.underlyingAsset} was not found`,
        );
      }

      console.log(
        `\n=== 💠 ${underlyingToken.symbol} (${userReserve.underlyingAsset}) ===`,
      );
      console.log(
        `Scaled aToken Balance       : ${userReserve.scaledATokenBalance.toString()}`,
      );
      console.log(
        `Scaled varToken Debt        : ${userReserve.scaledVariableDebt.toString()}`,
      );
    }
    console.log("\n✅ Done.\n");
  } catch (ex) {
    console.error("❌ Exception = ", ex);
  }
};

main();
