import {
  Network,
  AptosConfig,
  Aptos,
  AccountAddress,
} from "@aptos-labs/ts-sdk";

export interface AptosProviderConfig {
  network: Network;
  addresses: {
    A_TOKENS: string;
    UNDERLYING_TOKENS: string;
    VARIABLE_TOKENS: string;
    AAVE_ACL: string;
    AAVE_CONFIG: string;
    AAVE_MOCK_ORACLE: string;
    AAVE_POOL: string;
    AAVE_ROLE_SUPER_ADMIN: string;
  };
  oracle: {
    URL: string;
    CONTRACT_ACCOUNT: string;
    DEPLOYER_ACCOUNT: string;
    WORMHOLE: string;
  };
}

export class AptosProvider {
  private readonly network: Network;

  private readonly oracleUrl: string;

  private accountProfilesMap: Map<string, AccountAddress> = new Map();

  private aptos: Aptos;

  constructor(config: AptosProviderConfig) {
    this.network = config.network;
    this.oracleUrl = config.oracle.URL;
    this.accountProfilesMap.set(
      "A_TOKENS_ADDRESS",
      AccountAddress.fromString(config.addresses.A_TOKENS),
    );
    this.accountProfilesMap.set(
      "UNDERLYING_TOKENS_ADDRESS",
      AccountAddress.fromString(config.addresses.UNDERLYING_TOKENS),
    );
    this.accountProfilesMap.set(
      "VARIABLE_TOKENS_ADDRESS",
      AccountAddress.fromString(config.addresses.VARIABLE_TOKENS),
    );
    this.accountProfilesMap.set(
      "AAVE_ACL_ADDRESS",
      AccountAddress.fromString(config.addresses.AAVE_ACL),
    );
    this.accountProfilesMap.set(
      "AAVE_CONFIG_ADDRESS",
      AccountAddress.fromString(config.addresses.AAVE_CONFIG),
    );
    this.accountProfilesMap.set(
      "AAVE_MOCK_ORACLE_ADDRESS",
      AccountAddress.fromString(config.addresses.AAVE_MOCK_ORACLE),
    );
    this.accountProfilesMap.set(
      "AAVE_POOL_ADDRESS",
      AccountAddress.fromString(config.addresses.AAVE_POOL),
    );
    this.accountProfilesMap.set(
      "AAVE_ROLE_SUPER_ADMIN_ADDRESS",
      AccountAddress.fromString(config.addresses.AAVE_ROLE_SUPER_ADMIN),
    );

    const aptosConfig = new AptosConfig({ network: this.network });
    this.aptos = new Aptos(aptosConfig);
  }

  /** Returns the aptos instance. */
  public getAptos(): Aptos {
    return this.aptos;
  }

  /** Returns the account profile by name if found. */
  public getProfileAccountByName(profileName: string): AccountAddress {
    return this.accountProfilesMap.get(profileName);
  }

  /** Gets the selected network. */
  public getNetwork(): Network {
    return this.network;
  }

  /** Gets the oracle url. */
  public getOracleUrl(): string {
    return this.oracleUrl;
  }
}
