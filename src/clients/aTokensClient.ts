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

export class ATokensClient extends AptosContractWrapperBaseClass {
  tokensContract: TokensContract;

  constructor(provider: AptosProvider, signer?: Ed25519Account) {
    super(provider, signer);
    this.tokensContract = new TokensContract(provider);
  }

  public static buildWithDefaultSigner(provider: AptosProvider): ATokensClient {
    const client = new ATokensClient(
      provider,
      provider.getATokensProfileAccount(),
    );
    return client;
  }

  public async createToken(
    maximumSupply: bigint,
    name: string,
    symbol: string,
    decimals: number,
    iconUri: string,
    projectUri: string,
    underlyingAsset: AccountAddress,
    treasuryAddress: AccountAddress,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.tokensContract.ATokenCreateTokenFuncAddr,
      [
        maximumSupply,
        name,
        symbol,
        decimals,
        iconUri,
        projectUri,
        underlyingAsset,
        treasuryAddress,
      ],
    );
  }

  public async rescueTokens(
    token: AccountAddress,
    to: AccountAddress,
    amount: bigint,
  ): Promise<CommittedTransactionResponse> {
    return this.sendTxAndAwaitResponse(
      this.tokensContract.ATokenRescueTokensFuncAddr,
      [token, to, amount.toString()],
    );
  }

  public async getRevision(): Promise<number> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.ATokenGetRevisionFuncAddr,
      [],
    );
    return resp as number;
  }

  public async getMetadataBySymbol(
    owner: AccountAddress,
    symbol: string,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.ATokenGetMetadataBySymbolFuncAddr,
      [owner, symbol],
    );
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  public async getTokenAccountAddress(
    metadataAddress: AccountAddress,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.ATokenGetTokenAccountAddressFuncAddr,
      [metadataAddress],
    );
    return AccountAddress.fromString(resp as string);
  }

  public async getTokenAddress(
    owner: AccountAddress,
    symbol: string,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.ATokenTokenAddressFuncAddr,
      [owner, symbol],
    );
    return AccountAddress.fromString(resp as string);
  }

  public async assetMetadata(
    owner: AccountAddress,
    symbol: string,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.ATokenAssetMetadataFuncAddr,
      [owner, symbol],
    );
    return AccountAddress.fromString((resp as Metadata).inner);
  }

  public async getReserveTreasuryAddress(
    metadataAddress: AccountAddress,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.ATokenGetReserveTreasuryAddressFuncAddr,
      [metadataAddress],
    );
    return AccountAddress.fromString(resp as string);
  }

  public async getUnderlyingAssetAddress(
    metadataAddress: AccountAddress,
  ): Promise<AccountAddress> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.ATokenGetUnderlyingAssetAddressFuncAddr,
      [metadataAddress],
    );
    return AccountAddress.fromString(resp as string);
  }

  public async scaledBalanceOf(
    owner: AccountAddress,
    metadataAddress: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.tokensContract.ATokenScaledBalanceOfFuncAddr,
        [owner, metadataAddress],
      )
    ).map(mapToBigInt);
    return resp;
  }

  public async balanceOf(
    owner: AccountAddress,
    metadataAddress: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(this.tokensContract.ATokenBalanceOfFuncAddr, [
        owner,
        metadataAddress,
      ])
    ).map(mapToBigInt);
    return resp;
  }

  public async scaledTotalSupply(
    metadataAddress: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.tokensContract.ATokenScaledTotalSupplyFuncAddr,
        [metadataAddress],
      )
    ).map(mapToBigInt);
    return resp;
  }

  public async totalSupply(metadataAddress: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(this.tokensContract.ATokenTotalSupplyFuncAddr, [
        metadataAddress,
      ])
    ).map(mapToBigInt);
    return resp;
  }

  public async getPreviousIndex(
    user: AccountAddress,
    metadataAddress: AccountAddress,
  ): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(
        this.tokensContract.ATokenGetGetPreviousIndexFuncAddr,
        [user, metadataAddress],
      )
    ).map(mapToBigInt);
    return resp;
  }

  public async getScaledUserBalanceAndSupply(
    owner: AccountAddress,
    metadataAddress: AccountAddress,
  ): Promise<{ scaledUserBalance: bigint; supply: bigint }> {
    const [scaledUserBalance, supply] = (
      await this.callViewMethod(
        this.tokensContract.ATokenGetScaledUserBalanceAndSupplyFuncAddr,
        [owner, metadataAddress],
      )
    ).map(mapToBigInt);
    return { scaledUserBalance, supply };
  }

  // Get the name of the fungible asset from the metadata object.
  public async name(metadataAddress: AccountAddress): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.ATokenNameFuncAddr,
      [metadataAddress],
    );
    return resp as string;
  }

  // Get the symbol of the fungible asset from the metadata object.
  public async symbol(metadataAddress: AccountAddress): Promise<string> {
    const [resp] = await this.callViewMethod(
      this.tokensContract.ATokenSymbolFuncAddr,
      [metadataAddress],
    );
    return resp as string;
  }

  // Get the decimals from the metadata object.
  public async decimals(metadataAddress: AccountAddress): Promise<bigint> {
    const [resp] = (
      await this.callViewMethod(this.tokensContract.ATokenDecimalsFuncAddr, [
        metadataAddress,
      ])
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
}
