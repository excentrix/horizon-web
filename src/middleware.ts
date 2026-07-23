import { NextRequest, NextResponse } from 'next/server'

/**
 * Host-based routing — one deployment serves two products:
 *
 *   excentrix.tech          → Excentrix (internal /all route group)
 *   velo.excentrix.tech     → VELO      (internal /velo route group)
 *   flowstate.excentrix.tech → Flowstate (internal /flowstate route group)
 *   colcord.excentrix.tech  → Colcord   (internal /colcord route group)
 *   horizon.excentrix.tech  → Horizon   (existing (frontend) site at /)
 *
 * Excentrix lives at the internal path /all so the apex can become the
 * company landing page while VELO keeps the existing route group on its own
 * subdomain. Horizon keeps the root path on its subdomain.
 *
 * Local preview:
 *   localhost:3000          → Excentrix
 *   127.0.0.1:3000          → Excentrix
 *   velo.localhost:3000     → VELO
 *   flowstate.localhost:3000 → Flowstate
 *   colcord.localhost:3000  → Colcord
 *   horizon.localhost:3000  → Horizon
 *   all.localhost:3000      → Excentrix
 */

const HORIZON_HOSTS = new Set(['horizon.excentrix.tech', 'horizon.localhost'])
const VELO_HOSTS = new Set(['velo.excentrix.tech', 'velo.localhost'])
const FLOWSTATE_HOSTS = new Set(['flowstate.excentrix.tech', 'flowstate.localhost'])
const COLCORD_HOSTS = new Set(['colcord.excentrix.tech', 'colcord.localhost'])
const EXCENTRIX_HOSTS = new Set([
  'excentrix.tech',
  'www.excentrix.tech',
  'all.excentrix.tech',
  'localhost',
  '127.0.0.1',
  'all.localhost',
])

// Paths that must never be host-rewritten (Payload, APIs, assets, sitemaps).
const PASSTHROUGH = [
  '/api',
  '/admin',
  '/_next',
  '/next',
  '/all',
  '/velo',
  '/flowstate',
  '/colcord',
  '/favicon',
  '/legal',
  '/posts',
  '/sitemap',
  '/robots',
]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const host = (req.headers.get('host') ?? '').split(':')[0].toLowerCase()

  if (PASSTHROUGH.some((p) => pathname.startsWith(p)) || pathname.includes('.')) {
    return NextResponse.next()
  }

  const isHorizonHost = HORIZON_HOSTS.has(host) || host.startsWith('horizon.')
  const isVeloHost = VELO_HOSTS.has(host) || host.startsWith('velo.')
  const isFlowstateHost = FLOWSTATE_HOSTS.has(host) || host.startsWith('flowstate.')
  const isColcordHost = COLCORD_HOSTS.has(host) || host.startsWith('colcord.')
  const isExcentrixHost = EXCENTRIX_HOSTS.has(host) || host.startsWith('all.')

  if (isHorizonHost) {
    return NextResponse.next()
  }

  if (isExcentrixHost && !pathname.startsWith('/all')) {
    const url = req.nextUrl.clone()
    url.pathname = pathname === '/' ? '/all' : `/all${pathname}`
    return NextResponse.rewrite(url)
  }

  if (isFlowstateHost && !pathname.startsWith('/flowstate')) {
    const url = req.nextUrl.clone()
    url.pathname = pathname === '/' ? '/flowstate' : `/flowstate${pathname}`
    return NextResponse.rewrite(url)
  }

  if (isColcordHost && !pathname.startsWith('/colcord')) {
    const url = req.nextUrl.clone()
    url.pathname = pathname === '/' ? '/colcord' : `/colcord${pathname}`
    return NextResponse.rewrite(url)
  }

  // VELO host: VELO owns the whole namespace. Map clean URLs onto the
  // internal /velo route group so visitors see velo.excentrix.tech/for/developers
  // while files live under (velo)/velo/for/developers.
  if (isVeloHost && !pathname.startsWith('/velo')) {
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
