import Link from 'next/link'
import { VERIFY_URL } from '@/lib/veloLinks'
import { VeloWordmark } from './VeloWordmark'

const columns = [
  {
    title: 'products',
    links: [
      { label: 'Excentrix', href: 'https://excentrix.tech' },
      { label: 'Horizon', href: 'https://horizon.excentrix.tech' },
      { label: 'Flowstate', href: 'https://flowstate.excentrix.tech' },
      { label: 'Colcord', href: 'https://colcord.excentrix.tech' },
      { label: 'Blog', href: '/posts' },
      { label: 'Pilot Lab', href: 'https://excentrix.tech/#pilot' },
    ],
  },
  {
    title: 'velo',
    links: [
      { label: 'For Developers', href: '/for/developers' },
      { label: 'For Hiring', href: '/for/hiring' },
      { label: 'For Colleges', href: '/for/colleges' },
      { label: 'Proof of Work', href: '/use-cases/proof-of-work-verification' },
      { label: 'Project Verification', href: '/use-cases/project-verification' },
      { label: 'How it works', href: '/#how' },
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
      { label: 'What we build', href: 'https://excentrix.tech/#build' },
      {
        label: 'Capability Infrastructure',
        href: 'https://excentrix.tech/capability-infrastructure',
      },
      { label: 'Principles', href: 'https://excentrix.tech/#principles' },
      { label: 'Offers', href: 'https://excentrix.tech/#offers' },
      { label: 'Blog', href: '/posts' },
    ],
  },
  {
    title: 'contact',
    links: [
      { label: 'hello@excentrix.tech', href: 'mailto:hello@excentrix.tech' },
      { label: 'Bangalore', href: 'mailto:hello@excentrix.tech?subject=VELO%20Bangalore' },
    ],
  },
]

export function VeloFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-background">
      <div className="container pb-12 pt-16 md:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-7">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="VELO home">
              <VeloWordmark
                markClassName="size-8 text-energy"
                textClassName="text-2xl text-ink"
                bylineClassName="text-muted-foreground"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Adaptive proof-of-work verification for developers, hiring teams, and colleges.
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
          <p>© {new Date().getFullYear()} Excentrix · Proof of work, not promises.</p>
          <div className="flex gap-6">
            <a href={VERIFY_URL} className="transition-colors hover:text-ink">
              Verify
            </a>
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
        <p className="font-display -mb-[0.34em] text-center text-[18vw] font-semibold uppercase leading-none tracking-tight text-ink/[0.06]">
          VELO
        </p>
      </div>
    </footer>
  )
}
