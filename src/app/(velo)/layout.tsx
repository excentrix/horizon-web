import type { Metadata } from 'next'
import React from 'react'
import { GeistMono } from 'geist/font/mono'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Setting } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { VeloHeader } from '@/components/velo/VeloHeader'
import { VeloFooter } from '@/components/velo/VeloFooter'
import { JsonLd } from '@/components/seo/JsonLd'
import { productGraph, siteOrigins } from '@/lib/seo'

// Reuse the Horizon design system (tokens, utilities) from the same stylesheet.
import '../(frontend)/globals.css'

const displayFont = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const bodyFont = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export default async function VeloLayout({ children }: { children: React.ReactNode }) {
  const settings = (await getCachedGlobal('settings', 1)()) as Setting
  const gaId = settings.analytics?.googleAnalyticsId
  const gtmId = settings.analytics?.googleTagManagerId

  return (
    <html
      className={cn(displayFont.variable, bodyFont.variable, GeistMono.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <JsonLd id="velo-entity-json-ld" data={productGraph('velo')} />
      </head>
      <body>
        <Providers>
          <VeloHeader />
          {children}
          <VeloFooter />
        </Providers>
        <Analytics />
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigins.velo),
  title: {
    default: 'VELO — Proof of work, not promises',
    template: '%s · VELO',
  },
  description:
    'Anyone can generate a project in 2026. VELO verifies whether you can actually defend it — an adaptive AI interrogation of your own code that produces a verifiable proof-of-work credential. Built for developers, hiring teams and colleges.',
  keywords: [
    'proof of work',
    'developer verification',
    'AI resume screening',
    'code interrogation',
    'technical hiring',
    'skill verification',
    'AI-padded resumes',
  ],
  openGraph: {
    title: 'VELO — Proof of work, not promises',
    description:
      'AI made output worthless as a signal. VELO verifies whether a developer can defend their own work — and turns it into a credential you can share.',
    type: 'website',
  },
}
