import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-xs font-mono uppercase tracking-wider text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/" className="hover:text-emerald-300">MechDev.</Link></li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true" className="text-slate-700">/</span>
            {item.href ? <Link href={item.href} className="hover:text-emerald-300">{item.label}</Link> : <span className="text-slate-300">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
