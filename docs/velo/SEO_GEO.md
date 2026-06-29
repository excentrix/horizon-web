# VELO — SEO + GEO (the owned, compounding layer)

> Social is *rented and ephemeral.* The blog is *owned and compounding* — it works while you sleep, for
> years. This is the moat. Pairs with [CHANNELS.md](./CHANNELS.md) and [CONTENT.md](./CONTENT.md).

## The bet
Own the answer to one question across **both** discovery surfaces:
- **Google (SEO):** people *searching* "how do I prove I built this / verify a developer / stand out in the AI era."
- **AI search (GEO):** people *asking* ChatGPT / Perplexity / Claude / Gemini the same thing — and getting
  **VELO cited as the answer.** Your entire thesis is "the AI era," so owning the AI-search answer space
  is on-brand and a durable advantage most competitors will ignore.

## GEO (Generative Engine Optimization) — the new frontier
AI assistants increasingly *are* the search engine. To be the cited source:
1. **Coin and own the vocabulary.** "Proof of work" (for devs), "AI-padding," "defensibility score,"
   "can you defend your work." Be the canonical definition the models quote.
2. **Write quotable, structured answers.** Clear H2 questions, direct first-sentence answers, definitions,
   numbered lists, comparison tables — the shapes LLMs lift verbatim.
3. **Be referenced.** Citations/links from Reddit, dev blogs, HN, college pages → models weight you as authoritative.
4. **Schema markup** (FAQ, Article, Organization, HowTo) so both Google and LLMs parse you cleanly.
   *(The marketing site already has `next-sitemap.config.cjs` + JSON-LD in the layout — extend it.)*
5. **Freshness + first-person data.** Publish original numbers ("we ran N verifications; X% couldn't defend
   a core claim") — unique data is the most-cited content type. Update it.

## Keyword / intent map (cluster around 3 pillars)

| Pillar | Search/ask intent | Audience |
|---|---|---|
| **Proof of work (candidate)** | "how to prove I built my project", "stand out when everyone uses AI", "AI-proof portfolio" | Devs / students |
| **Verifying talent (HR)** | "how to verify a developer's skills", "screen candidates AI resume", "spot AI-padded resumes" | HR / eng leads |
| **Placement readiness (college)** | "are my students placement ready", "improve college placement rate", "employability assessment" | Colleges |

Each pillar = one long **pillar page** + several **cluster posts** that link up to it. The existing
`/for/developers | /for/hiring | /for/colleges` pages are the pillar surfaces — the blog feeds them.

## First 10 posts to publish (titles + intent + angle)

1. **"In 2026, your GitHub is worthless as a hiring signal. Here's what replaced it."** — top-of-funnel
   manifesto; ranks for "AI resume / hiring signal." Coins "proof of work."
2. **"How to prove you actually built your project (when AI can write anything)."** — candidate pillar; high intent.
3. **"How to spot an AI-padded resume — a checklist for engineering managers."** — HR pillar; listicle = GEO gold.
4. **"Defensibility: the only developer signal AI can't fake."** — owns the term "defensibility score."
5. **"We made an AI interrogate developers about their own code. Here's what it caught."** — original data; highly citable.
6. **"Leetcode is theater. Here's the test that actually predicts on-the-job performance."** — polarizing, links to pillar.
7. **"For colleges: how to know which students are actually placement-ready."** — college pillar.
8. **"The architect vs. the prompter: what 'building' means now that everyone uses Copilot."** — category-defining essay.
9. **"How VELO verifies a developer in 5 minutes (and why it reads your code, not your README)."** — methodology / trust.
10. **"AI-padding is the new resume fraud. A field guide."** — definitional; owns "AI-padding" for GEO.

Publish ~1/week. Repurpose each into the week's social cuts (and vice-versa — a viral thread → a post).

## The flywheel
```
real interrogation / data  →  blog post (SEO + GEO)  →  ranks on Google + cited by AI
   →  organic signups  →  more verifications + original data  →  more posts
social threads feed the blog; the blog feeds social; both compound.
```

## Technical checklist (mostly low-effort; site already has the bones)
- [ ] Blog section live on the marketing site (Payload CMS — `posts` collection already exists)
- [ ] JSON-LD per post (Article + FAQ + HowTo where relevant); Organization schema sitewide
- [ ] `next-sitemap` includes blog posts; submit to Google Search Console + Bing
- [ ] OG images per post (the credential/transcript visual = high CTR)
- [ ] Internal linking: every post links up to its pillar (`/for/...`) page
- [ ] Canonical tags; fast LCP (Next.js already SSR/ISR)
- [ ] Track: which posts rank, which get cited by AI (search PostHog referrers + manual AI-assistant checks)

## Status
- [ ] Pillar pages reviewed for on-page SEO (titles, H1s, internal links)
- [ ] First 3 pillar posts drafted (#1, #2, #3)
- [ ] Schema + sitemap for blog verified in Search Console
- [ ] "Own the vocabulary" pass — consistent terms across site + posts
