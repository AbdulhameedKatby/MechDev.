import React from 'react'
import Link from 'next/link'

export default function VTOLMechanicsConceptPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-12">
      {/* Header */}
      <div>
        <Link href="/concepts" className="text-xs font-mono text-[#0e9954] hover:underline mb-2 inline-block">
          ← Back to All Concepts
        </Link>
        <div className="text-xs uppercase font-mono text-slate-400">
          Concept 06 · Vertical Flight & Propulsion
        </div>
        <h1 className="text-4xl font-extrabold text-white font-serif mt-1">
          VTOL Physics & Vectored Thrust Mechanics
        </h1>
        <p className="mt-2 text-slate-300 text-lg">
          The extreme thermodynamic, aerodynamic, and control trade-offs of jet-borne vertical takeoff.
        </p>
      </div>

      {/* Section 1 */}
      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#07032a] p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-serif">
          1. Momentum Theory & Jet vs. Rotor Hover Efficiency
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Hovering requires generating a vertical thrust force equal to aircraft weight (T ≥ W). According to momentum theory, thrust is created by accelerating mass flow rate (ṁ) through velocity change (ΔV): T = ṁ × ΔV.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          Helicopters use huge rotors to accelerate a massive volume of air at low velocity, maximizing hover power efficiency. Jet VTOLs (like the Harrier or F-35B) accelerate a small mass flow of high-velocity hot exhaust, requiring up to 10× more engine horsepower to hover.
        </p>

        <div className="rounded-xl bg-[#040118] p-4 border border-[#0e9954]/25 font-mono text-xs text-emerald-300 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span>Ideal Hover Power</span>
            <span>P_ideal = √(T³ / (2 × ρ × A))</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Helicopter Rotor (Large Area A)</span>
            <span className="text-[#0e9954]">Low Power (~100 hp per ton)</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Harrier Pegasus Jet (Small Area A)</span>
            <span className="text-amber-400">High Power (~1,500 hp per ton)</span>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#07032a] p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-serif">
          2. Ground Effect, Thermal Fountains & Reaction Control
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          When high-velocity exhaust jets strike the ground, they spread radially as wall jets. Where opposing ground wall jets collide under the fuselage, they form an upward-flowing <strong className="text-white">Thermal Fountain</strong>.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          If hot exhaust recirculates into the engine intake (Hot Gas Ingestion), turbine inlet temperatures spike instantly, causing compressor stalls and severe thrust loss when the pilot needs maximum power most.
        </p>

        {/* Reaction Jet Control Box */}
        <div className="rounded-xl bg-[#040118] p-4 border border-sky-500/25 font-mono text-xs text-sky-300 space-y-2">
          <div className="text-slate-400 font-bold block mb-1">Hover Reaction Control Jet Authority (Puffer Jets)</div>
          <div>Roll Moment: τ_roll = F_wingtip × d_wingspan</div>
          <div className="text-slate-400">High-pressure compressor bleed air (~8% engine flow) provides roll, pitch, and yaw control in hover when aerodynamic control surfaces have no airflow.</div>
        </div>
      </section>

      {/* Navigation */}
      <div className="pt-6 border-t border-white/10 flex justify-between text-xs font-mono">
        <Link href="/questions/harrier-vtol" className="text-[#0e9954] hover:underline">
          ← See Harrier VTOL Investigation
        </Link>
        <Link href="/lab/thrust-vectoring" className="text-[#0e9954] hover:underline">
          Launch Thrust Vectoring Lab →
        </Link>
      </div>
    </div>
  )
}
