import type { Metadata } from 'next'
import { ColcordLanding } from '@/components/colcord/ColcordLanding'
import { productMetadata } from '@/lib/seo'

export const metadata: Metadata = productMetadata('colcord', {
  title: 'One Platform. One Ecosystem.',
  description:
    'Colcord is a campus operating system for universities in India, unifying academics, communication, campus life, career services, identity, and institutional intelligence.',
})

export default function ColcordPage() {
  return <ColcordLanding />
}
