import React from 'react'
import { Metadata } from 'next'
import Waitlist from '@/components/ui/landing/Waitlist'

export const metadata: Metadata = {
  title: 'Holistic Grading | Excentrix',
  description: 'Move beyond just grades. Our holistic grading system evaluates your skills, projects, and potential.',
}

export default function HolisticGradingPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">Holistic Grading</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl">
          Your CGPA doesn&apos;t tell the whole story. We evaluate you on what actually matters to employers and the world.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-4">Skill-Based Assessment</h3>
            <p className="text-lg text-muted-foreground">
              We track your proficiency in real-world skills like coding, problem-solving, and communication, not just your ability to memorize.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Project Portfolio</h3>
            <p className="text-lg text-muted-foreground">
              Your projects are your proof of work. Our system highlights your practical achievements and contributions.
            </p>
          </div>
        </div>

        <Waitlist />
      </div>
    </main>
  )
}
