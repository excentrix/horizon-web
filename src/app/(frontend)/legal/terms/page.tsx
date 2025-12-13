import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Excentrix',
  description: 'Terms of Service for Excentrix.',
}

export default function TermsPage() {
  return (
    <main className="pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-black">Terms of Service</h1>
        <div className="max-w-none text-black">
          <p className="text-lg text-black mb-8">
            Last Updated: November 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-black">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Excentrix, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-black">2. Use of Service</h2>
            <p>
              You agree to use Excentrix only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-black">3. Intellectual Property</h2>
            <p>
              The content, features, and functionality of Excentrix are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-black">4. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
