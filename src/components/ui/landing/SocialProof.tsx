'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useReveal } from '@/utilities/useReveal'

const audiences = [
  {
    title: 'Students',
    body: 'Stand out from every graduate with the same degree. Build the exact skills your target industry values — with a verifiable portfolio to prove it.',
    href: '/solutions/students',
    accent: 'text-energy',
  },
  {
    title: 'Professionals',
    body: 'Pivot or level up around a real job. Plans shaped to the hours you actually have, with a mentor for the domain you’re moving into.',
    href: '/solutions/educators',
    accent: 'text-indigo',
  },
  {
    title: 'Institutions',
    body: 'Give every student a personal mentor. Holistic evaluation, early-warning signals and outcomes you can measure across the cohort.',
    href: '/solutions/institutions',
    accent: 'text-ink',
  },
]

const domains = [
  'software engineering',
  'data science',
  'product management',
  'ux design',
  'machine learning',
  'finance',
  'marketing',
  'leadership',
  'career pivots',
  'interview prep',
]

const SocialProof = () => {
  const sectionRef = useRef<HTMLElement>(null)
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} className="overflow-hidden bg-background py-28 md:py-36" aria-label="Who Horizon is for">
      <div className="container">
        <div className="mb-14 max-w-2xl">
          <p data-reveal className="eyebrow mb-5 flex items-center gap-2.5">
            <span className="eyebrow-dot" />
            built for
          </p>
          <h2 data-reveal className="display-lg">
            A mentor in every domain.
            <br />
            For everyone climbing.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {audiences.map((a) => (
            <Link
              key={a.title}
              href={a.href}
              data-reveal
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_hsl(var(--hz-ink)/0.25)] md:p-9"
            >
              <div>
                <h3 className={`font-display text-2xl font-semibold tracking-tight ${a.accent}`}>
                  {a.title}
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{a.body}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                Explore
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Domain marquee */}
      <div className="mt-20 border-y border-border py-5" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-0">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {domains.map((d) => (
                <span key={`${dup}-${d}`} className="flex items-center font-mono text-sm lowercase tracking-wide text-muted-foreground">
                  <span className="px-6">{d}</span>
                  <span className="size-1.5 rounded-full bg-energy/70" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialProof
