import { MoveValue } from "@aptos-labs/ts-sdk";

export const stringToUint8Array = (data: string): Uint8Array =>
  new Uint8Array(Buffer.from(data, "utf8"));

export const stringToHex = (data: string): string =>
  Buffer.from(data).toString("hex");

export const uint8ArrayToString = (data: Uint8Array): string =>
  Buffer.from(data).toString("utf8");

export function StringToHex(str: string): string {
  let hexResult = "0x";
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < str.length; i++) {
    const hexValue: string = str.charCodeAt(i).toString(16); // .toUpperCase(); // Get the hexadecimal representation of a character
    hexResult += hexValue.padStart(2, "0"); // Ensure that each character has two hexadecimal digits，If there are any deficiencies, add 0 in front.
  }
  return hexResult;
}

export function mapToBigInt(value: MoveValue): bigint {
  return BigInt(value.toString());
}
