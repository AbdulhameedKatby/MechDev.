"use client"
import React from 'react'

export interface Marker {
  x: number
  y: number
  label: string
  color?: string
  sublabel?: string
}

export interface LineSeries {
  id: string
  name: string
  data: { x: number; y: number }[]
  color?: string
  dashed?: boolean
}

interface LabChartProps {
  data?: { x: number; y: number }[]
  series?: LineSeries[]
  xLabel: string
  yLabel: string
  xUnit?: string
  yUnit?: string
  currentX?: number
  markers?: Marker[]
  xMin?: number
  xMax?: number
  yMin?: number
  yMax?: number
  formatX?: (v: number) => string
  formatY?: (v: number) => string
  height?: number
}

export default function LabChart({
  data,
  series,
  xLabel,
  yLabel,
  xUnit = '',
  yUnit = '',
  currentX,
  markers = [],
  xMin: explicitXMin,
  xMax: explicitXMax,
  yMin: explicitYMin,
  yMax: explicitYMax,
  formatX = (v) => v.toFixed(1),
  formatY = (v) => v.toFixed(2),
  height = 280,
}: LabChartProps) {
  const allSeries: LineSeries[] = series || (data ? [{ id: 'main', name: 'Value', data, color: '#0e9954' }] : [])

  // Calculate bounds
  let minX = explicitXMin ?? Infinity
  let maxX = explicitXMax ?? -Infinity
  let minY = explicitYMin ?? Infinity
  let maxY = explicitYMax ?? -Infinity

  allSeries.forEach((s) => {
    s.data.forEach((p) => {
      if (p.x < minX) minX = p.x
      if (p.x > maxX) maxX = p.x
      if (p.y < minY) minY = p.y
      if (p.y > maxY) maxY = p.y
    })
  })

  markers.forEach((m) => {
    if (m.x < minX) minX = m.x
    if (m.x > maxX) maxX = m.x
    if (m.y < minY) minY = m.y
    if (m.y > maxY) maxY = m.y
  })

  if (minX === Infinity) { minX = 0; maxX = 1; minY = 0; maxY = 1; }
  if (minY === maxY) { maxY += 1; }
  if (minX === maxX) { maxX += 1; }

  // SVG coordinate dimensions
  const svgWidth = 600
  const svgHeight = height
  const padding = { top: 30, right: 30, bottom: 45, left: 60 }
  const plotWidth = svgWidth - padding.left - padding.right
  const plotHeight = svgHeight - padding.top - padding.bottom

  const scaleX = (val: number) => padding.left + ((val - minX) / (maxX - minX)) * plotWidth
  const scaleY = (val: number) => padding.top + plotHeight - ((val - minY) / (maxY - minY)) * plotHeight

  // Generate ticks
  const xTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => minX + t * (maxX - minX))
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => minY + t * (maxY - minY))

  // Find current point on main curve if currentX provided
  let currentPoint: { x: number; y: number } | null = null
  if (currentX !== undefined && allSeries.length > 0) {
    const mainCurve = allSeries[0].data
    // closest point
    let closest = mainCurve[0]
    let closestDist = Math.abs(mainCurve[0].x - currentX)
    for (let i = 1; i < mainCurve.length; i++) {
      const dist = Math.abs(mainCurve[i].x - currentX)
      if (dist < closestDist) {
        closestDist = dist
        closest = mainCurve[i]
      }
    }
    if (closest) currentPoint = closest
  }

  return (
    <div className="w-full rounded-xl border border-white/10 bg-[#091710] p-4 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 px-2">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
          {yLabel} {yUnit && `(${yUnit})`} vs. {xLabel} {xUnit && `(${xUnit})`}
        </span>
        {allSeries.length > 1 && (
          <div className="flex flex-wrap gap-4 text-xs">
            {allSeries.map((s) => (
              <div key={s.id} className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-0.5" style={{ backgroundColor: s.color || '#0e9954' }} />
                <span className="text-slate-300">{s.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible select-none"
        >
          {/* Grid lines */}
          {yTicks.map((val, idx) => {
            const y = scaleY(val)
            return (
              <g key={`y-grid-${idx}`}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={svgWidth - padding.right}
                  y2={y}
                  stroke="rgba(255,255,255,0.06)"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-slate-500 font-mono text-[10px]"
                >
                  {formatY(val)}
                </text>
              </g>
            )
          })}

          {xTicks.map((val, idx) => {
            const x = scaleX(val)
            return (
              <g key={`x-grid-${idx}`}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={svgHeight - padding.bottom}
                  stroke="rgba(255,255,255,0.06)"
                  strokeDasharray="3 3"
                />
                <text
                  x={x}
                  y={svgHeight - padding.bottom + 18}
                  textAnchor="middle"
                  className="fill-slate-500 font-mono text-[10px]"
                >
                  {formatX(val)}
                </text>
              </g>
            )
          })}

          {/* Curves */}
          {allSeries.map((s) => {
            const pointsStr = s.data.map((p) => `${scaleX(p.x)},${scaleY(p.y)}`).join(' ')
            return (
              <polyline
                key={s.id}
                fill="none"
                stroke={s.color || '#0e9954'}
                strokeWidth={2.5}
                strokeDasharray={s.dashed ? '4 4' : undefined}
                points={pointsStr}
              />
            )
          })}

          {/* Current selected vertical cursor */}
          {currentX !== undefined && (
            <g>
              <line
                x1={scaleX(currentX)}
                y1={padding.top}
                x2={scaleX(currentX)}
                y2={svgHeight - padding.bottom}
                stroke="#0e9954"
                strokeWidth={1.5}
                strokeDasharray="4 2"
                opacity={0.7}
              />
              {currentPoint && (
                <circle
                  cx={scaleX(currentPoint.x)}
                  cy={scaleY(currentPoint.y)}
                  r={5}
                  fill="#0e9954"
                  stroke="#07110b"
                  strokeWidth={2}
                />
              )}
            </g>
          )}

          {/* Aircraft / Comparison Markers */}
          {markers.map((m, idx) => {
            const cx = scaleX(m.x)
            const cy = scaleY(m.y)
            const isConcorde = m.label.toLowerCase().includes('concorde')
            const color = m.color || (isConcorde ? '#0e9954' : '#38bdf8')
            return (
              <g key={`marker-${idx}`} className="group cursor-pointer">
                <circle
                  cx={cx}
                  cy={cy}
                  r={isConcorde ? 6 : 4.5}
                  fill={color}
                  stroke="#ffffff"
                  strokeWidth={1.5}
                  className="transition-all duration-150 group-hover:stroke-[2.5px] group-hover:stroke-emerald-400"
                />
                <text
                  x={cx}
                  y={cy - 10}
                  textAnchor="middle"
                  className="fill-slate-200 font-sans text-[11px] font-semibold drop-shadow"
                >
                  {m.label}
                </text>
                {m.sublabel && (
                  <text
                    x={cx}
                    y={cy + 14}
                    textAnchor="middle"
                    className="fill-slate-400 font-mono text-[9px]"
                  >
                    {m.sublabel}
                  </text>
                )}
              </g>
            )
          })}

          {/* Axis Titles */}
          <text
            x={padding.left + plotWidth / 2}
            y={svgHeight - 10}
            textAnchor="middle"
            className="fill-slate-400 font-medium text-[11px]"
          >
            {xLabel} {xUnit && `(${xUnit})`}
          </text>
        </svg>
      </div>
    </div>
  )
}
