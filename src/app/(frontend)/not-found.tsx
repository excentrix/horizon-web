import Link from 'next/link'
import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { HorizonMark } from '@/components/Logo/HorizonLogo'

export default function NotFound() {
  return (
    <main className="grain relative flex min-h-svh flex-col items-center justify-center bg-background px-4 py-32 text-center">
      <HorizonMark className="mb-8 size-12 text-energy" />
      <p className="eyebrow mb-5">404</p>
      <h1 className="display-lg">Off the map.</h1>
      <p className="mt-5 max-w-md text-balance text-lg leading-relaxed text-muted-foreground">
        This page is beyond the horizon — it doesn’t exist, or it moved somewhere new.
      </p>
      <Link href="/" className="btn-primary btn-lg mt-10">
        Back to home
        <ArrowUpRight className="size-5" />
      </Link>
    </main>
  )
}
