'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import type { AircraftData } from '../lib/types'

type SourceRecord = AircraftData['evidence'][number]['sources'][number] & { id: string; aircraft: string; aircraftSlug: string; claim: string }

export default function SourcesLibrary({ records }: { records: SourceRecord[] }) {
  const [query, setQuery] = useState('')
  const [tier, setTier] = useState('all')
  const filtered = useMemo(() => records.filter((record) => {
    const text = `${record.publisher} ${record.document} ${record.claim} ${record.aircraft}`.toLowerCase()
    return (tier === 'all' || record.tier === tier) && text.includes(query.trim().toLowerCase())
  }), [query, tier, records])

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor="source-search">Search source records</label>
        <input id="source-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search publisher, document, aircraft, or claim" className="rounded-xl border border-white/10 bg-[#07032a] px-4 py-3 text-sm text-white outline-none focus:border-emerald-400" />
        <div className="flex gap-2" role="group" aria-label="Filter source type">
          {['all', 'primary', 'secondary', 'tertiary'].map((value) => <button key={value} type="button" aria-pressed={tier === value} onClick={() => setTier(value)} className={`rounded-xl border px-3 py-2 text-xs font-mono uppercase ${tier === value ? 'border-emerald-400 bg-emerald-400 text-slate-950' : 'border-white/10 bg-white/5 text-slate-400'}`}>{value}</button>)}
        </div>
      </div>
      <p className="text-xs font-mono uppercase tracking-wider text-slate-500">{filtered.length} source records</p>
      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((record) => (
          <article key={record.id} className="rounded-2xl border border-white/10 bg-[#07032a] p-5 transition-colors hover:border-emerald-500/40">
            <div className="flex flex-wrap items-center justify-between gap-2"><span className="rounded border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-[10px] font-mono uppercase text-emerald-300">{record.tier} source</span><span className="text-xs font-mono text-slate-500">{record.year}</span></div>
            <h2 className="mt-3 text-lg font-bold text-white">{record.document}</h2>
            <p className="mt-1 text-sm text-slate-300">{record.publisher} · {record.type}</p>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">Supports: {record.claim}</p>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3"><Link href={`/aircraft/${record.aircraftSlug}`} className="text-xs font-mono text-emerald-300 hover:text-white">{record.aircraft} investigation</Link>{record.url && <a href={record.url} target="_blank" rel="noreferrer" className="text-xs font-mono text-emerald-300 underline">Open record ↗</a>}</div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <p className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-400">No source records match this search.</p>}
    </>
  )
}
