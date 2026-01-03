'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { formatDate } from '@/utilities/formatDate'
import type { Post } from '@/payload-types'

gsap.registerPlugin(ScrollTrigger)

interface LatestPostsProps {
  posts: Post[]
}

export function LatestPosts({ posts }: LatestPostsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const postsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in header
      gsap.fromTo(
        '.posts-header',
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

      // Stagger animation for posts
      if (postsRef.current) {
        const postCards = postsRef.current.children
        gsap.fromTo(
          postCards,
          {
            x: -50,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: postsRef.current,
              start: 'top center+=100',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (posts.length === 0) return null

  return (
    <div ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="posts-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest from the Blog
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tips, insights, and strategies to help you succeed
          </p>
        </div>

        {/* Posts Grid */}
        <div ref={postsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg group"
          >
            View All Posts
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function PostCard({ post }: { post: Post }) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const imageUrl =
    typeof post.meta?.image === 'object' && post.meta.image?.url ? post.meta.image.url : null

  return (
    <Link
      ref={cardRef}
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
    >
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.slice(0, 2).map((category) => {
              const cat = typeof category === 'object' ? category : null
              return cat ? (
                <span
                  key={cat.id}
                  className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full"
                >
                  {cat.title}
                </span>
              ) : null
            })}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Description */}
        {post.meta?.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">{post.meta.description}</p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-500 pt-4 border-t">
          {post.publishedAt && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
