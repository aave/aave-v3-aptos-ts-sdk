import { FixedPointNumber, FixedPointNumberValue } from "./FixedPointNumber";

export const RAY_DECIMALS = 27;

export class Ray extends FixedPointNumber {
  constructor(value: FixedPointNumberValue) {
    super(value, RAY_DECIMALS);
  }
}
