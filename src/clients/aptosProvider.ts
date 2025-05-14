import {
  Network,
  AptosConfig,
  Aptos,
  AccountAddress,
  Ed25519PrivateKey,
  Account,
  Ed25519Account,
  PrivateKeyVariants,
  PrivateKey,
} from "@aptos-labs/ts-sdk";
import YAML from "yaml";

/**
 * Configuration interface for the AptosProvider.
 *
 * @interface AptosProviderConfig
 *
 * @property {Network} network - The network configuration for the AptosProvider.
 * @property {Object} addresses - The contract addresses used by the AptosProvider.
 * @property {string} addresses.A_TOKENS - The address for A tokens.
 * @property {string} addresses.UNDERLYING_TOKENS - The address for underlying tokens.
 * @property {string} addresses.VARIABLE_TOKENS - The address for variable tokens.
 * @property {string} addresses.AAVE_ACL - The address for AAVE ACL.
 * @property {string} addresses.AAVE_CONFIG - The address for AAVE configuration.
 * @property {string} addresses.AAVE_ORACLE - The address for AAVE oracle.
 * @property {string} addresses.AAVE_POOL - The address for AAVE pool.
 * @property {string} addresses.AAVE_DATA - The address for AAVE data.
 */
export interface AptosProviderConfig {
  network: Network;
  addresses: {
    A_TOKENS: string;
    AAVE_MOCK_UNDERLYINGS: string;
    VARIABLE_TOKENS: string;
    AAVE_ACL: string;
    AAVE_CONFIG: string;
    AAVE_ORACLE: string;
    AAVE_POOL: string;
    AAVE_DATA: string;
    AAVE_MATH: string;
  };
}

/**
 * Configuration interface for an Aptos account.
 *
 * @interface AptosAccountConfig
 *
 * @property {string} network - The network to which the account belongs (e.g., mainnet, testnet).
 * @property {string} private_key - The private key associated with the account.
 * @property {string} public_key - The public key associated with the account.
 * @property {string} account - The account address.
 * @property {string} rest_url - The REST API URL for interacting with the Aptos blockchain.
 * @property {string} faucet_url - The URL for the faucet service to fund the account with test tokens.
 */
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
  AAVE_MOCK_UNDERLYINGS = "aave_mock_underlyings",
  VARIABLE_TOKENS = "variable_tokens",
  AAVE_ACL = "aave_acl",
  AAVE_CONFIG = "aave_config",
  AAVE_ORACLE = "aave_oracle",
  AAVE_POOL = "aave_pool",
  AAVE_LARGE_PACKAGES = "aave_large_packages",
  AAVE_MATH = "aave_math",
  AAVE_DATA = "aave_data",
  AAVE_DATA_FEEDS = "data_feeds",
  AAVE_PLATFORM = "platform",
  DEFAULT_FUNDER = "default",
  TEST_ACCOUNT_0 = "test_account_0",
  TEST_ACCOUNT_1 = "test_account_1",
  TEST_ACCOUNT_2 = "test_account_2",
  TEST_ACCOUNT_3 = "test_account_3",
  TEST_ACCOUNT_4 = "test_account_4",
  TEST_ACCOUNT_5 = "test_account_5",
}

/**
 * The `AptosProvider` class is responsible for managing the configuration and profiles
 * for interacting with the Aptos blockchain. It allows setting up network configurations,
 * adding profile addresses and accounts, and initializing the Aptos instance.
 *
 * @class
 */
export class AptosProvider {
  private network: Network;
  private profileAddressMap = new Map<string, AccountAddress>();
  private profileAccountMap = new Map<string, Ed25519PrivateKey>();

  private aptos: Aptos;

  private constructor() {}

  /**
   * Sets the network for the Aptos provider.
   *
   * @param network - The network to set, represented by the `Network` type.
   */
  public setNetwork(network: Network) {
    this.network = network;
  }

