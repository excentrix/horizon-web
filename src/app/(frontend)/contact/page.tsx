import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk to the Horizon team — questions about the product, early access, partnerships or institutions. We reply fast.',
  alternates: { canonical: '/contact' },
}

const channels = [
  {
    title: 'General & product',
    body: 'Questions about Horizon, your account or early access.',
    email: 'hello@excentrix.tech',
  },
  {
    title: 'Institutions & partnerships',
    body: 'Bringing Horizon to your college, cohort or company.',
    email: 'partnerships@excentrix.tech',
  },
  {
    title: 'Press',
    body: 'Interviews, assets and anything written about us.',
    email: 'press@excentrix.tech',
  },
]

export default function ContactPage() {
  return (
    <main className="grain relative min-h-svh bg-background pb-24 pt-32 md:pt-40">
      <div className="container max-w-5xl">
        <p className="eyebrow mb-5 flex items-center gap-2.5">
          <span className="eyebrow-dot" />
          contact
        </p>
        <h1 className="display-lg max-w-3xl">Talk to the team.</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          No forms, no ticket queues. Email the people building Horizon — we read everything and
          reply fast.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.email}
              href={`mailto:${c.email}`}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_hsl(var(--hz-ink)/0.25)]"
            >
              <div>
                <Mail className="size-5 text-indigo" />
                <h2 className="font-display mt-4 text-xl font-semibold tracking-tight text-ink">{c.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm text-indigo">
                {c.email}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-cream/50 p-8 md:flex md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Just want early access?
            </h2>
            <p className="mt-1 text-muted-foreground">Skip the email — join the waitlist instead.</p>
          </div>
          <Link href="/#waitlist" className="btn-primary btn-lg mt-6 md:mt-0">
            Join the waitlist
            <ArrowUpRight className="size-5" />
          </Link>
        </div>
      </div>
    </main>
  )
}
