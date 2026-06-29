/**
 * Shared VELO navigation + deep links.
 *
 * Marketing pages use clean apex URLs ("/for/developers"); host middleware
 * rewrites them onto the internal /velo route group. The product app (where
 * the live verification flow runs) lives on a separate origin.
 */

// Product app origin — set NEXT_PUBLIC_APP_URL in env (e.g. https://app.excentrix.tech).
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.excentrix.tech'

// Deep link into the live "verify a project" experience in the product app.
export const VERIFY_URL = `${APP_URL.replace(/\/$/, '')}/verify`

export const veloNav = [
  { href: '/for/developers', label: 'For developers' },
  { href: '/for/hiring', label: 'For hiring teams' },
  { href: '/for/colleges', label: 'For colleges' },
  { href: '/#how', label: 'How it works' },
] as const
