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
    <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:20}}>
      <div style={{background:'var(--glass)',padding:18,borderRadius:10}}>
        <h3 style={{marginTop:0}}>{title}</h3>
        <div style={{marginTop:12}}>{children}</div>
      </div>
      <aside style={{background:'var(--surface)',padding:16,borderRadius:10}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontSize:12,color:'var(--muted)'}}>Result</div>
          <div style={{display:'flex',gap:8}}>
            <button className="btn btn-ghost" onClick={()=>window.location.reload()}>Reset</button>
            <button className="btn btn-ghost" onClick={copy}>Share</button>
          </div>
        </div>
        <div style={{marginTop:12,fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace',fontSize:18}}>
          {result ?? '—'}
        </div>
        <div style={{marginTop:10,color:'var(--muted)',fontSize:12}}>Assumptions: steady-state, simplified models</div>
      </aside>
    </div>
  )
}
