import React from 'react'

export default function EditorialIndex(){
  const items = [
    {num:'01', title:'Why did Concorde need a delta wing?'},
    {num:'02', title:'How does the F-35B hover?'},
    {num:'03', title:"Why is the X-59's nose so long?"},
    {num:'04', title:'How does the A350 fly so far?'}
  ]

  return (
    <section>
      <h2 style={{fontSize:28}}>Aircraft are answers to engineering problems</h2>
      <div style={{marginTop:20}}>
        {items.map(it=> (
          <div key={it.num} style={{display:'flex',alignItems:'center',gap:20,padding:'18px 0',borderBottom:'1px solid rgba(255,255,255,0.02)'}}>
            <div style={{fontSize:20, color:'var(--muted)', width:64}}>{it.num}</div>
            <div>
              <div style={{fontSize:18}}>{it.title}</div>
              <div className="text-muted">Hover to reveal image and one-line principle (mock)</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
