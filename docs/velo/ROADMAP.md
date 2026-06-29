# VELO — Roadmap & Tracker

Incremental. Each phase ships something usable. Tick boxes as you go; add dated notes under each task.

---

## P0 — Core loop production-ready (DO THIS FIRST)

**Goal:** A real user uploads a resume → sees their full analysis → verifies a project → gets a
result. It's seamless, deployed, and we can run pilots/trials on it.

**Definition of done:** A stranger signs up, uploads a resume, and within ~2 minutes sees their ATS +
analysis, picks a project, defends it, and sees a verdict — in production, without us touching anything.

### P0.1 — Fix the resume-analysis trigger ✅ (code complete)
- [x] Make `ProfileResumeUploadAPIView` analyze on **every** upload; only skip when `skip_analysis=true` is passed (settings replace-resume flow). — `backend/apps/authentication/views.py`
- [x] `/verify` intake now reaches a working analysis (sends just the file → analysis runs).
- [ ] Verify the Celery task path end-to-end on a fresh user. *(needs runtime — see P0.6)*

### P0.2 — Surface the resume analysis on `/verify` ✅ (code complete)
- [x] `/verify` is now a two-tab page: **Defend your work** (verification hub) + **Resume analysis** (`<VeloProfileTab/>`, the full ATS breakdown / projects / skills / gaps / employer view), decoupled from the disabled `/progress`.
- [x] States handled: loading / empty (intake) / running (progress) / ready / (failed via VeloProfileTab).
- Note: VeloProfileTab also lists projects — minor overlap with the Defend tab; refine post-P0.

### P0.3 — Orientation (fix "the user is lost") ✅ (code complete)
- [x] "How VELO works" explainer strip on `/verify` (extract claims → interrogate → earn credential).
- [x] Empty state explains the flow + offers resume upload AND "verify a repo directly".

### P0.4 — Minimum viable payoff after verification ✅ (code complete)
- [x] Verified projects show `verdict_summary` (added to the mirror API serialization).
- [x] "Copy share link" → public credential page (`/audit/public/[auditId]`).
  - (Full dossier/dimensions is P2 — this is the minimum so verifying *feels* like it produced something.)

### P0.5 — Production deployment
- [ ] **Celery worker + beat running** in prod (analysis is async; without the worker it hangs).
- [ ] LLM provider configured (`DEFAULT_AI_PROVIDER`, Vertex/Gemini keys) in prod env.
- [ ] Resume file storage works in prod (cloud storage, not local `default_storage`).
- [ ] Feature flags set: VELO-first (learning surfaces off). Confirm via `/api/config/features/`.
- [ ] `NEXT_PUBLIC_APP_URL` set so marketing CTAs deep-link to the app's `/verify`.
- [ ] Sentry capturing errors (already wired) — confirm in prod.

### P0.6 — QA / pilot-readiness pass
- [ ] Manual end-to-end on staging: signup → upload → analysis → verify project → verdict → share link.
- [ ] Test with a resume that has 0 projects → "verify a repo directly" path works.
- [ ] Test a failed/unreadable resume → clear error + retry.
- [ ] Write down the pilot script (what a pilot user/college/HR is asked to do).

---

## P1 — Distribution (the funnel for pilots & trials)

**Goal:** A repeatable funnel that puts real users into the P0 loop. Full detail in
[DISTRIBUTION.md](./DISTRIBUTION.md). High-level tracker:

- [ ] Founder-led build-in-public engine live (LinkedIn/X) — first 30-day calendar started.
- [ ] One Bangalore college coding-club pilot signed.
- [ ] Cold outbound to 30 CTOs/eng-leads with the free-pilot offer.
- [ ] Instrumentation: track signup → upload → analysis → verify → share (the funnel metrics).
- [ ] A "request a pilot" path for colleges/HR (even a mailto/form is fine to start).

---

## P2 — The evidence layers (makes VELO paid-grade; second priority)

**Goal:** Turn the atom (a verified project) into the artifacts each audience actually decides on.

### P2.1 — Code-grounded interrogation ✅ (code complete) *(biggest credibility unlock)*
- [x] Fetch the candidate's key source files via GitHub API (tree → ranked selection → contents), bounded.
- [x] Build a one-time `code_digest` (LLM) and feed it to `generate_first_question`/`_build_project_context`.
- [x] Implementation-specific questions citing real files/functions (verified: probes `auth.py::verify_token` etc.).
- [x] AI-padding / low-ownership signal detection in the digest (verified: caught TODO, plaintext compare, naïve rate limiter).
- [x] **Cost guardrails enforced by construction**: `CODE_CHAR_BUDGET=400K` (~120K tokens), `CODE_PER_FILE_CHAR_CAP=20K`, `CODE_MAX_REPOS=3`, `CODE_MAX_FILES=40`. Flat ~$0.05–0.10/verification regardless of repo size. Verified: fastapi pulled 28 files @ 302K chars, budget held.
  - Files: `backend/apps/audit/services/project_verification_service.py`, migration `audit/0014`.
  - Uses the user's `github_access_token` (5K/hr + private repos) when connected; falls back to metadata+README if the fetch yields nothing.

