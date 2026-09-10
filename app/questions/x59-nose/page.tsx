import React from 'react'
import Link from 'next/link'
import DepthTabs from '../../../components/DepthTabs'

export default function X59NosePage() {
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
          Investigation 03 · Acoustics & Aerodynamics
        </div>
        <h1 className="text-4xl font-extrabold text-white font-serif mt-1">
          Why is the NASA X-59&apos;s nose nearly 30 feet long?
        </h1>
        <p className="mt-2 text-slate-300">
          The acoustic engineering of the QueSST — preventing N-wave sonic boom coalescence through spatial shock wave separation.
        </p>
      </div>

      <DepthTabs
        discover={
          <div className="space-y-6 text-slate-200">
            <div className="text-lg leading-relaxed font-serif text-white">
              Every supersonic aircraft creates a sonic boom. The X-59 is engineered to make it a soft thump instead.
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              When an aircraft breaks the sound barrier, it doesn&apos;t produce one boom — it produces dozens of shock waves: from the nose, canopy, engine inlets, wing leading edges, and tail. At typical supersonic cruise altitude, all these shocks travel the same distance to the ground, arrive at nearly the same time, and <strong className="text-white">coalesce</strong> into a single powerful N-wave — the double-bang sonic boom that rattled windows and led to the FAA ban on overland supersonic flight in 1973.
            </p>

            {/* N-wave vs Shaped wave comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="rounded-xl border border-red-500/30 bg-[#160b0b] p-4 space-y-2">
                <span className="text-xs font-mono text-red-400 font-bold block text-center">
                  Conventional Sonic Boom — N-Wave
                </span>
                <svg viewBox="0 0 280 120" className="w-full h-28">
                  {/* Pressure baseline */}
                  <line x1="10" y1="70" x2="270" y2="70" stroke="#475569" strokeWidth="1" />
                  {/* N-wave shape */}
                  <polyline
                    points="20,70 60,70 65,20 90,110 95,70 190,70 195,20 220,110 225,70 270,70"
                    fill="none" stroke="#ef4444" strokeWidth="2.5"
                  />
                  <text x="73" y="15" fill="#ef4444" fontSize="9" fontFamily="monospace">+ΔP</text>
                  <text x="73" y="115" fill="#ef4444" fontSize="9" fontFamily="monospace">-ΔP</text>
                  <text x="100" y="85" fill="#fca5a5" fontSize="8" fontFamily="monospace">Boom 1</text>
                  <text x="195" y="85" fill="#fca5a5" fontSize="8" fontFamily="monospace">Boom 2</text>
                  {/* Ambient label */}
                  <text x="10" y="65" fill="#475569" fontSize="8" fontFamily="monospace">P∞</text>
                </svg>
                <p className="text-[11px] text-red-200/80 text-center">
                  Two sharp pressure spikes, 70–110 dBSEL. Loud double-bang.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-[#0b1a11] p-4 space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold block text-center">
                  X-59 Shaped Boom — Low-Boom Signature
                </span>
                <svg viewBox="0 0 280 120" className="w-full h-28">
                  {/* Baseline */}
                  <line x1="10" y1="70" x2="270" y2="70" stroke="#475569" strokeWidth="1" />
                  {/* Shaped wave — smooth ramp, gradual return */}
                  <path
                    d="M 20 70 Q 60 70 80 45 Q 110 28 140 38 Q 180 50 210 65 Q 235 75 260 70"
                    fill="none" stroke="#0e9954" strokeWidth="2.5"
                  />
                  <text x="80" y="22" fill="#0e9954" fontSize="9" fontFamily="monospace">Gentle ramp</text>
                  <text x="190" y="85" fill="#10b981" fontSize="8" fontFamily="monospace">Slow decay</text>
                  {/* Ambient label */}
                  <text x="10" y="65" fill="#475569" fontSize="8" fontFamily="monospace">P∞</text>
                </svg>
                <p className="text-[11px] text-emerald-200/80 text-center">
                  Gradual pressure rise, ~75 PLdB. Sounds like a car door closing.
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              The X-59&apos;s 9-meter (29.5 ft) nose is the primary tool for <strong className="text-white">shock wave sequencing</strong>. By elongating the forebody to an extreme fineness ratio, the nose bow shock is spatially separated from every other shock on the airframe — they arrive at the ground spread over time, producing a gentle pressure ramp rather than a sharp spike.
            </p>
          </div>
        }
        understand={
          <div className="space-y-6 text-slate-200">
            <h3 className="text-lg font-bold text-white font-serif">
              N-Wave Formation and the Coalescence Problem
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              The N-wave is a result of shock wave coalescence in the atmosphere below the aircraft. Each discrete shock from the airframe travels downward at slightly different angles, but the atmosphere acts as a lens — refraction due to temperature gradients bends all shocks toward the ground at nearly the same angle. At typical cruise altitudes, the <strong className="text-white">coalescence distance</strong> (where shocks merge) is:
            </p>

            <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
              <div>L_coal ≈ (2 × h²) / (x_sep)</div>
              <div className="text-slate-400">
                Where h = altitude (ft), x_sep = longitudinal shock separation distance (ft)
              </div>
              <div className="text-slate-400 pt-1">
                For Concorde at 60,000 ft, x_sep ≈ 30 ft → L_coal ≈ 240,000,000 ft (shocks merge long before ground)
              </div>
              <div className="text-emerald-400 pt-1">
                For X-59 at 55,000 ft, x_sep ≈ 75 ft → L_coal &gt; ground distance (shocks never fully merge)
              </div>
            </div>

            <h3 className="text-lg font-bold text-white font-serif pt-2">
              The Fineness Ratio Solution
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              The nose fineness ratio (length / max diameter) determines both the shock wave angle and the longitudinal position of the bow shock relative to other shocks. The X-59 achieves:
            </p>

            <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
              <div>Fineness Ratio = L_nose / D_fuselage ≈ 29.5 ft / 5.5 ft ≈ 5.36</div>
              <div className="text-slate-400">
                Concorde nose FR ≈ 1.6 — produces bow shock within 20 ft of other shocks.
              </div>
              <div className="text-slate-400 pt-1">
                Higher FR → lower bow shock angle (μ) → shock hits ground further ahead of subsequent shocks.
              </div>
            </div>

            <h3 className="text-lg font-bold text-white font-serif pt-2">
              Sears-Haack Optimal Body Theory
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              The X-59&apos;s entire forebody cross-section area distribution follows the Sears-Haack minimization — the body shape that produces minimum wave drag for a given volume. The area rule formulation:
            </p>

            <div className="rounded-xl bg-[#06110a] p-4 border border-sky-500/20 font-mono text-xs text-sky-300 space-y-2">
              <div>D_wave_min = (128π / 3) × (A_max²) / L²   [Sears-Haack, 1947]</div>
              <div className="text-slate-400 pt-1">
                The long nose maximizes L, minimizing both wave drag and shock strength simultaneously.
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-300">
              The pilot cannot see the runway over the nose during landing — the cockpit uses a <strong className="text-white">synthetic vision system</strong> (eVision camera + HUD overlay) instead of a forward window. The nose is literally too long to see past.
            </p>
          </div>
        }
        investigate={
          <div className="space-y-6 text-slate-200">
            <h3 className="text-lg font-bold text-white font-serif">
              X-59 QueSST vs. Predecessor Aircraft — Boom Comparison
            </h3>

            <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#06110a]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase">
                    <th className="p-3">Aircraft</th>
                    <th className="p-3">Nose Length</th>
                    <th className="p-3">Boom Level (PLdB)</th>
                    <th className="p-3">Fineness Ratio</th>
                    <th className="p-3">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  <tr>
                    <td className="p-3 text-white font-semibold">NASA X-59 QueSST</td>
                    <td className="p-3 text-emerald-400 font-bold">9.0 m (29.5 ft)</td>
                    <td className="p-3 text-emerald-400 font-bold">~75 PLdB</td>
                    <td className="p-3 text-emerald-400">5.36</td>
                    <td className="p-3">NASA TM-2020-5001578</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Concorde</td>
                    <td className="p-3 text-slate-400">3.6 m (11.8 ft)</td>
                    <td className="p-3 text-red-400 font-bold">105 PLdB</td>
                    <td className="p-3 text-slate-400">1.6</td>
                    <td className="p-3">CAA Paper 73029</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">F/A-18 Hornet (ref.)</td>
                    <td className="p-3 text-slate-400">1.2 m (3.9 ft)</td>
                    <td className="p-3 text-red-400 font-bold">~110 PLdB</td>
                    <td className="p-3 text-slate-400">0.9</td>
                    <td className="p-3">FAR Part 91 Appendix B</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Boom Overture (target)</td>
                    <td className="p-3 text-slate-400">Classified</td>
                    <td className="p-3 text-amber-400">~85 PLdB (est.)</td>
                    <td className="p-3 text-slate-400">~3.5 est.</td>
                    <td className="p-3">Boom Supersonic EIS doc</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Human outdoor ambient</td>
                    <td className="p-3 text-slate-400">—</td>
                    <td className="p-3 text-slate-300">~72 PLdB (city)</td>
                    <td className="p-3 text-slate-400">—</td>
                    <td className="p-3">EPA noise standards</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl border border-sky-500/30 bg-sky-950/20 text-xs text-sky-200 leading-relaxed">
              <span className="font-bold text-sky-300">Community Acceptance Testing: </span>
              The X-59&apos;s Low-Boom Flight Demonstrator (LBFD) program plans overflights of multiple US communities with ground-based sound measurement arrays and community surveys. The goal is to provide the FAA with data to revise 14 CFR Part 91 — which currently prohibits all civil supersonic flight over land — by demonstrating that shaped booms at ~75 PLdB are socially acceptable.
            </div>

            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 text-xs text-amber-200 leading-relaxed">
              <span className="font-bold text-amber-300">Model Limitation & Disclaimers: </span>
              PLdB (Perceived Level in decibels) is a frequency-weighted metric specifically designed for impulsive boom assessment. The 75 PLdB target is a design goal at ISA conditions — atmospheric humidity, temperature inversions, and turbulence can significantly alter ground-level boom signatures. Lockheed Martin&apos;s CFD-based boom propagation models use a combination of PCBoom6 and in-house solvers validated against F-18 QSTA tests.
            </div>
          </div>
        }
      />

      {/* Cross Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
        <Link
          href="/lab/mach-number"
          className="rounded-xl border border-white/10 bg-[#07111d] p-5 hover:border-sky-500/40 transition-colors flex flex-col justify-between"
        >
          <div>
            <span className="text-xs font-mono text-sky-400 uppercase">Simulate in Lab</span>
            <h4 className="text-base font-bold text-white mt-1">Mach Number & Shock Angle Lab</h4>
            <p className="text-xs text-slate-400 mt-1">Vary Mach number and see how Mach cone angle changes — the same physics that shapes the X-59 boom footprint.</p>
          </div>
          <span className="mt-4 text-xs font-mono text-sky-400">Launch Interactive Lab →</span>
        </Link>

        <Link
          href="/questions/why-delta-wing"
          className="rounded-xl border border-white/10 bg-[#0b1c13] p-5 hover:border-emerald-500/40 transition-colors flex flex-col justify-between"
        >
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase">Related Investigation</span>
            <h4 className="text-base font-bold text-white mt-1">Why did Concorde need a delta wing?</h4>
            <p className="text-xs text-slate-400 mt-1">The earlier approach to supersonic aerodynamics — and why it produced 105 PLdB booms.</p>
          </div>
          <span className="mt-4 text-xs font-mono text-emerald-400">Read Investigation 01 →</span>
        </Link>
      </div>
    </div>
  )
}
