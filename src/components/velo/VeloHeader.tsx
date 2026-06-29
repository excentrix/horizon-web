import Link from 'next/link'
import { veloNav, VERIFY_URL } from '@/lib/veloLinks'

export function VeloHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="font-display text-xl font-semibold tracking-tight text-ink">VELO</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            by excentrix
          </span>
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
