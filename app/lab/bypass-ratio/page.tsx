"use client"
import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import LabSlider from '../../../components/LabSlider'
import LabChart, { LineSeries, Marker } from '../../../components/LabChart'
import {
  specificFuelConsumption,
  propulsiveEfficiency,
  relativeNoiseLevel,
  sfcVsBPR,
} from '../../../lib/calculations/physics'

export default function BypassRatioLab() {
  const [bpr, setBpr] = useState(0)
  const [mach, setMach] = useState(2.0)

  const currentSFC = useMemo(() => specificFuelConsumption(bpr, mach), [bpr, mach])
  const currentEff = useMemo(() => propulsiveEfficiency(bpr, mach), [bpr, mach])
  const currentNoise = useMemo(() => relativeNoiseLevel(bpr), [bpr])

  // Multi-mach comparison curves
  const series: LineSeries[] = useMemo(() => {
    const raw = sfcVsBPR([0.8, 1.2, 1.6, 2.0], 0, 15, 30)
    const colors = ['#0e9954', '#38bdf8', '#f59e0b', '#ef4444']
    return raw.map((item, idx) => ({
      id: `m-${item.mach}`,
      name: `Mach ${item.mach}`,
      data: item.data.map((d) => ({ x: d.bpr, y: d.sfc })),
      color: colors[idx],
    }))
  }, [])

  const markers: Marker[] = useMemo(() => {
    return [
      {
        x: 0,
        y: specificFuelConsumption(0, 2.0),
        label: 'Olympus 593 (BPR=0)',
        color: '#ef4444',
      },
      {
        x: 5.9,
        y: specificFuelConsumption(5.9, 0.8),
        label: 'CFM56 (BPR=5.9)',
        color: '#38bdf8',
      },
      {
        x: 9.3,
        y: specificFuelConsumption(9.3, 0.8),
        label: 'Trent XWB (BPR=9.3)',
        color: '#0e9954',
      },
      {
        x: 11.0,
        y: specificFuelConsumption(11.0, 0.8),
        label: 'GE9X (BPR=11)',
        color: '#f59e0b',
      },
    ]
  }, [])

  const isSupersonicTurbofan = mach > 1.4 && bpr > 2

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      <div>
        <Link
          href="/lab"
          className="text-xs font-mono text-emerald-400 hover:underline mb-2 inline-block"
        >
          ← Back to Laboratory Hub
        </Link>
        <div className="text-xs uppercase font-mono text-slate-400">Lab 04</div>
        <h1 className="text-3xl font-extrabold text-white font-serif">
          Bypass Ratio ↔ Engine Efficiency & The Supersonic Paradox
        </h1>
        <p className="mt-1 text-sm text-slate-300">
          Why modern high-bypass turbofans dominate subsonic airliners, but Concorde had to use a loud, pure turbojet.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#091a11] p-6 space-y-6 shadow-xl">
            <LabSlider
              label="Turbofan Bypass Ratio (BPR = m_bypass / m_core)"
              min={0}
              max={15}
              step={0.5}
              value={bpr}
              unit=""
              onChange={setBpr}
            />

            <LabSlider
              label="Operating Flight Mach Number"
              min={0.3}
              max={2.2}
              step={0.05}
              value={mach}
              unit="M"
              onChange={setMach}
            />
          </div>

          {/* Noise & Aerodynamic Efficiency Bars */}
          <div className="rounded-2xl border border-white/10 bg-[#08170f] p-5 shadow-lg space-y-4">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Exhaust Velocity / Relative Noise:</span>
              <span className={currentNoise > 80 ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                {currentNoise.toFixed(0)} dBA relative
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#05110a] rounded-full overflow-hidden border border-white/5">
              <div
                className={`h-full transition-all duration-150 ${
                  currentNoise > 80 ? 'bg-red-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${currentNoise}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs font-mono pt-2">
              <span className="text-slate-400">Propulsive Efficiency (η_p):</span>
              <span className="text-white font-bold">{(currentEff * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full h-2.5 bg-[#05110a] rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-emerald-400 transition-all duration-150"
                style={{ width: `${Math.min(100, currentEff * 100)}%` }}
              />
            </div>
          </div>

          <LabChart
            series={series}
            xLabel="Bypass Ratio (BPR)"
            yLabel="Relative Specific Fuel Consumption"
            markers={markers}
            formatX={(v) => `${v.toFixed(0)}:1`}
            formatY={(v) => v.toFixed(2)}
            height={300}
          />
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#0a2014] p-6 shadow-xl space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Fuel Consumption Metric
            </div>
            <div className="text-3xl font-extrabold font-mono text-white">
              SFC: {currentSFC.toFixed(3)}
            </div>

            <div className="pt-2 border-t border-white/10 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Selected Engine Type:</span>
                <span className="text-emerald-400 font-bold">
                  {bpr === 0 ? 'Pure Turbojet' : bpr < 4 ? 'Low-Bypass Turbofan' : 'High-Bypass Turbofan'}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Intake Ram Recovery:</span>
                <span className="text-white">{mach > 1.2 ? 'Variable Ramps Required' : 'Pitot Intake'}</span>
              </div>
            </div>
          </div>

          {isSupersonicTurbofan ? (
            <div className="rounded-2xl border border-red-500/50 bg-red-950/20 p-5 shadow-xl text-red-200 space-y-2">
              <div className="text-xs font-bold font-mono uppercase tracking-wider text-red-400">
                ⚠ Physical Impossibility at Mach {mach}
              </div>
              <p className="text-xs leading-relaxed">
                A high-bypass turbofan is optimized for a different speed and mission regime. At sustained supersonic cruise, inlet compression, frontal area, nacelle drag, and engine-cycle requirements make a low/zero-bypass turbojet architecture a more suitable design choice for Concorde.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-emerald-500/30 bg-[#07190f] p-5 shadow-xl space-y-3">
              <div className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">
                Why Olympus 593 Kept BPR = 0
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rolls-Royce chose a pure turbojet (BPR=0). While fuel consumption was 3× higher subsonically, its tiny frontal diameter kept wave drag minimal, and compressor blades could withstand sustained Mach 2 aerodynamic heating.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
