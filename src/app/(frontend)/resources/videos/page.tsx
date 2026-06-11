import type { Metadata } from 'next'
import { ComingSoon } from '@/components/marketing/ComingSoon'

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Video walkthroughs and learning content from Horizon — coming soon.',
  alternates: { canonical: '/resources/videos' },
}

export default function Page() {
  return (
    <ComingSoon
      eyebrow="videos"
      title="Watch Horizon in action."
      description="Product walkthroughs, learning-science explainers and student stories. The first videos land here soon."
    />
  )
}
