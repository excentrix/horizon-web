'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Category, Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { calculateReadingTime, formatReadingTime } from '@/utilities/readingTime'
import { formatDateTime } from '@/utilities/formatDateTime'

export type CardPostData = {
  slug?: string | null
  categories?: (number | string | Category | { title?: string | null })[] | null
  meta?: {
    title?: string | null
    description?: string | null
    image?: string | number | MediaType | null
  } | null
  title?: string | null
  populatedAuthors?: {
    id?: string | null
    name?: string | null
  }[] | null
  publishedAt?: string | null
  content?: Record<string, unknown> | null
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, title: titleFromProps } = props

  const { slug, categories, meta, title, populatedAuthors, publishedAt, content } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  // Reading time
  const readingTimeSeconds = content ? calculateReadingTime(JSON.stringify(content)) : 0
  const readingTimeString = formatReadingTime(readingTimeSeconds)

  const authorName = populatedAuthors?.[0]?.name || 'Anonymous'
  const authorInitials = authorName ? authorName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : 'A'

  const hasImage = metaImage && typeof metaImage !== 'string'

  return (
    <article
      className={cn(
        'group relative flex flex-col md:flex-row gap-6 md:gap-10 py-10 border-b border-border/60 last:border-b-0 transition-all duration-500 hover:bg-muted/[0.03] px-4 -mx-4 rounded-2xl overflow-hidden',
        className,
      )}
      ref={card.ref}
    >
      {/* Accent Line on Hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-20" />

      <div className="flex-1 flex flex-col justify-between order-2 md:order-1 relative z-10">
        <div>
          {/* Author Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary/20 flex items-center justify-center text-[10px] font-bold text-accent-foreground border border-border/50 shadow-sm">
              {authorInitials}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold hover:text-primary transition-colors cursor-pointer">
                {authorName}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                {publishedAt ? formatDateTime(publishedAt) : 'Draft'}
              </span>
            </div>
          </div>

          {/* Title and Description */}
          <div className="mb-4">
            <Link className="block group/title" href={href} ref={link.ref}>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 group-hover/title:text-primary transition-all duration-300 leading-tight">
                {titleToUse}
              </h2>
            </Link>
            {description && (
              <p className="text-base text-muted-foreground line-clamp-2 md:line-clamp-3 leading-relaxed font-normal">
                {sanitizedDescription}
              </p>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
            {hasCategories && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">In</span>
                <div className="px-3 py-1 rounded-full bg-muted/50 text-[10px] uppercase font-bold tracking-widest text-muted-foreground border border-border/30 hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
                  {typeof categories[0] === 'object' ? categories[0].title : 'Topic'}
                </div>
              </div>
            )}
            <div className="h-1 w-1 rounded-full bg-border" />
            <span className="text-xs text-muted-foreground font-medium italic">
              {readingTimeString}
            </span>
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Read Story
            </span>
            <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
              <span className="text-sm">→</span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Thumbnail - Only shown if an image exists */}
      {hasImage && (
        <div className="w-full md:w-56 lg:w-64 shrink-0 order-1 md:order-2 relative z-10">
          <div className="aspect-[4/3] md:aspect-square w-full relative rounded-2xl overflow-hidden bg-muted transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-primary/5 group-hover:-translate-y-1">
            <Media
              resource={metaImage}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              fill
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      )}
    </article>
  )
}
