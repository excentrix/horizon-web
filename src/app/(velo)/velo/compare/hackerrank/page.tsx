import { SearchLandingPage } from '@/components/seo/SearchLandingPage'
import { productMetadata } from '@/lib/seo'
import { veloComparisonContent } from '@/lib/search-content'

const content = veloComparisonContent('hackerrank')

export const metadata = productMetadata('velo', {
  title: 'VELO vs HackerRank',
  description:
    'Compare VELO proof-of-work verification with HackerRank-style coding assessments for project-heavy technical hiring.',
  path: '/compare/hackerrank',
  keywords: ['VELO vs HackerRank', 'HackerRank alternative', 'project-based technical hiring'],
})

export default function Page() {
  return <SearchLandingPage content={content} />
}
