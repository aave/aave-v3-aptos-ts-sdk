import { hexToUint8Array } from "./common";

export const priceFeeds: Map<string, Uint8Array> = new Map<
  string,
  Uint8Array
>();

// supported
priceFeeds.set(
  "APT",
  hexToUint8Array(
    "0x011e22d6bf000332000000000000000000000000000000000000000000000000",
  ),
);
priceFeeds.set(
  "USDC",
  hexToUint8Array(
    "0x01a80ff216000332000000000000000000000000000000000000000000000000",
  ),
);
priceFeeds.set(
  "USDT",
  hexToUint8Array(
    "0x016d06ebb6000332000000000000000000000000000000000000000000000000",
  ),
);
priceFeeds.set(
  "BTC",
  hexToUint8Array(
    "0x01a0b4d920000332000000000000000000000000000000000000000000000000",
  ),
);
priceFeeds.set(
  "WETH",
  hexToUint8Array(
    "0x01d585327c000332000000000000000000000000000000000000000000000000",
  ),
); // same as for ETH
priceFeeds.set(
  "LINK",
  hexToUint8Array(
    "0x0101199b3b000332000000000000000000000000000000000000000000000000",
  ),
);

// unsupported (mocked)
priceFeeds.set(
  "AAVE",
  hexToUint8Array(
    "0x011e22d6bf000332000000000000000000000000000000000000000000000000",
  ),
); // same as APT
priceFeeds.set(
  "DAI",
  hexToUint8Array(
    "0x011e22d6bf000332000000000000000000000000000000000000000000000000",
  ),
); // same as APT
