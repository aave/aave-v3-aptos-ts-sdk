import {
  Network,
  AptosConfig,
  Aptos,
  AccountAddress,
  Ed25519PrivateKey,
  Account,
  Ed25519Account,
} from "@aptos-labs/ts-sdk";
import YAML from "yaml";
import { map } from "yaml/dist/schema/common/map";

export interface AptosProviderConfig {
  network: Network;
  addresses: {
    A_TOKENS: string;
    UNDERLYING_TOKENS: string;
    VARIABLE_TOKENS: string;
    AAVE_ACL: string;
    AAVE_CONFIG: string;
    AAVE_ORACLE: string;
    AAVE_POOL: string;
    AAVE_RATE: string;
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
  AAVE_ORACLE = "aave_oracle",
  AAVE_POOL = "aave_pool",
  AAVE_RATE = "aave_rate",
  AAVE_LARGE_PACKAGES = "aave_large_packages",
  AAVE_MATH = "aave_math",
  DEFAULT_FUNDER = "default",
  TEST_ACCOUNT_0 = "test_account_0",
  TEST_ACCOUNT_1 = "test_account_1",
  TEST_ACCOUNT_2 = "test_account_2",
  TEST_ACCOUNT_3 = "test_account_3",
  TEST_ACCOUNT_4 = "test_account_4",
  TEST_ACCOUNT_5 = "test_account_5",
}

export class AptosProvider {
  private network: Network;

  private oracleUrl: string;

  private profileAddressMap = new Map<string, AccountAddress>();
  private profileAccountMap = new Map<string, Ed25519PrivateKey>();

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
    // aptosProvider.setOracleUrl(config.oracle.URL);
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
      AAVE_PROFILES.AAVE_ORACLE,
      AccountAddress.fromString(config.addresses.AAVE_ORACLE),
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

  public static fromEnvs(): AptosProvider {
    const aptosProvider = new AptosProvider();
    // read vars from .env file
    if (!process.env.APTOS_NETWORK) {
      throw new Error("Missing APTOS_NETWORK in .env file");
    }
    switch (process.env.APTOS_NETWORK.toLowerCase()) {
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
          `Unknown network ${process.env.APTOS_NETWORK ? process.env.APTOS_NETWORK : "undefined"}`,
        );
    }

    aptosProvider.setOracleUrl("");

    // read envs
    if (!process.env.A_TOKENS_PRIVATE_KEY) {
      throw new Error("Env variable A_TOKENS_PRIVATE_KEY does not exist");
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.A_TOKENS,
      process.env.A_TOKENS_PRIVATE_KEY,
    );

    if (!process.env.UNDERLYING_TOKENS_PRIVATE_KEY) {
      throw new Error(
        "Env variable UNDERLYING_TOKENS_PRIVATE_KEY does not exist",
      );
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.UNDERLYING_TOKENS,
      process.env.UNDERLYING_TOKENS_PRIVATE_KEY,
    );

    if (!process.env.VARIABLE_TOKENS_PRIVATE_KEY) {
      throw new Error(
        "Env variable VARIABLE_TOKENS_PRIVATE_KEY does not exist",
      );
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.VARIABLE_TOKENS,
      process.env.VARIABLE_TOKENS_PRIVATE_KEY,
    );

    if (!process.env.AAVE_ACL_PRIVATE_KEY) {
      throw new Error("Env variable AAVE_ACL_PRIVATE_KEY does not exist");
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.AAVE_ACL,
      process.env.AAVE_ACL_PRIVATE_KEY,
    );

    if (!process.env.AAVE_CONFIG_PRIVATE_KEY) {
      throw new Error("Env variable AAVE_CONFIG_PRIVATE_KEY does not exist");
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.AAVE_CONFIG,
      process.env.AAVE_CONFIG_PRIVATE_KEY,
    );

    if (!process.env.AAVE_ORACLE_PRIVATE_KEY) {
      throw new Error("Env variable AAVE_ORACLE_PRIVATE_KEY does not exist");
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.AAVE_ORACLE,
      process.env.AAVE_ORACLE_PRIVATE_KEY,
    );

    if (!process.env.AAVE_POOL_PRIVATE_KEY) {
      throw new Error("Env variable AAVE_POOL_PRIVATE_KEY does not exist");
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.AAVE_POOL,
      process.env.AAVE_POOL_PRIVATE_KEY,
    );

    if (!process.env.AAVE_LARGE_PACKAGES_PRIVATE_KEY) {
      throw new Error(
        "Env variable AAVE_LARGE_PACKAGES_PRIVATE_KEY does not exist",
      );
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.AAVE_LARGE_PACKAGES,
      process.env.AAVE_LARGE_PACKAGES_PRIVATE_KEY,
    );

    if (!process.env.AAVE_MATH_PRIVATE_KEY) {
      throw new Error("Env variable AAVE_MATH_PRIVATE_KEY does not exist");
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.AAVE_MATH,
      process.env.AAVE_MATH_PRIVATE_KEY,
    );

