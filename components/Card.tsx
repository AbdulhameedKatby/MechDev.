import React from 'react'

export default function Card({ children, className = '', media }: { children: React.ReactNode, className?: string, media?: React.ReactNode }) {
  return (
    <div className={`card ${className}`}>
      {media ? <div className="card-media">{media}</div> : null}
      {children}
    </div>
  )
}
