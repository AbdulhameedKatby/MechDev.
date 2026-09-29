import '../styles/globals.css'
import React from 'react'
import SiteHeader from '../components/SiteHeader'
import NavigationLoader from '../components/NavigationLoader'
import SpaceBackground from '../components/SpaceBackground'
import type { Metadata } from 'next'
import { siteAuthor, siteName, siteUrl } from '../lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Aircraft Engineering, Aerodynamics & Flight Physics | MechDev.',
    template: '%s | MechDev.',
  },
  description: 'Explore aircraft engineering, aerodynamics, propulsion, structures, flight controls, and interactive physics labs with traceable sources.',
  keywords: [
    'aircraft engineering',
    'aerospace engineering',
    'aircraft aerodynamics',
    'supersonic aerodynamics',
    'Concorde engineering',
    'interactive physics labs',
    'flight mechanics',
  ],
  authors: [siteAuthor],
  creator: siteAuthor.name,
  publisher: siteName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName,
    title: 'Aircraft Engineering, Aerodynamics & Flight Physics | MechDev.',
    description: 'Investigate why aircraft are designed the way they are with evidence, equations, and interactive engineering labs.',
    images: [{ url: '/assets/Concorde.jpg', width: 1200, height: 630, alt: 'Concorde aircraft in flight' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aircraft Engineering, Aerodynamics & Flight Physics | MechDev.',
    description: 'Investigate aircraft design through aerodynamics, flight mechanics, evidence, and interactive labs.',
    images: ['/assets/Concorde.jpg'],
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
        name: siteName,
        description: 'Aircraft engineering, aerospace physics, and interactive flight mechanics labs.',
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/icon.svg`,
        founder: { '@type': 'Person', name: siteAuthor.name, url: siteAuthor.url },
        sameAs: [
          'https://www.linkedin.com/in/abdulhameedkatby/',
          'https://www.researchgate.net/profile/Abdulhamid-Katbi',
          'https://orcid.org/0009-0002-9286-9207',
        ],
      },
      {
        '@type': 'EducationalOrganization',
        name: siteName,
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
        <SpaceBackground />
        <NavigationLoader />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <SiteHeader />
        <main className="container relative z-10 flex-1 pt-24 sm:pt-28 pb-10 sm:pb-12">{children}</main>
        <footer className="relative z-10 overflow-hidden border-t border-[#0e9954]/30 bg-[#040118] text-slate-300">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0e9954] to-transparent opacity-70" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#0e9954]/10 blur-3xl" />

          <div className="container relative z-10 space-y-10 py-12 sm:py-16">
            <div className="flex flex-col gap-6 border-b border-white/10 pb-10">
              <div className="max-w-2xl">
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
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  Understand the physics behind aircraft design through evidence, equations, and interactive experiments.
                </p>

                {/* Profile Links */}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/abdulhameedkatby/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-[#0a66c2]/40 bg-[#0a66c2]/10 px-3.5 py-1.5 text-xs font-mono font-medium text-slate-200 transition-all hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white hover:shadow-[0_0_15px_rgba(10,102,194,0.4)]"
                  >
                    <svg className="h-3.5 w-3.5 fill-current text-[#4da3e8] group-hover:text-white transition-colors" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69 1.69 1.69 0 0 0-1.69 1.69m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    LinkedIn
                    <span className="text-[10px] text-slate-500 group-hover:text-white transition-colors">↗</span>
                  </a>

                  <a
                    href="https://www.researchgate.net/profile/Abdulhamid-Katbi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-[#00d0af]/40 bg-[#00d0af]/10 px-3.5 py-1.5 text-xs font-mono font-medium text-slate-200 transition-all hover:border-[#00d0af] hover:bg-[#00d0af] hover:text-slate-950 hover:shadow-[0_0_15px_rgba(0,208,175,0.4)]"
                  >
                    <svg className="h-3.5 w-3.5 fill-current text-[#00d0af] group-hover:text-slate-950 transition-colors" viewBox="0 0 24 24">
                      <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.121 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53c.042.162.073.3.113.438.243.743.65 1.303 1.213 1.68.565.375 1.255.564 2.073.564.818 0 1.508-.189 2.073-.564.563-.377.97-.937 1.213-1.68.04-.137.072-.276.113-.438a8.5 8.5 0 0 0 .077-.53 9 9 0 0 0 .05-.727c.01-.282.013-.621.013-1.017 0-.395-.003-.734-.013-1.016a9 9 0 0 0-.05-.727 8.5 8.5 0 0 0-.077-.53 3.193 3.193 0 0 0-.113-.437c-.243-.744-.65-1.303-1.213-1.68C21.094.19 20.404 0 19.586 0zm-7.953 6.963L8.309 13.92h3.167l2.113-3.901 2.378 3.901h3.22l-3.558-5.513 3.166-5.444H15.65l-1.849 3.456-1.978-3.456H8.637zm-7.2 0v6.957h2.817V6.963H4.433zm0 9.023v6.957h2.817v-6.957H4.433zm7.2 0v6.957h2.817v-6.957h-2.817z" />
                    </svg>
                    ResearchGate
                    <span className="text-[10px] text-slate-500 group-hover:text-slate-950 transition-colors">↗</span>
                  </a>

                  <a
                    href="https://orcid.org/0009-0002-9286-9207"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-[#a6ce39]/40 bg-[#a6ce39]/10 px-3.5 py-1.5 text-xs font-mono font-medium text-slate-200 transition-all hover:border-[#a6ce39] hover:bg-[#a6ce39] hover:text-slate-950 hover:shadow-[0_0_15px_rgba(166,206,57,0.4)]"
                  >
                    <svg className="h-3.5 w-3.5 fill-current text-[#a6ce39] group-hover:text-slate-950 transition-colors" viewBox="0 0 24 24">
                      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 3.872-2.862 3.872-3.722 0-2.016-1.284-3.722-3.872-3.722h-2.297z" />
                    </svg>
                    ORCID
                    <span className="text-[10px] text-slate-500 group-hover:text-slate-950 transition-colors">↗</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.35fr]">
              <div>
                <h4 className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#0e9954]">Investigate</h4>
                <ul className="space-y-2.5 text-sm text-slate-400">
                  <li><a href="/aircraft/concorde" className="transition-colors hover:text-white">Concorde airframe</a></li>
                  <li><a href="/questions/why-delta-wing" className="transition-colors hover:text-white">Why the delta wing?</a></li>
                  <li><a href="/concepts/supersonic-aerodynamics" className="transition-colors hover:text-white">Supersonic aerodynamics</a></li>
                  <li><a href="/methodology" className="transition-colors hover:text-white">Methodology & trust</a></li>
                  <li><a href="/sources" className="transition-colors hover:text-white">Source library</a></li>
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
                  <li><a href="/about" className="transition-colors hover:text-white">About MechDev.</a></li>
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
