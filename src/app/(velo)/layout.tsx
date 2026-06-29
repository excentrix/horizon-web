import type { Metadata } from 'next'
import React from 'react'
import { GeistMono } from 'geist/font/mono'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

import { cn } from '@/utilities/ui'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { getServerSideURL } from '@/utilities/getURL'
import { VeloHeader } from '@/components/velo/VeloHeader'
import { VeloFooter } from '@/components/velo/VeloFooter'

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

export default function VeloLayout({ children }: { children: React.ReactNode }) {
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
          <VeloHeader />
          {children}
          <VeloFooter />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
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
