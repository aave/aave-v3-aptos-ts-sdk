import { Network } from "@aptos-labs/ts-sdk";
import { AptosProviderConfig } from "../clients/aptosProvider";
import { ZERO_ADDRESS } from "../helpers";

export const DEFAULT_TESTNET_CONFIG: AptosProviderConfig = {
  network: Network.TESTNET,
  addresses: {
    A_TOKENS:
      "68d265c5fd096673f64dd71ad77fffdbea9f96e1a6efd65704e8e4648a4c83ab",
    UNDERLYING_TOKENS:
      "e24b50a6f88cfcf8c684d1ee9eee8972b61eedfabe10139821e24e85c1d4a12f",
    VARIABLE_TOKENS:
      "ed77450ea30a643893c4047784bbb4b75e182a11d8cd728a36d02575a8dcff2c",
    AAVE_ACL:
      "5e9f527f47e0a187d611f45e5bba8e7243af54dbda31920ff5db41138e0706dc",
    AAVE_CONFIG:
      "8b0039f9bd18b819a6891f16db3ab50e2400024291ee3c9019de5abe32246958",
    AAVE_ORACLE:
      "a08790ab581acb4a54ffaa2c9630f29851a842c73710ddf97d675c260a77e2d3",
    AAVE_POOL:
      "4741de1a64e54e16eef6278e4af610136230f2ac90e40cdcd5f29790b45e4dc4",
    AAVE_RATE:
      "6341e72afa3f77ed32716e82a84c8a86c26a7d31e837043a53bc28ecabe3dc55",
    AAVE_DATA:
      "568ea1b4c9d473897be294ad40402c0102a3f3416bd8a5f25769bbfb571313bc",
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
      AAVE_ORACLE: ZERO_ADDRESS.toString(),
      AAVE_POOL: ZERO_ADDRESS.toString(),
      AAVE_RATE: ZERO_ADDRESS.toString(),
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
      AAVE_ORACLE: ZERO_ADDRESS.toString(),
      AAVE_POOL: ZERO_ADDRESS.toString(),
      AAVE_RATE: ZERO_ADDRESS.toString(),
    },
  } as AptosProviderConfig;
};
