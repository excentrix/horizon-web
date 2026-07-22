import type { Metadata } from 'next'
import { ExcentrixLanding } from '@/components/excentrix/ExcentrixLanding'

export const metadata: Metadata = {
  title: 'Capability made visible',
  alternates: { canonical: '/' },
}

export default function ExcentrixPage() {
  return <ExcentrixLanding />
}
