import React from 'react'
import Link from 'next/link'

export default function FlyByWireConceptPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-12">
      {/* Header */}
      <div>
        <Link href="/concepts" className="text-xs font-mono text-[#0e9954] hover:underline mb-2 inline-block">
          ← Back to All Concepts
        </Link>
        <div className="text-xs uppercase font-mono text-slate-400">
          Concept 05 · Flight Controls & Avionics
        </div>
        <h1 className="text-4xl font-extrabold text-white font-serif mt-1">
          Fly-by-Wire & Relaxed Static Stability
        </h1>
        <p className="mt-2 text-slate-300 text-lg">
          How intentionally designing an aircraft to be aerodynamically unstable unlocked extreme combat agility.
        </p>
      </div>

      {/* Section 1 */}
      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#07032a] p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-serif">
          1. Static Margin & The Physics of Aerodynamic Stability
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Conventional aircraft (like the Cessna 172 or Boeing 747) are designed with positive static stability: the Center of Gravity (CG) is located comfortably ahead of the Aerodynamic Center (AC). If a wind gust pushes the nose up, the wing lift creates a natural downward pitching moment that automatically returns the nose to level flight.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          However, positive stability imposes a heavy drag tax. The horizontal tail must continuously push downward to balance the forward CG, creating trim drag and slowing turn rates.
        </p>

        <div className="rounded-xl bg-[#040118] p-4 border border-[#0e9954]/25 font-mono text-xs text-emerald-300 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span>Static Margin Formula</span>
            <span>SM = (x_ac − x_cg) / c̄</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Stable Aircraft (Cessna 172)</span>
            <span className="text-[#0e9954]">SM &gt; 0 (+3% to +10% MAC)</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Relaxed Stability Fighter (F-16)</span>
            <span className="text-red-400">SM &lt; 0 (−5% MAC at subsonic)</span>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#07032a] p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-serif">
          2. The Divergence Catastrophe
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          In an aerodynamically unstable aircraft (SM &lt; 0), any small pitch displacement generates a nose-up moment that exponentially increases pitch rate. Left uncorrected, the aircraft will tumble out of control in less than 0.3 seconds.
        </p>

        <div className="rounded-xl bg-[#040118] p-4 border border-[#0e9954]/25 font-mono text-xs text-emerald-300 space-y-2">
          <div>Pitch Divergence: θ(t) = θ₀ × e^(λt)</div>
          <div className="text-slate-400">Where λ = instability pole. For F-16 subsonic: t_double ≈ 0.25 sec</div>
          <div className="text-red-400 pt-1">Human reaction limit (~0.20 sec) is too slow to manually prevent destruction.</div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#07032a] p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-serif">
          3. The Quad-Redundant Control Loop
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Fly-by-wire (FBW) replaces direct mechanical cables with 40Hz Flight Control Computer (FLCC) digital feedback loops. Quadruple-redundant rate gyros and accelerometers measure aircraft pitch/roll rates, and hydraulic actuators deflect control surfaces up to 40 times per second to synthesize artificial stability.
        </p>

        {/* Diagram */}
        <div className="rounded-xl border border-sky-500/30 bg-[#040118] p-4 text-center space-y-2">
          <span className="text-xs font-mono text-sky-400 font-bold block">QUAD-REDUNDANT FBW CLOSED LOOP</span>
          <svg viewBox="0 0 500 100" className="w-full h-24">
            <rect x="20" y="30" width="80" height="40" rx="8" fill="#0e9954" fillOpacity="0.2" stroke="#0e9954" strokeWidth="1.5" />
            <text x="60" y="54" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="monospace">Pilot Stick</text>

            <line x1="100" y1="50" x2="140" y2="50" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

            <rect x="140" y="20" width="100" height="60" rx="8" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="190" y="48" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace">FLCC (40Hz)</text>
            <text x="190" y="62" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">4x Voting</text>

            <line x1="240" y1="50" x2="280" y2="50" stroke="#38bdf8" strokeWidth="2" />

            <rect x="280" y="30" width="90" height="40" rx="8" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="325" y="54" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">Actuators</text>

            <line x1="370" y1="50" x2="410" y2="50" stroke="#38bdf8" strokeWidth="2" />

            <rect x="410" y="30" width="70" height="40" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
            <text x="445" y="54" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="monospace">Airframe</text>

            {/* Feedback arrow */}
            <path d="M 445 70 L 445 90 L 190 90 L 190 80" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="320" y="86" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="monospace">Rate Gyro Feedback</text>
          </svg>
        </div>
      </section>

      {/* Navigation */}
      <div className="pt-6 border-t border-white/10 flex justify-between text-xs font-mono">
        <Link href="/questions/f16-falcon" className="text-[#0e9954] hover:underline">
          ← See F-16 Unstable Design Investigation
        </Link>
        <Link href="/lab/wing-loading" className="text-[#0e9954] hover:underline">
          Launch Wing Loading Lab →
        </Link>
      </div>
    </div>
  )
}
