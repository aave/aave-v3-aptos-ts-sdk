import {
  AccountAddress,
  Aptos,
  CommittedTransactionResponse,
  Ed25519Account,
  EntryFunctionArgumentTypes,
  Event,
  HexInput,
  isBlockMetadataTransactionResponse,
  isUserTransactionResponse,
  MoveFunctionId,
  MoveValue,
  SimpleEntryFunctionArgumentTypes,
  SimpleTransaction,
  TypeArgument,
  UserTransactionResponse,
} from "@aptos-labs/ts-sdk";
import { AptosProvider } from "./aptosProvider";

/**
 * Retrieves the APT balance of a specified account.
 *
 * @param aptos - An instance of the Aptos client.
 * @param accountAddress - The address of the account to retrieve the balance for.
 * @param versionToWaitFor - (Optional) The ledger version to wait for before retrieving the balance.
 * @returns A promise that resolves to the APT balance of the account as a bigint.
 */
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

/**
 * Funds an Aptos account with the specified amount.
 *
 * @param aptos - The Aptos instance to use for funding the account.
 * @param account - The address of the account to be funded.
 * @param amount - The amount of funds to be added to the account.
 * @returns A promise that resolves to the user transaction response.
 */
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

/**
 * Builds a simple transaction data object for the given parameters.
 *
 * @param aptos - The Aptos client instance used to build the transaction.
 * @param user - The account address of the user initiating the transaction.
 * @param func_addr - The identifier of the Move function to be called.
 * @param func_args - An array of arguments to be passed to the Move function.
 * @param type_args - Typed arguments to be passed to the Move function.
 * @returns A promise that resolves to the transaction data object.
 */
async function transactionData(
  aptos: Aptos,
  user: AccountAddress,
  func_addr: MoveFunctionId,
  func_args: Array<
    EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
  >,
  type_args: TypeArgument[] = [],
) {
  return aptos.transaction.build.simple({
    sender: user,
    data: {
      function: func_addr,
      functionArguments: func_args,
      typeArguments: type_args,
    },
  });
}

/**
 * Executes a transaction on the Aptos blockchain.
 *
 * @param aptos - The Aptos client instance.
 * @param signer - The account that will sign the transaction.
 * @param func_addr - The address of the Move function to be called.
 * @param func_args - The arguments to be passed to the Move function.
 * @param type_args - Typed arguments to be passed to the Move function.
 * @returns A promise that resolves when the transaction is confirmed.
 */
async function transaction(
  aptos: Aptos,
  signer: Ed25519Account,
  func_addr: MoveFunctionId,
  func_args: Array<
    EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
  >,
  type_args: TypeArgument[] = [],
) {
  const transaction = await aptos.transaction.build.simple({
    sender: signer.accountAddress,
    data: {
      function: func_addr,
      functionArguments: func_args,
      typeArguments: type_args,
    },
  });
  // using signAndSubmit combined
  const commitTx = await aptos.signAndSubmitTransaction({
    signer,
    transaction,
  });
  return aptos.waitForTransaction({ transactionHash: commitTx.hash });
}

/**
 * Executes a view function on the Aptos blockchain.
 *
 * @template T - The type of the return value, which extends an array of MoveValue.
 * @param {Aptos} aptos - The Aptos client instance.
 * @param {MoveFunctionId} func_addr - The address of the function to be called.
 * @param {Array<EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes>} func_args - The arguments to be passed to the function.
 * @param type_args - Typed arguments to be passed to the Move function.
 * @returns {Promise<T>} - A promise that resolves to the result of the view function.
 */
async function view<T extends MoveValue[]>(
  aptos: Aptos,
  func_addr: MoveFunctionId,
  func_args: Array<
    EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
  >,
  type_args: TypeArgument[] = [],
) {
  return aptos.view<T>({
    payload: {
      function: func_addr,
      functionArguments: func_args,
      typeArguments: type_args,
    },
  });
}

export class AptosContractWrapperBaseClass {
  protected signer?: Ed25519Account;
  protected moduleSigner: Ed25519Account;

  protected readonly aptosProvider: AptosProvider;

  /**
   * Creates an instance of the base class.
   *
   * @param aptosProvider - An instance of AptosProvider to interact with the Aptos blockchain.
   * @param signer - An optional Ed25519Account instance used for signing transactions.
   */
  constructor(aptosProvider: AptosProvider, signer?: Ed25519Account) {
    this.aptosProvider = aptosProvider;
    this.signer = signer;
    this.moduleSigner = signer;
  }

  /**
   * Sets the signer for the client.
   *
   * @param senderAccount - The Ed25519 account to be used as the signer.
   */
  public setSigner(senderAccount: Ed25519Account) {
    this.signer = senderAccount;
  }

