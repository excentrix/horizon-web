import { SearchLandingPage } from '@/components/seo/SearchLandingPage'
import { productMetadata } from '@/lib/seo'
import { veloProofOfWork } from '@/lib/search-content'

export const metadata = productMetadata('velo', {
  title: 'Proof-of-work verification for developers and hiring teams',
  description:
    'VELO verifies project claims through adaptive interrogation, producing defensibility evidence for developers, hiring teams, and college placements.',
  path: '/use-cases/proof-of-work-verification',
  keywords: ['proof-of-work verification', 'proof of work hiring', 'developer proof of work'],
})

export default function Page() {
  return <SearchLandingPage content={veloProofOfWork} />
}
