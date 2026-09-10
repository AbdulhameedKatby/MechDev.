import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Aerospace Concepts | Aerodynamics, Propulsion & Structures',
  description: 'Learn the physics behind aircraft design through supersonic aerodynamics, boundary layers, propulsion, aeroelasticity, fly-by-wire, VTOL, and structures.',
  alternates: { canonical: '/concepts' },
}

export default function ConceptsIndexPage() {
  const concepts = [
    {
      id: 'supersonic-aerodynamics',
      num: '01',
      title: 'Supersonic Aerodynamics & Shock Waves',
      desc: 'Oblique shocks, normal shocks, expansion fans, and shock-boundary layer interaction (SBLI).',
      detail: 'What happens when air cannot get out of the way before an aircraft arrives.',
      href: '/concepts/supersonic-aerodynamics',
    },
    {
      id: 'boundary-layer',
      num: '02',
      title: 'Boundary Layer Theory & Laminar-Turbulent Transition',
      desc: 'Skin friction drag, velocity profiles, adverse pressure gradients, and separation points.',
      detail: 'Why the thinnest layer of air around a vehicle controls drag, lift, and stall.',
      href: '/concepts/boundary-layer',
    },
    {
      id: 'propulsion-thermo',
      num: '03',
      title: 'Gas Turbine Thermodynamics & Ram Compression',
      desc: 'Brayton cycles, total temperature rise, compressor stall margins, and variable geometry inlets.',
      detail: 'How pressure ratio, temperature, and inlet design turn a stream of air into thrust.',
      href: '/concepts/propulsion-thermo',
    },
    {
      id: 'aeroelasticity',
      num: '04',
      title: 'Aeroelasticity, Flutter & Thermal Stress',
      desc: 'Torsional divergence, structural stiffness matrices, and thermal expansion cycling.',
      detail: 'Why wings bend, engines move, and temperature can change the loads a structure must survive.',
      href: '/concepts/aeroelasticity',
    },
    {
      id: 'fly-by-wire',
      num: '05',
      title: 'Fly-by-Wire & Relaxed Static Stability',
      desc: 'Negative static margin, pitch rate feedback control laws, and quad-redundant flight computers.',
      detail: 'How intentionally designing an aircraft to be unstable created extreme combat agility.',
      href: '/concepts/fly-by-wire',
    },
    {
      id: 'vtol-mechanics',
      num: '06',
      title: 'VTOL Physics & Vectored Thrust Mechanics',
      desc: 'Actuator disk momentum theory, hot gas recirculation, and hover reaction puffer jet control.',
      detail: 'The severe thermodynamic and aerodynamic trade-offs of jet-borne vertical takeoff.',
      href: '/concepts/vtol-mechanics',
    },
    {
      id: 'structural-scaling',
      num: '07',
      title: 'Structural Scaling & Pressurization Fatigue',
      desc: 'Thin-walled cylinder hoop stress, Inglis stress concentration factors, and CFRP composites.',
      detail: 'How fuselage radius scales skin tension, and the historical lessons of metal fatigue.',
      href: '/concepts/structural-scaling',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-[#0e9954] font-bold mb-2">
          Physics Principles · 7 Core Modules
        </div>
        <h1 className="text-4xl font-extrabold text-white font-serif">
          Aerospace Concepts
        </h1>
        <p className="mt-2 text-slate-300">
          Understand the governing equations and physical phenomena before looking at the aircraft designed to exploit them.
        </p>
      </div>

      <div className="space-y-4">
        {concepts.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-white/10 bg-[#07032a] p-6 transition-all duration-150 hover:border-[#0e9954]/50 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="font-mono text-xl font-extrabold text-[#0e9954]">
                  {c.num}
                </span>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-white font-serif">
                    {c.title}
                  </h2>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed max-w-xl">
                    {c.desc}
                  </p>
                  {c.detail ? (
                    <p className="mt-2 text-xs text-[#0e9954]/90 font-mono leading-relaxed max-w-xl">
                      {c.detail}
                    </p>
                  ) : null}
                </div>
              </div>

              <Link
                href={c.href}
                className="self-start sm:self-center px-4 py-2 rounded-xl bg-[#0e9954] text-white font-bold text-xs hover:bg-[#0c8046] transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shadow-[0_0_15px_rgba(14,153,84,0.3)]"
              >
                <span>Learn Concept</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
