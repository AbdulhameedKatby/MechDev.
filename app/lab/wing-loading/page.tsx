"use client"
import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import LabSlider from '../../../components/LabSlider'
import LabChart, { Marker } from '../../../components/LabChart'
import { computeStallSpeedKnots, computeTurnRadiusMeters } from '../../../lib/calculations/physics'

export default function WingLoadingLab() {
  const [wingLoading, setWingLoading] = useState(430)
  const [clMax, setClMax] = useState(1.6)

  // Calculations
  const stallSpeedKts = useMemo(() => computeStallSpeedKnots(wingLoading, clMax).toFixed(1), [wingLoading, clMax])
  const stallSpeedKmh = useMemo(() => (Number(stallSpeedKts) * 1.852).toFixed(0), [stallSpeedKts])
  const turnRadius5G = useMemo(() => computeTurnRadiusMeters(300, 5.0).toFixed(0), [])
  const turnRadius9G = useMemo(() => computeTurnRadiusMeters(300, 9.0).toFixed(0), [])

  // Comparison markers
  const markers: Marker[] = useMemo(() => [
    { x: 64, y: computeStallSpeedKnots(64, 1.6), label: 'Cessna 172', sublabel: '64 kg/m²', color: '#94a3b8' },
    { x: 140, y: computeStallSpeedKnots(140, 1.5), label: 'Spitfire Mk IX', sublabel: '140 kg/m²', color: '#38bdf8' },
    { x: 430, y: computeStallSpeedKnots(430, 1.6), label: 'F-16 Falcon', sublabel: '430 kg/m²', color: '#a855f7' },
    { x: 520, y: computeStallSpeedKnots(520, 1.2), label: 'Concorde', sublabel: '520 kg/m²', color: '#0e9954' },
    { x: 700, y: computeStallSpeedKnots(700, 2.2), label: 'Boeing 747', sublabel: '700 kg/m²', color: '#f59e0b' },
  ], [])

  // Curve data: Stall speed vs Wing loading
  const curveData = useMemo(() => {
    const points = []
    for (let wl = 30; wl <= 800; wl += 20) {
      points.push({ x: wl, y: computeStallSpeedKnots(wl, clMax) })
    }
    return points
  }, [clMax])

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      {/* Header */}
      <div>
        <Link href="/lab" className="text-xs font-mono text-[#0e9954] hover:underline mb-2 inline-block">
          ← Back to Laboratory Hub
        </Link>
        <div className="text-xs uppercase font-mono text-slate-400">Lab 07</div>
        <h1 className="text-3xl font-extrabold text-white font-serif">
          Wing Loading ↔ Stall Speed & Turn Radius
        </h1>
        <p className="mt-1 text-sm text-slate-300">
          Discover how aircraft weight distributed per square meter of wing area dictates low-speed stall safety and high-G combat maneuverability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Controls & Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#07032a] p-6 space-y-6 shadow-xl">
            <LabSlider
              label="Wing Loading (W / S)"
              min={30}
              max={800}
              step={10}
              value={wingLoading}
              unit=" kg/m²"
              onChange={setWingLoading}
            />

            <LabSlider
              label="Maximum Lift Coefficient (C_Lmax)"
              min={1.0}
              max={2.8}
              step={0.05}
              value={clMax}
              unit=""
              onChange={setClMax}
            />

            {/* Presets */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Aircraft Presets:</span>
              <button onClick={() => { setWingLoading(64); setClMax(1.6) }} className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10">Cessna 172</button>
              <button onClick={() => { setWingLoading(430); setClMax(1.6) }} className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-purple-400 border border-purple-500/20">F-16 Falcon</button>
              <button onClick={() => { setWingLoading(520); setClMax(1.2) }} className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[#0e9954] border border-[#0e9954]/20">Concorde</button>
              <button onClick={() => { setWingLoading(700); setClMax(2.2) }} className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-amber-400 border border-amber-500/20">Boeing 747</button>
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-2xl border border-white/10 bg-[#07032a] p-6 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-white font-serif">
              Stall Speed (Knots) vs. Wing Loading (kg/m²)
            </h3>
            <LabChart
              series={[{ id: 'stall', name: 'Stall Speed (kts)', data: curveData, color: '#0e9954' }]}
              markers={markers}
              currentX={wingLoading}
              xLabel="Wing Loading (W/S in kg/m²)"
              yLabel="Stall Speed (kts)"
              formatX={(v) => `${Math.round(v)}`}
              formatY={(v) => `${Math.round(v)} kts`}
            />
          </div>
        </div>

        {/* Real-Time Telemetry */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#0e9954]/40 bg-[#07032a] p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#0e9954] font-bold">
              Aerodynamic Stall Telemetry
            </h3>

            <div className="space-y-3 font-mono">
              <div className="p-3 rounded-xl bg-[#040118] border border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-400">Sea-Level Stall Speed:</span>
                <span className="text-base font-bold text-[#0e9954]">
                  {stallSpeedKts} kts
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#040118] border border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-400">Stall Speed (Metric):</span>
                <span className="text-base font-bold text-white">
                  {stallSpeedKmh} km/h
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#040118] border border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-400">300kt Turn Radius (5G):</span>
                <span className="text-base font-bold text-sky-400">
                  {turnRadius5G} m
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#040118] border border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-400">300kt Turn Radius (9G):</span>
                <span className="text-base font-bold text-amber-400">
                  {turnRadius9G} m
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-white/10 bg-white/5 text-xs text-slate-300 font-mono leading-relaxed">
              • High wing loading ({wingLoading} kg/m²) provides smooth ride quality in turbulence, but requires high approach speeds.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#07032a] p-6 text-xs text-slate-300 leading-relaxed space-y-3 shadow-xl">
            <span className="text-[#0e9954] font-bold font-mono block uppercase">
              PHYSICS INSIGHT: THE WING LOADING TRADE-OFF
            </span>
            <p>
              Stall speed scales with the square root of wing loading: V_s = √(2W / (ρ S C_Lmax)).
            </p>
            <p>
              Light training aircraft like the Cessna 172 have low wing loading (64 kg/m²) for a slow, forgiving 56-knot stall. Large airliners like the Boeing 747 have high wing loading (700 kg/m²), using complex trailing-edge flaps to increase C_Lmax to 2.2 during landing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
