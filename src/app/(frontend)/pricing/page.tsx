import type { Metadata } from 'next'
import { ComingSoon } from '@/components/marketing/ComingSoon'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Horizon pricing — free for students at launch. Join the waitlist for early access; professional and institutional plans announced soon.',
  alternates: { canonical: '/pricing' },
}

export default function Page() {
  return (
    <ComingSoon
      eyebrow="pricing"
      title="Free for students at launch."
      description="Waitlist members get early access first. Professional and institutional pricing will be announced closer to general availability."
    />
  )
}
