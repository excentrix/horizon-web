import { SearchLandingPage } from '@/components/seo/SearchLandingPage'
import { productMetadata } from '@/lib/seo'
import { veloComparisonContent } from '@/lib/search-content'

const content = veloComparisonContent('codility')

export const metadata = productMetadata('velo', {
  title: 'VELO vs Codility',
  description:
    'Compare VELO proof-of-work verification with Codility-style coding assessments for hiring in the AI era.',
  path: '/compare/codility',
  keywords: ['VELO vs Codility', 'Codility alternative', 'developer verification'],
})

export default function Page() {
  return <SearchLandingPage content={content} />
}
