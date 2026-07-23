import type { Metadata } from 'next'
import { AudiencePage, type AudienceContent } from '@/components/velo/AudiencePage'
import { productMetadata } from '@/lib/seo'

export const metadata: Metadata = productMetadata('velo', {
  title: 'For colleges — send graduates out with proof',
  description:
    'Placement season runs on claims employers no longer trust. VELO verifies whole cohorts and gives every student a proof-of-work credential that stands up to scrutiny.',
  path: '/for/colleges',
  keywords: ['college placement verification', 'student project verification', 'proof of work colleges'],
})

const content: AudienceContent = {
  eyebrow: 'for colleges',
  title: 'Placements run on claims.',
  titleAccent: 'Send proof instead.',
  subtitle:
    'Employers no longer trust resumes or project lists — they’re all AI-padded now. VELO verifies your students’ work and gives every graduate a credential that actually moves them up the shortlist.',
  cta: { label: 'Talk to us', href: 'mailto:hello@excentrix.tech?subject=VELO%20pilot' },
  secondaryCta: { label: 'See how it works', href: '/#how' },
  value: [
    {
      title: 'A placement edge',
      body: 'Verified students stand out in a market drowning in identical AI-generated portfolios.',
    },
    {
      title: 'Cohort-scale verification',
      body: 'Verify an entire batch and track readiness from one dashboard — no manual review.',
    },
    {
      title: 'Proof employers trust',
      body: 'Each credential links to a real interrogation transcript recruiters can verify themselves.',
    },
  ],
  steps: [
    { n: '01', title: 'Onboard a cohort', body: 'Invite a batch of students — we handle the rest.' },
    { n: '02', title: 'Students verify projects', body: 'Each defends their own work and earns a credential.' },
    { n: '03', title: 'Track + report', body: 'See cohort readiness and share verified credentials with recruiters.' },
  ],
  closing: {
    title: 'Verify a pilot cohort.',
    body: 'Give one batch verified credentials before this placement season and measure the difference.',
    cta: { label: 'Talk to us', href: 'mailto:hello@excentrix.tech?subject=VELO%20pilot' },
  },
}

export default function CollegesPage() {
  return <AudiencePage content={content} />
}
