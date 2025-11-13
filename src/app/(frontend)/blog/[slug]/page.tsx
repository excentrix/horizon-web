import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/components/RenderBlocks'
import { formatDate } from '@/utilities/formatDate'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import type { Post } from '@/payload-types'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: params.slug,
      },
    },
    limit: 1,
  })

  const post = posts.docs[0]

  if (!post) {
    notFound()
  }

  // Fetch related posts
  const relatedPosts = await payload.find({
    collection: 'posts',
    where: {
      id: {
        not_in: [post.id],
      },
      categories: {
        in: post.categories?.map((cat) => (typeof cat === 'string' ? cat : cat.id)) || [],
      },
      _status: {
        equals: 'published',
      },
    },
    limit: 3,
    sort: '-publishedAt',
  })

  const heroImageUrl =
    typeof post.heroImage === 'object' && post.heroImage?.url ? post.heroImage.url : null

  return (
    <article className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
      </div>

      {/* Hero Image */}
      {heroImageUrl && (
        <div className="relative w-full h-96 md:h-[500px] mt-8">
          <Image src={heroImageUrl} alt={post.title} fill className="object-cover" priority />
        </div>
      )}

      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.categories.map((category) => {
              const cat = typeof category === 'object' ? category : null
              return cat ? (
                <Link
                  key={cat.id}
                  href={`/blog?category=${cat.id}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1 rounded-full"
                >
                  {cat.title}
                </Link>
              ) : null
            })}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-12 pb-12 border-b">
          {post.publishedAt && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
          )}

          {post.populatedAuthors && post.populatedAuthors.length > 0 && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.populatedAuthors.map((author) => author.name).join(', ')}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{calculateReadTime(post.content)} min read</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <RenderBlocks blocks={post.content} />
        </div>

        {/* Author Bio */}
        {post.populatedAuthors && post.populatedAuthors.length > 0 && (
          <div className="mt-12 pt-12 border-t">
            <h3 className="text-xl font-bold mb-6">About the Author</h3>
            <div className="space-y-4">
              {post.populatedAuthors.map((author, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                    {author.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{author.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Posts */}
      {relatedPosts.docs.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.docs.map((relatedPost) => (
                <RelatedPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

// Helper function to calculate read time
function calculateReadTime(content: any): number {
  if (!content) return 5

  const text = JSON.stringify(content)
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

// Related Post Card Component
function RelatedPostCard({ post }: { post: Post }) {
  const imageUrl =
    typeof post.meta?.image === 'object' && post.meta.image?.url ? post.meta.image.url : null

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        {post.meta?.description && (
          <p className="text-gray-600 text-sm line-clamp-2">{post.meta.description}</p>
        )}
      </div>
    </Link>
  )
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: params.slug,
      },
    },
    limit: 1,
  })

  const post = posts.docs[0]

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const imageUrl =
    typeof post.meta?.image === 'object' && post.meta.image?.url ? post.meta.image.url : null

  return {
    title: post.meta?.title || post.title,
    description: post.meta?.description || post.title,
    openGraph: {
      title: post.meta?.title || post.title,
      description: post.meta?.description || undefined,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: 'article',
      publishedTime: post.publishedAt || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta?.title || post.title,
      description: post.meta?.description || undefined,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    limit: 1000,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return posts.docs.map((post) => ({
    slug: post.slug,
  }))
}
