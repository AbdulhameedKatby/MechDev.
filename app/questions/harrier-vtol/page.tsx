import React from 'react'
import Link from 'next/link'
import DepthTabs from '../../../components/DepthTabs'

export default function HarrierVTOLPage() {
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
          Investigation 09 · Propulsion & VTOL
        </div>
        <h1 className="text-4xl font-extrabold text-white font-serif mt-1">
          How does the Harrier take off vertically and cruise at 550 knots?
        </h1>
        <p className="mt-2 text-slate-300">
          Pegasus vectored thrust, reaction control jets, and the hover-to-cruise transition.
        </p>
      </div>

      {/* DepthTabs */}
      <DepthTabs tabs={[
        { 
          id: 'discover', 
          label: '01 DISCOVER', 
          content: (
            <div className="space-y-6 text-slate-200">
              <div className="text-lg leading-relaxed font-serif text-white">
                The Harrier relies on a single engine and four rotating nozzles to perform both vertical takeoff and high-speed cruise.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                {/* Pegasus Engine */}
                <div className="rounded-xl border border-emerald-500/30 bg-[#0b1a11] p-4 text-center space-y-2 flex flex-col justify-between">
                  <span className="text-xs font-mono text-emerald-400 font-bold block">
                    Pegasus Engine & Nozzles
                  </span>
                  <svg viewBox="0 0 160 120" className="w-full h-28 mx-auto">
                    {/* Engine core */}
                    <rect x="20" y="45" width="120" height="30" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="80" y="62" textAnchor="middle" fill="#34d399" fontSize="6" fontFamily="monospace">ROLLS-ROYCE PEGASUS</text>
                    {/* Fan and turbine */}
                    <circle cx="30" cy="60" r="10" fill="#047857" />
                    <circle cx="130" cy="60" r="8" fill="#047857" />
                    {/* Nozzles */}
                    <path d="M 50 75 L 50 100 L 40 100 L 40 75 Z" fill="#6ee7b7" />
                    <path d="M 110 75 L 110 100 L 100 100 L 100 75 Z" fill="#6ee7b7" />
                    <path d="M 50 45 L 50 20 L 40 20 L 40 45 Z" fill="#6ee7b7" />
                    <path d="M 110 45 L 110 20 L 100 20 L 100 45 Z" fill="#6ee7b7" />
                    {/* Rotation arc */}
                    <path d="M 55 90 A 15 15 0 0 1 70 105" fill="none" stroke="#a7f3d0" strokeWidth="1" strokeDasharray="2 2" />
                    <path d="M 68 105 L 72 105 L 70 109 Z" fill="#a7f3d0" />
                    <text x="80" y="105" textAnchor="middle" fill="#a7f3d0" fontSize="5" fontFamily="monospace">0°-98°</text>
                  </svg>
                  <p className="text-[11px] text-emerald-200/80">
                    4 rotating nozzles (2 cold front, 2 hot rear) deliver 21,500 lbf thrust.
                  </p>
                </div>

                {/* Hover Force Balance */}
                <div className="rounded-xl border border-sky-500/30 bg-[#07111d] p-4 text-center space-y-2 flex flex-col justify-between">
                  <span className="text-xs font-mono text-sky-400 font-bold block">
                    Hover Force Balance
                  </span>
                  <svg viewBox="0 0 160 120" className="w-full h-28 mx-auto">
                    {/* Aircraft silhouette */}
                    <path d="M 80 40 L 90 60 L 140 65 L 140 70 L 90 70 L 80 100 L 70 70 L 20 70 L 20 65 L 70 60 Z" fill="#1e3a8a" stroke="#38bdf8" strokeWidth="1" />
                    {/* Nozzle thrust vectors */}
                    <line x1="60" y1="70" x2="60" y2="95" stroke="#38bdf8" strokeWidth="2" />
                    <polygon points="58,95 62,95 60,100" fill="#38bdf8" />
                    <line x1="100" y1="70" x2="100" y2="95" stroke="#38bdf8" strokeWidth="2" />
                    <polygon points="98,95 102,95 100,100" fill="#38bdf8" />
                    <text x="80" y="108" textAnchor="middle" fill="#38bdf8" fontSize="6" fontFamily="monospace">T ≥ W</text>
                    {/* Weight vector */}
                    <line x1="80" y1="65" x2="80" y2="85" stroke="#f87171" strokeWidth="1.5" />
                    <polygon points="78,85 82,85 80,90" fill="#f87171" />
                    <text x="88" y="85" textAnchor="middle" fill="#f87171" fontSize="6" fontFamily="monospace">W=mg</text>
                    {/* Reaction control jets */}
                    <line x1="20" y1="70" x2="20" y2="80" stroke="#fbbf24" strokeWidth="1" />
                    <polygon points="19,80 21,80 20,83" fill="#fbbf24" />
                    <line x1="140" y1="70" x2="140" y2="80" stroke="#fbbf24" strokeWidth="1" />
                    <polygon points="139,80 141,80 140,83" fill="#fbbf24" />
                  </svg>
                  <p className="text-[11px] text-sky-200/80">
                    Net force diagram with reaction control jets at wingtips/nose/tail.
                  </p>
                </div>

                {/* Transition Sequence */}
                <div className="rounded-xl border border-amber-500/30 bg-[#1a1407] p-4 text-center space-y-2 flex flex-col justify-between">
                  <span className="text-xs font-mono text-amber-400 font-bold block">
                    Hover → Cruise Transition
                  </span>
                  <svg viewBox="0 0 160 120" className="w-full h-28 mx-auto">
                    {/* Phase 1: Hover */}
                    <circle cx="25" cy="50" r="10" fill="none" stroke="#f59e0b" strokeWidth="1" />
                    <line x1="25" y1="60" x2="25" y2="80" stroke="#f59e0b" strokeWidth="1.5" />
                    <polygon points="23,80 27,80 25,85" fill="#f59e0b" />
                    <text x="25" y="95" textAnchor="middle" fill="#fbbf24" fontSize="5" fontFamily="monospace">90° HOVER</text>
                    
                    {/* Phase 2: Transition */}
                    <circle cx="80" cy="50" r="10" fill="none" stroke="#f59e0b" strokeWidth="1" />
                    <line x1="80" y1="60" x2="65" y2="75" stroke="#f59e0b" strokeWidth="1.5" />
                    <polygon points="63,73 67,77 62,80" fill="#f59e0b" />
                    <line x1="90" y1="50" x2="105" y2="50" stroke="#34d399" strokeWidth="1.5" />
                    <polygon points="105,48 105,52 110,50" fill="#34d399" />
                    <text x="80" y="95" textAnchor="middle" fill="#fbbf24" fontSize="5" fontFamily="monospace">45° TRANSITION</text>

                    {/* Phase 3: Cruise */}
                    <circle cx="135" cy="50" r="10" fill="none" stroke="#f59e0b" strokeWidth="1" />
                    <line x1="125" y1="50" x2="105" y2="50" stroke="#f59e0b" strokeWidth="1.5" />
                    <polygon points="107,48 107,52 102,50" fill="#f59e0b" />
                    <line x1="145" y1="50" x2="160" y2="50" stroke="#34d399" strokeWidth="2" />
                    <polygon points="158,48 158,52 163,50" fill="#34d399" />
                    <text x="135" y="95" textAnchor="middle" fill="#fbbf24" fontSize="5" fontFamily="monospace">0° CRUISE</text>

                    <line x1="10" y1="110" x2="150" y2="110" stroke="#6b7280" strokeWidth="1" strokeDasharray="2 2" />
                  </svg>
                  <p className="text-[11px] text-amber-200/80">
                    Nozzles rotate from 90° to 0° as forward velocity builds.
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                By vectoring all engine thrust through four rotatable nozzles, the Harrier achieves vertical lift without a separate lift fan. During transition to forward flight, the nozzles slowly rotate aft, accelerating the aircraft until the wings generate sufficient lift to keep it airborne.
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
                Hover Thrust Requirement
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                To hover, the total thrust must strictly exceed the gross weight of the aircraft. For the Harrier, the margin is incredibly slim compared to more modern STOVL aircraft.
              </p>
              
              <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
                <div>T ≥ W = mg</div>
                <div className="text-slate-400 pt-1">Harrier parameters:</div>
                <div className="text-slate-400">  m = 9,415 kg → W = 92,339 N</div>
                <div className="text-slate-400">  Pegasus thrust = 95,640 N</div>
                <div className="text-emerald-400 pt-1">Result: T/W = 1.036 ✓ (Only 3.6% thrust margin for control)</div>
                <div className="text-slate-500">Compare to F-35B T/W = 1.15 in hover (15% margin).</div>
              </div>

              <h3 className="text-lg font-bold text-white font-serif pt-2">
                Nozzle Vector Decomposition
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                During transition, thrust is split between vertical and horizontal components. This is the most dangerous phase of flight because vertical thrust drops significantly as the nozzles rotate.
              </p>

              <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
                <div>T_vertical = T × sin(θ)</div>
                <div>T_horizontal = T × cos(θ)</div>
                <div className="text-slate-400 pt-1">At θ = 90°: T_v = 95.6 kN, T_h = 0 (pure hover)</div>
                <div className="text-slate-400">At θ = 45°: T_v = 67.6 kN, T_h = 67.6 kN (transition)</div>
                <div className="text-slate-400">At θ = 10°: T_v = 16.6 kN, T_h = 94.2 kN (cruise)</div>
                <div className="text-emerald-400 pt-1">Danger zone: T_v &lt; W at ~60°. Wings must generate missing lift before this point!</div>
              </div>

              <h3 className="text-lg font-bold text-white font-serif pt-2">
                Reaction Control Jet Authority
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                Aerodynamic surfaces (ailerons, elevators, rudder) are useless in a hover because airspeed is zero. The Harrier uses high-pressure engine bleed air piped to reaction control valves at the extremities to maintain stability.
              </p>

              <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
                <div>τ = F_jet × d_arm</div>
                <div className="text-slate-400 pt-1">Wingtip jets:</div>
                <div className="text-slate-400">  F = 890 N</div>
                <div className="text-slate-400">  d = 5.2 m</div>
                <div className="text-slate-400">  τ = 4,628 Nm roll authority</div>
                <div className="text-emerald-400 pt-1">Must overcome I_xx × α̇ for hover stability.</div>
                <div className="text-slate-500">Longer wingspan = better hover control, but creates more drag in high-speed flight.</div>
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
                VTOL Aircraft Comparison
              </h3>
              
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#07150e]">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 uppercase">
                      <th className="p-3">Parameter</th>
                      <th className="p-3">Harrier GR.9</th>
                      <th className="p-3">F-35B Lightning II</th>
                      <th className="p-3">V-22 Osprey</th>
                      <th className="p-3">Yak-38 Forger</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    <tr>
                      <td className="p-3 text-white font-semibold">Max Thrust</td>
                      <td className="p-3 text-emerald-400 font-bold">21,500 lbf</td>
                      <td className="p-3">~40,000 lbf</td>
                      <td className="p-3">~20,000 shp (total)</td>
                      <td className="p-3">~15,000 lbf</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">T/W (Hover)</td>
                      <td className="p-3 text-emerald-400 font-bold">1.03 - 1.08</td>
                      <td className="p-3">1.15</td>
                      <td className="p-3">&gt; 1.10</td>
                      <td className="p-3">1.04</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Hover Ceiling</td>
                      <td className="p-3 text-emerald-400 font-bold">~5,000 ft</td>
                      <td className="p-3">~10,000 ft</td>
                      <td className="p-3">~10,000 ft</td>
                      <td className="p-3">N/A (sea level only)</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Transition Speed</td>
                      <td className="p-3 text-emerald-400 font-bold">~120 kts</td>
                      <td className="p-3">~150 kts</td>
                      <td className="p-3">~110 kts</td>
                      <td className="p-3">~140 kts</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Max Speed</td>
                      <td className="p-3 text-emerald-400 font-bold">570 kts</td>
                      <td className="p-3">Mach 1.6</td>
                      <td className="p-3">270 kts</td>
                      <td className="p-3">Mach 0.95</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Nozzle Type</td>
                      <td className="p-3 text-emerald-400 font-bold">4 Rotating</td>
                      <td className="p-3">3BSD + Lift Fan</td>
                      <td className="p-3">Tiltrotor</td>
                      <td className="p-3">2 Lift + 1 Vectoring</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Reaction Controls</td>
                      <td className="p-3 text-emerald-400 font-bold">Bleed Air Jets</td>
                      <td className="p-3">Roll Posts</td>
                      <td className="p-3">Cyclic Pitch</td>
                      <td className="p-3">Bleed Air Jets</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-xs text-amber-200 space-y-1">
                <span className="font-bold font-mono text-amber-400 block">MODEL LIMITATIONS & DISCLAIMERS</span>
                <p>
                  Thrust values for the Harrier GR.9 are based on the Rolls-Royce Pegasus 105 engine at Sea Level ISA conditions. Actual hover performance is highly sensitive to ambient temperature and density altitude. The reaction control system uses up to 9% of the total engine airflow, reducing main nozzle thrust during heavy maneuvering in hover.
                </p>
                <p className="mt-2 text-amber-500/80">
                  Sources: Rolls-Royce Pegasus Technical Manual, BAE Systems Harrier GR.9 Operating Data Manual.
                </p>
              </div>
            </div>
          ) 
        }
      ]} />

      {/* Bottom Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
        <Link href="/lab/bypass-ratio" className="group rounded-xl border border-white/10 bg-[#07032a] p-5 hover:border-emerald-500/30 transition-colors">
          <span className="text-xs font-mono text-slate-400 block">Related Lab</span>
          <span className="text-white font-bold mt-1 block group-hover:text-emerald-400 transition-colors">
            Bypass Ratio Lab →
          </span>
          <p className="text-xs text-slate-400 mt-2">Explore the tradeoffs of engine bypass ratios.</p>
        </Link>
        <Link href="/questions/f35b-hover" className="group rounded-xl border border-white/10 bg-[#07032a] p-5 hover:border-emerald-500/30 transition-colors">
          <span className="text-xs font-mono text-slate-400 block">Related Investigation</span>
          <span className="text-white font-bold mt-1 block group-hover:text-emerald-400 transition-colors">
            F-35B Hover Mechanics →
          </span>
          <p className="text-xs text-slate-400 mt-2">Compare the Harrier's vectored thrust to the F-35B's shaft-driven lift fan.</p>
        </Link>
      </div>
    </div>
  )
}
