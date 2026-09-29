"use client"
import React from "react"
import Image from "next/image"

export default function EngineerBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#0a66c2]/40 bg-gradient-to-r from-[#050b1a] via-[#07132b] to-[#040118] p-8 sm:p-12 shadow-[0_0_50px_rgba(10,102,194,0.15)] ring-1 ring-white/10">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#0a66c2]/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-[#0e9954]/10 blur-3xl" />

      {/* Grid Pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left column: Avatar + Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar with glowing ring */}
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-full border-2 border-[#0a66c2] shadow-[0_0_25px_rgba(10,102,194,0.6)] bg-[#07032a]">
            <Image
              src="/assets/logo.png"
              alt="Abdulhameed Katby"
              fill
              className="object-cover object-top"
            />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0a66c2]/40 bg-[#0a66c2]/20 px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#7ab8f5]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4da3e8] animate-pulse" />
                Featured Engineer Profile
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono text-slate-400">
                Aerospace & Mechanics
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">
              Abdulhameed Katby
            </h2>

            <p className="max-w-lg text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Mechanical & Aerospace engineering research, flight mechanics modeling, and structural physics investigations.
            </p>
          </div>
        </div>

        {/* Right column: Primary LinkedIn CTA Banner + Academic Links */}
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 shrink-0">
          {/* Main LinkedIn Button */}
          <a
            href="https://www.linkedin.com/in/abdulhameedkatby/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-[#0a66c2] hover:bg-[#08519c] px-6 py-4 text-sm font-bold font-brand text-white transition-all duration-200 shadow-[0_0_30px_rgba(10,102,194,0.5)] hover:shadow-[0_0_40px_rgba(10,102,194,0.8)] hover:scale-[1.02]"
          >
            <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69 1.69 1.69 0 0 0-1.69 1.69m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
            <span>Connect on LinkedIn</span>
            <span className="text-xs transition-transform duration-200 group-hover:translate-x-1">↗</span>
          </a>

          {/* Academic Profiles Sub-Buttons */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.researchgate.net/profile/Abdulhamid-Katbi"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-2xl border border-[#00d0af]/30 bg-[#00d0af]/10 hover:bg-[#00d0af] px-4 py-3.5 text-xs font-mono font-bold text-white hover:text-slate-950 transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,208,175,0.4)]"
            >
              <svg className="h-4 w-4 fill-current text-[#00d0af] group-hover:text-slate-950 transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.121 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53c.042.162.073.3.113.438.243.743.65 1.303 1.213 1.68.565.375 1.255.564 2.073.564.818 0 1.508-.189 2.073-.564.563-.377.97-.937 1.213-1.68.04-.137.072-.276.113-.438a8.5 8.5 0 0 0 .077-.53 9 9 0 0 0 .05-.727c.01-.282.013-.621.013-1.017 0-.395-.003-.734-.013-1.016a9 9 0 0 0-.05-.727 8.5 8.5 0 0 0-.077-.53 3.193 3.193 0 0 0-.113-.437c-.243-.744-.65-1.303-1.213-1.68C21.094.19 20.404 0 19.586 0zm-7.953 6.963L8.309 13.92h3.167l2.113-3.901 2.378 3.901h3.22l-3.558-5.513 3.166-5.444H15.65l-1.849 3.456-1.978-3.456H8.637zm-7.2 0v6.957h2.817V6.963H4.433zm0 9.023v6.957h2.817v-6.957H4.433zm7.2 0v6.957h2.817v-6.957h-2.817z" />
              </svg>
              <span>ResearchGate</span>
              <span className="text-[10px]">↗</span>
            </a>

            <a
              href="https://orcid.org/0009-0002-9286-9207"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-2xl border border-[#a6ce39]/30 bg-[#a6ce39]/10 hover:bg-[#a6ce39] px-4 py-3.5 text-xs font-mono font-bold text-white hover:text-slate-950 transition-all duration-200 hover:shadow-[0_0_20px_rgba(166,206,57,0.4)]"
            >
              <svg className="h-4 w-4 fill-current text-[#a6ce39] group-hover:text-slate-950 transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 3.872-2.862 3.872-3.722 0-2.016-1.284-3.722-3.872-3.722h-2.297z" />
              </svg>
              <span>ORCID</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
