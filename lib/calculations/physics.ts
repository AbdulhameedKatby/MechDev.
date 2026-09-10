import { kmhToMps, knotsToMps } from './units'

// ── Existing Functions (unchanged) ──────────────────────────────────

export function computeLiftSI(rho: number, v_mps: number, s: number, cl: number) {
  return 0.5 * rho * v_mps * v_mps * s * cl
}

export function computeDragSI(rho: number, v_mps: number, s: number, cd: number) {
  return 0.5 * rho * v_mps * v_mps * s * cd
}

export function computeMach(v_mps: number, speedOfSound_mps: number) {
  if (speedOfSound_mps <= 0) return NaN
  return v_mps / speedOfSound_mps
}

export function toMps(value: number, unit: string) {
  switch (unit) {
    case 'm/s':
      return value
    case 'km/h':
      return kmhToMps(value)
    case 'kt':
      return knotsToMps(value)
    default:
      return value
  }
}

// ── Lab 1: Aspect Ratio ↔ Induced Drag ─────────────────────────────

/**
 * Induced drag coefficient from lifting-line theory.
 * C_Di = C_L² / (π × AR × e)
 * where e = Oswald efficiency factor (typically 0.7–0.85)
 */
export function computeInducedDragCoeff(cl: number, ar: number, e: number = 0.8): number {
  if (ar <= 0 || e <= 0) return NaN
  return (cl * cl) / (Math.PI * ar * e)
}

/**
 * Generate curve data: induced drag coeff vs aspect ratio for a fixed C_L.
 */
export function inducedDragVsAR(cl: number, arMin: number = 0.5, arMax: number = 12, steps: number = 50, e: number = 0.8) {
  const data: { ar: number; cdi: number }[] = []
  for (let i = 0; i <= steps; i++) {
    const ar = arMin + (arMax - arMin) * (i / steps)
    data.push({ ar, cdi: computeInducedDragCoeff(cl, ar, e) })
  }
  return data
}

// ── Lab 2: Wing Sweep ↔ Wave Drag ──────────────────────────────────

/**
 * Estimate critical Mach number based on sweep angle.
 * Simplified: M_cr ≈ M_cr0 / cos(Λ)
 * where M_cr0 ≈ 0.7 for a typical unswept airfoil with ~10% thickness
 */
export function computeCriticalMach(sweepDeg: number, mcr0: number = 0.7): number {
  const sweepRad = (sweepDeg * Math.PI) / 180
  const cosS = Math.cos(sweepRad)
  if (cosS <= 0.01) return 10 // near-perpendicular sweep, effectively infinite
  return mcr0 / cosS
}

/**
 * Simplified wave drag coefficient vs Mach number for a given sweep angle.
 * Uses a smoothed rise model: C_Dw ≈ 0 below M_cr, then rises as (M - M_cr)^2
 * This is a simplified teaching model, not a production CFD tool.
 */
export function computeWaveDrag(mach: number, sweepDeg: number, thickness: number = 0.10): number {
  const mcr = computeCriticalMach(sweepDeg, 0.7 - thickness)
  if (mach <= mcr) return 0
  const excess = mach - mcr
  // Quadratic rise, scaled by thickness
  return 20 * thickness * excess * excess
}

/**
 * Generate wave drag vs Mach curve for a given sweep angle.
 */
export function waveDragVsMach(sweepDeg: number, machMin: number = 0.3, machMax: number = 2.5, steps: number = 60, thickness: number = 0.03) {
  const data: { mach: number; cdw: number }[] = []
  for (let i = 0; i <= steps; i++) {
    const mach = machMin + (machMax - machMin) * (i / steps)
    data.push({ mach, cdw: computeWaveDrag(mach, sweepDeg, thickness) })
  }
  return data
}

// ── Lab 3: Kinetic Heating ──────────────────────────────────────────

/**
 * ISA temperature at altitude in Kelvin.
 * Troposphere: T = 288.15 - 6.5×(h/1000) for h < 11,000 m
 * Tropopause:  T = 216.65 for 11,000 ≤ h ≤ 20,000 m
 */
export function isaTemperatureK(altitudeM: number): number {
  if (altitudeM < 11000) {
    return 288.15 - 6.5 * (altitudeM / 1000)
  }
  return 216.65 // tropopause, constant
}

/**
 * Stagnation (total) temperature for air at a given Mach number.
 * T₀ = T_static × (1 + 0.2 × M²)
 * This is the maximum temperature the aircraft surface can reach.
 */
export function computeStagnationTempK(ambientTempK: number, mach: number): number {
  return ambientTempK * (1 + 0.2 * mach * mach)
}

/**
 * Convenience: stagnation temp in °C from altitude and Mach.
 */
export function stagnationTempC(altitudeM: number, mach: number): number {
  const tAmb = isaTemperatureK(altitudeM)
  const tStag = computeStagnationTempK(tAmb, mach)
  return tStag - 273.15
}

/**
 * Recovery temperature — actual skin temperature is a fraction of stagnation.
 * T_recovery = T_static + r × (T_stagnation - T_static)
 * r ≈ 0.9 for turbulent boundary layer (most of Concorde's surface)
 */
