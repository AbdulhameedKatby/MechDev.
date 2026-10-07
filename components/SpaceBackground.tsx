import React from 'react'

export default function SpaceBackground() {
  return (
    <div className="space-background" aria-hidden="true">
      <div className="space-background__stars space-background__stars--near" />
      <div className="space-background__stars space-background__stars--far" />
      <div className="space-background__nebula" />
      <div className="space-background__orbit">
        <div className="space-background__moon" />
      </div>
      <div className="space-background__scanline" />
    </div>
  )
}
