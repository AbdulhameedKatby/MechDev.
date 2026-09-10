"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { computeDragSI, toMps } from '../../../lib/calculations/physics'
import ExperimentPanel from '../../../components/ExperimentPanel'

export default function DragLab() {
  const router = useRouter()
  const [rho, setRho] = useState(1.225)
  const [v, setV] = useState(250)
  const [vUnit, setVUnit] = useState<'m/s' | 'kt' | 'km/h'>('m/s')
  const [s, setS] = useState(442)
  const [cd, setCd] = useState(0.03)
  const [drag, setDrag] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const qp = new URLSearchParams(window.location.search)
    const qrho = qp.get('rho')
    const qv = qp.get('v')
    const qunit = qp.get('vunit')
    const qs = qp.get('s')
    const qcd = qp.get('cd')
    if (qrho) setRho(Number(qrho))
    if (qv) setV(Number(qv))
    if (qunit && (qunit === 'm/s' || qunit === 'kt' || qunit === 'km/h')) setVUnit(qunit)
    if (qs) setS(Number(qs))
    if (qcd) setCd(Number(qcd))
  }, [])

  useEffect(() => {
    const v_mps = toMps(v, vUnit)
    setDrag(computeDragSI(rho, v_mps, s, cd))
  }, [rho, v, vUnit, s, cd])

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif text-white">Aerodynamic Drag Calculator</h1>
        <p className="text-slate-400 font-mono text-sm">D = ½ ρ V² S C<sub>D</sub></p>
      </div>

      <ExperimentPanel title="Drag experiment" result={drag ? `${drag.toFixed(0)} N` : '—'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="text-xs">
            <div className="text-slate-400 mb-1">Air density ρ (kg/m³)</div>
            <input
              type="number"
              value={rho}
              onChange={(e) => setRho(Number(e.target.value))}
              className="w-full p-2.5 rounded-lg bg-[#06110a] border border-white/10 text-white font-mono"
            />
          </label>
          <label className="text-xs">
            <div className="text-slate-400 mb-1">Reference area S (m²)</div>
            <input
              type="number"
              value={s}
              onChange={(e) => setS(Number(e.target.value))}
              className="w-full p-2.5 rounded-lg bg-[#06110a] border border-white/10 text-white font-mono"
            />
          </label>
          <label className="text-xs">
            <div className="text-slate-400 mb-1">Velocity V</div>
            <div className="flex gap-2">
              <input
                type="number"
                value={v}
                onChange={(e) => setV(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-[#06110a] border border-white/10 text-white font-mono"
              />
              <select
                value={vUnit}
                onChange={(e) => setVUnit(e.target.value as any)}
                className="p-2.5 bg-[#06110a] border border-white/10 rounded-lg text-white font-mono text-xs"
              >
                <option value="m/s">m/s</option>
                <option value="kt">kt</option>
                <option value="km/h">km/h</option>
              </select>
            </div>
          </label>
          <label className="text-xs">
            <div className="text-slate-400 mb-1">Drag coefficient C<sub>D</sub></div>
            <input
              type="number"
              step="0.001"
              value={cd}
              onChange={(e) => setCd(Number(e.target.value))}
              className="w-full p-2.5 rounded-lg bg-[#06110a] border border-white/10 text-white font-mono"
            />
          </label>
        </div>
      </ExperimentPanel>
    </div>
  )
}
