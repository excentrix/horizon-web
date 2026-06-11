import type { Metadata } from 'next'
import { ComingSoon } from '@/components/marketing/ComingSoon'

export const metadata: Metadata = {
  title: 'For Educators',
  description: 'Horizon helps educators scale personal mentorship — adaptive plans, holistic evaluation and early-warning signals for every student.',
  alternates: { canonical: '/solutions/educators' },
}

export default function Page() {
  return (
    <ComingSoon
      eyebrow="for educators"
      title="Mentor every student. Not just the loudest."
      description="Tools that extend your reach: adaptive plans, holistic evaluation and signals that surface who needs you most. Full details are landing here soon."
    />
  )
}
