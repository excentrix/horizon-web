'use client'

import type { ReactElement } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PilotSignupForm } from '@/components/excentrix/PilotSignupForm'

const colcordPilotOptions = [
  'Colcord university pilot',
  'Colcord student lifecycle pilot',
  'Colcord campus operations pilot',
  'Colcord demo / partnership',
]

export function ColcordPilotDialog({
  children,
  defaultInterest = 'Colcord university pilot',
}: {
  children: ReactElement
  defaultInterest?: string
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        data-theme="dark"
        className="grain max-h-[92svh] overflow-y-auto border-cream/20 bg-[hsl(var(--hz-ink))] p-6 text-cream shadow-2xl sm:max-w-3xl sm:rounded-2xl md:p-8"
      >
        <DialogHeader className="mb-3 pr-8">
          <p className="eyebrow mb-3 flex items-center gap-2.5 text-cream/60">
            <span className="eyebrow-dot" />
            colcord pilot
          </p>
          <DialogTitle className="font-display text-3xl font-semibold tracking-tight text-cream md:text-4xl">
            Tell us about the campus you want to connect.
          </DialogTitle>
          <DialogDescription className="max-w-2xl text-base leading-relaxed text-cream/70">
            This goes directly to hello@excentrix.tech and copies Sid.
          </DialogDescription>
        </DialogHeader>
        <PilotSignupForm
          options={colcordPilotOptions}
          defaultInterest={defaultInterest}
          contextPlaceholder="What systems, stakeholders, or campus workflows would you want Colcord to unify first?"
        />
      </DialogContent>
    </Dialog>
  )
}
