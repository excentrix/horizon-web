import Link from 'next/link'
import { ExcentrixWordmark } from './ExcentrixWordmark'

export function ExcentrixFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
        <ExcentrixWordmark markClassName="size-6 text-energy" textClassName="text-lg text-ink" />

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-xs text-muted-foreground">
          <a href="https://velo.excentrix.tech" className="transition-colors hover:text-ink">
            VELO
          </a>
          <a href="https://horizon.excentrix.tech" className="transition-colors hover:text-ink">
            Horizon
          </a>
          <a href="mailto:hello@excentrix.tech" className="transition-colors hover:text-ink">
            Contact
          </a>
          <Link href="/legal/privacy" className="transition-colors hover:text-ink">
            Privacy
          </Link>
        </nav>

        <p className="font-mono text-[10px] tracking-wide text-muted-foreground">
          © {new Date().getFullYear()} Excentrix · Bangalore
        </p>
      </div>
    </footer>
  )
}
