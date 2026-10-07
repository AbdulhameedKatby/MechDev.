'use client'

import React, { useState, useEffect, useRef } from 'react'

// Subtle CSS-only animated scan line ticker for desktop
export default function HeroTicker() {
  const ticks = [
    'STAGNATION T₀ = +127°C AT MACH 2.04',
    'WING SWEEP: 63° LEADING EDGE · OGIVAL DELTA PLANFORM',
    'ASPECT RATIO: 1.83 · INDUCED DRAG COEFFICIENT CDᵢ = CL² / (π·e·AR)',
    'OLYMPUS 593 TURBOJET: 169 kN DRY · 186 kN WITH AFTERBURN',
    'SKIN TEMPERATURE: ALUMINUM-COPPER ALLOY LIMIT ~130°C',
    'L/D CRUISE EFFICIENCY: 7.14 AT MACH 2 · CONCORDE DESIGN TRADE',
    'RANKINE-HUGONIOT SHOCK: ρ₂/ρ₁ = (γ+1)M² / ((γ-1)M²+2)',
    'ISA STRATOSPHERE: T∞ = −56.5°C · a = 295 m/s AT 60,000 FT',
    'CONCORDE FUEL TRIM: 13-TANK SYSTEM SHIFTS CG DURING TRANSONIC TRANSITION',
    'WAVE DRAG DIVERGENCE: MACH 0.75–0.80 FOR CONVENTIONAL SWEPT WINGS',
    'SR-71 TITANIUM EXPANSION: AIRFRAME GROWS ~30 cm AT MACH 3.2 CRUISE',
    'F-16 FBW: 40 CORRECTIONS/SEC · NEGATIVE STATIC STABILITY Cₘα > 0',
  ]

  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx((i) => (i + 1) % ticks.length)
        setVisible(true)
      }, 400)
    }, 4200)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [idx, ticks.length])

  return (
    <div className="flex items-center gap-3 overflow-hidden">
      <span className="shrink-0 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
        TELEMETRY
      </span>
      <span className="w-px h-3 bg-emerald-500/40 shrink-0" />
      <span
        className="text-[11px] font-mono text-slate-300 truncate transition-all duration-300"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-6px)' }}
      >
        {ticks[idx]}
      </span>
    </div>
  )
}
