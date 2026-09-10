import React from 'react'
import Link from 'next/link'

export default function StructuralScalingConceptPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-12">
      {/* Header */}
      <div>
        <Link href="/concepts" className="text-xs font-mono text-[#0e9954] hover:underline mb-2 inline-block">
          ← Back to All Concepts
        </Link>
        <div className="text-xs uppercase font-mono text-slate-400">
          Concept 07 · Structural Mechanics & Materials
        </div>
        <h1 className="text-4xl font-extrabold text-white font-serif mt-1">
          Structural Scaling & Pressurization Fatigue
        </h1>
        <p className="mt-2 text-slate-300 text-lg">
          How fuselage radius scales wall tension, and the catastrophic historical lessons of metal fatigue.
        </p>
      </div>

      {/* Section 1 */}
      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#07032a] p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-serif">
          1. Thin-Walled Pressure Vessels: Hoop vs. Longitudinal Stress
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          An airliner fuselage cruising at high altitude is a giant pressure vessel containing ~0.75 bar internal cabin pressure against thin external atmosphere.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          Internal pressure creates two primary stress components in the aluminum skin: <strong className="text-white">Hoop Stress (σ_hoop)</strong> acting circumferentially around the fuselage, and <strong className="text-white">Longitudinal Stress (σ_long)</strong> acting along the length. Hoop stress is exactly double longitudinal stress!
        </p>

        <div className="rounded-xl bg-[#040118] p-4 border border-[#0e9954]/25 font-mono text-xs text-emerald-300 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span>Hoop Stress (Circumferential)</span>
            <span className="text-[#0e9954]">σ_hoop = (ΔP × r) / t</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Longitudinal Stress (Axial)</span>
            <span className="text-sky-400">σ_long = (ΔP × r) / (2t)</span>
          </div>
          <div className="text-amber-400 pt-1">
            • Note: As fuselage radius (r) doubles from 707 (1.8m) to 747 (3.25m), hoop stress doubles for the same skin thickness!
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#07032a] p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-serif">
          2. Stress Concentration & The De Havilland Comet Lesson
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          In the 1950s, the De Havilland Comet pioneered commercial jet travel. However, early Comets suffered catastrophic mid-air breakups due to explosive pressurization decompression.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          Investigation revealed that square passenger windows created severe stress concentrations ($K_t \approx 3.0$) at the sharp square corners. Cyclic pressurization (takeoff to cruise to landing) caused micro-cracks to initiate at rivet holes near the window corners and propagate rapidly through fatigue.
        </p>

        <div className="rounded-xl bg-[#040118] p-4 border border-amber-500/25 font-mono text-xs text-amber-300 space-y-2">
          <div>Inglis Stress Concentration: K_t = 1 + 2 × √(a / ρ)</div>
          <div className="text-slate-400">Square window corners (small radius ρ) → K_t ≈ 3.0 (Triples local stress!)</div>
          <div className="text-[#0e9954]">Modern Round / Oval Windows → K_t ≈ 1.1 (Smooth stress flow)</div>
        </div>
      </section>

      {/* Navigation */}
      <div className="pt-6 border-t border-white/10 flex justify-between text-xs font-mono">
        <Link href="/questions/boeing-747" className="text-[#0e9954] hover:underline">
          ← See Boeing 747 Structural Investigation
        </Link>
        <Link href="/lab/structural-stress" className="text-[#0e9954] hover:underline">
          Launch Structural Stress Lab →
        </Link>
      </div>
    </div>
  )
}
