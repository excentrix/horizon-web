import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { HorizonMark } from '@/components/Logo/HorizonLogo'

interface ComingSoonProps {
  eyebrow: string
  title: string
  description: string
}

/**
 * Branded placeholder for pages that are still over the horizon.
 */
export function ComingSoon({ eyebrow, title, description }: ComingSoonProps) {
  return (
    <main className="grain relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-4 py-32 text-center">
      <HorizonMark className="mb-8 size-12 text-energy" />
      <p className="eyebrow mb-5 flex items-center justify-center gap-2.5">
        <span className="eyebrow-dot" />
        {eyebrow}
      </p>
      <h1 className="display-lg max-w-3xl">{title}</h1>
      <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
        still over the horizon — launching soon
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/#waitlist" className="btn-primary btn-lg">
          Join the waitlist
          <ArrowUpRight className="size-5" />
        </Link>
        <Link href="/" className="btn-ghost btn-lg">
          Back to home
        </Link>
      </div>
    </main>
  )
}
