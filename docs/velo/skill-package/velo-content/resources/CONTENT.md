# VELO — 30-Day Build-in-Public Content Engine

> The founder-led, zero-budget engine that fills the funnel ([DISTRIBUTION.md](./DISTRIBUTION.md)).
> Voice: **Sid — a Bangalore AI architect who built the antidote to AI-padded resumes.** Honest,
> opinionated, builder-to-builder. Polarizing on the *idea*, never on people. Every post ladders up
> to the credibility doctrine: **verification is a flex you control, not a test you fear.**

## The narrative arc (why anyone follows along)

You are not "marketing a startup." You are a builder telling a true story in real time. **The frame is
"lead with the critical thing" — NOT "I deleted my platform."** (We didn't delete Horizon; it's
feature-flagged off and rolls out over time. The story must match the code.)

> *"I spent a year building Horizon — a full learning platform. Honest truth: most of it is a
> nice-to-have. But buried inside it was the one thing that's actually critical in the AI era — VELO,
> which verifies whether you can defend the work on your resume. So I'm leading with VELO. The rest of
> Horizon rolls out as you need it: VELO shows you where you truly stand, Horizon helps you close the gap."*

That arc — honest self-assessment + a critical wedge + a real product catching real fakes — is the
follow trigger. **The product roadmap IS the content roadmap:** VELO now → verified profiles →
Horizon's learning layer re-enters as "you failed verification on X, here's how to actually close it."

### The VELO→Horizon bridge (say this often)
VELO is not separate from Horizon — it's the **critical core** of it. VELO gives the reality check
(where you stand, what's verified, what's missing); Horizon is the path that closes the gap. Lead with
the reality check because that's the part nobody can live without. Layer in the learning as people ask
"okay, so how do I get there?"

## How to run this with Claude (your daily content co-worker)

The whole point: you should never face a blank page. The context lives in these docs; Claude reads them
and drafts the day's posts in your voice. Two ways to drive it:

**The fast way — the `/velo-content` skill** (set up at `~/.claude/skills/velo-content/`):
- `/velo-content day 5` → final LinkedIn + X + Reel script for Day 5, on-voice, with `?ref=` tags.
- `/velo-content "ratelimit transcript reveal"` → content for a specific topic/transcript.
- `/velo-content` (no arg) → it picks up where the log left off.
It auto-reads VOICE.md + CONTENT.md + PRODUCT.md, drafts copy-paste-ready posts, and logs what it made.

**The manual way (any Claude chat, no Claude Code):** paste this once at the top of a chat —
> "You're my VELO content co-worker. Read VOICE.md and CONTENT.md (I'll paste them). Stay in Sid's voice,
> lead-with-VELO frame, credibility doctrine, hook-first, `?ref=` on every link. Give me Day N as final
> LinkedIn + X + Reel copy." — then paste VOICE.md + CONTENT.md.

**The daily loop (≈10 min):**
1. `/velo-content day N` → get drafts. 2. Tweak in your voice + post. 3. Drop the day's real example
(transcript/bug/number) if the post needs one. 4. Once/week, paste your PostHog `?ref=` numbers and ask
Claude to double down on what converted. The funnel ([DISTRIBUTION.md](./DISTRIBUTION.md)) tells you
what's working — not the likes.

## Operating cadence

- **Post daily** (≥1 LinkedIn + ≥1 X). Reels 2–3×/week. Reddit 1–2×/week (value-first, never an ad).
- **The repurposing engine** — one asset → four posts. Record ONE real interrogation (consented):
  - LinkedIn: the transcript carousel + your commentary
  - X: the punchiest exchange as a screenshot + thread
  - Instagram/Reels + YouTube Short: 20–40s screen-rec of the "gotcha" moment
  - Reddit: the honest write-up ("I made my AI grill me on my own code — here's what broke")
- **Tag every link** with `?ref=` (e.g. `?ref=li_manifesto`, `?ref=reel_ratelimit`) so the funnel
  attributes it (see DISTRIBUTION → Instrumentation).
- **Watch** (PostHog): which `ref` drives `velo_resume_uploaded` + `velo_verification_completed`. Double
  down on what converts, not what gets likes.

---

## Week-by-week themes

| Week | Theme | Goal |
|---|---|---|
| **0 (setup)** | The manifesto launch | Plant the flag; optimize profiles |
| **1** | The problem: AI-padding is the new fraud | Make people feel the pain |
| **2** | The proof: watch VELO work | Show, don't tell — the viral transcripts |
| **3** | Build-in-public: the founder bet | Conviction + transparency = trust |
| **4** | Social proof + the pull | Verified devs flex; recruiters + colleges enter |

---

## Day-by-day calendar (hooks + format + CTA)

