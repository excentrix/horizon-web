'use client'

import React, { useEffect, useRef } from 'react'
import PageHero from '@/components/ui/PageHero'
import Waitlist from '@/components/ui/landing/Waitlist'
import { Check, X, Award, TrendingUp, Brain } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HolisticGradingPage() {
  const problemRef = useRef<HTMLDivElement>(null)
  const comparisonRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Problem cards
      if (problemRef.current) {
        const cards = problemRef.current.querySelectorAll('.problem-card')
        gsap.fromTo(
          cards,
          {
            x: -40,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: problemRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
          }
        )
      }

      // Comparison columns
      if (comparisonRef.current) {
        const cols = comparisonRef.current.querySelectorAll('.comparison-col')
        gsap.fromTo(
          cols,
          {
            y: 50,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: comparisonRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
          }
        )
      }

      // Track cards
      if (trackRef.current) {
        const cards = trackRef.current.querySelectorAll('.track-card')
        gsap.fromTo(
          cards,
          {
            y: 30,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: trackRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen">
      <PageHero
        title="HOLISTIC GRADING"
        subtitle="More than just marks. We measure what actually matters."
        variant="pattern"
      />

      {/* The Problem - bg-background */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black mb-8">
            WHY GRADES LIE
          </h2>

          <div ref={problemRef} className="space-y-6">
            <div className="problem-card flex items-start gap-4 p-6 border-l-8 border-red-500">
              <X className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-black mb-2">Bad day = Bad grade</h3>
                <p className="text-lg opacity-80 font-mono">
                  One exam. One chance. Doesn&apos;t matter if you were sick or stressed.
                </p>
              </div>
            </div>

            <div className="problem-card flex items-start gap-4 p-6 border-l-8 border-red-500">
              <X className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-black mb-2">Effort doesn&apos;t count</h3>
                <p className="text-lg opacity-80 font-mono">
                  Spent 20 hours on an assignment? Cool. You still get the same grade as someone who spent 2.
                </p>
              </div>
            </div>

            <div className="problem-card flex items-start gap-4 p-6 border-l-8 border-red-500">
              <X className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-black mb-2">Growth is invisible</h3>
                <p className="text-lg opacity-80 font-mono">
                  Started at 40%? Ended at 75%? Nobody cares. You&apos;re still &quot;C grade&quot;.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Comparison - bg-muted */}
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
            TRADITIONAL vs. HOLISTIC
          </h2>

          <div ref={comparisonRef} className="grid md:grid-cols-2 gap-8">
            {/* Traditional */}
            <div className="comparison-col p-8 border-4 border-red-500/50 bg-background shadow-[8px_8px_0px_rgba(239,68,68,0.3)]">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                <X className="w-8 h-8 text-red-500" />
                TRADITIONAL GRADING
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-black">→</span>
                  <span className="text-lg font-mono">Only final exam matters</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-black">→</span>
                  <span className="text-lg font-mono">Memorization over understanding</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-black">→</span>
                  <span className="text-lg font-mono">One number defines you</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-black">→</span>
                  <span className="text-lg font-mono">No feedback on improvement</span>
                </li>
              </ul>
            </div>

            {/* Holistic */}
            <div className="comparison-col p-8 border-4 border-green-500 bg-background shadow-[8px_8px_0px_rgba(34,197,94,0.3)]">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                <Check className="w-8 h-8 text-green-500" />
                HOLISTIC GRADING
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-black">→</span>
                  <span className="text-lg font-mono">Continuous assessment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-black">→</span>
                  <span className="text-lg font-mono">Understanding over memory</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-black">→</span>
                  <span className="text-lg font-mono">Multiple dimensions tracked</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-black">→</span>
                  <span className="text-lg font-mono">Growth is celebrated</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What We Measure - bg-background */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">
            WHAT WE ACTUALLY TRACK
          </h2>

          <div ref={trackRef} className="grid md:grid-cols-3 gap-6">
            <div className="track-card p-6 border-4 border-foreground hover:bg-accent hover:text-foreground transition-all duration-300 group shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <Award className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-black mb-3">SKILLS</h3>
              <p className="opacity-90 font-mono">
                Can you actually apply what you learned? That&apos;s what counts.
              </p>
            </div>

            <div className="track-card p-6 border-4 border-foreground hover:bg-accent hover:text-foreground transition-all duration-300 group shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <TrendingUp className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-black mb-3">GROWTH</h3>
              <p className="opacity-90 font-mono">
                How much did you improve? That shows dedication.
              </p>
            </div>

            <div className="track-card p-6 border-4 border-foreground hover:bg-accent hover:text-foreground transition-all duration-300 group shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <Brain className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-black mb-3">UNDERSTANDING</h3>
              <p className="opacity-90 font-mono">
                Do you really get it? Or did you just cram?
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-accent/10 border-4 border-accent">
            <p className="text-xl font-black mb-4">The goal?</p>
            <p className="text-lg font-mono">
              Help you become genuinely skilled. Not just &quot;exam-ready&quot;.
            </p>
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <Waitlist />
    </main>
  )
}
