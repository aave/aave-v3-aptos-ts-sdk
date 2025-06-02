import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

/**
 * Represents the CoinMigratorContract interface which defines the function addresses for coin migration operations
 * within the AAVE protocol on the Aptos blockchain.
 *
 * @remarks
 * This interface is used by the corresponding client classes to make actual calls to the blockchain.
 * The constructor initializes all function addresses by combining:
 * - The coin migrator's account address from the provider
 * - The module name (coin_migrator)
 * - The specific function name
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const coinMigrator = new CoinMigratorContract(provider);
 * ```
 *
 * @param provider - The AptosProvider instance used to interact with the Aptos blockchain.
 */
export class CoinMigratorContract {
  // Resource Functions
  coinToFaFuncAddr: MoveFunctionId;
  getFaAddrFuncAddr: MoveFunctionId;
  getFaBalanceFuncAddr: MoveFunctionId;

  constructor(provider: AptosProvider) {
    const CoinMigratorManager = provider.getProfileAddressByName(
      AAVE_PROFILES.AAVE_POOL,
    );
    const CoinMigratorAccountAddress = CoinMigratorManager.toString();
    this.coinToFaFuncAddr = `${CoinMigratorAccountAddress}::coin_migrator::coin_to_fa`;
    this.getFaAddrFuncAddr = `${CoinMigratorAccountAddress}::coin_migrator::get_fa_address`;
    this.getFaBalanceFuncAddr = `${CoinMigratorAccountAddress}::coin_migrator::get_fa_balance`;
  }
}
