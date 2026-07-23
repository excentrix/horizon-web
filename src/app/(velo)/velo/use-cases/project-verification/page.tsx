import { SearchLandingPage } from '@/components/seo/SearchLandingPage'
import { productMetadata } from '@/lib/seo'
import { veloProjectVerification } from '@/lib/search-content'

export const metadata = productMetadata('velo', {
  title: 'Project verification for GitHub portfolios',
  description:
    'VELO verifies whether a developer can defend the project they claim to have built, producing a shareable proof-of-work credential.',
  path: '/use-cases/project-verification',
  keywords: ['project verification', 'GitHub portfolio verification', 'developer project assessment'],
})

export default function Page() {
  return <SearchLandingPage content={veloProjectVerification} />
}
