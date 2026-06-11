'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useReveal } from '@/utilities/useReveal'
import { faqs } from './faq-data'

const Faq = () => {
  const sectionRef = useRef<HTMLElement>(null)
  useReveal(sectionRef)

  return (
    <section id="faq" ref={sectionRef} className="bg-cream/45 py-28 md:py-36" aria-label="Frequently asked questions">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p data-reveal className="eyebrow mb-5 flex items-center gap-2.5">
            <span className="eyebrow-dot" />
            questions
          </p>
          <h2 data-reveal className="display-md">
            Everything people
            <br />
            ask us first.
          </h2>
          <p data-reveal className="mt-5 max-w-sm leading-relaxed text-muted-foreground">
            Something else on your mind?{' '}
            <Link href="/contact" className="font-medium text-indigo underline-offset-4 hover:underline">
              Talk to the team
            </Link>
            .
          </p>
        </div>

        <div data-reveal className="border-t border-border">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink md:text-xl">
                  {f.q}
                </h3>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-open:rotate-45 group-open:border-energy group-open:text-energy">
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq
