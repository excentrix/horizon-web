import type { Metadata } from 'next'
import { ComingSoon } from '@/components/marketing/ComingSoon'

export const metadata: Metadata = {
  title: 'For Institutions',
  description: 'Horizon gives institutions cohort-level AI mentorship with measurable learning outcomes, retention signals and verified skill portfolios.',
  alternates: { canonical: '/solutions/institutions' },
}

export default function Page() {
  return (
    <ComingSoon
      eyebrow="for institutions"
      title="Personal mentorship, at cohort scale."
      description="Give every student a mentor and measure what actually changes — retention, outcomes, demonstrable skills. Full details are landing here soon."
    />
  )
}
