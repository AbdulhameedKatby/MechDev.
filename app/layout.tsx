import '../styles/globals.css'
import React from 'react'
import SiteHeader from '../components/SiteHeader'
import NavigationLoader from '../components/NavigationLoader'
import type { Metadata } from 'next'

const siteUrl = 'https://abdulhameedkatby.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MechDev. | Aircraft Engineering, Physics & Interactive Labs',
    template: '%s | MechDev.',
  },
  description: 'MechDev. — discover why aircraft are designed the way they are through physics, interactive labs, and traceable sources.',
  keywords: [
    'abdulhameed katby',
    'aircraft engineering',
    'aerospace engineering',
    'aircraft aerodynamics',
    'supersonic aerodynamics',
    'Concorde engineering',
    'interactive physics labs',
    'flight mechanics',
  ],
  authors: [{ name: 'Abdulhameed Katby' }],
  creator: 'Abdulhameed Katby',
  publisher: 'MechDev.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'MechDev.',
    title: 'MechDev. | Aircraft Engineering, Physics & Interactive Labs',
    description: 'Investigate why aircraft are designed the way they are with evidence, equations, and interactive engineering labs.',
    images: [{ url: '/assets/concorde_mach2_cruise.jpg', width: 1200, height: 630, alt: 'Concorde flying at Mach 2.04' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MechDev. | Aircraft Engineering & Physics',
    description: 'Investigate aircraft design through aerodynamics, flight mechanics, evidence, and interactive labs.',
    images: ['/assets/concorde_mach2_cruise.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  icons: {
    icon: '/icon.svg?v=4',
    shortcut: '/icon.svg?v=4',
    apple: '/icon.svg?v=4',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'MechDev.',
        description: 'Aircraft engineering, aerospace physics, and interactive flight mechanics labs.',
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'MechDev.',
        url: siteUrl,
        logo: `${siteUrl}/icon.svg`,
        founder: { '@type': 'Person', name: 'Abdulhameed Katby' },
        sameAs: ['https://www.linkedin.com/in/abdulhameedkatby/'],
      },
      {
        '@type': 'EducationalOrganization',
        name: 'MechDev.',
        url: siteUrl,
        description: 'An evidence-led platform for learning aircraft engineering through interactive investigations.',
      },
    ],
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg?v=4" type="image/svg+xml" />
      </head>
      <body className="min-h-screen flex flex-col">
        <NavigationLoader />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <SiteHeader />
        <main className="container flex-1 pt-24 sm:pt-28 pb-10 sm:pb-12">{children}</main>
        <footer className="relative overflow-hidden border-t border-[#0e9954]/30 bg-[#040118] text-slate-300">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0e9954] to-transparent opacity-70" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#0e9954]/10 blur-3xl" />

          <div className="container relative z-10 space-y-10 py-12 sm:py-16">
            <div className="flex flex-col gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#0e9954] shadow-[0_0_14px_rgba(14,153,84,0.4)]">
                    <img src="/assets/logo.png" alt="Abdulhameed Katby" className="h-full w-full object-cover object-top" />
                  </div>
                  <div>
                    <span className="block font-brand text-2xl font-bold leading-none text-white">
                      <span className="font-black text-[#0e9954]">M</span>ech<span className="font-black text-[#0e9954]">D</span>ev<span className="font-black text-[#0e9954]">.</span>
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Flight mechanics archive</span>
                  </div>
                </div>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-slate-400">
                  Understand the physics behind aircraft design through evidence, equations, and interactive experiments.
                </p>
              </div>

              <a
                href="https://www.linkedin.com/in/abdulhameedkatby/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-2 rounded-lg border border-[#0a66c2]/40 bg-[#0a66c2]/10 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-[#0a66c2] hover:bg-[#0a66c2]"
              >
                <svg className="h-3.5 w-3.5 fill-current text-[#4da3e8] group-hover:text-white" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69 1.69 1.69 0 0 0-1.69 1.69m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                Connect with the engineer
                <span className="text-slate-400 group-hover:text-white">↗</span>
              </a>
            </div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.35fr]">
              <div>
                <h4 className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#0e9954]">Investigate</h4>
                <ul className="space-y-2.5 text-sm text-slate-400">
                  <li><a href="/aircraft/concorde" className="transition-colors hover:text-white">Concorde airframe</a></li>
                  <li><a href="/questions/why-delta-wing" className="transition-colors hover:text-white">Why the delta wing?</a></li>
                  <li><a href="/concepts/supersonic-aerodynamics" className="transition-colors hover:text-white">Supersonic aerodynamics</a></li>
                  <li><a href="/editorial" className="transition-colors hover:text-white">Methodology & trust</a></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#0e9954]">Run a lab</h4>
                <ul className="space-y-2.5 font-mono text-xs text-slate-400">
                  <li><a href="/lab/aspect-ratio" className="transition-colors hover:text-white">01 / Aspect ratio</a></li>
                  <li><a href="/lab/wing-sweep" className="transition-colors hover:text-white">02 / Wing sweep</a></li>
                  <li><a href="/lab/kinetic-heating" className="transition-colors hover:text-white">03 / Kinetic heating</a></li>
                  <li><a href="/lab/bypass-ratio" className="transition-colors hover:text-white">04 / Bypass ratio</a></li>
                  <li><a href="/lab/fuel-transfer" className="transition-colors hover:text-white">05 / Fuel transfer</a></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#0e9954]">Explore</h4>
                <ul className="space-y-2.5 text-sm text-slate-400">
                  <li><a href="/aircraft" className="transition-colors hover:text-white">Aircraft archive</a></li>
                  <li><a href="/questions" className="transition-colors hover:text-white">Engineering questions</a></li>
                  <li><a href="/concepts" className="transition-colors hover:text-white">Physics concepts</a></li>
                  <li><a href="/lab" className="transition-colors hover:text-white">All interactive labs</a></li>
                </ul>
              </div>

              <div className="rounded-xl border border-[#0e9954]/25 bg-[#07032a]/70 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#0e9954]">Archive signal</h4>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" /> Reference</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 font-mono">
                  <div><div className="text-lg font-bold text-white">Mach 2.04</div><div className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">Flagship cruise</div></div>
                  <div><div className="text-lg font-bold text-white">NASA / BAC</div><div className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">Core sources</div></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} MechDev. · Built by <a href="https://www.linkedin.com/in/abdulhameedkatby/" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-300 hover:text-white">Abdulhameed Katby</a></p>
              <p className="font-mono text-[10px] uppercase tracking-wider">Evidence-led flight mechanics</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
