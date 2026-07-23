import type { Metadata } from 'next'
import { SearchLandingPage } from '@/components/seo/SearchLandingPage'
import { horizonContent } from '@/lib/search-content'

export const metadata: Metadata = {
  title: 'For Institutions — cohort-scale AI mentorship',
  description:
    'Horizon gives institutions cohort-level AI mentorship with measurable learning outcomes, retention signals, and verified skill portfolios.',
  alternates: { canonical: '/solutions/institutions' },
}

export default function Page() {
  return <SearchLandingPage content={horizonContent('institutions')} />
}