### P2.2 — The evidence dossier
- [ ] Multi-dimensional scoring in `finalize()` (ownership / judgment / debugging / honesty / communication / seniority).
- [ ] Surface dossier on the result + public page: transcript + dimension scores + green/red flags + recommendation.
- [ ] Sample-size honesty ("1 project — limited sample").

### P2.3 — The verified profile (person layer) *(highest-leverage)*
- [x] **Reconciliation v1 (deterministic)** — fuse `project_verifications` (evidence) onto `deep_analysis` (claims) into a `verified_profile` overlay. `backend/apps/audit/services/verified_profile_service.py` → exposed on `/mirror/latest/`; surfaced in `VeloProfileTab` as a "Verified Capability" section (coverage/sample-size banner, skills backed by defended work, claim-vs-evidence contradictions) + verified shields on Skill Mastery chips. *(2026-06-24)*
- [x] **LLM-synthesized narrative** — `_generate_narrative()` in `verified_profile_service.py` turns the reconciled facts into an honest headline + 1-2 sentence capability statement (grounded strictly in defended evidence + interrogation expertise estimate, not resume claims; acknowledges limited sample / contradictions). Cached on `MirrorSnapshot.verified_narrative_cache` keyed by a signature of the reconciled state (one LLM call only when verifications/claims change). Surfaced in `VeloProfileTab` *and* on the `/verify` Defend-tab credential header. *(2026-06-24)*
- [x] **HR view (assessment of a person)** — public `GET /api/verified-profile/<username>/` (`PublicVerifiedProfileAPIView`, no auth, exposes ONLY verified facts — never the private claim layer / ATS / gaps), surfaced as a **"Verified" tab on `/p/[username]`** (one identity URL; canonical `/p/<username>?tab=verified`). Shared `VerifiedProfileView` component; renders even with no public portfolio (resilient fallback). "Share verified profile" on `/verify`. *(2026-06-24, consolidated into `/p/` — see change log)*

### P2.4 — HR-initiated flow + JD fit *(person-page foundation done; the rest open)*
- [ ] "Send a candidate a verify link" → HR picks project/JD → gets the dossier back (including failures).
- [ ] JD-fit overlay + **shortlist ranking across multiple candidates** (the per-person page now exists; ranking many of them does not).
- [ ] Identity binding *(page is currently public-by-username with no proof the named person is the applicant — hardening: share tokens + identity binding).*

### P2.5 — Cohort layer (college / enterprise)
- [ ] Wire `institution/*` dashboards to real verification data: per-student readiness, cohort distribution, outliers.
- [ ] Remediation targeting + recruiter showcase + program-quality metrics.

---

## Open issues / decisions
- **(RESOLVED 2026-06-24)** ~~Public credential page shows wrong status~~ — public report now surfaces the `ProjectVerification` verdict (status/score/summary/repos/files/questions), not the raw `ExperienceAudit`. Page redesigned (see change log).
- **Verified dashboard (`/verify` ready state) polish** — acceptable now, but could get the same editorial treatment as the public page later. Low priority.
- **Repo/title mismatch (needs repro)**: user reported the drawer header showed a different project than the repo selected, though questions matched the selected repo. Data ended consistent. Get exact repro (which repo clicked, what the header said).
- **Multi-branch**: the digest only reads the default branch. If a candidate's work is on another branch, the interrogator now (correctly) asks them to *explain* it rather than requesting a URL — but it can't read that branch. Decision: support a branch selector at verify time, or keep default-branch-only.
- **GitHub OAuth scope is `public_repo`** (see `GitHubOAuthInitView`). The code-grounded digest can only read **public** repos with this scope. To verify private repos, request `repo` scope — but that's a heavier permission to ask users for. Decision needed: public-only for now, or add private support. Many devs' best work is private → matters for VELO.

