import React from 'react'
import Link from 'next/link'

export default function BoundaryLayerConceptPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      <div>
        <Link href="/concepts" className="text-xs font-mono text-emerald-400 hover:underline mb-2 inline-block">
          &lt;- Back to All Concepts
        </Link>
        <div className="text-xs uppercase font-mono text-slate-400">Concept 02 - Viscous Flow</div>
        <h1 className="text-4xl font-extrabold text-white font-serif mt-1">Boundary Layer Theory</h1>
        <p className="mt-2 text-slate-300 text-lg">The thin, viscous region that decides whether a surface stays attached or lets go.</p>
      </div>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#0b1c13] p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-serif">1. No-slip creates a velocity profile</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Air at the wall has zero velocity relative to the surface. Moving away from the wall, viscous shear accelerates the flow until it is almost equal to the external velocity Ue. This region is the boundary layer; its thickness is commonly measured where u/Ue reaches 0.99.
        </p>
        <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
          <div>Wall shear: tau_w = mu (du/dy)_wall</div>
          <div>Skin-friction coefficient: C_f = tau_w / (0.5 rho Ue^2)</div>
          <div className="text-slate-400">Laminar flat plate: C_f,x = 0.664 / sqrt(Re_x)</div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Laminar flow has an orderly profile and lower skin friction, but its low momentum near the wall makes it vulnerable to disturbance. Turbulent flow mixes high-momentum air down toward the surface: it costs more friction drag, yet it usually remains attached longer.
        </p>
      </section>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#0b1c13] p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-serif">2. Pressure gradients control separation</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          A favorable pressure gradient accelerates the outer flow and helps the boundary layer. An adverse pressure gradient makes the flow climb toward higher pressure. Near the wall, low-momentum fluid can no longer move forward, so the wall shear falls to zero and then reverses: separation has begun.
        </p>
        <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
          <div>Reynolds number: Re_x = rho Ue x / mu</div>
          <div>Momentum thickness: theta = integral[(u/Ue)(1-u/Ue)] dy</div>
          <div className="text-slate-400">Separation indicator: tau_w = 0, then tau_w &lt; 0</div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Separation thickens the wake, reduces lift, and can produce buffet or stall. Designers manage it with smooth pressure recovery, leading-edge shaping, vortex generators, suction, or by accepting a controlled turbulent transition where the extra friction is worth the added attachment.
        </p>
      </section>

      <section className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-[#0c2618] to-[#07170f] p-8 shadow-2xl space-y-5">
        <div>
          <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">Design decision</span>
          <h2 className="text-2xl font-bold text-white font-serif mt-1">Low drag is not the same as attached flow</h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            A laminar wing can reduce cruise drag, but contamination, surface waviness, and pressure recovery can trigger transition early. The practical question is where the boundary layer should transition, and whether the resulting profile survives the aircraft&apos;s full operating envelope.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/lab/drag" className="px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-colors">Open Drag Lab -&gt;</Link>
          <a href="https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/boundary-layer/" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors border border-white/10">NASA boundary-layer notes -&gt;</a>
        </div>
      </section>

      <div className="text-xs text-slate-500 font-mono border-t border-white/10 pt-5">
        Further reading: <a className="text-emerald-400 hover:underline" href="https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/boundary-layer/" target="_blank" rel="noopener noreferrer">NASA Glenn boundary layers</a> and <a className="text-emerald-400 hover:underline" href="https://www.grc.nasa.gov/www/k-12/airplane/reynolds.html" target="_blank" rel="noopener noreferrer">NASA Reynolds number reference</a>.
      </div>
    </div>
  )
}