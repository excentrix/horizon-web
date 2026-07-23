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
import { FlowstateHeader } from '@/components/flowstate/FlowstateHeader'
import { FlowstateFooter } from '@/components/flowstate/FlowstateFooter'
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

export default async function FlowstateLayout({ children }: { children: React.ReactNode }) {
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
        <JsonLd id="flowstate-entity-json-ld" data={productGraph('flowstate')} />
      </head>
      <body>
        <Providers>
          <FlowstateHeader />
          {children}
          <FlowstateFooter />
        </Providers>
        <Analytics />
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigins.flowstate),
  title: {
    default: 'Flowstate — Build the deck. Run the room.',
    template: '%s · Flowstate',
  },
  description:
    'Flowstate connects deck authoring, presenter control, phone remote, classroom Q&A, and post-session insight in one real-time presentation OS. Built by Excentrix.',
  keywords: [
    'Flowstate',
    'presentation software',
    'live presentation OS',
    'classroom engagement',
    'phone remote',
    'slide Q&A',
    'Excentrix',
  ],
  openGraph: {
    title: 'Flowstate — Build the deck. Run the room.',
    description:
      'The live presentation OS for educators, trainers, and teams. Built by Excentrix in Bangalore.',
    type: 'website',
  },
}
