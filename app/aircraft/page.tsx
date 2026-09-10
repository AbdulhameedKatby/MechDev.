'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { aircraftList } from '../../content/aircraftRegistry'

// Category definitions
const CATEGORIES = [
  { id: 'all',          label: 'All Aircraft'  },
  { id: 'supersonic',   label: 'Supersonic'    },
  { id: 'commercial',   label: 'Commercial'    },
  { id: 'military',     label: 'Military'      },
  { id: 'vtol',         label: 'VTOL'          },
  { id: 'experimental', label: 'Experimental'  },
  { id: 'historic',     label: 'Historic'      },
]

// Per-slug metadata
const META: Record<string, {
  category: string
  era: string
  topSpeed: string
  ceiling: string
  discipline: string
  featured?: boolean
}> = {
  'concorde':          { category: 'supersonic',   era: '1969–2003',  topSpeed: 'Mach 2.04',  ceiling: '60,000 ft',   discipline: 'Aerodynamics',      featured: true },
  'boeing-747':        { category: 'commercial',   era: '1969–2023',  topSpeed: 'Mach 0.86',  ceiling: '45,100 ft',   discipline: 'Structures'              },
  'cessna-172':        { category: 'historic',     era: '1956–now',   topSpeed: 'Mach 0.16',  ceiling: '14,000 ft',   discipline: 'Fundamentals'            },
  'f16-falcon':        { category: 'military',     era: '1974–now',   topSpeed: 'Mach 2.05',  ceiling: '50,000 ft',   discipline: 'Flight Dynamics'         },
  'sr71-blackbird':    { category: 'military',     era: '1964–1998',  topSpeed: 'Mach 3.3+',  ceiling: '85,000 ft',   discipline: 'Propulsion'              },
  'harrier-vtol':      { category: 'vtol',         era: '1967–now',   topSpeed: 'Mach 0.87',  ceiling: '51,200 ft',   discipline: 'VTOL Mechanics'          },
  'a350-efficiency':   { category: 'commercial',   era: '2013–now',   topSpeed: 'Mach 0.89',  ceiling: '43,100 ft',   discipline: 'Materials'               },
  'x59-nose':          { category: 'experimental', era: '2021–now',   topSpeed: 'Mach 1.42',  ceiling: '55,000 ft',   discipline: 'Acoustics'               },
  'f35b-hover':        { category: 'vtol',         era: '2006–now',   topSpeed: 'Mach 1.60',  ceiling: '50,000 ft',   discipline: 'Propulsion'              },
  'a380-scale':        { category: 'commercial',   era: '2005–2021',  topSpeed: 'Mach 0.89',  ceiling: '43,000 ft',   discipline: 'Structures'              },
  'bell-x1':           { category: 'experimental', era: '1945–1950',  topSpeed: 'Mach 1.06',  ceiling: '70,140 ft',   discipline: 'Transonic Aero'          },
  'comet-failure':     { category: 'historic',     era: '1949–1997',  topSpeed: 'Mach 0.78',  ceiling: '42,000 ft',   discipline: 'Fatigue & Failure'       },
  'b2-spirit':         { category: 'military',     era: '1989–now',   topSpeed: 'Mach 0.95',  ceiling: '50,000 ft',   discipline: 'Stealth Aero'            },
  'piper-cub':         { category: 'historic',     era: '1938–1947',  topSpeed: 'Mach 0.08',  ceiling: '11,500 ft',   discipline: 'Fundamentals'            },
  'spaceshipone':      { category: 'experimental', era: '2003–2004',  topSpeed: 'Mach 3.09',  ceiling: '367,000 ft',  discipline: 'Spaceflight'             },
}

