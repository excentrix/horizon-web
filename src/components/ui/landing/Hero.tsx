'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '20–40%', label: 'shorter plans — skip what you know' },
  { value: '60–80%', label: 'retained at 30 days with built-in review' },
  { value: '4–5×', label: 'higher day-30 engagement past week one' },
]

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const sunRef = useRef<HTMLDivElement>(null)
  const skyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '[data-hero-word] > span',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, stagger: 0.055, delay: 0.25 },
      )
        .fromTo(
          '[data-hero-fade]',
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
          '-=0.6',
        )
        .fromTo(
          sunRef.current,
          { xPercent: -50, yPercent: 100, opacity: 1 },
          { xPercent: -50, yPercent: 42, duration: 2.2, ease: 'power2.inOut' },
          0.2,
        )
        .fromTo(
          '[data-hero-stat]',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
          '-=1.2',
        )

      // Gentle perpetual drift so the sun feels alive
      gsap.to(sunRef.current, {
        scale: 1.03,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 2.5,
      })

      // The sun settles gently toward the horizon as you scroll past the hero
      gsap.to(sunRef.current, {
        yPercent: 68,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Words of the headline, masked individually for the load reveal
  const line1 = ['Human', 'mentors', "don't", 'scale.']
  const line2 = ['Horizon', 'does.']

  return (
    <section
      ref={sectionRef}
      className="grain relative flex min-h-svh flex-col overflow-hidden bg-background pt-28 md:pt-32"
    >
      <div className="container relative z-10 flex flex-col items-center text-center">
        <p data-hero-fade className="eyebrow mb-6 flex items-center gap-2.5">
          <span className="eyebrow-dot" />
          adaptive ai mentorship
        </p>

        <h1 className="display-xl max-w-5xl">
          {line1.map((w) => (
            <span key={w} data-hero-word className="mask-line">
              <span className="inline-block">{w}&nbsp;</span>
            </span>
          ))}
          <br />
          {line2.map((w) => (
            <span key={w} data-hero-word className="mask-line text-indigo">
              <span className="inline-block">{w}&nbsp;</span>
            </span>
          ))}
        </h1>

        <p
          data-hero-fade
          className="mt-7 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          Horizon builds a living model of how you learn — your gaps, goals, schedule and pace — and
          turns it into a daily plan that adapts every single day.
        </p>

        <div
          data-hero-fade
          className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <a
            href="#waitlist"
            onClick={(e) => scrollTo(e, '#waitlist')}
            className="btn-primary btn-lg w-full sm:w-auto"
          >
            Join the waitlist
            <ArrowUpRight className="size-5" />
          </a>
          <a
            href="#how"
            onClick={(e) => scrollTo(e, '#how')}
            className="btn-ghost btn-lg w-full sm:w-auto"
          >
            See how it works
            <ArrowDown className="size-4" />
          </a>
        </div>

        <p data-hero-fade className="mt-5 font-mono text-xs tracking-wide text-muted-foreground">
          Early access opening soon · Free for students at launch
        </p>
      </div>

      {/* Sunrise — the brand mark, in motion. The band itself clips the sun,
          so the horizon is simply its bottom edge. A top-fade mask keeps the
          clipped glow from ending in a hard line. */}
      <div
        ref={skyRef}
        className="relative mt-auto h-[30vh] min-h-48 w-full overflow-hidden md:h-[24vh]"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 35%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 35%)',
        }}
      >
        <div
          ref={sunRef}
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 size-[min(72vw,34rem)] rounded-full opacity-0"
          style={{
            background:
              'radial-gradient(circle at 50% 32%, hsl(32 95% 64%) 0%, hsl(var(--hz-energy)) 58%, hsl(14 80% 46%) 100%)',
          }}
        >
          {/* Soft halo that travels with the sun */}
          <div
            aria-hidden="true"
            className="absolute -inset-[22%] -z-10 rounded-full"
            style={{
              background:
                'radial-gradient(circle, hsl(var(--hz-energy) / 0.35) 38%, transparent 72%)',
            }}
          />
        </div>
        {/* Horizon line */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-10 h-px bg-foreground/25"
        />
      </div>

      {/* Stats strip */}
      <div className="relative z-10 border-t border-border bg-background">
        <dl className="container grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((s) => (
            <div
              key={s.value}
              data-hero-stat
              className="flex items-baseline gap-4 py-5 sm:flex-col sm:gap-1 sm:px-6 sm:first:pl-0"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-semibold tracking-tight text-ink">
                {s.value}
              </dd>
              <dd className="font-mono text-xs leading-relaxed text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default Hero
