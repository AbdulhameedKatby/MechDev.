'use client'

import React, { useState, useEffect, useRef } from 'react'

interface CounterProps {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
}

function AnimatedCounter({ target, duration = 1400, suffix = '', prefix = '' }: CounterProps) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [started, target, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

const STATS = [
  { label: 'Aircraft Investigated', value: 15, suffix: '', color: 'text-white' },
  { label: 'Interactive Physics Labs', value: 10, suffix: '', color: 'text-emerald-400' },
  { label: 'Governing Equations Modelled', value: 40, suffix: '+', color: 'text-white' },
  { label: 'Primary Source Citations', value: 95, suffix: '+', color: 'text-emerald-400' },
  { label: 'Mach Numbers Analysed', value: 330, suffix: '% (SR-71)', prefix: 'M', color: 'text-white' },
  { label: 'Engineering Systems Mapped', value: 8, suffix: '', color: 'text-emerald-400' },
]

export default function StatsRibbon() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#050220] via-[#070328] to-[#030112] py-10 px-6 sm:px-12">
      {/* Accent line top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0e9954] to-transparent opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#0e9954]/40 to-transparent" />

      {/* Section label */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-emerald-400">
          <span className="h-px w-8 bg-emerald-500/50" />
          Platform Specifications
          <span className="h-px w-8 bg-emerald-500/50" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center space-y-1.5">
            <div className={`text-3xl sm:text-4xl font-extrabold font-brand tracking-tight ${stat.color}`}>
              <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
            </div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 leading-tight px-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
