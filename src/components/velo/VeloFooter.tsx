import Link from 'next/link'
import { VeloWordmark } from './VeloWordmark'

export function VeloFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
        <VeloWordmark markClassName="size-6 text-energy" textClassName="text-lg" />

        <nav className="flex items-center gap-6 font-mono text-xs text-muted-foreground">
          <a href="#how" className="transition-colors hover:text-ink">
            How it works
          </a>
          <a href="#teams" className="transition-colors hover:text-ink">
            For teams
          </a>
          <a
            href="https://horizon.excentrix.tech"
            className="transition-colors hover:text-ink"
          >
            Horizon
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
