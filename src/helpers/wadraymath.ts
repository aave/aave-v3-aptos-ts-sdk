import {
  HALF_PERCENTAGE,
  HALF_RAY,
  HALF_WAD,
  PERCENTAGE_FACTOR,
  RAY,
  WAD,
  WAD_RAY_RATIO,
} from "./constants";

export abstract class WayRadMath {
  static ray(): bigint {
    return BigInt(RAY);
  }

  static wad(): bigint {
    return BigInt(WAD);
  }

  static halfRay(): bigint {
    return BigInt(HALF_RAY);
  }

  static halfWad(): bigint {
    return BigInt(HALF_WAD);
  }

  static halfPercentage(): bigint {
    return BigInt(HALF_PERCENTAGE);
  }

  static percentageFactor(): bigint {
    return BigInt(PERCENTAGE_FACTOR);
  }

  static wadRayRatio(): bigint {
    return BigInt(WAD_RAY_RATIO);
  }

  static wadMul(a: bigint, b: bigint): bigint {
    const numerator = this.halfWad() + a * b;
    return numerator / this.wad();
  }

  static wadDiv(a: bigint, b: bigint): bigint {
    const numerator = b / 2n + a * this.wad();
    return numerator / b;
  }

  static rayMul(a: bigint, b: bigint): bigint {
    const numerator = this.halfRay() + a * b;
    return numerator / this.ray();
  }

  static rayDiv(a: bigint, b: bigint): bigint {
    const numerator = b / 2n + a * this.ray();
    return numerator / b;
  }

  static percentMul = (a: bigint, bps: bigint): bigint => {
    const numerator = this.halfPercentage() + a * bps;
    return numerator / this.percentageFactor();
  };

  static percentDiv = (a: bigint, bps: bigint): bigint => {
    const numerator = bps / 2n + a * this.percentageFactor();
    return numerator / bps;
  };

  static rayToWad(a: bigint): bigint {
    const numerator = this.wad() / 2n + a;
    return numerator / this.wadRayRatio();
  }

  static wadToRay(a: bigint): bigint {
    return a * this.wadRayRatio();
  }

  static negated(a: bigint): bigint {
    return -a;
  }
}
