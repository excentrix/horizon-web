# VELO — Pilot QA & Readiness Script

The gate between "code-complete" and "put a stranger on it." Run the **Core loop**
on the **live env as a fresh account** — that's the real test. Nothing here is
proven until it's green on production.

Status legend: ⬜ not run · ✅ pass · ❌ fail (log the failure inline)

---

## 0. Automated backend smoke (local) — ✅ 2026-07-01
Read-path endpoints verified via Django test client against a real verified account:
- ✅ `GET /api/verified-profile/<username>/` → 200 (candidate + verified_profile + defended_projects)
- ✅ `GET /api/audits/<audit_id>/public/` → 200 (includes `verification` verdict block)
- ✅ `GET /api/verified-profile/<unknown>/` → 404
*(Script: `scratchpad/smoke.py`. This only covers reads — the write/async path below must be run live.)*

---

## 1. Core loop — fresh account on PROD (the gate)
Do this as a brand-new signup, not an existing account.

| # | Step | Expected | Status |
|---|------|----------|--------|
| 1 | Sign up (Google OAuth) | Lands in app, authenticated | ⬜ |
| 2 | Go to `/verify`, upload a résumé (PDF) | Toast "VELO is extracting your claims"; job created with a real `job_id` (NOT null) | ⬜ |
| 3 | Wait for analysis | `/verify` "Resume analysis" tab fills in (ATS, role fit, skills, gaps) within ~1–2 min | ⬜ |
| 4 | Pick a project → interrogation | Code-grounded questions cite real files from the repo | ⬜ |
| 5 | Answer through to the verdict | `verified` / `suspicious` / `failed` with a `verdict_summary` | ⬜ |
| 6 | Verified Capability | Synthesized headline + narrative appears (Defend header + Resume-analysis tab) | ⬜ |
| 7 | "Copy share link" (project) | Opens `/audit/public/<id>` **logged out** — shows the credential, not a login bounce | ⬜ |
| 8 | "Share verified profile" | Copies `/p/<username>?tab=verified`; opens **logged out** on the Verified tab | ⬜ |

**Async health (the #1 prod risk):** confirm Celery worker is draining the queue.
If step 3 hangs in "running" forever → worker/Redis is down. Also confirm this
deploy applied migration **`0015`** (verified-profile narrative cache).

## 2. Edge cases
| Case | Expected | Status |
|------|----------|--------|
| Résumé with **0 projects** | "verify a repo directly" / GitHub-repo path works | ⬜ |
| **Project-only** user (no résumé) | Resume-analysis tab still renders + shows the drag-and-drop résumé box on the right | ⬜ |
| **Failed / unreadable** résumé | Clear error + retry, not a silent hang | ⬜ |
| **Private repo** selected | Known limit — `public_repo` scope can't read it. Confirm the UX degrades gracefully (see decision below) | ⬜ |

## 3. Known risks to watch during the pilot
- **Private repos unverifiable** (`public_repo` OAuth scope). Decision pending — see ROADMAP open issues.
- **Cost/latency**: ~5 LLM calls per résumé analysis, 6–10 per verification.
- **Contradictions shown publicly** on the Verified tab — product call still open.

---

## 3b. Found issues (live prod QA — 2026-07-02)
First real run on `excentrix.tech` surfaced these (all in the *current* deploy, before the verified-profile work is live):

- **#8 GitHub connect fails: "redirect_uri is not associated with this application."** → **Config, not code.** The `redirect_uri` sent is correct (`https://api.excentrix.tech/api/auth/github/oauth/callback/`) and prod's `client_id` is `Ov23liBRZqIFJq52rs7Z` — so the OAuth App with *that* client_id doesn't have the callback registered (likely the callback was set on a different app). **Fix on GitHub dashboard:** ensure the app whose Client ID = `Ov23li…` has that exact callback URL. ⬜ pending user.
- **#6 Returning user re-onboarded + dropped into mentor kickoff.** → **Fixed 2026-07-02.** The onboarding page never marked completion (relied on the résumé-upload side-effect, `student`-only) and routed to `/chat`. Now it calls `authApi.completeOnboarding()` explicitly and routes to `/verify`.
- **#4 Onboarding used learning/mentor framing** ("Set up your mentor context", "personalize your learning direction", timeline/constraints fields). → **Fixed 2026-07-02.** Reframed for verification ("Verify the work on your résumé"), dropped the learning-schedule fields, role/company now optional.

## 4. Pilot script (what we ask a pilot user to do)
**Candidate (dev):** "Sign up, upload your résumé, and defend one project you're proud
of. Then send us the `/p/<you>?tab=verified` link." → success = they reach a verdict and share.

**College:** "Have N students each verify one project." → success = the cohort view
(`/institution/*`) shows real verified counts *(note: cohort dashboards not yet wired to
live verification data — P2.5).*

**HR:** "Open this candidate's verified link; would it change how you'd screen them?"
→ success = qualitative read on whether the evidence + honesty layer is trusted.
