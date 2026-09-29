import { aircraftList } from '../../content/aircraftRegistry'
import SourcesLibrary from '../../components/SourcesLibrary'

export const metadata = {
  title: 'Source Library',
  description: 'Search the technical records supporting MechDev. aircraft engineering investigations.',
  alternates: { canonical: '/sources' },
}

const records = aircraftList.flatMap((aircraft) =>
  aircraft.evidence.flatMap((evidence) => evidence.sources.map((source, index) => ({
    id: `${aircraft.slug}-${evidence.id}-${index}`,
    aircraft: aircraft.name,
    aircraftSlug: aircraft.slug,
    claim: evidence.claim,
    ...source,
  }))),
)

export default function SourcesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 sm:py-12">
      <header className="border-b border-white/10 pb-8">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400">Evidence library</div>
        <h1 className="mt-3 text-4xl font-bold text-white font-serif sm:text-6xl">Every important claim has a trail.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">Search the source records connected to aircraft investigations. Provenance describes the record; it does not replace reading the evidence.</p>
      </header>

      <SourcesLibrary records={records} />
    </div>
  )
}
