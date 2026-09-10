import React from 'react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero-wrap">
      <div className="hero-left">
        <h2 style={{fontSize:'clamp(2rem,4.2vw,3.2rem)'}} className="font-extrabold">Explore the engineering art of flight</h2>
        <p className="hero-sub">Investigations, interactive labs, and deep technical profiles—crafted for curious engineers.</p>
        <div className="hero-cta">
          <Link href="/aircraft" className="btn btn-primary">Explore Aircraft</Link>
          <Link href="/lab" className="btn btn-ghost" style={{marginLeft:12}}>Open Labs</Link>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-visual" aria-hidden>
          <svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="rgba(45,191,111,0.9)" />
                <stop offset="100%" stopColor="rgba(27,139,88,0.6)" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="#07110b" />
            <g transform="translate(20,40) scale(0.9)" fill="url(#g1)">
              <path d="M0 80 C120 20 240 10 360 60 C420 88 520 120 560 110 L540 100 C420 90 360 60 240 60 C150 60 80 70 20 100 Z" opacity="0.95"/>
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
