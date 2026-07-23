import { SearchLandingPage } from '@/components/seo/SearchLandingPage'
import { horizonContent } from '@/lib/search-content'
import { productMetadata } from '@/lib/seo'

const content = horizonContent('ai-grading')

export const metadata = productMetadata('horizon', {
  title: 'AI grading with evidence, growth, and verified artifacts',
  description:
    'Horizon evaluates understanding, growth, and real work through continuous AI-assisted grading and verifiable skill evidence.',
  path: '/ai-grading',
  keywords: ['AI grading platform', 'holistic grading', 'continuous assessment AI'],
})

export default function Page() {
  return <SearchLandingPage content={content} />
}
