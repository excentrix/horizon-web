import type { Metadata } from 'next'
import { AudiencePage, type AudienceContent } from '@/components/velo/AudiencePage'
import { productMetadata } from '@/lib/seo'

export const metadata: Metadata = productMetadata('velo', {
  title: 'For hiring teams — know who actually built it',
  description:
    'Most engineering resumes in 2026 are AI output the candidate can’t defend. VELO sends your shortlist a five-minute adaptive interrogation and returns a defensibility verdict before you spend an interview.',
  path: '/for/hiring',
  keywords: ['technical hiring assessment', 'AI-proof hiring', 'developer screening'],
})

const content: AudienceContent = {
  eyebrow: 'for hiring teams',
  title: 'The candidate “built” it.',
  titleAccent: 'Can they explain it?',
  subtitle:
    'You find out in week three of onboarding, not the interview. VELO sends your shortlist a five-minute interrogation about their own code and returns a defensibility verdict — before you spend an engineer’s hour.',
  cta: { label: 'Start a free pilot', href: 'mailto:hello@excentrix.tech?subject=VELO%20pilot' },
  secondaryCta: { label: 'See a sample report', href: '/#how' },
  value: [
    {
      title: 'Screen before you interview',
      body: 'Cut the engineering hours wasted on candidates who can’t defend their own claims.',
    },
    {
      title: 'A verdict, not a vibe',
      body: 'Every candidate gets a defensibility score backed by a real transcript you can read.',
    },
    {
      title: 'Pay per verification',
      body: 'No seat minimums, no annual lock-in. Buy verification credits and use them when you hire.',
    },
  ],
  steps: [
    { n: '01', title: 'Send a link', body: 'Drop your shortlist a VELO link — no account setup for them.' },
    { n: '02', title: 'They get interrogated', body: 'Adaptive questions about the work they put on their resume.' },
    { n: '03', title: 'You get a verdict', body: 'A defensibility report per candidate, ranked, with full transcripts.' },
  ],
  closing: {
    title: 'Verify your next 3 candidates free.',
    body: 'Compare VELO’s verdict against your own read. If it doesn’t save you interview hours, you’ve lost nothing.',
    cta: { label: 'Start a free pilot', href: 'mailto:hello@excentrix.tech?subject=VELO%20pilot' },
  },
}

export default function HiringPage() {
  return <AudiencePage content={content} />
}