> ⭐ = fully drafted below in "Hero posts." Others are briefs — flesh out in your voice.

**Week 0 — Setup**
- D1 ⭐ **Manifesto** (LinkedIn + X): "Your resume is now worthless as a signal. Here's what replaces it."
- D2: Rewrite LinkedIn/X bios → "Building VELO — proof of work in the AI era. Bangalore." Pin the manifesto.
- D3 (X thread): "In 2026, anyone can generate a 'perfect' project in an afternoon. So what's left to trust?"

**Week 1 — The problem**
- D4 ⭐ (LinkedIn): "I let AI write a flawless project. Then I made my AI interrogate it. It folded by Q3." *(teaser, no product yet)*
- D5 (X hot take): "Leetcode is theater. GitHub green squares are vanity. Both are AI-gameable now." *(polarizing — sacred cow)*
- D6 (Reddit r/developersIndia): honest post — "Hiring is broken because output is free now. What signal would *you* trust?"
- D7 (Reel): 30s — split screen: "AI writes this project in 4 min" vs "can you explain it?"
- D8 (LinkedIn): "The most expensive hire isn't the one who can't code. It's the one who *sounds* like they can." *(HR pain)*
- D9 (X): a real anti-pattern you caught (over-commented trivial code, undefined SECRET) → "AI-padding has a smell."

**Week 2 — The proof (the viral engine)**
- D10 ⭐ **First transcript reveal** (LinkedIn carousel): the rate-limiter exchange — VELO citing real files. CTA: "verify yours free."
- D11 (Reel/Short): the same exchange as a 30s screen-rec — the "global vs per-instance" gotcha.
- D12 (X thread): "I pointed my AI at my own repo and told it to find where I'd struggle. Here's what it asked."
- D13 (LinkedIn): "VELO read the actual code, not the README. Here's the difference that makes." *(the credibility moat)*
- D14 (Reddit): "I built a thing that reads your repo and grills you on it. Roast it / try it." *(link, value-first)*
- D15 (X): a *failed* defense (consented/anonymized) — "This one couldn't explain their own auth flow. The badge said so."
- D16 (LinkedIn): "Why I show the failures too: a verification that everyone passes is worthless."

**Week 3 — Build-in-public: the bet**
- D17 ⭐ **The pivot story** (LinkedIn): "I deleted my own learning platform to bet on one feature. Here's why."
- D18 (X thread): the architecture — "How VELO reads a repo for ~$0.10 without ingesting the whole thing." *(dev cred)*
- D19 (Reel): "POV: your AI examiner just asked why you used X in auth.py line 40." *(builder-relatable)*
- D20 (LinkedIn): "Solo founder, Bangalore, 0 users, 5 LinkedIn followers when I started this. Day N update." *(transparency)*
- D21 (X): ship log — a real bug you fixed this week (e.g. the popup-blocker OAuth fix). Builders love the grind.
- D22 (LinkedIn): "The honest limitation: VELO can't read your private branches. So it asks you to explain them. That's the point."
- D23 (Reddit AMA): "I'm building an AI that verifies devs can defend their work. Ask me anything."

**Week 4 — Social proof + the pull**
- D24 ⭐ **The "flex, don't fear" post** (LinkedIn): "Verify free. Share it only if you're proud of it. There is no downside."
- D25: feature the first verified devs flexing their credential (with permission). Repost their badges.
- D26 (LinkedIn, HR-targeted): "Recruiters: stop reading resumes you can't trust. Send your shortlist a 5-min VELO link." + free-pilot offer.
- D27 (X): "Un-verified is becoming the disadvantage — not because I say so, because recruiters started asking."
- D28 (Reel): a college angle — "Final-year students: walk into placements with proof, not claims."
- D29 (LinkedIn): the first pilot result / case study (or "first 100 verifications" milestone).
- D30 ⭐ **Recap + ask** (LinkedIn + X): "30 days building VELO in public. Here's what I learned + what's next. Get verified."

---

## Hero posts (fully drafted)

### ⭐ D1 — The Manifesto (LinkedIn)
> Your resume is now worthless as a signal. And so is mine.
>
> In 2026 anyone can generate a flawless project, a clean PR, and a perfect resume in an afternoon. AI
> made *output* free — which means it stopped being proof of anything.
>
> So what's left to trust? One thing: whether you can **defend your own work** when an examiner who read
> your actual code keeps asking "why?" — and adapts every question to your last answer. You can't
> pre-write your way through that. You either built it and understand it, or you don't.
>
> I'm an engineer in Bangalore. I'm building **VELO**: it reads your repo, interrogates you about your
> own implementation, and turns the parts you can defend into a credential you can share.
>
> Not "did a human type this." Everyone uses Copilot. The question is: **are you the architect, or just
> the prompter?**
>
> Following along as I build it in public. First reveal this week.
>
> #buildinpublic #AI #hiring

