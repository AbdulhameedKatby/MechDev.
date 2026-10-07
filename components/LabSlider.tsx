"use client"
import React from 'react'

interface LabSliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  onChange: (v: number) => void
  disabled?: boolean
}

export default function LabSlider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  disabled = false,
}: LabSliderProps) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center text-sm">
        <label className="text-slate-300 font-medium tracking-wide">{label}</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            onChange={(event) => {
              const nextValue = Number(event.target.value)
              if (Number.isFinite(nextValue)) onChange(Math.min(max, Math.max(min, nextValue)))
            }}
            aria-label={`${label} numeric value`}
            className="w-20 rounded border border-emerald-500/20 bg-[#0d2217] px-2 py-0.5 text-right font-mono font-bold text-emerald-400 outline-none focus:border-emerald-400 disabled:opacity-50"
          />
          <span className="text-xs text-slate-400">{unit}</span>
        </div>
      </div>

      <div className="relative flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          className="w-full h-2 bg-[#122e20] rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
        />
      </div>

      <div className="flex justify-between text-[11px] font-mono text-slate-500">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  )
}
