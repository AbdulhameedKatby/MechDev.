import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto py-24 text-center space-y-4">
      <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
        Error 404
      </div>
      <h2 className="text-3xl font-bold font-serif text-white">
        Investigation Not Found
      </h2>
      <p className="text-sm text-slate-400">
        The requested aerospace experiment or aircraft profile does not exist in the archive.
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
        >
          ← Return to AeroLab Home
        </Link>
      </div>
    </div>
  )
}
