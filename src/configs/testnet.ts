import { Network } from "@aptos-labs/ts-sdk";
import { AptosProviderConfig } from "../clients/aptosProvider";
import { ZERO_ADDRESS } from "../helpers";

export const DEFAULT_TESTNET_CONFIG: AptosProviderConfig = {
  network: Network.TESTNET,
  addresses: {
    A_TOKENS:
      "60d4e76f923da245198ab0982df9772b535dc9d30ae0a894deb6c504a2a6e041",
    UNDERLYING_TOKENS:
      "2339acfaadb5461d9aa2b78c8cb962548299d629534c06aa59d1f2e06c0bb38b",
    VARIABLE_TOKENS:
      "32e19bb9de60c51a66694073c51ed7503b55367c1bfccf0b6c7fed56c9b32159",
    AAVE_ACL:
      "2b99bac081161fd3bec36b9cbdc6749ef65494cd47826ba386cfcb63cc62d5d4",
    AAVE_CONFIG:
      "388a9a3af268fcdd057b4f4421d867c77a37493ea0c80acb5c78e773db821ec4",
    AAVE_MOCK_ORACLE:
      "ba20379c8378027707c370bd213e886a3c9bfdccb7258586e330974a09011c1e",
    AAVE_POOL:
      "f62585050b094c363d654a124614cf7975ab582d6849e683ccff6c46e2041ab8",
  },
  oracle: {
    URL: "https://hermes-beta.pyth.network",
    CONTRACT_ACCOUNT:
      "0x7e783b349d3e89cf5931af376ebeadbfab855b3fa239b7ada8f5a92fbea6b387",
    DEPLOYER_ACCOUNT:
      "0xb31e712b26fd295357355f6845e77c888298636609e93bc9b05f0f604049f434",
    WORMHOLE:
      "0x5bc11445584a763c1fa7ed39081f1b920954da14e04b32440cba863d03e19625",
  },
};

export const EMPTY_TESTNET_CONFIG = (): AptosProviderConfig => {
  return {
    network: Network.TESTNET,
    addresses: {
      A_TOKENS: ZERO_ADDRESS.toString(),
      UNDERLYING_TOKENS: ZERO_ADDRESS.toString(),
      VARIABLE_TOKENS: ZERO_ADDRESS.toString(),
      AAVE_ACL: ZERO_ADDRESS.toString(),
      AAVE_CONFIG: ZERO_ADDRESS.toString(),
      AAVE_MOCK_ORACLE: ZERO_ADDRESS.toString(),
      AAVE_POOL: ZERO_ADDRESS.toString(),
    },
    oracle: {
      URL: "https://hermes-beta.pyth.network",
      CONTRACT_ACCOUNT: ZERO_ADDRESS.toString(),
      DEPLOYER_ACCOUNT: ZERO_ADDRESS.toString(),
      WORMHOLE: ZERO_ADDRESS.toString(),
    },
  } as AptosProviderConfig;
};

export const EMPTY_LOCAL_CONFIG = (): AptosProviderConfig => {
  return {
    network: Network.LOCAL,
    addresses: {
      A_TOKENS: ZERO_ADDRESS.toString(),
      UNDERLYING_TOKENS: ZERO_ADDRESS.toString(),
      VARIABLE_TOKENS: ZERO_ADDRESS.toString(),
      AAVE_ACL: ZERO_ADDRESS.toString(),
      AAVE_CONFIG: ZERO_ADDRESS.toString(),
      AAVE_MOCK_ORACLE: ZERO_ADDRESS.toString(),
      AAVE_POOL: ZERO_ADDRESS.toString(),
    },
    oracle: {
      URL: "https://hermes-beta.pyth.network",
      CONTRACT_ACCOUNT: ZERO_ADDRESS.toString(),
      DEPLOYER_ACCOUNT: ZERO_ADDRESS.toString(),
      WORMHOLE: ZERO_ADDRESS.toString(),
    },
  } as AptosProviderConfig;
};
