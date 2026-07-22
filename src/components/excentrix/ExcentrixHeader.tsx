import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ExcentrixWordmark } from './ExcentrixWordmark'

const nav = [
  { label: 'What we build', href: '#build' },
  { label: 'What we stand for', href: '#principles' },
  { label: 'Offers', href: '#offers' },
  { label: 'Blog', href: '/posts' },
]

export function ExcentrixHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" aria-label="Excentrix home" className="group text-cream">
          <ExcentrixWordmark
            markClassName="text-energy transition-transform duration-500 group-hover:-translate-y-0.5"
            textClassName="text-cream"
          />
        </Link>

        <nav className="flex items-center gap-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden font-mono text-xs uppercase tracking-wide text-cream/70 transition-colors hover:text-cream lg:inline"
            >
              {item.label}
            </a>
          ))}
          <a href="#pilot" className="btn-cream btn-md">
            Talk to us
            <ArrowUpRight className="size-4" />
          </a>
        </nav>
      </div>
    </header>
  )
}
