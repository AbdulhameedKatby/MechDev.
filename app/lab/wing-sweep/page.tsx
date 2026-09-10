"use client"
import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import LabSlider from '../../../components/LabSlider'
import LabChart, { Marker } from '../../../components/LabChart'
import { computeCriticalMach, computeWaveDrag, waveDragVsMach } from '../../../lib/calculations/physics'

export default function WingSweepLab() {
  const [sweepDeg, setSweepDeg] = useState(63)
  const [thickness, setThickness] = useState(0.03)

  const critMach = useMemo(() => computeCriticalMach(sweepDeg, 0.7 - thickness), [sweepDeg, thickness])
  const waveDragAtCruise = useMemo(() => computeWaveDrag(2.04, sweepDeg, thickness), [sweepDeg, thickness])

  const curveData = useMemo(() => {
    return waveDragVsMach(sweepDeg, 0.4, 2.4, 50, thickness).map((d) => ({
      x: d.mach,
      y: d.cdw,
    }))
  }, [sweepDeg, thickness])

  const markers: Marker[] = useMemo(() => {
    return [
      {
        x: 0.85,
        y: computeWaveDrag(0.85, 35, 0.11),
        label: 'B787 (35° sweep)',
        color: '#f59e0b',
      },
      {
        x: 2.04,
        y: computeWaveDrag(2.04, 63, 0.03),
        label: 'Concorde (63° sweep)',
        color: '#0e9954',
      },
      {
        x: 2.05,
        y: computeWaveDrag(2.05, 40, 0.04),
        label: 'F-16 (40° sweep)',
        color: '#38bdf8',
      },
    ]
  }, [])

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      <div>
        <Link
          href="/lab"
          className="text-xs font-mono text-emerald-400 hover:underline mb-2 inline-block"
        >
          ← Back to Laboratory Hub
        </Link>
        <div className="text-xs uppercase font-mono text-slate-400">Lab 02</div>
        <h1 className="text-3xl font-extrabold text-white font-serif">
          Wing Sweep ↔ Wave Drag & Critical Mach
        </h1>
        <p className="mt-1 text-sm text-slate-300">
          How sweeping the leading edge tricks the oncoming supersonic airflow into seeing a subsonic normal velocity component.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#091a11] p-6 space-y-6 shadow-xl">
            <LabSlider
              label="Leading Edge Sweep Angle (Λ)"
              min={0}
              max={75}
              step={1}
              value={sweepDeg}
              unit="°"
              onChange={setSweepDeg}
            />

            <LabSlider
              label="Airfoil Thickness-to-Chord Ratio (t/c)"
              min={0.02}
              max={0.14}
              step={0.01}
              value={thickness}
              unit=""
              onChange={setThickness}
            />
          </div>

          {/* Interactive SVG Wing Geometry Preview */}
          <div className="rounded-2xl border border-white/10 bg-[#08170f] p-5 shadow-lg flex flex-col items-center">
            <div className="text-xs font-mono uppercase text-slate-400 mb-2">
              Planform Sweep Geometry (Λ = {sweepDeg}°)
            </div>
            <svg viewBox="0 0 400 160" className="w-full max-w-sm h-36">
              {/* Centerline */}
              <line x1="200" y1="10" x2="200" y2="150" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />

              {/* Dynamic Delta/Swept Wing */}
              {(() => {
                const sweepRad = (sweepDeg * Math.PI) / 180
                const tipY = 20 + Math.tan(sweepRad) * 140
                const constrainedTipY = Math.min(145, tipY)
                return (
                  <path
                    d={`M 200 20 L ${200 - 150} ${constrainedTipY} L ${200 - 120} 145 L 200 145 L ${200 + 120} 145 L ${200 + 150} ${constrainedTipY} Z`}
                    fill="rgba(45,191,111,0.25)"
                    stroke="#0e9954"
                    strokeWidth="2"
                    className="transition-all duration-150"
                  />
                )
              })()}

              <text x="200" y="100" textAnchor="middle" className="fill-white font-mono text-xs">
                {sweepDeg}° Sweep
              </text>
            </svg>
          </div>

          <LabChart
            data={curveData}
            xLabel="Flight Mach Number"
            yLabel="Wave Drag Coeff (C_Dw)"
            markers={markers}
            formatX={(v) => `M ${v.toFixed(1)}`}
            formatY={(v) => v.toFixed(3)}
            height={300}
          />
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#0a2014] p-6 shadow-xl space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Drag Divergence Threshold
            </div>
            <div className="text-3xl font-extrabold font-mono text-white">
              M<sub className="text-xl text-emerald-400">cr</sub> ≈ {Math.min(9.99, critMach).toFixed(2)}
            </div>

            <div className="pt-2 border-t border-white/10 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Wave Drag at M 2.04:</span>
                <span className="text-emerald-400 font-bold">{waveDragAtCruise.toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Normal Mach Component:</span>
                <span className="text-white">
                  M_n = M × cos({sweepDeg}°) = {(2.04 * Math.cos((sweepDeg * Math.PI) / 180)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-[#07190f] p-6 shadow-xl space-y-3">
            <div className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">
              BAC WB.180 Finding
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              British Aircraft Corporation engineers discovered that <strong className="text-white">63° sweep</strong> was the exact mathematical minimum needed to keep the leading edge shock attached and the normal Mach below sonic limits during Mach 2.04 cruise.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
