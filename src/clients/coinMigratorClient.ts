import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { CoinMigratorContract } from "../contracts/coinMigrator";
import { AptosProvider } from "./aptosProvider";

export class CoinMigratorClient extends AptosContractWrapperBaseClass {
  coinMigratorContract: CoinMigratorContract;

  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.coinMigratorContract = new CoinMigratorContract(provider);
  }

  public static buildWithDefaultSigner(
    provider: AptosProvider,
  ): CoinMigratorClient {
    const client = new CoinMigratorClient(
      provider,
      provider.getPoolProfileAccount(),
    );
    return client;
  }

  public async coinToFa(amount: bigint): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.coinMigratorContract.CoinToFaFuncAddr,
      [amount.toString()],
    );
  }

  public async faToCoin(amount: bigint): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.coinMigratorContract.FaToCoinFuncAddr,
      [amount.toString()],
    );
  }

  public async getFaAddress(): Promise<AccountAddress> {
    const [resp] = (
      await this.callViewMethod(this.coinMigratorContract.GetFaAddrFuncAddr, [])
    ).map((item) => AccountAddress.fromString(item as string));
    return resp;
  }
}
