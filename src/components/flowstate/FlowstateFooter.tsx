import Link from 'next/link'
import { FlowstateWordmark } from './FlowstateWordmark'
import { FlowstatePilotDialog } from './FlowstatePilotDialog'

const columns = [
  {
    title: 'products',
    links: [
      { label: 'Excentrix', href: 'https://all.excentrix.tech' },
      { label: 'VELO', href: 'https://excentrix.tech' },
      { label: 'Horizon', href: 'https://horizon.excentrix.tech' },
      { label: 'Colcord', href: 'https://colcord.excentrix.tech' },
      { label: 'Blog', href: 'https://all.excentrix.tech/posts' },
    ],
  },
  {
    title: 'flowstate',
    links: [
      { label: 'Studio', href: '#surfaces' },
      { label: 'Educator Software', href: '/presentation-software-for-educators' },
      { label: 'Stage', href: '#surfaces' },
      { label: 'Remote', href: '#surfaces' },
      { label: 'Classroom', href: '#surfaces' },
    ],
  },
  {
    title: 'company',
    links: [
      { label: 'What we build', href: 'https://all.excentrix.tech/#build' },
      { label: 'Principles', href: 'https://all.excentrix.tech/#principles' },
      { label: 'Offers', href: 'https://all.excentrix.tech/#offers' },
      { label: 'Pilot Lab', href: 'https://all.excentrix.tech/#pilot' },
      { label: 'AI Education', href: 'https://all.excentrix.tech/ai-education-infrastructure' },
    ],
  },
  {
    title: 'app',
    links: [
      { label: 'Request Pilot', href: '#pilot', dialog: true },
      {
        label: 'Institutional',
        href: '#pilot',
        dialog: true,
        defaultInterest: 'Flowstate institutional pilot',
      },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'contact',
    links: [
      { label: 'hello@excentrix.tech', href: 'mailto:hello@excentrix.tech' },
      { label: 'Bangalore', href: 'mailto:hello@excentrix.tech?subject=Flowstate%20Bangalore' },
    ],
  },
]

export function FlowstateFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-background">
      <div className="container pb-12 pt-16 md:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-7">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Flowstate home">
              <FlowstateWordmark
                markClassName="size-8 text-energy"
                textClassName="text-2xl text-ink"
                bylineClassName="text-muted-foreground"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Live presentation software for educators, trainers, and teams. Built by Excentrix in
              Bangalore.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="eyebrow mb-4">{col.title}</h3>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    {link.dialog ? (
                      <FlowstatePilotDialog defaultInterest={link.defaultInterest}>
                        <button
                          type="button"
                          className="text-left text-foreground/80 transition-colors hover:text-ink"
                        >
                          {link.label}
                        </button>
                      </FlowstatePilotDialog>
                    ) : (
                      <a
                        href={link.href}
                        className="text-foreground/80 transition-colors hover:text-ink"
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

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Excentrix · Bangalore. Presentations with live signal.</p>
          <div className="flex gap-6">
            <a
              href="https://all.excentrix.tech/legal/privacy"
              className="transition-colors hover:text-ink"
            >
              Privacy
            </a>
            <a
              href="https://all.excentrix.tech/legal/terms"
              className="transition-colors hover:text-ink"
            >
              Terms
            </a>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none select-none">
        <p className="font-display -mb-[0.34em] text-center text-[17vw] font-semibold lowercase leading-none tracking-tight text-ink/[0.06]">
          flowstate
        </p>
      </div>
    </footer>
  )
}
