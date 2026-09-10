import React from 'react'
import Link from 'next/link'
import EvidenceClaim from '../../../components/EvidenceClaim'
import concorde from '../../../content/concorde'

export default function SupersonicAerodynamicsConceptPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-12">
      {/* Breadcrumb & Header */}
      <div>
        <Link
          href="/concepts"
          className="text-xs font-mono text-emerald-400 hover:underline mb-2 inline-block"
        >
          ← Back to All Concepts
        </Link>
        <div className="text-xs uppercase font-mono text-slate-400">
          Concept 01 · Compressible Fluid Mechanics
        </div>
        <h1 className="text-4xl font-extrabold text-white font-serif mt-1">
          Supersonic Aerodynamics
        </h1>
        <p className="mt-2 text-slate-300 text-lg">
          What happens when air cannot get out of the way before an aircraft arrives.
        </p>
      </div>

      {/* Physics Section 1: The Compressibility Barrier */}
      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#0b1c13] p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-serif">
          1. The Speed of Sound & Shock Wave Formation
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          In subsonic flight, pressure disturbances travel forward at the local speed of sound (a = √(γRT)), warning oncoming air molecules to part smoothly around the wing.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          Once an aircraft accelerates past Mach 1, it outruns its own acoustic pressure waves. The air cannot adjust upstream. Instead, air molecules collide abruptly against the aircraft geometry, creating a discontinuous shock wave.
        </p>

        {/* Governing Equation Box */}
        <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span>Mach Number Definition</span>
            <span>M = V / a</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Normal Shock Pressure Ratio (Rankine-Hugoniot)</span>
            <span>p₂ / p₁ = 1 + (2γ / (γ + 1)) × (M₁² - 1)</span>
          </div>
        </div>
      </section>

      {/* Physics Section 2: Wave Drag */}
      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#0b1c13] p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-serif">
          2. Wave Drag: The Thermodynamic Toll
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          As air passes through a shock wave, entropy increases violently. Total pressure drops, and kinetic energy is converted permanently into thermal heat. This irreversible energy loss manifests as a massive new aerodynamic resistance: <strong className="text-white">Wave Drag (C_Dw)</strong>.
        </p>

        <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300">
          <EvidenceClaim evidenceId="ev-delta-wing" evidence={concorde.evidence}>
            Wave Drag scales inversely with the cosine of the wing sweep angle: C_Dw ∝ (t/c)² / √(M² - 1)
          </EvidenceClaim>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          To minimize this drag, supersonic designers must enforce two geometric rules: make the airfoil razor-thin (t/c ≈ 3%), and sweep the wing sharply back so the leading edge resides behind the Mach cone angle μ = arcsin(1/M).
        </p>
      </section>

      {/* Physics Section 3: SBLI & Kinetic Heating */}
      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#0b1c13] p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-serif">
          3. Stagnation Temperature & Kinetic Heating
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Bringing high-speed air to a dead stop at leading edges compresses the fluid adiabatically, driving temperatures up according to the total temperature formula:
        </p>

        <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-1">
          <div>T₀ = T_ambient × (1 + ((γ - 1) / 2) × M²)</div>
          <div className="text-slate-400">For air (γ = 1.4): T₀ = T_ambient × (1 + 0.2 × M²)</div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          <EvidenceClaim evidenceId="ev-heating" evidence={concorde.evidence}>
            At Mach 2.04 and 60,000 ft (ambient -56.5°C = 216.65 K), total stagnation temperature reaches 400 K (127°C)
          </EvidenceClaim>
          . This sets the structural ceiling for aluminum alloys.
        </p>
      </section>

      {/* Proof & Application Callout: Concorde */}
      <section className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-[#0c2618] to-[#07170f] p-8 shadow-2xl space-y-6">
        <div>
          <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
            Physics in Practice · Proof Case
          </span>
          <h3 className="text-2xl font-bold text-white font-serif mt-1">
            See Concorde as the Physical Embodiment of These Equations
          </h3>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Every geometric feature of Concorde — its 63° ogival delta sweep, its 3% ultra-thin airfoil, its 13-tank fuel trim system, and its pure turbojet engines — was mathematically demanded by the supersonic physics explained above.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/aircraft/concorde"
            className="px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-colors inline-flex items-center gap-2"
          >
            <span>Inspect Concorde Airframe Blueprint</span>
            <span>→</span>
          </Link>
          <Link
            href="/lab/kinetic-heating"
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors border border-white/10"
          >
            Open Kinetic Heating Lab →
          </Link>
        </div>
      </section>
    </div>
  )
}
