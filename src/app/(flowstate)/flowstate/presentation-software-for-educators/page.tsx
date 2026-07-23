import { SearchLandingPage } from '@/components/seo/SearchLandingPage'
import { flowstateCategory } from '@/lib/search-content'
import { productMetadata } from '@/lib/seo'

export const metadata = productMetadata('flowstate', {
  title: 'Presentation software for educators and trainers',
  description:
    'Flowstate is live presentation software for educators and trainers, combining deck authoring, presenter control, audience signals, and phone remote.',
  path: '/presentation-software-for-educators',
  keywords: ['presentation software for educators', 'interactive lecture software', 'live classroom presentation tool'],
})

export default function Page() {
  return <SearchLandingPage content={flowstateCategory} />
}
