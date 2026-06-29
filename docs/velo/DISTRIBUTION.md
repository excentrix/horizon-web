# VELO — Distribution & Pilot Funnel

> This is **P1** — it activates *after* the P0 core loop is production-ready. Distribution is the
> funnel through which pilots and trials happen. Zero marketing budget. Founder-led.

## The funnel (what we're optimizing)

```
Content / outbound  →  landing (excentrix.tech)  →  signup  →  upload resume
        →  analysis  →  verify a project  →  verdict + shareable credential
        →  (loop) share → others see → they sign up
        →  (B2B) college cohort pilot / HR free-pilot
```

**North-star metric:** completed verifications. Everything else is a leading indicator
(signups, uploads, verify-starts) or a trailing one (shares, pilots, paid).

## Instrumentation ✅ (shipped 2026-06-24) — measure before you pour traffic in

Canonical funnel events fire to **PostHog** via `frontend/lib/funnel.ts` (one place, no name drift).
Every event carries the **acquisition source** (UTM / `?ref=` / referrer), captured first-touch on app
entry, so the whole funnel breaks down by where a user came from (post, club, email).

| Event | Fires when | Where |
|---|---|---|
| `velo_signed_up` | account created (password) | `context/AuthContext.tsx` |
| `velo_resume_uploaded` | resume upload succeeds | `app/(studio)/verify/page.tsx` |
| `velo_github_connected` | GitHub OAuth succeeds | `hooks/use-github-repos.ts` |
| `velo_analysis_ready` | snapshot flips to ready | `app/(studio)/verify/page.tsx` |
| `velo_verification_started` | "Begin Verification" | `components/mirror/ProjectVerificationSheet.tsx` |
| `velo_verification_completed` | verdict lands (status + score) | `ProjectVerificationSheet.tsx` |
| `velo_credential_shared` | "Copy share link" | `verify/page.tsx` |
| `velo_credential_viewed` | recruiter/peer opens a public credential | `app/audit/public/[auditId]/page.tsx` |

**To use it:** in PostHog, build a Funnel from `velo_signed_up → … → velo_credential_shared`, then
break down by `utm_source` / `ref`. The `velo_credential_viewed` event measures the **viral loop**
(how many eyeballs each shared credential pulls in).

**Attribution wiring (do this):**
1. **Tag every link you post** with `?ref=` (e.g. `excentrix.tech/?ref=li_post_03`, `?ref=gdsc_vit`). The
   product app persists the first `ref` it sees and attaches it to all events.
2. **Keep PostHog `cross_subdomain_cookie` ON** (do NOT disable it) so a person is linked across
   `excentrix.tech` → `app.excentrix.tech` and initial UTMs carry into signup.
