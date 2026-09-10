import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Interactive Aerospace Physics Labs',
  description: 'Run interactive aircraft engineering labs for induced drag, wing sweep, kinetic heating, bypass ratio, thrust, stress, and flight mechanics.',
  alternates: { canonical: '/lab' },
}

export default function LabIndexPage() {
  const allLabs = [
    {
      num: '01',
      slug: 'aspect-ratio',
      discipline: 'Aerodynamics',
      title: 'Aspect Ratio ↔ Induced Drag',
      subtitle: "Observe why Concorde's stubby, low-aspect-ratio delta wing incurs brutal drag penalties at subsonic speeds compared to high-aspect-ratio commercial airliners.",
      equation: 'C_Di = C_L² / (π × AR × e)',
      aircraftLink: 'Concorde (AR 1.83) vs Boeing 787 (AR 10.2)',
      difficulty: 'Beginner', time: '10 min', learn: 'Induced drag efficiency',
    },
    {
      num: '02',
      slug: 'wing-sweep',
      discipline: 'Aerodynamics',
      title: 'Wing Sweep Angle ↔ Wave Drag',
      subtitle: 'See how sweeping a wing delays the critical Mach number and prevents shock wave detachment along the leading edge at transonic cruise.',
      equation: 'M_eff = M_∞ × cos(Λ)',
      aircraftLink: 'Concorde 63° ogive vs Boeing 747 37.5° sweep',
      difficulty: 'Beginner', time: '10 min', learn: 'Sweep and wave drag',
    },
    {
      num: '03',
      slug: 'kinetic-heating',
      discipline: 'Thermodynamics',
      title: 'Kinetic Heating ↔ Stagnation Recovery',
      subtitle: 'Calculate extreme surface stagnation temperatures across Mach regimes and inspect structural thermal expansion limits in aluminum and titanium.',
      equation: 'T_0 = T_∞ × (1 + ((γ-1)/2) × M²)',
      aircraftLink: 'Idealized model trend; compare with documented aircraft thermal data',
      difficulty: 'Beginner', time: '8 min', learn: 'Stagnation temperature',
    },
    {
      num: '04',
      slug: 'bypass-ratio',
      discipline: 'Propulsion',
      title: 'Bypass Ratio ↔ Propulsive Efficiency',
      subtitle: 'Explore the thermodynamic trade-off between pure turbojets and ultra-high-bypass turbofans across subsonic, transonic, and supersonic regimes.',
      equation: 'η_p = 2 / (1 + V_jet / V_aircraft)',
      aircraftLink: 'Olympus 593 (BPR 0) vs Trent XWB (BPR 9.3)',
      difficulty: 'Intermediate', time: '12 min', learn: 'Propulsive efficiency',
    },
    {
      num: '05',
      slug: 'fuel-transfer',
      discipline: 'Flight Mechanics',
      title: 'Fuel Transfer ↔ Center of Pressure Trim',
      subtitle: "Simulate transferring fuel across 13 tanks to balance Concorde's aft center of pressure shift during the transonic acceleration from Mach 0.9 to 2.04.",
      equation: 'SM = CP(% MAC) − CG(% MAC) ≈ 0',
      aircraftLink: 'Concorde 13-tank trim system; transfer rate depends on the reference source',
      difficulty: 'Intermediate', time: '12 min', learn: 'Trim and stability',
    },
    {
      num: '06',
      slug: 'thrust-to-weight',
      discipline: 'Flight Mechanics',
      title: 'Thrust-to-Weight ↔ Vertical Climb & Acceleration',
      subtitle: 'Examine how thrust-to-weight ratio dictates vertical acceleration, climb gradient, time-to-climb to 30,000 ft, and sustained turning performance.',
      equation: 'a_v = (T/W − 1) × g · n_sustained = (T/W) × (L/D)',
      aircraftLink: 'Cessna 172 (0.06) vs Harrier (1.04) vs F-16 (1.09)',
      difficulty: 'Intermediate', time: '12 min', learn: 'Climb and acceleration',
    },
    {
      num: '07',
      slug: 'wing-loading',
      discipline: 'Aerodynamics',
      title: 'Wing Loading ↔ Stall Speed & Turn Radius',
      subtitle: 'Calculate stall speed boundaries and minimum turn radii as a function of wing loading (kg/m²) and maximum usable lift coefficient.',
      equation: 'V_s = √(2(W/S) / (ρ × C_Lmax)) · R = V² / (g × √(n²−1))',
      aircraftLink: 'Cessna 172 (64 kg/m²) vs F-16 (430 kg/m²) vs 747 (700 kg/m²)',
      difficulty: 'Intermediate', time: '10 min', learn: 'Stall speed limits',
    },
    {
      num: '08',
      slug: 'thrust-vectoring',
      discipline: 'Propulsion & VTOL',
      title: 'Thrust Vectoring ↔ VTOL Transition Dynamics',
      subtitle: 'Decompose rotating nozzle vector angles from 90° hover to 0° cruise, and identify the hazardous transition corridor where wing lift must replace jet thrust.',
      equation: 'T_vertical = T × sin(θ) · T_horizontal = T × cos(θ)',
      aircraftLink: 'Harrier Pegasus 4-Nozzle vs F-35B 3BSD + Lift Fan',
      difficulty: 'Intermediate', time: '12 min', learn: 'Thrust vector components',
    },
    {
      num: '09',
      slug: 'structural-stress',
      discipline: 'Structural Engineering',
      title: 'Fuselage Hoop Stress ↔ Pressurization Scaling',
      subtitle: 'Investigate how fuselage diameter exponentially multiplies wall tensile hoop stress, safety yield margins, and catastrophic window stress concentrations.',
      equation: 'σ_hoop = (ΔP × r) / t · K_t = 1 + 2√(a/ρ)',
      aircraftLink: 'De Havilland Comet vs Boeing 747 (6.5m) vs A380 (7.1m)',
      difficulty: 'Advanced', time: '15 min', learn: 'Pressurized structure',
    },
    {
      num: '10',
      slug: 'altitude-density',
      discipline: 'Atmospheric Physics',
      title: 'Atmospheric Altitude & Density Envelope',
      subtitle: 'Sweep through the ISA atmospheric layers from sea level to 85,000 ft, tracking temperature, air density drop, acoustic speed, and dynamic pressure.',
      equation: 'ρ(h) = P(h) / (R × T(h)) · q = ½ρV²',
      aircraftLink: 'Cessna (14k ft) vs 747 (43k ft) vs Concorde (60k ft) vs SR-71 (85k ft)',
      difficulty: 'Beginner', time: '10 min', learn: 'Atmospheric envelopes',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-[#0e9954] font-bold mb-2">
          Interactive Physics Laboratories · 10 Workstations
        </div>
        <h1 className="text-4xl font-extrabold text-white font-serif tracking-tight">
          AeroLab Workstations
        </h1>
        <p className="mt-3 text-lg text-slate-300">
          Isolate one physical variable. Adjust parameters in real-time and observe the aerodynamic, thermodynamic, and structural consequences across flight regimes.
        </p>
      </div>

      <div className="space-y-6">
        {allLabs.map((lab) => (
          <div
            key={lab.slug}
            className="rounded-2xl border border-white/10 bg-[#07032a] p-6 sm:p-8 shadow-xl transition-all duration-200 hover:border-[#0e9954]/50"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#0e9954]/20 text-[#0e9954] font-mono text-xs font-bold flex items-center justify-center border border-[#0e9954]/40">
                    {lab.num}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                    {lab.discipline}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white font-serif">
                  {lab.title}
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                  {lab.subtitle}
                </p>
              </div>

              <Link
                href={`/lab/${lab.slug}`}
                className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-xl bg-[#0e9954] text-white font-bold text-xs hover:bg-[#0c8046] transition-colors shadow-[0_0_15px_rgba(14,153,84,0.3)] whitespace-nowrap"
              >
                <span>Launch Lab</span>
                <span>→</span>
              </Link>
            </div>

            {lab.equation && (
              <div className="mt-4 inline-block font-mono text-xs text-emerald-300 bg-[#040118] px-3.5 py-1.5 rounded-lg border border-[#0e9954]/25">
                Governing Equation: {lab.equation}
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-wide">
              <span className="rounded border border-white/10 bg-white/5 px-2 py-1 text-slate-300">{lab.difficulty}</span>
              <span className="rounded border border-white/10 bg-white/5 px-2 py-1 text-slate-400">{lab.time}</span>
              <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-emerald-300">Learn: {lab.learn}</span>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-[#0e9954] font-bold">PRIMARY BENCHMARK:</span>
              <span className="text-slate-200">{lab.aircraftLink}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
