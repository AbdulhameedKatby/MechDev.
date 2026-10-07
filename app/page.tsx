import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { aircraftList, aircraftMap } from '../content/aircraftRegistry'
import EngineerBanner from '../components/EngineerBanner'
import HomeFlightSimulator from '../components/HomeFlightSimulator'
import HeroTicker from '../components/HeroTicker'
import StatsRibbon from '../components/StatsRibbon'
import AviationTimeline from '../components/AviationTimeline'
import PageRevealObserver from '../components/PageRevealObserver'

const labCount = 10
const linkedSourceCount = aircraftList.reduce(
  (total, aircraft) => total + aircraft.evidence.reduce((count, record) => count + record.sources.length, 0),
  0,
)

// 6 aircraft for fleet showcase
const FEATURED_SLUGS = ['concorde', 'sr71-blackbird', 'f16-falcon', 'x59-nose', 'f35b-hover', 'a350-efficiency']
const FLEET_SHOWCASE = FEATURED_SLUGS.map((slug) => aircraftMap[slug]).filter(Boolean)

// Flight envelope extremes
const EXTREMES = [
  {
    category: 'SPEED CEILING',
    metric: 'Mach 3.30+',
    aircraft: 'SR-71 Blackbird',
    detail: '3,540 km/h sustained cruise. Titanium airframe thermally expands 30 cm. J58 engine switches between turbojet and ramjet modes.',
    slug: 'sr71-blackbird',
    tag: 'Thermal Limit',
    accent: 'text-amber-400 border-amber-500/30 bg-amber-400/5',
    glow: 'rgba(251, 191, 36, 0.15)',
    icon: '🔥',
  },
  {
    category: 'ALTITUDE FRONTIER',
    metric: '367,000 ft',
    aircraft: 'SpaceShipOne',
    detail: '112 km suborbital. Feathering wing geometry provides passive aerodynamic stability during hypersonic reentry — no ablative heat shield needed.',
    slug: 'spaceshipone',
    tag: 'Suborbital',
    accent: 'text-sky-400 border-sky-500/30 bg-sky-400/5',
    glow: 'rgba(56, 189, 248, 0.15)',
    icon: '🛸',
  },
  {
    category: 'MAX SCALE & MASS',
    metric: '575 Tonnes',
    aircraft: 'Airbus A380',
    detail: 'Double-deck airliner. 845 m² wing area, 20-wheel main gear absorbs 600 tonne touchdown loads. Wing bends 4 m tip-to-tip in flight.',
    slug: 'a380-scale',
    tag: 'Structural',
    accent: 'text-violet-400 border-violet-500/30 bg-violet-400/5',
    glow: 'rgba(167, 139, 250, 0.15)',
    icon: '🏗️',
  },
  {
    category: 'DYNAMIC AGILITY',
    metric: '+9.0g / −3.0g',
    aircraft: 'F-16 Falcon',
    detail: 'Negative static stability — the jet wants to diverge. Quad-redundant fly-by-wire corrects 40 times per second, enabling extraordinary agility.',
    slug: 'f16-falcon',
    tag: 'Flight Dynamics',
    accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-400/5',
    glow: 'rgba(14, 153, 84, 0.15)',
    icon: '⚡',
  },
]

