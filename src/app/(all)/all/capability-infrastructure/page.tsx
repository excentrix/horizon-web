import { SearchLandingPage } from '@/components/seo/SearchLandingPage'
import { excentrixContent } from '@/lib/search-content'
import { productMetadata } from '@/lib/seo'

const content = excentrixContent('capability-infrastructure')

export const metadata = productMetadata('excentrix', {
  title: 'Capability infrastructure for education and hiring',
  description:
    'Excentrix turns learning, projects, assessments, and work artifacts into verifiable evidence of capability.',
  path: '/capability-infrastructure',
  keywords: ['capability infrastructure', 'proof of capability', 'skill evidence platform'],
})

export default function Page() {
  return <SearchLandingPage content={content} />
}
