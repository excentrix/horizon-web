import { SearchLandingPage } from '@/components/seo/SearchLandingPage'
import { colcordCategory } from '@/lib/search-content'
import { productMetadata } from '@/lib/seo'

export const metadata = productMetadata('colcord', {
  title: 'Campus operating system for universities in India',
  description:
    'Colcord is a campus operating system for universities, unifying academics, communication, campus life, career services, identity, and institutional intelligence.',
  path: '/campus-operating-system',
  keywords: ['campus operating system', 'university management platform India', 'student lifecycle platform'],
})

export default function Page() {
  return <SearchLandingPage content={colcordCategory} />
}
