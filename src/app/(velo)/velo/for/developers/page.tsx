import type { Metadata } from 'next'
import { AudiencePage, type AudienceContent } from '@/components/velo/AudiencePage'
import { VERIFY_URL } from '@/lib/veloLinks'

export const metadata: Metadata = {
  title: 'For developers — prove what you built',
  description:
    'AI can generate the project. It can’t defend it for you. Earn a verifiable proof-of-work credential that shows you actually built — and understand — your work.',
}

const content: AudienceContent = {
  eyebrow: 'for developers',
  title: 'Your GitHub is full of green squares.',
  titleAccent: 'Prove they mean something.',
  subtitle:
    'In 2026, a polished repo is table stakes — and fakeable in an afternoon. VELO interrogates you about your own code and turns the parts you can defend into a credential recruiters actually trust.',
  cta: { label: 'Verify a project — free', href: VERIFY_URL },
  secondaryCta: { label: 'See how it works', href: '/#how' },
  value: [
    {
      title: 'A signal that survives AI',
      body: 'Anyone can generate output. Defending it under adaptive questioning is the one thing that still separates you.',
    },
    {
      title: 'Shareable proof of work',
      body: 'Get a public verification page and a credential you can drop on your resume, LinkedIn, or portfolio.',
    },
    {
      title: 'Built for builders',
      body: 'No leetcode theater. We ask about the project you actually shipped — and reward depth, not memorisation.',
    },
  ],
  steps: [
    { n: '01', title: 'Paste your repo', body: 'Point VELO at the project you’re proudest of and a one-line claim.' },
    { n: '02', title: 'Get interrogated', body: '6–10 adaptive questions about your own code, probing wherever you’re vague.' },
    { n: '03', title: 'Share your credential', body: 'Earn a verifiable proof-of-work badge and a public page to share.' },
  ],
  closing: {
    title: 'Verify your first project free.',
    body: 'Five minutes. No card. A credential that says you can defend your work — because you can.',
    cta: { label: 'Verify a project', href: VERIFY_URL },
  },
}

export default function DevelopersPage() {
  return <AudiencePage content={content} />
}
