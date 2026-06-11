'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import Waitlist from '@/components/ui/landing/Waitlist'
import { ArrowUpRight, Users, MessageCircle, Calendar, Heart } from 'lucide-react'
import { useReveal } from '@/utilities/useReveal'

const features = [
  {
    icon: Users,
    title: 'Peer support',
    body: 'Learn beside people on the same climb. Same goals, same struggles, same hours — finally, people who get it.',
  },
  {
    icon: MessageCircle,
    title: 'Ask anything',
    body: 'Questions get answered by peers one step ahead of you — moderated and amplified by your mentor.',
  },
  {
    icon: Calendar,
    title: 'Study groups',
    body: 'Small, focused groups matched by goal and schedule. Accountability that doesn’t depend on willpower.',
  },
  {
    icon: Heart,
    title: 'Mental health, first-class',
    body: 'Burnout and impostor syndrome are learning problems too. Wellness support is built into the same conversation.',
  },
]

export default function CommunityPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  useReveal(pageRef)

  return (
    <div ref={pageRef} className="bg-background">
      {/* Hero */}
      <section className="grain relative pb-20 pt-32 md:pb-28 md:pt-44">
        <div className="container max-w-4xl text-center">
          <p data-reveal className="eyebrow mb-6 flex items-center justify-center gap-2.5">
            <span className="eyebrow-dot" />
            community
          </p>
          <h1 data-reveal className="display-xl">
            Learning alone
            <br />
            <span className="text-indigo">was the bug.</span>
          </h1>
          <p data-reveal className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl">
            Hard things are easier beside people doing the same hard thing. Horizon pairs your AI
            mentor with a community that actually gets it.
          </p>
          <div data-reveal className="mt-9">
            <Link href="/#waitlist" className="btn-primary btn-lg">
              Join the founding cohort
              <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border py-24 md:py-32" aria-label="Community features">
        <div className="container">
          <h2 data-reveal className="display-md mb-14 max-w-2xl">
            Built for the climb together.
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                data-reveal
                className="rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_hsl(var(--hz-ink)/0.25)]"
              >
                <f.icon className="size-6 text-energy" />
                <h3 className="font-display mt-5 text-2xl font-semibold tracking-tight text-ink">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Waitlist />
    </div>
  )
}
