import { Network } from "@aptos-labs/ts-sdk";
import { AptosProviderConfig } from "../clients/aptosProvider";
import { ZERO_ADDRESS } from "../helpers";

export const DEFAULT_TESTNET_CONFIG: AptosProviderConfig = {
  network: Network.TESTNET,
  addresses: {
    A_TOKENS:
      "c7c5f41dbf944149d00381a50ba244945f47fe9919d123a9473975139e29a7fe",
    UNDERLYING_TOKENS:
      "6d13c417b70d0456e3a9a46f314d6ad9c4c043c1156641986d6f9ecc99d67449",
    VARIABLE_TOKENS:
      "c0b678966dc45e07f83007fb162a4c06e522602a1ee3c6b702a0d4786f062679",
    AAVE_ACL:
      "c7e19f4750b2a1ebdf1de97c1e3ff6d46e42e643c34f9817c427925faddbcff3",
    AAVE_CONFIG:
      "4430bda0467d62f7360d6841c37e732a3b834bc8d440f597b8a4d81160626dc1",
    AAVE_MOCK_ORACLE:
      "306c0eab71bd2da0e68f7e0117f8d2ac19aa9c2a329cba37842e425e30d26a1b",
    AAVE_POOL:
      "c0aa1b7c52a7ee44c5381f14af42383a4c7c72931ff8d41ebf074339d24d2039",
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
