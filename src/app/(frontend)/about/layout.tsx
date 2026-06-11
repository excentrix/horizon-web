import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Building the most human learning OS on Earth',
  description:
    'Horizon is built by Excentrix on one conviction: every learner deserves a mentor who knows them. Here’s what we believe and why we’re building it.',
  alternates: { canonical: '/about' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
