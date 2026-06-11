'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useReveal } from '@/utilities/useReveal'

const pillars = [
  {
    n: '01',
    title: 'A plan that plans itself',
    body: 'Open the app and today’s tasks are already there — generated from your competency profile, your calendar and your last conversation. Learners spend their time learning, not deciding what to learn.',
    href: '/features/ai-mentor',
  },
  {
    n: '02',
    title: 'Skip what you already know',
    body: 'A diagnostic runs before your plan begins. Mastered gradient descent? Those tasks disappear. Already fluent in SQL? That week is gone. You start where you actually are — not where a template assumes.',
    href: '/features/ai-mentor',
  },
  {
    n: '03',
    title: 'Remember it for good',
    body: 'Spaced repetition (the same SM-2 algorithm behind Anki) is built directly into your plan. Five-minute reviews surface precisely when you’re about to forget — so learning stops evaporating.',
    href: '/features/holistic-grading',
  },
  {
    n: '04',
    title: 'Proof, not certificates',
    body: 'Every task ties to real artifacts — projects, repositories, written analyses — verified by AI, scored for quality and published to a portfolio a hiring manager can actually evaluate.',
    href: '/features/holistic-grading',
  },
]

const Solutions = () => {
  const sectionRef = useRef<HTMLElement>(null)
  useReveal(sectionRef)

  return (
    <section id="solution" ref={sectionRef} className="bg-background py-28 md:py-36" aria-label="What Horizon does">
      <div className="container">
        <div className="mb-16 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p data-reveal className="eyebrow mb-5 flex items-center gap-2.5">
              <span className="eyebrow-dot" />
              what you get
            </p>
            <h2 data-reveal className="display-lg">
              One mentor.
              <br />
              Four promises.
            </h2>
          </div>
          <p data-reveal className="max-w-md text-lg leading-relaxed text-muted-foreground md:justify-self-end">
            Not a course platform. Not a chatbot. A system that models you, then builds the
            curriculum around the model — every day, every session, every task.
          </p>
        </div>

        <div className="border-t border-border">
          {pillars.map((p) => (
            <Link
              key={p.n}
              href={p.href}
              data-reveal
              className="group grid gap-4 border-b border-border py-9 transition-colors hover:bg-cream/40 md:grid-cols-[6rem_1fr_auto] md:items-start md:gap-8 md:py-11"
            >
              <span className="font-mono text-sm text-muted-foreground transition-colors group-hover:text-energy md:pt-2">
                {p.n}
              </span>
              <span>
                <span className="font-display block text-2xl font-semibold tracking-tight text-ink md:text-[2rem]">
                  {p.title}
                </span>
                <span className="mt-3 block max-w-2xl leading-relaxed text-muted-foreground">
                  {p.body}
                </span>
              </span>
              <ArrowUpRight className="hidden size-6 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink md:mt-2 md:block" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Solutions