## Change log
- **2026-06-24** — **Consolidated the HR verified profile into `/p/[username]` as a "Verified" tab** (was a separate `/verified/[username]` route — redundant with the existing portfolio, two username-keyed public pages). Rationale: `/p/` = self-curated *showcase* (claims, self/peer endorsements), Verified tab = un-curated *evidence* lens (only what survived interrogation + the claim-vs-evidence honesty layer that doesn't belong on a self-showcase) — the same claim-vs-evidence split the whole feature is built on, now under one identity URL. Extracted the standalone page into a reusable `VerifiedProfileView` (`components/verified/`, theme-tokened so it sits in the portfolio body); added a `usePublicVerifiedProfile` hook; deleted the `/verified` route + its AuthContext allowlist entry; repointed the `/verify` share button to `/p/<username>?tab=verified`. Coupling concern (the `/p/` route hard-errors on a private/absent portfolio) handled with a resilient `VerifiedOnlyPage` fallback: if the portfolio is private but defended work exists, `/p/` still serves the verified lens — HR-trust stays independent of portfolio setup. tsc 0 errors.
- **2026-06-24** — **HR view shipped — the "assessment of a person" altitude (P2.3 done / P2.4 foundation).** Public recruiter-facing verified-profile page. Backend: `PublicVerifiedProfileAPIView` → `GET /api/verified-profile/<username>/` (no auth; resolves user by username, requires ≥1 verified project). Privacy stance: exposes **only verified facts** — the synthesized capability statement + defended-project evidence (score, expertise estimate, questions defended, passed repos, link to each project's `/audit/public/<auditId>` credential) + claim-vs-evidence honesty — and **never** the private claim layer (ATS, resume internals, skill gaps). Frontend: `/verified/[username]` editorial page (cream/indigo brand, motion) + added to AuthContext public-path allowlist; "Share verified profile" button on `/verify` credential header copies the link. Verified end-to-end (test client 200 with correct shape against a real verified account; frontend tsc 0 errors). **Still open (P2.4):** multi-candidate shortlist ranking, JD-fit overlay, HR-initiated picks, identity binding (page is public-by-username today — enumerable; harden with share tokens).
- **2026-06-24** — **Verified-profile LLM narrative (P2.3)** — added a synthesis layer on top of the deterministic reconciliation: one LLM call turns the reconciled facts into an honest `headline` + `narrative` capability statement, grounded strictly in defended evidence (verdict summaries + interrogation `expertise_estimate`) — not resume claims — and made to acknowledge limited sample size / contradictions rather than hide them. Cached on new `MirrorSnapshot.verified_narrative_cache` (migration `0015`), keyed by a SHA-256 signature of the reconciled state, so it regenerates only when verifications/claims change (most mirror GETs hit cache; failures fall back silently and never break the profile read). Surfaced in the `VeloProfileTab` "Verified Capability" section and on the `/verify` Defend-tab credential header (was previously only on the Resume-analysis tab — user couldn't see it from Defend). Django check + frontend tsc clean.
- **2026-06-24** — **Verified-profile reconciliation v1 (person layer, P2.3 started)** — `deep_analysis` (claim layer) and `project_verifications` (evidence layer) were both on the mirror payload but never talked to each other; the profile showed claim-level analysis next to a separate list of verification badges. New deterministic `build_verified_profile()` (`backend/apps/audit/services/verified_profile_service.py`) overlays evidence onto claims: (1) **coverage/sample-size honesty** (verified N/claimed M → none/unverified/limited/partial/strong + note — "one defended project is not a verified person"); (2) **skill promotion** — claimed skills whose tech stack is backed by a *verified* project; (3) **contradictions** — resume marks a skill "demonstrated" but its only linked project came back suspicious/failed. Exposed as `verified_profile` on `/mirror/latest/`; rendered as a "Verified Capability" section atop `VeloProfileTab` + verified shields on demonstrated Skill-Mastery chips. No LLM (fast/testable); `deep_analysis` untouched — this is a trust *overlay*, not a replacement. Typecheck + Django syntax clean. Next: LLM narrative synthesis; then HR-facing view (P2.4).
- **2026-06-24** — **Public credential page redesigned** (`/audit/public/[auditId]`) — the viral artifact. Editorial "verified credential" aesthetic: animated score seal, verdict summary, evidence breakdown (questions defended / source files read / repo live), repo chips, transparent methodology, "get your own credential" CTA → excentrix.tech. Brand-aligned (cream/indigo/energy, font-display, motion). Fixes: (1) **status bug** — backend public report now includes the `ProjectVerification` verdict block (was showing raw un-finalized `ExperienceAudit`); (2) **public access** — added a public-path allowlist in AuthContext so logged-out recruiters viewing `/audit/public` and `/p/` are NOT bounced to /login (this would have broken the entire share loop).
- **2026-06-24** — **Code-grounded interrogation confirmed working end-to-end** (questions cited real files like `src/pages/Mission.tsx` and reasoned about the candidate's Sanity-vs-hardcoded strategy). QA refinements: (1) tuned the interrogation prompt — questions now short/single-angle/varied (was repetitive "implications & trade-offs" every turn) and **strictly grounded in the digest** (no more asking the candidate for URLs/branches it can't access; instead asks them to explain). (2) Better loading feedback — cycling status messages during "preparing" (reading repo…) and between questions ("reviewing your answer…") instead of silent 5s spinners.
- **2026-06-24** — Fixed silent-403 auth bug: DRF `SupabaseAuthentication` returns **403** (not 401) for missing/expired tokens (no `authenticate_header`), but the http-client only refreshed on 401 → expired sessions hung with silent 403s on every authenticated call (portfolio, github, etc.) and never redirected. Now refresh triggers on 401 **or** 403-not-authenticated, and a dead session redirects to `/login`. (Surfaced while testing GitHub connect — the connect 403 was just a symptom of the expired session.)
- **2026-06-23** — Plan created. Confirmed P0 bugs (upload trigger, dark analysis UI, no orientation, no payoff, Celery dependency).
- **2026-06-23** — **P0.1–P0.4 code-complete** (upload trigger fixed; `/verify` now has Defend + Resume-analysis tabs; orientation strip; verdict summary + share link). Typecheck + Django check clean; `/verify` compiles & serves 200. Remaining: P0.5 (prod deploy) and P0.6 (live QA on a fresh user — needs backend restart to pick up the new endpoints/serialization).
- **2026-06-23 (pm)** — User feedback round:
  - Fixed Celery `AgendaOutput` parse crash — `why` field now optional (`onboarding_agenda_service.py`). No more agenda-generation failures during resume analysis.
  - Widened `/verify` to `max-w-6xl` (analysis was squished); Defend content kept readable at `max-w-3xl`.
  - **GitHub repo sourcing on Defend tab**: connect GitHub → pick a repo → verify (`GithubReposPicker`). Solves the "0 projects parsed from resume" dead-end (experienced devs list work as experience, not projects). Available in both empty and ready states.
  - **P0.5 deploy verified**: `docker-compose.prod.yml` has `celery-worker` + `celery-beat`; backend & worker share `./data/media` bind mount (worker can read uploaded resumes); auto-deploys via `cd-backend.yml` on push. Single-host caveat: shared local media → move to GCS before scaling to multiple VMs.
  - Note: "projects not in analysis" was a *data* fact (resume had 0 projects), not a UI bug — the Analysis tab renders projects when present.
- **2026-06-24** — Console 404 fixes: gated `useGamificationSummary`/`useHomeDashboard` (+ all gamification queries) on their feature flags so disabled features never call dark-routed APIs; studio layout now renders a spinner instead of mounting disabled pages (kills the whole stray-404 class). Login "Network Error" diagnosed as transient (backend mid-restart), not a bug.
- **2026-06-24** — **Removed the `VELO_AUDIT.md` hard gate** on the interrogation (frontend-only; backend never enforced it). Interrogation now starts immediately after the repo check; the audit doc is reframed as an optional score boost. This was the #1 funnel-killer — flow now matches the "paste a repo, defend it" promise.
- **2026-06-24** — Fixed GitHub "connection cancelled" bug: popup was opened *after* an `await` → browser popup-blocker killed it. Now opens `about:blank` synchronously in the click gesture, then navigates to the OAuth URL. Applies to both the Defend-tab picker and the drawer. Added Reconnect/Disconnect controls. Flagged: OAuth scope is `public_repo` (private repos need `repo` scope — open decision).
- **2026-06-24** — Fixed reconnect / account-switch flow (was "wonky"): (a) **disconnect now revokes the GitHub grant** server-side (`DELETE /applications/{client_id}/grant`), not just clears our token — so reconnect shows GitHub's authorize screen again instead of silently re-granting the same account (that silent re-grant was the "blank popup opens+closes"); (b) frontend now **trusts the backend on popup close** (re-checks `/github/repos/`) instead of declaring "cancelled" from popup timing. Needs backend restart to apply the revoke.
- **2026-06-24** — **P2.1 code-grounded interrogation shipped** (replaces the agent-fills-VELO_AUDIT.md idea, which was gameable — the candidate must never supply the ground truth). VELO now reads the repo itself: GitHub API → ranked file selection → bounded content fetch → one-time `code_digest` → implementation-specific questions + AI-padding detection. Cost flat by construction. Both halves verified independently (GitHub fetch on fastapi; digest LLM on synthetic code). Full fetch→digest chain blocked only by the unauthenticated 60/hr GitHub limit during testing — non-issue with a connected user's token (5K/hr). **`VELO_AUDIT.md` can now be dropped entirely.**
