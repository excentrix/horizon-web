import type { Metadata } from 'next'
import { FlowstateLanding } from '@/components/flowstate/FlowstateLanding'
import { productMetadata } from '@/lib/seo'

export const metadata: Metadata = productMetadata('flowstate', {
  title: 'Build the deck. Run the room.',
  description:
    'Flowstate is live presentation software for educators and trainers, with deck authoring, presenter intelligence, audience signals, and phone remote control.',
})

export default function FlowstatePage() {
  return <FlowstateLanding />
}
