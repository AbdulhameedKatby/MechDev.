'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'

const TIMELINE = [
  {
    year: '1938',
    aircraft: 'Piper Cub J-3',
    milestone: 'Fabric & Tube Construction',
    desc: 'Steel tube fuselage with fabric skin. Bernoulli lift at 56 mph cruise. The aerodynamic baseline for every modern wing.',
    mach: 'Mach 0.08',
    slug: 'piper-cub',
    color: 'border-slate-400/40 text-slate-300',
    dot: 'bg-slate-400',
  },
  {
    year: '1947',
    aircraft: 'Bell X-1',
    milestone: 'Mach 1 Barrier Broken',
    desc: 'Chuck Yeager first breaks M=1 in level flight. Bullet-shaped fuselage, thin symmetrical wings suppress the transonic shock drag divergence.',
    mach: 'Mach 1.06',
    slug: 'bell-x1',
    color: 'border-amber-400/40 text-amber-300',
    dot: 'bg-amber-400',
  },
  {
    year: '1949',
    aircraft: 'De Havilland Comet',
    milestone: 'Jet Era & Fatigue Failure',
    desc: 'First commercial jet airliner. Square windows create stress concentrations that trigger catastrophic metal fatigue cycling at pressure altitude.',
    mach: 'Mach 0.78',
    slug: 'comet-failure',
    color: 'border-rose-400/40 text-rose-300',
    dot: 'bg-rose-400',
  },
  {
    year: '1964',
    aircraft: 'SR-71 Blackbird',
    milestone: 'Mach 3 Titanium Airframe',
    desc: '93% titanium construction. Inlet geometry precisely managed spike position to avoid unstart. Airframe thermally expands 30 cm at Mach 3.2 cruise.',
    mach: 'Mach 3.30',
    slug: 'sr71-blackbird',
    color: 'border-orange-400/40 text-orange-300',
    dot: 'bg-orange-400',
  },
  {
    year: '1969',
    aircraft: 'Concorde',
    milestone: 'Commercial Supersonic Cruise',
    desc: 'Ogival delta wing, variable-geometry inlets, and 13-tank fuel transfer for supersonic trim. The only commercial aircraft to sustain Mach 2+ revenue service.',
    mach: 'Mach 2.04',
    slug: 'concorde',
    color: 'border-emerald-400/40 text-emerald-300',
    dot: 'bg-emerald-400',
  },
  {
    year: '2003',
    aircraft: 'SpaceShipOne',
    milestone: 'First Private Spaceflight',
    desc: 'Feathering re-entry system provides passive aerodynamic stability without heat shields. Reaches 112 km suborbital apogee with a hybrid rocket motor.',
    mach: 'Mach 3.09',
    slug: 'spaceshipone',
    color: 'border-sky-400/40 text-sky-300',
    dot: 'bg-sky-400',
  },
  {
    year: '2021',
    aircraft: 'NASA X-59 QueSST',
    milestone: 'Quiet Supersonic Boom',
    desc: 'Elongated nose reduces shock coalescence, targeting 75 dB PLdB footprint vs 105 dB Concorde. Designed to reopen overland supersonic routes.',
    mach: 'Mach 1.42',
    slug: 'x59-nose',
    color: 'border-cyan-400/40 text-cyan-300',
    dot: 'bg-cyan-400',
  },
]

function TimelineCard({ item, index }: { item: typeof TIMELINE[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Progressive enhancement: skip on touch / reduced-motion
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || prefersReduced) return

    // Opt this card into animation (hides it until visible)
    el.style.opacity = '0'
    el.style.transform = 'translateX(-24px)'
    el.style.transition = `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateX(0)'
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className="flex gap-4 sm:gap-6"
    >
      {/* Left column: year + dot + line */}
      <div className="flex flex-col items-center gap-0 shrink-0 w-14 sm:w-20">
        <div className={`w-3.5 h-3.5 rounded-full ${item.dot} shadow-[0_0_12px_currentColor] shrink-0 mt-1`} />
        <div className="w-px flex-1 bg-gradient-to-b from-white/20 to-transparent mt-1" />
      </div>

      {/* Right column: content */}
      <Link
        href={`/aircraft/${item.slug}`}
        className={`group flex-1 rounded-2xl border ${item.color.split(' ')[0]} bg-[#07032a] hover:bg-[#09043a] p-5 mb-6 transition-all duration-200 hover:shadow-xl block`}
      >
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">
              {item.year}
            </div>
            <h3 className={`text-lg sm:text-xl font-bold font-serif group-hover:opacity-90 transition-opacity ${item.color.split(' ')[1]}`}>
              {item.aircraft}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${item.color}`}>
              {item.mach}
            </span>
          </div>
        </div>
        <div className="text-xs font-mono text-slate-300 font-bold mb-2 uppercase tracking-wider">
          {item.milestone}
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          {item.desc}
        </p>
        <div className="mt-4 flex items-center text-xs font-mono font-bold text-slate-500 group-hover:text-emerald-400 transition-colors">
          <span>Open Engineering Investigation</span>
          <span className="ml-1.5 transition-transform group-hover:translate-x-1.5">→</span>
        </div>
      </Link>
    </div>
  )
}

export default function AviationTimeline() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
            Engineering History // Chronological Archive
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif mt-1">
            From Fabric Wings to the Edge of Space
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl leading-relaxed">
            Every breakthrough was a physics problem solved under constraint. Trace the design decisions across 83 years of aviation evolution.
          </p>
        </div>
        <Link
          href="/aircraft"
          className="text-xs text-emerald-400 hover:text-emerald-300 font-mono font-bold inline-flex items-center gap-1.5 transition-colors shrink-0"
        >
          Full Archive →
        </Link>
      </div>

      {/* Timeline stack */}
      <div className="relative">
        {TIMELINE.map((item, i) => (
          <TimelineCard key={item.year} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
