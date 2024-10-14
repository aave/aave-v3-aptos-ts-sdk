import {
  AccountAddress,
  CommittedTransactionResponse,
  Ed25519Account,
  MoveFunctionId,
} from "@aptos-labs/ts-sdk";
import { AptosContractWrapperBaseClass } from "./baseClass";
import { Metadata } from "../helpers/interfaces";
import { AptosProvider } from "./aptosProvider";
import { TokensContract } from "../contracts/tokens";
import { mapToBigInt } from "../helpers/common";

export class UnderlyingTokensClient extends AptosContractWrapperBaseClass {
  tokensContract: TokensContract;

  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.tokensContract = new TokensContract(provider);
  }

  public async createToken(
    maximumSupply: bigint,
    name: string,
    symbol: string,
    decimals: number,
    iconUri: string,
    projectUri: string,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.tokensContract.UnderlyingCreateTokenFuncAddr,
      [maximumSupply, name, symbol, decimals, iconUri, projectUri],
    );
  }

  public async mint(
    to: AccountAddress,
    amount: bigint,
    metadataAddress: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.tokensContract.UnderlyingMintFuncAddr,
      [to, amount.toString(), metadataAddress],
    );
  }

  public async getMetadataBySymbol(symbol: string): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.UnderlyingGetMetadataBySymbolFuncAddr,
      [symbol],
    );
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  public async getTokenAccountAddress(): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.UnderlyingGetTokenAccountAddressFuncAddr,
      [],
    );
    return AccountAddress.fromString(resp as string);
  }

  public async supply(metadataAddress: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(this.tokensContract.UnderlyingSupplyFuncAddr, [
        metadataAddress,
      ])
    ).map(mapToBigInt);
    return resp;
  }

  // Get the maximum supply from the metadata object.
  public async maximum(metadataAddress: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(this.tokensContract.UnderlyingMaximumFuncAddr, [
        metadataAddress,
      ])
    ).map(mapToBigInt);
    return resp;
  }

  // Get the name of the fungible asset from the metadata object.
  public async name(metadataAddress: AccountAddress): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.UnderlyingNameFuncAddr,
      [metadataAddress],
    );
    return resp as string;
  }

  // Get the symbol of the fungible asset from the metadata object.
  public async symbol(metadataAddress: AccountAddress): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.UnderlyingSymbolFuncAddr,
      [metadataAddress],
    );
    return resp as string;
  }

  // Get the decimals from the metadata object.
  public async decimals(metadataAddress: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.tokensContract.UnderlyingDecimalsFuncAddr,
        [metadataAddress],
      )
    ).map(mapToBigInt);
    return resp;
  }

  // get metadata address
  public async getMetadataAddress(
    funcAddr: MoveFunctionId,
    coinName: string,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(funcAddr, [coinName]);
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  // get decimals
  public async getDecimals(
    funcAddr: MoveFunctionId,
    metadataAddr: AccountAddress,
  ): Promise<bigint> {
    const [res] = (await this.callViewMethod(funcAddr, [metadataAddr])).map(
      mapToBigInt,
    );
    return res;
  }

  public async balanceOf(
    owner: AccountAddress,
    metadataAddress: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.tokensContract.UnderlyingBalanceOfFuncAddr,
        [owner, metadataAddress],
      )
    ).map(mapToBigInt);
    return resp;
  }

  public async getTokenAddress(symbol: string): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.UnderlyingTokenAddressFuncAddr,
      [symbol],
    );
    return AccountAddress.fromString(resp as string);
  }
}
