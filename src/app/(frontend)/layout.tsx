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
import { getServerSideURL } from '@/utilities/getURL'

import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Setting } from '@/payload-types'

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
  const siteUrl = getServerSideURL()
  const settings = (await getCachedGlobal('settings', 1)()) as Setting
  const gaId = settings.analytics?.googleAnalyticsId
  const gtmId = settings.analytics?.googleTagManagerId

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Horizon',
        alternateName: 'Horizon by Excentrix',
        url: siteUrl,
        logo: `${siteUrl}/favicon/web-app-manifest-512x512.png`,
        description:
          'Horizon is an adaptive AI mentorship platform that builds a living model of each learner and generates a personalized, daily-adapting learning plan with verifiable skill portfolios.',
        sameAs: ['https://twitter.com/excentrix', 'https://linkedin.com/company/excentrix'],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'hello@excentrix.tech',
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: 'en',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Horizon',
        publisher: { '@id': `${siteUrl}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/search?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${siteUrl}/#app`,
        name: 'Horizon',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web',
        url: siteUrl,
        description:
          'An AI mentor that knows your gaps, goals, schedule and pace — and turns them into a daily learning plan that adapts every day. Spaced repetition, diagnostic skips, verified artifact portfolios and domain-specialised mentors in one platform.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR', description: 'Free early access via waitlist' },
        publisher: { '@id': `${siteUrl}/#organization` },
      },
    ],
  }

  return (
    <html
      className={cn(displayFont.variable, bodyFont.variable, GeistMono.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
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
