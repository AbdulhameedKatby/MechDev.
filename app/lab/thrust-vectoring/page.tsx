"use client"
import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import LabSlider from '../../../components/LabSlider'
import { computeVectorDecomposition } from '../../../lib/calculations/physics'

export default function ThrustVectoringLab() {
  const [angle, setAngle] = useState(90)
  const [thrust, setThrust] = useState(21500)
  const [airspeed, setAirspeed] = useState(30)

  // Calculations
  const { verticalThrustLbf, horizontalThrustLbf } = useMemo(
    () => computeVectorDecomposition(thrust, angle),
    [thrust, angle]
  )

  const vertKn = (verticalThrustLbf * 0.00444822).toFixed(1)
  const horizKn = (horizontalThrustLbf * 0.00444822).toFixed(1)

  // Estimated wing lift (scaled quadratic with airspeed)
  const wingLiftLbf = useMemo(() => {
    // At 150 knots, typical wing provides ~20,000 lbf lift
    return Math.min(25000, Math.round(20000 * Math.pow(airspeed / 150, 2)))
  }, [airspeed])

  const totalVertForce = Math.round(verticalThrustLbf + wingLiftLbf)
  const harrierWeight = 21000 // lbf
  const netVertForce = totalVertForce - harrierWeight

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      {/* Header */}
      <div>
        <Link href="/lab" className="text-xs font-mono text-[#0e9954] hover:underline mb-2 inline-block">
          ← Back to Laboratory Hub
        </Link>
        <div className="text-xs uppercase font-mono text-slate-400">Lab 08</div>
        <h1 className="text-3xl font-extrabold text-white font-serif">
          Thrust Vectoring ↔ VTOL Transition Dynamics
        </h1>
        <p className="mt-1 text-sm text-slate-300">
          Decompose rotating nozzle angles from 90° pure hover to 0° wing-borne cruise, and analyze vertical force balances during flight transition.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Controls & Diagram */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#07032a] p-6 space-y-6 shadow-xl">
            <LabSlider
              label="Nozzle Vector Angle (θ)"
              min={0}
              max={98}
              step={1}
              value={angle}
              unit="°"
              onChange={setAngle}
            />

            <LabSlider
              label="Engine Thrust Setting"
              min={10000}
              max={25000}
              step={500}
              value={thrust}
              unit=" lbf"
              onChange={setThrust}
            />

            <LabSlider
              label="Forward Airspeed"
              min={0}
              max={250}
              step={5}
              value={airspeed}
              unit=" kts"
              onChange={setAirspeed}
            />

            {/* Flight Mode Presets */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Flight Regimes:</span>
              <button onClick={() => { setAngle(90); setAirspeed(0); setThrust(21500) }} className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-sky-400 border border-sky-500/20">Pure Hover (90°)</button>
              <button onClick={() => { setAngle(45); setAirspeed(80); setThrust(21000) }} className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-amber-400 border border-amber-500/20">Transition Corridor (45°)</button>
              <button onClick={() => { setAngle(0); setAirspeed(220); setThrust(15000) }} className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[#0e9954] border border-[#0e9954]/20">Wing Cruise (0°)</button>
            </div>
          </div>

          {/* Interactive Vector Visualization */}
          <div className="rounded-2xl border border-white/10 bg-[#07032a] p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white font-serif flex justify-between items-center">
              <span>Dynamic Thrust Vector Decomposition</span>
              <span className="text-xs font-mono text-[#0e9954]">θ = {angle}°</span>
            </h3>

            <div className="relative w-full h-56 bg-[#040118] rounded-xl border border-white/10 p-4 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 400 200" className="w-full h-full">
                {/* Aircraft Silhouette Representation */}
                <path d="M 120 100 L 260 100 L 280 110 L 290 95 L 270 95 L 210 80 L 150 95 Z" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                
                {/* Wing */}
                <path d="M 180 100 L 220 50 L 235 50 L 210 100 Z" fill="#334155" stroke="#64748b" strokeWidth="1.5" />

                {/* Rotating Nozzle Location */}
                <circle cx="200" cy="105" r="10" fill="#0e9954" opacity="0.8" />

                {/* Thrust Vector Arrow */}
                {(() => {
                  const rad = (angle * Math.PI) / 180
                  const vecLen = 70
                  const endX = 200 - Math.cos(rad) * vecLen
                  const endY = 105 + Math.sin(rad) * vecLen
                  return (
                    <g>
                      <line x1="200" y1="105" x2={endX} y2={endY} stroke="#0e9954" strokeWidth="4" strokeDasharray="none" />
                      <circle cx={endX} cy={endY} r="4" fill="#0e9954" />
                      <text x={endX - 10} y={endY + 15} fill="#0e9954" fontSize="10" fontFamily="monospace">
                        Exhaust Stream ({angle}°)
                      </text>
                    </g>
                  )
                })()}

                {/* Vertical Force Vector */}
                <line x1="200" y1="105" x2="200" y2={105 - Math.min(80, (totalVertForce / 25000) * 80)} stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                <text x="210" y="45" fill="#38bdf8" fontSize="10" fontFamily="monospace">Lift + Vert Thrust ({totalVertForce} lbf)</text>

                {/* Weight Vector */}
                <line x1="200" y1="105" x2="200" y2="165" stroke="#ef4444" strokeWidth="2" />
                <text x="210" y="160" fill="#ef4444" fontSize="10" fontFamily="monospace">Weight ({harrierWeight} lbf)</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Real-Time Telemetry */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#0e9954]/40 bg-[#07032a] p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#0e9954] font-bold">
              VTOL Vector Telemetry
            </h3>

            <div className="space-y-3 font-mono">
              <div className="p-3 rounded-xl bg-[#040118] border border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-400">Vertical Thrust T_v:</span>
                <span className="text-base font-bold text-sky-400">
                  {Math.round(verticalThrustLbf)} lbf ({vertKn} kN)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#040118] border border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-400">Horizontal Thrust T_h:</span>
                <span className="text-base font-bold text-amber-400">
                  {Math.round(horizontalThrustLbf)} lbf ({horizKn} kN)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#040118] border border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-400">Wing Aero Lift:</span>
                <span className="text-base font-bold text-white">
                  {wingLiftLbf} lbf
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#040118] border border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-400">Net Vertical Force:</span>
                <span className={`text-base font-bold ${netVertForce >= 0 ? 'text-[#0e9954]' : 'text-red-400'}`}>
                  {netVertForce >= 0 ? `+${netVertForce}` : netVertForce} lbf
                </span>
              </div>
            </div>

            <div className={`p-3 rounded-xl border text-xs font-mono leading-relaxed ${
              netVertForce >= 0
                ? 'border-[#0e9954]/40 bg-[#0e9954]/10 text-[#0e9954]'
                : 'border-red-500/40 bg-red-950/20 text-red-300'
            }`}>
              {netVertForce >= 0
                ? '✓ POSITIVE LIFT MARGIN: Aircraft maintains or gains altitude.'
                : '⚠ SINKING CONDITION: Combined vertical thrust and wing lift are less than weight!'}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#07032a] p-6 text-xs text-slate-300 leading-relaxed space-y-3 shadow-xl">
            <span className="text-[#0e9954] font-bold font-mono block uppercase">
              PHYSICS INSIGHT: THE TRANSITION CORRIDOR
            </span>
            <p>
              In pure hover (90°), vertical thrust T_v = T × sin(90°) = T. As nozzles rotate forward to 45° to accelerate the aircraft, vertical thrust drops by 29% (sin(45°) = 0.707).
            </p>
            <p>
              To prevent crashing during transition, forward airspeed must build fast enough so aerodynamic wing lift replaces the lost vertical thrust component.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
