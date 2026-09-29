import type { MetadataRoute } from 'next'
import { aircraftList } from '../content/aircraftRegistry'
import { siteUrl } from '../lib/site'

const concepts = ['aeroelasticity', 'boundary-layer', 'fly-by-wire', 'propulsion-thermo', 'structural-scaling', 'supersonic-aerodynamics', 'vtol-mechanics']
const labs = ['altitude-density', 'aspect-ratio', 'bypass-ratio', 'drag', 'fuel-transfer', 'kinetic-heating', 'lift', 'mach-number', 'structural-stress', 'thrust-to-weight', 'thrust-vectoring', 'wing-loading', 'wing-sweep']
const questions = ['a350-efficiency', 'boeing-747', 'cessna-172', 'f16-falcon', 'f35b-hover', 'harrier-vtol', 'sr71-blackbird', 'why-delta-wing', 'x59-nose']

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '', '/aircraft', '/concepts', '/editorial', '/methodology', '/sources', '/about', '/lab', '/questions',
    ...aircraftList.map(({ slug }) => `/aircraft/${slug}`),
    ...concepts.map((slug) => `/concepts/${slug}`),
    ...labs.map((slug) => `/lab/${slug}`),
    ...questions.map((slug) => `/questions/${slug}`),
  ]

  return routes.map((route, index) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : route.split('/').length === 2 ? 0.8 : 0.6,
  }))
}