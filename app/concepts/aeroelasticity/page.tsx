import React from 'react'
import Link from 'next/link'

export default function AeroelasticityConceptPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      <div>
        <Link href="/concepts" className="text-xs font-mono text-emerald-400 hover:underline mb-2 inline-block">&lt;- Back to All Concepts</Link>
        <div className="text-xs uppercase font-mono text-slate-400">Concept 04 - Coupled Structures and Flow</div>
        <h1 className="text-4xl font-extrabold text-white font-serif mt-1">Aeroelasticity, Flutter &amp; Thermal Stress</h1>
        <p className="mt-2 text-slate-300 text-lg">When aerodynamic force, structural motion, and temperature become one feedback problem.</p>
      </div>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#0b1c13] p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-serif">1. Static aeroelasticity changes the shape</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Lift bends and twists a wing. That deformation changes angle of attack, which changes lift again. Bending usually increases lift, while a torsionally flexible swept wing can twist nose-down and reduce it. Divergence occurs when aerodynamic twisting overwhelms the structure&apos;s restoring stiffness.
        </p>
        <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
          <div>Structural equilibrium: [K]{String.raw`{q}`} = [F_aero]</div>
          <div>Dynamic model: [M]q_ddot + [C]q_dot + [K]q = F_aero(q, q_dot)</div>
          <div className="text-slate-400">More torsional stiffness raises the speed where divergence becomes possible.</div>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#0b1c13] p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-serif">2. Flutter is a self-excited oscillation</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Flutter couples at least two structural modes, commonly bending and torsion. A small disturbance changes the aerodynamic loads; the loads feed energy back into the motion. Below the flutter boundary, damping wins. Above it, each cycle grows until a component fails unless the flight condition changes.
        </p>
        <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
          <div>Dynamic pressure: q = 0.5 rho V^2</div>
          <div>Flutter boundary: aerodynamic energy input = structural damping loss</div>
          <div className="text-slate-400">Mass balance, stiffness, damping, and control laws all move the boundary.</div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Engineers find the boundary with ground vibration tests, unsteady aerodynamic models, and carefully instrumented flight tests. Control-surface balance weights and tuned mass or active control systems can add damping, but they must be validated across fuel states and stores configurations.
        </p>
      </section>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#0b1c13] p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-serif">3. Heat changes both material and load path</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Uneven heating makes different parts of a structure want to expand by different amounts. If constrained, that expansion becomes stress. High-speed aircraft therefore need compatible materials, sliding or flexible joints, thermal barriers, and analyses that combine temperature fields with mechanical loads.
        </p>
        <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
          <div>Free thermal strain: epsilon_th = alpha Delta T</div>
          <div>Fully restrained uniaxial stress: sigma_th approx E alpha Delta T</div>
          <div className="text-slate-400">Real structures relax through joints, plasticity, creep, and changing stiffness.</div>
        </div>
      </section>

      <section className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-[#0c2618] to-[#07170f] p-8 shadow-2xl space-y-5">
        <div>
          <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">Design principle</span>
          <h2 className="text-2xl font-bold text-white font-serif mt-1">The airframe is part of the flight-control system</h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            A stiff structure is not automatically a better one: weight, vibration, fatigue, thermal growth, and maneuver loads interact. Good aeroelastic design keeps the aircraft&apos;s important natural frequencies away from forcing frequencies and preserves predictable control response as the mission changes.
          </p>
        </div>
        <a href="https://www.nasa.gov/reference/aeroelasticity/" target="_blank" rel="noopener noreferrer" className="inline-flex w-fit px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-colors">NASA aeroelasticity reference -&gt;</a>
      </section>

      <div className="text-xs text-slate-500 font-mono border-t border-white/10 pt-5">
        Further reading: <a className="text-emerald-400 hover:underline" href="https://www.nasa.gov/reference/aeroelasticity/" target="_blank" rel="noopener noreferrer">NASA aeroelasticity reference</a> and <a className="text-emerald-400 hover:underline" href="https://ntrs.nasa.gov/" target="_blank" rel="noopener noreferrer">NASA Technical Reports Server</a>.
      </div>
    </div>
  )
}