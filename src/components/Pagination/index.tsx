'use client'
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/utilities/ui'
import React from 'react'

export const Pagination = ({
  className,
  page,
  totalPages,
}: {
  className?: string
  page: number
  totalPages: number
}) => {
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  return (
    <div className={cn('my-12', className)}>
      <PaginationComponent>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={hasPrevPage ? `/posts/page/${page - 1}` : '#'}
              aria-disabled={!hasPrevPage}
              tabIndex={!hasPrevPage ? -1 : undefined}
              className={!hasPrevPage ? 'pointer-events-none opacity-50' : undefined}
            />
          </PaginationItem>

          {hasExtraPrevPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {hasPrevPage && (
            <PaginationItem>
              <PaginationLink href={`/posts/page/${page - 1}`}>{page - 1}</PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink isActive href={`/posts/page/${page}`}>
              {page}
            </PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationLink href={`/posts/page/${page + 1}`}>{page + 1}</PaginationLink>
            </PaginationItem>
          )}

          {hasExtraNextPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href={hasNextPage ? `/posts/page/${page + 1}` : '#'}
              aria-disabled={!hasNextPage}
              tabIndex={!hasNextPage ? -1 : undefined}
              className={!hasNextPage ? 'pointer-events-none opacity-50' : undefined}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  )
}
