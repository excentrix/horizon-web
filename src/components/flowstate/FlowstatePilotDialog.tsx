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

const flowstatePilotOptions = [
  'Flowstate educator pilot',
  'Flowstate training pilot',
  'Flowstate institutional pilot',
  'Flowstate demo / partnership',
]

export function FlowstatePilotDialog({
  children,
  defaultInterest = 'Flowstate educator pilot',
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
          <p className="eyebrow mb-3 flex items-center gap-2.5 text-cream/55">
            <span className="eyebrow-dot" />
            flowstate pilot
          </p>
          <DialogTitle className="font-display text-3xl font-semibold tracking-tight text-cream md:text-4xl">
            Tell us about the room you want to run.
          </DialogTitle>
          <DialogDescription className="max-w-2xl text-base leading-relaxed text-cream/65">
            This goes directly to hello@excentrix.tech and copies Sid.
          </DialogDescription>
        </DialogHeader>
        <PilotSignupForm
          options={flowstatePilotOptions}
          defaultInterest={defaultInterest}
          contextPlaceholder="What kind of presentation, class, training session, or audience workflow do you want to pilot?"
        />
      </DialogContent>
    </Dialog>
  )
}
