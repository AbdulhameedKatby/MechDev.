"use client"
import React, { useState } from 'react'
import type { EvidenceRecord } from '../lib/types'
import EvidencePanel from './EvidencePanel'

interface EvidenceClaimProps {
  children: React.ReactNode
  evidenceId: string
  evidence: EvidenceRecord[]
}

export default function EvidenceClaim({ children, evidenceId, evidence }: EvidenceClaimProps) {
  const [isOpen, setIsOpen] = useState(false)
  const record = evidence.find((e) => e.id === evidenceId)

  if (!record) {
    return <span>{children}</span>
  }

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(true)
          }
        }}
        title="Click to view traceable sources and aerodynamic verification data"
        className="inline cursor-pointer bg-emerald-500/10 px-1 py-0.5 rounded border-b border-dashed border-emerald-400/60 text-emerald-200 hover:bg-emerald-500/20 hover:text-white transition-colors"
      >
        {children}
        <span className="ml-1 text-[10px] text-emerald-400 font-mono select-none">
          [src]
        </span>
      </span>

      <EvidencePanel
        evidence={record}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
