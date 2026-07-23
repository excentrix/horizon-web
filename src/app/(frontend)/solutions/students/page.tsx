import type { Metadata } from 'next'
import { SearchLandingPage } from '@/components/seo/SearchLandingPage'
import { horizonContent } from '@/lib/search-content'

export const metadata: Metadata = {
  title: 'For Students — AI mentor and adaptive learning plan',
  description:
    'Horizon gives students a personal AI mentor, daily adaptive learning plan, and verifiable skill portfolio that stands out to employers.',
  alternates: { canonical: '/solutions/students' },
}

export default function Page() {
  return <SearchLandingPage content={horizonContent('students')} />
}
