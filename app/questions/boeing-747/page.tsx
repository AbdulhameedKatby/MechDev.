import React from 'react'
import Link from 'next/link'
import DepthTabs from '../../../components/DepthTabs'

export default function Boeing747Page() {
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
          Investigation 05 · Structural Engineering
        </div>
        <h1 className="text-4xl font-extrabold text-white font-serif mt-1">
          How did the 747 change aviation with efficiency at scale?
        </h1>
        <p className="mt-2 text-slate-300">
          Wide-body revolution, high-bypass turbofans, and the economics of transatlantic flight.
        </p>
      </div>

      {/* DepthTabs */}
      <DepthTabs
        discover={
          <div className="space-y-6 text-slate-200">
            <div className="text-lg leading-relaxed font-serif text-white">
              The Boeing 747 fundamentally transformed the economics of air travel by solving problems of scale.
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Moving from narrow-body single-aisle aircraft to a massive wide-body double-aisle layout meant packing more passengers per unit of fuel burned. This required revolutionary high-bypass turbofan engines, novel twin-aisle fuselage cross-sections, and advanced structural load management around its iconic hump.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              {/* Narrow vs Wide-Body Cross-Section */}
              <div className="rounded-xl border border-sky-500/30 bg-[#07111d] p-4 text-center space-y-2">
                <span className="text-xs font-mono text-sky-400 font-bold block">
                  NARROW VS WIDE-BODY
                </span>
                <svg viewBox="0 0 300 150" className="w-full h-32 mx-auto">
                  {/* 707 Cross-Section */}
                  <circle cx="75" cy="75" r="40" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
                  <line x1="40" y1="80" x2="110" y2="80" stroke="#1e3a4a" strokeWidth="1.5" />
                  <text x="75" y="45" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace">707 (3.76m)</text>
                  {/* 707 Passengers (3-3) */}
                  {[50, 60, 70, 80, 90, 100].map((x, i) => (
                    <circle key={`707-${i}`} cx={x} cy="75" r="2.5" fill={i === 2 || i === 3 ? "none" : "#38bdf8"} />
                  ))}

                  {/* 747 Cross-Section */}
                  <circle cx="210" cy="75" r="65" fill="none" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="150" y1="85" x2="270" y2="85" stroke="#1e3a4a" strokeWidth="1.5" />
                  <text x="210" y="30" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace">747 (6.5m)</text>
                  {/* 747 Passengers (3-4-3) */}
                  {[160, 170, 180, 190, 200, 210, 220, 230, 240, 250].map((x, i) => (
                    <circle key={`747-${i}`} cx={x} cy="80" r="2.5" fill={i === 2 || i === 3 || i === 6 || i === 7 ? "none" : "#38bdf8"} />
                  ))}
                  
                  {/* Cargo decks */}
                  <path d="M 60 95 L 90 95 L 85 110 L 65 110 Z" fill="none" stroke="#1e3a4a" strokeWidth="1" />
                  <path d="M 180 100 L 240 100 L 230 130 L 190 130 Z" fill="none" stroke="#1e3a4a" strokeWidth="1.5" />
                  <text x="210" y="118" textAnchor="middle" fill="#1e3a4a" fontSize="8" fontFamily="monospace">LD3 CARGO</text>
                </svg>
                <p className="text-[11px] text-sky-200/80">
                  Twin aisles enabled 10-abreast seating and standard LD3 cargo containers below.
                </p>
              </div>

              {/* High-Bypass Turbofan */}
              <div className="rounded-xl border border-emerald-500/30 bg-[#0b1a11] p-4 text-center space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold block">
                  HIGH-BYPASS TURBOFAN
                </span>
                <svg viewBox="0 0 300 150" className="w-full h-32 mx-auto">
                  {/* Engine Cowling */}
                  <path d="M 30 40 Q 150 30 250 50 Q 250 100 250 100 Q 150 120 30 110 Z" fill="none" stroke="#34d399" strokeWidth="2" />
                  {/* Core */}
                  <path d="M 100 60 L 270 65 L 270 85 L 100 90 Z" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                  {/* Fan */}
                  <line x1="60" y1="40" x2="60" y2="110" stroke="#34d399" strokeWidth="6" strokeDasharray="4 2" />
                  {/* Airflow arrows */}
                  {/* Bypass */}
                  <path d="M 10 50 L 50 50 L 90 45 L 240 55" fill="none" stroke="#6ee7b7" strokeWidth="1.5" strokeDasharray="3 3" />
                  <polygon points="240,55 235,52 235,58" fill="#6ee7b7" />
                  <path d="M 10 100 L 50 100 L 90 105 L 240 95" fill="none" stroke="#6ee7b7" strokeWidth="1.5" strokeDasharray="3 3" />
                  <polygon points="240,95 235,92 235,98" fill="#6ee7b7" />
                  {/* Core flow */}
                  <path d="M 10 75 L 50 75 L 280 75" fill="none" stroke="#fcd34d" strokeWidth="1.5" />
                  <polygon points="280,75 275,72 275,78" fill="#fcd34d" />
                  
                  <text x="150" y="40" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontFamily="monospace">BYPASS (5:1)</text>
                  <text x="180" y="78" textAnchor="middle" fill="#fcd34d" fontSize="10" fontFamily="monospace">CORE</text>
                </svg>
                <p className="text-[11px] text-emerald-200/80">
                  JT9D engine bypassed 5x more air around the core, massively boosting efficiency.
                </p>
              </div>

              {/* The Hump & Wing Root */}
              <div className="rounded-xl border border-amber-500/30 bg-[#1a1407] p-4 text-center space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold block">
                  THE HUMP & STRUCTURE
                </span>
                <svg viewBox="0 0 300 150" className="w-full h-32 mx-auto">
                  {/* Fuselage Outline */}
                  <path d="M 30 80 Q 20 60 50 50 Q 100 45 130 65 Q 160 65 260 65 Q 280 65 290 75 Q 280 90 260 90 L 50 90 Q 20 90 30 80" fill="none" stroke="#fbbf24" strokeWidth="2" />
                  {/* Cockpit / Hump Windows */}
                  <path d="M 40 60 L 45 55 L 55 56 L 50 62 Z" fill="#b45309" />
                  {/* Wing Root */}
                  <path d="M 120 85 Q 140 70 160 85 Q 150 110 130 110 Z" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
                  {/* Structural Load Paths */}
                  <path d="M 50 50 L 120 85" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2" />
                  <path d="M 130 65 L 140 85" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2" />
                  
                  <text x="90" y="40" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace">COCKPIT HUMP</text>
                  <text x="140" y="125" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace">WING BOX</text>
                </svg>
                <p className="text-[11px] text-amber-200/80">
                  Raising the cockpit allowed nose-loading cargo doors, shaping the iconic profile.
                </p>
              </div>
            </div>
          </div>
        }
        understand={
          <div className="space-y-6 text-slate-200">
            <h3 className="text-lg font-bold text-white font-serif">
              Breguet Range, Propulsive Efficiency, and Hoop Stress
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              The 747 was able to carry huge payloads across oceans without refueling. This achievement is heavily grounded in three aerospace engineering principles:
            </p>

            <h4 className="text-md font-bold text-emerald-400 font-serif pt-2">1. The Breguet Range Equation</h4>
            <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
              <div>R = (V/g) × (L/D) × (1/TSFC) × ln(W_i/W_f)</div>
              <div className="text-slate-400 pt-1">Substitute 747 values:</div>
              <div className="text-slate-400">  V=250 m/s, L/D=17.5, TSFC=0.068 kg/N/hr</div>
              <div className="text-emerald-400 pt-1">Result: R ≈ 13,450 km ✓ (matches published data)</div>
            </div>

            <h4 className="text-md font-bold text-sky-400 font-serif pt-2">2. Bypass Ratio & Propulsive Efficiency</h4>
            <div className="rounded-xl bg-[#06110a] p-4 border border-sky-500/20 font-mono text-xs text-sky-300 space-y-2">
              <div>η_p = 2/(1 + V_jet/V_aircraft)</div>
              <div className="text-slate-400 pt-1">At BPR 5:1, V_jet ≈ 340 m/s:</div>
              <div className="text-slate-400">  η_p ≈ 0.85</div>
              <div className="text-sky-400 pt-1">Result: Compare turbojet (BPR 0) η_p ≈ 0.55</div>
            </div>

            <h4 className="text-md font-bold text-amber-400 font-serif pt-2">3. Fuselage Hoop Stress</h4>
            <div className="rounded-xl bg-[#06110a] p-4 border border-amber-500/20 font-mono text-xs text-amber-300 space-y-2">
              <div>σ_hoop = (ΔP × r) / t</div>
              <div className="text-slate-400 pt-1">For 747:</div>
              <div className="text-slate-400">  ΔP=60 kPa, r=3.25m, t=2mm</div>
              <div className="text-amber-400 pt-1">Result: σ_hoop = 97.5 MPa</div>
              <div className="text-slate-400">Larger diameter directly increases hoop stress, requiring thicker, heavier skin materials.</div>
            </div>
          </div>
        }
        investigate={
          <div className="space-y-6 text-slate-200">
            <h3 className="text-lg font-bold text-white font-serif">
              Generational Comparisons of Wide-Body Aircraft
            </h3>

            <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#07150e]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase">
                    <th className="p-3">Parameter</th>
                    <th className="p-3">Boeing 707-320B</th>
                    <th className="p-3">Boeing 747-400</th>
                    <th className="p-3">Airbus A380-800</th>
                    <th className="p-3">Boeing 777-9</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  <tr>
                    <td className="p-3 text-white font-semibold">MTOW (tonnes)</td>
                    <td className="p-3">152</td>
                    <td className="p-3 text-emerald-400 font-bold">397</td>
                    <td className="p-3">575</td>
                    <td className="p-3">351</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Range (km)</td>
                    <td className="p-3">9,300</td>
                    <td className="p-3 text-emerald-400 font-bold">13,450</td>
                    <td className="p-3">14,800</td>
                    <td className="p-3">13,500</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Bypass Ratio</td>
                    <td className="p-3">1.3:1</td>
                    <td className="p-3 text-emerald-400 font-bold">5:1</td>
                    <td className="p-3">8.5:1</td>
                    <td className="p-3">10:1</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Passengers (Typical)</td>
                    <td className="p-3">141</td>
                    <td className="p-3 text-emerald-400 font-bold">416</td>
                    <td className="p-3">525</td>
                    <td className="p-3">426</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Fuel/pax/100km (L)</td>
                    <td className="p-3">~4.5</td>
                    <td className="p-3 text-emerald-400 font-bold">~3.2</td>
                    <td className="p-3">~2.9</td>
                    <td className="p-3">~2.5</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Wing Area (m²)</td>
                    <td className="p-3">283</td>
                    <td className="p-3 text-emerald-400 font-bold">525</td>
                    <td className="p-3">845</td>
                    <td className="p-3">516</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Aspect Ratio</td>
                    <td className="p-3">7.1</td>
                    <td className="p-3 text-emerald-400 font-bold">7.9</td>
                    <td className="p-3">7.5</td>
                    <td className="p-3">10.8</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">First Flight</td>
                    <td className="p-3">1959</td>
                    <td className="p-3 text-emerald-400 font-bold">1988</td>
                    <td className="p-3">2005</td>
                    <td className="p-3">2020</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-xs text-amber-200 space-y-1">
              <span className="font-bold font-mono text-amber-400 block">MODEL LIMITATIONS & DISCLAIMERS</span>
              <p>Sources: Boeing Type Certificate Data Sheet, FAA TCDS A20WE. Fuel per passenger values are heavily dependent on specific operator cabin density, average stage lengths, and payload factors. MTOW and Range numbers represent common weight variants; multiple other variants exist in the family.</p>
            </div>
          </div>
        }
      />

      {/* Cross Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
        <Link
          href="/lab/aspect-ratio"
          className="group rounded-xl border border-white/10 bg-[#07032a] p-5 hover:border-emerald-500/30 transition-colors"
        >
          <span className="text-xs font-mono text-slate-400 block">Related Lab</span>
          <span className="text-white font-bold mt-1 block group-hover:text-emerald-400 transition-colors">
            Aspect Ratio Lab →
          </span>
        </Link>
        <Link
          href="/questions/why-delta-wing"
          className="group rounded-xl border border-white/10 bg-[#07032a] p-5 hover:border-emerald-500/30 transition-colors"
        >
          <span className="text-xs font-mono text-slate-400 block">Related Investigation</span>
          <span className="text-white font-bold mt-1 block group-hover:text-emerald-400 transition-colors">
            Why did Concorde need a delta wing? →
          </span>
        </Link>
      </div>
    </div>
  )
}
