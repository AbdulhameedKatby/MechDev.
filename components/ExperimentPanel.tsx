"use client"
import React from 'react'

export default function ExperimentPanel({ title, children, result }: { title: string, children: React.ReactNode, result?: React.ReactNode }){
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
          <div style={{fontSize:12,color:'var(--muted)'}}>Result</div>
          <div className="flex gap-2">
            <button className="btn btn-ghost" onClick={()=>window.location.reload()}>Reset</button>
            <button className="btn btn-ghost" onClick={copy}>Share</button>
          </div>
        </div>
        <div className="break-words" style={{marginTop:12,fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace',fontSize:18}}>
          {result ?? '—'}
        </div>
        <div style={{marginTop:10,color:'var(--muted)',fontSize:12}}>Assumptions: steady-state, simplified models</div>
      </aside>
    </div>
  )
}
