'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Manifesto block — words ink in one by one as the reader scrolls,
 * with the key phrases landing in brand color.
 */
const sentences: { text: string; tone?: 'energy' | 'indigo' }[] = [
  { text: 'Learning is broken — not because content is scarce, but because guidance is.' },
  { text: 'A Python tutorial is 30 seconds away. A thousand courses on leadership, one search apart.' },
  { text: 'Content without direction is just noise.', tone: 'indigo' },
  {
    text: 'What every learner actually needs is someone who knows them — their schedule, their gaps, their goals, their pace — and says exactly what to do next.',
  },
  { text: 'That someone has always been a human mentor. And human mentors don’t scale.' },
  { text: 'Horizon is what happens when you build one that does.', tone: 'energy' },
]

const Problem = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('[data-word]')
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 75%',
            scrub: 0.4,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="problem" ref={sectionRef} className="bg-cream/45 py-28 md:py-40" aria-label="Why Horizon exists">
      <div className="container max-w-4xl">
        <p className="eyebrow mb-10 flex items-center gap-2.5">
          <span className="eyebrow-dot" />
          the problem
        </p>

        <p className="font-display text-[clamp(1.6rem,3.6vw,2.9rem)] font-semibold leading-[1.22] tracking-tight text-ink">
          {sentences.map((s, si) => (
            <React.Fragment key={si}>
              {s.text.split(' ').map((w, wi) => (
                <span
                  key={`${si}-${wi}`}
                  data-word
                  className={
                    s.tone === 'energy'
                      ? 'text-energy'
                      : s.tone === 'indigo'
                        ? 'text-indigo'
                        : undefined
                  }
                >
                  {w}{' '}
                </span>
              ))}
              {si < sentences.length - 1 && <span className="block h-[0.9em]" aria-hidden="true" />}
            </React.Fragment>
          ))}
        </p>
      </div>
    </section>
  )
}

export default Problem
