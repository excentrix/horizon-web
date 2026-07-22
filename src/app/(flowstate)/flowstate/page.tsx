import type { Metadata } from 'next'
import { FlowstateLanding } from '@/components/flowstate/FlowstateLanding'

export const metadata: Metadata = {
  title: 'Build the deck. Run the room.',
  alternates: { canonical: '/' },
}

export default function FlowstatePage() {
  return <FlowstateLanding />
}