    if (!process.env.DEFAULT_FUNDER_PRIVATE_KEY) {
      throw new Error("Env variable DEFAULT_FUNDER_PRIVATE_KEY does not exist");
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.DEFAULT_FUNDER,
      process.env.DEFAULT_FUNDER_PRIVATE_KEY,
    );

    if (!process.env.TEST_ACCOUNT_0_PRIVATE_KEY) {
      throw new Error("Env variable TEST_ACCOUNT_0_PRIVATE_KEY does not exist");
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.TEST_ACCOUNT_0,
      process.env.TEST_ACCOUNT_0_PRIVATE_KEY,
    );

    if (!process.env.TEST_ACCOUNT_1_PRIVATE_KEY) {
      throw new Error("Env variable TEST_ACCOUNT_1_PRIVATE_KEY does not exist");
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.TEST_ACCOUNT_1,
      process.env.TEST_ACCOUNT_1_PRIVATE_KEY,
    );

    if (!process.env.TEST_ACCOUNT_2_PRIVATE_KEY) {
      throw new Error("Env variable TEST_ACCOUNT_2_PRIVATE_KEY does not exist");
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.TEST_ACCOUNT_2,
      process.env.TEST_ACCOUNT_2_PRIVATE_KEY,
    );

    if (!process.env.TEST_ACCOUNT_3_PRIVATE_KEY) {
      throw new Error("Env variable TEST_ACCOUNT_3_PRIVATE_KEY does not exist");
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.TEST_ACCOUNT_3,
      process.env.TEST_ACCOUNT_3_PRIVATE_KEY,
    );

    if (!process.env.TEST_ACCOUNT_4_PRIVATE_KEY) {
      throw new Error("Env variable TEST_ACCOUNT_4_PRIVATE_KEY does not exist");
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.TEST_ACCOUNT_4,
      process.env.TEST_ACCOUNT_4_PRIVATE_KEY,
    );

    if (!process.env.TEST_ACCOUNT_5_PRIVATE_KEY) {
      throw new Error("Env variable TEST_ACCOUNT_5_PRIVATE_KEY does not exist");
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.TEST_ACCOUNT_5,
      process.env.TEST_ACCOUNT_5_PRIVATE_KEY,
    );

    const aptosConfig = new AptosConfig({
      network: aptosProvider.getNetwork(),
    });
    aptosProvider.setAptos(aptosConfig);
    return aptosProvider;
  }

  public static fromAptosYaml(aptosYaml: string): AptosProvider {
    let aptosProvider = new AptosProvider();
    const parsedYaml = YAML.parse(aptosYaml);
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
    if (!this.profileAccountMap.has(profileName)) {
      throw new Error(
        `Account "${profileName}" was not found in the profiles map`,
      );
    }
    return this.profileAccountMap.get(profileName);
  }

  /** Returns the profile private key by name if found. */
  public getProfileAccountByName(profileName: string): Ed25519Account {
    const profileAccount = this.getProfileAccountPrivateKeyByName(profileName);
    if (profileAccount) {
      return Account.fromPrivateKey({
        privateKey: this.getProfileAccountPrivateKeyByName(profileName),
      });
    }
    return undefined;
  }

  /** Returns the profile address by name if found. */
  public getProfileAddressByName(profileName: string): AccountAddress {
    if (!this.profileAddressMap.has(profileName)) {
      throw new Error(
        `Address of account "${profileName}" was not found in the profile addresses map`,
      );
    }
    return this.profileAddressMap.get(profileName);
  }

  public getOracleProfileAccount(): Ed25519Account {
    return this.getProfileAccountByName(AAVE_PROFILES.AAVE_ORACLE);
  }

  public getPoolProfileAccount(): Ed25519Account {
    return this.getProfileAccountByName(AAVE_PROFILES.AAVE_POOL);
  }

  public getATokensProfileAccount(): Ed25519Account {
    return this.getProfileAccountByName(AAVE_PROFILES.A_TOKENS);
  }

  public getUnderlyingTokensProfileAccount(): Ed25519Account {
    return this.getProfileAccountByName(AAVE_PROFILES.UNDERLYING_TOKENS);
  }

  public getVariableTokensProfileAccount(): Ed25519Account {
    return this.getProfileAccountByName(AAVE_PROFILES.VARIABLE_TOKENS);
  }

  public getAclProfileAccount(): Ed25519Account {
    return this.getProfileAccountByName(AAVE_PROFILES.AAVE_ACL);
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

const addProfilePkey = (
  aptosProvider: AptosProvider,
  profile: string,
  privateKey: string,
) => {
  const aptosPrivateKey = new Ed25519PrivateKey(privateKey);
  aptosProvider.addProfileAccount(profile, aptosPrivateKey);
  const profileAccount = Account.fromPrivateKey({
    privateKey: aptosPrivateKey,
  });
  aptosProvider.addProfileAddress(profile, profileAccount.accountAddress);
};
