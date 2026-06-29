import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export type AudienceContent = {
  eyebrow: string
  title: string
  titleAccent: string
  subtitle: string
  cta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  value: { title: string; body: string }[]
  steps: { n: string; title: string; body: string }[]
  closing: { title: string; body: string; cta: { label: string; href: string } }
}

export function AudiencePage({ content }: { content: AudienceContent }) {
  return (
    <>
      {/* Hero */}
      <section className="grain bg-background pb-20 pt-40 md:pb-28 md:pt-48">
        <div className="container max-w-4xl">
          <p className="eyebrow mb-6 flex items-center gap-2.5">
            <span className="eyebrow-dot" />
            {content.eyebrow}
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
            {content.title} <span className="text-indigo">{content.titleAccent}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl">
            {content.subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={content.cta.href} className="btn-primary btn-lg">
              {content.cta.label}
              <ArrowUpRight className="size-5" />
            </a>
            {content.secondaryCta && (
              <a href={content.secondaryCta.href} className="btn-ghost btn-lg">
                {content.secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-cream/45 py-24 md:py-32">
        <div className="container">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
            {content.value.map((v) => (
              <div key={v.title} className="flex flex-col gap-3 bg-background p-8">
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works for them */}
      <section className="bg-background py-24 md:py-32">
        <div className="container">
          <h2 className="mb-14 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            How it works for you
          </h2>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {content.steps.map((s) => (
              <li key={s.n} className="flex flex-col gap-3 bg-background p-8">
                <span className="font-mono text-sm text-energy">{s.n}</span>
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-ink py-24 text-cream md:py-32">
        <div className="container max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-cream md:text-5xl">
            {content.closing.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-balance text-lg leading-relaxed text-cream/70">
            {content.closing.body}
          </p>
          <div className="mt-10 flex justify-center">
            <Link href={content.closing.cta.href} className="btn-primary btn-lg">
              {content.closing.cta.label}
              <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
