import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/utilities/formatDate'
import { Calendar, Clock } from 'lucide-react'
import type { Post } from '@/payload-types'

interface BlogCardProps {
  post: Post
}

export function BlogCard({ post }: BlogCardProps) {
  const imageUrl =
    typeof post.meta?.image === 'object' && post.meta.image?.url ? post.meta.image.url : null

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
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
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {post.publishedAt && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>5 min read</span>
          </div>
        </div>

        {/* Author */}
        {post.populatedAuthors && post.populatedAuthors.length > 0 && (
          <div className="mt-4 pt-4 border-t flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
              {post.populatedAuthors[0].name?.charAt(0) || 'U'}
            </div>
            <span className="text-sm text-gray-700">{post.populatedAuthors[0].name}</span>
          </div>
        )}
      </div>
    </Link>
  )
}
