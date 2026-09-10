import React from 'react'
import Link from 'next/link'
import DepthTabs from '../../../components/DepthTabs'

export default function F35BHoverPage() {
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
          Investigation 02 · Propulsion Systems
        </div>
        <h1 className="text-4xl font-extrabold text-white font-serif mt-1">
          How does the F-35B hover without melting runways?
        </h1>
        <p className="mt-2 text-slate-300">
          The engineering behind STOVL flight — shaft-driven lift fans, vectored thrust nozzles, and the thermal physics of ground erosion.
        </p>
      </div>

      {/* 3-Layer Progressive Disclosure */}
      <DepthTabs
        discover={
          <div className="space-y-6 text-slate-200">
            <div className="text-lg leading-relaxed font-serif text-white">
              The F-35B is not a helicopter — yet it can hover motionless at 50 feet.
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Conventional jet engines produce thrust in one direction: rearward. Hovering requires vertical thrust equal to the aircraft&apos;s full weight — over 60,000 lbs. Simply pointing the engine downward would concentrate 1,500°C exhaust directly onto the runway, scorching asphalt and ingesting hot recirculated gas back into the engine.
            </p>

            {/* Thrust system diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              {/* Lift Fan */}
              <div className="rounded-xl border border-sky-500/30 bg-[#07111d] p-4 text-center space-y-2">
                <span className="text-xs font-mono text-sky-400 font-bold block">
                  Lift Fan (Forward)
                </span>
                <svg viewBox="0 0 120 120" className="w-full h-24 mx-auto">
                  {/* Fan housing */}
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="60" cy="60" r="12" fill="#1e3a4a" stroke="#38bdf8" strokeWidth="1.5" />
                  {/* Fan blades */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <line
                      key={i}
                      x1={60 + 12 * Math.cos((angle * Math.PI) / 180)}
                      y1={60 + 12 * Math.sin((angle * Math.PI) / 180)}
                      x2={60 + 40 * Math.cos((angle * Math.PI) / 180)}
                      y2={60 + 40 * Math.sin((angle * Math.PI) / 180)}
                      stroke="#38bdf8" strokeWidth="4" strokeLinecap="round"
                    />
                  ))}
                  {/* Down arrow */}
                  <path d="M 60 112 L 55 104 L 65 104 Z" fill="#38bdf8" />
                  <text x="60" y="18" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace">AIR IN ↓</text>
                </svg>
                <p className="text-[11px] text-sky-200/80">
                  18,000 RPM shaft-driven fan. 20,000 lbf cool thrust.
                </p>
              </div>

              {/* Main Engine / Roll Posts */}
              <div className="rounded-xl border border-amber-500/30 bg-[#1a1407] p-4 text-center space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold block">
                  3BSD Nozzle (Rear) + Roll Posts
                </span>
                <svg viewBox="0 0 120 120" className="w-full h-24 mx-auto">
                  {/* Engine body */}
                  <rect x="30" y="30" width="60" height="40" rx="8" fill="#2a1a05" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="60" y="55" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace">F135</text>
                  <text x="60" y="64" textAnchor="middle" fill="#fbbf24" fontSize="7" fontFamily="monospace">ENGINE</text>
                  {/* Vectoring nozzle */}
                  <path d="M 40 70 L 35 100 M 80 70 L 85 100" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 35 100 L 30 110 M 85 100 L 90 110" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
                  {/* Roll post arrows */}
                  <path d="M 20 60 L 14 55 L 14 65 Z" fill="#fbbf24" />
                  <path d="M 100 60 L 106 55 L 106 65 Z" fill="#fbbf24" />
                  <text x="8" y="80" fill="#fbbf24" fontSize="7" fontFamily="monospace">Roll</text>
                  <text x="97" y="80" fill="#fbbf24" fontSize="7" fontFamily="monospace">Post</text>
                </svg>
                <p className="text-[11px] text-amber-200/80">
                  3-bearing swivel duct rotates 95°. 18,000 lbf vectored thrust.
                </p>
              </div>

              {/* Ground Erosion */}
              <div className="rounded-xl border border-red-500/30 bg-[#160b0b] p-4 text-center space-y-2">
                <span className="text-xs font-mono text-red-400 font-bold block">
                  Ground Thermal Footprint
                </span>
                <svg viewBox="0 0 120 120" className="w-full h-24 mx-auto">
                  {/* Aircraft shadow outline */}
                  <ellipse cx="60" cy="30" rx="25" ry="8" fill="#2a1515" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 2" />
                  <text x="60" y="32" textAnchor="middle" fill="#ef4444" fontSize="7" fontFamily="monospace">F-35B</text>
                  {/* Thermal plume */}
                  <ellipse cx="60" cy="90" rx="30" ry="12" fill="#7f1d1d" opacity="0.6" />
                  <ellipse cx="60" cy="85" rx="18" ry="8" fill="#dc2626" opacity="0.5" />
                  {/* Temp label */}
                  <text x="60" y="88" textAnchor="middle" fill="#fca5a5" fontSize="8" fontFamily="monospace">~260°C</text>
                  <text x="60" y="106" textAnchor="middle" fill="#ef4444" fontSize="7" fontFamily="monospace">Surface</text>
                  {/* down arrows from aircraft */}
                  <line x1="45" y1="38" x2="45" y2="70" stroke="#f87171" strokeWidth="1.5" />
                  <line x1="60" y1="38" x2="60" y2="70" stroke="#f87171" strokeWidth="1.5" />
                  <line x1="75" y1="38" x2="75" y2="70" stroke="#f87171" strokeWidth="1.5" />
                </svg>
                <p className="text-[11px] text-red-200/80">
                  Distributed exhaust keeps surface below 400°C asphalt limit.
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              The solution is a <strong className="text-white">three-point thrust system</strong>: a shaft-driven lift fan in the nose provides cool, high-volume airflow downward. The main engine&apos;s 3-bearing swivel duct (3BSD) pivots downward for rear thrust. Two roll-control posts under the wings bleed hot gas for lateral stability. Together, they balance 60,000 lbs while spreading exhaust over a much larger area.
            </p>
          </div>
        }
        understand={
          <div className="space-y-6 text-slate-200">
            <h3 className="text-lg font-bold text-white font-serif">
              Shaft Horsepower, Mass Flow, and the Lift Fan Equation
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              The lift fan is mechanically driven — not powered by its own combustion. A clutch-and-driveshaft assembly from the F135 engine&apos;s fan stage transfers approximately 29,000 shaft horsepower to spin the lift fan at ~18,000 RPM. The thrust it produces follows actuator disk theory:
            </p>

            <div className="rounded-xl bg-[#060d1a] p-4 border border-sky-500/20 font-mono text-xs text-sky-300 space-y-2">
              <div>T_fan = ṁ × ΔV = ṁ × (V_exit − V_inlet)</div>
              <div className="text-slate-400">
                ṁ ≈ 265 kg/s · ΔV ≈ 75 m/s → T_fan ≈ 19,875 N ≈ 20,000 lbf
              </div>
              <div className="text-slate-400 pt-1">
                Fan exit temperature: ~40°C — cool enough to hold hand near at 5m.
              </div>
            </div>

            <h3 className="text-lg font-bold text-white font-serif pt-2">
              The 3-Bearing Swivel Duct (3BSD) Nozzle
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              The F135&apos;s exhaust is redirected through a series of three articulated bearing sections. Unlike the Harrier&apos;s four fixed nozzles, the 3BSD is a single continuous duct — a mechanical marvel engineered to withstand 1,700°C turbine exhaust while rotating through 95°. Thrust output in vectored mode:
            </p>

            <div className="rounded-xl bg-[#060d1a] p-4 border border-amber-500/20 font-mono text-xs text-amber-300 space-y-2">
              <div>T_3BSD ≈ 18,000 lbf @ nozzle angle θ = 90°</div>
              <div>T_roll_posts ≈ 1,950 lbf each (×2) — bleed from core bypass</div>
              <div className="text-slate-400 pt-1">
                Total vertical thrust budget: ~41,900 lbf (MTOW hover: ~60,000 lbf with stores)
              </div>
            </div>

            <h3 className="text-lg font-bold text-white font-serif pt-2">
              Ground Erosion Physics
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              The critical threat is not just temperature — it&apos;s the combination of high dynamic pressure and temperature. The impingement velocity of the jet creates a <strong className="text-white">wall jet</strong> that spreads radially. Surface heat flux follows:
            </p>

            <div className="rounded-xl bg-[#060d1a] p-4 border border-red-500/20 font-mono text-xs text-red-300 space-y-2">
              <div>q_wall ∝ (ρ_jet × V_jet³) / (2 × r²)</div>
              <div className="text-slate-400">
                Where r = radial distance from impingement point.
              </div>
              <div className="text-slate-400 pt-1">
                Lift fan&apos;s cool mass flow dilutes 3BSD exhaust, keeping q_wall below asphalt failure threshold (~400°C sustained).
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-300">
              Aircraft carriers and STOVL pads use steel or aluminum deck plates — for land operations from unprepared surfaces, the F-35B carries hover time limits that prevent surface temperatures from exceeding safety thresholds.
            </p>
          </div>
        }
        investigate={
          <div className="space-y-6 text-slate-200">
            <h3 className="text-lg font-bold text-white font-serif">
              F-35B STOVL Propulsion System — Key Parameters
            </h3>

            <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#060d1a]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase">
                    <th className="p-3">Parameter</th>
                    <th className="p-3">F-35B Value</th>
                    <th className="p-3">Harrier GR.9 Reference</th>
                    <th className="p-3">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  <tr>
                    <td className="p-3 text-white font-semibold">Lift Fan Thrust</td>
                    <td className="p-3 text-sky-400 font-bold">~20,000 lbf</td>
                    <td className="p-3 text-slate-400">N/A (no fan)</td>
                    <td className="p-3">JSF Program Office CDR</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">3BSD Nozzle Thrust</td>
                    <td className="p-3 text-amber-400 font-bold">~18,000 lbf</td>
                    <td className="p-3 text-slate-400">21,750 lbf (all 4 nozzles)</td>
                    <td className="p-3">Pratt & Whitney F135 Spec</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Roll Post Thrust (×2)</td>
                    <td className="p-3 text-emerald-400 font-bold">1,950 lbf ea.</td>
                    <td className="p-3 text-slate-400">~1,200 lbf ea.</td>
                    <td className="p-3">AIAA 2006-7458</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Lift Fan Drive Shaft Power</td>
                    <td className="p-3 text-sky-400 font-bold">~29,000 shp</td>
                    <td className="p-3 text-slate-400">N/A</td>
                    <td className="p-3">Rolls-Royce LiftSystem® Data</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Fan Exit Temperature</td>
                    <td className="p-3 text-emerald-400 font-bold">~40°C</td>
                    <td className="p-3 text-slate-400">~600°C (front nozzles)</td>
                    <td className="p-3">NATOPS Flight Manual</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Ground Erosion Limit</td>
                    <td className="p-3 text-amber-400 font-bold">&lt;400°C surface</td>
                    <td className="p-3 text-slate-400">~450°C (higher risk)</td>
                    <td className="p-3">MIL-STD-3029</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-semibold">Max Gross Weight (STOVL hover)</td>
                    <td className="p-3 text-emerald-400 font-bold">~60,000 lbs</td>
                    <td className="p-3 text-slate-400">31,000 lbs</td>
                    <td className="p-3">Jane&apos;s All the World&apos;s Aircraft</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 text-xs text-amber-200 leading-relaxed">
              <span className="font-bold text-amber-300">Model Limitation & Disclaimers: </span>
              Thrust values are unclassified performance estimates from public program documents. The 3BSD actual rotation efficiency losses vary with nozzle angle; at intermediate angles (30–70°), significant thrust vectoring losses exist. Hover capability also depends critically on atmospheric temperature — on a hot day (&gt;35°C ISA+20), useful hover payload margin drops substantially.
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
            <p className="text-xs text-slate-400 mt-1">Tune the F135&apos;s bypass ratio and watch thrust, efficiency, and temperature shift.</p>
          </div>
          <span className="mt-4 text-xs font-mono text-sky-400">Launch Interactive Lab →</span>
        </Link>

        <Link
          href="/questions/why-delta-wing"
          className="rounded-xl border border-white/10 bg-[#0b1c13] p-5 hover:border-emerald-500/40 transition-colors flex flex-col justify-between"
        >
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase">Related Investigation</span>
            <h4 className="text-base font-bold text-white mt-1">Why did Concorde need a delta wing?</h4>
            <p className="text-xs text-slate-400 mt-1">Shock-boundary layer interactions and leading-edge vortex mechanisms at Mach 2.</p>
          </div>
          <span className="mt-4 text-xs font-mono text-emerald-400">Read Investigation 01 →</span>
        </Link>
      </div>
    </div>
  )
}