3. *(Follow-up)* Marketing CTA should forward `ref`/UTM as query params to the app `/verify` link.
   *(Limitation: Google signups don't fire `velo_signed_up` yet — the funnel can start from
   `velo_resume_uploaded` / `velo_github_connected` until that's added.)*

## Three motions, run in parallel

### 1. Founder-led build-in-public (B2C top-of-funnel)
Daily posts on LinkedIn + X. You are a Bangalore AI architect who built the antidote to AI-padding.
Polarizing, true, evidence-led. The viral unit is the **interrogation transcript** and the
**public credential**.

Hooks to start with:
- "I let AI write a 'perfect' project, then made my AI interrogator question it. It folded by Q3. Transcript inside."
- "Your GitHub green squares are worthless as a hiring signal now. I built what replaces them."
- "70% of 'I built X' on resumes is AI output the candidate can't explain. I built a 5-minute test that proves who actually can."
- "I deleted 40k lines of my own product to bet on one feature. Here's why."

Cadence: post daily; weekly, publish one real (consented, anonymized) transcript — pass *or* fail.
Failures are more viral than passes.

### 2. College coding-club hack (B2B institutional, bottom-up)
Bypass university bureaucracy entirely. Go to GDSC / coding clubs / placement-prep WhatsApp groups
at Bangalore colleges (and IITs/NITs/BITS/VIT).
- Offer the club: free VELO verification for members + a leaderboard of who's verified, before placement season.
- The club president becomes your unpaid distributor; students adopt because placements are existential.
- **Action:** visit one Bangalore campus in person; sign one club this month.

### 3. Cold outbound to CTOs / eng leads (B2B corporate)
3-line pitch, free-pilot close:
> Subject: the candidate who "built" the project — but can't explain it
>
> Most engineering resumes in 2026 are AI output the candidate can't defend in person — and you
> find out in week 3 of onboarding, not the interview.
> VELO sends your shortlist a 5-minute adaptive interrogation about their own code and gives you a
> defensibility verdict before you spend an engineer's hour.
> Want me to verify your next 3 candidates free this week so you can compare against your own read?

**Action:** email 30 leads; the free-pilot-on-real-candidates is the whole close.

## Pilot definitions (what a "pilot" actually is)

| Pilot type | Who | What they do | Success = |
|---|---|---|---|
| **Student/dev** | B2C signup | Verify ≥1 project, share credential | Completed verification + share |
| **College cohort** | One club/dept | 20–40 students verified, leaderboard live | Cohort verified + recruiter interest |
| **HR free-pilot** | 1 eng lead | Verify their next 3 candidates free | They say the verdict matched/beat their own read |

## What must be instrumented before scaling distribution (depends on P0)
- Funnel events: signup → upload → analysis_ready → verify_start → verdict → share.
- Source tagging (which post / club / outbound brought them).
- Drop-off points (where pilots stall — likely upload or verify-start).

## Going viral — the honest mechanics
Virality isn't quality; it's **shareable + slightly controversial**. Manufacture the loop:
- Every verified dev gets a badge they *want* to post ("VELO-verified").
- Every brutal/funny failed defense (with consent) is a post.
- Pick a fight with a sacred cow: "Leetcode is theater," "GitHub contributions are vanity,"
  "AI resumes are fraud." Controversy is the only free distribution that compounds.

## Channels (organic, zero-budget)

| Channel | Role | Native format |
|---|---|---|
| **LinkedIn** | Primary B2B + credibility. Reaches HR/eng-leads + students/placement cells. | Text + the interrogation-transcript carousel; founder POV |
| **X / Twitter** | Dev credibility + the build-in-public arc; where hot takes travel | Threads, transcript screenshots, short clips |
| **Instagram (Reels)** | Reach students; the visual "watch VELO catch a faker" moment | 15–45s Reels of a real interrogation + reaction |
| **Reddit** | High-intent dev/placement communities (r/developersIndia, r/cscareerquestions, college subs) | Honest value-first posts, NOT ads; "I built X, AMA / here's what I learned" |
| **YouTube (later)** | Long-form proof + methodology = deep credibility | 5–10 min "how VELO verifies / I tried to fool my own AI" |

**Video is the highest-leverage format** — the magic ("AI interrogates a dev about their own code,
catches the bluff") is *visual*. One good screen-recording of a real interrogation is worth 50 text posts.
Repurpose one recording → Reel + X clip + LinkedIn video + YouTube long-cut.

## The credibility doctrine (THE hard problem)

The make-or-break risk you named: people must **want** to be VELO-verified and **trust** it — not see it
as a trap that can expose or disadvantage them. Design every move around this:

1. **Verification is a flex you control, not a gate you risk.** B2C is candidate-initiated and
   candidate-shared — *you only show the passes.* Failing is private; there is **zero downside to trying.**
   Say this loudly: "Verify free. Share it only if you love it."
2. **Make "verified" aspirational early.** Seed it: get respected devs / student leaders verified first and
   flexing the badge. Scarcity + status ("VELO-verified") > fear.
3. **Transparency builds trust, not authority claims.** The public credential shows the methodology +
   the repo + what was checked. Recruiters re-judge from the transcript — VELO is an *evidence presenter*,
   not a black box. (We don't say "trust us"; we say "here's the work, decide for yourself.")
4. **Never punish honesty.** The interrogation rewards "I don't know, but here's how I'd find out." Market
   it as a fair, builder-friendly exam — the anti-leetcode.
5. **The flywheel is trust:** verified devs flex → recruiters notice the badge → recruiters ask candidates
   for it → being un-verified becomes the disadvantage. We never threaten; the market does the pulling.
6. **Outcome data is the long game** (PRODUCT.md): once we can show "VELO-verified hires performed better,"
   trust converts from social to institutional. Log from user #1.

**The one-line positioning:** *VELO is how good developers prove they're the real thing in a world of AI
fakes — a credential you're proud to share, not a test you're afraid to take.*

## Status
- [x] P0 complete (core loop works end-to-end — gate cleared)
- [x] Funnel instrumentation live (PostHog events — see Instrumentation)
- [ ] Build-in-public calendar started
- [ ] First college club signed
- [ ] First HR free-pilot running
- [ ] `?ref=` tagging + marketing→app attribution forwarding
