import React from 'react'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Terms of Service | Excentrix',
  description: 'Terms of Service for Excentrix.',
}

export default function TermsPage() {
  return (
    <main className="bg-background pb-16 pt-32 md:pt-40">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="display-md mb-8">Terms of Service</h1>
        <div className="max-w-none leading-relaxed text-foreground/85 space-y-2">
          <p className="mb-8 font-mono text-sm text-muted-foreground">
            Last Updated: November 2025
          </p>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Excentrix, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink mb-4">2. Use of Service</h2>
            <p>
              You agree to use Excentrix only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink mb-4">3. Intellectual Property</h2>
            <p>
              The content, features, and functionality of Excentrix are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink mb-4">4. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
