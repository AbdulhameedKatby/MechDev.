import React from 'react'
import Link from 'next/link'

export default function EditorialHero() {
  return (
    <section className="cover-hero" style={{minHeight:'100vh', display:'flex', alignItems:'stretch'}}>
      <div style={{flex:'1 1 56%'}} className="container" aria-hidden>
        <div style={{paddingTop:80, paddingBottom:80}}>
          <div style={{letterSpacing:'0.12em', color:'var(--muted)', fontSize:12}}>AEROLAB</div>
          <h1 style={{marginTop:12, marginBottom:8, fontSize:'clamp(2.6rem,6vw,5rem)', lineHeight:0.95}}>Why does this aircraft look like this?</h1>
          <p style={{maxWidth:680, marginTop:18}} className="hero-sub">A visual investigation into the engineering decisions that shape aircraft. Question → physics → design → trade-off → experiment.</p>
          <div className="hero-cta" style={{marginTop:28}}>
            <Link href="/investigations" className="btn btn-primary">Explore Investigations</Link>
            <Link href="/lab" className="btn btn-ghost" style={{marginLeft:12}}>Open Lab</Link>
          </div>
        </div>
      </div>

      <div style={{flex:'1 1 44%', position:'relative', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style={{width:'92%', height:'86%', borderRadius:12, overflow:'hidden', boxShadow:'0 28px 80px rgba(2,8,4,0.6)'}}>
          <img src="/assets/concorde-hero.svg" alt="Concorde silhouette" style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
        </div>

        <div style={{position:'absolute', left:36, bottom:28, color:'var(--muted)'}}>
          <div style={{fontSize:12, letterSpacing:'0.12em'}}>01 / 04</div>
          <div style={{fontWeight:700, marginTop:6}}>CURRENT INVESTIGATION</div>
          <div style={{marginTop:4}} className="text-muted">NASA X-59 · Quiet supersonic flight</div>
        </div>
      </div>
    </section>
  )
}
