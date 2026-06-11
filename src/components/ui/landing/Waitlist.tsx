'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CollegeCombobox } from '@/components/ui/CollegeCombobox'
import { joinWaitlist } from '@/app/(frontend)/waitlist/actions'
import confetti from 'canvas-confetti'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Waitlist = () => {
  const router = useRouter()
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const sunRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [college, setCollege] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [alreadyJoined, setAlreadyJoined] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 82%' },
        },
      )

      // The sun rises over the horizon as the section scrolls into view
      gsap.fromTo(
        sunRef.current,
        { yPercent: 88 },
        {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            end: 'center center',
            scrub: 0.6,
          },
        },
      )
    }, sectionRef)

    // Check if user already signed up
    const savedEmail = localStorage.getItem('waitlist_email')
    if (savedEmail) {
      setAlreadyJoined(true)
    }

    // Check URL for referral code
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const ref = urlParams.get('ref')
      if (ref) {
        setReferralCode(ref)
      }
    }

    return () => ctx.revert()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Open a blank tab synchronously to bypass popup blockers
    const whatsappTab = window.open('about:blank', '_blank')

    const formData = new FormData()
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('college', college)
    formData.append('name', email.split('@')[0]) // Fallback name
    if (referralCode) {
      formData.append('referralCode', referralCode)
    }

    try {
      const result = await joinWaitlist(null, formData)

      if (result?.error) {
        throw new Error(result.error)
      }

      if (result?.success && result.user) {
        // Save to localStorage
        localStorage.setItem('waitlist_email', result.user.email)

        // Fire confetti in brand colors
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#EC5B13', '#5858CC', '#FAEDCD'],
        })

        // Redirect the previously opened tab to WhatsApp
        if (whatsappTab) {
          whatsappTab.location.href = 'https://chat.whatsapp.com/BfaSjvXcJhBBw7WTBEH7Vg'
        }

        // Redirect current tab to dashboard after brief delay
        setTimeout(() => {
          router.push('/wishlist')
        }, 1500)
      }
    } catch (err: unknown) {
      if (whatsappTab) whatsappTab.close()
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section
      id="waitlist"
      ref={sectionRef}
      className="grain relative overflow-hidden bg-ink py-28 text-cream md:py-40"
      aria-label="Join the Horizon waitlist"
    >
      {/* Sunrise visual */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          ref={sunRef}
          className="absolute left-1/2 top-[8%] size-[min(110vw,52rem)] -translate-x-1/2 rounded-full opacity-90"
          style={{
            background:
              'radial-gradient(circle at 50% 30%, hsl(32 95% 64% / 0.5) 0%, hsl(var(--hz-energy) / 0.32) 45%, transparent 72%)',
          }}
        />
        <div className="absolute inset-x-0 top-[52%] h-px bg-cream/15" />
      </div>

      <div className="container relative z-10 max-w-3xl">
        <div ref={formRef} className="text-center">
          {alreadyJoined ? (
            <>
              <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-full border border-energy/60 bg-energy/15 text-energy">
                <Check className="size-7" strokeWidth={2.5} />
              </div>
              <h2 className="display-lg text-cream">You’re already in.</h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
                Head to your dashboard to track your spot, earn tokens and invite friends —
                referrals move you up the queue.
              </p>
              <button onClick={() => router.push('/wishlist')} className="btn-cream btn-lg mt-10 bg-cream text-ink">
                Go to your dashboard
                <ArrowRight className="size-5" />
              </button>
            </>
          ) : (
            <>
              <p className="eyebrow mb-6 flex items-center justify-center gap-2.5 text-cream/50">
                <span className="eyebrow-dot" />
                early access
              </p>
              <h2 className="display-lg text-cream">
                Be first over
                <br />
                the horizon.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
                Join the waitlist for early access — and a mentor who finally knows you.
              </p>

              <form onSubmit={handleSubmit} className="mx-auto mt-12 max-w-xl text-left">
                <div className="flex flex-col gap-3.5">
                  <label className="sr-only" htmlFor="waitlist-email">
                    Email address
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    disabled={isLoading}
                    className="field-dark"
                  />

                  <label className="sr-only" htmlFor="waitlist-phone">
                    Phone number
                  </label>
                  <input
                    id="waitlist-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    required
                    disabled={isLoading}
                    className="field-dark"
                  />

                  <div className="flex flex-col gap-3.5 md:flex-row">
                    <div className="flex-1">
                      <CollegeCombobox value={college} onChange={setCollege} placeholder="Select your college" />
                    </div>
                    <div className="flex-1">
                      <label className="sr-only" htmlFor="waitlist-referral">
                        Referral code (optional)
                      </label>
                      <input
                        id="waitlist-referral"
                        type="text"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value)}
                        placeholder="Referral code (optional)"
                        disabled={isLoading}
                        className="field-dark"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn mt-2 h-14 bg-energy px-8 text-base font-semibold text-white hover:brightness-110 active:scale-[0.99]"
                    style={{ boxShadow: '0 12px 32px -12px hsl(var(--hz-energy) / 0.6)' }}
                  >
                    {isLoading ? 'Joining…' : 'Join the waitlist'}
                    {!isLoading && <ArrowUpRight className="size-5" />}
                  </button>
                </div>

                {error && (
                  <p role="alert" className="mt-4 text-center text-sm text-red-400">
                    {error}
                  </p>
                )}

                <p className="mt-5 text-center font-mono text-xs text-cream/45">
                  No spam. Just launch updates and early access.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Waitlist
