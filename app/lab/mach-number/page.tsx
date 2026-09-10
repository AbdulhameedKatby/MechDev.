"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { computeMach, toMps } from '../../../lib/calculations/physics'
import ExperimentPanel from '../../../components/ExperimentPanel'

export default function MachLab() {
  const router = useRouter()
  const [v, setV] = useState(250)
  const [vUnit, setVUnit] = useState<'m/s' | 'kt' | 'km/h'>('m/s')
  const [a, setA] = useState(340.3)
  const [mach, setMach] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const qp = new URLSearchParams(window.location.search)
    const qv = qp.get('v')
    const qunit = qp.get('vunit')
    const qa = qp.get('a')
    if (qv) setV(Number(qv))
    if (qunit && (qunit === 'm/s' || qunit === 'kt' || qunit === 'km/h')) setVUnit(qunit)
    if (qa) setA(Number(qa))
  }, [])

  useEffect(() => {
    const v_mps = toMps(v, vUnit)
    setMach(computeMach(v_mps, a))
  }, [v, vUnit, a])

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-serif text-white">Mach Number Calculator</h2>
        <p className="text-slate-400 font-mono text-sm">M = V / a</p>
      </div>

      <ExperimentPanel title="Mach experiment" result={mach ? mach.toFixed(3) : '—'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div className="text-slate-400 mb-1">Speed of sound a (m/s)</div>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(Number(e.target.value))}
              className="w-full p-2.5 rounded-lg bg-[#06110a] border border-white/10 text-white font-mono"
            />
          </label>
        </div>
      </ExperimentPanel>
    </div>
  )
}
