import { SearchLandingPage } from '@/components/seo/SearchLandingPage'
import { horizonContent } from '@/lib/search-content'
import { productMetadata } from '@/lib/seo'

const content = horizonContent('adaptive-learning')

export const metadata = productMetadata('horizon', {
  title: 'Adaptive learning plans powered by an AI mentor',
  description:
    'Horizon creates adaptive learning plans that change with each learner’s goals, gaps, schedule, pace, and evidence.',
  path: '/adaptive-learning',
  keywords: ['adaptive learning platform', 'adaptive learning plan', 'AI learning roadmap'],
})

export default function Page() {
  return <SearchLandingPage content={content} />
}
