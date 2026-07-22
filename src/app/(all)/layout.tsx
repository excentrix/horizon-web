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
import { getServerSideURL } from '@/utilities/getURL'
import { ExcentrixHeader } from '@/components/excentrix/ExcentrixHeader'
import { ExcentrixFooter } from '@/components/excentrix/ExcentrixFooter'

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

export default async function ExcentrixLayout({ children }: { children: React.ReactNode }) {
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
      </head>
      <body>
        <Providers>
          <ExcentrixHeader />
          {children}
          <ExcentrixFooter />
        </Providers>
        <Analytics />
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Excentrix — Capability made visible',
    template: '%s · Excentrix',
  },
  description:
    'Excentrix builds proof-of-work verification, adaptive learning, and evidence systems for the AI era. The company behind VELO and Horizon.',
  keywords: [
    'Excentrix',
    'VELO',
    'Horizon',
    'proof of work',
    'skill verification',
    'adaptive learning',
    'AI education',
    'technical hiring',
  ],
  openGraph: {
    title: 'Excentrix — Capability made visible',
    description:
      'The company behind VELO and Horizon: proof-of-work verification, adaptive learning, and evidence systems for the AI era.',
    type: 'website',
  },
}
