import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { CoinMigratorContract } from "../contracts/coinMigrator";
import { AptosProvider } from "./aptosProvider";
import { mapToBigInt } from "../helpers/common";

/**
 * The `CoinMigratorClient` class provides methods to interact with the Coin Migrator contract on the Aptos blockchain.
 * It extends the `AptosContractWrapperBaseClass` and includes functionalities to convert coins to FA and vice versa,
 * as well as retrieve the FA address.
 *
 * @remarks
 * This client is designed to work with the Aptos blockchain and requires an `AptosProvider` for network interactions.
 *
 * @example
 * ```typescript
 * const provider = new AptosProvider();
 * const client = new CoinMigratorClient(provider);
 * const faAddress = await client.getFaAddress();
 * console.log(faAddress);
 * ```
 *
 * @public
 */
export class CoinMigratorClient extends AptosContractWrapperBaseClass {
  coinMigratorContract: CoinMigratorContract;

  /**
   * Creates an instance of CoinMigratorClient.
   *
   * @param provider - The AptosProvider instance to interact with the Aptos blockchain.
   * @param signer - Optional Ed25519Account instance used for signing transactions.
   */
  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.coinMigratorContract = new CoinMigratorContract(provider);
  }

  /**
   * Creates an instance of `CoinMigratorClient` using the default signer.
   *
   * @param provider - The `AptosProvider` instance to be used for creating the client.
   * @returns A new instance of `CoinMigratorClient` initialized with the provided `AptosProvider`.
   */
  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): CoinMigratorClient {
    const client = new CoinMigratorClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }

  /**
   * Converts a specified amount of coins to FA (Fungible Asset).
   *
   * @param amount - The amount of coins to be converted, represented as a bigint.
   * @param coinType - The coin type generic over CoinType e.g. "0x1::aptos_coin::AptosCoin".
   * @returns A promise that resolves to a `CommittedTransactionResponse` object containing the transaction details.
   */
  public async coinToFa(
    amount: bigint,
    coinType: string,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.coinMigratorContract.coinToFaFuncAddr,
      [amount.toString()],
      [coinType],
    );
  }

  /**
   * Converts a specified amount of Aptos Coins to FA (Fungible Asset).
   *
   * @param amount - The amount of coins to be converted, represented as a bigint.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object containing the transaction details.
   */
  public async aptosCoinToFa(
    amount: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.coinMigratorContract.coinToFaFuncAddr,
      [amount.toString()],
      ["0x1::aptos_coin::AptosCoin"],
    );
  }

  /**
   * Retrieves the FA (Fungible Address) associated with the coin migrator contract.
   *
   * @param coinType - The coin type generic over CoinType e.g. "0x1::aptos_coin::AptosCoin".
   * This method calls the `GetFaAddrFuncAddr` view method on the coin migrator contract
   * and maps the response to an `AccountAddress` object.
   * @returns {Promise<AccountAddress>} A promise that resolves to the FA address as an `AccountAddress` object.
   */
  public async getFaAddress(coinType: string): Promise<AccountAddress> {
    const [resp] = (
      await this.callViewMethod(
        this.coinMigratorContract.getFaAddrFuncAddr,
        [],
        [coinType],
      )
    ).map((item) => AccountAddress.fromString(item as string));
    return resp;
  }

  /**
   * Retrieves the FA (Fungible Address) balance associated with the coin migrator contract.
   *
   * @param coinType - The coin type generic over CoinType e.g. "0x1::aptos_coin::AptosCoin".
   * This method calls the `getFaBalanceFuncAddr` view method on the coin migrator contract
   * and maps the response to bigint.
   * @returns {Promise<AccountAddress>} A promise that resolves to the FA balance as a bigint.
   */
  public async getFaBalance(
    coinType: string,
    owner: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.coinMigratorContract.getFaBalanceFuncAddr,
        [owner],
        [coinType],
      )
    ).map(mapToBigInt);
    return resp;
  }

  /**
   * Retrieves the FA (Fungible Address) associated with the Aptos Coin migrator contract.
   *
   * This method calls the `GetFaAddrFuncAddr` view method on the coin migrator contract
   * and maps the response to an `AccountAddress` object.
   * @returns {Promise<AccountAddress>} A promise that resolves to the FA address as an `AccountAddress` object.
   */
  public async getAptosCoinFaAddress(): Promise<AccountAddress> {
    const [resp] = (
      await this.callViewMethod(
        this.coinMigratorContract.getFaAddrFuncAddr,
        [],
        ["0x1::aptos_coin::AptosCoin"],
      )
    ).map((item) => AccountAddress.fromString(item as string));
    return resp;
  }
}
