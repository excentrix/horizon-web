import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { BlogCard } from '@/components/BlogCard'
import { Pagination } from '@/components/Pagination'

interface BlogPageProps {
  searchParams: {
    page?: string
    category?: string
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const payload = await getPayload({ config })
  const page = parseInt(searchParams.page || '1')
  const limit = 12

  // Build query conditions
  const where: any = {
    _status: {
      equals: 'published',
    },
  }

  if (searchParams.category) {
    where.categories = {
      in: [searchParams.category],
    }
  }

  // Fetch posts
  const posts = await payload.find({
    collection: 'posts',
    where,
    limit,
    page,
    sort: '-publishedAt',
  })

  // Fetch categories for filter
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Tips, insights, and strategies to help you succeed in your academic journey
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <a
              href="/blog"
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                !searchParams.category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Posts
            </a>
            {categories.docs.map((category) => (
              <a
                key={category.id}
                href={`/blog?category=${category.id}`}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  searchParams.category === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.docs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.docs.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {posts.totalPages > 1 && (
              <Pagination
                currentPage={posts.page || 1}
                totalPages={posts.totalPages}
                baseUrl="/blog"
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: 'Blog | Horizon',
    description: 'Tips, insights, and strategies for academic success',
  }
}
