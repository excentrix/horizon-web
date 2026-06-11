import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Mentor — Office hours that never end',
  description:
    'Horizon’s AI mentor remembers every conversation, knows what you’ve mastered, and routes academic, career and wellness questions to the right persona — 24/7, zero judgment.',
  alternates: { canonical: '/features/ai-mentor' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
