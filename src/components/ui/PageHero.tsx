'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface PageHeroProps {
  title: string
  subtitle?: string
  variant?: 'default' | 'gradient' | 'pattern'
}

export default function PageHero({ title, subtitle, variant = 'default' }: PageHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
          }
        )
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out',
          }
        )
      }

      // Background elements animation
      if (heroRef.current) {
        const bgElements = heroRef.current.querySelectorAll('.bg-element')
        gsap.fromTo(
          bgElements,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1, // Adjusted from 0 to 1 based on use case, but previous code had opacity: 0 in from, meaning it animated TO current state.
            duration: 1.5,
            stagger: 0.1,
            ease: 'back.out(1.7)',
          }
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const getBackgroundClass = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-br from-accent/10 via-background to-background'
      case 'pattern':
        return 'bg-background'
      default:
        return 'bg-background'
    }
  }

  return (
    <section
      ref={heroRef}
      className={`relative py-24 md:py-32 px-4 overflow-hidden ${getBackgroundClass()}`}
    >
      {/* Background Elements */}
      {variant === 'gradient' && (
        <>
          <div className="bg-element absolute top-10 right-10 w-64 h-64 border-8 border-accent opacity-10 rotate-12" />
          <div className="bg-element absolute bottom-10 left-10 w-96 h-96 bg-accent opacity-5 -rotate-6" />
        </>
      )}

      {variant === 'pattern' && (
        <>
          <div className="bg-element absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent" />
          <div className="bg-element absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent/5 to-transparent" />
        </>
      )}

      {/* Content */}
      <div className="container mx-auto max-w-6xl relative z-10">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
        >
          {title}
        </h1>
        {subtitle && (
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl font-mono"
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
