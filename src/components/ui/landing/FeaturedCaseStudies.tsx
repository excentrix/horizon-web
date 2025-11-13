'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { CaseStudy } from '@/payload-types'

gsap.registerPlugin(ScrollTrigger)

interface FeaturedCaseStudiesProps {
  caseStudies: CaseStudy[]
}

export function FeaturedCaseStudies({ caseStudies }: FeaturedCaseStudiesProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in section header
      gsap.from('.section-header', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
        },
      })

      // Stagger animation for cards
      if (cardsRef.current) {
        const cards = cardsRef.current.children
        gsap.from(cards, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top center+=100',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (caseStudies.length === 0) return null

  return (
    <div ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="section-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how students are achieving their goals with our comprehensive learning platform
          </p>
        </div>

        {/* Case Studies Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg group"
          >
            View All Case Studies
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const imageUrl =
    typeof caseStudy.heroImage === 'object' && caseStudy.heroImage?.url
      ? caseStudy.heroImage.url
      : null

  return (
    <Link
      ref={cardRef}
      href={`/case-studies/${caseStudy.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform-gpu"
      style={{ perspective: '1000px' }}
    >
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src={imageUrl}
            alt={caseStudy.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          {/* Tags */}
          {caseStudy.industry && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-900 rounded-full">
                {caseStudy.industry}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {caseStudy.title}
        </h3>

        {caseStudy.meta?.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">{caseStudy.meta.description}</p>
        )}

        {/* Results Preview */}
        {caseStudy.results && caseStudy.results.length > 0 && (
          <div className="flex gap-4 pt-4 border-t">
            {caseStudy.results.slice(0, 2).map((result, index) => (
              <div key={index} className="flex-1">
                <div className="text-2xl font-bold text-blue-600">{result.metric}</div>
                <div className="text-sm text-gray-600">{result.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
          Read More
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
