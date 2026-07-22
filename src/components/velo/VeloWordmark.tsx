import React from 'react'
import { cn } from '@/utilities/ui'
import { HorizonMark } from '@/components/Logo/HorizonLogo'

/**
 * VELO lockup: the shared Horizon sun mark + the uppercase VELO wordmark, followed by
 * the "by excentrix" byline for context. VELO uses the same brand mark as Horizon
 * (one identity); only the wordmark differs. Pass showByline={false} to drop the tag.
 */
export function VeloWordmark({
  className,
  markClassName,
  textClassName,
  bylineClassName,
  showByline = true,
}: {
  className?: string
  markClassName?: string
  textClassName?: string
  bylineClassName?: string
  showByline?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <HorizonMark className={cn('size-7', markClassName)} />
      <span className="inline-flex items-baseline gap-2">
        <span
          className={cn(
            'font-display text-xl font-semibold uppercase leading-none tracking-tight text-ink',
            textClassName,
          )}
        >
          VELO
        </span>
        {showByline && (
          <span
            className={cn(
              'font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground',
              bylineClassName,
            )}
          >
            by excentrix
          </span>
        )}
      </span>
    </span>
  )
}
