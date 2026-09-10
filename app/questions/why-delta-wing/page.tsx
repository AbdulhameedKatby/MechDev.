import React from 'react'
import Link from 'next/link'
import DepthTabs from '../../../components/DepthTabs'
import EvidenceClaim from '../../../components/EvidenceClaim'
import concorde from '../../../content/concorde'

export default function WhyDeltaWingPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      {/* Breadcrumb & Header */}
      <div>
        <Link
          href="/questions"
          className="text-xs font-mono text-emerald-400 hover:underline mb-2 inline-block"
        >
          ← Back to All Questions
        </Link>
        <div className="text-xs uppercase font-mono text-slate-400">
          Investigation 01 · Fluid Dynamics
        </div>
        <h1 className="text-4xl font-extrabold text-white font-serif mt-1">
          Why did Concorde need a delta wing?
        </h1>
        <p className="mt-2 text-slate-300">
          The single design question that unlocks supersonic aerodynamics, structural trade-offs, and engine integration.
        </p>
      </div>

      {/* 3-Layer Progressive Disclosure */}
      <DepthTabs
        discover={
          <div className="space-y-6 text-slate-200">
            <div className="text-lg leading-relaxed font-serif text-white">
              At Mach 2, something catastrophic happens to a normal wing.
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              A powerful shock wave forms on the upper surface. The sudden pressure jump forces the boundary layer to detach from the wing. Lift disappears completely, and drag spikes exponentially.
            </p>

            {/* Shock wave vs Vortex Visual */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="rounded-xl border border-red-500/30 bg-[#160b0b] p-4 text-center space-y-2">
                <span className="text-xs font-mono text-red-400 font-bold block">
                  Conventional Swept Wing (Mach 2)
                </span>
                <svg viewBox="0 0 300 120" className="w-full h-28">
                  {/* Wing profile */}
                  <path d="M 20 80 Q 80 30 180 60 L 280 80 Z" fill="#2d3748" />
                  {/* Shock wave */}
                  <line x1="140" y1="10" x2="160" y2="80" stroke="#ef4444" strokeWidth="3" strokeDasharray="4 2" />
                  <text x="175" y="30" fill="#ef4444" fontSize="10" fontFamily="monospace">Normal Shock</text>
                  {/* Detached flow */}
                  <path d="M 165 60 Q 200 20 260 30 Q 280 40 290 80" fill="none" stroke="#f87171" strokeWidth="2" strokeDasharray="2 2" />
                  <text x="220" y="55" fill="#fca5a5" fontSize="9" fontFamily="monospace">Separation Bubble</text>
                </svg>
                <p className="text-[11px] text-red-200/80">
                  Shock-boundary layer separation causes complete loss of lift.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-[#0b1a11] p-4 text-center space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold block">
                  Concorde Ogival Delta Wing (Mach 2)
                </span>
                <svg viewBox="0 0 300 120" className="w-full h-28">
                  {/* Delta planform slice */}
                  <polygon points="40,80 200,20 280,80" fill="#0f2b1d" stroke="#0e9954" strokeWidth="1.5" />
                  {/* Leading edge vortex spiral */}
                  <path d="M 100 60 Q 140 30 180 50 Q 220 70 260 40" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                  <circle cx="210" cy="50" r="16" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                  <text x="210" y="53" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">Vortex Core</text>
                </svg>
                <p className="text-[11px] text-emerald-200/80">
                  Coiling leading-edge vortex re-energizes boundary layer.
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              <EvidenceClaim evidenceId="ev-delta-wing" evidence={concorde.evidence}>
                The delta wing creates a continuous high-energy vortex along its sharp leading edge
              </EvidenceClaim>
              . This vortex pulls fresh air down onto the wing, preventing the boundary layer from separating even behind supersonic shock waves.
            </p>
          </div>
        }
        understand={
          <div className="space-y-6 text-slate-200">
            <h3 className="text-lg font-bold text-white font-serif">
              The Physics of Shock-Boundary Layer Interaction (SBLI)
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              When supersonic flow encounters an adverse pressure gradient (such as an oblique or normal shock on a wing surface), the low-momentum fluid inside the boundary layer cannot overcome the sudden pressure rise:
            </p>

            <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
              <div>Δp_shock ≈ (2γ / (γ + 1)) × (M₁² - 1) × p₁</div>
              <div className="text-slate-400">
                At Mach 2.04, the static pressure doubles across the shock in less than 1 millimeter.
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-300">
              The delta planform solves this by shedding a strong vortex from the highly swept leading edge (sweep angle Λ = 63°). The vortex strength scales with:
            </p>

            <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300">
              Γ_vortex ∝ V_infinity × c × tan(α) × cos(Λ)
            </div>

            <p className="text-sm leading-relaxed text-slate-300">
              This suction peak generates what aerodynamicists term <strong className="text-white">&ldquo;vortex lift&rdquo;</strong>, allowing Concorde to maintain stable controllable flight all the way up to Mach 2.04 cruise.
            </p>
          </div>
        }
        investigate={
          <div className="space-y-6 text-slate-200">
            <h3 className="text-lg font-bold text-white font-serif">
              NASA Wind Tunnel Data & Geometric Parameters
            </h3>

            <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#07150e]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase">
                    <th className="p-3">Specification Parameter</th>
                    <th className="p-3">Concorde Value</th>
                    <th className="p-3">Boeing 747 Reference</th>
                    <th className="p-3">Primary Source Document</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  <tr>
                    <td className="p-3 text-white font-semibold">Aspect Ratio (AR)</td>
                    <td className="p-3 text-emerald-400 font-bold">1.83</td>
                    <td className="p-3 text-slate-400">7.7</td>
                    <td className="p-3">BAC Tech Spec WB.180</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Leading Edge Sweep</td>
                    <td className="p-3 text-emerald-400 font-bold">63° (Ogival)</td>
                    <td className="p-3 text-slate-400">37.5°</td>
                    <td className="p-3">NASA TN D-4607</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Planform Area</td>
                    <td className="p-3 text-emerald-400 font-bold">358.25 m²</td>
                    <td className="p-3 text-slate-400">511 m²</td>
                    <td className="p-3">BAC Operations Manual</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Cruise Lift-to-Drag (L/D)</td>
                    <td className="p-3 text-amber-400 font-bold">7.1 (Mach 2)</td>
                    <td className="p-3 text-slate-400">17.5 (Mach 0.84)</td>
                    <td className="p-3">Lush & Wilby AIAA 74-32</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 text-xs text-amber-200 leading-relaxed">
              <span className="font-bold text-amber-300">Model Limitation & Disclaimers:</span> Wind tunnel measurements from NASA TN D-4607 indicated that canard configurations produced higher peak L/D in clean air, but created severe downwash ingestion problems into the Olympus turbojet inlets, making the pure delta wing the only viable integrated solution.
            </div>
          </div>
        }
      />

      {/* Cross Links to Aircraft Page & Labs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
        <Link
          href="/aircraft/concorde"
          className="rounded-xl border border-white/10 bg-[#0b1c13] p-5 hover:border-emerald-500/40 transition-colors flex flex-col justify-between"
        >
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase">Next In Airframe</span>
            <h4 className="text-base font-bold text-white mt-1">Concorde Full Aircraft Deep-Dive</h4>
            <p className="text-xs text-slate-400 mt-1">Inspect fuel transfer, Olympus 593 turbojets, and 127°C kinetic heating.</p>
          </div>
          <span className="mt-4 text-xs font-mono text-emerald-400">Explore Aircraft Blueprint →</span>
        </Link>

        <Link
          href="/lab/aspect-ratio"
          className="rounded-xl border border-white/10 bg-[#0b1c13] p-5 hover:border-emerald-500/40 transition-colors flex flex-col justify-between"
        >
          <div>
            <span className="text-xs font-mono text-sky-400 uppercase">Simulate in Lab</span>
            <h4 className="text-base font-bold text-white mt-1">Aspect Ratio ↔ Induced Drag Lab</h4>
            <p className="text-xs text-slate-400 mt-1">Change AR from 1.83 to 10.2 and see drag spike in real-time.</p>
          </div>
          <span className="mt-4 text-xs font-mono text-sky-400">Launch Interactive Lab →</span>
        </Link>
      </div>
    </div>
  )
}