export function recoveryTempC(altitudeM: number, mach: number, recoveryFactor: number = 0.9): number {
  const tAmb = isaTemperatureK(altitudeM)
  const tStag = computeStagnationTempK(tAmb, mach)
  const tRecovery = tAmb + recoveryFactor * (tStag - tAmb)
  return tRecovery - 273.15
}

/**
 * Generate heating curve: temperature vs Mach at a given altitude.
 */
export function heatingVsMach(altitudeM: number, machMin: number = 0, machMax: number = 3, steps: number = 60) {
  const data: { mach: number; stagnationC: number; recoveryC: number; ambientC: number }[] = []
  const tAmb = isaTemperatureK(altitudeM)
  const ambC = tAmb - 273.15
  for (let i = 0; i <= steps; i++) {
    const mach = machMin + (machMax - machMin) * (i / steps)
    data.push({
      mach,
      stagnationC: computeStagnationTempK(tAmb, mach) - 273.15,
      recoveryC: recoveryTempC(altitudeM, mach),
      ambientC: ambC,
    })
  }
  return data
}

// ── Lab 4: Bypass Ratio ↔ Engine Efficiency ─────────────────────────

/**
 * Simplified propulsive efficiency vs bypass ratio.
 * Higher BPR → higher propulsive efficiency at subsonic, but drops at supersonic.
 * η_prop = 2 / (1 + V_jet/V_flight)
 * V_jet/V_flight decreases with BPR at subsonic but turbofan can't operate >~Mach 1.6.
 */
export function propulsiveEfficiency(bpr: number, mach: number): number {
  // Model: propulsive efficiency peaks for high BPR at subsonic
  // At supersonic, low BPR (turbojet) becomes necessary
  const subsonicEff = 2 / (1 + 1 / (1 + 0.3 * bpr))
  // Turbofan viability drops sharply above Mach 1
  if (mach > 1.0 && bpr > 0.5) {
    const penalty = Math.max(0, 1 - 0.6 * (mach - 1.0) * Math.sqrt(bpr))
    return subsonicEff * Math.max(penalty, 0.1)
  }
  return Math.min(subsonicEff, 0.95)
}

/**
 * Specific fuel consumption model (simplified).
 * SFC improves with BPR at subsonic but degrades at supersonic.
 * Units: arbitrary (relative scale 0–2, where 1.0 = baseline turbojet)
 */
export function specificFuelConsumption(bpr: number, mach: number): number {
  // Base SFC for turbojet (BPR=0) at Mach 0.8
  const baseSFC = 1.0
  // BPR reduces SFC at subsonic
  const bprBenefit = 1 - 0.04 * Math.min(bpr, 12) // diminishing returns
  // Mach effect: SFC increases at supersonic
  const machPenalty = mach > 1.0 ? 1 + 0.3 * (mach - 1.0) : 1
  // Turbofan at supersonic: severe penalty
  const supersonicBPRPenalty = (mach > 1.0 && bpr > 0.5)
    ? 1 + 0.5 * bpr * (mach - 1.0)
    : 1
  return baseSFC * bprBenefit * machPenalty * supersonicBPRPenalty
}

/**
 * Noise level model (simplified, relative dB scale).
 * Higher BPR = lower noise. Higher thrust = higher noise.
 */
export function relativeNoiseLevel(bpr: number): number {
  // Scale: 0 BPR → 100 (loud turbojet), 12 BPR → ~60 (quiet turbofan)
  return 100 - 3.5 * Math.min(bpr, 12)
}

/**
 * Generate SFC vs BPR curves at multiple Mach numbers.
 */
export function sfcVsBPR(machNumbers: number[], bprMin: number = 0, bprMax: number = 15, steps: number = 50) {
  return machNumbers.map(mach => ({
    mach,
    data: Array.from({ length: steps + 1 }, (_, i) => {
      const bpr = bprMin + (bprMax - bprMin) * (i / steps)
      return { bpr, sfc: specificFuelConsumption(bpr, mach) }
    })
  }))
}

// ── Lab 5: Fuel Transfer ↔ Center of Pressure ──────────────────────

/**
 * Aerodynamic center of pressure position (% MAC) vs Mach number.
 * Moves aft as speed increases through transonic to supersonic.
 * Empirical model based on Concorde published data.
 */
export function centerOfPressure(mach: number): number {
  // Subsonic: CP ≈ 53% MAC
  // Transonic (M 0.9–1.2): rapid aft movement
  // Supersonic: CP ≈ 59% MAC
  if (mach < 0.9) return 53
  if (mach > 1.4) return 59
  // Linear interpolation through transonic region
  const t = (mach - 0.9) / (1.4 - 0.9)
  return 53 + t * 6
}

/**
 * Center of gravity position from fuel distribution.
 * Concorde's 13 tanks are modeled as forward group and aft group.
 * fuelAftFraction: 0 = all fuel forward, 1 = all fuel aft
 */
