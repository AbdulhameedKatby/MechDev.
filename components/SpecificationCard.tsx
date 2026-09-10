"use client"
import React, { useState } from 'react'
import type { Specification } from '../lib/types'

interface SpecificationCardProps {
  spec: Specification
  onOpenEvidence?: (id: string) => void
}

export default function SpecificationCard({ spec, onOpenEvidence }: SpecificationCardProps) {
  const [expanded, setExpanded] = useState(false)
  const status = spec.status ?? (spec.type.toLowerCase().includes('calculated') ? 'CALCULATED' : 'VERIFIED')
  const statusStyle = status === 'VERIFIED'
    ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
    : status === 'CALCULATED'
      ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300'
      : 'border-amber-400/30 bg-amber-400/10 text-amber-300'

  return (
    <div className="rounded-2xl border border-white/10 bg-[#07032a] p-5 shadow-lg transition-colors duration-200 hover:border-emerald-500/30">
      {/* Summary Header */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            {spec.label}
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-[#EDF7EF] tracking-tight">
              {spec.value}
            </span>
            {spec.unit && (
              <span className="text-sm font-mono text-emerald-400 font-semibold">
                {spec.unit}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
          aria-expanded={expanded}
          aria-label={`Toggle ${spec.label} verification details`}
        >
          <span
            className={`inline-block transition-transform duration-75 ${
              expanded ? 'rotate-180 text-emerald-400' : ''
            }`}
          >
            ▼
          </span>
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${statusStyle}`}>
          {status}
        </span>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
          {spec.type}
        </span>
        <span className="text-xs text-slate-400 font-mono truncate">
          {spec.source}
        </span>
      </div>

      {/* Expanded Traceable Details */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-white/10 space-y-3 text-xs leading-relaxed">
          {spec.conditions && (
            <div>
              <span className="text-slate-500 uppercase font-mono text-[10px] block">Test Conditions</span>
              <p className="text-slate-300">{spec.conditions}</p>
            </div>
          )}

          {spec.physics && (
            <div className="bg-[#06120b] p-3 rounded-lg border border-emerald-500/20 font-mono">
              <span className="text-emerald-400 uppercase text-[10px] block mb-1">Governing Physics</span>
              <p className="text-emerald-200">{spec.physics}</p>
            </div>
          )}

          <div>
            <span className="text-slate-500 uppercase font-mono text-[10px] block">Why This Matters</span>
            <p className="text-slate-200">{spec.whyMatters}</p>
          </div>

          {spec.comparison && (
            <div className="text-slate-400 italic">
              <span className="text-slate-500 not-italic uppercase font-mono text-[10px] block">Benchmark</span>
              {spec.comparison}
            </div>
          )}

          <div className="pt-2 flex items-center justify-between border-t border-white/5 text-[11px]">
            <span className="text-emerald-400/80 font-mono">Credibility: {spec.credibility}</span>
            {spec.evidenceId && onOpenEvidence && (
              <button
                onClick={() => onOpenEvidence(spec.evidenceId!)}
                className="text-emerald-400 underline hover:text-emerald-300 font-semibold"
              >
                Inspect Primary Source PDF →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
