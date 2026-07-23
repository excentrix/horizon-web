import { SearchLandingPage } from '@/components/seo/SearchLandingPage'
import { productMetadata } from '@/lib/seo'
import { veloComparisonContent } from '@/lib/search-content'

const content = veloComparisonContent('coding-tests')

export const metadata = productMetadata('velo', {
  title: 'VELO vs coding tests',
  description:
    'Compare VELO proof-of-work verification with traditional coding tests for AI-era technical hiring and developer project evidence.',
  path: '/compare/coding-tests',
  keywords: ['VELO vs coding tests', 'coding test alternative', 'proof of work hiring'],
})

export default function Page() {
  return <SearchLandingPage content={content} />
}
