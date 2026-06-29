import { NextRequest, NextResponse } from 'next/server'

/**
 * Host-based routing — one deployment serves two products:
 *
 *   excentrix.tech          → VELO   (internal /velo route group)
 *   horizon.excentrix.tech  → Horizon (existing (frontend) site at /)
 *
 * VELO lives at the internal path /velo. On the apex host we rewrite the
 * landing ("/") to /velo so VELO is what visitors see at the root domain.
 * Horizon keeps the root path on its subdomain.
 *
 * Local preview:
 *   localhost:3000          → VELO
 *   horizon.localhost:3000  → Horizon
 */

const HORIZON_HOSTS = new Set(['horizon.excentrix.tech', 'horizon.localhost'])

// Paths that must never be host-rewritten (Payload, APIs, assets, sitemaps).
const PASSTHROUGH = ['/api', '/admin', '/_next', '/next', '/velo', '/favicon', '/sitemap', '/robots']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const host = (req.headers.get('host') ?? '').split(':')[0].toLowerCase()

  if (PASSTHROUGH.some((p) => pathname.startsWith(p)) || pathname.includes('.')) {
    return NextResponse.next()
  }

  const isHorizonHost = HORIZON_HOSTS.has(host) || host.startsWith('horizon.')

  // Apex/VELO host: VELO owns the whole namespace. Map clean URLs onto the
  // internal /velo route group so visitors see excentrix.tech/for/developers
  // while files live under (velo)/velo/for/developers.
  if (!isHorizonHost && !pathname.startsWith('/velo')) {
    const url = req.nextUrl.clone()
    url.pathname = pathname === '/' ? '/velo' : `/velo${pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  // Run on page routes only; skip static + Payload internals.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
