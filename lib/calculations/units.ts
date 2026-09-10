export function knotsToMps(knots: number) {
  return knots * 0.514444;
}

export function kmhToMps(kmh: number) {
  return kmh / 3.6;
}

export function mphToMps(mph: number) {
  return mph * 0.44704;
}

export function mpsToKnots(mps: number) {
  return mps / 0.514444;
}

export function mToFt(m: number) {
  return m / 0.3048;
}

export function ftToM(ft: number) {
  return ft * 0.3048;
}
