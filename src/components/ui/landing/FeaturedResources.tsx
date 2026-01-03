'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, FileText, Video, BookOpen, Download } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Resource } from '@/payload-types'

gsap.registerPlugin(ScrollTrigger)

interface FeaturedResourcesProps {
  resources: Resource[]
}

const resourceTypeIcons: Record<string, React.ReactNode> = {
  ebook: <BookOpen className="w-6 h-6" />,
  video: <Video className="w-6 h-6" />,
  template: <FileText className="w-6 h-6" />,
  'study-guide': <FileText className="w-6 h-6" />,
  'cheat-sheet': <FileText className="w-6 h-6" />,
  podcast: <Video className="w-6 h-6" />,
  webinar: <Video className="w-6 h-6" />,
}



export function FeaturedResources({ resources }: FeaturedResourcesProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in header
      gsap.fromTo(
        '.resources-header',
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center+=100',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Stagger animation for resource cards
      if (gridRef.current) {
        const cards = gridRef.current.children
        gsap.fromTo(
          cards,
          {
            y: 80,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top center+=100',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (resources.length === 0) return null

  return (
    <div ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="resources-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Learning Resources</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access our curated collection of guides, templates, and tools to accelerate your
            learning
          </p>
        </div>

        {/* Resources Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg group"
          >
            Browse All Resources
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function ResourceCard({ resource }: { resource: Resource }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -8,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const imageUrl =
    typeof resource.thumbnail === 'object' && resource.thumbnail?.url
      ? resource.thumbnail.url
      : null

  const icon = resource.type ? (
    resourceTypeIcons[resource.type] || <FileText className="w-6 h-6" />
  ) : (
    <FileText className="w-6 h-6" />
  )

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={`/resources/${resource.slug}`} className="block">
        {/* Image */}
        {imageUrl && (
          <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
            <Image
              src={imageUrl}
              alt={resource.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Type Badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">{icon}</div>
            <span className="text-sm font-medium text-gray-600 capitalize">
              {resource.type?.replace('-', ' ')}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {resource.title}
          </h3>

          {/* Description */}
          {resource.meta?.description && (
            <p className="text-gray-600 mb-4 line-clamp-3">{resource.meta.description}</p>
          )}

          {/* Download/View Link */}
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-blue-600 font-semibold flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </span>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </Link>
    </div>
  )
}
