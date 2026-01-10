import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Setting } from '@/payload-types'

import "./globals.css"
import { getServerSideURL } from '@/utilities/getURL'

import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const settings = (await getCachedGlobal('settings', 1)()) as Setting

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Excentrix',
    url: getServerSideURL(),
    logo: `${getServerSideURL()}/logo.png`, // Update with actual logo path
    sameAs: [
      'https://twitter.com/excentrix',
      'https://linkedin.com/company/excentrix',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-0000000000', // Update with actual
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: 'en',
    },
  }

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
        {settings?.analytics?.googleAnalyticsId && (
          <GoogleAnalytics gaId={settings.analytics.googleAnalyticsId} />
        )}
        <Analytics />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@excentrix',
  },
}
