import type { Metadata } from 'next'
import { ComingSoon } from '@/components/marketing/ComingSoon'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the team building Horizon — the adaptive AI mentorship platform by Excentrix. Open roles coming soon.',
  alternates: { canonical: '/careers' },
}

export default function Page() {
  return (
    <ComingSoon
      eyebrow="careers"
      title="Help us build the mentor that scales."
      description="We are a small team obsessed with learning science and craft. Open roles will be posted here — until then, write to hello@excentrix.tech."
    />
  )
}
