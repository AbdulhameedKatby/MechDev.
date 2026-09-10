"use client"
import React from 'react'

interface ExperimentPanelProps {
  title: string
  children: React.ReactNode
  result?: React.ReactNode
  status?: 'MODELED' | 'CALCULATED' | 'ESTIMATED' | 'USER INPUT'
  model?: string
  assumptions?: string[]
  limitations?: string[]
}

export default function ExperimentPanel({
  title,
  children,
  result,
  status = 'MODELED',
  model = 'Simplified engineering model',
  assumptions = ['Steady-state conditions', 'Inputs are treated as idealized reference values'],
  limitations = ['Does not represent the full aircraft-specific flow field', 'Use as a trend or learning model, not a certification result'],
}: ExperimentPanelProps) {
  const copy = async () => {
    try{
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied')
    }catch(e){
      alert('Copy failed')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-5">
      <div className="min-w-0" style={{background:'var(--glass)',padding:18,borderRadius:10}}>
        <h3 style={{marginTop:0}}>{title}</h3>
        <div style={{marginTop:12}}>{children}</div>
      </div>
      <aside className="min-w-0 overflow-hidden" style={{background:'var(--surface)',padding:16,borderRadius:10}}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div style={{fontSize:12,color:'var(--muted)'}}>Result</div>
            <span className="rounded border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider text-amber-300">{status}</span>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-ghost" onClick={()=>window.location.reload()}>Reset</button>
            <button className="btn btn-ghost" onClick={copy}>Share</button>
          </div>
        </div>
        <div className="break-words" style={{marginTop:12,fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace',fontSize:18}}>
          {result ?? '—'}
        </div>
        <div className="mt-4 border-t border-white/10 pt-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Model</div>
          <div className="mt-1 text-xs text-slate-300">{model}</div>
        </div>
        <details className="mt-3 border-t border-white/10 pt-3 text-xs text-slate-400">
          <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-wider text-emerald-300">Assumptions & validity</summary>
          <ul className="mt-2 list-disc space-y-1 pl-4">{assumptions.map((item) => <li key={item}>{item}</li>)}</ul>
        </details>
        <details className="mt-3 border-t border-white/10 pt-3 text-xs text-slate-400">
          <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-wider text-amber-300">Where this model breaks</summary>
          <ul className="mt-2 list-disc space-y-1 pl-4">{limitations.map((item) => <li key={item}>{item}</li>)}</ul>
        </details>
      </aside>
    </div>
  )
}
