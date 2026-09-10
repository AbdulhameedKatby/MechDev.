import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aircraft Archive | Engineering Design Investigations',
  description: 'Explore 15 aircraft through their aerodynamics, propulsion, structures, flight controls, and engineering trade-offs.',
  alternates: { canonical: '/aircraft' },
}

export default function AircraftLayout({ children }: { children: React.ReactNode }) {
  return children
}