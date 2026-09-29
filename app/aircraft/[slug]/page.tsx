import React from 'react'
import { notFound } from 'next/navigation'
import { aircraftList, getAircraftBySlug } from '../../../content/aircraftRegistry'
import { getAircraftImage } from '../../../lib/types'
import { siteAuthor, siteName, siteUrl } from '../../../lib/site'
import ConcordeDetailClient from '../../../components/ConcordeDetailClient'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return aircraftList.map(({ slug }) => ({ slug }))
}

export const dynamicParams = false

export function generateMetadata({ params }: Props) {
  const aircraft = getAircraftBySlug(params.slug)
  if (!aircraft) return { title: 'Aircraft Not Found' }

  const image = aircraft.hoverImage ?? getAircraftImage(aircraft)

  return {
    title: `${aircraft.name} | Aircraft Engineering Deep-Dive`,
    description: `${aircraft.subtitle} Explore the mission, aerodynamics, propulsion, structures, flight controls, evidence, and design trade-offs behind ${aircraft.name}.`,
    keywords: [
      aircraft.name,
      `${aircraft.name} engineering`,
      `${aircraft.name} aerodynamics`,
      `${aircraft.name} design`,
      aircraft.role,
      'aircraft engineering',
      'aerospace engineering',
    ],
    alternates: { canonical: `/aircraft/${aircraft.slug}` },
    openGraph: {
      title: `${aircraft.name} | Aircraft Engineering Deep-Dive`,
      description: `Investigate why ${aircraft.name} was designed this way through physics, specifications, and traceable sources.`,
      images: [{ url: image, alt: aircraft.heroImageAlt ?? `${aircraft.name} engineering investigation` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${aircraft.name} | Aircraft Engineering Deep-Dive`,
      description: aircraft.subtitle,
      images: [image],
    },
    robots: { index: true, follow: true },
  }
}

export default function AircraftDetailPage({ params }: Props) {
  const { slug } = params
  const aircraft = getAircraftBySlug(slug)

  if (!aircraft) {
    notFound()
  }

  const image = aircraft.hoverImage ?? getAircraftImage(aircraft)
  const absoluteImage = image.startsWith('http') ? image : `${siteUrl}${image}`
  const pageUrl = `${siteUrl}/aircraft/${aircraft.slug}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${pageUrl}#article`,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        headline: `${aircraft.name} | Aircraft Engineering Deep-Dive`,
        description: `${aircraft.subtitle} Explore the engineering decisions, physics, evidence, and trade-offs behind ${aircraft.name}.`,
        image: absoluteImage,
        author: { '@type': 'Person', name: siteAuthor.name, url: siteAuthor.url },
        publisher: { '@type': 'Organization', name: siteName, url: siteUrl },
        about: { '@type': 'Product', name: aircraft.name, category: 'Aircraft' },
        keywords: [aircraft.name, `${aircraft.name} engineering`, `${aircraft.name} aerodynamics`, aircraft.role].join(', '),
        isPartOf: { '@id': `${siteUrl}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Aircraft', item: `${siteUrl}/aircraft` },
          { '@type': 'ListItem', position: 2, name: aircraft.name, item: pageUrl },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ConcordeDetailClient aircraft={aircraft} />
    </>
  )
}
