import type { Metadata } from 'next'
import { ColcordLanding } from '@/components/colcord/ColcordLanding'

export const metadata: Metadata = {
  title: 'One Platform. One Ecosystem.',
  alternates: { canonical: '/' },
}

export default function ColcordPage() {
  return <ColcordLanding />
}
