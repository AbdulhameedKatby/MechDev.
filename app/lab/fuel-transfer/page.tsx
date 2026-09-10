"use client"
import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import LabSlider from '../../../components/LabSlider'
import {
  centerOfPressure,
  centerOfGravity,
  requiredAftFuelFraction,
  stabilityMargin,
} from '../../../lib/calculations/physics'

export default function FuelTransferLab() {
  const [mach, setMach] = useState(1.4)
  const [overrideAftFraction, setOverrideAftFraction] = useState<number | null>(null)

  // Automated or user overridden fuel fraction
  const optimalAftFraction = useMemo(() => requiredAftFuelFraction(mach), [mach])
  const activeAftFraction = overrideAftFraction !== null ? overrideAftFraction : optimalAftFraction

  const cp = useMemo(() => centerOfPressure(mach), [mach])
  const cg = useMemo(() => centerOfGravity(activeAftFraction), [activeAftFraction])
  const margin = useMemo(() => stabilityMargin(mach, activeAftFraction), [mach, activeAftFraction])

  // Stability status
  const isStable = margin >= 0.5 && margin <= 4.0
  const isDangerouslyUnstable = margin < 0 // CG behind CP causes violent pitch-up
  const isOverlyTrimDrag = margin > 4.0 // CG too far ahead requires elevon deflection

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      <div>
        <Link
          href="/lab"
          className="text-xs font-mono text-emerald-400 hover:underline mb-2 inline-block"
        >
          ← Back to Laboratory Hub
        </Link>
        <div className="text-xs uppercase font-mono text-slate-400">Lab 05</div>
        <h1 className="text-3xl font-extrabold text-white font-serif">
          Active Fuel Transfer ↔ Center of Pressure Migration
        </h1>
        <p className="mt-1 text-sm text-slate-300">
          How Concorde pumped 3,000 kg of fuel per minute across 13 tanks to balance an aft-shifting lift vector without dragging elevon surfaces.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#091a11] p-6 space-y-6 shadow-xl">
            <LabSlider
              label="Flight Speed (Mach Number)"
              min={0.3}
              max={2.2}
              step={0.05}
              value={mach}
              unit="M"
              onChange={(m) => {
                setMach(m)
                setOverrideAftFraction(null) // reset to auto transfer
              }}
            />

            <div className="pt-4 border-t border-white/5">
              <LabSlider
                label="Manual Fuel Trim Override (Forward ↔ Aft Distribution)"
                min={0}
                max={1}
                step={0.05}
                value={activeAftFraction}
                unit={overrideAftFraction === null ? '(AUTO)' : '(MANUAL)'}
                onChange={(f) => setOverrideAftFraction(f)}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-[11px] text-slate-500 font-mono">
                  {overrideAftFraction === null ? 'Computer Automated Trim Active' : 'Manual Override Active'}
                </span>
                {overrideAftFraction !== null && (
                  <button
                    onClick={() => setOverrideAftFraction(null)}
                    className="text-xs text-emerald-400 underline font-mono"
                  >
                    Reset to Concorde Auto-Trim
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Aircraft Fuel Tank Profile Schematic */}
          <div className="rounded-2xl border border-white/10 bg-[#07160d] p-6 shadow-xl flex flex-col items-center">
            <div className="text-xs font-mono uppercase text-slate-400 mb-2">
              Concorde 13-Tank Fuel Transfer Architecture
            </div>

            <svg viewBox="0 0 600 200" className="w-full h-auto select-none">
              {/* Aircraft Contour */}
              <path
                d="M 40 100 Q 120 85 240 85 L 480 85 Q 540 90 560 100 Q 540 110 480 115 L 240 115 Q 120 115 40 100 Z"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />

              {/* Delta wing outline */}
              <path
                d="M 220 85 L 460 30 L 460 170 L 220 115 Z"
                fill="rgba(45,191,111,0.05)"
                stroke="rgba(45,191,111,0.2)"
                strokeWidth="1"
              />

              {/* Tank Groups */}
              {/* Forward Tanks (Tanks 1-4, 9, 10) */}
              <rect
                x="140"
                y="90"
                width="90"
                height="20"
                rx="4"
                fill="#38bdf8"
                fillOpacity={1 - activeAftFraction * 0.8}
                stroke="#38bdf8"
                strokeWidth="1"
              />
              <text x="185" y="104" textAnchor="middle" className="fill-slate-900 font-mono text-[9px] font-bold">
                FWD TANKS
              </text>

              {/* Center Wing Tanks */}
              <rect
                x="250"
                y="90"
                width="110"
                height="20"
                rx="4"
                fill="#0e9954"
                fillOpacity="0.6"
                stroke="#0e9954"
                strokeWidth="1"
              />
              <text x="305" y="104" textAnchor="middle" className="fill-slate-900 font-mono text-[9px] font-bold">
                MAIN TANKS
              </text>

              {/* Aft Trim Tanks (Tanks 11 & Tail) */}
              <rect
                x="380"
                y="90"
                width="100"
                height="20"
                rx="4"
                fill="#f59e0b"
                fillOpacity={0.2 + activeAftFraction * 0.8}
                stroke="#f59e0b"
                strokeWidth="1"
              />
              <text x="430" y="104" textAnchor="middle" className="fill-slate-900 font-mono text-[9px] font-bold">
                AFT TRIM TANK
              </text>

              {/* Fuel Transfer Flow Arrows */}
              <g className="animate-pulse">
                {activeAftFraction > 0.4 ? (
                  <path
                    d="M 230 130 L 370 130"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    markerEnd="url(#arrow)"
                  />
                ) : (
                  <path
                    d="M 370 130 L 230 130"
                    stroke="#38bdf8"
                    strokeWidth="3"
                    markerEnd="url(#arrow)"
                  />
                )}
              </g>

              {/* Center of Pressure (CP) Marker */}
              {(() => {
                // scale CP (% MAC 50-65) to SVG X (200-480)
                const cpX = 200 + ((cp - 50) / 15) * 280
                return (
                  <g>
                    <polygon
                      points={`${cpX},55 ${cpX - 8},40 ${cpX + 8},40`}
                      fill="#ef4444"
                    />
                    <text x={cpX} y="34" textAnchor="middle" className="fill-red-400 font-mono text-[10px] font-bold">
                      CP ({cp.toFixed(1)}%)
                    </text>
                    <line x1={cpX} y1="55" x2={cpX} y2="150" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
                  </g>
                )
              })()}

              {/* Center of Gravity (CG) Marker */}
              {(() => {
                const cgX = 200 + ((cg - 50) / 15) * 280
                return (
                  <g>
                    <polygon
                      points={`${cgX},165 ${cgX - 8},180 ${cgX + 8},180`}
                      fill="#0e9954"
                    />
                    <text x={cgX} y="195" textAnchor="middle" className="fill-emerald-400 font-mono text-[10px] font-bold">
                      CG ({cg.toFixed(1)}%)
                    </text>
                    <line x1={cgX} y1="165" x2={cgX} y2="70" stroke="#0e9954" strokeWidth="1.5" strokeDasharray="3 3" />
                  </g>
                )
              })()}
            </svg>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#0a2014] p-6 shadow-xl space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Static Stability Margin
            </div>
            <div
              className={`text-3xl font-extrabold font-mono ${
                isDangerouslyUnstable
                  ? 'text-red-400'
                  : isOverlyTrimDrag
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {margin.toFixed(2)}% MAC
            </div>

            <div className="pt-2 border-t border-white/10 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Center of Pressure (CP):</span>
                <span className="text-red-400 font-bold">{cp.toFixed(1)}% MAC</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Center of Gravity (CG):</span>
                <span className="text-emerald-400 font-bold">{cg.toFixed(1)}% MAC</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Aft Fuel Tank Fraction:</span>
                <span className="text-white font-bold">{(activeAftFraction * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* Status Diagnostic Card */}
          <div
            className={`rounded-2xl border p-5 shadow-xl space-y-2 ${
              isDangerouslyUnstable
                ? 'border-red-500/50 bg-red-950/20 text-red-200'
                : isOverlyTrimDrag
                ? 'border-amber-500/50 bg-amber-950/20 text-amber-200'
                : 'border-emerald-500/30 bg-[#07190f] text-slate-300'
            }`}
          >
            <div className="text-xs font-bold font-mono uppercase tracking-wider">
              {isDangerouslyUnstable
                ? '⚠ CATASTROPHIC PITCH-UP INSTABILITY'
                : isOverlyTrimDrag
                ? '⚠ HEAVY ELEVON DEFLECTION (TRIM DRAG)'
                : '✓ OPTIMAL ZERO-DRAG TRIM ALIGNMENT'}
            </div>
            <p className="text-xs leading-relaxed">
              {isDangerouslyUnstable
                ? 'CG has drifted behind CP. In a delta wing without a horizontal tail, this causes an uncontrollable diverging pitch-up maneuver.'
                : isOverlyTrimDrag
                ? 'CG is too far ahead of CP. The elevons must deflect upward to hold the nose up, creating 3% extra parasite drag.'
                : 'By transferring fuel to match the aft CP shift, Concorde trimmed the aircraft with zero aerodynamic surface deflection, saving ~3,000 kg of fuel across the Atlantic.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
