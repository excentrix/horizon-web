import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Holistic Grading — Evidence, not averages',
  description:
    'Continuous, multi-dimensional evaluation: a brain map of what you know and AI-verified artifacts that prove what you can do. A grade that finally means something.',
  alternates: { canonical: '/features/holistic-grading' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
