import React from 'react'
import Link from 'next/link'
import DepthTabs from '../../../components/DepthTabs'

export default function A350EfficiencyPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      {/* Breadcrumb & Header */}
      <div>
        <Link
          href="/questions"
          className="text-xs font-mono text-emerald-400 hover:underline mb-2 inline-block"
        >
          ← Back to All Questions
        </Link>
        <div className="text-xs uppercase font-mono text-slate-400">
          Investigation 04 · Structures & Propulsion
        </div>
        <h1 className="text-4xl font-extrabold text-white font-serif mt-1">
          How does the A350-1000 fly 8,700 nautical miles efficiently?
        </h1>
        <p className="mt-2 text-slate-300">
          Variable camber wings, ultra-high bypass Trent XWB-97 engines, and what CFRP composites actually do to an airframe&apos;s mass fraction.
        </p>
      </div>

      <DepthTabs
        discover={
          <div className="space-y-6 text-slate-200">
            <div className="text-lg leading-relaxed font-serif text-white">
              Flying 8,700 nautical miles non-stop is not about power — it&apos;s about relentless efficiency at every stage of flight.
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              The A350-1000 routinely connects Singapore to New York (9,500 nm) and Perth to London (9,009 nm). To carry 369 passengers across half the globe, every kilogram of structure saved is a kilogram of additional fuel — and every fraction of a percent improvement in engine efficiency means hundreds of extra miles of range.
            </p>

            {/* Three pillars diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              {/* CFRP structure */}
              <div className="rounded-xl border border-sky-500/30 bg-[#07111d] p-4 space-y-2">
                <span className="text-xs font-mono text-sky-400 font-bold block text-center">
                  53% CFRP Airframe
                </span>
                <svg viewBox="0 0 120 100" className="w-full h-20">
                  {/* Fuselage cross-section */}
                  <ellipse cx="60" cy="55" rx="45" ry="32" fill="none" stroke="#38bdf8" strokeWidth="2" />
                  {/* CFRP layer hatching */}
                  {[0, 10, 20, 30, 40].map((offset) => (
                    <line key={offset} x1={16 + offset} y1="50" x2={30 + offset} y2="30"
                      stroke="#38bdf8" strokeWidth="0.8" opacity="0.5" />
                  ))}
                  {/* Weight arrow down */}
                  <text x="60" y="20" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace">Composite Shell</text>
                  <text x="60" y="75" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="monospace">-25% weight vs Al</text>
                </svg>
                <p className="text-[11px] text-sky-200/80 text-center">
                  Wing box, fuselage barrel, tail — all carbon fibre. Saves ~15,000 kg vs. aluminium.
                </p>
              </div>

              {/* Variable Camber Wing */}
              <div className="rounded-xl border border-emerald-500/30 bg-[#0b1a11] p-4 space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold block text-center">
                  Variable Camber Wing
                </span>
                <svg viewBox="0 0 120 100" className="w-full h-20">
                  {/* Wing profile — cruise camber */}
                  <path d="M 10 65 Q 40 35 80 55 Q 100 62 112 65 Z" fill="#0f2b1d" stroke="#0e9954" strokeWidth="1.5" />
                  {/* Variable trailing edge */}
                  <path d="M 80 55 Q 96 58 112 63" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                  <text x="60" y="20" textAnchor="middle" fill="#0e9954" fontSize="8" fontFamily="monospace">Cruise camber</text>
                  <text x="60" y="30" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">variable TE</text>
                  {/* L/D annotation */}
                  <text x="60" y="82" textAnchor="middle" fill="#34d399" fontSize="9" fontFamily="monospace">L/D ≈ 20.9</text>
                </svg>
                <p className="text-[11px] text-emerald-200/80 text-center">
                  Trailing edge droops / rises to maintain optimal camber at each fuel-burn weight.
                </p>
              </div>

              {/* Trent XWB */}
              <div className="rounded-xl border border-amber-500/30 bg-[#1a1407] p-4 space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold block text-center">
                  Trent XWB-97 Engine
                </span>
                <svg viewBox="0 0 120 100" className="w-full h-20">
                  {/* Engine outline */}
                  <rect x="10" y="30" width="100" height="40" rx="6" fill="#1a1407" stroke="#f59e0b" strokeWidth="1.5" />
                  {/* Fan */}
                  <circle cx="30" cy="50" r="18" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                  <circle cx="30" cy="50" r="6" fill="#1a1407" stroke="#f59e0b" strokeWidth="1" />
                  {/* Core */}
                  <rect x="52" y="38" width="50" height="24" rx="3" fill="#2a1a05" stroke="#fbbf24" strokeWidth="1" />
                  <text x="77" y="52" textAnchor="middle" fill="#fbbf24" fontSize="7" fontFamily="monospace">HOT CORE</text>
                  {/* BPR annotation */}
                  <text x="30" y="84" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="monospace">BPR 9.3</text>
                  <text x="85" y="84" textAnchor="middle" fill="#fbbf24" fontSize="8" fontFamily="monospace">97,000 lbf</text>
                </svg>
                <p className="text-[11px] text-amber-200/80 text-center">
                  World&apos;s most efficient large turbofan. TSFC: ~0.478 lb/lbf/hr.
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              These three systems compound. A lighter airframe needs less lift. Less lift means a smaller wing. A smaller wing creates less induced drag. Less drag means the engines burn less fuel. Less fuel burn at range means the aircraft can carry more payload — or fly further. The <strong className="text-white">Breguet range equation</strong> shows exactly how each variable multiplies the others.
            </p>
          </div>
        }
        understand={
          <div className="space-y-6 text-slate-200">
            <h3 className="text-lg font-bold text-white font-serif">
              The Breguet Range Equation — Why Everything Compounds
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              The fundamental range equation shows that range depends on the <em>product</em> of efficiency terms — meaning every improvement multiplies with every other:
            </p>

            <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
              <div>R = (V/g) × (L/D) × (1/TSFC) × ln(W_initial / W_final)</div>
              <div className="text-slate-400 pt-1">Where:</div>
              <div className="text-slate-400">  V = cruise velocity (Mach 0.85 = ~487 kts)</div>
              <div className="text-slate-400">  L/D = aerodynamic efficiency (~20.9 for A350-1000)</div>
              <div className="text-slate-400">  TSFC = thrust specific fuel consumption (0.478 lb/lbf/hr)</div>
              <div className="text-slate-400">  ln(Wi/Wf) = fuel fraction ≈ ln(316,000/200,000) = 0.457</div>
              <div className="text-emerald-400 pt-1">R ≈ 8,700 nm ✓ (matches published range)</div>
            </div>

            <h3 className="text-lg font-bold text-white font-serif pt-2">
              CFRP: More Than Just Weight Saving
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              Carbon Fibre Reinforced Polymer accounts for 53% of the A350&apos;s structure by weight. The structural mass fraction improvement is substantial, but CFRP has a second advantage — it can be tailored to <strong className="text-white">aeroelastically twist</strong> under load, acting like a passive variable-twist wing:
            </p>

            <div className="rounded-xl bg-[#06110a] p-4 border border-sky-500/20 font-mono text-xs text-sky-300 space-y-2">
              <div>ε_CFRP / ε_Al ≈ 0.3 (70% less elastic strain for same stress)</div>
              <div className="text-slate-400">Specific strength (σ_ult/ρ): CFRP = 2.45 MNm/kg vs Al 7075 = 0.23 MNm/kg</div>
              <div className="text-slate-400 pt-1">
                Weight saving per unit area: ~45% for primary wing-box structure.
              </div>
              <div className="text-slate-400">
                A350-1000 MTOW: 316,000 kg. Al-equivalent MTOW estimate: ~331,000 kg (+15t fuel burn penalty).
              </div>
            </div>

            <h3 className="text-lg font-bold text-white font-serif pt-2">
              Variable Camber Wing — Active Load Control
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              The A350 wing has no traditional spoilers for primary roll — it uses <strong className="text-white">differential droop</strong> of outer ailerons and continuously varies trailing-edge camber as fuel burns off (the aircraft gets lighter during flight). This maintains the wing at its optimal angle-of-attack and camber for minimum drag at every weight:
            </p>

            <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
              <div>C_L_required ∝ W / (q × S)  — as W decreases, C_L_opt shifts</div>
              <div className="text-slate-400 pt-1">
                Fixed-wing aircraft must fly at sub-optimal AoA as fuel burns. Variable camber maintains C_L = C_L_opt at all weights → L/D stays near 20.9 throughout flight.
              </div>
              <div className="text-emerald-400 pt-1">
                Estimated fuel saving from variable camber vs. fixed wing: ~1.5% per sector.
              </div>
            </div>
          </div>
        }
        investigate={
          <div className="space-y-6 text-slate-200">
            <h3 className="text-lg font-bold text-white font-serif">
              A350-1000 vs. Comparable Long-Range Aircraft — Key Parameters
            </h3>

            <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#06110a]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase">
                    <th className="p-3">Parameter</th>
                    <th className="p-3">A350-1000</th>
                    <th className="p-3">Boeing 777-9</th>
                    <th className="p-3">B787-10</th>
                    <th className="p-3">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  <tr>
                    <td className="p-3 text-white font-semibold">Max Range</td>
                    <td className="p-3 text-emerald-400 font-bold">8,700 nm</td>
                    <td className="p-3 text-slate-300">7,285 nm</td>
                    <td className="p-3 text-slate-300">6,430 nm</td>
                    <td className="p-3">ICAO/Airbus ACAP</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">CFRP Structure %</td>
                    <td className="p-3 text-sky-400 font-bold">53%</td>
                    <td className="p-3 text-slate-300">~12% (Al-Li primary)</td>
                    <td className="p-3 text-slate-300">50%</td>
                    <td className="p-3">Airbus AMM; FAA Type Design</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Engine Bypass Ratio</td>
                    <td className="p-3 text-amber-400 font-bold">9.3:1 (Trent XWB-97)</td>
                    <td className="p-3 text-slate-300">10.0:1 (GE9X)</td>
                    <td className="p-3 text-slate-300">8.3:1 (Trent 1000)</td>
                    <td className="p-3">RR / GE Engine Specs</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">TSFC (cruise)</td>
                    <td className="p-3 text-emerald-400 font-bold">0.478 lb/lbf/hr</td>
                    <td className="p-3 text-slate-300">~0.462 lb/lbf/hr</td>
                    <td className="p-3 text-slate-300">~0.510 lb/lbf/hr</td>
                    <td className="p-3">Engine Alliance / RR data</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Cruise L/D</td>
                    <td className="p-3 text-emerald-400 font-bold">~20.9</td>
                    <td className="p-3 text-slate-300">~21.5</td>
                    <td className="p-3 text-slate-300">~19.5</td>
                    <td className="p-3">AIAA 2018-3299</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Wing Span</td>
                    <td className="p-3 text-sky-400 font-bold">64.75 m</td>
                    <td className="p-3 text-slate-300">71.8 m (folded: 64.8 m)</td>
                    <td className="p-3 text-slate-300">60.1 m</td>
                    <td className="p-3">Jane&apos;s / Airbus FD</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Fuel/Pax/km (est.)</td>
                    <td className="p-3 text-emerald-400 font-bold">~2.9 L</td>
                    <td className="p-3 text-slate-300">~2.7 L</td>
                    <td className="p-3 text-slate-300">~3.1 L</td>
                    <td className="p-3">ICAO Circular 337</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-xs text-emerald-200 leading-relaxed">
              <span className="font-bold text-emerald-300">Manufacturing Note: </span>
              The A350-1000 wing box — the largest CFRP primary structure ever built in series production — is manufactured in a single autoclave cure at Airbus Nantes. The 32-meter spars are wound from pre-preg carbon tape and cured at 180°C under 7 bar pressure. This eliminates thousands of fasteners compared to aluminium multi-part assemblies, reducing both weight and maintenance complexity.
            </div>

            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 text-xs text-amber-200 leading-relaxed">
              <span className="font-bold text-amber-300">Model Limitation & Disclaimers: </span>
              TSFC and L/D values are engineering estimates from public sources. Actual in-service figures are proprietary. The Breguet range calculation above uses simplified assumptions (constant cruise altitude and speed, no step-climb). Real ultra-long-haul operations use step-climbs from FL320 to FL410 over the course of a sector, gaining approximately 2–4% additional fuel efficiency vs. constant-altitude cruise.
            </div>
          </div>
        }
      />

      {/* Cross Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
        <Link
          href="/lab/bypass-ratio"
          className="rounded-xl border border-white/10 bg-[#07111d] p-5 hover:border-sky-500/40 transition-colors flex flex-col justify-between"
        >
          <div>
            <span className="text-xs font-mono text-sky-400 uppercase">Simulate in Lab</span>
            <h4 className="text-base font-bold text-white mt-1">Bypass Ratio Lab</h4>
            <p className="text-xs text-slate-400 mt-1">Tune bypass ratio and see how TSFC, thrust, and jet velocity trade off — the core of Trent XWB design.</p>
          </div>
          <span className="mt-4 text-xs font-mono text-sky-400">Launch Interactive Lab →</span>
        </Link>

        <Link
          href="/lab/aspect-ratio"
          className="rounded-xl border border-white/10 bg-[#0b1c13] p-5 hover:border-emerald-500/40 transition-colors flex flex-col justify-between"
        >
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase">Simulate in Lab</span>
            <h4 className="text-base font-bold text-white mt-1">Aspect Ratio & Induced Drag Lab</h4>
            <p className="text-xs text-slate-400 mt-1">See how the A350&apos;s AR 9.5 wing (vs Concorde&apos;s 1.83) dramatically reduces induced drag at cruise.</p>
          </div>
          <span className="mt-4 text-xs font-mono text-emerald-400">Launch Interactive Lab →</span>
        </Link>
      </div>
    </div>
  )
}
