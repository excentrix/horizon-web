import Link from 'next/link'
import { veloNav, VERIFY_URL } from '@/lib/veloLinks'
import { VeloWordmark } from './VeloWordmark'

export function VeloHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" aria-label="VELO — home" className="group text-foreground">
          <VeloWordmark markClassName="text-energy transition-transform duration-500 group-hover:-translate-y-0.5" />
        </Link>

        <nav className="flex items-center gap-6">
          {veloNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden font-mono text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:text-ink lg:inline"
            >
              {item.label}
            </Link>
          ))}
          <a href={VERIFY_URL} className="btn-primary btn-md">
            Verify a project
          </a>
        </nav>
      </div>
    </header>
  )
}
