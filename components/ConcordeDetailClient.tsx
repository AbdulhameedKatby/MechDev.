"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { AircraftData } from '../lib/types'
import TradeOffTable from './TradeOffTable'
import DesignSpaceChart from './DesignSpaceChart'
import SpecificationCard from './SpecificationCard'
import DepthTabs from './DepthTabs'
import EvidenceClaim from './EvidenceClaim'
import EvidencePanel from './EvidencePanel'

interface ConcordeDetailClientProps {
  aircraft: AircraftData
}

export default function ConcordeDetailClient({ aircraft }: ConcordeDetailClientProps) {
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>(null)

  const activeEvidence = aircraft.evidence.find((e) => e.id === selectedEvidenceId)

  return (
    <article className="max-w-6xl mx-auto py-8 space-y-28">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: THE MISSION (With Epic Mach 2 Stratosphere Banner)
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-8">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 aerolab-glass shadow-2xl">
          <div className="relative w-full h-[400px] sm:h-[480px]">
            <Image
              src="/assets/concorde_mach2_cruise.jpg"
              alt="Concorde flying at Mach 2.04 at edge of space"
              fill
              priority
              className="object-cover object-center brightness-[0.75] contrast-[1.15]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030806] via-[#030806]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030806]/80 via-transparent to-transparent" />

            <div className="absolute top-6 left-6 flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30">
                AIRCRAFT DEEP-DIVE // {aircraft.role}
              </span>
              <span className="text-xs font-mono text-slate-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                CRUISE: MACH 2.04 @ 60,000 FT
              </span>
            </div>

            <div className="absolute bottom-8 left-6 sm:left-10 right-6 max-w-3xl space-y-2">
              <h1 className="text-5xl sm:text-7xl font-black text-white font-serif tracking-tight drop-shadow-2xl">
                {aircraft.name}
              </h1>
              <p className="text-lg sm:text-xl text-emerald-200/90 font-light drop-shadow">
                {aircraft.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="rounded-3xl border border-white/10 aerolab-glass p-8 sm:p-10 shadow-2xl space-y-8 hud-corner">
          <div>
            <div className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-widest mb-2">
              Primary Engineering Problem
            </div>
            <p className="text-2xl sm:text-4xl font-serif text-white leading-snug">
              &ldquo;{aircraft.mission.problem}&rdquo;
            </p>
          </div>

          <div className="pt-6 border-t border-white/10">
            <div className="text-xs font-mono uppercase text-slate-400 mb-4 tracking-wider">
              Brutal Trade-Offs Accepted to Halve Crossing Time
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aircraft.mission.tradeOffs.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/5 bg-black/40 p-5 space-y-1.5 hover:border-emerald-500/30 transition-colors"
                >
                  <span className="text-xs font-bold font-mono text-amber-400 flex items-center gap-1.5">
                    <span>⚠</span> {item.label}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="text-base font-serif italic text-emerald-300">
              &ldquo;{aircraft.mission.provocativeQuestion}&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: THE PHYSICS BEHIND CONCORDE'S GEOMETRY (With Wind Tunnel Vortex Art)
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Section 02 // Aerodynamic Genesis
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mt-1">
              Why does Concorde have a delta wing?
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            SHOCK-BOUNDARY LAYER INTERACTION // DESIGN RESPONSE
          </p>
        </div>

        <DepthTabs
          discover={
            <div className="space-y-6">
              <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/assets/concorde_delta_vortex.jpg"
                  alt="Wind tunnel laser sheet of Concorde delta wing leading-edge vortex"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05110a] via-transparent to-black/30" />
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 text-xs text-slate-200">
                  <span className="font-mono text-emerald-400 font-bold uppercase block mb-1">
                    Laser Particle Image Velocimetry (PIV) Wind Tunnel Test
                  </span>
                  Notice the intense green coiling vortices along both 63° swept leading edges. These high-speed helical air currents energize the boundary layer, pulling air downward to prevent detachment across supersonic shock fronts.
                </div>
              </div>

              <p className="text-base text-slate-200 leading-relaxed">
                At supersonic speed, shocks, compressibility, viscous interactions, and wave drag become tightly coupled. Delta-wing vortical flow became an important part of Concorde&apos;s aerodynamic solution, with behavior that depends on geometry, Mach number, and angle of attack.
              </p>

              <div className="p-4 rounded-xl border border-emerald-500/30 bg-[#07190f]">
                <EvidenceClaim evidenceId="ev-delta-wing" evidence={aircraft.evidence}>
                  The delta wing solves this by continuously generating a controlled high-energy vortex along its swept leading edge
                </EvidenceClaim>
                , forcing the boundary layer to remain attached.
              </div>
            </div>
          }
          understand={
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white font-serif">
                Shock-Boundary Layer Interaction (SBLI) & Vortex Lift
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                The core aerodynamic phenomenon is SBLI. When a normal shock strikes an adverse pressure gradient, low-energy air inside the boundary layer separates immediately.
              </p>
              <div className="p-4 bg-black/60 rounded-xl border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-1">
                <div className="text-slate-400">Critical Condition:</div>
                <div>At Mach 2.04, shock position on unswept wing = boundary layer separation point.</div>
                <div className="pt-2 text-slate-400">Governing Vortex Strength:</div>
                <div>Γ_vortex ∝ V_infinity × c × tan(α) × cos(Λ)</div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                The 63° swept ogival delta generates strong leading-edge vortices whose suction peak provides lift independent of traditional airfoil camber, allowing stable high-speed flight.
              </p>
            </div>
          }
          investigate={
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white font-serif">
                NASA & BAC Flight Test Envelope Parameters
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">Planform Area</span>
                  <span className="text-emerald-400 font-bold text-base">358.25 m²</span>
                </div>
                <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">Aspect Ratio</span>
                  <span className="text-emerald-400 font-bold text-base">1.83</span>
                </div>
                <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">Leading Sweep</span>
                  <span className="text-emerald-400 font-bold text-base">63° Ogival</span>
                </div>
                <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">Thickness Ratio</span>
                  <span className="text-emerald-400 font-bold text-base">3% (Ultra-thin)</span>
                </div>
              </div>
            </div>
          }
        />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: THE TRADE-OFFS (Regime Switcher)
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Section 03 // Engineering Choices
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mt-1">
              Every Design Choice Has a Severe Cost
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            SUPERSONIC VS SUBSONIC REGIMES
          </p>
        </div>

        <TradeOffTable tradeOffs={aircraft.tradeOffs} />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: FIVE CORE AIRFRAME SYSTEMS (With Olympus Engine Art)
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Section 04 // Core Systems Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mt-1">
              The Five Design Decisions
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            AERODYNAMICS • PROPULSION • STRUCTURE • FUEL • CONTROLS
          </p>
        </div>

        <div className="space-y-8">
          {aircraft.designSystems.map((sys) => (
            <div
              key={sys.id}
              className="rounded-3xl border border-white/10 aerolab-glass p-8 sm:p-10 shadow-2xl space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono font-black flex items-center justify-center text-base">
                    {sys.letter}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
                    {sys.name}
                  </h3>
                </div>

                {sys.labSlug && (
                  <Link
                    href={`/lab/${sys.labSlug}`}
                    className="inline-flex items-center gap-2 text-xs font-mono text-slate-950 font-bold bg-emerald-400 hover:bg-emerald-300 px-4 py-2 rounded-xl transition-all shadow-md self-start sm:self-auto"
                  >
                    <span>Launch Lab: {sys.labName}</span>
                    <span>→</span>
                  </Link>
                )}
              </div>

              {/* Special Featured Image for Propulsion (Olympus Afterburner) */}
              {sys.id === 'propulsion' && (
                <div className="relative w-full h-[300px] sm:h-[380px] rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src="/assets/olympus_engine_afterburner.jpg"
                    alt="Rolls-Royce Olympus 593 turbojet test bench afterburner firing"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05110a] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 text-xs text-slate-200">
                    <span className="font-mono text-amber-400 font-bold uppercase block mb-1">
                      Rolls-Royce / SNECMA Olympus 593 — Test Cell Firing
                    </span>
                    Notice the visible diamond shock diamonds in the supersonic exhaust plume. Sustained supersonic cruise created demanding inlet and engine-cycle conditions. Concorde used the low/zero-bypass Olympus 593 turbojet architecture with variable-geometry intake ramps rather than a conventional high-bypass turbofan.
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
                <div className="space-y-2 rounded-2xl bg-black/40 p-5 border border-red-500/20">
                  <span className="font-mono text-red-400 uppercase tracking-widest font-bold text-xs block">
                    The Problem
                  </span>
                  <p className="text-slate-300">{sys.problem}</p>
                </div>
                <div className="space-y-2 rounded-2xl bg-black/40 p-5 border border-emerald-500/20">
                  <span className="font-mono text-emerald-400 uppercase tracking-widest font-bold text-xs block">
                    The Physical Solution
                  </span>
                  <p className="text-slate-300">{sys.solution}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div className="flex flex-wrap gap-3 text-slate-400">
                  {sys.realData.map((d, idx) => (
                    <span key={idx} className="bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg text-slate-200 font-semibold">
                      {d}
                    </span>
                  ))}
                </div>
                <div className="text-slate-500">
                  Sources: {sys.sources.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: THE REAL NUMBERS (Expandable Specifications)
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Section 05 // Traceable Specifications
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mt-1">
              The Real Numbers
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            PRIMARY TEST CERTIFICATES & CAA/FAA RECORDS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {aircraft.specifications.map((spec) => (
            <SpecificationCard
              key={spec.id}
              spec={spec}
              onOpenEvidence={(evId) => setSelectedEvidenceId(evId)}
            />
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: TRACEABLE EVIDENCE CALLOUT
      ───────────────────────────────────────────────────────────── */}
      <section className="rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-[#0a2618] to-[#04110a] p-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
        <div className="space-y-1.5 max-w-xl">
          <span className="font-mono uppercase text-emerald-400 font-bold text-sm block">
            Verifiable Research Guarantee
          </span>
          <p className="text-slate-200 leading-relaxed">
            Every green dashed claim across AeroLab is clickable. Selecting it opens primary NASA wind tunnel reports, BAC technical memoranda, and peer-reviewed AIAA papers.
          </p>
        </div>
        <button
          onClick={() => setSelectedEvidenceId('ev-delta-wing')}
          className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-mono font-black hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(0,255,136,0.3)]"
        >
          Inspect Sample Source: NASA TN D-4607 →
        </button>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: DESIGN SPACE COMPARISON
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Section 07 // Aerodynamic Mapping
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mt-1">
              Where Concorde Fits in the Aviation Design Space
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            ASPECT RATIO VS MACH NUMBER SCATTER PLOT
          </p>
        </div>

        <DesignSpaceChart aircraft={aircraft.comparisonAircraft} />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: QUESTIONS THIS RAISES
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Section 08 // Branching Investigations
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mt-1">
              The Questions Concorde Raises
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            FOLLOW PHYSICS DOWN THE RABBIT HOLE
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {aircraft.relatedQuestions.map((q, idx) => (
            <Link
              key={idx}
              href={q.url}
              className="rounded-2xl border border-white/10 aerolab-glass p-6 hover:border-emerald-400/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <h4 className="text-lg font-bold text-white font-serif">{q.question}</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{q.description}</p>
              </div>
              <span className="mt-5 text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                <span>Continue Investigation</span>
                <span>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Traceable Evidence Modal */}
      {activeEvidence && (
        <EvidencePanel
          evidence={activeEvidence}
          isOpen={true}
          onClose={() => setSelectedEvidenceId(null)}
        />
      )}
    </article>
  )
}
