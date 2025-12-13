'use client'

import React, { useEffect, useRef } from 'react'
import PageHero from '@/components/ui/PageHero'
import Waitlist from '@/components/ui/landing/Waitlist'
import { Users, MessageCircle, Calendar, Heart } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CommunityPage() {
  const whyRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Why cards
      if (whyRef.current) {
        const cards = whyRef.current.querySelectorAll('.why-card')
        gsap.from(cards, {
          scrollTrigger: {
            trigger: whyRef.current,
            start: 'top 75%',
          },
          x: -40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
        })
      }

      // Feature cards
      if (featuresRef.current) {
        const cards = featuresRef.current.querySelectorAll('.feature-card')
        gsap.from(cards, {
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 75%',
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen">
      <PageHero
        title="COMMUNITY"
        subtitle="Learn with others who get it. Support. Share. Grow together."
        variant="gradient"
      />

      {/* Why Community - bg-background */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black mb-8">
            WHY YOU NEED THIS
          </h2>

          <div ref={whyRef} className="space-y-6">
            <div className="why-card p-6 border-l-8 border-accent">
              <p className="text-xl font-black mb-2">Engineering is hard.</p>
              <p className="text-lg opacity-80 font-mono">
                Difficult concepts. Brutal deadlines. Constant pressure. You shouldn&apos;t face it alone.
              </p>
            </div>

            <div className="why-card p-6 border-l-8 border-accent">
              <p className="text-xl font-black mb-2">Your friends don&apos;t get it.</p>
              <p className="text-lg opacity-80 font-mono">
                They&apos;re not grinding LeetCode at 2 AM. They&apos;re not debugging code for hours. You need people who understand.
              </p>
            </div>

            <div className="why-card p-6 border-l-8 border-accent">
              <p className="text-xl font-black mb-2">Learning alone sucks.</p>
              <p className="text-lg opacity-80 font-mono">
                Stuck on a problem? No one to celebrate wins with? That&apos;s demotivating. Community changes that.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get - bg-muted */}
      <section className="py-16 md:py-24 px-4 bg-muted relative overflow-hidden">
        {/* Diagonal stripes background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 2px, transparent 2px, transparent 40px)",
            }}
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">
            WHAT YOU GET
          </h2>

          <div ref={featuresRef} className="grid md:grid-cols-2 gap-6">
            <div className="feature-card p-8 border-4 border-foreground bg-background hover:bg-accent hover:text-foreground transition-all duration-300 group shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <Users className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black mb-3">PEER SUPPORT</h3>
              <p className="text-lg opacity-90 font-mono">
                Students from all types of colleges. All helping each other succeed.
              </p>
            </div>

            <div className="feature-card p-8 border-4 border-foreground bg-background hover:bg-accent hover:text-foreground transition-all duration-300 group shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <MessageCircle className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black mb-3">ASK QUESTIONS</h3>
              <p className="text-lg opacity-90 font-mono">
                Stuck? Ask. Someone&apos;s probably solved it before and will help.
              </p>
            </div>

            <div className="feature-card p-8 border-4 border-foreground bg-background hover:bg-accent hover:text-foreground transition-all duration-300 group shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <Calendar className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black mb-3">STUDY GROUPS</h3>
              <p className="text-lg opacity-90 font-mono">
                Find people learning the same topic. Study together. Build projects together.
              </p>
            </div>

            <div className="feature-card p-8 border-4 border-foreground bg-background hover:bg-accent hover:text-foreground transition-all duration-300 group shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <Heart className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black mb-3">MENTAL HEALTH</h3>
              <p className="text-lg opacity-90 font-mono">
                Burnout is real. We talk about it openly and support each other.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - bg-background */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black mb-8">
            REAL COMMUNITY, NOT FAKE NUMBERS
          </h2>

          <div className="space-y-6">
            <p className="text-lg md:text-xl opacity-80 font-mono">
              We&apos;re building this from scratch. No inflated member counts. No fake engagement.
            </p>

            <p className="text-lg md:text-xl opacity-80 font-mono">
              Just real students helping each other. That&apos;s it.
            </p>

            <div className="p-8 bg-accent/10 border-4 border-accent mt-8">
              <p className="text-xl font-black mb-4">Join the founders.</p>
              <p className="text-lg font-mono">
                Be part of the group that starts this. Help shape how we support each other.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <Waitlist />
    </main>
  )
}
