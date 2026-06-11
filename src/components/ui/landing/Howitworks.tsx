'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    n: '1',
    title: 'Tell Horizon where you’re headed',
    body: 'A short onboarding conversation and a diagnostic build your model: goals, current skills, schedule, learning style. Ten minutes, once.',
  },
  {
    n: '2',
    title: 'Meet your living plan',
    body: 'Daily tasks arrive at the right depth, in the right format, sized to the time you actually have. The plan recalibrates every day as you learn.',
  },
  {
    n: '3',
    title: 'Learn with a mentor beside you',
    body: 'Ask anything, anytime. Horizon routes academic, career and wellness questions to the right mentor persona — a specialist for every domain you’re learning.',
  },
  {
    n: '4',
    title: 'Walk away with proof',
    body: 'A brain map of exactly what you know, and a portfolio of verified artifacts that shows what you can do — not just what you completed.',
  },
]

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-step]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%' },
          },
        )
      })

      // Progress line draws as the steps pass
      gsap.fromTo(
        '[data-progress]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-steps]',
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 0.5,
          },
        },
      )

      // Faint sun glow drifts up through the dark section
      gsap.fromTo(
        '[data-glow]',
        { yPercent: 30, opacity: 0.5 },
        {
          yPercent: -10,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="how"
      ref={sectionRef}
      className="grain relative overflow-hidden bg-ink py-28 text-cream md:py-36"
      aria-label="How Horizon works"
    >
      {/* Ambient sunrise glow */}
      <div
        data-glow
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-64 left-1/2 size-[48rem] -translate-x-1/2 rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--hz-energy) / 0.28) 0%, hsl(var(--hz-indigo) / 0.12) 45%, transparent 70%)',
        }}
      />

      <div className="container relative">
        <div className="mb-20 max-w-2xl">
          <p className="eyebrow mb-5 flex items-center gap-2.5 text-cream/50">
            <span className="eyebrow-dot" />
            how it works
          </p>
          <h2 className="display-lg text-cream">
            From “where do I start?”
            <br />
            to proof of skill.
          </h2>
        </div>

        <div data-steps className="relative ml-2 md:mx-auto md:max-w-3xl">
          {/* Track + scroll-drawn progress */}
          <div aria-hidden="true" className="absolute bottom-6 left-[1.1875rem] top-2 w-px bg-cream/15" />
          <div
            data-progress
            aria-hidden="true"
            className="absolute bottom-6 left-[1.1875rem] top-2 w-px origin-top bg-energy"
          />

          <ol className="space-y-16 md:space-y-20">
            {steps.map((step) => (
              <li key={step.n} data-step className="relative grid grid-cols-[2.5rem_1fr] gap-5 md:gap-8">
                <span className="flex size-10 items-center justify-center rounded-full border border-cream/25 bg-ink font-mono text-sm text-cream">
                  {step.n}
                </span>
                <div className="pt-1">
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-cream md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-cream/65">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
