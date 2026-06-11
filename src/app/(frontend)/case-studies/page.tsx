import type { Metadata } from 'next'
import { ComingSoon } from '@/components/marketing/ComingSoon'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Real outcomes from learners and institutions using Horizon — case studies coming soon.',
  alternates: { canonical: '/case-studies' },
}

export default function Page() {
  return (
    <ComingSoon
      eyebrow="case studies"
      title="Proof, in the wild."
      description="We are documenting real learner and institution outcomes from early access right now. The first case studies land here soon."
    />
  )
}
