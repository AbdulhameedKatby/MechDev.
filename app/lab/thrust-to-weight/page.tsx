"use client"
import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import LabSlider from '../../../components/LabSlider'
import LabChart, { Marker } from '../../../components/LabChart'
import { computeClimbRate, computeSustainedG } from '../../../lib/calculations/physics'

export default function ThrustToWeightLab() {
  const [twRatio, setTwRatio] = useState(1.04)
  const [ldRatio, setLdRatio] = useState(10)

  // Calculations
  const vertAccelG = useMemo(() => (twRatio - 1.0).toFixed(2), [twRatio])
  const climbRateFtMin = useMemo(() => computeClimbRate(twRatio, 250, ldRatio).toFixed(0), [twRatio, ldRatio])
  const sustainedG = useMemo(() => computeSustainedG(twRatio, Math.min(6, ldRatio)).toFixed(1), [twRatio, ldRatio])
  const timeTo30kSec = useMemo(() => {
    const rate = computeClimbRate(twRatio, 250, ldRatio)
    if (rate <= 0) return '∞'
    return (30000 / (rate / 60)).toFixed(0)
  }, [twRatio, ldRatio])

  // Comparison markers
  const markers: Marker[] = useMemo(() => [
    { x: 0.06, y: computeClimbRate(0.06, 65, 7.3), label: 'Cessna 172', sublabel: 'T/W=0.06', color: '#94a3b8' },
    { x: 0.25, y: computeClimbRate(0.25, 250, 17.5), label: 'Boeing 747', sublabel: 'T/W=0.25', color: '#f59e0b' },
    { x: 0.37, y: computeClimbRate(0.37, 300, 7.5), label: 'Concorde', sublabel: 'T/W=0.37', color: '#0e9954' },
    { x: 1.04, y: computeClimbRate(1.04, 250, 10), label: 'Harrier GR.9', sublabel: 'T/W=1.04', color: '#38bdf8' },
    { x: 1.09, y: computeClimbRate(1.09, 300, 4.5), label: 'F-16 Falcon', sublabel: 'T/W=1.09', color: '#a855f7' },
  ], [])

  // Curve data: Climb rate vs T/W
  const curveData = useMemo(() => {
    const points = []
    for (let tw = 0.05; tw <= 1.5; tw += 0.05) {
      points.push({ x: tw, y: computeClimbRate(tw, 250, ldRatio) })
    }
    return points
  }, [ldRatio])

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      {/* Header */}
      <div>
        <Link href="/lab" className="text-xs font-mono text-[#0e9954] hover:underline mb-2 inline-block">
          ← Back to Laboratory Hub
        </Link>
        <div className="text-xs uppercase font-mono text-slate-400">Lab 06</div>
        <h1 className="text-3xl font-extrabold text-white font-serif">
          Thrust-to-Weight ↔ Acceleration & Climb
        </h1>
        <p className="mt-1 text-sm text-slate-300">
          Analyze how the ratio of engine thrust to aircraft weight controls vertical acceleration, climb gradient, and sustained G-turning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Controls & Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#07032a] p-6 space-y-6 shadow-xl">
            <LabSlider
              label="Thrust-to-Weight Ratio (T/W)"
              min={0.05}
              max={1.5}
              step={0.01}
              value={twRatio}
              unit=""
              onChange={setTwRatio}
            />

            <LabSlider
              label="Lift-to-Drag Ratio (L/D)"
              min={3}
              max={18}
              step={0.5}
              value={ldRatio}
              unit=""
              onChange={setLdRatio}
            />

            {/* Presets */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Aircraft Presets:</span>
              <button onClick={() => { setTwRatio(0.06); setLdRatio(7.3) }} className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10">Cessna 172</button>
              <button onClick={() => { setTwRatio(0.25); setLdRatio(17.5) }} className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-amber-400 border border-amber-500/20">Boeing 747</button>
              <button onClick={() => { setTwRatio(0.37); setLdRatio(7.5) }} className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[#0e9954] border border-[#0e9954]/20">Concorde</button>
              <button onClick={() => { setTwRatio(1.04); setLdRatio(10) }} className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-sky-400 border border-sky-500/20">Harrier</button>
              <button onClick={() => { setTwRatio(1.09); setLdRatio(4.5) }} className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-purple-400 border border-purple-500/20">F-16 Falcon</button>
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-2xl border border-white/10 bg-[#07032a] p-6 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-white font-serif">
              Initial Sea-Level Climb Rate vs. Thrust-to-Weight Ratio
            </h3>
            <LabChart
              series={[{ id: 'climb', name: 'Climb Rate (ft/min)', data: curveData, color: '#0e9954' }]}
              markers={markers}
              currentX={twRatio}
              xLabel="Thrust-to-Weight Ratio (T/W)"
              yLabel="Climb Rate (ft/min)"
              formatX={(v) => v.toFixed(2)}
              formatY={(v) => `${Math.round(v)}`}
            />
          </div>
        </div>

        {/* Real-Time Telemetry & Insights */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#0e9954]/40 bg-[#07032a] p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#0e9954] font-bold">
              Flight Dynamics Telemetry
            </h3>

            <div className="space-y-3 font-mono">
              <div className="p-3 rounded-xl bg-[#040118] border border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-400">Vertical Acceleration:</span>
                <span className={`text-base font-bold ${Number(vertAccelG) >= 0 ? 'text-[#0e9954]' : 'text-red-400'}`}>
                  {vertAccelG} G
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#040118] border border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-400">Sea-Level Climb Rate:</span>
                <span className="text-base font-bold text-white">
                  {climbRateFtMin} ft/min
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#040118] border border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-400">Sustained Level Turn:</span>
                <span className="text-base font-bold text-sky-400">
                  {sustainedG} G
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#040118] border border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-400">Est. Time to 30,000 ft:</span>
                <span className="text-base font-bold text-amber-400">
                  {timeTo30kSec} sec
                </span>
              </div>
            </div>

            {/* Threshold Banner */}
            <div className={`p-3 rounded-xl border text-xs font-mono leading-relaxed ${
              twRatio >= 1.0
                ? 'border-[#0e9954]/40 bg-[#0e9954]/10 text-[#0e9954]'
                : 'border-white/10 bg-white/5 text-slate-300'
            }`}>
              {twRatio >= 1.0
                ? '✓ T/W ≥ 1.0: Aircraft can accelerate straight vertically and hover without wing lift.'
                : '• T/W < 1.0: Aircraft relies on forward speed and aerodynamic wing lift for climb and level flight.'}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#07032a] p-6 text-xs text-slate-300 leading-relaxed space-y-3 shadow-xl">
            <span className="text-[#0e9954] font-bold font-mono block uppercase">
              PHYSICS INSIGHT: THE 1.0 THRESHOLD
            </span>
            <p>
              When T/W reaches 1.0, total engine thrust equals total aircraft weight. At this threshold, wings are no longer required to support the aircraft mass — jet thrust directly opposes gravity.
            </p>
            <p>
              Fighters like the F-16 or F-22 use T/W &gt; 1.0 for rapid acceleration in vertical maneuvers, while VTOL aircraft like the Harrier GR.9 rotate nozzles 90° to hover.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
