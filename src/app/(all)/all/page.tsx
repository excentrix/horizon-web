import type { Metadata } from 'next'
import { ExcentrixLanding } from '@/components/excentrix/ExcentrixLanding'
import { productMetadata } from '@/lib/seo'

export const metadata: Metadata = productMetadata('excentrix', {
  title: 'Capability made visible',
  description:
    'Excentrix builds capability infrastructure across proof-of-work verification, AI mentorship, presentation intelligence, and university operating systems.',
})

export default function ExcentrixPage() {
  return <ExcentrixLanding />
}
