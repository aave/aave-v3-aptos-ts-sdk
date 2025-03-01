import { MoveValue } from "@aptos-labs/ts-sdk";

/**
 * Converts a string to a Uint8Array.
 *
 * @param data - The string to be converted.
 * @returns A Uint8Array representing the input string.
 */
export const stringToUint8Array = (data: string): Uint8Array =>
  new Uint8Array(Buffer.from(data, "utf8"));

/**
 * Converts a given string to its hexadecimal representation.
 *
 * @param data - The string to be converted to hex.
 * @returns The hexadecimal representation of the input string.
 */
export const stringToHex = (data: string): string =>
  Buffer.from(data).toString("hex");

/**
 * Converts a Uint8Array to a UTF-8 string.
 *
 * @param data - The Uint8Array to convert.
 * @returns The resulting string.
 */
export const uint8ArrayToString = (data: Uint8Array): string =>
  Buffer.from(data).toString("utf8");

/**
 * Converts a string to its hexadecimal representation.
 *
 * @param str - The input string to be converted to hexadecimal.
 * @returns The hexadecimal representation of the input string, prefixed with "0x".
 *
 * @example
 * ```typescript
 * const hexString = StringToHex("hello");
 * console.log(hexString); // Output: "0x68656c6c6f"
 * ```
 */
export function StringToHex(str: string): string {
  let hexResult = "0x";
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < str.length; i++) {
    const hexValue: string = str.charCodeAt(i).toString(16); // .toUpperCase(); // Get the hexadecimal representation of a character
    hexResult += hexValue.padStart(2, "0"); // Ensure that each character has two hexadecimal digits，If there are any deficiencies, add 0 in front.
  }
  return hexResult;
}

/**
 * Converts a MoveValue to a bigint.
 *
 * @param value - The MoveValue to be converted.
 * @returns The converted bigint value.
 */
export function mapToBigInt(value: MoveValue): bigint {
  return BigInt(value.toString());
}

/**
 * Converts a hexadecimal string to a Uint8Array.
 *
 * @param hexString - The hexadecimal string to convert. It can optionally start with "0x".
 * @returns A Uint8Array representing the binary data of the hexadecimal string.
 */
export const hexToUint8Array = (hexString: string): Uint8Array => {
  if (hexString.startsWith("0x")) {
    hexString = hexString.slice(2);
  }
  return Uint8Array.from(Buffer.from(hexString, "hex"));
};
