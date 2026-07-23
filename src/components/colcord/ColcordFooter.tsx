import Link from 'next/link'
import { ColcordWordmark } from './ColcordWordmark'
import { ColcordPilotDialog } from './ColcordPilotDialog'

const columns = [
  {
    title: 'platform',
    links: [
      { label: 'Modules', href: '#modules' },
      { label: 'Campus OS', href: '/campus-operating-system' },
      { label: 'People', href: '#people' },
      { label: 'Challenge', href: '#challenge' },
      { label: 'Pilot', href: '#pilot', dialog: true },
    ],
  },
  {
    title: 'modules',
    links: [
      { label: 'Academic management', href: '#modules' },
      { label: 'Communication hub', href: '#modules' },
      { label: 'Career services', href: '#modules' },
      { label: 'Analytics dashboard', href: '#modules' },
    ],
  },
  {
    title: 'ecosystem',
    links: [
      { label: 'Students', href: '#people' },
      { label: 'Faculty', href: '#people' },
      { label: 'Administration', href: '#people' },
      { label: 'Alumni and parents', href: '#people' },
    ],
  },
  {
    title: 'contact',
    links: [
      { label: 'team@colcord.co.in', href: 'mailto:team@colcord.co.in' },
      { label: 'Request pilot', href: '#pilot', dialog: true },
    ],
  },
]

export function ColcordFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-ink text-cream" data-theme="dark">
      <div className="container pb-12 pt-16 md:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" aria-label="Colcord home" className="inline-flex">
              <ColcordWordmark />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              A unified educational ecosystem for universities in India.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="eyebrow mb-4 text-cream/50">{col.title}</h3>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    {'dialog' in link && link.dialog ? (
                      <ColcordPilotDialog>
                        <button
                          type="button"
                          className="text-left text-cream/75 transition-colors hover:text-cream"
                        >
                          {link.label}
                        </button>
                      </ColcordPilotDialog>
                    ) : (
                      <a
                        href={link.href}
                        className="text-cream/75 transition-colors hover:text-cream"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 text-sm text-cream/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Colcord. One platform for the university ecosystem.</p>
          <div className="flex gap-6">
            <a href="https://excentrix.tech" className="transition-colors hover:text-cream">
              Excentrix
            </a>
            <a
              href="https://excentrix.tech/ai-education-infrastructure"
              className="transition-colors hover:text-cream"
            >
              AI education
            </a>
            <a href="mailto:team@colcord.co.in" className="transition-colors hover:text-cream">
              Contact
            </a>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none select-none">
        <p className="font-display -mb-[0.34em] text-center text-[18vw] font-semibold leading-none tracking-tight text-cream/5">
          Colcord
        </p>
      </div>
    </footer>
  )
}
