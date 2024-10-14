import {
  Network,
  AptosConfig,
  Aptos,
  AccountAddress,
  Ed25519PrivateKey,
  Account,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import { PathLike } from "fs";
import fs from "fs";
import YAML from "yaml";

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
  };
  oracle: {
    URL: string;
    CONTRACT_ACCOUNT: string;
    DEPLOYER_ACCOUNT: string;
    WORMHOLE: string;
  };
}

export interface AptosAccountConfig {
  network: string;
  private_key: string;
  public_key: string;
  account: string;
  rest_url: string;
  faucet_url: string;
}

export enum AAVE_PROFILES {
  A_TOKENS = "a_tokens",
  UNDERLYING_TOKENS = "underlying_tokens",
  VARIABLE_TOKENS = "variable_tokens",
  AAVE_ACL = "aave_acl",
  AAVE_CONFIG = "aave_config",
  AAVE_MOCK_ORACLE = "aave_mock_oracle",
  AAVE_ORACLE = "aave_oracle",
  AAVE_POOL = "aave_pool",
  AAVE_LARGE_PACKAGES = "aave_large_packages",
  AAVE_MATH = "aave_math",
}

export class AptosProvider {
  private network: Network;

  private oracleUrl: string;

  private profileAddressMap: Map<string, AccountAddress> = new Map();
  private profileAccountMap: Map<string, Ed25519PrivateKey> = new Map();

  private aptos: Aptos;

  private constructor() {}

  public setNetwork(network: Network) {
    this.network = network;
  }

  public setOracleUrl(oracleUrl: string) {
    this.oracleUrl = oracleUrl;
  }

  public addProfileAddress(profileName: string, address: AccountAddress) {
    this.profileAddressMap.set(profileName, address);
  }

  public addProfileAccount(profileName: string, account: Ed25519PrivateKey) {
    this.profileAccountMap.set(profileName, account);
  }

  public setAptos(aptosConfig: AptosConfig) {
    this.aptos = new Aptos(aptosConfig);
  }

  public static fromConfig(config: AptosProviderConfig): AptosProvider {
    let aptosProvider = new AptosProvider();
    aptosProvider.setNetwork(config.network);
    aptosProvider.setOracleUrl(config.oracle.URL);
    aptosProvider.addProfileAddress(
      AAVE_PROFILES.A_TOKENS,
      AccountAddress.fromString(config.addresses.A_TOKENS),
    );
    aptosProvider.addProfileAddress(
      AAVE_PROFILES.UNDERLYING_TOKENS,
      AccountAddress.fromString(config.addresses.UNDERLYING_TOKENS),
    );
    aptosProvider.addProfileAddress(
      AAVE_PROFILES.VARIABLE_TOKENS,
      AccountAddress.fromString(config.addresses.VARIABLE_TOKENS),
    );
    aptosProvider.addProfileAddress(
      AAVE_PROFILES.AAVE_ACL,
      AccountAddress.fromString(config.addresses.AAVE_ACL),
    );
    aptosProvider.addProfileAddress(
      AAVE_PROFILES.AAVE_CONFIG,
      AccountAddress.fromString(config.addresses.AAVE_CONFIG),
    );
    aptosProvider.addProfileAddress(
      AAVE_PROFILES.AAVE_MOCK_ORACLE,
      AccountAddress.fromString(config.addresses.AAVE_MOCK_ORACLE),
    );
    aptosProvider.addProfileAddress(
      AAVE_PROFILES.AAVE_POOL,
      AccountAddress.fromString(config.addresses.AAVE_POOL),
    );
    const aptosConfig = new AptosConfig({
      network: aptosProvider.getNetwork(),
    });
    aptosProvider.setAptos(aptosConfig);
    return aptosProvider;
  }

  public static fromAptosConfigFile(aptosConfigFile: PathLike): AptosProvider {
    // read profile set
    if (!fs.existsSync(aptosConfigFile as PathLike)) {
      throw new Error(
        `Aptos config file under path ${aptosConfigFile} does not exist`,
      );
    }
    const aptosConfigData = fs.readFileSync(aptosConfigFile, "utf8");

    let aptosProvider = new AptosProvider();

    const parsedYaml = YAML.parse(aptosConfigData);
    for (const profile of Object.keys(parsedYaml.profiles)) {
      const profileConfig = parsedYaml.profiles[profile] as AptosAccountConfig;

      // extract network
      switch (profileConfig.network.toLowerCase()) {
        case "testnet": {
          aptosProvider.setNetwork(Network.TESTNET);
          break;
        }
        case "devnet": {
          aptosProvider.setNetwork(Network.DEVNET);
          break;
        }
        case "mainnet": {
          aptosProvider.setNetwork(Network.MAINNET);
          break;
        }
        case "local": {
          aptosProvider.setNetwork(Network.LOCAL);
          break;
        }
        default:
          throw new Error(
            `Unknown network ${profileConfig.network ? profileConfig.network : "undefined"}`,
          );
      }

      const aptosPrivateKey = new Ed25519PrivateKey(profileConfig.private_key);
      aptosProvider.addProfileAccount(profile, aptosPrivateKey);
      const profileAccount = Account.fromPrivateKey({
        privateKey: aptosPrivateKey,
      });
      aptosProvider.addProfileAddress(profile, profileAccount.accountAddress);
    }
    const aptosConfig = new AptosConfig({
      network: aptosProvider.getNetwork(),
    });
    aptosProvider.setAptos(aptosConfig);
    return aptosProvider;
  }

  /** Returns the aptos instance. */
  public getAptos(): Aptos {
    return this.aptos;
  }

  /** Returns the profile private key by name if found. */
  public getProfileAccountPrivateKeyByName(
    profileName: string,
  ): Ed25519PrivateKey {
    return this.profileAccountMap.get(profileName);
  }

  /** Returns the profile private key by name if found. */
  public getProfileAccountByName(profileName: string): Ed25519Account {
    return Account.fromPrivateKey({
      privateKey: this.getProfileAccountPrivateKeyByName(profileName),
    });
  }

  /** Returns the profile address by name if found. */
  public getProfileAddressByName(profileName: string): AccountAddress {
    return this.profileAddressMap.get(profileName);
  }

  public getOracleProfileAccount(): AccountAddress {
    return this.getProfileAddressByName(AAVE_PROFILES.AAVE_MOCK_ORACLE);
  }

  public getPoolProfileAccount(): AccountAddress {
    return this.getProfileAddressByName(AAVE_PROFILES.AAVE_POOL);
  }

  public getATokensProfileAccount(): AccountAddress {
    return this.getProfileAddressByName(AAVE_PROFILES.A_TOKENS);
  }

  public getUnderlyingTokensProfileAccount(): AccountAddress {
    return this.getProfileAddressByName(AAVE_PROFILES.UNDERLYING_TOKENS);
  }

  public getVariableTokensProfileAccount(): AccountAddress {
    return this.getProfileAddressByName(AAVE_PROFILES.VARIABLE_TOKENS);
  }

  public getAclProfileAccount(): AccountAddress {
    return this.getProfileAddressByName(AAVE_PROFILES.AAVE_ACL);
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
