import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { FlowstateWordmark } from './FlowstateWordmark'
import { FlowstatePilotDialog } from './FlowstatePilotDialog'

const nav = [
  { label: 'Product', href: '#surfaces' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export function FlowstateHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" aria-label="Flowstate home" className="group text-foreground">
          <FlowstateWordmark
            markClassName="text-energy transition-transform duration-500 group-hover:-translate-y-0.5"
            bylineClassName="hidden sm:inline"
          />
        </Link>

        <nav className="flex items-center gap-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden font-mono text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:text-ink lg:inline"
            >
              {item.label}
            </a>
          ))}
          <FlowstatePilotDialog>
            <button type="button" className="btn-primary btn-md">
              Request pilot
              <ArrowUpRight className="size-4" />
            </button>
          </FlowstatePilotDialog>
        </nav>
      </div>
    </header>
  )
}
