"use client"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

export default function NavigationLoader() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [width, setWidth] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const widthRef = useRef(0)
  const prevPath = useRef(pathname)

  // When pathname changes → complete the bar
  useEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname
    complete()
  }, [pathname])

  // Listen for link clicks → start the bar
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a")
      if (!target) return
      const href = target.getAttribute("href")
      if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto")) return
      // Only internal same-origin links
      start()
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  function start() {
    // Reset any previous animation
    if (timerRef.current) clearTimeout(timerRef.current)
    setFading(false)
    setVisible(true)
    widthRef.current = 0
    setWidth(0)

    // Quickly jump to 30%, then crawl to 85%
    requestAnimationFrame(() => {
      setWidth(30)
      timerRef.current = setTimeout(() => setWidth(55), 200)
      timerRef.current = setTimeout(() => setWidth(75), 600)
      timerRef.current = setTimeout(() => setWidth(85), 1200)
    })
  }

  function complete() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setWidth(100)
    timerRef.current = setTimeout(() => {
      setFading(true)
      timerRef.current = setTimeout(() => {
        setVisible(false)
        setWidth(0)
        setFading(false)
      }, 300)
    }, 200)
  }

  if (!visible) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none"
      style={{ opacity: fading ? 0 : 1, transition: "opacity 300ms ease" }}
    >
      {/* Main bar */}
      <div
        className="h-full bg-gradient-to-r from-[#0e9954] via-[#34d399] to-[#0e9954]"
        style={{
          width: `${width}%`,
          transition: width === 0 ? "none" : width === 100 ? "width 200ms ease-out" : "width 400ms cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "0 0 12px rgba(14,153,84,0.9), 0 0 4px rgba(52,211,153,0.6)",
        }}
      />
      {/* Glowing tip */}
      {width > 0 && width < 100 && (
        <div
          className="absolute top-0 h-[3px] w-24 bg-gradient-to-r from-transparent to-white/40"
          style={{ left: `calc(${width}% - 6rem)` }}
        />
      )}
    </div>
  )
}
