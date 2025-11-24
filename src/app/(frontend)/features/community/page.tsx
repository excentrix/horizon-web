import React from 'react'
import { Metadata } from 'next'
import Waitlist from '@/components/ui/landing/Waitlist'

export const metadata: Metadata = {
  title: 'Community | Excentrix',
  description: 'Join a thriving community of ambitious engineering students. Collaborate, compete, and grow together.',
}

export default function CommunityPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">Community</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl">
          You are the average of the five people you spend the most time with. Surround yourself with the best.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-xl font-bold mb-4">Peer Learning</h3>
            <p>Learn from your peers. Discuss problems, share resources, and grow together.</p>
          </div>
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-xl font-bold mb-4">Hackathons & Events</h3>
            <p>Participate in exclusive hackathons and events to test your skills and network.</p>
          </div>
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-xl font-bold mb-4">Alumni Network</h3>
            <p>Connect with successful seniors and alumni who can guide you in your career.</p>
          </div>
        </div>

        <Waitlist />
      </div>
    </main>
  )
}
