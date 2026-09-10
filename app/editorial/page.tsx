import Link from 'next/link'

const sourceLevels = [
  {
    score: '★★★★★',
    title: 'Official, regulatory, or peer-reviewed technical evidence',
    detail: 'NASA reports, government certification records, and peer-reviewed technical papers are given the strongest starting position when they directly support the claim.',
  },
  {
    score: '★★★★☆',
    title: 'Primary manufacturer or operator documentation',
    detail: 'Design manuals, operating data, and manufacturer specifications are valuable primary records. They may also reflect a commercial or program perspective.',
  },
  {
    score: '★★★☆☆',
    title: 'Technical interpretation',
    detail: 'Technical histories and specialist commentary can explain context, but important numbers should be checked against primary evidence.',
  },
  {
    score: '★★☆☆☆ / ★☆☆☆☆',
    title: 'Secondary or informal interpretation',
    detail: 'News, blogs, and unsourced summaries can help locate a topic but are not treated as sufficient support for a central engineering claim.',
  },
]

export default function EditorialIndex() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      <header className="space-y-4">
        <Link href="/" className="text-xs font-mono text-emerald-400 hover:underline">
          ← Back to MechDev.
        </Link>
        <div className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-mono font-bold">
          Editorial // Methodology & Trust
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif">
          How MechDev. builds an engineering explanation
        </h1>
        <p className="max-w-3xl text-slate-300 leading-relaxed">
          MechDev. separates what a source says from what a calculation derives. Every evidence-linked claim opens its source record, provenance, and known context so readers can inspect the reasoning instead of accepting a polished conclusion on trust.
        </p>
      </header>

      <section className="rounded-2xl border border-emerald-500/30 bg-[#07170f] p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-white font-serif">What “verified” means here</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          “Verified” currently means that a claim has been connected to a named source record and checked for consistency with the surrounding explanation. It does not mean that MechDev. has independently repeated a flight test or that an external expert has approved every page.
        </p>
        <p className="text-sm text-amber-200/80 leading-relaxed">
          Independent expert attribution, statistical uncertainty intervals, and a public correction history are planned systems. They are intentionally not presented as complete until the underlying records exist.
        </p>
      </section>

      <section className="space-y-5">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500 font-mono">Evidence hierarchy</div>
          <h2 className="text-2xl font-bold text-white font-serif mt-1">A source score is a reading aid, not a truth machine</h2>
        </div>
        <div className="grid gap-3">
          {sourceLevels.map((level) => (
            <div key={level.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-amber-300 font-mono tracking-widest">{level.score}</span>
                <h3 className="font-semibold text-white">{level.title}</h3>
              </div>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{level.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-[#07032a] p-5">
          <h3 className="font-semibold text-white">Discover</h3>
          <p className="mt-2 text-sm text-slate-400">Start with an intuitive physical explanation and a real aircraft example.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#07032a] p-5">
          <h3 className="font-semibold text-white">Understand</h3>
          <p className="mt-2 text-sm text-slate-400">Follow the governing equation, assumptions, and design trade-off.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#07032a] p-5">
          <h3 className="font-semibold text-white">Investigate</h3>
          <p className="mt-2 text-sm text-slate-400">Open the evidence panel, inspect the source record, and reproduce the lab calculation.</p>
        </div>
      </section>

      <section className="border-t border-white/10 pt-6 text-sm text-slate-400 leading-relaxed">
        <h2 className="text-xl font-bold text-white font-serif">Corrections and limitations</h2>
        <p className="mt-2">Aircraft performance varies by variant, configuration, atmospheric condition, payload, and measurement method. Pages should state those conditions where they are known. Corrections will be added to a public history as the content versioning system is developed.</p>
        <Link href="/aircraft" className="inline-flex mt-4 text-emerald-400 hover:text-emerald-300 font-semibold">
          Browse the aircraft archive →
        </Link>
      </section>
    </div>
  )
}
