'use client'
import { useEffect, useRef, useState } from 'react'

import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// Waitlist Section
const Waitlist = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Success animation
    gsap.to(formRef.current, {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        setSubmitted(true)
        gsap.from('.success-message', {
          scale: 0,
          rotation: 360,
          duration: 0.8,
          ease: 'back.out(2)',
        })
      },
    })
  }

  return (
    <section
      id="waitlist"
      ref={sectionRef}
      className="py-24 md:py-32 px-4 bg-foreground text-background relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-10 right-10 w-64 h-64 border-8 border-background opacity-10 rotate-12" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-background opacity-5 -rotate-6" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div ref={formRef} className="text-center">
          {!submitted ? (
            <>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
                READY TO
                <br />
                BREAK FREE?
              </h2>

              <p className="text-xl md:text-2xl font-mono mb-12 max-w-2xl mx-auto">
                Join the waitlist and be among the first to experience learning that actually works.
              </p>

              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    className="flex-1 h-16 px-6 border-4 border-background bg-foreground text-background font-mono text-lg placeholder:text-background placeholder:opacity-50 focus:outline-none focus:ring-4 focus:ring-accent"
                  />
                  <button
                    type="submit"
                    className="h-16 px-12 border-4 border-background bg-accent text-foreground font-black text-lg shadow-[8px_8px_0px_hsl(var(--background))] hover:shadow-[4px_4px_0px_hsl(var(--background))] transition-all active:shadow-none active:translate-x-1 active:translate-y-1"
                  >
                    JOIN NOW
                  </button>
                </div>

                <p className="font-mono text-sm opacity-70">
                  No spam. No BS. Just updates on launch and early access.
                </p>
              </form>
            </>
          ) : (
            <div className="success-message">
              <div className="w-32 h-32 mx-auto mb-8 border-4 border-background bg-accent flex items-center justify-center text-7xl">
                ✓
              </div>
              <h3 className="text-4xl md:text-5xl font-black mb-4">YOU'RE IN!</h3>
              <p className="text-xl font-mono">
                We'll be in touch soon. Get ready to learn differently.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Waitlist
