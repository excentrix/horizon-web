'use client'

import React, { useEffect, useRef } from 'react'
import PageHero from '@/components/ui/PageHero'
import Waitlist from '@/components/ui/landing/Waitlist'
import { Target, Eye, Users, Lightbulb, Heart, Zap } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const missionRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mission cards
      if (missionRef.current) {
        const cards = missionRef.current.querySelectorAll('.mission-card')
        gsap.from(cards, {
          scrollTrigger: {
            trigger: missionRef.current,
            start: 'top 75%',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
        })
      }

      // Values cards
      if (valuesRef.current) {
        const cards = valuesRef.current.querySelectorAll('.value-card')
        gsap.from(cards, {
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 75%',
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen">
      <PageHero
        title="ABOUT US"
        subtitle="Students who got tired of the system. So we're fixing it."
        variant="pattern"
      />

      {/* Mission & Vision - bg-background */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div ref={missionRef} className="grid md:grid-cols-2 gap-8">
            <div className="mission-card p-8 border-4 border-foreground hover:bg-accent hover:text-foreground transition-all duration-300 group shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <Target className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl font-black mb-4">OUR MISSION</h2>
              <p className="text-lg font-mono">
                Help every engineering student reach their potential. Regardless of college tier or background.
              </p>
            </div>

            <div className="mission-card p-8 border-4 border-foreground hover:bg-accent hover:text-foreground transition-all duration-300 group shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <Eye className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl font-black mb-4">OUR VISION</h2>
              <p className="text-lg font-mono">
                Education that&apos;s personalized, practical, and actually helps you succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem - bg-muted */}
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

        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-8">
            THE PROBLEM WE&apos;RE SOLVING
          </h2>

          <div className="space-y-6 text-lg font-mono">
            <p>
              India produces over a million engineering graduates every year.
            </p>

            <p>
              Most struggle to get jobs. Not because they&apos;re not smart. But because the education system doesn&apos;t prepare them for real work.
            </p>

            <div className="p-6 border-l-8 border-accent my-8 bg-background">
              <p className="text-xl font-black">
                → Outdated curricula. Rote memorization. Theory over practice.
              </p>
            </div>

            <p>
              We&apos;re changing that. One student at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Values - bg-background */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">
            WHAT WE STAND FOR
          </h2>

          <div ref={valuesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="value-card p-6 border-4 border-foreground hover:bg-accent hover:text-foreground transition-all duration-300 group shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <Users className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-black mb-3">STUDENT-FIRST</h3>
              <p className="opacity-90 font-mono">
                Every decision is based on what&apos;s best for students. Not investors. Students.
              </p>
            </div>

            <div className="value-card p-6 border-4 border-foreground hover:bg-accent hover:text-foreground transition-all duration-300 group shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <Eye className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-black mb-3">TRANSPARENCY</h3>
              <p className="opacity-90 font-mono">
                We&apos;re honest about what we can and can&apos;t do. No false promises.
              </p>
            </div>

            <div className="value-card p-6 border-4 border-foreground hover:bg-accent hover:text-foreground transition-all duration-300 group shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <Lightbulb className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-black mb-3">INNOVATION</h3>
              <p className="opacity-90 font-mono">
                Using AI and technology to solve old problems in new ways.
              </p>
            </div>

            <div className="value-card p-6 border-4 border-foreground hover:bg-accent hover:text-foreground transition-all duration-300 group shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <Target className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-black mb-3">IMPACT</h3>
              <p className="opacity-90 font-mono">
                Success = lives changed. Not revenue or vanity metrics.
              </p>
            </div>

            <div className="value-card p-6 border-4 border-foreground hover:bg-accent hover:text-foreground transition-all duration-300 group shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <Heart className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-black mb-3">EMPATHY</h3>
              <p className="opacity-90 font-mono">
                We&apos;ve been there. We know the struggle. We genuinely care.
              </p>
            </div>

            <div className="value-card p-6 border-4 border-foreground hover:bg-accent hover:text-foreground transition-all duration-300 group shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <Zap className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-black mb-3">ACTION</h3>
              <p className="opacity-90 font-mono">
                We don&apos;t just talk. We build. We ship. We make it happen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team - bg-muted */}
      <section className="py-16 md:py-24 px-4 bg-muted">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black mb-8 text-center">
            WHO WE ARE
          </h2>

          <div className="text-center space-y-6">
            <p className="text-lg md:text-xl font-mono">
              We&apos;re students and recent grads who lived through the same struggles you face.
            </p>

            <p className="text-lg md:text-xl font-mono">
              We know what it&apos;s like to feel lost. To struggle with bad teaching. To wonder if you&apos;ll ever succeed.
            </p>

            <div className="p-8 bg-accent/10 border-4 border-accent mt-8">
              <p className="text-xl font-black">
                That&apos;s why we&apos;re building this. To help you avoid those struggles.
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
