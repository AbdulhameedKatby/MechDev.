import Link from 'next/link'

export const metadata = {
  title: 'About MechDev.',
  description: 'Learn why MechDev. exists, how its aircraft investigations are researched, and who built the platform.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8 sm:py-12">
      <header className="max-w-3xl border-b border-white/10 pb-10"><div className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400">About the archive</div><h1 className="mt-3 text-5xl font-bold text-white font-serif sm:text-6xl">MechDev. is an engineering investigation platform.</h1><p className="mt-5 text-lg leading-relaxed text-slate-300">It exists to explain why aircraft look and behave the way they do by connecting questions, aircraft, physics, interactive models, and traceable sources.</p></header>
      <div className="grid gap-5 md:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-[#07032a] p-6"><h2 className="text-2xl font-bold text-white font-serif">How research is done</h2><p className="mt-3 text-sm leading-relaxed text-slate-400">Documented values are separated from interpretation and calculation. Each investigation identifies the source record, states the governing model, and marks assumptions where public information is incomplete.</p></section>
        <section className="rounded-2xl border border-white/10 bg-[#07032a] p-6"><h2 className="text-2xl font-bold text-white font-serif">What is calculated</h2><p className="mt-3 text-sm leading-relaxed text-slate-400">Labs use transparent simplified equations for relationships such as induced drag, stagnation temperature, thrust components, and pressurization stress. Model outputs are not presented as flight-test measurements.</p></section>
      </div>
      <section className="border-y border-white/10 py-8"><div className="max-w-3xl"><div className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400">Built by Abdulhameed Katby</div><h2 className="mt-3 text-3xl font-bold text-white font-serif">A learning project in aerospace engineering.</h2><p className="mt-4 text-sm leading-relaxed text-slate-300">MechDev. is being developed as a research and learning archive focused on aircraft design, flight mechanics, and the evidence behind engineering explanations. The project is intentionally modest: it documents what is known, shows what is derived, and leaves uncertainty visible.</p><div className="mt-6 flex flex-wrap gap-3"><a href="https://www.linkedin.com/in/abdulhameedkatby/" target="_blank" rel="noreferrer" className="rounded-xl bg-[#0a66c2] px-4 py-3 text-xs font-bold text-white">LinkedIn ↗</a><a href="https://orcid.org/0009-0002-9286-9207" target="_blank" rel="noreferrer" className="rounded-xl border border-[#a6ce39]/40 px-4 py-3 text-xs font-bold text-[#d6f18c]">ORCID ↗</a></div></div></section>
      <div className="flex flex-wrap gap-4 text-sm"><Link href="/editorial" className="text-emerald-300 hover:text-white">Read the methodology →</Link><Link href="/sources" className="text-emerald-300 hover:text-white">Browse source records →</Link></div>
    </div>
  )
}
