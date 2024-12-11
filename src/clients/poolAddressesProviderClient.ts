import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { Metadata } from "../helpers/interfaces";
import { AptosProvider } from "./aptosProvider";
import { PoolContract } from "../contracts/pool";

export class PoolAddressesProviderClient extends AptosContractWrapperBaseClass {
  poolContract: PoolContract;

  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.poolContract = new PoolContract(provider);
  }

  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): PoolAddressesProviderClient {
    const client = new PoolAddressesProviderClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }

  public async hasIdMappedAccount(id: string): Promise<boolean> {
    const [resp] = await this.callViewMethod(
      this.poolContract.HasIdMappedAccountFuncAddr,
      [id],
    );
    return resp as boolean;
  }

  public async getMarketId(): Promise<string | undefined> {
    const [resp] = await this.callViewMethod(
      this.poolContract.GetMarketIdFuncAddr,
      [],
    );
    return resp ? (resp as Metadata).inner : undefined;
  }

  public async getAddress(): Promise<AccountAddress | undefined> {
    const [resp] = await this.callViewMethod(
      this.poolContract.GetAddressFuncAddr,
      [],
    );
    return resp
      ? AccountAddress.fromString((resp as Metadata).inner)
      : undefined;
  }

  public async getPool(): Promise<AccountAddress | undefined> {
    const [resp] = await this.callViewMethod(
      this.poolContract.GetPoolFuncAddr,
      [],
    );
    return resp
      ? AccountAddress.fromString((resp as Metadata).inner)
      : undefined;
  }

  public async getPoolConfigurator(): Promise<AccountAddress | undefined> {
    const [resp] = await this.callViewMethod(
      this.poolContract.GetPoolConfiguratorFuncAddr,
      [],
    );
    return resp
      ? AccountAddress.fromString((resp as Metadata).inner)
      : undefined;
  }

  public async getPriceOracle(): Promise<AccountAddress | undefined> {
    const [resp] = await this.callViewMethod(
      this.poolContract.GetPriceOracleFuncAddr,
      [],
    );
    return resp
      ? AccountAddress.fromString((resp as Metadata).inner)
      : undefined;
  }

  public async getAclManager(): Promise<AccountAddress | undefined> {
    const [resp] = await this.callViewMethod(
      this.poolContract.GetAclManagerFuncAddr,
      [],
    );
    return resp
      ? AccountAddress.fromString((resp as Metadata).inner)
      : undefined;
  }

  public async getAclAdmin(): Promise<AccountAddress | undefined> {
    const [resp] = await this.callViewMethod(
      this.poolContract.GetAclAdminFuncAddr,
      [],
    );
    return resp
      ? AccountAddress.fromString((resp as Metadata).inner)
      : undefined;
  }

  public async getPriceOracleSentinel(): Promise<AccountAddress | undefined> {
    const [resp] = await this.callViewMethod(
      this.poolContract.GetPriceOracleSentinelFuncAddr,
      [],
    );
    return resp
      ? AccountAddress.fromString((resp as Metadata).inner)
      : undefined;
  }

  public async getPoolDataProvider(): Promise<AccountAddress | undefined> {
    const [resp] = await this.callViewMethod(
      this.poolContract.GetPoolDataProviderFuncAddr,
      [],
    );
    return resp
      ? AccountAddress.fromString((resp as Metadata).inner)
      : undefined;
  }

  public async setMarketId(
    newMarketId: string,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(this.poolContract.SetMarketIdFuncAddr, [
      newMarketId,
    ]);
  }

  public async setAddress(
    id: string,
    addr: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(this.poolContract.SetAddressFuncAddr, [
      id,
      addr,
    ]);
  }

  public async setPoolImpl(
    newPoolImpl: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(this.poolContract.SetPoolImplFuncAddr, [
      newPoolImpl,
    ]);
  }

  public async setPoolConfigurator(
    newPoolConfiguratorImpl: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.SetPoolConfiguratorFuncAddr,
      [newPoolConfiguratorImpl],
    );
  }

  public async setPriceOracle(
    newPriceOracleImpl: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.SetPriceOracleFuncAddr,
      [newPriceOracleImpl],
    );
  }

  public async setAclManager(
    newAclManagerImpl: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.SetAclManagerFuncAddr,
      [newAclManagerImpl],
    );
  }

  public async setAclAdmin(
    newAclAdminImpl: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(this.poolContract.SetAclAdminFuncAddr, [
      newAclAdminImpl,
    ]);
  }

  public async setPriceOracleSentinel(
    newPriceOracleSentinelImpl: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.SetPriceOracleSentinelFuncAddr,
      [newPriceOracleSentinelImpl],
    );
  }

  public async setPoolDataProvider(
    newPoolDataProviderImpl: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.poolContract.SetPoolDataProviderFuncAddr,
      [newPoolDataProviderImpl],
    );
  }
}
