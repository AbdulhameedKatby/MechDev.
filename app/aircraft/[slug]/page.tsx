import React from 'react'
import { notFound } from 'next/navigation'
import { getAircraftBySlug } from '../../../content/aircraftRegistry'
import ConcordeDetailClient from '../../../components/ConcordeDetailClient'

interface Props {
  params: { slug: string }
}

export default function AircraftDetailPage({ params }: Props) {
  const { slug } = params
  const aircraft = getAircraftBySlug(slug)

  if (!aircraft) {
    notFound()
  }

  return <ConcordeDetailClient aircraft={aircraft} />
}
