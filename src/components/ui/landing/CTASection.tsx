'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center+=100',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Floating animation for sparkles
      gsap.to('.sparkle', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={contentRef}
          className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>

          {/* Floating Elements */}
          <div className="absolute top-10 left-10 sparkle">
            <Sparkles className="w-8 h-8 text-yellow-300" />
          </div>
          <div className="absolute top-20 right-20 sparkle">
            <Sparkles className="w-6 h-6 text-pink-300" />
          </div>
          <div className="absolute bottom-20 left-20 sparkle">
            <Sparkles className="w-10 h-10 text-blue-300" />
          </div>

          {/* Content */}
          <div className="relative px-8 py-20 md:px-16 md:py-24 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of students who are already achieving their goals with our platform
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/resources"
                className="group inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all border border-white/20"
              >
                See Success Stories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
