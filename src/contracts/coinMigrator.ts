import { MoveFunctionId } from "@aptos-labs/ts-sdk";
import { AAVE_PROFILES, AptosProvider } from "../clients/aptosProvider";

/**
 * The `CoinMigratorContract` class provides methods to interact with the coin migration functionalities
 * on the Aptos blockchain. It allows migrating coins to FA, migrating FA to coins, and retrieving the FA address.
 *
 * @remarks
 * This class requires an instance of `AptosProvider` to interact with the Aptos blockchain.
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const coinMigrator = new CoinMigratorContract(provider);
 * ```
 *
 * @public
 */
export class CoinMigratorContract {
  // Resource Func Addr
  coinToFaFuncAddr: MoveFunctionId;
  getFaAddrFuncAddr: MoveFunctionId;
  getFaBalanceFuncAddr: MoveFunctionId;

  /**
   * Constructs a new instance of the CoinMigrator class.
   *
   * @param provider - An instance of AptosProvider used to interact with the Aptos blockchain.
   *
   * Initializes the following properties:
   * - `coinToFaFuncAddr`: The address of the function to migrate coins to FA.
   * - `getFaAddrFuncAddr`: The address of the function to get the FA address.
   * - `getFaBalanceFuncAddr`: The address of the function to get the FA balance.
   */
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
