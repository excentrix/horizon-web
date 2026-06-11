import React from 'react'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Privacy Policy | Excentrix',
  description: 'Privacy Policy for Excentrix. Compliant with the Digital Personal Data Protection (DPDP) Act, 2023.',
}

export default function PrivacyPage() {
  return (
    <main className="bg-background pb-16 pt-32 md:pt-40">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="display-md mb-8">Privacy Policy</h1>
        <div className="max-w-none leading-relaxed text-foreground/85 space-y-2">
          <p className="mb-8 font-mono text-sm text-muted-foreground">
            Last Updated: November 2025
          </p>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink mb-4">1. Introduction</h2>
            <p>
              Excentrix (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink mb-4">2. Compliance with DPDP Act, 2023</h2>
            <p>
              We are fully compliant with the Digital Personal Data Protection (DPDP) Act, 2023 of India. We process your personal data in a lawful, fair, and transparent manner.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink mb-4">3. Data We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal identification information (Name, email address, phone number, etc.)</li>
              <li>Academic information (College, year of study, branch, etc.)</li>
              <li>Usage data (How you interact with our platform)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink mb-4">4. How We Use Your Data</h2>
            <p>
              We use your data to provide and improve our services, personalize your experience, and communicate with you. We do not sell your data to third parties.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
