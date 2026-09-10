"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { computeLiftSI, toMps } from '../../../lib/calculations/physics'
import ExperimentPanel from '../../../components/ExperimentPanel'

export default function LiftLab() {
  const router = useRouter()
  const [rho, setRho] = useState(1.225)
  const [v, setV] = useState(250)
  const [vUnit, setVUnit] = useState<'m/s'|'kt'|'km/h'>('m/s')
  const [s, setS] = useState(442)
  const [cl, setCl] = useState(0.5)
  const [lift, setLift] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const qp = new URLSearchParams(window.location.search)
    const qrho = qp.get('rho')
    const qv = qp.get('v')
    const qunit = qp.get('vunit')
    const qs = qp.get('s')
    const qcl = qp.get('cl')
    if (qrho) setRho(Number(qrho))
    if (qv) setV(Number(qv))
    if (qunit && (qunit === 'm/s' || qunit === 'kt' || qunit === 'km/h')) setVUnit(qunit)
    if (qs) setS(Number(qs))
    if (qcl) setCl(Number(qcl))
  }, [])

  useEffect(() => {
    const v_mps = toMps(v, vUnit)
    setLift(computeLiftSI(rho, v_mps, s, cl))
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams({ rho: String(rho), v: String(v), vunit: vUnit, s: String(s), cl: String(cl) })
      const href = `${window.location.pathname}?${params.toString()}`
      router.replace(href)
    }
  }, [rho, v, vUnit, s, cl, router])

  return (
    <div>
      <h2 className="text-2xl font-bold">Lift Calculator</h2>
      <p className="text-muted">L = ½ ρ V² S C<sub>L</sub></p>

      <div style={{marginTop:12}}>
        <ExperimentPanel title="Lift experiment" result={lift ? `${lift.toFixed(0)} N` : '—'}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <label>
              <div className="text-muted">Air density ρ (kg/m³)</div>
              <input type="number" value={rho} onChange={e => setRho(Number(e.target.value))} className="mt-1 w-full p-2 rounded bg-surface" />
            </label>
            <label>
              <div className="text-muted">Reference area S (m²)</div>
              <input type="number" value={s} onChange={e => setS(Number(e.target.value))} className="mt-1 w-full p-2 rounded bg-surface" />
            </label>
            <label>
              <div className="text-muted">Velocity V</div>
              <div style={{display:'flex',gap:8}}>
                <input type="number" value={v} onChange={e=>setV(Number(e.target.value))} className="mt-1 w-full p-2 rounded bg-surface" />
                <select value={vUnit} onChange={e=>setVUnit(e.target.value as any)} className="mt-1 p-2 bg-surface rounded">
                  <option value="m/s">m/s</option>
                  <option value="kt">kt</option>
                  <option value="km/h">km/h</option>
                </select>
              </div>
            </label>
            <label>
              <div className="text-muted">Lift coefficient C<sub>L</sub></div>
              <input type="number" step="0.01" value={cl} onChange={e => setCl(Number(e.target.value))} className="mt-1 w-full p-2 rounded bg-surface" />
            </label>
          </div>
        </ExperimentPanel>
      </div>
    </div>
  )
}
