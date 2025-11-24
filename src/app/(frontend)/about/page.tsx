import React from 'react'
import { Metadata } from 'next'
import Waitlist from '@/components/ui/landing/Waitlist'

export const metadata: Metadata = {
  title: 'About Us | Excentrix',
  description: 'Built by students, for students. We are on a mission to revolutionize engineering education in India.',
}

export default function AboutPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">About Us</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl">
          We are a team of passionate students and engineers who believe that the current education system is broken. We&apos;re here to fix it.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              To empower every engineering student in India with the tools, guidance, and community they need to reach their full potential, regardless of their college tier.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg text-muted-foreground">
              A world where education is personalized, practical, and accessible to all. Where your skills matter more than your degree.
            </p>
          </div>
        </div>

        <Waitlist />
      </div>
    </main>
  )
}
