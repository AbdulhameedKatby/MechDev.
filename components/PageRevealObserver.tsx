'use client'

import { useEffect } from 'react'

/**
 * Progressive-enhancement scroll reveal.
 * 1. Immediately adds `will-animate` to every .reveal-section → hides them (opacity:0).
 * 2. IntersectionObserver adds `revealed` when each enters the viewport → CSS animation plays.
 *
 * If this component doesn't mount (SSR, no-JS, old browser) the sections are
 * fully visible because the base `.reveal-section` class carries no opacity rule.
 */
export default function PageRevealObserver() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.reveal-section')
    if (!sections.length) return

    // Skip animation on touch / reduced-motion — keep content immediately visible
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || prefersReduced) return   // leave sections at default opacity:1

    // Opt every section into the animation system (hides them until revealed)
    sections.forEach((el) => el.classList.add('will-animate'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add('revealed')
            observer.unobserve(el)
          }
        })
      },
      {
        threshold: 0.06,           // fire as soon as 6% of the section is visible
        rootMargin: '0px 0px -20px 0px',   // small buffer so it feels natural
      }
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
