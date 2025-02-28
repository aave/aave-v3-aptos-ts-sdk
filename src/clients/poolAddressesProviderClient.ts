import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { Metadata } from "../helpers/interfaces";
import { AptosProvider } from "./aptosProvider";
import { PoolContract } from "../contracts/pool";

/**
 * The `PoolAddressesProviderClient` class provides methods to interact with the pool contract
 * on the Aptos blockchain. It extends the `AptosContractWrapperBaseClass` and includes various
 * methods to retrieve and set addresses and configurations related to the pool.
 *
 * @extends AptosContractWrapperBaseClass
 */
export class PoolAddressesProviderClient extends AptosContractWrapperBaseClass {
  poolContract: PoolContract;

  /**
   * Creates an instance of PoolAddressesProviderClient.
   *
   * @param provider - The AptosProvider instance to interact with the Aptos blockchain.
   * @param signer - Optional Ed25519Account instance for signing transactions.
   */
  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.poolContract = new PoolContract(provider);
  }

  /**
   * Creates an instance of `PoolAddressesProviderClient` using the default signer.
   *
   * @param provider - The `AptosProvider` instance to use for creating the client.
   * @returns A new instance of `PoolAddressesProviderClient` initialized with the default signer.
   */
  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): PoolAddressesProviderClient {
    const client = new PoolAddressesProviderClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }

  /**
   * Checks if the given ID has a mapped account in the pool contract.
   *
   * @param id - The ID to check for a mapped account.
   * @returns A promise that resolves to a boolean indicating whether the ID has a mapped account.
   */
  public async hasIdMappedAccount(id: string): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.poolContract.HasIdMappedAccountFuncAddr,
      [id],
    );
    return resp as boolean;
  }

  /**
   * Retrieves the market ID from the pool contract.
   *
   * @returns {Promise<string | undefined>} A promise that resolves to the market ID as a string if available, or undefined if not.
   */
  public async getMarketId(): Promise<string | undefined> {
    const [resp] = await this.callViewMethod(
      this.poolContract.GetMarketIdFuncAddr,
      [],
    );
    return resp ? (resp as Metadata).inner : undefined;
  }

  /**
   * Retrieves the address from the pool contract.
   *
   * @returns {Promise<AccountAddress | undefined>} A promise that resolves to an AccountAddress if the address is found, or undefined if not.
   */
  public async getAddress(): Promise<AccountAddress | undefined> {
    const [resp] = await this.callViewMethod(
      this.poolContract.GetAddressFuncAddr,
      [],
    );
    return resp
      ? AccountAddress.fromString((resp as Metadata).inner)
      : undefined;
  }

  /**
   * Retrieves the pool address from the pool contract.
   *
   * @returns {Promise<AccountAddress | undefined>} A promise that resolves to the pool address as an `AccountAddress` object if available, otherwise `undefined`.
   */
  public async getPool(): Promise<AccountAddress | undefined> {
    const [resp] = await this.callViewMethod(
      this.poolContract.GetPoolFuncAddr,
      [],
    );
    return resp
      ? AccountAddress.fromString((resp as Metadata).inner)
      : undefined;
  }

  /**
   * Retrieves the address of the Pool Configurator.
   *
   * This method calls the `GetPoolConfiguratorFuncAddr` function on the pool contract
   * to obtain the address of the Pool Configurator. If the call is successful and
   * a response is received, it converts the response to an `AccountAddress` object.
   * If no response is received, it returns `undefined`.
   *
   * @returns {Promise<AccountAddress | undefined>} A promise that resolves to the
   * address of the Pool Configurator as an `AccountAddress` object, or `undefined`
   * if no address is found.
   */
  public async getPoolConfigurator(): Promise<AccountAddress | undefined> {
    const [resp] = await this.callViewMethod(
      this.poolContract.GetPoolConfiguratorFuncAddr,
      [],
    );
    return resp
      ? AccountAddress.fromString((resp as Metadata).inner)
      : undefined;
  }

  /**
   * Retrieves the price oracle address from the pool contract.
   *
   * @returns {Promise<AccountAddress | undefined>} A promise that resolves to the price oracle address as an `AccountAddress` object, or `undefined` if the address is not available.
   */
  public async getPriceOracle(): Promise<AccountAddress | undefined> {
    const [resp] = await this.callViewMethod(
      this.poolContract.GetPriceOracleFuncAddr,
      [],
    );
    return resp
      ? AccountAddress.fromString((resp as Metadata).inner)
      : undefined;
  }

  /**
   * Retrieves the ACL (Access Control List) Manager address.
   *
   * @returns {Promise<AccountAddress | undefined>} A promise that resolves to the ACL Manager's account address if available, otherwise undefined.
   */
  public async getAclManager(): Promise<AccountAddress | undefined> {
    const [resp] = await this.callViewMethod(
      this.poolContract.GetAclManagerFuncAddr,
      [],
    );
    return resp
      ? AccountAddress.fromString((resp as Metadata).inner)
      : undefined;
  }

  /**
   * Retrieves the ACL (Access Control List) admin account address.
   *
   * @returns {Promise<AccountAddress | undefined>} A promise that resolves to the ACL admin account address,
   * or undefined if the address could not be retrieved.
   */
  public async getAclAdmin(): Promise<AccountAddress | undefined> {
    const [resp] = await this.callViewMethod(
      this.poolContract.GetAclAdminFuncAddr,
      [],
    );
    return resp
      ? AccountAddress.fromString((resp as Metadata).inner)
      : undefined;
  }

  /**
   * Retrieves the address of the price oracle sentinel.
   *
   * This method calls the `GetPriceOracleSentinelFuncAddr` function of the pool contract
   * to obtain the address of the price oracle sentinel. If the response is valid, it
   * converts the address from a string to an `AccountAddress` object and returns it.
   * If the response is not valid, it returns `undefined`.
   *
   * @returns {Promise<AccountAddress | undefined>} A promise that resolves to the address
   * of the price oracle sentinel as an `AccountAddress` object, or `undefined` if the
   * address could not be retrieved.
   */
  public async getPriceOracleSentinel(): Promise<AccountAddress | undefined> {
    const [resp] = await this.callViewMethod(
      this.poolContract.GetPriceOracleSentinelFuncAddr,
      [],
    );
    return resp
      ? AccountAddress.fromString((resp as Metadata).inner)
      : undefined;
  }

  /**
   * Retrieves the address of the pool data provider.
   *
   * This method calls the `GetPoolDataProviderFuncAddr` view method on the pool contract
   * to obtain the address of the pool data provider. If the response is valid, it converts
   * the address from a string to an `AccountAddress` object. If the response is invalid,
   * it returns `undefined`.
   *
   * @returns {Promise<AccountAddress | undefined>} A promise that resolves to the `AccountAddress`
   * of the pool data provider if available, otherwise `undefined`.
   */
  public async getPoolDataProvider(): Promise<AccountAddress | undefined> {
    const [resp] = await this.callViewMethod(
      this.poolContract.GetPoolDataProviderFuncAddr,
      [],
    );
    return resp
      ? AccountAddress.fromString((resp as Metadata).inner)
      : undefined;
  }

  /**
   * Sets the market ID for the pool contract.
   *
   * @param newMarketId - The new market ID to be set.
   * @returns A promise that resolves to a `CommittedTransactionResponse` object.
   */
  public async setMarketId(
    newMarketId: string,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(this.poolContract.SetMarketIdFuncAddr, [
      newMarketId,
    ]);
  }

  /**
   * Sets the address for a given identifier in the pool contract.
   *
   * @param id - The identifier for which the address is being set.
   * @param addr - The account address to be associated with the identifier.
   * @returns A promise that resolves to the response of the committed transaction.
   */
  public async setAddress(
    id: string,
    addr: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(this.poolContract.SetAddressFuncAddr, [
      id,
      addr,
    ]);
  }

  /**
   * Sets the new pool implementation address.
   *
   * @param newPoolImpl - The address of the new pool implementation.
   * @returns A promise that resolves to the response of the committed transaction.
   */
  public async setPoolImpl(
    newPoolImpl: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(this.poolContract.SetPoolImplFuncAddr, [
      newPoolImpl,
    ]);
  }

  /**
   * Sets the new pool configurator implementation address.
   *
   * @param newPoolConfiguratorImpl - The address of the new pool configurator implementation.
   * @returns A promise that resolves to the committed transaction response.
   */
  public async setPoolConfigurator(
    newPoolConfiguratorImpl: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.SetPoolConfiguratorFuncAddr,
      [newPoolConfiguratorImpl],
    );
  }

  /**
   * Sets a new price oracle implementation address for the pool.
   *
   * @param newPriceOracleImpl - The address of the new price oracle implementation.
   * @returns A promise that resolves to the committed transaction response.
   */
  public async setPriceOracle(
    newPriceOracleImpl: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.SetPriceOracleFuncAddr,
      [newPriceOracleImpl],
    );
  }

  /**
   * Sets a new ACL (Access Control List) Manager implementation address.
   *
   * @param newAclManagerImpl - The address of the new ACL Manager implementation.
   * @returns A promise that resolves to a CommittedTransactionResponse object.
   */
  public async setAclManager(
    newAclManagerImpl: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.SetAclManagerFuncAddr,
      [newAclManagerImpl],
    );
  }

  /**
   * Sets a new ACL (Access Control List) admin.
   *
   * @param newAclAdminImpl - The address of the new ACL admin.
   * @returns A promise that resolves to the response of the committed transaction.
   */
  public async setAclAdmin(
    newAclAdminImpl: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(this.poolContract.SetAclAdminFuncAddr, [
      newAclAdminImpl,
    ]);
  }

  /**
   * Sets a new price oracle sentinel implementation address.
   *
   * @param newPriceOracleSentinelImpl - The address of the new price oracle sentinel implementation.
   * @returns A promise that resolves to the committed transaction response.
   */
  public async setPriceOracleSentinel(
    newPriceOracleSentinelImpl: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.SetPriceOracleSentinelFuncAddr,
      [newPriceOracleSentinelImpl],
    );
  }

  /**
   * Sets a new pool data provider implementation address.
   *
   * @param newPoolDataProviderImpl - The address of the new pool data provider implementation.
   * @returns A promise that resolves to the response of the committed transaction.
   */
  public async setPoolDataProvider(
    newPoolDataProviderImpl: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.SetPoolDataProviderFuncAddr,
      [newPoolDataProviderImpl],
    );
  }
}
