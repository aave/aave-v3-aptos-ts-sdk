import { Network } from "@aptos-labs/ts-sdk";
import { AptosProviderConfig } from "../clients/aptosProvider";
import { ZERO_ADDRESS } from "../helpers";

export const DEFAULT_TESTNET_CONFIG: AptosProviderConfig = {
  network: Network.TESTNET,
  addresses: {
    A_TOKENS:
      "12989a2840ca70260fa5007adcc75faab6f0e5fe44637dc85a2e1829af6a0d9c",
    UNDERLYING_TOKENS:
      "bd47b4f3ec887c0e633b99484e45fed484415ccae49b041d18e7e3d1e7c1fd72",
    VARIABLE_TOKENS:
      "e7092972fc6d3237e54a10c1942eb0188b14acc68eefa6ecef63901ac639d064",
    AAVE_ACL:
      "2f5621b191021188afce70b2edcec4423342f4a1c17ea5c393dff031c94529cb",
    AAVE_CONFIG:
      "9143cb9388cdbf6b75e05adbc8d9903c49805dbe3b740d2ea8c503186a50abaa",
    AAVE_MOCK_ORACLE:
      "4b98459447f8663ce6fb1d2a6497fcb9705446071f7d9b26deb2cead65154dc9",
    AAVE_POOL:
      "3488d79f0c0787d6cd0bb53d2b0a8ed62bf3313e55714067d0312a344d34a885",
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
