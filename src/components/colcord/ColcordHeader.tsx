import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ColcordWordmark } from './ColcordWordmark'
import { ColcordPilotDialog } from './ColcordPilotDialog'

const nav = [
  { label: 'Modules', href: '#modules' },
  { label: 'People', href: '#people' },
  { label: 'Challenge', href: '#challenge' },
  { label: 'Pilot', href: '#pilot' },
]

export function ColcordHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-cream/10 bg-ink/75 backdrop-blur">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" aria-label="Colcord home" className="text-cream">
          <ColcordWordmark />
        </Link>
        <nav className="flex items-center gap-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden font-mono text-xs uppercase tracking-wide text-cream/60 transition-colors hover:text-cream lg:inline"
            >
              {item.label}
            </a>
          ))}
          <ColcordPilotDialog>
            <button type="button" className="btn-cream btn-md">
              Request pilot
              <ArrowUpRight className="size-4" />
            </button>
          </ColcordPilotDialog>
        </nav>
      </div>
    </header>
  )
}
