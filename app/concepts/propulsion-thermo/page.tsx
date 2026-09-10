import React from 'react'
import Link from 'next/link'

export default function PropulsionThermodynamicsConceptPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      <div>
        <Link href="/concepts" className="text-xs font-mono text-emerald-400 hover:underline mb-2 inline-block">&lt;- Back to All Concepts</Link>
        <div className="text-xs uppercase font-mono text-slate-400">Concept 03 - Propulsion Thermodynamics</div>
        <h1 className="text-4xl font-extrabold text-white font-serif mt-1">Gas Turbine Thermodynamics</h1>
        <p className="mt-2 text-slate-300 text-lg">How an engine trades pressure, temperature, mass flow, and velocity for useful thrust.</p>
      </div>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#0b1c13] p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-serif">1. The Brayton cycle in four processes</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          A turbojet or turbofan approximates the open Brayton cycle: the inlet slows and compresses the air, the compressor raises its pressure, the combustor adds heat at roughly constant pressure, and the turbine extracts just enough work to drive the compressor. The remaining gas expands through the nozzle and leaves with momentum.
        </p>
        <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
          <div>Ideal compressor relation: T2/T1 = (p2/p1)^((gamma-1)/gamma)</div>
          <div>Net shaft work: W_net = W_turbine - W_compressor</div>
          <div className="text-slate-400">Thrust: F = mdot (V_exit - V_inlet) + (p_exit - p_ambient) A_exit</div>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#0b1c13] p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-serif">2. Ram compression is free pressure, with a limit</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Flight speed turns kinetic energy into stagnation pressure and temperature before the compressor sees the air. At supersonic speed, the inlet must use shocks, ramps, or cones to compress the flow gradually enough to preserve total pressure. Every shock creates entropy and reduces the pressure available to the core.
        </p>
        <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
          <div>Stagnation temperature: T0/T = 1 + ((gamma - 1)/2) M^2</div>
          <div>Compressor pressure ratio: pi_c = p3 / p2</div>
          <div className="text-slate-400">Higher pi_c improves ideal efficiency until cooling, work, and surge margin dominate.</div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          A variable-geometry inlet changes ramp angle, throat area, or bleed flow as Mach number changes. Its job is to position shocks correctly, start the inlet, and deliver stable subsonic air to the compressor instead of allowing unsteady shock motion to trigger a stall.
        </p>
      </section>

      <section className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-[#0c2618] to-[#07170f] p-8 shadow-2xl space-y-5">
        <div>
          <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">Design trade-off</span>
          <h2 className="text-2xl font-bold text-white font-serif mt-1">Pressure ratio is valuable only when the flow stays stable</h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Compressor blades operate inside a narrow map bounded by surge and choke. Throttle changes, inlet distortion, altitude, and aircraft maneuvers move the operating point. Bleed valves, variable stator vanes, and control schedules protect the margin while the engine still produces the requested thrust.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/lab/bypass-ratio" className="px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-colors">Open Bypass Ratio Lab -&gt;</Link>
          <a href="https://www.grc.nasa.gov/www/k-12/airplane/thermo.html" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors border border-white/10">NASA thermodynamics notes -&gt;</a>
        </div>
      </section>

      <div className="text-xs text-slate-500 font-mono border-t border-white/10 pt-5">
        Further reading: <a className="text-emerald-400 hover:underline" href="https://www.grc.nasa.gov/www/k-12/airplane/thermo.html" target="_blank" rel="noopener noreferrer">NASA Glenn thermodynamics</a> and <a className="text-emerald-400 hover:underline" href="https://www.grc.nasa.gov/www/k-12/airplane/ramjet.html" target="_blank" rel="noopener noreferrer">NASA ramjet and inlet overview</a>.
      </div>
    </div>
  )
}