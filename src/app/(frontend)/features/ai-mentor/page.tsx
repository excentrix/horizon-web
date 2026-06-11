'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import Waitlist from '@/components/ui/landing/Waitlist'
import { ArrowUpRight, Check, X } from 'lucide-react'
import { useReveal } from '@/utilities/useReveal'

const pains = [
  {
    title: 'Limited availability',
    body: 'Real mentors have office hours. Your questions don’t.',
  },
  {
    title: 'Generic explanations',
    body: 'The same answer for everyone — regardless of what you already know.',
  },
  {
    title: 'Fear of judgment',
    body: '“Is this a stupid question?” kills more learning than any exam.',
  },
  {
    title: 'Slow feedback loops',
    body: 'A doubt that waits three days is a doubt that becomes a gap.',
  },
]

const capabilities = [
  {
    n: '01',
    title: 'A mentor with memory',
    body: 'Horizon reads your competency profile, brain map and last conversation before every reply. Explanations land at your level — never above it, never beneath it.',
  },
  {
    n: '02',
    title: 'The right mentor for the moment',
    body: 'An intelligent classifier routes every message — academic, career or wellness — to the right persona. Impostor syndrome gets empathy; system design gets precision.',
  },
  {
    n: '03',
    title: 'A specialist for every plan',
    body: 'Each learning plan spawns a domain-specialised mentor with its own knowledge base and tone. Your ML plan has an ML tutor. Your leadership plan has a coach.',
  },
  {
    n: '04',
    title: 'Proactive, not just reactive',
    body: 'Horizon notices when you stall, drift or disappear — and reaches out with the right nudge at the right moment, calibrated to your engagement.',
  },
]

const comparison = [
  { dim: 'Availability', traditional: 'Limited hours', horizon: '24/7, every domain' },
  { dim: 'Response time', traditional: 'Hours to days', horizon: 'Instant' },
  { dim: 'Personalization', traditional: 'One size fits all', horizon: 'Built on a model of you' },
  { dim: 'Question limit', traditional: 'Time constrained', horizon: 'Unlimited' },
  { dim: 'Judgment', traditional: 'Potential anxiety', horizon: 'Zero. Ask anything.' },
]

export default function AIMentorPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  useReveal(pageRef)

  return (
    <div ref={pageRef} className="bg-background">
      {/* Hero */}
      <section className="grain relative pb-20 pt-32 md:pb-28 md:pt-44">
        <div className="container max-w-4xl text-center">
          <p data-reveal className="eyebrow mb-6 flex items-center justify-center gap-2.5">
            <span className="eyebrow-dot" />
            ai mentor
          </p>
          <h1 data-reveal className="display-xl">
            Office hours
            <br />
            <span className="text-indigo">that never end.</span>
          </h1>
          <p data-reveal className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl">
            A mentor that remembers every conversation, knows exactly what you’ve mastered, and
            answers at the depth you need — any hour, any domain, zero judgment.
          </p>
          <div data-reveal className="mt-9">
            <Link href="/#waitlist" className="btn-primary btn-lg">
              Get early access
              <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* The reality */}
      <section className="border-y border-border bg-cream/45 py-24 md:py-32" aria-label="The problem with mentorship today">
        <div className="container">
          <h2 data-reveal className="display-md mb-12 max-w-2xl">
            Great mentors exist. Access to them doesn’t.
          </h2>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {pains.map((p) => (
              <div key={p.title} data-reveal className="bg-background p-7">
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 md:py-32" aria-label="What the AI mentor does">
        <div className="container">
          <p data-reveal className="eyebrow mb-5 flex items-center gap-2.5">
            <span className="eyebrow-dot" />
            core capabilities
          </p>
          <h2 data-reveal className="display-md mb-14 max-w-2xl">
            Not a chatbot. A mentor with a model of you.
          </h2>
          <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
            {capabilities.map((c) => (
              <div key={c.n} data-reveal className="border-t border-border pt-6">
                <span className="font-mono text-sm text-energy">{c.n}</span>
                <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-ink">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="grain relative bg-ink py-24 text-cream md:py-32" aria-label="Horizon versus traditional mentorship">
        <div className="container max-w-4xl">
          <h2 data-reveal className="display-md mb-12 text-cream">
            Side by side, it isn’t close.
          </h2>
          <div data-reveal className="overflow-hidden rounded-2xl border border-cream/15">
            <div className="grid grid-cols-3 border-b border-cream/15 bg-cream/5 px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-cream/50">
              <span />
              <span>Traditional</span>
              <span className="text-energy">Horizon</span>
            </div>
            {comparison.map((row) => (
              <div key={row.dim} className="grid grid-cols-3 items-center border-b border-cream/10 px-6 py-5 last:border-b-0">
                <span className="pr-3 font-medium text-cream">{row.dim}</span>
                <span className="flex items-center gap-2 pr-3 text-sm text-cream/55">
                  <X className="size-3.5 shrink-0 text-cream/35" />
                  {row.traditional}
                </span>
                <span className="flex items-center gap-2 text-sm text-cream">
                  <Check className="size-3.5 shrink-0 text-energy" />
                  {row.horizon}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Waitlist />
    </div>
  )
}
