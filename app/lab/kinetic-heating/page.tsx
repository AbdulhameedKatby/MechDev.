"use client"
import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import LabSlider from '../../../components/LabSlider'
import LabChart, { LineSeries } from '../../../components/LabChart'
import {
  heatingVsMach,
  stagnationTempC,
  recoveryTempC,
  isaTemperatureK,
} from '../../../lib/calculations/physics'

export default function KineticHeatingLab() {
  const [mach, setMach] = useState(2.04)
  const [altitudeM, setAltitudeM] = useState(18300)

  const stagC = useMemo(() => stagnationTempC(altitudeM, mach), [altitudeM, mach])
  const recC = useMemo(() => recoveryTempC(altitudeM, mach), [altitudeM, mach])
  const ambC = useMemo(() => isaTemperatureK(altitudeM) - 273.15, [altitudeM])

  // Heat map color based on stagnation temp
  const getHeatColor = (temp: number) => {
    if (temp < 50) return '#38bdf8' // Blue
    if (temp < 100) return '#facc15' // Yellow
    if (temp < 140) return '#fb923c' // Orange
    return '#ef4444' // Red hot
  }

  // Generate curves
  const series: LineSeries[] = useMemo(() => {
    const raw = heatingVsMach(altitudeM, 0, 3.0, 40)
    return [
      {
        id: 'stag',
        name: 'Stagnation (Nose)',
        data: raw.map((d) => ({ x: d.mach, y: d.stagnationC })),
        color: '#ef4444',
      },
      {
        id: 'rec',
        name: 'Recovery (Skin/Wing)',
        data: raw.map((d) => ({ x: d.mach, y: d.recoveryC })),
        color: '#f59e0b',
      },
      {
        id: 'amb',
        name: 'Ambient ISA Air',
        data: raw.map((d) => ({ x: d.mach, y: d.ambientC })),
        color: '#38bdf8',
        dashed: true,
      },
    ]
  }, [altitudeM])

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      <div>
        <Link
          href="/lab"
          className="text-xs font-mono text-emerald-400 hover:underline mb-2 inline-block"
        >
          ← Back to Laboratory Hub
        </Link>
        <div className="text-xs uppercase font-mono text-slate-400">Lab 03</div>
        <h1 className="text-3xl font-extrabold text-white font-serif">
          Flight Speed ↔ Kinetic Heating & Thermal Limits
        </h1>
        <p className="mt-1 text-sm text-slate-300">
          Compressing air molecules at Mach 2 turns kinetic energy directly into thermal energy, heating the airframe to boiling temperatures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#091a11] p-6 space-y-6 shadow-xl">
            <LabSlider
              label="Flight Speed (Mach Number)"
              min={0}
              max={3.0}
              step={0.05}
              value={mach}
              unit="M"
              onChange={setMach}
            />

            <LabSlider
              label="Flight Altitude"
              min={0}
              max={20000}
              step={500}
              value={altitudeM}
              unit="m"
              onChange={setAltitudeM}
            />
          </div>

          {/* Aircraft Silhouette Heat Map */}
          <div className="rounded-2xl border border-white/10 bg-[#07160d] p-5 shadow-lg flex flex-col items-center">
            <div className="text-xs font-mono uppercase text-slate-400 mb-2">
              Concorde Airframe Kinetic Temperature Gradient
            </div>
            <svg viewBox="0 0 500 120" className="w-full max-w-md h-28">
              <defs>
                <linearGradient id="heatGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={getHeatColor(stagC)} />
                  <stop offset="35%" stopColor={getHeatColor(recC)} />
                  <stop offset="100%" stopColor={getHeatColor(recC * 0.85)} />
                </linearGradient>
              </defs>

              {/* Concorde side profile shape */}
              <path
                d="M 20 60 Q 60 56 120 54 L 380 54 Q 450 54 480 60 Q 450 66 380 66 L 120 66 Q 60 64 20 60 Z"
                fill="url(#heatGradient)"
                stroke="#ffffff"
                strokeWidth="1"
                opacity="0.9"
              />

              {/* Nose label */}
              <text x="30" y="35" className="fill-red-400 font-mono text-[10px] font-bold">
                Nose Stagnation: {stagC.toFixed(0)}°C
              </text>
              <line x1="20" y1="60" x2="30" y2="40" stroke="#ef4444" strokeWidth="1" />

              {/* Wing/Cabin label */}
              <text x="250" y="35" className="fill-amber-300 font-mono text-[10px] font-bold">
                Cabin Skin: {recC.toFixed(0)}°C
              </text>
              <line x1="250" y1="54" x2="250" y2="40" stroke="#f59e0b" strokeWidth="1" />
            </svg>
          </div>

          <LabChart
            series={series}
            xLabel="Flight Speed (Mach)"
            yLabel="Temperature"
            yUnit="°C"
            currentX={mach}
            formatX={(v) => `M ${v.toFixed(1)}`}
            formatY={(v) => `${v.toFixed(0)}°C`}
            height={300}
          />
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#0a2014] p-6 shadow-xl space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Peak Thermal Stagnation
            </div>
            <div className="text-4xl font-extrabold font-mono text-white">
              {stagC.toFixed(1)}°C
            </div>

            <div className="pt-2 border-t border-white/10 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Ambient Air Temp:</span>
                <span className="text-sky-300">{ambC.toFixed(1)}°C</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Turbulent Skin Recovery:</span>
                <span className="text-amber-300">{recC.toFixed(1)}°C</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Aluminum RR58 Limit:</span>
                <span className="text-emerald-400">130°C</span>
              </div>
            </div>
          </div>

          <div
            className={`rounded-2xl border p-5 shadow-xl space-y-2 ${
              stagC > 130
                ? 'border-red-500/50 bg-red-950/20 text-red-200'
                : 'border-emerald-500/30 bg-[#07190f] text-slate-300'
            }`}
          >
            <div className="text-xs font-bold font-mono uppercase tracking-wider">
              {stagC > 130 ? '⚠ Structural Limit Warning' : '✓ Safe for RR58 Aluminum Alloy'}
            </div>
            <p className="text-xs leading-relaxed">
              At Mach 2.04 and 60,000 ft, Concorde&apos;s nose reaches exactly 127°C. This dictated the absolute maximum speed Concorde could fly without using costly, heavy titanium alloys.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