const DISCIPLINE_COLOR: Record<string, string> = {
  'Aerodynamics':      'text-sky-300     border-sky-400/30     bg-sky-400/10',
  'Structures':        'text-amber-300   border-amber-400/30   bg-amber-400/10',
  'Flight Dynamics':   'text-violet-300  border-violet-400/30  bg-violet-400/10',
  'Propulsion':        'text-orange-300  border-orange-400/30  bg-orange-400/10',
  'VTOL Mechanics':    'text-rose-300    border-rose-400/30    bg-rose-400/10',
  'Materials':         'text-teal-300    border-teal-400/30    bg-teal-400/10',
  'Acoustics':         'text-purple-300  border-purple-400/30  bg-purple-400/10',
  'Transonic Aero':    'text-cyan-300    border-cyan-400/30    bg-cyan-400/10',
  'Fatigue & Failure': 'text-red-300     border-red-400/30     bg-red-400/10',
  'Stealth Aero':      'text-slate-300   border-slate-400/30   bg-slate-400/10',
  'Spaceflight':       'text-indigo-300  border-indigo-400/30  bg-indigo-400/10',
  'Fundamentals':      'text-green-300   border-green-400/30   bg-green-400/10',
}

export default function AircraftIndex() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categoryCounts = CATEGORIES.map((cat) => ({
    ...cat,
    count: cat.id === 'all'
      ? aircraftList.length
      : aircraftList.filter((a) => META[a.slug]?.category === cat.id).length,
  })).filter((c) => c.count > 0)

  const filtered = activeCategory === 'all'
    ? aircraftList
    : aircraftList.filter((a) => META[a.slug]?.category === activeCategory)

  const sorted = [...filtered].sort((a, b) => {
    const fa = META[a.slug]?.featured ? 0 : 1
    const fb = META[b.slug]?.featured ? 0 : 1
    if (fa !== fb) return fa - fb
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-10">

      {/* Header */}
      <div className="space-y-3">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold">
          AeroLab // Aircraft Archive
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif tracking-tight">
          Engineering Blueprints
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          {aircraftList.length} aircraft. Every design decision traced to physics.
          Select an aircraft to open its full engineering investigation.
        </p>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2">
        {categoryCounts.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-75 border ${
              activeCategory === cat.id
                ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                : 'bg-white/5 text-slate-400 border-white/10 hover:border-emerald-500/40 hover:text-white'
            }`}
          >
            {cat.label}
            <span className={`ml-1.5 ${activeCategory === cat.id ? 'opacity-70' : 'opacity-40'}`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Aircraft grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {sorted.map((plane) => {
          const meta = META[plane.slug] ?? { category: 'other', era: '', topSpeed: '', ceiling: '', discipline: 'Aerodynamics' }
          const discColor = DISCIPLINE_COLOR[meta.discipline] ?? 'text-slate-300 border-slate-400/30 bg-slate-400/10'
          const isFeatured = meta.featured === true

          return (
            <Link
              key={plane.slug}
              href={`/aircraft/${plane.slug}`}
              className={`group relative rounded-2xl border p-5 flex flex-col gap-4 transition-all duration-75 aerolab-glass no-underline ${
                isFeatured
                  ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(14,153,84,0.15)]'
                  : 'border-white/10 hover:border-emerald-500/25'
              }`}
            >
              {isFeatured && (
                <div className="absolute top-4 right-4">
                  <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded bg-emerald-500 text-slate-950 tracking-widest">
                    Flagship
                  </span>
                </div>
              )}

              {/* Top badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                  {meta.era}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
                  {meta.topSpeed}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${discColor}`}>
                  {meta.discipline}
                </span>
              </div>

              {/* Name + subtitle */}
              <div>
                <h2 className={`font-bold text-white font-serif leading-tight group-hover:text-emerald-100 transition-colors duration-75 ${isFeatured ? 'text-xl' : 'text-lg'}`}>
                  {plane.name}
                </h2>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                  {plane.subtitle}
                </p>
              </div>

              {/* Central question */}
              <div className="border-l-2 border-emerald-500/40 pl-3">
                <p className="text-xs text-slate-300 italic leading-relaxed line-clamp-2">
                  &ldquo;{plane.mission.provocativeQuestion}&rdquo;
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                <span className="text-[10px] text-slate-500 font-mono">{plane.role}</span>
                <span className="text-[11px] font-mono font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors duration-75">
                  Investigate →
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5">
        {[
          { label: 'Aircraft',      value: `${aircraftList.length}` },
          { label: 'Eras Covered',  value: '8' },
          { label: 'Disciplines',   value: `${Object.keys(DISCIPLINE_COLOR).length}` },
          { label: 'Speed Range',   value: 'Mach 0.08–3.3+' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-extrabold font-mono text-white">{stat.value}</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

    </div>
  )
}
