import { cn } from '@/utilities/ui'

export function ColcordMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative inline-flex size-8 items-center justify-center text-cream',
        className,
      )}
    >
      <span className="absolute h-6 w-3.5 rounded-full border-2 border-current" />
      <span className="absolute h-6 w-3.5 translate-x-2 rounded-full border-2 border-current" />
      <span className="absolute h-3 w-3 bg-current" />
    </span>
  )
}

export function ColcordWordmark({
  className,
  markClassName,
  textClassName,
}: {
  className?: string
  markClassName?: string
  textClassName?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <ColcordMark className={markClassName} />
      <span className={cn('font-display text-2xl font-semibold tracking-tight', textClassName)}>
        Colcord
      </span>
    </span>
  )
}
