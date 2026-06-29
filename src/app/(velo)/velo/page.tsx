import type { Metadata } from 'next'
import VeloHero from '@/components/velo/VeloHero'
import { VeloTranscript } from '@/components/velo/VeloTranscript'
import { VeloPricing } from '@/components/velo/VeloPricing'
import { VeloStart } from '@/components/velo/VeloStart'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Proof of work, not promises',
  alternates: { canonical: '/' },
}

const steps = [
  {
    n: '01',
    title: 'Point us at your work',
    body: 'Paste a GitHub repo and a one-line claim about what you built. No setup, no installs.',
  },
  {
    n: '02',
    title: 'Liveness check',
    body: 'VELO checks the repository is real, yours, and matches the claim — before a human ever looks.',
  },
  {
    n: '03',
    title: 'Adaptive interrogation',
    body: 'An AI examiner asks 6–10 questions about your own code, probing deeper wherever an answer is vague. You can’t pre-write your way through it.',
  },
  {
    n: '04',
    title: 'A verdict you can share',
    body: 'You get a defensibility score and a public, verifiable proof-of-work credential — the thing that actually belongs on your resume.',
  },
]

const audiences = [
  {
    tag: 'For developers',
    title: 'Stop competing on output anyone can generate.',
    body: 'Earn a credential that says you can defend your work — and share it where it counts.',
    href: '/for/developers',
  },
  {
    tag: 'For hiring teams',
    title: 'Know who actually built it before you spend an interview.',
    body: 'Send your shortlist a five-minute VELO link and get a defensibility verdict back, not another polished resume.',
    href: '/for/hiring',
  },
  {
    tag: 'For colleges',
    title: 'Send graduates into placements with proof, not claims.',
    body: 'Verify a whole cohort and give every student a credential employers can trust.',
    href: '/for/colleges',
  },
]

export default function VeloLanding() {
  return (
    <>
      <VeloHero />

      {/* Problem */}
      <section className="bg-cream/45 py-28 md:py-40">
        <div className="container max-w-4xl">
          <p className="eyebrow mb-10 flex items-center gap-2.5">
            <span className="eyebrow-dot" />
            why velo exists
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            In 2026, a perfect repo proves nothing.
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            <p>
              AI can write the project, polish the README, and pad the resume. Green squares,
              clean commits, a flawless portfolio — all of it is now generatable in an afternoon.
              The signal employers relied on for a decade is dead.
            </p>
            <p className="text-ink">
              What can’t be faked is defending your own work under questions that adapt to your
              answers. That’s the one thing VELO measures — and the one thing that still means
              something.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-background py-28 md:py-36">
        <div className="container">
          <div className="mb-16 grid gap-6 md:grid-cols-2 md:items-end">
            <div>
              <p className="eyebrow mb-5 flex items-center gap-2.5">
                <span className="eyebrow-dot" />
                how it works
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
                Five minutes from repo to credential.
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground md:justify-self-end">
              No gameable test. An adaptive interrogation that goes wherever your answers do.
            </p>
          </div>

          <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="flex flex-col gap-3 bg-background p-7">
                <span className="font-mono text-sm text-energy">{s.n}</span>
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <VeloTranscript />

      {/* For teams / audiences */}
      <section id="teams" className="bg-cream/45 py-28 md:py-36">
        <div className="container">
          <p className="eyebrow mb-12 flex items-center gap-2.5">
            <span className="eyebrow-dot" />
            one engine · three sides
          </p>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
            {audiences.map((a) => (
              <Link
                key={a.tag}
                href={a.href}
                className="group flex flex-col gap-4 bg-background p-8 transition-colors hover:bg-cream/30"
              >
                <span className="font-mono text-xs uppercase tracking-wide text-energy">
                  {a.tag}
                </span>
                <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight text-ink">
                  {a.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                <span className="mt-auto font-mono text-xs text-indigo transition-colors group-hover:text-energy">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <VeloPricing />

      <VeloStart />
    </>
  )
}