// Governing equations
const EQUATIONS = [
  {
    title: 'Aerodynamic Lift',
    formula: 'L = ½ ρ V² S C_L',
    concept: 'Dynamic pressure × wing area × lift coefficient.',
    insight: 'Concorde compensates for low CL at low speeds with high AoA and leading-edge vortex lift — a mechanism only possible with its ogival delta planform.',
    labSlug: 'aspect-ratio',
    labName: 'Lab 01 / Aspect Ratio',
    color: 'border-sky-500/30',
    badge: 'text-sky-400',
  },
  {
    title: 'Mach Cone Angle',
    formula: 'sin μ = 1 / M',
    concept: 'Semi-vertex angle of the supersonic Mach cone from the aircraft nose.',
    insight: 'Sweeping the wing behind the Mach line (\u039b > \u03bc) moves the effective leading edge into subsonic flow \u2014 Concorde\u0027s 63\u00b0 sweep keeps it behind the Mach cone at M2.',
    labSlug: 'wing-sweep',
    labName: 'Lab 02 / Wing Sweep',
    color: 'border-emerald-500/30',
    badge: 'text-emerald-400',
  },
  {
    title: 'Stagnation Heating',
    formula: 'T₀ = T∞ (1 + 0.2 M²)',
    concept: 'Kinetic energy converts to heat at stagnation points where flow decelerates to rest.',
    insight: 'At Mach 2.04, Concorde\'s nose stagnation temperature exceeds +127°C from ISA −56.5°C — dictating aluminum-copper alloy selection and growth of 20 cm nose-to-tail.',
    labSlug: 'kinetic-heating',
    labName: 'Lab 03 / Kinetic Heating',
    color: 'border-amber-500/30',
    badge: 'text-amber-400',
  },
  {
    title: 'Breguet Range',
    formula: 'R = (V / cₜ) · (L/D) · ln(W₀/W₁)',
    concept: 'Cruising range as product of speed, fuel efficiency, aerodynamic efficiency, and fuel mass fraction.',
    insight: 'Concorde trades L/D = 7.14 (vs 747\'s 19) for 2× velocity, producing shorter range. The Breguet equation makes this trade-off mathematically explicit.',
    labSlug: 'bypass-ratio',
    labName: 'Lab 04 / Bypass Ratio',
    color: 'border-rose-500/30',
    badge: 'text-rose-400',
  },
]

