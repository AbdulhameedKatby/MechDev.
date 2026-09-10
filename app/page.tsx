import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto py-8 space-y-28">
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION WITH CINEMATIC PHOTOREALISTIC CONCORDE
      ───────────────────────────────────────────────────────────── */}
      <section className="relative rounded-3xl overflow-hidden border border-white/10 aerolab-glass shadow-2xl">
        {/* Background Atmosphere Image */}
        <div className="relative w-full h-[520px] sm:h-[620px]">
          <Image
            src="/assets/concorde_mach2_cruise.jpg"
            alt="Concorde flying at Mach 2.04 at edge of space"
            fill
            priority
            className="object-cover object-center brightness-[0.75] contrast-[1.1] scale-105 transition-transform duration-1000 hover:scale-100"
          />
          {/* Subtle gradient vignette to blend with HUD text */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05011d] via-[#05011d]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05011d]/90 via-[#05011d]/40 to-transparent" />

          {/* HUD Telemetry Overlay on Image */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 right-4 sm:right-auto flex min-w-0 items-center gap-3">
            <span className="inline-flex min-w-0 max-w-full items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-emerald-500/30 text-emerald-400 font-mono text-[10px] sm:text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="truncate">TELEMETRY: FL600 · MACH 2.04 CRUISE · ISA +0°C</span>
            </span>
          </div>

          <div className="absolute top-6 right-6 hidden sm:flex items-center gap-4 text-xs font-mono text-emerald-400/80 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            <span>NOSE TEMP: 127°C</span>
            <span>•</span>
            <span>RAM PRESSURE: 0.58 BAR</span>
          </div>

          {/* Hero Foreground Content */}
          <div className="absolute bottom-7 sm:bottom-10 left-4 sm:left-12 right-4 sm:right-6 max-w-2xl space-y-4 sm:space-y-5">
            <div className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-bold">
              Engineering Investigation Platform
            </div>

            <h1 className="text-3xl sm:text-6xl font-black text-white font-serif leading-[1.05] tracking-tight drop-shadow-2xl">
              Why does this aircraft look like this?
            </h1>

            <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed drop-shadow">
              Aircraft are not styled for beauty. Every millimeter of sweep angle, area-ruling taper, and leading-edge vortex is dictated by physical laws.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/aircraft/concorde"
                className="px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-black text-sm hover:from-emerald-400 hover:to-emerald-300 transition-all duration-200 shadow-[0_0_25px_rgba(0,255,136,0.4)] inline-flex items-center gap-2"
              >
                <span>Launch Concorde Deep-Dive</span>
                <span className="text-base">→</span>
              </Link>
              <Link
                href="/lab"
                className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/40 transition-colors"
              >
                Open Physics Labs (5)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3 INVESTIGATION ENTRY POINTS (CARDS WITH VISUAL ART)
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Exploration Pathways
            </span>
            <h2 className="text-3xl font-bold text-white font-serif mt-1">
              Three Ways to Investigate Flight
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            SELECT ENTRY VECTOR // TRACEABLE EVIDENCE GUARANTEED
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: The Question */}
          <Link
            href="/questions/why-delta-wing"
            className="group relative rounded-2xl overflow-hidden border border-white/10 aerolab-glass hover:border-emerald-400/50 transition-all duration-150 flex flex-col justify-between"
          >
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src="/assets/concorde_delta_vortex.jpg"
                alt="Wind tunnel laser sheet of delta wing vortex"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040e09] via-transparent to-black/40" />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-emerald-400 font-bold border border-emerald-500/30">
                PATH 01 // THE QUESTION
              </div>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white font-serif group-hover:text-emerald-300 transition-colors">
                  Why did Concorde need a delta wing?
                </h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Conventional wings suffer complete boundary layer detachment at Mach 2. Discover how a continuous 63° leading-edge vortex prevents stall.
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-emerald-400 font-bold">
                <span>Start with the Problem</span>
                <span className="transition-transform group-hover:translate-x-1.5">→</span>
              </div>
            </div>
          </Link>

          {/* Card 2: The Aircraft */}
          <Link
            href="/aircraft/concorde"
            className="group relative rounded-2xl overflow-hidden border border-white/10 aerolab-glass hover:border-emerald-400/50 transition-all duration-150 flex flex-col justify-between"
          >
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src="/assets/concorde_mach2_cruise.jpg"
                alt="Concorde at Mach 2"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040e09] via-transparent to-black/40" />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-cyan-400 font-bold border border-cyan-500/30">
                PATH 02 // THE AIRCRAFT
              </div>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white font-serif group-hover:text-cyan-300 transition-colors">
                  The Complete Concorde Blueprint
                </h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  All 8 comprehensive sections: Mission trade-offs, 5 major engineering systems, 13-tank fuel pumping, and primary NASA/BAC test sources.
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-cyan-400 font-bold">
                <span>Explore Full Airframe</span>
                <span className="transition-transform group-hover:translate-x-1.5">→</span>
              </div>
            </div>
          </Link>

          {/* Card 3: The Engine / Physics */}
          <Link
            href="/concepts/supersonic-aerodynamics"
            className="group relative rounded-2xl overflow-hidden border border-white/10 aerolab-glass hover:border-emerald-400/50 transition-all duration-150 flex flex-col justify-between"
          >
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src="/assets/olympus_engine_afterburner.jpg"
                alt="Rolls Royce Olympus 593 turbojet afterburner test"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040e09] via-transparent to-black/40" />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-amber-400 font-bold border border-amber-500/30">
                PATH 03 // THE PHYSICS
              </div>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white font-serif group-hover:text-amber-300 transition-colors">
                  Supersonic Aerodynamics & Shock Waves
                </h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  First principles: Rankine-Hugoniot shock relations, kinetic stagnation temperatures ($T_0$), and wave drag divergence before looking at hardware.
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-amber-400 font-bold">
                <span>Explore Governing Physics</span>
                <span className="transition-transform group-hover:translate-x-1.5">→</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FEATURED LAB HIGHLIGHT: LIVE WORKSTATION BANNER
      ───────────────────────────────────────────────────────────── */}
      <section className="rounded-3xl border border-[#0e9954]/40 bg-gradient-to-br from-[#110654] via-[#0a033b] to-[#05011d] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
              Interactive Physics Workstation
            </span>
            <h3 className="text-3xl font-bold text-white font-serif">
              Five repeatable labs. Isolate one variable and observe the consequence.
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Adjust aspect ratios, sweep angles, bypass ratios, and kinetic heating in real-time SVG vector simulations. Compare Concorde against modern airliners like the Boeing 787 and supersonic fighters like the F-16.
            </p>
            <div className="pt-2">
              <Link
                href="/lab"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg font-mono"
              >
                <span>Launch Full Simulation Suite</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <Link href="/lab/aspect-ratio" className="p-4 rounded-xl bg-black/40 border border-white/10 hover:border-emerald-400/40 transition-colors">
              <span className="text-emerald-400 block text-[10px]">LAB 01</span>
              <span className="text-white font-bold block mt-1">Aspect Ratio ↔ Induced Drag</span>
              <span className="text-slate-400 text-[11px] block mt-1">AR=1.83 drag penalty</span>
            </Link>
            <Link href="/lab/wing-sweep" className="p-4 rounded-xl bg-black/40 border border-white/10 hover:border-emerald-400/40 transition-colors">
              <span className="text-emerald-400 block text-[10px]">LAB 02</span>
              <span className="text-white font-bold block mt-1">Sweep ↔ Wave Drag</span>
              <span className="text-slate-400 text-[11px] block mt-1">63° minimum angle</span>
            </Link>
            <Link href="/lab/kinetic-heating" className="p-4 rounded-xl bg-black/40 border border-white/10 hover:border-emerald-400/40 transition-colors">
              <span className="text-emerald-400 block text-[10px]">LAB 03</span>
              <span className="text-white font-bold block mt-1">Kinetic Heating</span>
              <span className="text-slate-400 text-[11px] block mt-1">127°C nose stagnation</span>
            </Link>
            <Link href="/lab/fuel-transfer" className="p-4 rounded-xl bg-black/40 border border-white/10 hover:border-emerald-400/40 transition-colors">
              <span className="text-emerald-400 block text-[10px]">LAB 05</span>
              <span className="text-white font-bold block mt-1">Fuel Transfer & CP</span>
              <span className="text-slate-400 text-[11px] block mt-1">3,000 kg/min trim</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
