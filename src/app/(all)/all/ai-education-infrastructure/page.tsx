import { SearchLandingPage } from '@/components/seo/SearchLandingPage'
import { excentrixContent } from '@/lib/search-content'
import { productMetadata } from '@/lib/seo'

const content = excentrixContent('ai-education-infrastructure')

export const metadata = productMetadata('excentrix', {
  title: 'AI education infrastructure for learning and work',
  description:
    'Excentrix builds AI education infrastructure across mentorship, verification, presentation intelligence, and university operations.',
  path: '/ai-education-infrastructure',
  keywords: ['AI education infrastructure', 'education AI products', 'AI learning infrastructure'],
})

export default function Page() {
  return <SearchLandingPage content={content} />
}
