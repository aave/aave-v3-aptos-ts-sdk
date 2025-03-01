import {
  AccountAddress,
  Aptos,
  CommittedTransactionResponse,
  Ed25519Account,
  EntryFunctionArgumentTypes,
  HexInput,
  MoveFunctionId,
  MoveValue,
  SimpleEntryFunctionArgumentTypes,
  UserTransactionResponse,
  isBlockMetadataTransactionResponse,
  isUserTransactionResponse,
  Event,
  SimpleTransaction,
} from "@aptos-labs/ts-sdk";
import { AptosProvider } from "./aptosProvider";

const getAccountBalance = async (
  aptos: Aptos,
  accountAddress: AccountAddress,
  versionToWaitFor?: bigint,
): Promise<bigint> => {
  const amount = await aptos.getAccountAPTAmount({
    accountAddress,
    minimumLedgerVersion: versionToWaitFor,
  });
  return BigInt(amount);
};

async function fundAccount(
  aptos: Aptos,
  account: AccountAddress,
  amount: number,
): Promise<UserTransactionResponse> {
  return aptos.fundAccount({
    accountAddress: account,
    amount,
  });
}

async function transactionData(
  aptos: Aptos,
  user: AccountAddress,
  func_addr: MoveFunctionId,
  func_args: Array<
    EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
  >,
) {
  return aptos.transaction.build.simple({
    sender: user,
    data: {
      function: func_addr,
      functionArguments: func_args,
    },
  });
}

async function transaction(
  aptos: Aptos,
  signer: Ed25519Account,
  func_addr: MoveFunctionId,
  func_args: Array<
    EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
  >,
) {
  const transaction = await aptos.transaction.build.simple({
    sender: signer.accountAddress,
    data: {
      function: func_addr,
      functionArguments: func_args,
    },
  });
  // using signAndSubmit combined
  const commitTx = await aptos.signAndSubmitTransaction({
    signer,
    transaction,
  });
  return aptos.waitForTransaction({ transactionHash: commitTx.hash });
}

async function view<T extends MoveValue[]>(
  aptos: Aptos,
  func_addr: MoveFunctionId,
  func_args: Array<
    EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
  >,
) {
  return aptos.view<T>({
    payload: {
      function: func_addr,
      functionArguments: func_args,
    },
  });
}

export class AptosContractWrapperBaseClass {
  protected signer?: Ed25519Account;
  protected moduleSigner: Ed25519Account;

  protected readonly aptosProvider: AptosProvider;

  constructor(aptosProvider: AptosProvider, signer?: Ed25519Account) {
    this.aptosProvider = aptosProvider;
    this.signer = signer;
    this.moduleSigner = signer;
  }

  /** Sets the signer. */
  public setSigner(senderAccount: Ed25519Account) {
    this.signer = senderAccount;
  }

  /** Sets the signer. */
  public withSigner(senderAccount: Ed25519Account) {
    this.setSigner(senderAccount);
    return this;
  }

  /** Sets the module signer. */
  public withModuleSigner() {
    this.setSigner(this.moduleSigner);
    return this;
  }

  /** Returns the signer. */
  public getSigner(): Ed25519Account {
    return this.signer;
  }

  /** Sends and awaits a response. */
  public async sendTxAndAwaitResponse(
    functionId: MoveFunctionId,
    func_args: Array<
      EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
    >,
  ): Promise<CommittedTransactionResponse> {
    return transaction(
      this.aptosProvider.getAptos(),
      this.signer,
      functionId,
      func_args,
    );
  }

  public async buildTx(
    user: AccountAddress,
    functionId: MoveFunctionId,
    func_args: Array<
      EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
    >,
  ): Promise<SimpleTransaction> {
    return transactionData(
      this.aptosProvider.getAptos(),
      user,
      functionId,
      func_args,
    );
  }

  /** Calls a view method. */
  public async callViewMethod<T extends MoveValue[]>(
    functionId: MoveFunctionId,
    func_args: Array<
      EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
    >,
  ): Promise<T> {
    return view<T>(this.aptosProvider.getAptos(), functionId, func_args);
  }

  /// funds a given account
  public async fundAccount(
    account: AccountAddress,
    amount: bigint,
  ): Promise<UserTransactionResponse> {
    return fundAccount(this.aptosProvider.getAptos(), account, Number(amount));
  }

  /// returns the account apt balance
  public async getAccounAptBalance(
    account: Ed25519Account,
    accountAddress: AccountAddress,
    versionToWaitFor?: bigint,
  ): Promise<bigint> {
    return getAccountBalance(
      this.aptosProvider.getAptos(),
      accountAddress,
      versionToWaitFor,
    );
  }

  /// gets all events for a tx hash
  public async getTxEvents(
    txHash: HexInput,
  ): Promise<Array<{ data: unknown }>> {
    const txResponse = await this.aptosProvider
      .getAptos()
      .getTransactionByHash({ transactionHash: txHash });
    let events: Array<Event> = [];
    if (
      isBlockMetadataTransactionResponse(txResponse) ||
      isUserTransactionResponse(txResponse)
    ) {
      events = txResponse.events;
    }
    return events.map((event) => ({
      data: JSON.parse(event.data),
    }));
  }

  /// gets all events from a given account
  public async getEventsFromAccount(
    account: AccountAddress,
    limit: number,
  ): Promise<
    Array<{
      account_address: string;
      creation_number: any;
      data: any;
      event_index: any;
      sequence_number: any;
      transaction_block_height: any;
      transaction_version: any;
      type: string;
      indexed_type: string;
    }>
  > {
    const whereCondition = {
      account_address: { _eq: account.toString() },
    };

    const filteredEvents = await this.aptosProvider.getAptos().getEvents({
      options: { where: whereCondition, limit },
    });

    return filteredEvents;
  }
}
