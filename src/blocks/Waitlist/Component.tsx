'use client'

import React, { useState } from 'react'
import type { WaitlistBlock } from '@/payload-types'
import { Loader2, Copy, Check } from 'lucide-react'

type Props = {
  className?: string
} & WaitlistBlock

export const WaitlistComponent: React.FC<Props> = ({ title, description }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [referralLink, setReferralLink] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      })

      const data = await res.json()
      console.log('Waitlist API response:', data)

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      // Assuming the API returns the referral code
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      console.log('Setting referral link with code:', data.referralCode)
      setReferralLink(`${origin}?ref=${data.referralCode}`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Waitlist error:', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (referralLink) {
    return (
      <div className="max-w-md mx-auto p-6 bg-card rounded-lg border shadow-sm text-center">
        <h3 className="text-2xl font-bold mb-4">You&apos;re on the list!</h3>
        <p className="text-muted-foreground mb-6">
          Share your unique link to move up the queue.
        </p>
        
        <div className="flex items-center gap-2 p-2 bg-muted rounded-md mb-4">
          <code className="flex-1 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
            {referralLink}
          </code>
          <button 
            onClick={copyToClipboard}
            className="p-2 hover:bg-accent/20 rounded transition-colors"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-card rounded-lg border shadow-sm">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">{title}</h3>
        {description && <p className="text-muted-foreground mt-2">{description}</p>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            id="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded-md bg-background"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-md bg-background"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button 
          type="submit" 
          className="w-full p-2 bg-primary text-primary-foreground rounded-md flex items-center justify-center disabled:opacity-50" 
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Join Waitlist
        </button>
      </form>
    </div>
  )
}
