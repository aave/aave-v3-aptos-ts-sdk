import { FixedPointNumber } from "./FixedPointNumber";
import { Ray } from "./Ray";

export const RAY = new Ray("1000000000000000000000000000");
export const HALF_RAY = new Ray("500000000000000000000000000");
export const WAD_RAY_RATIO = new FixedPointNumber(10, 9);
export const HALF_WAD_RAY_RATIO = new FixedPointNumber(5, 9);

export function rayMul(
  a: FixedPointNumber,
  b: FixedPointNumber,
): FixedPointNumber {
  const mulScale = a.scale + b.scale;
  const scale = mulScale > 27n ? mulScale : 27n;
  return new FixedPointNumber(
    (HALF_RAY.value + a.value * b.value) / RAY.value,
    scale - 27n,
  );
}

export function rayDiv(
  a: FixedPointNumber,
  b: FixedPointNumber,
): FixedPointNumber {
  const halfB = b.value / 2n;
  const mulScale = a.scale + RAY.scale;
  const scale = mulScale > b.scale ? mulScale : b.scale;
  return new FixedPointNumber(
    (halfB + a.value * RAY.value) / b.value,
    scale - b.scale,
  );
}

export function rayToWad(a: FixedPointNumber): FixedPointNumber {
  const scale = a.scale > 9n ? a.scale : 9n;
  return new FixedPointNumber(
    (HALF_WAD_RAY_RATIO.value + a.value) / WAD_RAY_RATIO.value,
    scale - 9n,
  );
}

export function wadToRay(a: FixedPointNumber): FixedPointNumber {
  return new FixedPointNumber(a.value * WAD_RAY_RATIO.value, a.scale + 9n);
}

export function rayPow(a: FixedPointNumber, p: bigint): FixedPointNumber {
  let x = a;
  let n = p;
  let z = n % 2n === 0n ? RAY : x;

  for (n = n / 2n; n !== 0n; n = n / 2n) {
    x = rayMul(x, x);

    if (n % 2n !== 0n) {
      z = rayMul(z, x);
    }
  }

  return z;
}

/**
 * RayPow is slow and gas intensive therefore in v2 we switched to binomial approximation on the contract level.
 * While the results ar not exact to the last decimal, they are close enough.
 */
export function binomialApproximatedRayPow(
  a: FixedPointNumber,
  p: number,
): FixedPointNumber {
  const base = a;
  const exp = BigInt(p);
  if (exp === 0n) return RAY;
  const expMinusOne = exp - 1n;
  const expMinusTwo = exp > 2n ? exp - 2n : 0n;

  const basePowerTwo = rayMul(base, base);
  const basePowerThree = rayMul(basePowerTwo, base);

  const firstTerm = base.mul(exp);
  const secondTerm = basePowerTwo.mul(expMinusOne).mul(exp).scaleDiv(2);

  const thirdTerm = basePowerThree
    .mul(expMinusTwo)
    .mul(expMinusOne)
    .mul(exp)
    .scaleDiv(6);

  return RAY.add(firstTerm).add(secondTerm).add(thirdTerm);
}