### ⭐ D10 — First transcript reveal (LinkedIn carousel)
> I pointed VELO at a real project and told it to find where the builder would struggle. It didn't read
> the README. It read the **code**. Here's the exchange 👇
>
> **VELO:** "Your README says the rate limiter is 'token bucket.' What happens when two requests hit in
> the same millisecond on different servers?"
> **Dev:** "Each server has its own bucket in memory — so both get allowed. The limit is per-instance."
> **VELO:** "So your advertised '100/min' isn't actually enforced globally. How would you make it global,
> and what does it cost?"
> **Dev:** "Move the counter to Redis with atomic INCR + expiry. Cost: a network hop per request."
> **VELO:** "Good — that's a real answer, not a memorised one. Moving on."
>
> *That's* the difference between "can talk about a project" and "built it." VELO catches the gap.
>
> Verify your own — free, and you only share it if you're proud of it: excentrix.tech/?ref=li_d10
>
> #proofofwork #AI #developers

### ⭐ D17 — Why I'm leading with VELO (LinkedIn)
> I spent a year building Horizon — a full AI learning platform. Then I made myself answer one honest
> question: is this *critical*, or just nice-to-have?
>
> Truth: most of it is nice-to-have. "Another AI that helps you learn" is the most crowded category on
> earth — ChatGPT already does it. People can live without it.
>
> But one part of Horizon got *more* important as AI got better: a system that reads your actual code
> and interrogates you about your own work — to prove you can defend it. In a world where output is
> free, that's the one thing that's genuinely critical. It's called VELO.
>
> So I'm not deleting Horizon. I'm **leading with the critical part first.** VELO ships now and tells you
> exactly where you stand. The learning layer rolls back in as you ask the obvious next question:
> "okay — so how do I close the gap?"
>
> Lead with what people can't live without. Layer in the rest. Building it in public.

### ⭐ D24 — Flex, don't fear (LinkedIn)
> A fair worry I keep hearing: "What if I get verified and score badly? Doesn't that hurt me?"
>
> No — and here's the design that guarantees it:
> • Verification is **free** and **yours.** You only share a credential if you're proud of it.
> • Fail privately. Nothing is published without you.
> • The interrogation **rewards honesty** — "I don't know, but here's how I'd find out" scores well.
> It's the anti-leetcode: a fair exam about the work you actually did.
>
> There is genuinely **zero downside to trying.** Best case, you get a credential that makes recruiters
> stop scrolling. Worst case, you privately learn exactly where you're weak.
>
> Verify a project free: excentrix.tech/?ref=li_d24

### ⭐ D30 — Recap + ask
> 30 days building VELO in public. What I learned:
> 1. The pain is real — "I can't tell who actually built it" came up in every recruiter conversation.
> 2. Showing failures (consented) built more trust than showing wins.
> 3. People don't fear verification when it's a flex they control.
>
> What's next: [profiles / cohort pilots / the thing you're building next].
>
> If you build, get verified — it takes 5 minutes and you keep the credential: excentrix.tech/?ref=li_d30
> If you hire, I'll verify your next 3 candidates free. Reply "pilot."

---

## First video script (Reel / Short — ~40s)

**Title:** "I made an AI grill me about my own code."

- **[0–4s] Hook (talking head or screen):** "Anyone can generate a perfect project now. So I built an AI
  that checks if you can actually *defend* it. I let it interrogate me."
- **[4–12s] Screen-rec:** VELO reading the repo → first question appears, citing a real file
  (`src/auth.py`). Caption: "It read my actual code. Not the README."
- **[12–28s]:** A hard follow-up after a vague answer — "you said per-instance; so your global limit
  isn't enforced — fix it." Caption: "It adapts. You can't pre-write this."
- **[28–36s]:** The verdict seal animating to a score. Caption: "Verified. A credential I can share."
- **[36–40s] CTA:** "Verify your own — free. Link in bio." (link `?ref=reel_01`)

*Repurpose this exact recording into the D10/D11 posts.*

---

## Guardrails (don't torch credibility)
- **Always get consent** before posting anyone's transcript; anonymize unless they opt in.
- **Never mock a person** — critique AI-padding the practice, celebrate builders.
- **Don't over-claim.** "Evidence you can re-judge," not "the truth machine." Show the method.
- **Reddit is value-first.** Lead with insight; the link is secondary or in a comment.

## Status
- [ ] Profiles optimized + manifesto posted (D1)
- [ ] First interrogation recorded (the repurposing seed)
- [ ] Week 1 published
- [ ] First `?ref=` conversions reviewed in PostHog
