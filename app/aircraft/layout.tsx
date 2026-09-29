import type { Metadata } from 'next'
import { aircraftList } from '../../content/aircraftRegistry'
import { siteName, siteUrl } from '../../lib/site'

export const metadata: Metadata = {
  title: 'Aircraft Archive | Engineering Design Investigations',
  description: 'Explore 15 aircraft through their aerodynamics, propulsion, structures, flight controls, and engineering trade-offs.',
  alternates: { canonical: '/aircraft' },
}

export default function AircraftLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${siteUrl}/aircraft#collection`,
    url: `${siteUrl}/aircraft`,
    name: 'Aircraft Archive | Engineering Design Investigations',
    description: 'Explore aircraft through aerodynamics, propulsion, structures, flight controls, physics, and evidence.',
    isPartOf: { '@id': `${siteUrl}/#website` },
    publisher: { '@type': 'Organization', name: siteName, url: siteUrl },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: aircraftList.length,
      itemListElement: aircraftList.map((aircraft, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: aircraft.name,
        url: `${siteUrl}/aircraft/${aircraft.slug}`,
      })),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  )
}