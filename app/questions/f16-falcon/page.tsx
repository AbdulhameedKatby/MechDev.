import React from 'react'
import Link from 'next/link'
import DepthTabs from '../../../components/DepthTabs'

export default function F16FalconPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      {/* Breadcrumb */}
      <Link href="/questions" className="text-xs font-mono text-emerald-400 hover:underline mb-2 inline-block">
        ← Back to All Questions
      </Link>
      
      {/* Header */}
      <div>
        <div className="text-xs uppercase font-mono text-slate-400">Investigation 07 · Flight Control Systems</div>
        <h1 className="text-4xl font-extrabold text-white font-serif mt-1">Why does the F-16 need a computer to fly?</h1>
        <p className="mt-2 text-slate-300">Relaxed static stability, fly-by-wire control laws, and the agility revolution.</p>
      </div>

      {/* DepthTabs */}
      <DepthTabs
        discover={
          <div className="space-y-6 text-slate-200">
            <div className="text-lg leading-relaxed font-serif text-white">
              The F-16 is inherently unstable. Without a computer making 40 corrections per second, it would flip backward in less than half a second.
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Before the F-16, aircraft were designed to be naturally stable — if the pilot let go of the stick, the nose would naturally return to level flight. The F-16 engineers flipped this logic. By moving the center of gravity aft of the aerodynamic center, they created an aircraft that wants to constantly pitch up and away. This "relaxed static stability" reduces trim drag and allows for instantaneous, violent maneuverability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              {/* Stable vs Unstable */}
              <div className="rounded-xl border border-emerald-500/30 bg-[#0b1a11] p-4 text-center space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold block">Stable vs Unstable Aircraft</span>
                <svg viewBox="0 0 300 120" className="w-full h-28">
                  {/* Stable */}
                  <g transform="translate(0, 10)">
                    <path d="M 50 30 Q 150 20 250 30 Q 250 40 50 40 Z" fill="#047857" opacity="0.5" />
                    {/* CG */}
                    <circle cx="120" cy="35" r="4" fill="#34d399" />
                    <text x="120" y="25" fill="#34d399" fontSize="8" textAnchor="middle">CG</text>
                    {/* AC */}
                    <circle cx="160" cy="35" r="4" fill="#6ee7b7" />
                    <text x="160" y="25" fill="#6ee7b7" fontSize="8" textAnchor="middle">AC</text>
                    {/* Moment */}
                    <path d="M 200 45 Q 230 55 250 35" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="2 2" markerEnd="url(#arrow-emerald)" />
                    <text x="270" y="35" fill="#10b981" fontSize="8">+5% SM</text>
                  </g>
                  {/* Unstable */}
                  <g transform="translate(0, 70)">
                    <path d="M 50 30 Q 150 20 250 30 Q 250 40 50 40 Z" fill="#991b1b" opacity="0.5" />
                    {/* AC */}
                    <circle cx="140" cy="35" r="4" fill="#f87171" />
                    <text x="140" y="25" fill="#f87171" fontSize="8" textAnchor="middle">AC</text>
                    {/* CG */}
                    <circle cx="180" cy="35" r="4" fill="#ef4444" />
                    <text x="180" y="25" fill="#ef4444" fontSize="8" textAnchor="middle">CG</text>
                    {/* Moment */}
                    <path d="M 200 25 Q 230 15 250 35" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="2 2" markerEnd="url(#arrow-red)" />
                    <text x="270" y="35" fill="#ef4444" fontSize="8">-5% SM</text>
                  </g>
                  <defs>
                    <marker id="arrow-emerald" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M 0 0 L 6 3 L 0 6 Z" fill="#10b981" />
                    </marker>
                    <marker id="arrow-red" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M 0 0 L 6 3 L 0 6 Z" fill="#ef4444" />
                    </marker>
                  </defs>
                </svg>
                <p className="text-[11px] text-emerald-200/80">Top: CG forward of AC (stable). Bottom: CG aft of AC (divergent).</p>
              </div>

              {/* FLCC Control Loop */}
              <div className="rounded-xl border border-sky-500/30 bg-[#07111d] p-4 text-center space-y-2">
                <span className="text-xs font-mono text-sky-400 font-bold block">Fly-by-Wire Control Loop</span>
                <svg viewBox="0 0 300 120" className="w-full h-28">
                  <rect x="20" y="20" width="50" height="30" fill="none" stroke="#38bdf8" rx="2" />
                  <text x="45" y="38" fill="#38bdf8" fontSize="8" textAnchor="middle">Pilot Stick</text>
                  
                  <path d="M 70 35 L 110 35" fill="none" stroke="#7dd3fc" markerEnd="url(#arrow-sky)" />
                  
                  <rect x="110" y="20" width="80" height="30" fill="#0369a1" stroke="#38bdf8" rx="4" />
                  <text x="150" y="38" fill="#bae6fd" fontSize="9" fontWeight="bold" textAnchor="middle">FLCC (40Hz)</text>
                  
                  <path d="M 190 35 L 230 35" fill="none" stroke="#7dd3fc" markerEnd="url(#arrow-sky)" />
                  
                  <rect x="230" y="20" width="50" height="30" fill="none" stroke="#38bdf8" rx="2" />
                  <text x="255" y="34" fill="#38bdf8" fontSize="8" textAnchor="middle">Actuators</text>
                  <text x="255" y="44" fill="#38bdf8" fontSize="8" textAnchor="middle">& Surfaces</text>
                  
                  <path d="M 255 50 L 255 90 L 210 90" fill="none" stroke="#7dd3fc" markerEnd="url(#arrow-sky)" />
                  
                  <rect x="140" y="75" width="70" height="30" fill="none" stroke="#0ea5e9" rx="2" strokeDasharray="2 2" />
                  <text x="175" y="88" fill="#38bdf8" fontSize="8" textAnchor="middle">Gyros / Accels</text>
                  <text x="175" y="98" fill="#38bdf8" fontSize="8" textAnchor="middle">(Aircraft Response)</text>
                  
                  <path d="M 140 90 L 120 90 L 120 50" fill="none" stroke="#7dd3fc" markerEnd="url(#arrow-sky)" />
                  
                  <defs>
                    <marker id="arrow-sky" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M 0 0 L 6 3 L 0 6 Z" fill="#7dd3fc" />
                    </marker>
                  </defs>
                </svg>
                <p className="text-[11px] text-sky-200/80">FLCC continuously computes corrections 40 times per second.</p>
              </div>

              {/* Turn Radius */}
              <div className="rounded-xl border border-amber-500/30 bg-[#1a1407] p-4 text-center space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold block">Sustained Turn Performance</span>
                <svg viewBox="0 0 300 120" className="w-full h-28">
                  {/* Cessna */}
                  <circle cx="280" cy="60" r="100" fill="none" stroke="#78716c" strokeDasharray="4 4" />
                  <text x="280" y="110" fill="#78716c" fontSize="8" textAnchor="middle">Cessna (r=5km)</text>
                  
                  {/* F-15 */}
                  <circle cx="200" cy="60" r="50" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="200" y="100" fill="#f59e0b" fontSize="8" textAnchor="middle">F-15 (r=800m)</text>
                  
                  {/* F-16 */}
                  <circle cx="100" cy="60" r="25" fill="none" stroke="#fbbf24" strokeWidth="2" />
                  <text x="100" y="55" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">F-16</text>
                  <text x="100" y="65" fill="#fde68a" fontSize="8" textAnchor="middle">r=500m</text>
                  
                  <text x="100" y="80" fill="#fbbf24" fontSize="8" textAnchor="middle">9G</text>
                  <text x="200" y="80" fill="#f59e0b" fontSize="8" textAnchor="middle">5G</text>
                  <text x="280" y="80" fill="#78716c" fontSize="8" textAnchor="middle">1G</text>
                </svg>
                <p className="text-[11px] text-amber-200/80">Extreme G-loading allows incredibly tight turning radii.</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              To handle the instability, the F-16 introduced the first production <strong className="text-white">fly-by-wire (FBW)</strong> system in a fighter. Instead of mechanical cables connecting the stick to the tail, the pilot inputs a command into a quadruplex-redundant Flight Control Computer (FLCC). The computer instantly calculates the exact surface deflections needed, checking sensors and preventing the aircraft from diverging or exceeding aerodynamic limits.
            </p>
          </div>
        }
        understand={
          <div className="space-y-6 text-slate-200">
            <h3 className="text-lg font-bold text-white font-serif">
              Aerodynamic Instability and Static Margin
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              Static Margin (SM) describes the distance between the aerodynamic center (AC) and the center of gravity (CG), normalized by the mean aerodynamic chord (c̄).
            </p>

            <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
              <div>SM = (x_ac − x_cg) / c̄</div>
              <div className="text-slate-400">
                F-16: SM = -0.05 (-5% MAC)
              </div>
              <div className="text-slate-400 pt-1">
                Negative SM means aerodynamically unstable. Without FLCC, divergence time = 0.3 seconds (aircraft would flip).
              </div>
            </div>

            <h3 className="text-lg font-bold text-white font-serif pt-2">
              Fly-By-Wire Control Law Equation
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              The FLCC determines the elevator/flaperon deflection (δ_e) based on pilot commands and aircraft state feedback. This is a simplified longitudinal pitch control law:
            </p>

            <div className="rounded-xl bg-[#07111d] p-4 border border-sky-500/20 font-mono text-xs text-sky-300 space-y-2">
              <div>δ_e = K_q × q + K_α × (α − α_cmd) + K_nz × (n_z − n_z_cmd)</div>
              <div className="text-slate-400 pt-1">Where:</div>
              <div className="text-slate-400">  q = pitch rate (deg/s)</div>
              <div className="text-slate-400">  α = angle of attack (deg)</div>
              <div className="text-slate-400">  n_z = normal load factor (G)</div>
              <div className="text-slate-400">  K_i = dynamic feedback gains (Mach/altitude dependent)</div>
              <div className="text-sky-400 pt-1">
                25ms latency budget. FLCC makes 40 corrections per second.
              </div>
            </div>

            <h3 className="text-lg font-bold text-white font-serif pt-2">
              Sustained Turn Performance
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              In a level, sustained turn, thrust must equal drag, and lift must equal the apparent weight. The maximum sustained load factor (n) and minimum turn radius (R) depend heavily on the Thrust-to-Weight ratio.
            </p>

            <div className="rounded-xl bg-[#1a1407] p-4 border border-amber-500/20 font-mono text-xs text-amber-300 space-y-2">
              <div>n = (T − D)/W + 1</div>
              <div>R = V² / (g × √(n² − 1))</div>
              <div className="text-slate-400 pt-1">Example: F-16 at Mach 0.9, Sea Level</div>
              <div className="text-slate-400">T = 76kN, D = 45kN, W = 90kN</div>
              <div className="text-amber-400 pt-1">
                Result: n = 1.34 + 1 = 4.4G (sustained) → R ≈ 490m
              </div>
            </div>
          </div>
        }
        investigate={
          <div className="space-y-6 text-slate-200">
            <h3 className="text-lg font-bold text-white font-serif">
              4th Generation Fighter Comparison
            </h3>

            <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#07150e]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase">
                    <th className="p-3">Parameter</th>
                    <th className="p-3 text-emerald-400">F-16C Block 50</th>
                    <th className="p-3">F-15E Strike Eagle</th>
                    <th className="p-3">Dassault Rafale</th>
                    <th className="p-3">JAS 39 Gripen E</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  <tr>
                    <td className="p-3 text-white font-semibold">T/W Ratio (Loaded)</td>
                    <td className="p-3 text-emerald-400 font-bold">1.09</td>
                    <td className="p-3">0.93</td>
                    <td className="p-3">0.98</td>
                    <td className="p-3">0.97</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Wing Loading (kg/m²)</td>
                    <td className="p-3 text-emerald-400 font-bold">431</td>
                    <td className="p-3">358</td>
                    <td className="p-3">328</td>
                    <td className="p-3">283</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Max G Limit</td>
                    <td className="p-3 text-emerald-400 font-bold">+9.0 G</td>
                    <td className="p-3">+9.0 G</td>
                    <td className="p-3">+9.0 G</td>
                    <td className="p-3">+9.0 G</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Max Turn Rate (°/s)</td>
                    <td className="p-3 text-emerald-400 font-bold">~26°/s (Inst)</td>
                    <td className="p-3">~22°/s</td>
                    <td className="p-3">~30°/s</td>
                    <td className="p-3">~30°/s</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Static Margin</td>
                    <td className="p-3 text-emerald-400 font-bold">-5% (Unstable)</td>
                    <td className="p-3">Positive (Stable)</td>
                    <td className="p-3">Unstable</td>
                    <td className="p-3">Unstable</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">FBW Generation</td>
                    <td className="p-3 text-emerald-400 font-bold">Analog/Digital Quad</td>
                    <td className="p-3">Mechanical/CAS</td>
                    <td className="p-3">Digital Triplex</td>
                    <td className="p-3">Digital Triplex</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Max Mach</td>
                    <td className="p-3 text-emerald-400 font-bold">2.05</td>
                    <td className="p-3">2.5+</td>
                    <td className="p-3">1.8</td>
                    <td className="p-3">2.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 text-right mt-2">Sources: USAF F-16 Standard Aircraft Characteristics, Lockheed Martin</p>

            <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-xs text-amber-200 space-y-1">
              <span className="font-bold font-mono text-amber-400 block">MODEL LIMITATIONS & DISCLAIMERS</span>
              <p>Turn performance assumes specific altitudes, drag configurations (clean vs stores), and 50% fuel load. True aerodynamic data and exact control laws remain classified; parameters shown are idealized engineering models derived from declassified technical manuals and textbook approximations.</p>
            </div>
          </div>
        }
      />

      {/* Bottom Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
        <Link href="/lab/wing-sweep" className="group rounded-xl border border-white/10 bg-[#07032a] p-5 hover:border-emerald-500/30 transition-colors">
          <span className="text-xs font-mono text-slate-400 block">Related Lab</span>
          <span className="text-white font-bold mt-1 block group-hover:text-emerald-400 transition-colors">
            Wing Sweep Lab →
          </span>
          <p className="text-xs text-slate-400 mt-2">Explore the impact of wing sweep on supersonic drag and low-speed lift.</p>
        </Link>
        <Link href="/questions/cessna-172" className="group rounded-xl border border-white/10 bg-[#07032a] p-5 hover:border-emerald-500/30 transition-colors">
          <span className="text-xs font-mono text-slate-400 block">Related Investigation</span>
          <span className="text-white font-bold mt-1 block group-hover:text-emerald-400 transition-colors">
            Cessna 172 Dynamics →
          </span>
          <p className="text-xs text-slate-400 mt-2">Understand natural stability and positive static margin in general aviation.</p>
        </Link>
      </div>
    </div>
  )
}
