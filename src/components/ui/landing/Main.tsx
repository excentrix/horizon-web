'use client'
// import { getPayload } from 'payload'
// import config from '@payload-config'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Solutions from '@/components/ui/landing/Solution'
import HowItWorks from '@/components/ui/landing/Howitworks'
import Waitlist from '@/components/ui/landing/Waitlist'
import Problem from '@/components/ui/landing/Problem'
import Hero from '@/components/ui/landing/Hero'

gsap.registerPlugin(ScrollTrigger)
import SocialProof from '@/components/ui/landing/SocialProof'

// Main App Component
function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* <Navigation /> */}
      <Hero />
      <Problem />
      <Solutions />
      <HowItWorks />
      {/* <SocialProof /> */}
      <Waitlist />
      {/* <Footer /> */}
    </div>
  )
}

export default HomePage
