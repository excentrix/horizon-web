'use client'

import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { ArrowUpRight } from 'lucide-react'

/**
 * VELO entry CTA. For v1 this captures intent into the existing waitlist
 * collection (tagged via name), ahead of the live "paste a repo" flow.
 */
export function VeloStart() {
  const [email, setEmail] = useState('')
  const [repo, setRepo] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: email.split('@')[0],
          // Stash the repo + source in the college field until VELO has its own collection.
          college: repo ? `VELO:${repo}` : 'VELO',
        }),
      })

      if (!res.ok) throw new Error('Something went wrong')

      setStatus('done')
      setMessage("You're in. We'll email you the moment your verification slot opens.")
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EC5B13', '#5858CC', '#FAEDCD'],
      })
    } catch {
      setStatus('error')
      setMessage('Could not reach the server. Try again in a moment.')
    }
  }

  return (
    <section id="start" className="bg-ink py-28 text-cream md:py-36">
      <div className="container max-w-3xl text-center">
        <p className="eyebrow mb-6 flex items-center justify-center gap-2.5 text-cream/70">
          <span className="eyebrow-dot" />
          start free
        </p>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-cream md:text-5xl">
          Verify your first project.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-balance text-lg leading-relaxed text-cream/70">
          Drop your email and the repo you’re proudest of. We’ll open your interrogation slot and
          send you a shareable, verifiable proof-of-work credential.
        </p>

        {status === 'done' ? (
          <p className="mx-auto mt-12 max-w-md font-mono text-sm text-cream">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-12 flex max-w-xl flex-col gap-3">
            <input
              type="url"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              placeholder="https://github.com/you/your-project"
              className="hz-input w-full rounded-xl border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40"
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="hz-input w-full flex-1 rounded-xl border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary btn-lg shrink-0 disabled:opacity-60"
              >
                {status === 'loading' ? 'Submitting…' : 'Get my slot'}
                <ArrowUpRight className="size-5" />
              </button>
            </div>
            {message && status === 'error' && (
              <p className="mt-1 font-mono text-xs text-cream/60">{message}</p>
            )}
            <p className="mt-2 font-mono text-xs text-cream/50">
              Free for your first verification · No card required
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
