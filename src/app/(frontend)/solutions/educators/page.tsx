import type { Metadata } from 'next'
import { SearchLandingPage } from '@/components/seo/SearchLandingPage'
import { horizonContent } from '@/lib/search-content'

export const metadata: Metadata = {
  title: 'For Educators — AI mentorship at classroom scale',
  description:
    'Horizon helps educators scale personal mentorship with adaptive plans, holistic evaluation, and early-warning signals for every student.',
  alternates: { canonical: '/solutions/educators' },
}

export default function Page() {
  return <SearchLandingPage content={horizonContent('educators')} />
}
