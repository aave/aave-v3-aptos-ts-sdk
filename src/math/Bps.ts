import { FixedPointNumber, FixedPointNumberValue } from "./FixedPointNumber";

export const BPS_DECIMALS = 4;

export class Bps extends FixedPointNumber {
  constructor(value: FixedPointNumberValue) {
    super(value, BPS_DECIMALS);
  }
}
