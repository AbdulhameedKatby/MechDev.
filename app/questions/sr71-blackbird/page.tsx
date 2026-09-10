import React from 'react'
import Link from 'next/link'
import DepthTabs from '../../../components/DepthTabs'

export default function SR71BlackbirdPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      {/* Breadcrumb */}
      <Link href="/questions" className="text-xs font-mono text-emerald-400 hover:underline mb-2 inline-block">
        ← Back to All Questions
      </Link>
      
      {/* Header */}
      <div>
        <div className="text-xs uppercase font-mono text-slate-400">Investigation 08 · Thermal Management</div>
        <h1 className="text-4xl font-extrabold text-white font-serif mt-1">How does the SR-71 survive Mach 3.2 when the airframe reaches 300°C?</h1>
        <p className="mt-2 text-slate-300">Titanium structure, fuel-as-coolant loops, and variable-geometry inlets at the edge of physics.</p>
      </div>

      {/* DepthTabs */}
      <DepthTabs tabs={[
        {
          id: 'discover',
          label: '01 DISCOVER',
          content: (
            <div className="space-y-6 text-slate-200">
              <div className="text-lg leading-relaxed font-serif text-white">
                Sustained flight at Mach 3.2 creates atmospheric friction and air compression that turns the aircraft into an oven.
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                At 85,000 feet, the ambient temperature is a frigid -56°C. Yet, traveling at over 2,100 mph (3,400 km/h) creates intense kinetic heating through adiabatic compression. The air molecules slam into the aircraft, compressing and heating up tremendously. Traditional aluminum aircraft would literally melt under these conditions.
              </p>

              {/* 3 SVG Diagrams */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                
                {/* 1. Kinetic Heating Temperature Map */}
                <div className="rounded-xl border border-red-500/30 bg-[#160b0b] p-4 text-center space-y-2 flex flex-col justify-between">
                  <span className="text-xs font-mono text-red-400 font-bold block">
                    KINETIC HEATING MAP
                  </span>
                  <svg viewBox="0 0 120 180" className="w-full h-32 mx-auto">
                    {/* SR-71 silhouette */}
                    <path d="M60 10 L58 40 L45 80 L20 140 L35 150 L45 130 L60 160 L75 130 L85 150 L100 140 L75 80 L62 40 Z" fill="#b45309" stroke="#ef4444" strokeWidth="1" />
                    <circle cx="60" cy="15" r="4" fill="#ef4444" /> {/* Nose: Red */}
                    <path d="M45 80 L20 140" stroke="#f59e0b" strokeWidth="3" /> {/* Leading Edge: Amber */}
                    <path d="M75 80 L100 140" stroke="#f59e0b" strokeWidth="3" /> {/* Leading Edge: Amber */}
                    <rect x="55" y="60" width="10" height="40" fill="#facc15" opacity="0.6" /> {/* Mid-fuselage: Yellow */}
                    <path d="M20 140 L35 150" stroke="#fef08a" strokeWidth="2" /> {/* Trailing Edge: Light */}
                    <path d="M100 140 L85 150" stroke="#fef08a" strokeWidth="2" /> {/* Trailing Edge: Light */}
                    
                    {/* Labels */}
                    <text x="50" y="15" textAnchor="end" fill="#ef4444" fontSize="8" fontFamily="monospace">316°C</text>
                    <text x="18" y="100" textAnchor="end" fill="#f59e0b" fontSize="8" fontFamily="monospace">260°C</text>
                    <text x="102" y="100" textAnchor="start" fill="#f59e0b" fontSize="8" fontFamily="monospace">260°C</text>
                  </svg>
                  <p className="text-[11px] text-red-200/80">
                    Nose tip (316°C), leading edges (260°C), mid-fuselage (200°C), trailing edges (150°C).
                  </p>
                </div>

                {/* 2. Variable Inlet Spike Geometry */}
                <div className="rounded-xl border border-sky-500/30 bg-[#07111d] p-4 text-center space-y-2 flex flex-col justify-between">
                  <span className="text-xs font-mono text-sky-400 font-bold block">
                    VARIABLE INLET SPIKE
                  </span>
                  <svg viewBox="0 0 120 180" className="w-full h-32 mx-auto">
                    {/* Cowl */}
                    <path d="M20 20 L20 160 M100 20 L100 160" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                    
                    {/* Spike Positions */}
                    {/* M < 1.6 (Retracted) */}
                    <path d="M60 40 L40 100 L80 100 Z" fill="none" stroke="#1e3a4a" strokeWidth="1" />
                    <text x="60" y="38" textAnchor="middle" fill="#1e3a4a" fontSize="7" fontFamily="monospace">Subsonic</text>
                    
                    {/* M 3.2 (Fully Retracted into engine - wait, spike retracts 26 inches *aft* as speed increases) */}
                    {/* Actually, spike moves *aft* at high speeds. Let's show Mach 3.2 position aft. */}
                    <path d="M60 80 L30 160 L90 160 Z" fill="#0284c7" opacity="0.6" />
                    <text x="60" y="75" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">Mach 3.2</text>
                    
                    {/* Shockwaves */}
                    <line x1="60" y1="80" x2="20" y2="120" stroke="#7dd3fc" strokeWidth="1.5" />
                    <line x1="60" y1="80" x2="100" y2="120" stroke="#7dd3fc" strokeWidth="1.5" />
                    
                    {/* Normal shock */}
                    <line x1="30" y1="130" x2="90" y2="130" stroke="#bae6fd" strokeWidth="2" strokeDasharray="2 2" />
                  </svg>
                  <p className="text-[11px] text-sky-200/80">
                    Spike positions: subsonic (forward), Mach 1.6 (partially aft), Mach 3.2 (fully aft).
                  </p>
                </div>

                {/* 3. Fuel-as-Coolant Flow Loop */}
                <div className="rounded-xl border border-emerald-500/30 bg-[#0b1a11] p-4 text-center space-y-2 flex flex-col justify-between">
                  <span className="text-xs font-mono text-emerald-400 font-bold block">
                    FUEL-AS-COOLANT LOOP
                  </span>
                  <svg viewBox="0 0 120 180" className="w-full h-32 mx-auto">
                    {/* Tank */}
                    <rect x="40" y="20" width="40" height="30" rx="4" fill="#059669" opacity="0.4" stroke="#34d399" strokeWidth="1.5" />
                    <text x="60" y="35" textAnchor="middle" fill="#6ee7b7" fontSize="7" fontFamily="monospace">Tank -20°C</text>
                    
                    {/* Flow lines */}
                    <path d="M80 35 L100 35 L100 80 L80 80" fill="none" stroke="#10b981" strokeWidth="2" />
                    <path d="M98 55 L102 55 L100 60 Z" fill="#10b981" />
                    
                    {/* Airframe heat exchanger */}
                    <rect x="20" y="70" width="60" height="20" fill="#b45309" opacity="0.4" stroke="#fbbf24" strokeWidth="1" />
                    <text x="50" y="82" textAnchor="middle" fill="#fbbf24" fontSize="6" fontFamily="monospace">Airframe HX</text>
                    
                    <path d="M20 80 L10 80 L10 130 L30 130" fill="none" stroke="#f59e0b" strokeWidth="2" />
                    
                    {/* Engine block */}
                    <rect x="30" y="115" width="60" height="30" fill="#991b1b" opacity="0.4" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="60" y="128" textAnchor="middle" fill="#fca5a5" fontSize="7" fontFamily="monospace">J58 Engine</text>
                    <text x="60" y="138" textAnchor="middle" fill="#ef4444" fontSize="6" fontFamily="monospace">Burn 300°C</text>
                    
                    {/* Exhaust */}
                    <path d="M50 145 L70 145 L65 170 L55 170 Z" fill="#ea580c" opacity="0.6" />
                  </svg>
                  <p className="text-[11px] text-emerald-200/80">
                    Cold fuel (−20°C) cools airframe panels (150°C) and engines (300°C) before combustion.
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                By designing the aircraft almost entirely out of titanium alloy (β-C120VCA), which maintains its strength at temperatures exceeding 450°C, engineers bypassed the limits of aluminum. They additionally used the specialized JP-7 fuel as a circulating heat sink to cool the chine structures, avionics, and landing gear bays before it was ultimately burned.
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
                Stagnation Temperature at Mach 3.2
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                The absolute highest temperature occurs where air comes to a complete halt against the leading edges and nose. This is called the stagnation temperature ($T_0$).
              </p>

              <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
                <div>T_0 = T_∞ × (1 + ((γ−1)/2) × M²)</div>
                <div className="text-slate-400 pt-1">Where:</div>
                <div className="text-slate-400">  M = 3.2 (Flight Mach number)</div>
                <div className="text-slate-400">  T_∞ = 217K (Ambient temp in stratosphere)</div>
                <div className="text-slate-400">  γ = 1.4 (Ratio of specific heats for air)</div>
                <div className="text-emerald-400 pt-1">T_0 = 217 × (1 + 0.2 × 10.24) = 217 × 3.048 = 661K = 388°C</div>
                <div className="text-emerald-400">Titanium limit ~450°C → margin of only 62°C. ✓</div>
              </div>

              <h3 className="text-lg font-bold text-white font-serif pt-2">
                Thermal Expansion and Leakage
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                Because of the massive temperature delta between cold on the ground and hot in the air, the aircraft expands significantly. 
              </p>

              <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
                <div>ΔL = α × L₀ × ΔT</div>
                <div className="text-slate-400 pt-1">Where:</div>
                <div className="text-slate-400">  α = 8.6×10⁻⁶/°C (Coefficient for titanium β-C120VCA)</div>
                <div className="text-slate-400">  L₀ = 32.74m (Length of the SR-71)</div>
                <div className="text-slate-400">  ΔT = 300°C (Average temperature change)</div>
                <div className="text-emerald-400 pt-1">ΔL = 0.084m ≈ 8.4 cm. The aircraft grows 3.3 inches in flight. ✓</div>
              </div>

              <p className="text-sm leading-relaxed text-slate-300">
                To accommodate this expansion, the SR-71 panels were corrugated. As a side-effect, the fuel tanks, which were the aircraft skin itself, leaked profusely on the ground until aerodynamic heating sealed the joints.
              </p>

              <h3 className="text-lg font-bold text-white font-serif pt-2">
                Inlet Pressure Recovery
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                A jet engine cannot ingest Mach 3.2 air. The air must be slowed to subsonic speeds (Mach 0.4) before hitting the compressor face. The variable geometry inlet spike achieves this by generating multiple oblique shock waves.
              </p>

              <div className="rounded-xl bg-[#06110a] p-4 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-2">
                <div className="text-slate-400">At M3.2, without variable geometry:</div>
                <div>Normal shock recovery = P₂/P₁ = 0.33 (67% pressure lost)</div>
                <div className="text-slate-400 pt-1">With spike oblique shocks:</div>
                <div className="text-emerald-400 pt-1">recovery ≈ 0.85 (only 15% lost). Difference = 4× more thrust. ✓</div>
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
                High-Speed Aircraft Comparison
              </h3>

              <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#07150e]">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 uppercase">
                      <th className="p-3">Parameter</th>
                      <th className="p-3">SR-71A Blackbird</th>
                      <th className="p-3">Concorde</th>
                      <th className="p-3">North American X-15</th>
                      <th className="p-3">MiG-25 Foxbat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    <tr>
                      <td className="p-3 text-white font-semibold">Max Mach</td>
                      <td className="p-3 text-emerald-400 font-bold">3.2+</td>
                      <td className="p-3">2.04</td>
                      <td className="p-3">6.70</td>
                      <td className="p-3">2.83 (3.2 danger)</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Cruise Altitude</td>
                      <td className="p-3 text-emerald-400 font-bold">85,000 ft</td>
                      <td className="p-3">60,000 ft</td>
                      <td className="p-3">100,000+ ft</td>
                      <td className="p-3">65,000 ft</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Skin Temperature</td>
                      <td className="p-3 text-emerald-400 font-bold">300°C+</td>
                      <td className="p-3">127°C</td>
                      <td className="p-3">650°C</td>
                      <td className="p-3">300°C</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Primary Material</td>
                      <td className="p-3 text-emerald-400 font-bold">Titanium (β-C120VCA)</td>
                      <td className="p-3">Aluminum (RR58)</td>
                      <td className="p-3">Inconel X (nickel)</td>
                      <td className="p-3">Stainless Steel</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Inlet Type</td>
                      <td className="p-3 text-emerald-400 font-bold">Translating Spike</td>
                      <td className="p-3">Variable Ramp</td>
                      <td className="p-3">N/A (Rocket)</td>
                      <td className="p-3">Variable Ramp</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Fuel System</td>
                      <td className="p-3 text-emerald-400 font-bold">JP-7 (heat sink)</td>
                      <td className="p-3">Jet A-1 (heat sink)</td>
                      <td className="p-3">Ammonia/LOX</td>
                      <td className="p-3">Jet fuel</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Range</td>
                      <td className="p-3 text-emerald-400 font-bold">2,900 nmi</td>
                      <td className="p-3">3,900 nmi</td>
                      <td className="p-3">240 nmi</td>
                      <td className="p-3">930 nmi</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Engine Type</td>
                      <td className="p-3 text-emerald-400 font-bold">Pratt & Whitney J58</td>
                      <td className="p-3">Rolls-Royce Olympus</td>
                      <td className="p-3">XLR99 Rocket</td>
                      <td className="p-3">Tumansky R-15B</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-xs text-amber-200 space-y-1">
                <span className="font-bold font-mono text-amber-400 block">MODEL LIMITATIONS & DISCLAIMERS</span>
                <p>Calculations assume standard stratospheric conditions (ISA standard atmosphere). In reality, ambient temperatures vary, which significantly shifts the stagnation temperature and safe operating margins. Data sourced from Lockheed SR-71 Flight Manual (TO 1SR-71A-1) and NASA TN D-6847.</p>
              </div>
            </div>
          )
        }
      ]} />

      {/* Bottom Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
        <Link href="/lab/kinetic-heating" className="group rounded-xl border border-white/10 bg-[#07032a] p-5 hover:border-emerald-500/30 transition-colors">
          <span className="text-xs font-mono text-slate-400 block">Related Lab</span>
          <span className="text-white font-bold mt-1 block group-hover:text-emerald-400 transition-colors">
            Kinetic Heating →
          </span>
        </Link>
        <Link href="/questions/why-delta-wing" className="group rounded-xl border border-white/10 bg-[#07032a] p-5 hover:border-emerald-500/30 transition-colors">
          <span className="text-xs font-mono text-slate-400 block">Related Investigation</span>
          <span className="text-white font-bold mt-1 block group-hover:text-emerald-400 transition-colors">
            Why Delta Wing →
          </span>
        </Link>
      </div>
    </div>
  )
}
