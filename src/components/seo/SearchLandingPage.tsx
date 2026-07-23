import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import { JsonLd } from './JsonLd'
import { faqJsonLd } from '@/lib/seo'

type LinkItem = {
  label: string
  href: string
}

type ComparisonRow = {
  label: string
  old: string
  new: string
}

export type SearchLandingContent = {
  eyebrow: string
  title: string
  accent?: string
  description: string
  definitionTitle: string
  definition: string
  cta: LinkItem
  secondaryCta?: LinkItem
  bestFor: string[]
  notFor: string[]
  comparison: {
    oldLabel: string
    newLabel: string
    rows: ComparisonRow[]
  }
  faqs: { question: string; answer: string }[]
  related: LinkItem[]
  schemaId: string
}

export function SearchLandingPage({ content }: { content: SearchLandingContent }) {
  return (
    <>
      <JsonLd id={`${content.schemaId}-faq-json-ld`} data={faqJsonLd(content.schemaId, content.faqs)} />
      <main className="bg-background">
        <section className="grain border-b border-border pb-20 pt-36 md:pb-28 md:pt-44">
          <div className="container max-w-4xl">
            <p className="eyebrow mb-6 flex items-center gap-2.5">
              <span className="eyebrow-dot" />
              {content.eyebrow}
            </p>
            <h1 className="display-xl">
              {content.title}
              {content.accent ? (
                <>
                  <br />
                  <span className="text-indigo">{content.accent}</span>
                </>
              ) : null}
            </h1>
            <p className="mt-7 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl">
              {content.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={content.cta.href} className="btn-primary btn-lg">
                {content.cta.label}
                <ArrowUpRight className="size-5" />
              </Link>
              {content.secondaryCta ? (
                <Link href={content.secondaryCta.href} className="btn-ghost btn-lg">
                  {content.secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-cream/45 py-20 md:py-28">
          <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="eyebrow mb-5 flex items-center gap-2.5">
                <span className="eyebrow-dot" />
                definition
              </p>
              <h2 className="display-md">{content.definitionTitle}</h2>
            </div>
            <p className="text-xl leading-relaxed text-foreground/85 md:text-2xl">
              {content.definition}
            </p>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
            <div className="bg-card p-8 md:p-10">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
                Best for
              </h2>
              <ul className="mt-7 space-y-4">
                {content.bestFor.map((item) => (
                  <li key={item} className="flex gap-3 text-foreground/85">
                    <Check className="mt-1 size-4 shrink-0 text-energy" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background p-8 md:p-10">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
                Not for
              </h2>
              <ul className="mt-7 space-y-4 text-muted-foreground">
                {content.notFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background py-20 md:py-28">
          <div className="container">
            <h2 className="display-md mb-12 max-w-3xl">How it compares</h2>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="grid grid-cols-[0.8fr_1fr_1fr] border-b border-border bg-cream/50 px-5 py-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                <span>Signal</span>
                <span>{content.comparison.oldLabel}</span>
                <span>{content.comparison.newLabel}</span>
              </div>
              {content.comparison.rows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[0.8fr_1fr_1fr] border-b border-border px-5 py-5 last:border-b-0"
                >
                  <span className="font-display text-lg font-semibold tracking-tight text-ink">
                    {row.label}
                  </span>
                  <span className="text-sm leading-6 text-muted-foreground">{row.old}</span>
                  <span className="text-sm leading-6 text-foreground">{row.new}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-cream/45 py-20 md:py-28">
          <div className="container grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <h2 className="display-md">Questions searchers ask</h2>
            <div className="space-y-4">
              {content.faqs.map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                    {faq.question}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container">
            <h2 className="display-md mb-10">Related pages</h2>
            <div className="flex flex-wrap gap-3">
              {content.related.map((item) => (
                <Link key={item.href} href={item.href} className="btn-ghost btn-md">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
