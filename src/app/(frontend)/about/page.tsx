'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useReveal } from '@/utilities/useReveal'
import { HorizonMark } from '@/components/Logo/HorizonLogo'

const beliefs = [
  {
    n: '01',
    title: 'Guidance is the bottleneck',
    body: 'The internet solved content. Nobody solved knowing what to do next. That gap — not laziness — is why most learning fails.',
  },
  {
    n: '02',
    title: 'Systems beat willpower',
    body: 'Motivation is finite. Streaks, spaced review and the right nudge at the right moment are what actually persist.',
  },
  {
    n: '03',
    title: 'Proof beats credentials',
    body: 'Certificates say you attended. Portfolios of verified work say you can. We only care about the second.',
  },
  {
    n: '04',
    title: 'Judgment over implementation',
    body: 'Tools can write the code. What we teach is the judgment to know what to build, why, and whether it’s good.',
  },
]

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  useReveal(pageRef)

  return (
    <div ref={pageRef} className="bg-background">
      {/* Hero */}
      <section className="grain relative pb-20 pt-32 md:pb-28 md:pt-44">
        <div className="container max-w-4xl">
          <p data-reveal className="eyebrow mb-6 flex items-center gap-2.5">
            <span className="eyebrow-dot" />
            about horizon
          </p>
          <h1 data-reveal className="display-xl">
            Building the most
            <br />
            <span className="text-indigo">human</span> learning OS
            <br />
            on Earth.
          </h1>
          <p data-reveal className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Horizon is built by Excentrix — a small team convinced that every learner deserves what
            only the luckiest ever get: a mentor who knows them, believes in them, and tells them
            exactly what to do next.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="border-y border-border bg-cream/45 py-24 md:py-32" aria-label="Our story">
        <div className="container grid max-w-5xl gap-12 md:grid-cols-[auto_1fr] md:gap-20">
          <div data-reveal className="shrink-0">
            <HorizonMark className="size-20 text-energy md:size-28" />
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-foreground/85">
            <p data-reveal>
              We started with a simple observation: the students who make it almost always had
              someone. A professor who noticed them. A senior who mapped the path. A mentor who
              said, “you’re ready — apply anyway.”
            </p>
            <p data-reveal>
              Everyone else had content. Endless, excellent, overwhelming content — and no one to
              say which piece mattered today.
            </p>
            <p data-reveal className="font-display text-2xl font-semibold tracking-tight text-ink">
              So we’re building the someone. For everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="py-24 md:py-32" aria-label="What we believe">
        <div className="container">
          <p data-reveal className="eyebrow mb-5 flex items-center gap-2.5">
            <span className="eyebrow-dot" />
            what we believe
          </p>
          <h2 data-reveal className="display-md mb-14 max-w-2xl">
            Four convictions we won’t trade.
          </h2>
          <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
            {beliefs.map((b) => (
              <div key={b.n} data-reveal className="border-t border-border pt-6">
                <span className="font-mono text-sm text-energy">{b.n}</span>
                <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-ink">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grain relative bg-ink py-24 text-center text-cream md:py-32">
        <div className="container max-w-3xl">
          <h2 data-reveal className="display-lg text-cream">
            Come build it with us.
          </h2>
          <p data-reveal className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
            Join the waitlist as a learner, or join the team building the mentor that scales.
          </p>
          <div data-reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/#waitlist" className="btn btn-lg bg-energy text-white hover:brightness-110">
              Join the waitlist
              <ArrowUpRight className="size-5" />
            </Link>
            <Link href="/careers" className="btn btn-lg border border-cream/30 text-cream hover:bg-cream/10">
              See careers
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