export function centerOfGravity(fuelAftFraction: number, emptyWeightCG: number = 54): number {
  // With all fuel forward: CG ≈ 52% MAC
  // With all fuel aft: CG ≈ 60% MAC
  const fuelCGRange = 8 // % MAC
  const fuelForwardCG = 52
  const fuelCG = fuelForwardCG + fuelAftFraction * fuelCGRange
  // Blend with empty weight CG (about 60% of total weight is fuel at takeoff)
  const fuelWeightFraction = 0.6
  return emptyWeightCG * (1 - fuelWeightFraction) + fuelCG * fuelWeightFraction
}

/**
 * Required aft fuel fraction to trim at a given Mach number.
 * CG must approximately equal CP for trimmed flight.
 */
export function requiredAftFuelFraction(mach: number): number {
  const cp = centerOfPressure(mach)
  // Solve: emptyWeightCG * 0.4 + (52 + f * 8) * 0.6 = cp
  // 54*0.4 + 52*0.6 + f*8*0.6 = cp
  // 21.6 + 31.2 + 4.8f = cp
  // f = (cp - 52.8) / 4.8
  const f = (cp - 52.8) / 4.8
  return Math.max(0, Math.min(1, f))
}

/**
 * Stability margin: CP - CG (positive = stable, negative = unstable)
 */
export function stabilityMargin(mach: number, fuelAftFraction: number): number {
  const cp = centerOfPressure(mach)
  const cg = centerOfGravity(fuelAftFraction)
  return cp - cg // positive = CG is ahead of CP = stable
}

// ── Lab 6: Thrust-to-Weight ↔ Acceleration & Climb ─────────────────

/**
 * Vertical climb acceleration & sustained turn capability from T/W
 */
export function computeClimbRate(twRatio: number, speedMps: number = 250, ld: number = 12): number {
  // Climb gradient sin(gamma) = T/W - D/L = T/W - 1/(L/D)
  const sinGamma = Math.max(-0.5, twRatio - 1 / ld)
  // Vertical speed in m/s, convert to ft/min
  const vVerticalMps = speedMps * sinGamma
  return vVerticalMps * 196.85 // m/s to ft/min
}

export function computeSustainedG(twRatio: number, ld: number = 5): number {
  // In a level turn, T = D = W * n / (L/D) => n = (T/W) * (L/D)
  return Math.min(9.0, Math.max(1.0, twRatio * ld))
}

// ── Lab 7: Wing Loading ↔ Stall Speed & Turn Radius ────────────────

/**
 * Stall speed in knots from wing loading (kg/m²) and max lift coefficient
 */
export function computeStallSpeedKnots(wingLoadingKgM2: number, clMax: number = 1.5, rho: number = 1.225): number {
  if (wingLoadingKgM2 <= 0 || clMax <= 0) return 0
  const weightN = wingLoadingKgM2 * 9.81
  const vsMps = Math.sqrt((2 * weightN) / (rho * clMax))
  return vsMps * 1.94384 // m/s to knots
}

/**
 * Turn radius in meters for a given true airspeed and load factor n (G)
 */
export function computeTurnRadiusMeters(speedKnots: number, loadFactorG: number): number {
  if (loadFactorG <= 1.01) return 10000 // effectively straight
  const vMps = speedKnots * 0.514444
  const g = 9.80665
  return (vMps * vMps) / (g * Math.sqrt(loadFactorG * loadFactorG - 1))
}

// ── Lab 8: Thrust Vectoring ↔ VTOL Transition ──────────────────────

/**
 * Decompose thrust into vertical and horizontal components for a nozzle angle (0 to 98 deg)
 */
export function computeVectorDecomposition(thrustLbf: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  const verticalThrustLbf = thrustLbf * Math.sin(rad)
  const horizontalThrustLbf = thrustLbf * Math.cos(rad)
  return { verticalThrustLbf, horizontalThrustLbf }
}

// ── Lab 9: Fuselage Pressure & Hoop Stress ─────────────────────────

/**
 * Hoop stress (MPa) in a thin-walled pressurized cylinder: sigma = (DeltaP * r) / t
 */
export function computeHoopStress(diffPressureKPa: number, radiusM: number, thicknessMm: number): number {
  if (thicknessMm <= 0) return 0
  // P in Pa, r in m, t in m => stress in Pa => / 1e6 for MPa
  const pPa = diffPressureKPa * 1000
  const tM = thicknessMm / 1000
  return (pPa * radiusM) / tM / 1e6
}

// ── Lab 10: Standard Atmosphere & Altitude Envelope ────────────────

export function computeStandardAtmosphere(altitudeFt: number) {
  const hM = altitudeFt * 0.3048
  let tempK = 288.15 - 0.0065 * Math.min(hM, 11000)
  if (hM > 11000) {
    tempK = 216.65 // Isothermal stratosphere
  }
  const pressurePa = 101325 * Math.pow(tempK / 288.15, 5.2561)
  const densityKgM3 = pressurePa / (287.058 * tempK)
  const speedOfSoundMps = Math.sqrt(1.4 * 287.058 * tempK)
  return {
    tempC: tempK - 273.15,
    pressureKPa: pressurePa / 1000,
    densityKgM3,
    speedOfSoundMps,
    speedOfSoundKnots: speedOfSoundMps * 1.94384,
  }
}

