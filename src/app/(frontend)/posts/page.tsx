import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1, // depth 1 should be enough for basic populated fields
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      populatedAuthors: true,
      publishedAt: true,
      content: true,
    },
  })

  return (
    <>
      <div className="pb-24 pt-32 md:pt-36">
        <PageClient />

        <div className="container mb-12 px-4">
          <div className="max-w-4xl mx-auto py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/50">
              <div>
                <p className="eyebrow mb-5 flex items-center gap-2.5">
                  <span className="eyebrow-dot" />
                  excentrix blog
                </p>
                <h1 className="display-lg mb-4">Ideas that make capability visible.</h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                  Notes on verification, learning, hiring, and building evidence systems for the AI
                  era.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Verification', 'Learning', 'Hiring', 'Evidence'].map((topic) => (
                  <button
                    key={topic}
                    className="px-5 py-2 rounded-full border border-border hover:border-foreground transition-colors text-sm font-medium"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container mb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <PageRange
              collection="posts"
              currentPage={posts.page}
              limit={12}
              totalDocs={posts.totalDocs}
            />
          </div>
        </div>

        <CollectionArchive posts={posts.docs} />

        <div className="container mt-12 px-4">
          <div className="max-w-4xl mx-auto border-t border-border pt-8">
            {posts.totalPages > 1 && posts.page && (
              <Pagination page={posts.page} totalPages={posts.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: {
      absolute: 'Excentrix Blog — Verification, learning and evidence systems',
    },
    description:
      'Notes from Excentrix on proof-of-work verification, adaptive learning, hiring signal and evidence systems for the AI era.',
  }
}
