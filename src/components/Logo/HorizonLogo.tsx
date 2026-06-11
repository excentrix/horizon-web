import React, { useId } from 'react'
import { cn } from '@/utilities/ui'

/**
 * Horizon brand mark — a sun rising over the horizon line.
 * Drawn with a mask so the horizon band is transparent and the mark
 * sits cleanly on any background. Colored via `currentColor`.
 */
export function HorizonMark({ className }: { className?: string }) {
  const id = useId()
  const maskId = `hz-mark-${id}`

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-8', className)}
      aria-hidden="true"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <circle cx="50" cy="50" r="46" fill="white" />
          <path d="M-8 70 Q50 24 108 70 L108 52 Q50 6 -8 52 Z" fill="black" />
        </mask>
      </defs>
      <rect width="100" height="100" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  )
}

/**
 * Full lockup: mark + lowercase wordmark set in the display face.
 */
export function HorizonWordmark({
  className,
  markClassName,
  textClassName,
}: {
  className?: string
  markClassName?: string
  textClassName?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <HorizonMark className={cn('size-7', markClassName)} />
      <span
        className={cn(
          'font-display text-[1.45rem] font-semibold lowercase leading-none tracking-tight',
          textClassName,
        )}
      >
        horizon
      </span>
    </span>
  )
}
