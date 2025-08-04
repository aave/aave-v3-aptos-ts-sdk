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
 * @param funcAddr - The identifier of the Move function to be called.
 * @param funcArgs - An array of arguments to be passed to the Move function.
 * @returns A promise that resolves to the transaction data object.
 */
async function transactionData(
  aptos: Aptos,
  user: AccountAddress,
  funcAddr: MoveFunctionId,
  funcArgs: Array<
    EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
  >,
  typeArgs: string[] = [],
) {
  return aptos.transaction.build.simple({
    sender: user,
    data: {
      function: funcAddr,
      functionArguments: funcArgs,
      typeArguments: typeArgs,
    },
  });
}

/**
 * Executes a transaction on the Aptos blockchain.
 *
 * @param aptos - The Aptos client instance.
 * @param signer - The account that will sign the transaction.
 * @param funcAddr - The address of the Move function to be called.
 * @param funcArgs - The arguments to be passed to the Move function.
 * @returns A promise that resolves when the transaction is confirmed.
 */
async function transaction(
  aptos: Aptos,
  signer: Ed25519Account,
  funcAddr: MoveFunctionId,
  funcArgs: Array<
    EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
  >,
  typeArgs: string[] = [],
) {
  const transaction = await aptos.transaction.build.simple({
    sender: signer.accountAddress,
    data: {
      function: funcAddr,
      functionArguments: funcArgs,
      typeArguments: typeArgs,
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
 * @param {MoveFunctionId} funcAddr - The address of the function to be called.
 * @param {Array<EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes>} funcArgs - The arguments to be passed to the function.
 * @returns {Promise<T>} - A promise that resolves to the result of the view function.
 */
async function view<T extends MoveValue[]>(
  aptos: Aptos,
  funcAddr: MoveFunctionId,
  funcArgs: Array<
    EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
  >,
  typeArgs: string[] = [],
) {
  return aptos.view<T>({
    payload: {
      function: funcAddr,
      functionArguments: funcArgs,
      typeArguments: typeArgs,
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
   * @param funcArgs - An array of arguments for the entry function.
   * @returns A promise that resolves to the committed transaction response.
   */
  public async sendTxAndAwaitResponse(
    functionId: MoveFunctionId,
    funcArgs: Array<
      EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
    >,
    typeArgs: string[] = [],
  ): Promise<CommittedTransactionResponse> {
    return transaction(
      this.aptosProvider.getAptos(),
      this.signer,
      functionId,
      funcArgs,
      typeArgs,
    );
  }

  /**
   * Builds a transaction for the specified user, function, and arguments.
   *
   * @param user - The account address of the user initiating the transaction.
   * @param functionId - The identifier of the Move function to be called.
   * @param funcArgs - An array of arguments for the entry function.
   * @returns A promise that resolves to a SimpleTransaction object.
   */
  public async buildTx(
    user: AccountAddress,
    functionId: MoveFunctionId,
    funcArgs: Array<
      EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
    >,
    typeArgs: string[] = [],
  ): Promise<SimpleTransaction> {
    return transactionData(
      this.aptosProvider.getAptos(),
      user,
      functionId,
      funcArgs,
      typeArgs,
    );
  }

  /**
   * Calls a view method on the Aptos blockchain.
   *
   * @template T - The type of the return value, which extends an array of MoveValue.
   * @param {MoveFunctionId} functionId - The identifier of the function to call.
   * @param {Array<EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes>} funcArgs - The arguments to pass to the function.
   * @param {string[]} typeArgs - Optional generic type arguments for the function (e.g. `["0x1::aptos_coin::AptosCoin"]`).
   * @returns {Promise<T>} - A promise that resolves to the result of the view method call.
   */
  public async callViewMethod<T extends MoveValue[]>(
    functionId: MoveFunctionId,
    funcArgs: Array<
      EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
    >,
    typeArgs: string[] = [],
  ): Promise<T> {
    return view<T>(
      this.aptosProvider.getAptos(),
      functionId,
      funcArgs,
      typeArgs,
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
}
