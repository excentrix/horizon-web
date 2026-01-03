import { formatDateTime } from 'src/utilities/formatDateTime'
import { cn } from '@/utilities/ui'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { calculateReadingTime, formatReadingTime } from '@/utilities/readingTime'
import { AccessibilityControls } from '@/components/blog/AccessibilityControls'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title, content } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  // Calculate reading time
  const readingTimeSeconds = content ? calculateReadingTime(JSON.stringify(content)) : 0
  const readingTimeString = formatReadingTime(readingTimeSeconds)

  const hasImage = !!(heroImage && typeof heroImage !== 'string')

  return (
    <div className={cn('relative flex items-end', {
      '-mt-[10.4rem]': hasImage,
      'pt-12 pb-12': !hasImage
    })}>
      <div className={cn('container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] pb-8', {
        'text-white': hasImage,
        'text-foreground': !hasImage,
      })}>
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="uppercase text-sm mb-6 font-bold tracking-widest text-primary">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">{title}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16 mb-8 border-t border-border/20 pt-8">
            {hasAuthors && (
              <div className="flex flex-col gap-1">
                <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground overline decoration-accent decoration-2 pt-1">Author</p>
                <p className="font-bold text-lg">{formatAuthors(populatedAuthors)}</p>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground overline decoration-primary decoration-2 pt-1">Date Published</p>
                <time className="font-bold text-lg" dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
            {/* Reading Time */}
            <div className="flex flex-col gap-1">
              <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground overline decoration-accent decoration-2 pt-1">Read Time</p>
              <p className="font-bold text-lg">{readingTimeString}</p>
            </div>
          </div>

          {/* Accessibility Controls */}
          <div className={cn({
            'text-white': hasImage,
          })}>
            <AccessibilityControls content={content} onImage={hasImage} />
          </div>

        </div>
      </div>
      {hasImage && (
        <div className="absolute inset-0 z-0 min-h-[80vh] select-none">
          <Media fill priority imgClassName="object-cover" resource={heroImage} />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-black/40 to-black/20" />
        </div>
      )}
    </div>
  )
}
