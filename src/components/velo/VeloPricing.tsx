import { VERIFY_URL } from '@/lib/veloLinks'

const tiers = [
  {
    name: 'Developer',
    price: '₹99',
    sub: '/ verification',
    tagline: 'Prove what you built.',
    features: [
      '₹99 per project verification',
      'Shareable proof-of-work credential',
      'Public verification page',
      'Re-verify as you ship more',
    ],
    cta: 'Verify a project',
    href: VERIFY_URL,
    highlight: false,
  },
  {
    name: 'Hiring teams',
    price: 'Credits',
    sub: 'pay per verification',
    tagline: 'Know who actually built it.',
    features: [
      'Send candidates a verify link',
      'Defensibility verdict per candidate',
      'Compare against your own read',
      'No seat minimums',
    ],
    cta: 'Start free pilot',
    href: '/for/hiring',
    highlight: true,
  },
  {
    name: 'Colleges',
    price: 'Per seat',
    sub: 'per student / semester',
    tagline: 'Send graduates out with proof.',
    features: [
      'Verify whole cohorts',
      'Placement-ready credentials',
      'Cohort dashboard + reporting',
      'Onboarding support',
    ],
    cta: 'Talk to us',
    href: '/for/colleges',
    highlight: false,
  },
]

export function VeloPricing() {
  return (
    <section id="pricing" className="bg-background py-28 md:py-36">
      <div className="container">
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow mb-5 flex items-center gap-2.5">
            <span className="eyebrow-dot" />
            pricing
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            One engine. Pay for what you verify.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            You never pay for unlimited anything that runs an interrogation — pricing maps to real
            verifications, so the margin holds however much anyone uses it.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={
                'flex flex-col rounded-2xl border p-7 ' +
                (t.highlight
                  ? 'border-indigo bg-card shadow-[0_8px_40px_-20px_hsl(240_53%_57%/0.6)]'
                  : 'border-border bg-card')
              }
            >
              <p className="font-mono text-xs uppercase tracking-wide text-energy">{t.name}</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold tracking-tight text-ink">
                  {t.price}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{t.sub}</span>
              </div>
              <p className="mt-3 text-sm text-ink">{t.tagline}</p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-energy" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={t.href}
                className={
                  'btn-md mt-8 w-full justify-center ' + (t.highlight ? 'btn-primary' : 'btn-ghost')
                }
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