// Lab categories
const LAB_CATS = [
  {
    cat: 'Aerodynamics',
    icon: '✦',
    labs: [
      { id: '01', slug: 'aspect-ratio', title: 'Aspect Ratio ↔ Induced Drag', formula: 'CDi = CL² / (π·e·AR)' },
      { id: '02', slug: 'wing-sweep', title: 'Sweep Angle ↔ Wave Drag', formula: 'M_n = M cos Λ' },
      { id: '07', slug: 'wing-loading', title: 'Wing Loading ↔ Stall Speed', formula: 'V_s = √(2W / ρSCLmax)' },
    ],
  },
  {
    cat: 'Propulsion & Thermo',
    icon: '⚙',
    labs: [
      { id: '03', slug: 'kinetic-heating', title: 'Kinetic Heating & T₀', formula: 'T₀ = T∞(1 + 0.2M²)' },
      { id: '04', slug: 'bypass-ratio', title: 'Bypass Ratio ↔ η_p', formula: 'η_p = 2V / (V + V_j)' },
      { id: '06', slug: 'thrust-to-weight', title: 'T/W Ratio ↔ Climb Rate', formula: 'RC = V(T−D) / W' },
    ],
  },
  {
    cat: 'Dynamics & Structures',
    icon: '⬡',
    labs: [
      { id: '05', slug: 'fuel-transfer', title: 'Fuel Trim & CG Shift', formula: 'Δx_cp ≈ f(M)' },
      { id: '08', slug: 'thrust-vectoring', title: 'Thrust Vector Decomposition', formula: 'F_⊥ = T sinδ' },
      { id: '09', slug: 'structural-stress', title: 'Hoop Stress & Fatigue', formula: 'σ_hoop = ΔP·r / t' },
      { id: '10', slug: 'altitude-density', title: 'ISA Atmosphere Layers', formula: 'T = T₀ − L·h' },
    ],
  },
]

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto py-4 sm:py-6 space-y-20 sm:space-y-28">
      <PageRevealObserver />

      {/* ── LIVE TELEMETRY RIBBON ─────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-[#07032a] border border-[#0e9954]/30 shadow-lg">
        <HeroTicker />
        <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono text-slate-400 shrink-0">
          <span><strong className="text-white">{aircraftList.length}</strong> Airframes</span>
          <span>·</span>
          <span><strong className="text-emerald-400">{labCount}</strong> Labs</span>
          <span>·</span>
          <span><strong className="text-white">{linkedSourceCount}</strong> Records</span>
        </div>
      </div>

      {/* ── HERO — TIMELESS AEROSPACE MASTERPIECE ──────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#030114] shadow-2xl">
        {/* ══ BACKGROUND PHOTOGRAPH ══ */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/concorde_legendary_hero.jpg"
            alt="Concorde supersonic climb in the stratosphere at sunset"
            fill
            priority
            quality={95}
            className="object-cover object-center brightness-[0.92] contrast-[1.05] translate-x-[62px]"
          />
          {/* Deep dark gradient on the left text area for crisp typography, smoothly opening up to the sunset aircraft and reheat flames on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030114]/95 via-[#030114]/75 to-transparent max-w-2xl sm:max-w-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030114] via-[#030114]/25 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030114]/50 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* ══ HERO FOREGROUND CONTAINER ══ */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex flex-col justify-between min-h-[560px] sm:min-h-[620px] lg:min-h-[660px] gap-8">
          
          {/* Top Aerospace Metadata Ribbon */}
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 border border-emerald-500/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-emerald-400">
                First-Principles Flight Mechanics
              </span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-[11px] font-mono text-slate-300 backdrop-blur-md">
              <span className="text-slate-500">CASE STUDY //</span>
              <span className="text-white font-semibold">BAC/Aérospatiale Concorde</span>
            </div>
          </div>

          {/* Central Hero Body */}
          <div className="max-w-2xl space-y-5 my-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-brand tracking-tight text-white leading-[1.08]">
              Why does this aircraft{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                look like this?
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-light leading-relaxed max-w-xl">
              Geometry is never decoration. Every delta wing contour, variable intake ramp, and fuel-transfer cell is the mathematical answer to competing aerodynamic, thermal, and structural laws.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <Link
                href="/aircraft/concorde"
                className="group px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-bold font-brand text-sm transition-all duration-200 shadow-[0_0_25px_rgba(14,153,84,0.35)] hover:shadow-[0_0_35px_rgba(14,153,84,0.55)] inline-flex items-center gap-2"
              >
                <span>Explore Concorde Case Study</span>
                <span className="text-base transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>

              <Link
                href="/aircraft"
                className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 text-white font-medium text-sm transition-all inline-flex items-center gap-2 backdrop-blur-md"
              >
                <span>All 15 Aircraft</span>
                <span className="text-slate-400">→</span>
              </Link>

              <Link
                href="/lab"
                className="hidden md:inline-flex px-5 py-3.5 sm:py-4 rounded-xl border border-emerald-500/25 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-300 font-medium text-sm transition-all items-center gap-2 backdrop-blur-md"
              >
                <span>10 Physics Labs</span>
                <span className="text-emerald-400">→</span>
              </Link>
            </div>
          </div>

          {/* Bottom Integrated Telemetry Dock */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-white/10 bg-black/40 -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 lg:-mx-14 lg:-mb-14 p-4 sm:p-6 backdrop-blur-md rounded-b-3xl">
            <div className="space-y-0.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Cruise Speed</div>
              <div className="text-sm sm:text-base font-bold font-mono text-emerald-400">Mach 2.04</div>
              <div className="text-[10px] font-mono text-slate-500">2,179 km/h @ FL600</div>
            </div>

            <div className="space-y-0.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Service Ceiling</div>
              <div className="text-sm sm:text-base font-bold font-mono text-white">60,000 ft</div>
              <div className="text-[10px] font-mono text-slate-500">Stratospheric Cruise</div>
            </div>

            <div className="space-y-0.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Wing Geometry</div>
              <div className="text-sm sm:text-base font-bold font-mono text-cyan-300">63° Ogival Delta</div>
              <div className="text-[10px] font-mono text-slate-500">Vortex Lift Generation</div>
            </div>

            <div className="space-y-0.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Nose Stagnation</div>
              <div className="text-sm sm:text-base font-bold font-mono text-amber-300">+127°C T₀</div>
              <div className="text-[10px] font-mono text-slate-500">ISA Stratosphere (−56.5°C)</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── ANIMATED STATS RIBBON ───────────────────────────────────────── */}
      <StatsRibbon />

      {/* ── EVIDENCE PROTOCOL BANNER ────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-[#07170f] via-[#091b16] to-[#07032a] p-6 sm:p-10 shadow-xl">
        {/* Top accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-2/5 bg-gradient-to-l from-emerald-500/[0.07] to-transparent" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
              Evidence-Led Research Protocol // Active
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif leading-tight">
              Every design claim is backed by a primary source you can read.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              No aviation myths. No simplified hand-waving. Each aerodynamic mechanism is cross-referenced against NASA technical notes, British Aircraft Corporation specifications, AIAA papers, and flight-test records. If we can't cite it, we don't claim it.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="text-amber-300 text-sm">★★★★★</span> NASA / Regulatory reports
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="text-cyan-300 text-sm">★★★★☆</span> Manufacturer specifications
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="text-emerald-300 text-sm">★★★☆☆</span> Flight test records
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 sm:gap-10 lg:shrink-0 lg:border-l lg:border-white/10 lg:pl-10">
            {[
              { n: aircraftList.length, label: 'Airframes', unit: 'investigated' },
              { n: labCount, label: 'Physics Labs', unit: 'interactive' },
              { n: linkedSourceCount, label: 'Citations', unit: 'primary sources' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white">{s.n}</div>
                <div className="mt-1 text-xs font-bold text-emerald-400 font-brand">{s.label}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wider text-slate-500">{s.unit}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-400 font-mono max-w-xl">
            Our editorial protocol defines source tiers, claim categories (VERIFIED / CALCULATED / ESTIMATED), and uncertainty bounds on all modelled values.
          </p>
          <Link href="/editorial" className="text-xs font-bold text-emerald-400 hover:text-white transition-colors font-mono inline-flex items-center gap-1.5">
            Read the Full Protocol →
          </Link>
        </div>
      </section>

      {/* ── LIVE MACH PHYSICS WORKBENCH ─────────────────────────────────── */}
      <HomeFlightSimulator />

      {/* ── FLEET SHOWCASE ──────────────────────────────────────────────── */}
      <section className="space-y-8 reveal-section">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Engineering Blueprints</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif mt-1">
              Six Iconic Masterpieces of Flight
            </h2>
            <p className="text-sm text-slate-400 mt-1.5 max-w-lg">
              Each aircraft solved a previously unsolved physics problem. Open any to see the full engineering investigation.
            </p>
          </div>
          <Link href="/aircraft" className="text-xs text-emerald-400 hover:text-emerald-300 font-mono font-bold inline-flex items-center gap-1.5 transition-colors shrink-0">
            All 15 Aircraft →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FLEET_SHOWCASE.map((plane, i) => (
            <Link
              key={plane.slug}
              href={`/aircraft/${plane.slug}`}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#070228] hover:border-emerald-500/50 transition-all duration-200 flex flex-col shadow-xl hover:shadow-emerald-500/10"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="relative w-full h-52 overflow-hidden bg-[#030114]">
                <Image
                  src={plane.heroImage}
                  alt={plane.name}
                  fill
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070228] via-transparent to-black/60" />
                <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded text-[10px] font-mono text-emerald-400 font-bold border border-emerald-500/30">
                  {plane.role}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col gap-4 justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white font-serif group-hover:text-emerald-200 transition-colors leading-tight">
                    {plane.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono leading-relaxed">{plane.subtitle}</p>
                  <div className="border-l-2 border-emerald-500/40 pl-3 mt-1">
                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      &ldquo;{plane.mission.provocativeQuestion}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Spec pills from first design system */}
                {plane.designSystems[0]?.realData?.slice(0, 2) && (
                  <div className="flex flex-wrap gap-1.5">
                    {plane.designSystems[0].realData.slice(0, 2).map((d) => (
                      <span key={d} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                        {d}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-emerald-400 font-bold">
                  <span>Open Investigation</span>
                  <span className="transition-transform group-hover:translate-x-2 duration-200">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FLIGHT ENVELOPE EXTREMES ─────────────────────────────────────── */}
      <section className="space-y-6 reveal-section">
        <div className="border-b border-white/10 pb-5">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Outer Limits</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif mt-1">
            The Flight Envelope Pushed to Its Absolute Extremes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXTREMES.map((ex) => (
            <Link
              key={ex.category}
              href={`/aircraft/${ex.slug}`}
              className={`group p-6 rounded-2xl border ${ex.accent} bg-[#070228] hover:bg-[#0a0338] transition-all duration-200 space-y-4 shadow-lg flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{ex.icon}</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${ex.accent}`}>
                    {ex.tag}
                  </span>
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">{ex.category}</div>
                <div className="text-2xl sm:text-3xl font-extrabold font-brand text-white group-hover:text-emerald-200 transition-colors">
                  {ex.metric}
                </div>
                <div className="text-xs font-mono font-semibold text-emerald-400 mt-0.5">{ex.aircraft}</div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{ex.detail}</p>
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-emerald-400 transition-colors pt-2 border-t border-white/10">
                <span>Investigate</span>
                <span className="transition-transform group-hover:translate-x-1.5">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── GOVERNING EQUATIONS ──────────────────────────────────────────── */}
      <section className="space-y-8 reveal-section">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Mathematical Foundations</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif mt-1">
              Four Laws That Shape Every Airframe
            </h2>
          </div>
          <Link href="/concepts" className="text-xs text-emerald-400 hover:text-emerald-300 font-mono font-bold inline-flex items-center gap-1.5 transition-colors shrink-0">
            All Concepts →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EQUATIONS.map((eq) => (
            <div
              key={eq.title}
              className={`rounded-2xl border ${eq.color} bg-[#070228] p-6 space-y-4 shadow-xl flex flex-col`}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold font-serif text-white leading-tight">{eq.title}</h3>
                <Link
                  href={`/lab/${eq.labSlug}`}
                  className={`shrink-0 px-2.5 py-1 rounded text-[10px] font-mono font-bold border ${eq.color} ${eq.badge} hover:opacity-80 transition-opacity`}
                >
                  {eq.labName} →
                </Link>
              </div>

              {/* Formula display */}
              <div className="flex items-center justify-center p-4 rounded-xl bg-[#030114] border border-white/10 font-mono text-center">
                <span className={`text-lg sm:text-xl font-bold tracking-wide ${eq.badge}`}>
                  {eq.formula}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-slate-400 font-mono">{eq.concept}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{eq.insight}</p>
              </div>

              <Link
                href={`/lab/${eq.labSlug}`}
                className="mt-auto pt-4 border-t border-white/10 text-xs font-mono font-bold text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                Run interactive verification →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── AVIATION HISTORY TIMELINE ────────────────────────────────────── */}
      <AviationTimeline />

      {/* ── COMPLETE LAB SUITE ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl border border-[#0e9954]/35 bg-gradient-to-br from-[#0c0540] via-[#070328] to-[#040118] p-6 sm:p-10 shadow-2xl">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="relative space-y-8">
          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="max-w-xl space-y-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Interactive Simulation Suite
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif">
                10 Repeatable Labs. One Variable. Observe the Consequence.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Every parameter tweak recalculates real aerodynamic, thermodynamic, or structural equations. Move the slider and see the physics respond in real-time.
              </p>
            </div>
            <Link
              href="/lab"
              className="px-7 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg font-mono inline-flex items-center gap-2 shrink-0 self-start"
            >
              <span>Open Simulation Suite</span>
              <span>→</span>
            </Link>
          </div>

          {/* 3-column categorized lab grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
            {LAB_CATS.map((cat) => (
              <div key={cat.cat} className="space-y-3">
                <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 border-b border-white/10 pb-2.5">
                  <span className="opacity-60">{cat.icon}</span>
                  {cat.cat}
                </div>
                <div className="space-y-2">
                  {cat.labs.map((lab) => (
                    <Link
                      key={lab.id}
                      href={`/lab/${lab.slug}`}
                      className="block p-4 rounded-xl bg-black/40 border border-white/10 hover:border-emerald-500/45 hover:bg-black/60 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">LAB {lab.id}</span>
                        <span className="text-slate-500 group-hover:text-emerald-400 transition-colors text-xs font-bold">→</span>
                      </div>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-200 transition-colors font-brand">
                        {lab.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-1">
                        {lab.formula}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGINEER SPOTLIGHT ───────────────────────────────────────────── */}
      <EngineerBanner />
    </div>
  )
}
