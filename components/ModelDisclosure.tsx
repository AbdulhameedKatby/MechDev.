import React from 'react'

interface ModelDisclosureProps {
  model: string
  variables: string
  assumptions: string
  limitations: string
}

export default function ModelDisclosure({ model, variables, assumptions, limitations }: ModelDisclosureProps) {
  return (
    <details className="rounded-xl border border-white/10 bg-[#07032a] text-sm text-slate-300">
      <summary className="cursor-pointer list-none px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300">
        Model disclosure · assumptions and limits
      </summary>
      <div className="grid gap-4 border-t border-white/10 px-4 py-4 text-xs leading-relaxed sm:grid-cols-2">
        <div><div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Model</div><p className="mt-1">{model}</p></div>
        <div><div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Variables</div><p className="mt-1">{variables}</p></div>
        <div><div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Assumptions</div><p className="mt-1">{assumptions}</p></div>
        <div><div className="font-mono text-[10px] uppercase tracking-wider text-amber-300">Where it breaks</div><p className="mt-1">{limitations}</p></div>
      </div>
    </details>
  )
}