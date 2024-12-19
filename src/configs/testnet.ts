import { Network } from "@aptos-labs/ts-sdk";
import { AptosProviderConfig } from "../clients/aptosProvider";
import { ZERO_ADDRESS } from "../helpers";

export const DEFAULT_TESTNET_CONFIG: AptosProviderConfig = {
  network: Network.TESTNET,
  addresses: {
    A_TOKENS:
      "adf324dfd95a1596469a91f4c4f19d1c0e6a6444215cc7d54d0844fbc3904f51",
    UNDERLYING_TOKENS:
      "c10094e058b6495b6c0dbcee945176c17e5c7e2f80418b9bb489568380e970ed",
    VARIABLE_TOKENS:
      "7e1e44a62f001398a918682716072062715a9b34d342863844c0426c882670a7",
    AAVE_ACL:
      "b04b25a98c07f03797873b5fd1d8d55c036d8d445c8e8f83384992699ad831cb",
    AAVE_CONFIG:
      "8e9684732282321821648dac2822e0594ef013bb4cfc8938d3a4cd1c091c7777",
    AAVE_ORACLE:
      "b233470cdd1948f950b1d878b9dfffc01b24c68c840fbf699371e1d088b5f566",
    AAVE_POOL:
      "db7ee0e6dcf55e0c6ed381ded34dae12b204214e7dd1b69eaa7639bcbd7417dc",
  },
  // oracle: {
  //   URL: "https://hermes-beta.pyth.network",
  //   CONTRACT_ACCOUNT:
  //     "0x7e783b349d3e89cf5931af376ebeadbfab855b3fa239b7ada8f5a92fbea6b387",
  //   DEPLOYER_ACCOUNT:
  //     "0xb31e712b26fd295357355f6845e77c888298636609e93bc9b05f0f604049f434",
  //   WORMHOLE:
  //     "0x5bc11445584a763c1fa7ed39081f1b920954da14e04b32440cba863d03e19625",
  // },
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
    },
    // oracle: {
    //   URL: "https://hermes-beta.pyth.network",
    //   CONTRACT_ACCOUNT: ZERO_ADDRESS.toString(),
    //   DEPLOYER_ACCOUNT: ZERO_ADDRESS.toString(),
    //   WORMHOLE: ZERO_ADDRESS.toString(),
    // },
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
    },
    // oracle: {
    //   URL: "https://hermes-beta.pyth.network",
    //   CONTRACT_ACCOUNT: ZERO_ADDRESS.toString(),
    //   DEPLOYER_ACCOUNT: ZERO_ADDRESS.toString(),
    //   WORMHOLE: ZERO_ADDRESS.toString(),
    // },
  } as AptosProviderConfig;
};
