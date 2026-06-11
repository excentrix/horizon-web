import type { Metadata } from 'next'
import Script from 'next/script'

import HomePage from '@/components/ui/landing/Main'
import { faqs } from '@/components/ui/landing/faq-data'
import { getServerSideURL } from '@/utilities/getURL'

export const metadata: Metadata = {
  title: 'Horizon — The AI mentor that knows you',
  description:
    'Human mentors don’t scale. Horizon does. An adaptive AI mentor that builds a living model of how you learn and turns it into a daily plan — with spaced repetition, diagnostic skips and a verified skill portfolio. Join the waitlist.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Horizon — The AI mentor that knows you',
    description:
      'A living learning plan that adapts every day, a mentor for every domain, and proof of skill you can show anyone. Join the waitlist for early access.',
    url: '/',
    type: 'website',
  },
}

export default function Page() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${getServerSideURL()}/#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <Script
        id="faq-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomePage />
    </>
  )
}
