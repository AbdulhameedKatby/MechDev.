"use client"
import React, { useState } from 'react'
import type { AircraftPoint } from '../lib/types'

interface DesignSpaceChartProps {
  aircraft: AircraftPoint[]
}

export default function DesignSpaceChart({ aircraft }: DesignSpaceChartProps) {
  const [selectedOne, setSelectedOne] = useState<AircraftPoint | null>(
    aircraft.find((a) => a.name.includes('Concorde')) || null
  )
  const [selectedTwo, setSelectedTwo] = useState<AircraftPoint | null>(
    aircraft.find((a) => a.name.includes('787')) || null
  )

  // Bounds
  const minAR = 0
  const maxAR = 12
  const minMach = 0
  const maxMach = 3.6

  const width = 640
  const height = 360
  const padding = { top: 30, right: 30, bottom: 50, left: 60 }
  const plotWidth = width - padding.left - padding.right
  const plotHeight = height - padding.top - padding.bottom

  const scaleX = (ar: number) => padding.left + (ar / maxAR) * plotWidth
  const scaleY = (mach: number) => padding.top + plotHeight - (mach / maxMach) * plotHeight
  const scaleRadius = (area: number) => Math.max(7, Math.min(22, Math.sqrt(area) * 0.9))

  const getEraColor = (era: string) => {
    switch (era) {
      case '1960s':
        return '#f59e0b' // Amber
      case '1980s':
        return '#38bdf8' // Sky blue
      case '2000s':
        return '#0e9954' // Exact Green
      default:
        return '#a855f7'
    }
  }

  const handlePointClick = (plane: AircraftPoint) => {
    if (!selectedOne) {
      setSelectedOne(plane)
    } else if (selectedOne.name === plane.name) {
      // Unselect one
      setSelectedOne(selectedTwo)
      setSelectedTwo(null)
    } else if (!selectedTwo) {
      setSelectedTwo(plane)
    } else if (selectedTwo.name === plane.name) {
      setSelectedTwo(null)
    } else {
      // Cycle comparison
      setSelectedTwo(plane)
    }
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#07032a] p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <div>
          <h3 className="text-xl font-bold text-white font-serif">
            The Aircraft Design Space
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Aspect Ratio vs. Cruise / Maximum Mach number. Bubble size corresponds to Wing Area (m²).
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> 1960s Era
          </span>
          <span className="flex items-center gap-1.5 text-sky-400">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> 1980s Era
          </span>
          <span className="flex items-center gap-1.5 text-[#0e9954]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0e9954]" /> 2000s Era
          </span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
          {/* Axis & Grid */}
          {[0, 2, 4, 6, 8, 10, 12].map((ar) => (
            <g key={`ar-grid-${ar}`}>
              <line
                x1={scaleX(ar)}
                y1={padding.top}
                x2={scaleX(ar)}
                y2={height - padding.bottom}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="2 2"
              />
              <text
                x={scaleX(ar)}
                y={height - padding.bottom + 18}
                textAnchor="middle"
                className="fill-slate-500 font-mono text-[10px]"
              >
                {ar}
              </text>
            </g>
          ))}

          {[0, 0.8, 1.5, 2.0, 2.5, 3.0, 3.5].map((mach) => (
            <g key={`mach-grid-${mach}`}>
              <line
                x1={padding.left}
                y1={scaleY(mach)}
                x2={width - padding.right}
                y2={scaleY(mach)}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="2 2"
              />
              <text
                x={padding.left - 10}
                y={scaleY(mach) + 4}
                textAnchor="end"
                className="fill-slate-500 font-mono text-[10px]"
              >
                M {mach.toFixed(1)}
              </text>
            </g>
          ))}

          {/* Mach 1 line */}
          <line
            x1={padding.left}
            y1={scaleY(1.0)}
            x2={width - padding.right}
            y2={scaleY(1.0)}
            stroke="#ef4444"
            strokeWidth={1}
            strokeDasharray="4 4"
            opacity={0.5}
          />
          <text
            x={width - padding.right - 5}
            y={scaleY(1.0) - 6}
            textAnchor="end"
            className="fill-red-400 font-mono text-[9px] uppercase tracking-wider"
          >
            Transonic Barrier (Mach 1.0)
          </text>

          {/* Connecting line between selected two */}
          {selectedOne && selectedTwo && (
            <line
              x1={scaleX(selectedOne.aspectRatio)}
              y1={scaleY(selectedOne.maxMach)}
              x2={scaleX(selectedTwo.aspectRatio)}
              y2={scaleY(selectedTwo.maxMach)}
              stroke="#0e9954"
              strokeWidth={1.5}
              strokeDasharray="4 2"
              opacity={0.8}
            />
          )}

          {/* Aircraft Points */}
          {aircraft.map((plane) => {
            const cx = scaleX(plane.aspectRatio)
            const cy = scaleY(plane.maxMach)
            const r = scaleRadius(plane.wingArea)
            const isSelected =
              selectedOne?.name === plane.name || selectedTwo?.name === plane.name
            const color = getEraColor(plane.era)

            return (
              <g
                key={plane.name}
                className="cursor-pointer group"
                onClick={() => handlePointClick(plane)}
              >
                {/* Generous invisible hit circle to ensure click/hover never misses or flickers */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={Math.max(r + 10, 18)}
                  fill="transparent"
                />

                {/* Stable Selection indicator ring (no jitter, no scale jump) */}
                {isSelected && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r + 5}
                    fill="none"
                    stroke="#0e9954"
                    strokeWidth={2}
                    strokeDasharray="4 2"
                    opacity={0.9}
                  />
                )}

                {/* Main bubble - safe styling with zero transform jitter */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? r + 2 : r}
                  fill={color}
                  fillOpacity={isSelected ? 0.95 : 0.65}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  strokeOpacity={isSelected ? 1 : 0.75}
                  className="transition-all duration-150 group-hover:fill-opacity-100 group-hover:stroke-white group-hover:stroke-[2.5px]"
                />

                {/* Text label with pointer-events-none to prevent mouse cursor conflicts */}
                <text
                  x={cx}
                  y={cy - r - 8}
                  textAnchor="middle"
                  className={`text-[11px] font-sans font-bold drop-shadow pointer-events-none select-none ${
                    isSelected ? 'fill-white' : 'fill-slate-300'
                  }`}
                >
                  {plane.name}
                </text>
              </g>
            )
          })}

          {/* Axis Labels */}
          <text
            x={padding.left + plotWidth / 2}
            y={height - 12}
            textAnchor="middle"
            className="fill-slate-400 font-medium text-[11px]"
          >
            Aspect Ratio (AR = b² / S)
          </text>
          <text
            x={-(padding.top + plotHeight / 2)}
            y={18}
            transform="rotate(-90)"
            textAnchor="middle"
            className="fill-slate-400 font-medium text-[11px]"
          >
            Maximum Flight Speed (Mach)
          </text>
        </svg>
      </div>

      {/* Comparison Cards */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedOne && (
          <div className="rounded-xl border border-[#0e9954]/40 bg-[#0b0438] p-4 text-xs">
            <div className="flex justify-between items-center text-[#0e9954] font-mono font-bold text-sm">
              <span>{selectedOne.name}</span>
              <span>{selectedOne.era}</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">Aspect Ratio</span>
                <span className="text-white font-bold">{selectedOne.aspectRatio}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Max Speed</span>
                <span className="text-white font-bold">Mach {selectedOne.maxMach}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Wing Area</span>
                <span className="text-white font-bold">{selectedOne.wingArea} m²</span>
              </div>
            </div>
            <div className="mt-2 text-slate-300 text-[11px]">
              <span className="text-slate-500">Planform:</span> {selectedOne.wingType}
            </div>
          </div>
        )}

        {selectedTwo && (
          <div className="rounded-xl border border-sky-500/40 bg-[#071126] p-4 text-xs">
            <div className="flex justify-between items-center text-sky-400 font-mono font-bold text-sm">
              <span>{selectedTwo.name}</span>
              <span>{selectedTwo.era}</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">Aspect Ratio</span>
                <span className="text-white font-bold">{selectedTwo.aspectRatio}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Max Speed</span>
                <span className="text-white font-bold">Mach {selectedTwo.maxMach}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Wing Area</span>
                <span className="text-white font-bold">{selectedTwo.wingArea} m²</span>
              </div>
            </div>
            <div className="mt-2 text-slate-300 text-[11px]">
              <span className="text-slate-500">Planform:</span> {selectedTwo.wingType}
            </div>
          </div>
        )}
      </div>

      {/* Engineering Insight */}
      <div className="mt-4 p-4 rounded-xl border border-white/10 bg-[#040118] text-xs text-slate-300 leading-relaxed">
        <span className="text-[#0e9954] font-bold font-mono mr-2">PHYSICS INSIGHT:</span>
        Concorde stands isolated in the upper-left quadrant (AR = 1.83, Mach 2.04). Commercial airliners (like Boeing 787, AR = 10.2) cluster in the high-AR subsonic efficiency region to minimize induced drag. Concorde sacrificed aspect ratio and fuel burn entirely to prevent shock wave detachment and flutter at Mach 2.
      </div>
    </div>
  )
}
