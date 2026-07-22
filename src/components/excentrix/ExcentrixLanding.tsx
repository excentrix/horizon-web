'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ArrowRight, ArrowUpRight, BadgeCheck, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const principles = [
  {
    title: 'Proof beats polish.',
    body: 'AI made output cheap. We care about whether work can survive inspection.',
  },
  {
    title: 'Learning should be inspectable.',
    body: 'A plan is useful only when the gaps, evidence, and next action are visible.',
  },
  {
    title: 'Human judgment stays in the loop.',
    body: 'Our systems surface evidence and pressure-test claims; people still make the call.',
  },
]

const offers = [
  {
    name: 'VELO',
    tag: 'Verification engine',
    href: 'https://velo.excentrix.tech',
    Icon: ShieldCheck,
    body: 'Adaptive proof-of-work verification for developers, hiring teams, and colleges.',
  },
  {
    name: 'Horizon',
    tag: 'Adaptive learning',
    href: 'https://horizon.excentrix.tech',
    Icon: GraduationCap,
    body: 'An AI mentor that turns goals, gaps, and schedules into a daily learning path.',
  },
  {
    name: 'Pilot Lab',
    tag: 'Partner builds',
    href: 'mailto:hello@excentrix.tech?subject=Excentrix%20pilot',
    Icon: Sparkles,
    body: 'Small, focused pilots for colleges and teams that need proof infrastructure around talent.',
  },
]

const proofPoints = [
  'Repo-aware interrogation',
  'Role-fit evidence profiles',
  'Learning paths tied to gaps',
  'Auditable reports',
]

export function ExcentrixLanding() {
  const rootRef = useRef<HTMLDivElement>(null)
  const sunRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '[data-ex-word] > span',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.05, stagger: 0.045, delay: 0.2 },
      )

      gsap.fromTo(
        sunRef.current,
        { yPercent: 38, opacity: 0.85 },
        {
          yPercent: -16,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        },
      )

    }, rootRef)

    return () => ctx.revert()
  }, [])

  const words = ['Excentrix']

  return (
    <div ref={rootRef} className="bg-background">
      <section className="grain relative isolate min-h-[92svh] overflow-hidden bg-ink text-cream">
        <Image
          src="/excentrix/lab-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,hsl(var(--hz-ink)/0.92)_0%,hsl(var(--hz-ink)/0.76)_34%,hsl(var(--hz-ink)/0.22)_100%)]" />
        <div
          ref={sunRef}
          aria-hidden="true"
          className="absolute -bottom-28 left-[58%] -z-10 size-[34rem] rounded-full bg-accent/35 blur-3xl"
        />

        <div className="container relative z-10 flex min-h-[92svh] flex-col justify-center pb-10 pt-28 md:pb-12">
          <div className="max-w-4xl">
            <p className="eyebrow mb-6 flex items-center gap-2.5 text-cream/70">
              <span className="eyebrow-dot" />
              Excentrix · Bangalore
            </p>
            <h1 className="display-xl text-cream">
              {words.map((word, index) => (
                <span key={`${word}-${index}`} data-ex-word className="mask-line">
                  <span className="inline-block">{word}&nbsp;</span>
                </span>
              ))}
            </h1>
            <p
              className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-cream/95 md:text-5xl"
            >
              Capability made visible.
            </p>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-cream/88 md:text-xl">
              Excentrix is the company behind VELO and Horizon: proof-of-work verification,
              adaptive learning, and evidence systems for the AI era.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#offers" className="btn-cream btn-lg">
                See what we offer
                <ArrowRight className="size-5" />
              </a>
              <a href="mailto:hello@excentrix.tech?subject=Excentrix%20pilot" className="btn-ghost btn-lg border-cream/30 text-cream hover:bg-cream/10">
                Start a pilot
                <ArrowUpRight className="size-5" />
              </a>
            </div>
          </div>

          <div className="mt-12 hidden gap-px overflow-hidden border-y border-cream/20 bg-cream/20 md:grid md:grid-cols-4">
            {proofPoints.map((point) => (
              <div key={point} className="bg-ink/58 px-4 py-4 font-mono text-xs uppercase tracking-[0.16em] text-cream/72 backdrop-blur">
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="build" className="bg-background py-28 md:py-36">
        <div className="container grid gap-12 md:grid-cols-[0.86fr_1.14fr] md:items-start">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-2.5">
              <span className="eyebrow-dot" />
              what we do
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
              We turn claims into evidence, then turn gaps into a path.
            </h2>
          </div>
          <div className="space-y-7 text-lg leading-relaxed text-muted-foreground">
            <p>
              A resume says what someone did. A project says what they shipped. Neither proves
              ownership anymore. Excentrix builds the layer after output: interrogation, scoring,
              credentialing, and targeted improvement.
            </p>
            <p className="text-ink">
              VELO checks whether someone can defend the work. Horizon helps them close the gap
              once the truth is visible.
            </p>
          </div>
        </div>
      </section>

      <section id="principles" className="bg-cream/45 py-28 md:py-36">
        <div className="container">
          <div className="mb-14 max-w-3xl">
            <p className="eyebrow mb-5 flex items-center gap-2.5">
              <span className="eyebrow-dot" />
              what we stand for
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
              Honest systems for a noisy age.
            </h2>
          </div>
          <div className="grid border-y border-border md:grid-cols-3 md:divide-x md:divide-border">
            {principles.map((item) => (
              <div key={item.title} className="py-8 md:px-8 md:first:pl-0 md:last:pr-0">
                <BadgeCheck className="mb-8 size-7 text-energy" />
                <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="offers" className="bg-background py-28 md:py-36">
        <div className="container">
          <div className="mb-16 grid gap-6 md:grid-cols-2 md:items-end">
            <div>
              <p className="eyebrow mb-5 flex items-center gap-2.5">
                <span className="eyebrow-dot" />
                what we offer
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
                Three ways to work with Excentrix.
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground md:justify-self-end">
              Start with the product that matches your problem; the same evidence engine ties them together.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
            {offers.map(({ Icon, ...offer }) => (
              <Link
                key={offer.name}
                href={offer.href}
                className="group flex min-h-[22rem] flex-col bg-background p-8 transition-colors hover:bg-cream/35"
              >
                <div className="mb-10 flex items-start justify-between gap-6">
                  <Icon className="size-8 text-energy" />
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {offer.tag}
                  </span>
                </div>
                <h3 className="font-display text-4xl font-semibold tracking-tight text-ink">{offer.name}</h3>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">{offer.body}</p>
                <span className="mt-auto inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-indigo transition-colors group-hover:text-energy">
                  Open
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-ink py-24 text-cream md:py-32" data-theme="dark">
        <div className="container relative z-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-2.5 text-cream/60">
              <span className="eyebrow-dot" />
              build with us
            </p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-cream md:text-6xl">
              If the signal matters, make it defensible.
            </h2>
          </div>
          <a href="mailto:hello@excentrix.tech?subject=Excentrix%20pilot" className="btn-cream btn-lg">
            hello@excentrix.tech
            <ArrowUpRight className="size-5" />
          </a>
        </div>
      </section>
    </div>
  )
}
