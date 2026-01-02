import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
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
    <div className="pt-24 pb-24">
      <PageClient />

      <div className="container mb-12 px-4">
        <div className="max-w-4xl mx-auto py-12 border-b border-border/50">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Posts <span className="text-muted-foreground text-2xl ml-2 font-normal">Page {pageNumber}</span>
          </h1>
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
          {posts?.page && posts?.totalPages > 1 && (
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Posts - Page ${pageNumber || ''} | Horizon`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
