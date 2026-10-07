'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'

interface Preset {
  name: string
  mach: number
  role: string
  alt: string
  slug?: string
}

const PRESETS: Preset[] = [
  { name: 'Cessna 172', mach: 0.16, role: 'General Aviation', alt: '10,000 ft', slug: 'cessna-172' },
  { name: 'Boeing 747', mach: 0.86, role: 'Transonic Airliner', alt: '35,000 ft', slug: 'boeing-747' },
  { name: 'NASA X-59', mach: 1.42, role: 'Quiet Supersonic', alt: '55,000 ft', slug: 'x59-nose' },
  { name: 'Concorde', mach: 2.04, role: 'Commercial Supercruise', alt: '60,000 ft', slug: 'concorde' },
  { name: 'SR-71', mach: 3.30, role: 'High-Altitude Recon', alt: '85,000 ft', slug: 'sr71-blackbird' },
]

export default function HomeFlightSimulator() {
  const [mach, setMach] = useState<number>(2.04)

  // Calculations from standard atmospheric gas dynamics (gamma = 1.4, T_inf ISA = 216.65 K / -56.5 C)
  const stats = useMemo(() => {
    const isSupersonic = mach >= 1.0
    // Mach wave angle: mu = arcsin(1 / M) in degrees
    const machAngleDeg = isSupersonic ? (Math.asin(1 / mach) * 180) / Math.PI : 90

    // Stagnation temperature: T0 = T_inf * (1 + 0.2 * M^2)
    const T_inf = 216.65 // Kelvin at stratosphere (~36,000 - 65,000 ft)
    const T_0_K = T_inf * (1 + 0.2 * mach * mach)
    const T_0_C = T_0_K - 273.15

    // Dynamic pressure ratio factor q / q0 ~ M^2
    const dynamicPressureCoeff = (0.7 * mach * mach).toFixed(2)

    // Flow regime
    let regime = 'Subsonic Incompressible'
    let regimeColor = 'text-sky-400 border-sky-400/40 bg-sky-400/10'
    let description = 'Flow velocity is well below the local speed of sound. Pressure disturbances propagate forward into the incoming stream.'

    if (mach >= 0.75 && mach < 1.0) {
      regime = 'Transonic (Critical Mach)'
      regimeColor = 'text-amber-400 border-amber-400/40 bg-amber-400/10'
      description = 'Local supersonic pockets form over the wing curvature, generating shock-induced boundary layer separation and rapid wave drag divergence.'
    } else if (mach >= 1.0 && mach < 2.5) {
      regime = 'Supersonic Cruise'
      regimeColor = 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10'
      description = 'Aircraft moves faster than pressure waves can propagate. An oblique shock wave cone forms with Mach angle mu = arcsin(1/M).'
    } else if (mach >= 2.5) {
      regime = 'High Supersonic / Kinetic Limit'
      regimeColor = 'text-rose-400 border-rose-400/40 bg-rose-400/10'
      description = 'Aerodynamic ram heating dominates airframe material limits. Conventional aluminum loses strength, requiring titanium alloys and advanced thermal management.'
    }

    // SVG shock cone endpoints: apex at (240, 95)
    // Cone angle from center line is machAngleDeg
    const coneHalfAngleRad = (machAngleDeg * Math.PI) / 180
    const coneLen = 220
    const dy = coneLen * Math.sin(coneHalfAngleRad)
    const dx = coneLen * Math.cos(coneHalfAngleRad)

    return {
      isSupersonic,
      machAngleDeg: machAngleDeg.toFixed(1),
      T_0_C: Math.round(T_0_C),
      dynamicPressureCoeff,
      regime,
      regimeColor,
      description,
      conePoints: {
        x1: 240 - dx,
        y1: 95 - dy,
        x2: 240 - dx,
        y2: 95 + dy,
      },
    }
  }, [mach])

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#0e9954]/30 bg-gradient-to-br from-[#060222] via-[#090432] to-[#040118] p-6 sm:p-10 shadow-2xl">
      {/* Background technical grid accent */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
              Interactive Aerodynamics Console // Live Stagnation & Shock Model
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif tracking-tight">
              Mach Dynamics & Shockwave Geometry
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Adjust airspeed from subsonic general aviation to Mach 3.5 reconnaissance. Observe how the shock cone compresses, kinetic temperature surges, and wave drag dictates airframe geometry.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {PRESETS.map((p) => {
              const active = Math.abs(mach - p.mach) < 0.05
              return (
                <button
                  key={p.name}
                  onClick={() => setMach(p.mach)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    active
                      ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(14,153,84,0.4)]'
                      : 'bg-white/5 text-slate-300 border border-white/10 hover:border-emerald-500/40 hover:text-white'
                  }`}
                >
                  <span>{p.name}</span>
                  <span className="ml-1.5 opacity-60 text-[10px]">M{p.mach.toFixed(2)}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
          {/* Interactive SVG Canvas */}
          <div className="relative rounded-2xl border border-white/10 bg-[#030114] p-4 sm:p-6 overflow-hidden flex flex-col items-center justify-center">
            {/* Telemetry Corner Markers */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-500">
              HUD-FOV // MACH CONE SIMULATION
            </div>
            <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-400 font-bold">
              SPEED: MACH {mach.toFixed(2)}
            </div>

            {/* SVG Visualizer */}
            <svg
              viewBox="0 0 320 190"
              className="w-full max-w-[480px] h-auto my-2 select-none"
              aria-label="Aerodynamic Mach Cone SVG Visualizer"
            >
              <defs>
                <linearGradient id="shockGrad" x1="100%" y1="50%" x2="0%" y2="50%">
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0e9954" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="flowGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* Grid / centerline */}
              <line x1="20" y1="95" x2="300" y2="95" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

              {/* Atmospheric flow streamlines */}
              {[-60, -35, -15, 15, 35, 60].map((offset, i) => (
                <line
                  key={i}
                  x1="20"
                  y1={95 + offset}
                  x2={stats.isSupersonic ? Math.max(30, 240 - Math.abs(offset) / Math.tan((parseFloat(stats.machAngleDeg) * Math.PI) / 180)) : 220}
                  y2={95 + offset}
                  stroke="url(#flowGrad)"
                  strokeWidth="1.2"
                  strokeDasharray="8 6"
                />
              ))}

              {/* Supersonic Shock Wave Cone */}
              {stats.isSupersonic && (
                <>
                  {/* Fill area inside Mach cone */}
                  <polygon
                    points={`240,95 ${stats.conePoints.x1},${stats.conePoints.y1} 40,${stats.conePoints.y1} 40,${stats.conePoints.y2} ${stats.conePoints.x2},${stats.conePoints.y2}`}
                    fill="rgba(14, 153, 84, 0.06)"
                  />
                  {/* Upper oblique shock front */}
                  <line
                    x1="240"
                    y1="95"
                    x2={stats.conePoints.x1}
                    y2={stats.conePoints.y1}
                    stroke="#34d399"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    filter="drop-shadow(0 0 6px #34d399)"
                  />
                  {/* Lower oblique shock front */}
                  <line
                    x1="240"
                    y1="95"
                    x2={stats.conePoints.x2}
                    y2={stats.conePoints.y2}
                    stroke="#34d399"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    filter="drop-shadow(0 0 6px #34d399)"
                  />
                  {/* Angle arc annotation */}
                  <path
                    d={`M 200,95 A 40 40 0 0 0 ${240 - 40 * Math.cos((parseFloat(stats.machAngleDeg) * Math.PI) / 180)} ${95 - 40 * Math.sin((parseFloat(stats.machAngleDeg) * Math.PI) / 180)}`}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.2"
                    strokeDasharray="2 2"
                  />
                  <text
                    x="180"
                    y="85"
                    fill="#38bdf8"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    μ = {stats.machAngleDeg}°
                  </text>
                </>
              )}

              {/* Subsonic pressure wave circles when M < 1 */}
              {!stats.isSupersonic && (
                <>
                  <circle cx="210" cy="95" r="30" fill="none" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="180" cy="95" r="55" fill="none" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="150" cy="95" r="80" fill="none" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
                </>
              )}

              {/* Aircraft Delta Silhouette */}
              <g transform="translate(240, 95) scale(0.9)">
                {/* Needle nose */}
                <polygon
                  points="0,0 -40,-8 -110,-45 -95,-6 -100,0 -95,6 -110,45 -40,8"
                  fill="#f1f5f9"
                  stroke="#0e9954"
                  strokeWidth="1.5"
                />
                {/* Cockpit canopy */}
                <polygon points="-18,0 -32,-3 -48,0 -32,3" fill="#38bdf8" opacity="0.8" />
                {/* Engine exhaust glow */}
                {mach >= 1.0 && (
                  <ellipse cx="-100" cy="0" rx="14" ry="4" fill="#fbbf24" opacity="0.85" filter="drop-shadow(0 0 8px #f59e0b)" />
                )}
                {/* Stagnation nose tip glow */}
                <circle cx="0" cy="0" r="3" fill="#ffffff" filter="drop-shadow(0 0 6px #6ee7b7)" />
              </g>
            </svg>

            {/* Slider Control Bar */}
            <div className="w-full mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">MACH CONTROL</span>
                <span className="text-emerald-400 font-bold text-sm">
                  M = {mach.toFixed(2)} ({Math.round(mach * 1062)} km/h @ 60k ft)
                </span>
              </div>
              <input
                type="range"
                min="0.15"
                max="3.50"
                step="0.01"
                value={mach}
                onChange={(e) => setMach(parseFloat(e.target.value))}
                aria-label="Mach speed adjustment slider"
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#0e9954] hover:accent-[#12b865]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-1">
                <span>0.15 (Subsonic)</span>
                <span>1.00 (Sonic)</span>
                <span>2.00 (Concorde)</span>
                <span>3.00+ (Blackbird)</span>
              </div>
            </div>
          </div>

          {/* Real-Time Physics Telemetry Readouts */}
          <div className="space-y-4">
            {/* Regime Badge */}
            <div className={`p-4 rounded-2xl border ${stats.regimeColor} space-y-1.5`}>
              <div className="text-[10px] font-mono uppercase tracking-wider font-bold">
                Aerodynamic Regime
              </div>
              <div className="text-lg font-bold font-brand text-white">
                {stats.regime}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {stats.description}
              </p>
            </div>

            {/* 3 Physical Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              {/* Mach Angle */}
              <div className="p-3.5 rounded-xl border border-white/10 bg-black/40">
                <span className="text-slate-400 text-[10px] block">MACH CONE ANGLE (μ)</span>
                <span className="text-xl font-bold text-emerald-400 block mt-1 font-brand">
                  {stats.isSupersonic ? `${stats.machAngleDeg}°` : 'N/A (Subsonic)'}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  sin μ = 1/M
                </span>
              </div>

              {/* Kinetic Stagnation Temp */}
              <div className="p-3.5 rounded-xl border border-white/10 bg-black/40">
                <span className="text-slate-400 text-[10px] block">RAM STAGNATION TEMP</span>
                <span className={`text-xl font-bold block mt-1 font-brand ${stats.T_0_C > 120 ? 'text-amber-400' : 'text-white'}`}>
                  {stats.T_0_C > 0 ? `+${stats.T_0_C}°C` : `${stats.T_0_C}°C`}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  ISA T∞ = −56.5°C
                </span>
              </div>

              {/* Compressibility Factor */}
              <div className="p-3.5 rounded-xl border border-white/10 bg-black/40 col-span-2 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px] block">DYNAMIC PRESSURE FACTOR (q/q₀)</span>
                  <span className="text-sm font-bold text-white mt-0.5 block font-brand">
                    ≈ {stats.dynamicPressureCoeff}× Baseline
                  </span>
                </div>
                <Link
                  href="/lab/kinetic-heating"
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                >
                  <span>Lab 03</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Direct investigation pathway */}
            <div className="pt-2 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Want full differential equations?</span>
              <Link
                href="/concepts/supersonic-aerodynamics"
                className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors inline-flex items-center gap-1"
              >
                <span>Shock Relations & Thermodynamics</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