  /**
   * Adds a profile address to the profile address map.
   *
   * @param profileName - The name of the profile to associate with the address.
   * @param address - The account address to be added.
   */
  public addProfileAddress(profileName: string, address: AccountAddress) {
    this.profileAddressMap.set(profileName, address);
  }

  /**
   * Adds a profile account to the profile account map.
   *
   * @param profileName - The name of the profile to associate with the account.
   * @param account - The Ed25519 private key of the account to add.
   */
  public addProfileAccount(profileName: string, account: Ed25519PrivateKey) {
    this.profileAccountMap.set(profileName, account);
  }

  /**
   * Sets the Aptos configuration for the client.
   *
   * @param aptosConfig - The configuration object for Aptos.
   */
  public setAptos(aptosConfig: AptosConfig) {
    this.aptos = new Aptos(aptosConfig);
  }

  /**
   * Creates an instance of `AptosProvider` from the given configuration.
   *
   * @param config - The configuration object for the `AptosProvider`.
   * @returns A new instance of `AptosProvider` configured with the provided settings.
   *
   * @example
   * ```typescript
   * const config: AptosProviderConfig = {
   *   network: 'mainnet',
   *   addresses: {
   *     A_TOKENS: '0x...',
   *     AAVE_MOCK_UNDERLYINGS: '0x...',
   *     VARIABLE_TOKENS: '0x...',
   *     AAVE_ACL: '0x...',
   *     AAVE_CONFIG: '0x...',
   *     AAVE_ORACLE: '0x...',
   *     AAVE_POOL: '0x...',
   *     AAVE_DATA: '0x...'
   *   }
   * };
   * const aptosProvider = AptosProvider.fromConfig(config);
   * ```
   */
  public static fromConfig(config: AptosProviderConfig): AptosProvider {
    let aptosProvider = new AptosProvider();
    aptosProvider.setNetwork(config.network);

    aptosProvider.addProfileAddress(
      AAVE_PROFILES.A_TOKENS,
      AccountAddress.fromString(config.addresses.A_TOKENS),
    );
    aptosProvider.addProfileAddress(
      AAVE_PROFILES.AAVE_MOCK_UNDERLYINGS,
      AccountAddress.fromString(config.addresses.AAVE_MOCK_UNDERLYINGS),
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
    aptosProvider.addProfileAddress(
      AAVE_PROFILES.AAVE_MATH,
      AccountAddress.fromString(config.addresses.AAVE_MATH),
    );
    aptosProvider.addProfileAddress(
      AAVE_PROFILES.AAVE_DATA,
      AccountAddress.fromString(config.addresses.AAVE_DATA),
    );
    const aptosConfig = new AptosConfig({
      network: aptosProvider.getNetwork(),
    });
    aptosProvider.setAptos(aptosConfig);
    return aptosProvider;
  }

  /**
   * Creates an instance of `AptosProvider` by reading configuration from environment variables.
   *
   * @throws {Error} If any required environment variable is missing or if an unknown network is specified.
   *
   * @returns {AptosProvider} The configured `AptosProvider` instance.
   *
   * Environment Variables:
   * - `APTOS_NETWORK`: The network to connect to (testnet, devnet, mainnet, local).
   * - `A_TOKENS_PRIVATE_KEY`: Private key for A_TOKENS profile.
   * - `AAVE_MOCK_UNDERLYING_TOKENS_PRIVATE_KEY`: Private key for UNDERLYING_TOKENS profile.
   * - `VARIABLE_TOKENS_PRIVATE_KEY`: Private key for VARIABLE_TOKENS profile.
   * - `AAVE_ACL_PRIVATE_KEY`: Private key for AAVE_ACL profile.
   * - `AAVE_CONFIG_PRIVATE_KEY`: Private key for AAVE_CONFIG profile.
   * - `AAVE_ORACLE_PRIVATE_KEY`: Private key for AAVE_ORACLE profile.
   * - `AAVE_POOL_PRIVATE_KEY`: Private key for AAVE_POOL profile.
   * - `AAVE_LARGE_PACKAGES_PRIVATE_KEY`: Private key for AAVE_LARGE_PACKAGES profile.
   * - `AAVE_MATH_PRIVATE_KEY`: Private key for AAVE_MATH profile.
   * - `AAVE_DATA_PRIVATE_KEY`: Private key for AAVE_DATA profile.
   * - `DEFAULT_FUNDER_PRIVATE_KEY`: Private key for DEFAULT_FUNDER profile.
   * - `TEST_ACCOUNT_0_PRIVATE_KEY`: Private key for TEST_ACCOUNT_0 profile.
   * - `TEST_ACCOUNT_1_PRIVATE_KEY`: Private key for TEST_ACCOUNT_1 profile.
   * - `TEST_ACCOUNT_2_PRIVATE_KEY`: Private key for TEST_ACCOUNT_2 profile.
   * - `TEST_ACCOUNT_3_PRIVATE_KEY`: Private key for TEST_ACCOUNT_3 profile.
   * - `TEST_ACCOUNT_4_PRIVATE_KEY`: Private key for TEST_ACCOUNT_4 profile.
   * - `TEST_ACCOUNT_5_PRIVATE_KEY`: Private key for TEST_ACCOUNT_5 profile.
   */
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

    // read envs
    if (!process.env.A_TOKENS_PRIVATE_KEY) {
      throw new Error("Env variable A_TOKENS_PRIVATE_KEY does not exist");
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.A_TOKENS,
      process.env.A_TOKENS_PRIVATE_KEY,
    );

    if (!process.env.AAVE_MOCK_UNDERLYING_TOKENS_PRIVATE_KEY) {
      throw new Error(
        "Env variable AAVE_MOCK_UNDERLYING_TOKENS_PRIVATE_KEY does not exist",
      );
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.AAVE_MOCK_UNDERLYINGS,
      process.env.AAVE_MOCK_UNDERLYING_TOKENS_PRIVATE_KEY,
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

    if (!process.env.AAVE_DATA_PRIVATE_KEY) {
      throw new Error("Env variable AAVE_DATA_PRIVATE_KEY does not exist");
    }
    addProfilePkey(
      aptosProvider,
      AAVE_PROFILES.AAVE_DATA,
      process.env.AAVE_DATA_PRIVATE_KEY,
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

  /**
   * Creates an instance of `AptosProvider` from a YAML string.
   *
   * This method parses the provided YAML string to extract profile configurations,
   * sets the network for the `AptosProvider` based on the profile's network configuration,
   * and adds profile accounts and addresses to the provider.
   *
   * @param aptosYaml - The YAML string containing the Aptos profile configurations.
   * @returns An instance of `AptosProvider` configured based on the provided YAML.
   * @throws Will throw an error if an unknown network is specified in the profile configuration.
   */
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

      const aptosPrivateKey = new Ed25519PrivateKey(
        PrivateKey.formatPrivateKey(
          profileConfig.private_key,
          PrivateKeyVariants.Ed25519,
        ),
      );
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

  /**
   * Retrieves the Aptos instance.
   *
   * @returns {Aptos} The Aptos instance.
   */
  public getAptos(): Aptos {
    return this.aptos;
  }

  /**
   * Retrieves the private key associated with a given profile name.
   *
   * @param profileName - The name of the profile whose private key is to be retrieved.
   * @returns The Ed25519 private key associated with the specified profile name.
   * @throws Will throw an error if the profile name is not found in the profiles map.
   */
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

  /**
   * Retrieves the profile account associated with the given profile name.
   *
   * @param profileName - The name of the profile whose account is to be retrieved.
   * @returns An instance of `Ed25519Account` if the profile account exists, otherwise `undefined`.
   */
  public getProfileAccountByName(profileName: string): Ed25519Account {
    const profileAccount = this.getProfileAccountPrivateKeyByName(profileName);
    if (profileAccount) {
      return Account.fromPrivateKey({
        privateKey: this.getProfileAccountPrivateKeyByName(profileName),
      });
    }
    return undefined;
  }

  /**
   * Retrieves the account address associated with the given profile name.
   *
   * @param profileName - The name of the profile whose account address is to be retrieved.
   * @returns The account address associated with the given profile name.
   * @throws Will throw an error if the profile name does not exist in the profile address map.
   */
  public getProfileAddressByName(profileName: string): AccountAddress {
    if (!this.profileAddressMap.has(profileName)) {
      throw new Error(
        `Address of account "${profileName}" was not found in the profile addresses map`,
      );
    }
    return this.profileAddressMap.get(profileName);
  }

  /**
   * Retrieves the Oracle profile account.
   *
   * This method returns an `Ed25519Account` instance associated with the
   * AAVE Oracle profile. It internally calls `getProfileAccountByName`
   * with the `AAVE_ORACLE` profile name to fetch the account details.
   *
   * @returns {Ed25519Account} The Oracle profile account.
   */
  public getOracleProfileAccount(): Ed25519Account {
    return this.getProfileAccountByName(AAVE_PROFILES.AAVE_ORACLE);
  }

  /**
   * Retrieves the Ed25519 account associated with the AAVE pool profile.
   *
   * @returns {Ed25519Account} The Ed25519 account for the AAVE pool profile.
   */
  public getPoolProfileAccount(): Ed25519Account {
    return this.getProfileAccountByName(AAVE_PROFILES.AAVE_POOL);
  }

  /**
   * Retrieves the profile account associated with AAVE A_TOKENS.
   *
   * @returns {Ed25519Account} The Ed25519 account corresponding to the A_TOKENS profile.
   */
  public getATokensProfileAccount(): Ed25519Account {
    return this.getProfileAccountByName(AAVE_PROFILES.A_TOKENS);
  }

  /**
   * Retrieves the profile account associated with underlying tokens.
   *
   * @returns {Ed25519Account} The profile account for underlying tokens.
   */
  public getUnderlyingTokensProfileAccount(): Ed25519Account {
    return this.getProfileAccountByName(AAVE_PROFILES.AAVE_MOCK_UNDERLYINGS);
  }

  /**
   * Retrieves the profile account associated with variable tokens.
   *
   * @returns {Ed25519Account} The Ed25519 account corresponding to the variable tokens profile.
   */
  public getVariableTokensProfileAccount(): Ed25519Account {
    return this.getProfileAccountByName(AAVE_PROFILES.VARIABLE_TOKENS);
  }

  /**
   * Retrieves the ACL (Access Control List) profile account.
   *
   * @returns {Ed25519Account} The ACL profile account.
   */
  public getAclProfileAccount(): Ed25519Account {
    return this.getProfileAccountByName(AAVE_PROFILES.AAVE_ACL);
  }

  /**
   * Retrieves the data profile account associated with the AAVE_DATA profile.
   *
   * @returns {Ed25519Account} The Ed25519 account corresponding to the AAVE_DATA profile.
   */
  public getDataProfileAccount(): Ed25519Account {
    return this.getProfileAccountByName(AAVE_PROFILES.AAVE_DATA);
  }

  /**
   * Retrieves the current network configuration.
   *
   * @returns {Network} The network configuration.
   */
  public getNetwork(): Network {
    return this.network;
  }
}

/**
 * Adds a profile private key to the Aptos provider and associates it with a profile account.
 *
 * @param aptosProvider - The instance of the AptosProvider to which the profile and private key will be added.
 * @param profile - The name of the profile to be associated with the private key.
 * @param privateKey - The private key to be added and associated with the profile.
 */
const addProfilePkey = (
  aptosProvider: AptosProvider,
  profile: string,
  privateKey: string,
) => {
  const aptosPrivateKey = new Ed25519PrivateKey(
    PrivateKey.formatPrivateKey(privateKey, PrivateKeyVariants.Ed25519),
  );
  aptosProvider.addProfileAccount(profile, aptosPrivateKey);
  const profileAccount = Account.fromPrivateKey({
    privateKey: aptosPrivateKey,
  });
  aptosProvider.addProfileAddress(profile, profileAccount.accountAddress);
};
