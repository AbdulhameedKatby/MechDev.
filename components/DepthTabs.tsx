"use client"
import React, { useState } from 'react'

export interface TabItem {
  id: string
  label: string
  content: React.ReactNode
}

export interface DepthTabsProps {
  discover?: React.ReactNode
  understand?: React.ReactNode
  investigate?: React.ReactNode
  tabs?: TabItem[]
}

export default function DepthTabs({ discover, understand, investigate, tabs }: DepthTabsProps) {
  // If tabs array is passed, normalize it
  const normalizedTabs: TabItem[] = tabs && tabs.length > 0
    ? tabs
    : [
        {
          id: 'discover',
          label: '1. Discover',
          content: discover,
        },
        {
          id: 'understand',
          label: '2. Understand',
          content: understand,
        },
        {
          id: 'investigate',
          label: '3. Investigate',
          content: investigate,
        },
      ]

  const [activeTabId, setActiveTabId] = useState<string>(normalizedTabs[0]?.id || 'discover')

  const getBadgeColor = (id: string, idx: number) => {
    if (id.includes('discover') || idx === 0) return 'bg-[#0e9954]'
    if (id.includes('understand') || idx === 1) return 'bg-sky-400'
    if (id.includes('investigate') || idx === 2) return 'bg-amber-400'
    return 'bg-purple-400'
  }

  const getSubtitle = (id: string, idx: number) => {
    if (id.includes('discover') || idx === 0) return '(Visual intuition)'
    if (id.includes('understand') || idx === 1) return '(Governing equations)'
    if (id.includes('investigate') || idx === 2) return '(Flight certification data)'
    return ''
  }

  const activeContent = normalizedTabs.find((t) => t.id === activeTabId)?.content

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#07032a] overflow-hidden shadow-2xl">
      {/* Tab Navigation Bar */}
      <div className="flex border-b border-white/10 bg-[#040118]">
        {normalizedTabs.map((tab, idx) => {
          const isActive = activeTabId === tab.id
          const subtitle = getSubtitle(tab.id, idx)
          const dotColor = getBadgeColor(tab.id, idx)

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex-1 py-3 px-4 text-sm font-semibold transition-all duration-75 flex items-center justify-center gap-2 ${
                isActive
                  ? 'border-b-2 border-[#0e9954] text-white bg-[#0e9954]/10 shadow-[inset_0_-2px_8px_rgba(14,153,84,0.2)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${dotColor}`} />
              <span className="font-mono">{tab.label}</span>
              {subtitle && (
                <span className="hidden sm:inline text-xs text-slate-500 font-normal">
                  {subtitle}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Tab Content Panel */}
      <div className="p-6 md:p-8">
        <div key={activeTabId} className="animate-in fade-in duration-75">
          {activeContent}
        </div>
      </div>
    </div>
  )
}
