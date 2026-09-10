import type { MetadataRoute } from 'next'

const siteUrl = 'https://abdulhameedkatby.vercel.app'

const aircraft = ['concorde', 'boeing-747', 'cessna-172', 'f16-falcon', 'sr71-blackbird', 'harrier-vtol', 'a350-efficiency', 'x59-nose', 'f35b-hover', 'a380-scale', 'bell-x1', 'comet-failure', 'b2-spirit', 'piper-cub', 'spaceshipone']
const concepts = ['aeroelasticity', 'boundary-layer', 'fly-by-wire', 'propulsion-thermo', 'structural-scaling', 'supersonic-aerodynamics', 'vtol-mechanics']
const labs = ['altitude-density', 'aspect-ratio', 'bypass-ratio', 'drag', 'fuel-transfer', 'kinetic-heating', 'lift', 'mach-number', 'structural-stress', 'thrust-to-weight', 'thrust-vectoring', 'wing-loading', 'wing-sweep']
const questions = ['a350-efficiency', 'boeing-747', 'cessna-172', 'f16-falcon', 'f35b-hover', 'harrier-vtol', 'sr71-blackbird', 'why-delta-wing', 'x59-nose']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes = [
    '', '/aircraft', '/concepts', '/editorial', '/lab', '/questions',
    ...aircraft.map((slug) => `/aircraft/${slug}`),
    ...concepts.map((slug) => `/concepts/${slug}`),
    ...labs.map((slug) => `/lab/${slug}`),
    ...questions.map((slug) => `/questions/${slug}`),
  ]

  return routes.map((route, index) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : route.split('/').length === 2 ? 0.8 : 0.6,
  }))
}