import Link from 'next/link'
import { ExcentrixWordmark } from './ExcentrixWordmark'

type ExcentrixFooterProps = {
  homeHref?: string
  sectionHrefPrefix?: string
}

function createColumns(sectionHrefPrefix: string) {
  const sectionHref = (hash: string) => `${sectionHrefPrefix}${hash}`

  return [
    {
      title: 'products',
      links: [
        { label: 'VELO', href: 'https://velo.excentrix.tech' },
        { label: 'Horizon', href: 'https://horizon.excentrix.tech' },
        { label: 'Blog', href: '/posts' },
        { label: 'Pilot Lab', href: sectionHref('#pilot') },
      ],
    },
    {
      title: 'velo',
      links: [
        { label: 'For Developers', href: 'https://velo.excentrix.tech/for/developers' },
        { label: 'For Hiring', href: 'https://velo.excentrix.tech/for/hiring' },
        { label: 'For Colleges', href: 'https://velo.excentrix.tech/for/colleges' },
      ],
    },
    {
      title: 'horizon',
      links: [
        { label: 'AI Mentor', href: 'https://horizon.excentrix.tech/features/ai-mentor' },
        {
          label: 'Holistic Grading',
          href: 'https://horizon.excentrix.tech/features/holistic-grading',
        },
        { label: 'Community', href: 'https://horizon.excentrix.tech/features/community' },
        { label: 'Pricing', href: 'https://horizon.excentrix.tech/pricing' },
      ],
    },
    {
      title: 'company',
      links: [
        { label: 'What we build', href: sectionHref('#build') },
        { label: 'Principles', href: sectionHref('#principles') },
        { label: 'Offers', href: sectionHref('#offers') },
        { label: 'Blog', href: '/posts' },
      ],
    },
    {
      title: 'contact',
      links: [
        { label: 'hello@excentrix.tech', href: 'mailto:hello@excentrix.tech' },
        { label: 'Bangalore', href: 'mailto:hello@excentrix.tech?subject=Excentrix%20Bangalore' },
      ],
    },
  ]
}

export function ExcentrixFooter({ homeHref = '/', sectionHrefPrefix = '' }: ExcentrixFooterProps) {
  const columns = createColumns(sectionHrefPrefix)

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-background">
      <div className="container pb-12 pt-16 md:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-7">
          <div className="col-span-2">
            <Link
              href={homeHref}
              className="inline-flex items-center gap-2.5 text-foreground"
              aria-label="Excentrix home"
            >
              <ExcentrixWordmark
                markClassName="size-8 text-energy"
                textClassName="text-2xl text-ink"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Proof-of-work verification, adaptive learning, and evidence systems for the AI era.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="eyebrow mb-4">{col.title}</h3>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-foreground/80 transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Excentrix · Capability made visible.</p>
          <div className="flex gap-6">
            <Link href="/legal/privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link href="/legal/terms" className="transition-colors hover:text-ink">
              Terms
            </Link>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none select-none">
        <p className="font-display -mb-[0.34em] text-center text-[18vw] font-semibold lowercase leading-none tracking-tight text-ink/[0.06]">
          excentrix
        </p>
      </div>
    </footer>
  )
}
