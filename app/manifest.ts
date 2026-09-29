import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MechDev. Aircraft Engineering Archive',
    short_name: 'MechDev.',
    description: 'Aircraft engineering, aerodynamics, flight physics, and interactive labs.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030112',
    theme_color: '#05021a',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}