"use client"
import React, { useEffect, useState, useRef, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// ── Full search index ────────────────────────────────────────────────
const SEARCH_INDEX = [
  // Aircraft
  { title: 'Concorde',               subtitle: 'Supersonic Delta Wing — Mach 2.04',              href: '/aircraft/concorde',           category: 'Aircraft',  icon: '✈' },
  { title: 'Boeing 747',             subtitle: 'Wide-body Jumbo Jet — Mach 0.86',                href: '/aircraft/boeing-747',         category: 'Aircraft',  icon: '✈' },
  { title: 'Cessna 172',             subtitle: 'Classic General Aviation — Mach 0.16',           href: '/aircraft/cessna-172',         category: 'Aircraft',  icon: '✈' },
  { title: 'F-16 Falcon',            subtitle: 'Multirole Fighter — Mach 2.05',                  href: '/aircraft/f16-falcon',         category: 'Aircraft',  icon: '✈' },
  { title: 'SR-71 Blackbird',        subtitle: 'Mach 3.3 Reconnaissance — Titanium Skin',        href: '/aircraft/sr71-blackbird',     category: 'Aircraft',  icon: '✈' },
  { title: 'Harrier Jump Jet',       subtitle: 'VTOL via Vector Thrust — Pegasus Engine',        href: '/aircraft/harrier-vtol',       category: 'Aircraft',  icon: '✈' },
  { title: 'Airbus A350-1000',       subtitle: '53% CFRP Airframe — 8,700 nm range',             href: '/aircraft/a350-efficiency',    category: 'Aircraft',  icon: '✈' },
  { title: 'NASA X-59',              subtitle: 'Quiet Supersonic — Shaped Sonic Boom',           href: '/aircraft/x59-nose',           category: 'Aircraft',  icon: '✈' },
  { title: 'F-35B Lightning II',     subtitle: 'STOVL Stealth Fighter — Shaft-Driven Lift Fan',  href: '/aircraft/f35b-hover',         category: 'Aircraft',  icon: '✈' },
  { title: 'Airbus A380',            subtitle: 'Double-Deck Giant — 555 Passengers',             href: '/aircraft/a380-scale',         category: 'Aircraft',  icon: '✈' },
  { title: 'Bell X-1',               subtitle: 'First Supersonic Flight — Chuck Yeager 1947',    href: '/aircraft/bell-x1',            category: 'Aircraft',  icon: '✈' },
  { title: 'De Havilland Comet',     subtitle: 'First Jet Airliner — Metal Fatigue Failure',     href: '/aircraft/comet-failure',      category: 'Aircraft',  icon: '✈' },
  { title: 'B-2 Spirit',             subtitle: 'Stealth Flying Wing — RAM Coating',              href: '/aircraft/b2-spirit',          category: 'Aircraft',  icon: '✈' },
  { title: 'Piper Cub J-3',          subtitle: 'Classic Trainer — Fabric & Steel Tube',          href: '/aircraft/piper-cub',          category: 'Aircraft',  icon: '✈' },
  { title: 'SpaceShipOne',           subtitle: 'First Private Spaceflight — Feathering Reentry', href: '/aircraft/spaceshipone',       category: 'Aircraft',  icon: '✈' },
  // Questions
  { title: 'Why does Concorde need a delta wing?',     subtitle: 'Shock-wave management & vortex lift',          href: '/questions/why-delta-wing',          category: 'Question', icon: '?' },
  { title: 'How does X-59 suppress sonic boom?',       subtitle: 'Shaped ISBM signatures',                      href: '/questions/x59-nose',                category: 'Question', icon: '?' },
  { title: 'How does F-35B hover?',                    subtitle: 'Shaft-driven lift fan + roll posts',           href: '/questions/f35b-hover',              category: 'Question', icon: '?' },
  { title: 'How does the A350 save 25% fuel?',         subtitle: 'Composites + laminar flow + bypass ratio',     href: '/questions/a350-efficiency',         category: 'Question', icon: '?' },
  // Concepts
  { title: 'Supersonic Aerodynamics',                  subtitle: 'Shock waves, SBLI, drag divergence',           href: '/concepts/supersonic-aerodynamics',  category: 'Concept',  icon: '⚡' },
  { title: 'Thermodynamics of High-Speed Flight',      subtitle: 'Kinetic heating, stagnation temperature',      href: '/concepts/thermodynamics',           category: 'Concept',  icon: '⚡' },
  { title: 'Structural Engineering',                   subtitle: 'Fatigue, stress concentrations, Comet lessons',href: '/concepts/structural-engineering',   category: 'Concept',  icon: '⚡' },
  { title: 'Delta Wing Aerodynamics',                  subtitle: 'Vortex lift, leading-edge separation',         href: '/concepts/delta-wing-aerodynamics',  category: 'Concept',  icon: '⚡' },
  { title: 'Propulsion Systems',                       subtitle: 'Turbojets, ramjets, bypass ratio',             href: '/concepts/propulsion',               category: 'Concept',  icon: '⚡' },
  { title: 'Fly-By-Wire',                              subtitle: 'Static margin, quad redundancy, FBW loop',     href: '/concepts/fly-by-wire',              category: 'Concept',  icon: '⚡' },
  { title: 'VTOL Mechanics',                           subtitle: 'Momentum theory, thermal fountain, puffers',   href: '/concepts/vtol-mechanics',           category: 'Concept',  icon: '⚡' },
  { title: 'Structural Scaling',                       subtitle: 'Hoop stress, Comet K_t factor',                href: '/concepts/structural-scaling',       category: 'Concept',  icon: '⚡' },
  // Labs
  { title: 'Lab 01: Aspect Ratio',                     subtitle: 'Induced drag vs span efficiency',              href: '/lab/aspect-ratio',                  category: 'Lab',      icon: '🧪' },
  { title: 'Lab 02: Wing Sweep Angle',                 subtitle: 'Normal Mach number & drag rise',              href: '/lab/wing-sweep',                    category: 'Lab',      icon: '🧪' },
  { title: 'Lab 03: Kinetic Heating',                  subtitle: 'Stagnation temperature at Mach 2+',           href: '/lab/kinetic-heating',               category: 'Lab',      icon: '🧪' },
  { title: 'Lab 04: Engine Thrust',                    subtitle: 'Dry vs reheat thrust modelling',              href: '/lab/engine-thrust',                 category: 'Lab',      icon: '🧪' },
  { title: 'Lab 05: Fuel Transfer',                    subtitle: 'Centre-of-pressure trim via fuel shift',      href: '/lab/fuel-transfer',                 category: 'Lab',      icon: '🧪' },
  { title: 'Lab 06: Thrust-to-Weight',                 subtitle: 'T/W ratio vs climb rate',                     href: '/lab/thrust-to-weight',              category: 'Lab',      icon: '🧪' },
  { title: 'Lab 07: Wing Loading',                     subtitle: 'Wing loading vs stall speed',                 href: '/lab/wing-loading',                  category: 'Lab',      icon: '🧪' },
  { title: 'Lab 08: Thrust Vectoring',                 subtitle: 'Nozzle angle vector decomposition',           href: '/lab/thrust-vectoring',              category: 'Lab',      icon: '🧪' },
  { title: 'Lab 09: Structural Stress',                subtitle: 'Hoop stress & fatigue analysis',              href: '/lab/structural-stress',             category: 'Lab',      icon: '🧪' },
  { title: 'Lab 10: Altitude & Density',               subtitle: 'ISA atmosphere layers',                       href: '/lab/altitude-density',              category: 'Lab',      icon: '🧪' },
]

const CATEGORY_COLOR: Record<string, string> = {
  Aircraft: 'text-sky-400    bg-sky-400/10    border-sky-400/25',
  Question: 'text-violet-400 bg-violet-400/10 border-violet-400/25',
  Concept:  'text-amber-400  bg-amber-400/10  border-amber-400/25',
  Lab:      'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
}

// Default 4 suggestions shown when input is empty
const DEFAULTS = ['concorde', 'why-delta-wing', 'supersonic-aerodynamics', 'aspect-ratio']
const DEFAULT_ITEMS = SEARCH_INDEX.filter((item) =>
  DEFAULTS.some((d) => item.href.includes(d))
)

export default function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Live filter
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return DEFAULT_ITEMS
    return SEARCH_INDEX.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    ).slice(0, 8)
  }, [query])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (searchOpen) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 60)
    }
  }, [searchOpen])

  return (
    <>
      <header className="fixed top-3 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] sm:w-[95%] max-w-6xl rounded-full bg-[#07032a]/90 backdrop-blur-xl border border-[#0e9954]/40 shadow-[0_10px_40px_-10px_rgba(2,0,12,0.9),0_0_20px_rgba(14,153,84,0.3)] ring-1 ring-white/10 transition-all duration-150 hover:bg-[#07032a]/95 hover:shadow-[0_10px_50px_-5px_rgba(14,153,84,0.5)] hover:border-[#0e9954]/60">
        <div className="flex items-center justify-between min-h-14 sm:h-16 px-2.5 sm:px-5 py-2 sm:py-0">
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-full overflow-hidden border-2 border-[#0e9954] shadow-[0_0_15px_rgba(14,153,84,0.6)] transition-transform duration-150 group-hover:scale-110 group-hover:rotate-3 bg-[#07032a]">
                <Image src="/assets/logo.png" alt="MechDev. Logo" fill className="object-cover object-top" />
              </div>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight font-brand text-white select-none relative">
                <span className="text-[#0e9954] font-black drop-shadow-[0_0_10px_rgba(14,153,84,0.8)]">M</span>ech<span className="text-[#0e9954] font-black drop-shadow-[0_0_10px_rgba(14,153,84,0.8)]">D</span>ev<span className="text-[#0e9954] font-black animate-pulse">.</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-[#040118]/80 border border-white/10 shadow-inner">
            <Link href="/aircraft/concorde" className="px-5 py-2 rounded-full text-sm font-semibold text-slate-200 hover:text-white hover:bg-[#0e9954]/25 hover:shadow-[0_0_20px_rgba(14,153,84,0.35)] transition-all duration-150">Deep-Dive</Link>
            <Link href="/questions" className="px-5 py-2 rounded-full text-sm font-semibold text-slate-200 hover:text-white hover:bg-[#0e9954]/25 hover:shadow-[0_0_20px_rgba(14,153,84,0.35)] transition-all duration-150">Questions</Link>
            <Link href="/concepts" className="px-5 py-2 rounded-full text-sm font-semibold text-slate-200 hover:text-white hover:bg-[#0e9954]/25 hover:shadow-[0_0_20px_rgba(14,153,84,0.35)] transition-all duration-150">Concepts</Link>
            <Link href="/lab" className="px-5 py-2 rounded-full text-sm font-semibold text-slate-200 hover:text-white hover:bg-[#0e9954]/25 hover:shadow-[0_0_20px_rgba(14,153,84,0.35)] transition-all duration-150">Labs</Link>
          </nav>

          {/* ── Search Button (desktop) ─────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="group relative flex items-center gap-2.5 px-4 py-2 rounded-full overflow-hidden
                         bg-gradient-to-r from-[#040118] to-[#07032a]
                         border border-[#0e9954]/40
                         hover:border-[#0e9954]/80
                         shadow-[0_0_0_1px_rgba(14,153,84,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]
                         hover:shadow-[0_0_20px_rgba(14,153,84,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]
                         transition-all duration-150"
            >
              {/* Animated glow sweep on hover */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-[#0e9954]/10 to-transparent pointer-events-none" />

              {/* Search icon circle */}
              <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#0e9954]/15 border border-[#0e9954]/40 group-hover:bg-[#0e9954] group-hover:border-[#0e9954] transition-all duration-150 shadow-[0_0_8px_rgba(14,153,84,0.25)]">
                <svg className="w-3.5 h-3.5 text-[#0e9954] group-hover:text-slate-950 transition-colors duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
                </svg>
              </span>

              <span className="relative text-xs font-semibold tracking-wide text-slate-300 group-hover:text-white transition-colors duration-150 font-brand">
                Search
              </span>

              {/* Decorative pulse dot */}
              <span className="relative ml-0.5 w-1.5 h-1.5 rounded-full bg-[#0e9954] opacity-70 group-hover:opacity-100 animate-pulse" />
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center text-[#0e9954] hover:text-white bg-[#0e9954]/20 hover:bg-[#0e9954] rounded-full border border-[#0e9954]/40 transition-all shadow-[0_0_10px_rgba(14,153,84,0.2)]"
              aria-label="Search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" /></svg>
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-white bg-[#040118] rounded-full border border-white/10 transition-colors"
              aria-label="Menu"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Search Modal ─────────────────────────────────────────── */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl overflow-hidden
                       border border-[#0e9954]/30
                       bg-gradient-to-b from-[#07032a] to-[#040118]
                       shadow-[0_32px_80px_rgba(2,0,12,0.95),0_0_40px_rgba(14,153,84,0.2)]
                       ring-1 ring-white/5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Input row ────────────────────────────────────── */}
            <div className="relative flex items-center border-b border-white/8 px-5 py-4">
              {/* Search icon */}
              <svg className="absolute left-5 w-5 h-5 text-[#0e9954]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
              </svg>

              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search aircraft, concepts, labs, questions…"
                className="w-full bg-transparent pl-10 pr-16 py-1 text-base text-white placeholder-slate-500 focus:outline-none font-brand caret-[#0e9954]"
              />

              {/* ESC badge */}
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-5 px-2.5 py-1 text-[10px] font-mono text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all duration-75"
              >
                ESC
              </button>
            </div>

            {/* ── Results list ─────────────────────────────────── */}
            <div className="py-3 px-3 max-h-[60vh] overflow-y-auto">
              {/* Section header */}
              <div className="flex items-center justify-between px-3 pb-2">
                <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#0e9954] font-bold">
                  {query.trim() ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query.trim()}"` : 'Suggested'}
                </span>
                <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                  {SEARCH_INDEX.length} indexed
                </span>
              </div>

              {results.length === 0 ? (
                <div className="text-center py-10 text-slate-500 font-brand text-sm">
                  No results for <span className="text-white">&ldquo;{query}&rdquo;</span>
                </div>
              ) : (
                <ul className="space-y-0.5">
                  {results.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setSearchOpen(false)}
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl
                                   hover:bg-[#0e9954]/10 border border-transparent hover:border-[#0e9954]/25
                                   transition-all duration-75"
                      >
                        {/* Icon */}
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg
                                         bg-white/4 border border-white/8 text-sm
                                         group-hover:bg-[#0e9954]/15 group-hover:border-[#0e9954]/30
                                         transition-all duration-75">
                          {item.icon}
                        </span>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-200 group-hover:text-white truncate font-brand transition-colors duration-75">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-500 group-hover:text-slate-400 truncate font-mono transition-colors duration-75">
                            {item.subtitle}
                          </div>
                        </div>

                        {/* Category badge */}
                        <span className={`flex-shrink-0 text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${CATEGORY_COLOR[item.category] ?? 'text-slate-400 bg-white/5 border-white/10'}`}>
                          {item.category}
                        </span>

                        {/* Arrow */}
                        <span className="flex-shrink-0 text-slate-600 group-hover:text-[#0e9954] transition-colors duration-75 text-sm">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ── Footer hint ──────────────────────────────────── */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
              <div className="flex items-center gap-3 text-[10px] font-mono text-slate-600">
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-500">↑↓</kbd> navigate</span>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-500">↵</kbd> open</span>
              </div>
              <div className="text-[10px] font-mono text-slate-700 uppercase tracking-widest">
                AeroLab Search
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Drawer ─────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-4/5 max-w-xs h-full bg-[#07032a] border-r border-[#0e9954]/30 p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#0e9954]">
                    <Image src="/assets/logo.png" alt="MechDev. Logo" fill className="object-cover object-top" />
                  </div>
                  <span className="text-xl font-bold text-white font-brand">
                    <span className="text-[#0e9954] font-black">M</span>ech<span className="text-[#0e9954] font-black">D</span>ev<span className="text-[#0e9954] font-black">.</span>
                  </span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-white">✕</button>
              </div>
              <nav className="mt-6 flex flex-col space-y-4 text-base font-medium">
                <Link href="/aircraft/concorde" onClick={() => setMobileOpen(false)} className="text-slate-200 hover:text-[#0e9954]">Concorde Deep-Dive</Link>
                <Link href="/questions" onClick={() => setMobileOpen(false)} className="text-slate-200 hover:text-[#0e9954]">Questions</Link>
                <Link href="/concepts" onClick={() => setMobileOpen(false)} className="text-slate-200 hover:text-[#0e9954]">Physics Concepts</Link>
                <Link href="/lab" onClick={() => setMobileOpen(false)} className="text-slate-200 hover:text-[#0e9954]">Interactive Labs</Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
