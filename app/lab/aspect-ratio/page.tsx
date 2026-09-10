"use client"
import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import LabSlider from '../../../components/LabSlider'
import LabChart, { Marker } from '../../../components/LabChart'
import { computeInducedDragCoeff, inducedDragVsAR } from '../../../lib/calculations/physics'

export default function AspectRatioLab() {
  const [ar, setAr] = useState(1.83)
  const [cl, setCl] = useState(0.5)

  // Current calculated C_Di
  const currentCDi = useMemo(() => computeInducedDragCoeff(cl, ar), [cl, ar])

  // Curve data points
  const curveData = useMemo(() => {
    return inducedDragVsAR(cl, 0.5, 12, 60).map((d) => ({
      x: d.ar,
      y: d.cdi,
    }))
  }, [cl])

  // Comparison aircraft markers
  const markers: Marker[] = useMemo(() => {
    return [
      {
        x: 1.83,
        y: computeInducedDragCoeff(cl, 1.83),
        label: 'Concorde',
        sublabel: 'AR=1.83',
        color: '#0e9954',
      },
      {
        x: 3.1,
        y: computeInducedDragCoeff(cl, 3.1),
        label: 'F-16',
        sublabel: 'AR=3.1',
        color: '#38bdf8',
      },
      {
        x: 7.32,
        y: computeInducedDragCoeff(cl, 7.32),
        label: 'Cessna 172',
        sublabel: 'AR=7.32',
        color: '#94a3b8',
      },
      {
        x: 10.2,
        y: computeInducedDragCoeff(cl, 10.2),
        label: 'Boeing 787',
        sublabel: 'AR=10.2',
        color: '#f59e0b',
      },
    ]
  }, [cl])

  // Ratio comparison vs 787
  const b787CDi = computeInducedDragCoeff(cl, 10.2)
  const penaltyRatio = (currentCDi / b787CDi).toFixed(1)

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      {/* Header & Breadcrumb */}
      <div>
        <Link
          href="/lab"
          className="text-xs font-mono text-emerald-400 hover:underline mb-2 inline-block"
        >
          ← Back to Laboratory Hub
        </Link>
        <div className="text-xs uppercase font-mono text-slate-400">Lab 01</div>
        <h1 className="text-3xl font-extrabold text-white font-serif">
          Aspect Ratio ↔ Induced Drag
        </h1>
        <p className="mt-1 text-sm text-slate-300">
          Observe why Concorde&apos;s stubby, low-aspect-ratio delta wing incurs brutal drag penalties at subsonic speeds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Controls & Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#091a11] p-6 space-y-6 shadow-xl">
            <LabSlider
              label="Wing Aspect Ratio (AR = b² / S)"
              min={0.5}
              max={12}
              step={0.1}
              value={ar}
              unit=""
              onChange={setAr}
            />

            <LabSlider
              label="Lift Coefficient (C_L) — Flight Phase"
              min={0.1}
              max={1.5}
              step={0.05}
              value={cl}
              unit=""
              onChange={setCl}
            />
          </div>

          <LabChart
            data={curveData}
            xLabel="Aspect Ratio (AR)"
            yLabel="Induced Drag Coeff (C_Di)"
            currentX={ar}
            markers={markers}
            formatX={(v) => v.toFixed(1)}
            formatY={(v) => v.toFixed(3)}
            height={320}
          />
        </div>

        {/* Right 1 Col: Readout & Concorde Insight */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#0a2014] p-6 shadow-xl space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Computed Induced Drag
            </div>
            <div className="text-4xl font-extrabold font-mono text-white tracking-tight">
              C<sub className="text-2xl text-emerald-400">Di</sub> = {currentCDi.toFixed(4)}
            </div>

            <div className="pt-2 border-t border-white/10 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Governing Formula:</span>
                <span className="text-emerald-300">C_Di = C_L² / (π × AR × e)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Oswald Efficiency (e):</span>
                <span className="text-white">0.80</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Penalty vs Boeing 787:</span>
                <span className="text-amber-400 font-bold">{penaltyRatio}× Drag</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-[#07190f] p-6 shadow-xl space-y-3">
            <div className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">
              Concorde Delta Paradox
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              At takeoff and subsonic hold (C_L ≈ 0.8), Concorde&apos;s AR of 1.83 produces an induced drag coefficient over <strong className="text-white">5 times higher</strong> than an efficient airliner.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Concorde designers knew this. They accepted the penalty because a high-AR wing at Mach 2 would suffer catastrophic wave drag and wing flutter.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
