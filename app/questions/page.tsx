import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Aircraft Engineering Questions | Investigations',
  description: 'Investigate why aircraft use delta wings, lift fans, composite structures, swept wings, fly-by-wire, and other engineering solutions.',
  alternates: { canonical: '/questions' },
}

export default function QuestionsIndexPage() {
  const questions = [
    {
      id: 'why-delta-wing',
      num: '01',
      discipline: 'Fluid Dynamics',
      aircraft: 'Concorde',
      title: 'Why did Concorde need a delta wing?',
      desc: 'At Mach 2, shock-boundary layer interactions cause flow separation on conventional wings. Discover the leading-edge vortex mechanism.',
      active: true,
      href: '/questions/why-delta-wing',
    },
    {
      id: 'f35-hover',
      num: '02',
      discipline: 'Propulsion & VTOL',
      aircraft: 'F-35B Lightning II',
      title: 'How does the F-35B hover without melting runways?',
      desc: 'Lift fan shaft horsepower, 3BSD variable vectoring nozzles, and ground thermal erosion mechanics.',
      active: true,
      href: '/questions/f35b-hover',
    },
    {
      id: 'x59-nose',
      num: '03',
      discipline: 'Acoustics & Aerodynamics',
      aircraft: 'NASA X-59 QueSST',
      title: "Why is the NASA X-59's nose nearly 30 feet long?",
      desc: 'Preventing coalescing N-wave sonic booms through spatial shock wave separation and low-boom shaping.',
      active: true,
      href: '/questions/x59-nose',
    },
    {
      id: 'a350-range',
      num: '04',
      discipline: 'Structures & Composites',
      aircraft: 'Airbus A350-1000',
      title: 'How does the A350-1000 fly 8,700 nautical miles efficiently?',
      desc: 'Variable camber adaptive wings, ultra-high bypass Trent XWB engines, and 53% CFRP composite mass fractions.',
      active: true,
      href: '/questions/a350-efficiency',
    },
    {
      id: 'boeing-747',
      num: '05',
      discipline: 'Structural Engineering',
      aircraft: 'Boeing 747-400',
      title: 'How did the 747 change aviation with efficiency at scale?',
      desc: 'The wide-body revolution, high-bypass JT9D turbofans, hoop stress management, and transatlantic economics.',
      active: true,
      href: '/questions/boeing-747',
    },
    {
      id: 'cessna-172',
      num: '06',
      discipline: 'Stability & Control',
      aircraft: 'Cessna 172 Skyhawk',
      title: 'Why is the Cessna 172 the most forgiving aircraft ever built?',
      desc: 'High-wing pendulum stability, wing washout with docile root-first stalls, and gentle wing loading physics.',
      active: true,
      href: '/questions/cessna-172',
    },
    {
      id: 'f16-falcon',
      num: '07',
      discipline: 'Flight Control Systems',
      aircraft: 'F-16 Fighting Falcon',
      title: 'Why does the F-16 need a computer to fly?',
      desc: 'Relaxed static stability, fly-by-wire quad-redundant control laws, and 9G instantaneous turning dynamics.',
      active: true,
      href: '/questions/f16-falcon',
    },
    {
      id: 'sr71-blackbird',
      num: '08',
      discipline: 'Thermal Management',
      aircraft: 'SR-71 Blackbird',
      title: 'How does the SR-71 survive Mach 3.2 when the airframe reaches 300°C?',
      desc: 'Beta-titanium alloys, fuel-as-heat-sink circulation loops, and variable spike supersonic inlet shock recovery.',
      active: true,
      href: '/questions/sr71-blackbird',
    },
    {
      id: 'harrier-vtol',
      num: '09',
      discipline: 'Propulsion & VTOL',
      aircraft: 'Harrier Jump Jet',
      title: 'How does the Harrier take off vertically and cruise at 550 knots?',
      desc: 'Pegasus four-nozzle thrust vectoring, hover reaction control puffer jets, and the aerodynamic transition envelope.',
      active: true,
      href: '/questions/harrier-vtol',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-[#0e9954] font-bold mb-2">
          Investigation Library · 9 Complete Blueprints
        </div>
        <h1 className="text-4xl font-extrabold text-white font-serif">
          Engineering Questions
        </h1>
        <p className="mt-2 text-slate-300">
          Start with a provocative design paradox. Unpack the governing fluid mechanics, structural equations, and empirical flight certification evidence.
        </p>
      </div>

      <div className="space-y-4">
        {questions.map((q) => (
          <div
            key={q.id}
            className="rounded-2xl border border-white/10 bg-[#07032a] p-6 transition-all duration-150 hover:border-[#0e9954]/50 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="font-mono text-xl font-extrabold text-[#0e9954]">
                  {q.num}
                </span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                      {q.discipline}
                    </span>
                    <span className="text-[10px] font-mono text-[#0e9954] font-semibold">
                      {q.aircraft}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white font-serif">
                    {q.title}
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                    {q.desc}
                  </p>
                </div>
              </div>

              <Link
                href={q.href}
                className="self-start sm:self-center px-4 py-2 rounded-xl bg-[#0e9954] text-white font-bold text-xs hover:bg-[#0c8046] transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shadow-[0_0_15px_rgba(14,153,84,0.3)]"
              >
                <span>Investigate</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
