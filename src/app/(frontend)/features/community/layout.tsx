import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community — Learning alone was the bug',
  description:
    'Peer support, study groups and first-class mental health support — a community of people on the same climb, beside your AI mentor.',
  alternates: { canonical: '/features/community' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
