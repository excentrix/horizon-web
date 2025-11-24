import React from 'react'
import { Metadata } from 'next'
import Waitlist from '@/components/ui/landing/Waitlist'

export const metadata: Metadata = {
  title: 'AI Mentor | Excentrix',
  description: 'Your personal AI mentor for engineering success. Get 24/7 guidance, personalized study plans, and instant doubt resolution.',
}

export default function AIMentorPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">AI Mentor</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl">
          Stop struggling with generic advice. Our AI Mentor understands your unique learning style,
          strengths, and weaknesses to guide you through your engineering journey.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-xl font-bold mb-4">24/7 Availability</h3>
            <p>Get answers to your doubts instantly, anytime, anywhere. No more waiting for office hours.</p>
          </div>
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-xl font-bold mb-4">Personalized Roadmap</h3>
            <p>The AI crafts a study plan tailored specifically to your goals and current progress.</p>
          </div>
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-xl font-bold mb-4">Concept Clarity</h3>
            <p>Don&apos;t just memorize. Understand complex engineering concepts with simplified explanations.</p>
          </div>
        </div>

        <Waitlist />
      </div>
    </main>
  )
}
