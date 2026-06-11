'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import Waitlist from '@/components/ui/landing/Waitlist'
import { ArrowUpRight, Check, X } from 'lucide-react'
import { useReveal } from '@/utilities/useReveal'

const broken = [
  'A bad day becomes a bad grade — permanently.',
  'Effort doesn’t count. Growth is invisible.',
  'Only the final exam matters.',
  'Memorization beats understanding.',
  'One number defines you.',
]

const better = [
  'Continuous assessment across every task and conversation.',
  'Understanding weighted over memory.',
  'Multiple dimensions tracked: skill, consistency, depth, growth.',
  'Improvement is measured — and celebrated.',
  'Evidence, not averages.',
]

const proof = [
  {
    n: '01',
    title: 'The brain map',
    body: 'A living knowledge graph of exactly which concepts you’ve mastered, which are developing, and which prerequisites are missing — updated with every task, artifact and conversation.',
  },
  {
    n: '02',
    title: 'Verified artifacts',
    body: 'Projects, repositories, case studies and written analyses — each verified by AI, scored for quality, and linked to specific competencies with evidence.',
  },
  {
    n: '03',
    title: 'A portfolio that proves it',
    body: 'Your public Horizon portfolio shows what you built, what competency it demonstrates, and a confidence score on the evidence. Fundamentally more than a certificate.',
  },
]

export default function HolisticGradingPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  useReveal(pageRef)

  return (
    <div ref={pageRef} className="bg-background">
      {/* Hero */}
      <section className="grain relative pb-20 pt-32 md:pb-28 md:pt-44">
        <div className="container max-w-4xl text-center">
          <p data-reveal className="eyebrow mb-6 flex items-center justify-center gap-2.5">
            <span className="eyebrow-dot" />
            holistic grading
          </p>
          <h1 data-reveal className="display-xl">
            One number
            <br />
            <span className="text-energy">was never you.</span>
          </h1>
          <p data-reveal className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl">
            Horizon evaluates understanding, growth and real work — continuously — and turns it
            into evidence employers can actually trust.
          </p>
          <div data-reveal className="mt-9">
            <Link href="/#waitlist" className="btn-primary btn-lg">
              Get early access
              <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Broken vs better */}
      <section className="border-y border-border bg-cream/45 py-24 md:py-32" aria-label="Traditional grading versus holistic evaluation">
        <div className="container grid gap-10 md:grid-cols-2">
          <div data-reveal className="rounded-2xl border border-border bg-background p-8 md:p-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">How grading works today</h2>
            <ul className="mt-6 space-y-4">
              {broken.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <X className="mt-1 size-4 shrink-0 text-charcoal/40" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="rounded-2xl border border-indigo/30 bg-indigo/5 p-8 md:p-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-indigo">How Horizon evaluates</h2>
            <ul className="mt-6 space-y-4">
              {better.map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground">
                  <Check className="mt-1 size-4 shrink-0 text-energy" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Evidence system */}
      <section className="py-24 md:py-32" aria-label="How Horizon builds proof of skill">
        <div className="container">
          <p data-reveal className="eyebrow mb-5 flex items-center gap-2.5">
            <span className="eyebrow-dot" />
            evidence, not averages
          </p>
          <h2 data-reveal className="display-md mb-14 max-w-2xl">
            What a grade should have been all along.
          </h2>
          <div className="grid gap-12 md:grid-cols-3">
            {proof.map((p) => (
              <div key={p.n} data-reveal className="border-t border-border pt-6">
                <span className="font-mono text-sm text-energy">{p.n}</span>
                <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-ink">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Waitlist />
    </div>
  )
}
