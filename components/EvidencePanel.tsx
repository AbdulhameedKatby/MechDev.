"use client"
import React, { useEffect, useRef } from 'react'
import type { EvidenceRecord, Source } from '../lib/types'

interface EvidencePanelProps {
  evidence: EvidenceRecord
  isOpen: boolean
  onClose: () => void
}

export default function EvidencePanel({ evidence, isOpen, onClose }: EvidencePanelProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const getCredibilityScore = (source: Source) => {
    const text = `${source.publisher} ${source.type} ${source.credibility}`.toLowerCase()
    if (text.includes('nasa') || text.includes('government') || text.includes('regulatory') || text.includes('peer-reviewed')) return 5
    if (source.tier === 'primary') return 4
    if (source.tier === 'secondary') return 3
    return 1
  }

  const getScoreExplanation = (source: Source) => {
    const score = getCredibilityScore(source)
    if (score === 5) return 'Strongest evidence: official, regulatory, government, or peer-reviewed technical material.'
    if (score === 4) return 'Primary evidence produced by the organization that designed, tested, or operated the system.'
    if (score === 3) return 'Interpretive technical material that should be checked against primary evidence.'
    return 'Tertiary interpretation. Useful context, but not sufficient on its own for an engineering claim.'
  }

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const highestScore = Math.max(...evidence.sources.map(getCredibilityScore))

  const getTierBadge = (tier: Source['tier']) => {
    switch (tier) {
      case 'primary':
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Primary Source
          </span>
        )
      case 'secondary':
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
            Secondary Source
          </span>
        )
      default:
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-slate-500/20 text-slate-400 border border-slate-500/30">
            Tertiary Source
          </span>
        )
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="evidence-panel-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-md transition-opacity duration-100 sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-5xl max-h-[92vh] flex-col overflow-hidden rounded-2xl border border-emerald-500/25 bg-[#07170f] text-[#EDF7EF] shadow-[0_24px_90px_rgba(0,0,0,0.7),0_0_36px_rgba(14,153,84,0.12)] transition-transform duration-100 ease-out sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-white/10 bg-gradient-to-r from-[#0b2417] to-[#07170f] p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" /> Traceable evidence
                <span className="text-slate-600">/</span> claim record
              </div>
              <h3 id="evidence-panel-title" className="mt-3 max-w-4xl break-words font-brand text-lg font-bold leading-snug text-white sm:text-2xl">
              &ldquo;{evidence.claim}&rdquo;
              </h3>
              <p className="mt-3 max-w-3xl text-xs leading-relaxed text-slate-400 sm:text-sm">
                Provenance and evidence type are scored separately from certainty. Open each record to see what it supports.
              </p>
            </div>
            <button ref={closeButtonRef} onClick={onClose} aria-label="Close evidence panel" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-lg text-slate-400 transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-white">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-slate-500">
            <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1">{evidence.sources.length} source{evidence.sources.length === 1 ? '' : 's'}</span>
            <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-1 text-amber-300">Best provenance: {'★'.repeat(highestScore)}{'☆'.repeat(5 - highestScore)}</span>
          </div>
        </div>

        {/* Sources list */}
        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div><div className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400 font-mono">Evidence register</div><h4 className="mt-1 text-lg font-bold text-white font-serif">Primary records and technical context</h4></div>
            <span className="hidden text-[10px] font-mono uppercase tracking-wider text-slate-500 sm:block">Ranked by provenance</span>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
          {evidence.sources.map((src, index) => (
            <div
              key={index}
              className="flex flex-col rounded-2xl border border-white/10 bg-[#0b2117] p-4 shadow-sm transition-colors hover:border-emerald-500/30 sm:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  {getTierBadge(src.tier)}
                  <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1"><span className="font-brand text-base font-bold text-white">{src.publisher}</span><span className="text-xs text-slate-500 font-mono">{src.year}</span></div>
                </div>
                <span
                  title={getScoreExplanation(src)}
                  aria-label={`Credibility score ${getCredibilityScore(src)} out of 5. ${getScoreExplanation(src)}`}
                  className="shrink-0 rounded-lg border border-amber-700/40 bg-amber-950/40 px-2 py-1 text-[11px] text-amber-300 font-mono whitespace-nowrap"
                >
                  {'★'.repeat(getCredibilityScore(src))}{'☆'.repeat(5 - getCredibilityScore(src))}
                  <span className="ml-2 text-slate-400">{getCredibilityScore(src)}/5</span>
                </span>
              </div>

              <div className="mt-4 border-t border-white/10 pt-3">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Document</div>
                <div className="mt-1 text-sm font-semibold leading-snug text-slate-100">{src.document}</div>
                <div className="mt-1 text-xs text-slate-500">{src.type}</div>
              </div>

              <div className="mt-3 text-xs leading-relaxed text-slate-400">
                <span className="font-semibold text-slate-300">Why this score:</span> {getScoreExplanation(src)}
              </div>

              {src.quote && (
                <blockquote className="mt-4 rounded-r-xl border-l-2 border-emerald-500/60 bg-emerald-950/20 py-3 pl-4 text-xs italic leading-relaxed text-emerald-100/90 sm:text-sm">
                  &ldquo;{src.quote}&rdquo;
                </blockquote>
              )}

              {src.url && (
                <div className="mt-auto pt-4">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
                  >
                    Open source record <span aria-hidden="true">↗</span>
                  </a>
                </div>
              )}
            </div>
          ))}
          </div>
        </div>

        {/* Disagreement / Context */}
        {evidence.disagreement && (
          <div className="border-t border-amber-500/20 bg-amber-950/20 p-5 text-amber-200/90 sm:p-6">
            <div className="font-semibold text-amber-300 flex items-center gap-2 mb-2 text-sm">
              <span aria-hidden="true">△</span> Context and disagreement
            </div>
            <p className="leading-relaxed text-amber-100/80">{evidence.disagreement}</p>
          </div>
        )}
      </div>
    </div>
  )
}
