import type { Metadata } from 'next'
import { ComingSoon } from '@/components/marketing/ComingSoon'

export const metadata: Metadata = {
  title: 'Guides',
  description: 'In-depth guides on learning science, spaced repetition, skill portfolios and self-directed learning from the Horizon team.',
  alternates: { canonical: '/resources/guides' },
}

export default function Page() {
  return (
    <ComingSoon
      eyebrow="guides"
      title="Learn how to learn."
      description="Deep, practical guides on learning science, retention and building proof of skill — written by the Horizon team. Coming soon."
    />
  )
}
