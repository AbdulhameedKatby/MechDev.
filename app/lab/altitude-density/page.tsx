"use client"
import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import LabSlider from '../../../components/LabSlider'
import { computeStandardAtmosphere } from '../../../lib/calculations/physics'

export default function AltitudeDensityLab() {
  const [altitudeFt, setAltitudeFt] = useState(35000)
  const [mach, setMach] = useState(0.85)

  // Calculations
  const atmos = useMemo(() => computeStandardAtmosphere(altitudeFt), [altitudeFt])

  // True Airspeed & Dynamic Pressure
  const tasKnots = (mach * atmos.speedOfSoundKnots).toFixed(0)
  const tasMps = Number(tasKnots) * 0.514444
  const dynamicPressureKPa = (0.5 * atmos.densityKgM3 * tasMps * tasMps / 1000).toFixed(2)
  const densityPercent = ((atmos.densityKgM3 / 1.225) * 100).toFixed(1)

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      {/* Header */}
      <div>
        <Link href="/lab" className="text-xs font-mono text-[#0e9954] hover:underline mb-2 inline-block">
          ← Back to Laboratory Hub
        </Link>
        <div className="text-xs uppercase font-mono text-slate-400">Lab 10</div>
        <h1 className="text-3xl font-extrabold text-white font-serif">
          Atmospheric Altitude & Density Envelope
        </h1>
        <p className="mt-1 text-sm text-slate-300">
          Track ambient temperature, air density drop, speed of sound, and dynamic pressure across the Troposphere and Stratosphere.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Controls & Layer Gauge */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#07032a] p-6 space-y-6 shadow-xl">
            <LabSlider
              label="Flight Altitude"
              min={0}
              max={85000}
              step={1000}
              value={altitudeFt}
              unit=" ft"
              onChange={setAltitudeFt}
            />

            <LabSlider
              label="Flight Mach Number"
              min={0.1}
              max={3.5}
              step={0.05}
              value={mach}
              unit=""
              onChange={setMach}
            />

            {/* Presets */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Aircraft Ceilings:</span>
              <button onClick={() => { setAltitudeFt(14000); setMach(0.2) }} className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10">Cessna 172 (14k ft)</button>
              <button onClick={() => { setAltitudeFt(43000); setMach(0.85) }} className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-amber-400 border border-amber-500/20">Boeing 747 (43k ft)</button>
              <button onClick={() => { setAltitudeFt(60000); setMach(2.04) }} className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[#0e9954] border border-[#0e9954]/20">Concorde (60k ft)</button>
              <button onClick={() => { setAltitudeFt(85000); setMach(3.2) }} className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-sky-400 border border-sky-500/20">SR-71 (85k ft)</button>
            </div>
          </div>

          {/* Layer Gauge Visualization */}
          <div className="rounded-2xl border border-white/10 bg-[#07032a] p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white font-serif flex justify-between items-center">
              <span>Standard Atmosphere (ISA) Layer Structure</span>
              <span className="text-xs font-mono text-[#0e9954]">{altitudeFt.toLocaleString()} ft</span>
            </h3>

            <div className="relative w-full h-44 bg-[#040118] rounded-xl border border-white/10 p-4 flex flex-col justify-between overflow-hidden font-mono text-xs">
              {/* Stratosphere */}
              <div className="relative h-1/2 bg-sky-950/20 border-b border-sky-500/30 p-2 flex justify-between items-start text-sky-300">
                <span>STRATOSPHERE (Isothermal -56.5°C)</span>
                <span className="text-[10px] text-slate-500">85,000 ft</span>
              </div>

              {/* Tropopause */}
              <div className="h-1 bg-amber-400/40 w-full" />

              {/* Troposphere */}
              <div className="relative h-1/2 bg-emerald-950/20 p-2 flex justify-between items-end text-emerald-300">
                <span>TROPOSPHERE (Lapse rate -6.5°C/1000m)</span>
                <span className="text-[10px] text-slate-500">Sea Level (0 ft)</span>
              </div>

              {/* Current Altitude Marker Line */}
              {(() => {
                const pct = Math.min(95, Math.max(5, (altitudeFt / 85000) * 100))
                return (
                  <div
                    className="absolute left-0 right-0 border-b-2 border-[#0e9954] flex items-center justify-end pr-4 transition-all duration-150"
                    style={{ bottom: `${pct}%` }}
                  >
                    <span className="bg-[#0e9954] text-slate-950 px-2 py-0.5 rounded text-[10px] font-bold">
                      Current: {altitudeFt} ft
                    </span>
                  </div>
                )
              })()}
            </div>
          </div>
        </div>

        {/* Real-Time Telemetry */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#0e9954]/40 bg-[#07032a] p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#0e9954] font-bold">
              Atmospheric Telemetry
            </h3>

            <div className="space-y-3 font-mono">
              <div className="p-3 rounded-xl bg-[#040118] border border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-400">Ambient Temp (T):</span>
                <span className="text-base font-bold text-sky-400">
                  {atmos.tempC.toFixed(1)} °C
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#040118] border border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-400">Air Density (ρ):</span>
                <span className="text-base font-bold text-[#0e9954]">
                  {atmos.densityKgM3.toFixed(3)} kg/m³ ({densityPercent}%)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#040118] border border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-400">Speed of Sound (a):</span>
                <span className="text-base font-bold text-amber-400">
                  {Math.round(atmos.speedOfSoundKnots)} kts
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#040118] border border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-400">True Airspeed (TAS):</span>
                <span className="text-base font-bold text-white">
                  {tasKnots} kts
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#040118] border border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-400">Dynamic Pressure (q):</span>
                <span className="text-base font-bold text-purple-400">
                  {dynamicPressureKPa} kPa
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-white/10 bg-white/5 text-xs text-slate-300 font-mono leading-relaxed">
              • At {altitudeFt} ft, air density is {densityPercent}% of sea level. Jet engines require higher Mach to generate equivalent dynamic pressure.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#07032a] p-6 text-xs text-slate-300 leading-relaxed space-y-3 shadow-xl">
            <span className="text-[#0e9954] font-bold font-mono block uppercase">
              PHYSICS INSIGHT: WHY HIGH ALTITUDE?
            </span>
            <p>
              Air density drops exponentially with altitude. At 60,000 ft (Concorde cruise), air density is 93% lower than at sea level.
            </p>
            <p>
              Lower density drastically reduces skin friction and wave drag, enabling supersonic cruise efficiency impossible at lower altitudes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
