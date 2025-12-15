import { SECONDS_PER_YEAR } from "../helpers";
import { FixedPointNumber } from "./FixedPointNumber";
import { Ray } from "./Ray";
import { binomialApproximatedRayPow, RAY, rayPow } from "./ray-math";

/**
 * Calculates the compounded rate over a given duration.
 * @param rate The rate as FixedPointNumber
 * @param duration The duration in seconds
 * @returns The compounded rate as FixedPointNumber
 */
export function calculateCompoundedRate(
  rate: FixedPointNumber,
  duration: number,
): FixedPointNumber {
  const a = rate.scaleDiv(SECONDS_PER_YEAR).add(RAY);
  const b = rayPow(a, BigInt(Math.floor(duration))).sub(RAY);
  return b;
}

/**
 * Calculates the compounded interest since the last update timestamp.
 * @param rate The interest rate as a Ray
 * @param lastUpdateTimestamp The timestamp of the last update
 * @returns The compounded interest as a Ray
 */
export function calculateCompoundedInterest(
  rate: Ray,
  lastUpdateTimestamp: number,
) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const timeDelta = currentTimestamp - lastUpdateTimestamp;
  // TODO: check if this is correct, valueToZDBigNumber
  const ratePerSecond = rate.scaleDiv(SECONDS_PER_YEAR);
  return binomialApproximatedRayPow(ratePerSecond, timeDelta);
}
