"use client"
import React, { useState } from 'react'
import type { TradeOff } from '../lib/types'

interface TradeOffTableProps {
  tradeOffs: TradeOff[]
}

export default function TradeOffTable({ tradeOffs }: TradeOffTableProps) {
  const [mode, setMode] = useState<'supersonic' | 'subsonic'>('supersonic')

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#0a1b12] p-6 shadow-xl">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h3 className="text-xl font-bold text-white font-serif">
            The Aerodynamic Compromise
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Toggle regimes to inspect how supersonic solutions penalize subsonic flight.
          </p>
        </div>

        <div className="flex w-full sm:w-auto rounded-xl bg-[#06110b] p-1 border border-white/10">
          <button
            onClick={() => setMode('supersonic')}
            className={`flex-1 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-75 ${
              mode === 'supersonic'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Supersonic Regime (Mach 2+)
          </button>
          <button
            onClick={() => setMode('subsonic')}
            className={`flex-1 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-75 ${
              mode === 'subsonic'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Subsonic Regime (Takeoff & Cruise)
          </button>
        </div>
      </div>

      {/* Interactive Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400 font-mono">
              <th className="py-3 px-4 w-1/4">Geometry / System</th>
              <th className="py-3 px-4">
                {mode === 'supersonic' ? (
                  <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                    <span>✓</span> Supersonic Benefit (Primary Design Goal)
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1.5 font-bold">
                    <span>⚠</span> Subsonic Cost & Penalty
                  </span>
                )}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {tradeOffs.map((row, idx) => (
              <tr
                key={idx}
                className={`transition-colors duration-150 hover:bg-white/[0.02] ${
                  mode === 'supersonic'
                    ? 'border-l-4 border-l-emerald-500/80 bg-emerald-950/10'
                    : 'border-l-4 border-l-amber-500/80 bg-amber-950/10'
                }`}
              >
                <td className="py-4 px-4 font-semibold text-white font-mono text-xs">
                  {row.aspect}
                </td>
                <td className="py-4 px-4 leading-relaxed">
                  {mode === 'supersonic' ? (
                    <span className="text-slate-200">{row.supersonicBenefit}</span>
                  ) : (
                    <span className="text-amber-200/90">{row.subsonicCost}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-400 font-mono">
        <span>Active Focus: {mode === 'supersonic' ? 'Wave Drag Mitigation' : 'Induced Drag & Lift Penalty'}</span>
        <span>Concorde Subsonic L/D ≈ 5.2 vs Boeing 747 L/D ≈ 15.5</span>
      </div>
    </div>
  )
}
