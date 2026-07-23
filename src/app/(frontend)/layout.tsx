import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Setting } from '@/payload-types'
import { JsonLd } from '@/components/seo/JsonLd'
import { productGraph, siteOrigins } from '@/lib/seo'

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
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
        <JsonLd id="horizon-entity-json-ld" data={productGraph('horizon')} />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
        <Analytics />
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigins.horizon),
  title: {
    default: 'Horizon — The AI mentor that knows you',
    template: '%s · Horizon',
  },
  description:
    'Horizon builds a living model of how you learn — your gaps, goals, schedule and pace — and turns it into a daily learning plan that adapts every day. Join the waitlist for early access.',
  keywords: [
    'AI mentor',
    'adaptive learning platform',
    'personalized learning plan',
    'AI mentorship',
    'spaced repetition',
    'skill portfolio',
    'learning platform for students',
    'Horizon',
    'Excentrix',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@excentrix',
  },
}
