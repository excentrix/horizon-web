import { HorizonMark } from '@/components/Logo/HorizonLogo'
import { cn } from '@/utilities/ui'

export function FlowstateWordmark({
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
            'font-display text-[1.45rem] font-semibold lowercase leading-none tracking-tight text-ink',
            textClassName,
          )}
        >
          flowstate
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
