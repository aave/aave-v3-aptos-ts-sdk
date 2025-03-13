import {
  HALF_PERCENTAGE,
  HALF_RAY,
  HALF_WAD,
  PERCENTAGE_FACTOR,
  RAY,
  WAD,
  WAD_RAY_RATIO,
} from "./constants";

/**
 * The `WayRadMath` abstract class provides a set of static methods for performing
 * mathematical operations with fixed-point arithmetic using WAD (18 decimal places)
 * and RAY (27 decimal places) units. It includes methods for multiplication, division,
 * and conversion between these units, as well as constants for common values used in
 * these calculations.
 *
 * @remarks
 * - WAD is a unit with 18 decimal places, commonly used for representing fixed-point numbers.
 * - RAY is a unit with 27 decimal places, also used for fixed-point arithmetic.
 *
 * @example
 * ```typescript
 * const wadValue = WayRadMath.wad(); // Returns the WAD constant as a bigint
 * const rayValue = WayRadMath.ray(); // Returns the RAY constant as a bigint
 * const result = WayRadMath.wadMul(1000000000000000000n, 2000000000000000000n); // Multiplies two WAD values
 * ```
 */
export abstract class WayRadMath {
  /**
   * Returns the constant value of RAY as a bigint.
   *
   * @returns {bigint} The value of RAY.
   */
  static ray(): bigint {
    return BigInt(RAY);
  }

  /**
   * Returns the constant value of WAD as a bigint.
   *
   * @returns {bigint} The WAD constant value.
   */
  static wad(): bigint {
    return BigInt(WAD);
  }

  /**
   * Returns half of the RAY constant as a bigint.
   *
   * @returns {bigint} Half of the RAY constant.
   */
  static halfRay(): bigint {
    return BigInt(HALF_RAY);
  }

  /**
   * Returns half of the WAD constant as a bigint.
   *
   * @returns {bigint} Half of the WAD constant.
   */
  static halfWad(): bigint {
    return BigInt(HALF_WAD);
  }

  /**
   * Returns half of the percentage value as a bigint.
   *
   * @returns {bigint} The half percentage value.
   */
  static halfPercentage(): bigint {
    return BigInt(HALF_PERCENTAGE);
  }

  /**
   * Returns the percentage factor as a bigint.
   *
   * @returns {bigint} The percentage factor.
   */
  static percentageFactor(): bigint {
    return BigInt(PERCENTAGE_FACTOR);
  }

  /**
   * Returns the ratio between WAD and RAY units as a bigint.
   *
   * @returns {bigint} The WAD to RAY ratio.
   */
  static wadRayRatio(): bigint {
    return BigInt(WAD_RAY_RATIO);
  }

  /**
   * Multiplies two wad (18 decimal) values and returns the result.
   *
   * @param a - The first wad value as a bigint.
   * @param b - The second wad value as a bigint.
   * @returns The result of the multiplication as a bigint.
   */
  static wadMul(a: bigint, b: bigint): bigint {
    const numerator = this.halfWad() + a * b;
    return numerator / this.wad();
  }

  /**
   * Divides two wad (18 decimal) values.
   *
   * @param a - The dividend as a bigint.
   * @param b - The divisor as a bigint.
   * @returns The result of the division as a bigint.
   */
  static wadDiv(a: bigint, b: bigint): bigint {
    const numerator = b / 2n + a * this.wad();
    return numerator / b;
  }

  /**
   * Multiplies two ray values and returns the result.
   *
   * A ray is a unit with 27 decimal places, used to represent fixed-point numbers.
   * This function performs the multiplication and then divides by the ray unit to
   * maintain the fixed-point representation.
   *
   * @param a - The first ray value to multiply.
   * @param b - The second ray value to multiply.
   * @returns The result of the multiplication, as a ray value.
   */
  static rayMul(a: bigint, b: bigint): bigint {
    const numerator = this.halfRay() + a * b;
    return numerator / this.ray();
  }

  /**
   * Divides two fixed-point numbers with 27 decimals precision.
   *
   * This function performs division of two fixed-point numbers, where the dividend is `a` and the divisor is `b`.
   * The result is also a fixed-point number with 27 decimals precision.
   *
   * @param a - The dividend as a fixed-point number with 27 decimals precision.
   * @param b - The divisor as a fixed-point number with 27 decimals precision.
   * @returns The result of the division as a fixed-point number with 27 decimals precision.
   */
  static rayDiv(a: bigint, b: bigint): bigint {
    const numerator = b / 2n + a * this.ray();
    return numerator / b;
  }

  /**
   * Multiplies a given value by a basis points (bps) value and returns the result.
   *
   * The calculation is performed as follows:
   *   (a * bps + halfPercentage) / percentageFactor
   *
   * @param a - The value to be multiplied, represented as a bigint.
   * @param bps - The basis points value to multiply by, represented as a bigint.
   * @returns The result of the multiplication, represented as a bigint.
   */
  static percentMul = (a: bigint, bps: bigint): bigint => {
    const numerator = this.halfPercentage() + a * bps;
    return numerator / this.percentageFactor();
  };

  /**
   * Divides two big integers using ray precision.
   *
   * @param a - The dividend as a bigint.
   * @param b - The divisor as a bigint.
   * @returns The result of the division as a bigint.
   */
  static percentDiv = (a: bigint, bps: bigint): bigint => {
    const numerator = bps / 2n + a * this.percentageFactor();
    return numerator / bps;
  };

  /**
   * Converts a value from ray to wad.
   *
   * @param a - The value in ray to be converted.
   * @returns The converted value in wad.
   */
  static rayToWad(a: bigint): bigint {
    const numerator = this.wad() / 2n + a;
    return numerator / this.wadRayRatio();
  }

  /**
   * Converts a value from WAD (18 decimal places) to RAY (27 decimal places).
   *
   * @param a - The value in WAD to be converted to RAY.
   * @returns The value converted to RAY.
   */
  static wadToRay(a: bigint): bigint {
    return a * this.wadRayRatio();
  }

  /**
   * Negates the given bigint value.
   *
   * @param a - The bigint value to be negated.
   * @returns The negated bigint value.
   */
  static negated(a: bigint): bigint {
    return -a;
  }
}
