import type { Metadata } from 'next'
import { ComingSoon } from '@/components/marketing/ComingSoon'

export const metadata: Metadata = {
  title: 'For Students',
  description: 'Horizon gives students a personal AI mentor, a daily adaptive learning plan and a verifiable skill portfolio that stands out to employers.',
  alternates: { canonical: '/solutions/students' },
}

export default function Page() {
  return (
    <ComingSoon
      eyebrow="for students"
      title="Your edge over every other graduate."
      description="A structured, personalised path to the skills your target industry values — with verified proof you built them. Full details are landing here soon."
    />
  )
}
