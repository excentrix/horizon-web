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
import { ColcordHeader } from '@/components/colcord/ColcordHeader'
import { ColcordFooter } from '@/components/colcord/ColcordFooter'
import { JsonLd } from '@/components/seo/JsonLd'
import { productGraph, siteOrigins } from '@/lib/seo'

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

export default async function ColcordLayout({ children }: { children: React.ReactNode }) {
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
        <JsonLd id="colcord-entity-json-ld" data={productGraph('colcord')} />
      </head>
      <body>
        <Providers>
          <ColcordHeader />
          {children}
          <ColcordFooter />
        </Providers>
        <Analytics />
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigins.colcord),
  title: {
    default: 'Colcord — One Platform. One Ecosystem.',
    template: '%s · Colcord',
  },
  description:
    'Colcord is a unified educational ecosystem connecting students, faculty, administrators, alumni, and parents through one digital university platform.',
  keywords: [
    'Colcord',
    'university platform',
    'educational ecosystem',
    'campus software',
    'academic management',
    'student portal',
  ],
  openGraph: {
    title: 'Colcord — One Platform. One Ecosystem.',
    description:
      'A comprehensive digital platform for academic management, communication, campus life, career services, identity, and analytics.',
    type: 'website',
  },
}
