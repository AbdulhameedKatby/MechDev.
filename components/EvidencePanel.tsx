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
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-sm transition-opacity duration-100"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-t-2xl border-t border-x border-white/10 bg-[#0a1811] p-6 text-[#EDF7EF] shadow-2xl transition-transform duration-100 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-emerald-400 font-mono mb-1">
              Traceable Evidence Verification
            </div>
            <h3 id="evidence-panel-title" className="text-xl font-semibold text-[#E9F8EE]">
              &ldquo;{evidence.claim}&rdquo;
            </h3>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close evidence panel"
            className="ml-4 rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Sources list */}
        <div className="mt-6 space-y-4">
          <h4 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
            Citations & Wind Tunnel / Certification Records
          </h4>

          {evidence.sources.map((src, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-[#0d2217] p-5 shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {getTierBadge(src.tier)}
                  <span className="font-bold text-white text-base">{src.publisher}</span>
                  <span className="text-xs text-slate-400 font-mono">({src.year})</span>
                </div>
                <span className="text-xs text-emerald-300/80 font-mono bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800/40">
                  {src.credibility}
                </span>
              </div>

              <div className="text-sm font-medium text-slate-200">
                <span className="text-slate-400">Doc:</span> {src.document}
                <span className="mx-2 text-slate-600">•</span>
                <span className="text-slate-400">Type:</span> {src.type}
              </div>

              {src.quote && (
                <blockquote className="border-l-2 border-emerald-500/60 pl-4 py-1 text-sm italic text-emerald-100/90 bg-emerald-950/20 rounded-r">
                  &ldquo;{src.quote}&rdquo;
                </blockquote>
              )}

              {src.url && (
                <div className="pt-1">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
                  >
                    Direct Archive Link →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Disagreement / Context */}
        {evidence.disagreement && (
          <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-amber-200/90 text-sm">
            <div className="font-semibold text-amber-300 flex items-center gap-2 mb-1">
              <span>⚠</span> Design Space Trade-off & Early Disagreements
            </div>
            <p className="leading-relaxed text-amber-100/80">{evidence.disagreement}</p>
          </div>
        )}
      </div>
    </div>
  )
}