  /**
   * Sets the signer for the current instance using the provided Ed25519 account.
   *
   * @param senderAccount - The Ed25519 account to be used as the signer.
   * @returns The current instance with the signer set.
   */
  public withSigner(senderAccount: Ed25519Account) {
    this.setSigner(senderAccount);
    return this;
  }

  /**
   * Sets the signer to the module signer and returns the current instance.
   *
   * @returns {this} The current instance with the module signer set.
   */
  public withModuleSigner() {
    this.setSigner(this.moduleSigner);
    return this;
  }

  /**
   * Retrieves the current Ed25519Account signer.
   *
   * @returns {Ed25519Account} The current signer.
   */
  public getSigner(): Ed25519Account {
    return this.signer;
  }

  /**
   * Sends a transaction and awaits the response.
   *
   * @param functionId - The ID of the Move function to be called.
   * @param func_args - An array of arguments for the entry function.
   * @param type_args - Typed arguments to be passed to the Move function.
   * @returns A promise that resolves to the committed transaction response.
   */
  public async sendTxAndAwaitResponse(
    functionId: MoveFunctionId,
    func_args: Array<
      EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
    >,
    type_args: TypeArgument[] = [],
  ): Promise<CommittedTransactionResponse> {
    return transaction(
      this.aptosProvider.getAptos(),
      this.signer,
      functionId,
      func_args,
      type_args,
    );
  }

  /**
   * Builds a transaction for the specified user, function, and arguments.
   *
   * @param user - The account address of the user initiating the transaction.
   * @param functionId - The identifier of the Move function to be called.
   * @param func_args - An array of arguments for the entry function.
   * @param type_args - Typed arguments to be passed to the Move function.
   * @returns A promise that resolves to a SimpleTransaction object.
   */
  public async buildTx(
    user: AccountAddress,
    functionId: MoveFunctionId,
    func_args: Array<
      EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
    >,
    type_args: TypeArgument[] = [],
  ): Promise<SimpleTransaction> {
    return transactionData(
      this.aptosProvider.getAptos(),
      user,
      functionId,
      func_args,
      type_args,
    );
  }

  /**
   * Calls a view method on the Aptos blockchain.
   *
   * @template T - The type of the return value, which extends an array of MoveValue.
   * @param {MoveFunctionId} functionId - The identifier of the function to call.
   * @param {Array<EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes>} func_args - The arguments to pass to the function.
   * @param type_args - Typed arguments to be passed to the Move function.
   * @returns {Promise<T>} - A promise that resolves to the result of the view method call.
   */
  public async callViewMethod<T extends MoveValue[]>(
    functionId: MoveFunctionId,
    func_args: Array<
      EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
    >,
    type_args: TypeArgument[] = [],
  ): Promise<T> {
    return view<T>(
      this.aptosProvider.getAptos(),
      functionId,
      func_args,
      type_args,
    );
  }

  /**
   * Funds an account with a specified amount.
   *
   * @param account - The address of the account to be funded.
   * @param amount - The amount to fund the account with, in bigint.
   * @returns A promise that resolves to a UserTransactionResponse.
   */
  public async fundAccount(
    account: AccountAddress,
    amount: bigint,
  ): Promise<UserTransactionResponse> {
    return fundAccount(this.aptosProvider.getAptos(), account, Number(amount));
  }

  /**
   * Retrieves the Aptos balance of a specified account.
   *
   * @param account - The Ed25519 account object.
   * @param accountAddress - The address of the account to retrieve the balance for.
   * @param versionToWaitFor - (Optional) The specific version to wait for before retrieving the balance.
   * @returns A promise that resolves to the balance of the account in bigint.
   */
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

  /**
   * Retrieves the events associated with a given transaction hash.
   *
   * @param txHash - The hash of the transaction to retrieve events for.
   * @returns A promise that resolves to an array of objects containing the event data.
   *
   * @remarks
   * This method fetches the transaction details using the provided Aptos provider.
   * It then checks if the transaction response is of type `BlockMetadataTransactionResponse`
   * or `UserTransactionResponse` to extract the events. The event data is parsed from JSON
   * and returned in an array.
   */
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

  /**
   * Retrieves events associated with a specific account.
   *
   * @param account - The address of the account to retrieve events for.
   * @param limit - The maximum number of events to retrieve.
   * @returns A promise that resolves to an array of event objects, each containing:
   *   - `account_address`: The address of the account.
   *   - `creation_number`: The creation number of the event.
   *   - `data`: The data associated with the event.
   *   - `event_index`: The index of the event.
   *   - `sequence_number`: The sequence number of the event.
   *   - `transaction_block_height`: The block height of the transaction.
   *   - `transaction_version`: The version of the transaction.
   *   - `type`: The type of the event.
   *   - `indexed_type`: The indexed type of the event.
   */
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

    return await this.aptosProvider.getAptos().getEvents({
      options: { where: whereCondition, limit },
    });
  }
}
