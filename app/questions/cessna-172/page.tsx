import React from 'react'
import Link from 'next/link'
import DepthTabs from '../../../components/DepthTabs'

export default function Cessna172Page() {
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
          Investigation 06 · Stability & Control
        </div>
        <h1 className="text-4xl font-extrabold text-white font-serif mt-1">
          Why is the Cessna 172 the most forgiving aircraft ever built?
        </h1>
        <p className="mt-2 text-slate-300">
          High-wing stability, docile stall behavior, and 70 years of teaching pilots to fly.
        </p>
      </div>

      {/* 3-Layer Progressive Disclosure */}
      <DepthTabs
        tabs={[
          {
            id: 'discover',
            label: '01 DISCOVER',
            content: (
              <div className="space-y-6 text-slate-200">
                <div className="text-lg leading-relaxed font-serif text-white">
                  Since 1956, over 44,000 Cessna 172s have been built. It&apos;s not fast, and it&apos;s not aerobatic — but it is the ultimate classroom in the sky.
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The Cessna 172 is designed to naturally return to straight and level flight if the pilot lets go of the controls. This inherent aerodynamic stability is engineered into its geometry, from the high wing to its specific stall characteristics.
                </p>

                {/* Diagrams */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  {/* High-Wing Stability */}
                  <div className="rounded-xl border border-emerald-500/30 bg-[#0b1a11] p-4 text-center space-y-2">
                    <span className="text-xs font-mono text-emerald-400 font-bold block">
                      High-Wing Pendulum Stability
                    </span>
                    <svg viewBox="0 0 120 120" className="w-full h-24 mx-auto">
                      {/* Airplane Cross-section Banked */}
                      <g transform="translate(60, 50) rotate(15)">
                        {/* Fuselage */}
                        <ellipse cx="0" cy="0" rx="10" ry="14" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                        {/* High Wing */}
                        <path d="M -45 -10 L 45 -10" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                        {/* CG Marker */}
                        <circle cx="0" cy="5" r="3" fill="#fbbf24" />
                        <path d="M -3 5 L 3 5 M 0 2 L 0 8" stroke="#000" strokeWidth="1" />
                      </g>
                      
                      {/* Gravity Vector straight down */}
                      <line x1="57" y1="58" x2="57" y2="90" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
                      <polygon points="54,85 60,85 57,92" fill="#f59e0b" />
                      <text x="50" y="85" fill="#f59e0b" fontSize="8" fontFamily="monospace">W</text>
                      
                      {/* Lift Vector perpendicular to wing */}
                      <line x1="60" y1="36" x2="48" y2="10" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="46,14 52,12 47,8" fill="#38bdf8" />
                      <text x="40" y="15" fill="#38bdf8" fontSize="8" fontFamily="monospace">L</text>

                      {/* Restoring Moment Arrow */}
                      <path d="M 75 75 A 30 30 0 0 0 85 50" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
                      <polygon points="82,49 88,52 86,48" fill="#10b981" />
                      
                      {/* Note */}
                      <text x="60" y="112" textAnchor="middle" fill="#10b981" fontSize="7" fontFamily="monospace">Restoring Moment</text>
                    </svg>
                    <p className="text-[11px] text-emerald-200/80">
                      CG below the wing creates a natural pendulum restoring force when banked.
                    </p>
                  </div>

                  {/* Stall Progression */}
                  <div className="rounded-xl border border-red-500/30 bg-[#160b0b] p-4 text-center space-y-2">
                    <span className="text-xs font-mono text-red-400 font-bold block">
                      Stall Progression & Washout
                    </span>
                    <svg viewBox="0 0 120 120" className="w-full h-24 mx-auto">
                      {/* Fuselage (top down) */}
                      <ellipse cx="60" cy="60" rx="8" ry="30" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                      
                      {/* Left Wing */}
                      <path d="M 52 50 L 10 50 L 10 65 L 52 70 Z" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                      {/* Right Wing */}
                      <path d="M 68 50 L 110 50 L 110 65 L 68 70 Z" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                      
                      {/* Stalled Regions (Root) */}
                      <path d="M 52 50 L 30 50 L 30 67.5 L 52 70 Z" fill="#7f1d1d" opacity="0.8" />
                      <path d="M 68 50 L 90 50 L 90 67.5 L 68 70 Z" fill="#7f1d1d" opacity="0.8" />
                      
                      {/* Washout Angle Indicators */}
                      <text x="20" y="45" fill="#10b981" fontSize="6" fontFamily="monospace">Tip: -3°</text>
                      <text x="100" y="45" fill="#10b981" fontSize="6" fontFamily="monospace">Tip: -3°</text>
                      
                      {/* Stall text */}
                      <text x="40" y="85" textAnchor="middle" fill="#ef4444" fontSize="7" fontFamily="monospace">Root Stalls</text>
                      <text x="40" y="95" textAnchor="middle" fill="#ef4444" fontSize="7" fontFamily="monospace">First</text>

                      {/* Aileron authority */}
                      <text x="20" y="75" fill="#38bdf8" fontSize="6" fontFamily="monospace">Ailerons active</text>
                      <text x="100" y="75" fill="#38bdf8" fontSize="6" fontFamily="monospace" textAnchor="end">Ailerons active</text>
                    </svg>
                    <p className="text-[11px] text-red-200/80">
                      Wing twist (washout) forces the root to stall first, preserving roll control.
                    </p>
                  </div>

                  {/* T/W Comparison Ladder */}
                  <div className="rounded-xl border border-sky-500/30 bg-[#07111d] p-4 text-center space-y-2">
                    <span className="text-xs font-mono text-sky-400 font-bold block">
                      Thrust-to-Weight Ratio
                    </span>
                    <svg viewBox="0 0 120 120" className="w-full h-24 mx-auto">
                      {/* Axis */}
                      <line x1="10" y1="10" x2="10" y2="105" stroke="#38bdf8" strokeWidth="1" />
                      <line x1="10" y1="105" x2="110" y2="105" stroke="#38bdf8" strokeWidth="1" />
                      
                      {/* Cessna 172 (0.06) */}
                      <rect x="10" y="20" width="10" height="8" fill="#10b981" />
                      <text x="25" y="26" fill="#10b981" fontSize="7" fontFamily="monospace">C172 (0.06)</text>
                      
                      {/* Boeing 747 (0.25) */}
                      <rect x="10" y="40" width="25" height="8" fill="#94a3b8" />
                      <text x="40" y="46" fill="#94a3b8" fontSize="7" fontFamily="monospace">B747 (0.25)</text>
                      
                      {/* Concorde (0.37) */}
                      <rect x="10" y="60" width="37" height="8" fill="#38bdf8" />
                      <text x="52" y="66" fill="#38bdf8" fontSize="7" fontFamily="monospace">Concorde (0.37)</text>

                      {/* F-16 (1.09) */}
                      <rect x="10" y="80" width="90" height="8" fill="#ef4444" />
                      <text x="102" y="86" fill="#ef4444" fontSize="7" fontFamily="monospace">F-16 (1.09)</text>

                      {/* T/W Label */}
                      <text x="60" y="115" textAnchor="middle" fill="#38bdf8" fontSize="6" fontFamily="monospace">T/W Ratio (lb/lb)</text>
                    </svg>
                    <p className="text-[11px] text-sky-200/80">
                      Low T/W ratio forces pilots to manage energy efficiently.
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  The combination of a high-mounted wing, deliberate wing twist (washout), and low wing loading results in an aircraft that resists spinning and provides ample aerodynamic warning before stalling. These traits make it incredibly forgiving of student pilot errors.
                </p>
              </div>
            )
          },
          {
            id: 'understand',
            label: '02 UNDERSTAND',
            content: (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-lg font-bold text-white font-serif">
                  The Physics of Forgiveness
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  How does the Cessna 172 achieve such slow, safe flight? It comes down to wing loading and the mathematics of lift. A stall occurs when the wing exceeds its critical angle of attack, but the <i>speed</i> at which this happens is dictated by the aircraft&apos;s parameters.
                </p>

                <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
                  <div className="font-bold">Stall Speed Equation:</div>
                  <div>V_s = √(2W / (ρ × S × C_Lmax))</div>
                  <div className="text-slate-400 pt-1">Where for the 172:</div>
                  <div className="text-slate-400">  W = 10,360 N (max gross weight)</div>
                  <div className="text-slate-400">  ρ = 1.225 kg/m³ (sea level density)</div>
                  <div className="text-slate-400">  S = 16.17 m² (wing area)</div>
                  <div className="text-slate-400">  C_Lmax = 1.6 (with flaps)</div>
                  <div className="text-emerald-400 pt-1">Result: V_s ≈ 28.8 m/s ≈ 56 KCAS ✓ (matches published data)</div>
                </div>

                <h3 className="text-lg font-bold text-white font-serif pt-2">
                  Longitudinal Static Stability
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  An aircraft is naturally stable in pitch if its center of gravity (CG) is ahead of its aerodynamic center (AC). The distance between these two points, normalized by the mean aerodynamic chord (c̄), is called the Static Margin (SM).
                </p>

                <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
                  <div className="font-bold">Static Margin:</div>
                  <div>SM = (x_ac − x_cg) / c̄</div>
                  <div className="text-slate-400 pt-1">For a typical Cessna 172 loading:</div>
                  <div className="text-slate-400">  x_ac ≈ 0.25c</div>
                  <div className="text-slate-400">  x_cg ≈ 0.22c</div>
                  <div className="text-slate-400">  SM = +0.03c (+3% MAC)</div>
                  <div className="text-emerald-400 pt-1">Positive SM = Naturally stable pitch behavior.</div>
                  <div className="text-slate-400 pt-1 italic">(Compare: F-16 SM = -5% MAC, completely unstable without computers)</div>
                </div>

                <h3 className="text-lg font-bold text-white font-serif pt-2">
                  Wing Loading & Performance Trade-offs
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  The Cessna 172&apos;s wing area is quite large relative to its weight. This low wing loading (W/S) directly reduces stall speed and maneuver radii, but significantly increases drag at higher speeds, severely limiting top speed.
                </p>

                <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
                  <div className="font-bold">Wing Loading:</div>
                  <div>W/S = 63.8 kg/m²</div>
                  <div className="text-slate-400 pt-1">Effects:</div>
                  <div className="text-slate-400">- Allows very low stall speed (docile handling)</div>
                  <div className="text-slate-400">- Absorbs turbulence poorly (bumpy ride)</div>
                  <div className="text-slate-400">- Limits Max Speed (VNE = 302 km/h / 163 KIAS)</div>
                </div>
              </div>
            )
          },
          {
            id: 'investigate',
            label: '03 INVESTIGATE',
            content: (
              <div className="space-y-6 text-slate-200">
                <h3 className="text-lg font-bold text-white font-serif">
                  Trainer Aircraft Comparison
                </h3>
                <p className="text-sm text-slate-300">
                  How does the C172 stack up against its historic rivals and modern replacements?
                </p>

                <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#07150e]">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400 uppercase">
                        <th className="p-3">Parameter</th>
                        <th className="p-3">Cessna 172S</th>
                        <th className="p-3">Diamond DA40</th>
                        <th className="p-3">Piper PA-28</th>
                        <th className="p-3">Cirrus SR22</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      <tr>
                        <td className="p-3 text-white font-semibold">Stall Speed (Vso)</td>
                        <td className="p-3 text-emerald-400 font-bold">48 KCAS</td>
                        <td className="p-3">49 KIAS</td>
                        <td className="p-3">50 KCAS</td>
                        <td className="p-3 text-red-400">60 KCAS</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-white font-semibold">T/W Ratio (approx)</td>
                        <td className="p-3 text-emerald-400 font-bold">0.06</td>
                        <td className="p-3">0.07</td>
                        <td className="p-3">0.07</td>
                        <td className="p-3">0.09</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-white font-semibold">Wing Loading</td>
                        <td className="p-3 text-emerald-400 font-bold">14.7 lbs/ft²</td>
                        <td className="p-3">13.9 lbs/ft²</td>
                        <td className="p-3">15.0 lbs/ft²</td>
                        <td className="p-3 text-red-400">24.0 lbs/ft²</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-white font-semibold">Aspect Ratio</td>
                        <td className="p-3 text-emerald-400 font-bold">7.32</td>
                        <td className="p-3 text-sky-400">10.5</td>
                        <td className="p-3 text-amber-400">5.6</td>
                        <td className="p-3">10.0</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-white font-semibold">Service Ceiling</td>
                        <td className="p-3 text-emerald-400 font-bold">14,000 ft</td>
                        <td className="p-3">16,400 ft</td>
                        <td className="p-3">14,100 ft</td>
                        <td className="p-3 text-sky-400">17,500 ft</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-white font-semibold">Empty Weight</td>
                        <td className="p-3 text-emerald-400 font-bold">1,663 lbs</td>
                        <td className="p-3">1,760 lbs</td>
                        <td className="p-3">1,688 lbs</td>
                        <td className="p-3 text-red-400">2,269 lbs</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-white font-semibold">Engine Power</td>
                        <td className="p-3 text-emerald-400 font-bold">180 hp</td>
                        <td className="p-3">180 hp</td>
                        <td className="p-3">180 hp</td>
                        <td className="p-3 text-sky-400">310 hp</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-xs text-amber-200 space-y-1">
                  <span className="font-bold font-mono text-amber-400 block">MODEL LIMITATIONS & DISCLAIMERS</span>
                  <p>
                    Values are approximate based on standard configurations and POH data for recent variants (e.g., C172S, DA40 NG, PA-28-181 Archer III, SR22 G6). Actual performance varies significantly with environmental conditions, weight, and aircraft modifications. Thrust-to-weight relies on nominal propeller efficiencies. Data sourced from Type Certificate Data Sheets (TCDS A00009CH) and respective Pilot Operating Handbooks.
                  </p>
                </div>
              </div>
            )
          }
        ]}
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
          <p className="text-xs text-slate-400 mt-2">
            Tune wing aspect ratio and observe the effects on lift-induced drag.
          </p>
        </Link>
        <Link
          href="/questions/f16-falcon"
          className="group rounded-xl border border-white/10 bg-[#07032a] p-5 hover:border-emerald-500/30 transition-colors"
        >
          <span className="text-xs font-mono text-slate-400 block">Related Investigation</span>
          <span className="text-white font-bold mt-1 block group-hover:text-emerald-400 transition-colors">
            Why is the F-16 intentionally unstable? →
          </span>
          <p className="text-xs text-slate-400 mt-2">
            Relaxed static stability, fly-by-wire, and fighter maneuverability.
          </p>
        </Link>
      </div>
    </div>
  )
}
