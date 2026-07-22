import { HorizonMark } from '@/components/Logo/HorizonLogo'
import { cn } from '@/utilities/ui'

export function ExcentrixWordmark({
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
      <HorizonMark className={cn('size-7 text-energy', markClassName)} />
      <span
        className={cn(
          'font-display text-[1.45rem] font-semibold lowercase leading-none tracking-tight',
          textClassName,
        )}
      >
        excentrix
      </span>
    </span>
  )
}
