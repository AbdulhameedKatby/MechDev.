import React from 'react'
import { notFound } from 'next/navigation'
import { getAircraftBySlug } from '../../../content/aircraftRegistry'
import ConcordeDetailClient from '../../../components/ConcordeDetailClient'

interface Props {
  params: { slug: string }
}

export function generateMetadata({ params }: Props) {
  const aircraft = getAircraftBySlug(params.slug)
  if (!aircraft) return { title: 'Aircraft Not Found' }

  return {
    title: `${aircraft.name} | Aircraft Engineering Deep-Dive`,
    description: `${aircraft.subtitle} Explore the mission, aerodynamics, propulsion, structures, flight controls, evidence, and design trade-offs behind ${aircraft.name}.`,
    alternates: { canonical: `/aircraft/${aircraft.slug}` },
    openGraph: {
      title: `${aircraft.name} | Aircraft Engineering Deep-Dive`,
      description: `Investigate why ${aircraft.name} was designed this way through physics, specifications, and traceable sources.`,
      images: [{ url: '/assets/concorde_mach2_cruise.jpg', alt: `${aircraft.name} engineering investigation` }],
    },
  }
}

export default function AircraftDetailPage({ params }: Props) {
  const { slug } = params
  const aircraft = getAircraftBySlug(slug)

  if (!aircraft) {
    notFound()
  }

  return <ConcordeDetailClient aircraft={aircraft} />
}
