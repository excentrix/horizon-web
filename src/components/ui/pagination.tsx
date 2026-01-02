import React from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // Show only a subset of pages
  const visiblePages = pages.filter((page) => {
    if (page === 1 || page === totalPages) return true
    if (page >= currentPage - 1 && page <= currentPage + 1) return true
    return false
  })

  return (
    <nav className="flex justify-center items-center gap-2">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
          Previous
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex gap-2">
        {visiblePages.map((page, index) => {
          const prevPage = visiblePages[index - 1]
          const showEllipsis = prevPage && page - prevPage > 1

          return (
            <React.Fragment key={page}>
              {showEllipsis && <span className="px-4 py-2 text-gray-500">...</span>}
              <Link
                href={`${baseUrl}?page=${page}`}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </Link>
            </React.Fragment>
          )
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed">
          Next
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  )
}
