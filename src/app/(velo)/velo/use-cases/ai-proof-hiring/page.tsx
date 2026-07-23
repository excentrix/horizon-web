import { SearchLandingPage } from '@/components/seo/SearchLandingPage'
import { productMetadata } from '@/lib/seo'
import { veloAiProofHiring } from '@/lib/search-content'

export const metadata = productMetadata('velo', {
  title: 'AI-proof hiring for engineering teams',
  description:
    'Use VELO to verify candidate project ownership before interviews and avoid hiring decisions based only on AI-polished resumes and portfolios.',
  path: '/use-cases/ai-proof-hiring',
  keywords: ['AI-proof hiring', 'AI hiring verification', 'technical hiring assessment'],
})

export default function Page() {
  return <SearchLandingPage content={veloAiProofHiring} />
}
