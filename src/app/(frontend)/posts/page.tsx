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
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <>
      <div className="pt-24 pb-24">
        <PageClient />
        
        {/* Hero Section */}
        <div className="container mb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
              KNOWLEDGE HUB
            </h1>
            <p className="text-xl md:text-2xl opacity-80 font-mono mb-8">
              Real insights. No fluff. Written by students who actually know what they&apos;re talking about.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="px-6 py-3 border-4 border-foreground bg-accent text-foreground font-black">
                GUIDES
              </div>
              <div className="px-6 py-3 border-4 border-foreground bg-background font-black">
                TUTORIALS
              </div>
              <div className="px-6 py-3 border-4 border-foreground bg-background font-black">
                CAREER ADVICE
              </div>
            </div>
          </div>
        </div>

        <div className="container mb-8">
          <PageRange
            collection="posts"
            currentPage={posts.page}
            limit={12}
            totalDocs={posts.totalDocs}
          />
        </div>

        <CollectionArchive posts={posts.docs} />

        <div className="container">
          {posts.totalPages > 1 && posts.page && (
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          )}
        </div>
      </div>
      
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Knowledge Hub | Excentrix`,
    description: 'Real insights for engineering students. No BS. Just actionable advice from people who&apos;ve been there.',
  }
}
