'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const interestOptions = [
  'VELO hiring pilot',
  'VELO college pilot',
  'Horizon learning pilot',
  'Evidence system partnership',
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function PilotSignupForm() {
  const [state, setState] = useState<FormState>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('submitting')
    setMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/pilot-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await response.json().catch(() => ({}))) as { message?: string }

      if (!response.ok) {
        throw new Error(data.message || 'Could not send the pilot request.')
      }

      form.reset()
      setState('success')
      setMessage("Pilot request sent. We'll reply from hello@excentrix.tech.")
    } catch (error) {
      setState('error')
      setMessage(error instanceof Error ? error.message : 'Could not send the pilot request.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-label="Pilot signup form">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-cream/55">Name</span>
          <input
            name="name"
            required
            autoComplete="name"
            className="field-dark"
            placeholder="Your name"
          />
        </label>
        <label className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-cream/55">
            Work email
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="field-dark"
            placeholder="you@company.com"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-cream/55">
            Organization
          </span>
          <input
            name="organization"
            autoComplete="organization"
            className="field-dark"
            placeholder="College, team, or company"
          />
        </label>
        <label className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-cream/55">Role</span>
          <input
            name="role"
            autoComplete="organization-title"
            className="field-dark"
            placeholder="Founder, recruiter, dean..."
          />
        </label>
      </div>

      <label className="space-y-2 block">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-cream/55">
          Pilot focus
        </span>
        <select name="interest" required defaultValue="" className="field-dark appearance-none">
          <option value="" disabled>
            Choose a pilot
          </option>
          {interestOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2 block">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-cream/55">Context</span>
        <textarea
          name="context"
          className="field-dark h-32 resize-none py-4 leading-relaxed"
          placeholder="What are you trying to verify, teach, hire for, or pilot?"
        />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="btn-cream btn-lg w-full sm:w-auto disabled:pointer-events-none disabled:opacity-65"
        >
          {state === 'submitting' ? 'Sending...' : 'Request pilot'}
          {state === 'success' ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <ArrowRight className="size-5" />
          )}
        </button>
        {message ? (
          <p
            className={`text-sm leading-relaxed ${state === 'error' ? 'text-red-200' : 'text-cream/70'}`}
            role={state === 'error' ? 'alert' : 'status'}
          >
            {message}
          </p>
        ) : (
          <p className="text-sm leading-relaxed text-cream/45">
            Sent to hello@excentrix.tech
          </p>
        )}
      </div>
    </form>
  )
}
