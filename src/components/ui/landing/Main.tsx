'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Hero from '@/components/ui/landing/Hero'
import Problem from '@/components/ui/landing/Problem'
import Solutions from '@/components/ui/landing/Solution'
import HowItWorks from '@/components/ui/landing/Howitworks'
import SocialProof from '@/components/ui/landing/SocialProof'
import Faq from '@/components/ui/landing/Faq'
import Waitlist from '@/components/ui/landing/Waitlist'

gsap.registerPlugin(ScrollTrigger)

function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <Problem />
      <Solutions />
      <HowItWorks />
      <SocialProof />
      <Faq />
      <Waitlist />
    </main>
  )
}

export default HomePage
