import '../styles/globals.css'
import React from 'react'
import SiteHeader from '../components/SiteHeader'

export const metadata = {
  title: 'MechDev.',
  description: 'MechDev. — discover why aircraft are designed the way they are through physics, interactive labs, and traceable sources.',
  icons: {
    icon: '/icon.svg?v=4',
    shortcut: '/icon.svg?v=4',
    apple: '/icon.svg?v=4',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg?v=4" type="image/svg+xml" />
      </head>
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="container flex-1 pt-24 sm:pt-28 pb-10 sm:pb-12">{children}</main>
        <footer className="border-t border-[#0e9954]/30 bg-[#040118] pt-16 pb-12 text-slate-300 relative overflow-hidden">
          {/* Subtle green ambient glow spot */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-96 h-32 bg-[#0e9954]/10 blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 space-y-12 relative z-10">
            {/* Top Footer Row: Branding & Telemetry Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
              {/* Column 1: Brand & Engineer Profile */}
              <div className="space-y-4 md:col-span-1">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#0e9954] shadow-[0_0_12px_rgba(14,153,84,0.4)]">
                    <img
                      src="/assets/logo.png"
                      alt="Abdulhameed Katby"
                      className="object-cover object-top w-full h-full"
                    />
                  </div>
                  <div>
                    <span className="text-2xl font-bold tracking-tight font-brand text-white block leading-none">
                      <span className="text-[#0e9954] font-black">M</span>ech<span className="text-[#0e9954] font-black">D</span>ev<span className="text-[#0e9954] font-black">.</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">BY ABDULHAMEED KATBY</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  An engineering investigation platform discovering why supersonic aircraft are designed the way they are through physics & wind-tunnel evidence.
                </p>

                {/* Professional LinkedIn Connect Button */}
                <a
                  href="https://www.linkedin.com/in/abdulhameedkatby/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0a66c2]/15 hover:bg-[#0a66c2] border border-[#0a66c2]/40 hover:border-[#0a66c2] text-xs font-semibold text-white transition-all duration-150 shadow-[0_0_15px_rgba(10,102,194,0.2)]"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-[#0a66c2] group-hover:text-white transition-colors" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span className="font-brand text-[11px]">Connect on LinkedIn</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-white transition-colors">↗</span>
                </a>
              </div>

              {/* Column 2: Core Investigations */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#0e9954] font-bold">Investigations</h4>
                <ul className="space-y-2 text-xs font-sans text-slate-300">
                  <li>
                    <a href="/aircraft/concorde" className="hover:text-[#0e9954] transition-colors flex items-center gap-1.5">
                      <span>✈️ Concorde Airframe</span>
                    </a>
                  </li>
                  <li>
                    <a href="/questions/why-delta-wing" className="hover:text-[#0e9954] transition-colors flex items-center gap-1.5">
                      <span>❓ Why Delta Wing?</span>
                    </a>
                  </li>
                  <li>
                    <a href="/concepts/supersonic-aerodynamics" className="hover:text-[#0e9954] transition-colors flex items-center gap-1.5">
                      <span>⚡ Shock Wave Aerodynamics</span>
                    </a>
                  </li>
                  <li>
                    <a href="/editorial" className="hover:text-[#0e9954] transition-colors flex items-center gap-1.5">
                      <span>📖 Editorial Methodology</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: Interactive Workstations */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#0e9954] font-bold">Interactive Labs</h4>
                <ul className="space-y-2 text-xs font-mono text-slate-300">
                  <li>
                    <a href="/lab/aspect-ratio" className="hover:text-[#0e9954] transition-colors">Lab 01: Aspect Ratio</a>
                  </li>
                  <li>
                    <a href="/lab/wing-sweep" className="hover:text-[#0e9954] transition-colors">Lab 02: Wing Sweep Angle</a>
                  </li>
                  <li>
                    <a href="/lab/kinetic-heating" className="hover:text-[#0e9954] transition-colors">Lab 03: Kinetic Stagnation</a>
                  </li>
                  <li>
                    <a href="/lab/fuel-transfer" className="hover:text-[#0e9954] transition-colors">Lab 05: Center of Pressure Trim</a>
                  </li>
                </ul>
              </div>

              {/* Column 4: Archive Metadata */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#0e9954] font-bold">Archive Specs</h4>
                <div className="p-3.5 rounded-2xl bg-[#07032a] border border-[#0e9954]/25 space-y-2 text-[11px] font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>FLAGSHIP:</span>
                    <span className="text-white font-bold">CONCORDE 001</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>CRUISE:</span>
                    <span className="text-[#0e9954]">MACH 2.04</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>SOURCES:</span>
                    <span className="text-slate-200">NASA / BAC / AEROSPATIALE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Copyright & Professional Credit Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <div>
                © {new Date().getFullYear()} <span className="text-white font-brand font-bold"><span className="text-[#0e9954]">M</span>ech<span className="text-[#0e9954]">D</span>ev<span className="text-[#0e9954]">.</span></span> · Designed & Built by{' '}
                <a href="https://www.linkedin.com/in/abdulhameedkatby/" target="_blank" rel="noopener noreferrer" className="group/credit inline-flex items-center gap-1.5 text-slate-200 hover:text-[#0a66c2] transition-colors">
                  <span className="font-semibold">Abdulhameed Katby</span>
                  <svg className="w-3 h-3 fill-current text-slate-500 group-hover/credit:text-[#0a66c2] transition-colors" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
              </div>
              <div className="text-[11px] text-slate-400">
                Verifiable Flight Mechanics & Wind Tunnel Data Archive
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
