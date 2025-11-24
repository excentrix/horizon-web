import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Excentrix',
  description: 'Privacy Policy for Excentrix. Compliant with the Digital Personal Data Protection (DPDP) Act, 2023.',
}

export default function PrivacyPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Last Updated: November 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p>
              Excentrix (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Compliance with DPDP Act, 2023</h2>
            <p>
              We are fully compliant with the Digital Personal Data Protection (DPDP) Act, 2023 of India. We process your personal data in a lawful, fair, and transparent manner.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Data We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal identification information (Name, email address, phone number, etc.)</li>
              <li>Academic information (College, year of study, branch, etc.)</li>
              <li>Usage data (How you interact with our platform)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. How We Use Your Data</h2>
            <p>
              We use your data to provide and improve our services, personalize your experience, and communicate with you. We do not sell your data to third parties.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
