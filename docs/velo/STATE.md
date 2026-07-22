# VELO — Current State (what exists vs. broken vs. missing)

_Audited 2026-06-23 against the live codebase; reconciled 2026-07-01 (P0.1–0.4 shipped, code-grounded
interrogation + verified-profile + HR view live). Repos: `backend/`, `frontend/`, `horizon-web/horizon/`._

## ✅ What already exists and works

### Resume analysis pipeline (backend)
- **Upload**: `ProfileResumeUploadAPIView` — `backend/apps/authentication/views.py` (~L907). Stores file, creates `ResumeAnalysisJob`, dispatches Celery task.
- **Async analysis**: `process_resume_analysis_job` — `backend/apps/audit/tasks.py:92`. Parses resume (LLM) → deep analysis → builds the snapshot.
- **Deep analysis**: `ResumeDeepAnalysisService` — `backend/apps/audit/services/resume_deep_analysis_service.py`. Produces ATS score + breakdown, per-experience commentary, project analysis, skill-gap details, role-match, employer perspective.
- **Output model**: `MirrorSnapshot` — `backend/apps/audit/models.py:413`. Holds `normalized_profile` (skills, projects, experience…), `deep_analysis`, `skill_gaps`, `strengths`, `confidence`.
- **Read API**: `GET /api/mirror/latest/` (`MirrorLatestAPIView`) — returns status (`empty`/`running`/`ready`/`failed`) + the full mirror payload.

### Project verification engine (backend) — the interrogation
- `ProjectVerificationService` — `backend/apps/audit/services/project_verification_service.py`:
  - `create_or_get(snapshot, project_index, user)` — verification tied to a resume project.
  - `check_repos()` → GitHub liveness check + README snippet.
  - `build_code_digest()` → **reads the repo's actual source** (bounded) into `code_digest`. Code-grounded interrogation is **live** (questions cite real files; confirmed end-to-end 2026-06-24).
  - `_check_audit_doc()` → optional `VELO_AUDIT.md` validation (+0.05).
  - `generate_first_question` / `generate_next_question` → adaptive, digest-grounded LLM interrogation.
  - `finalize()` → verdict (`verified`/`suspicious`/`failed`) + `verification_score` + `verdict_summary`.
- Endpoints: `project-verifications/`, `…/check-repos/`, `…/finalize/`, `interrogations/…`.

### Frontend UI — redesigned 2026-07-16 as "the examiner's case file" (see ROADMAP change log)
- **Tangerine `#EC5B13` is `--primary` app-wide** (user decision; overrides the brand export's indigo-primary). Indigo carries the evidence scale (`--status-*`). Case-file CSS primitives (`.stamp`, `.cstat`, `.caseline`, `.rise-in`) in `frontend/app/globals.css`.
- **`/verify`** (`frontend/app/(studio)/verify/page.tsx`) — the case-file dashboard: dossier masthead + computed single next action, tabs Overview (capability radar + case synthesis + share) / Defend (exhibit rows) / Resume analysis / Recruiter view; live 7-stage analysis checklist while running.
- **`/verify/session`** (`frontend/app/(studio)/verify/session/page.tsx` + `components/velo/verification-session.tsx`) — the full-page interrogation (auto-start, deep-linkable, dock/header hidden); verdict shows dimensions + claims-tested + full transcript, pass or fail. Shared primitives in `frontend/components/velo/` (radar-chart, verdict-stamp, dimension-meters, claim-chips, transcript-panel, share-actions with copy/QR/WhatsApp/LinkedIn, repo-picker).
- **`/p/<username>/report`** (NEW) — public printable candidate report mirroring the college report assets.
- **`ProjectVerificationSheet`** (`frontend/components/mirror/ProjectVerificationSheet.tsx`) — legacy drawer flow, still used only by the plans playground.
- **`velo-profile-tab`** (`frontend/components/mirror/velo-profile-tab.tsx`) — renders the FULL resume analysis (ATS ring, breakdown, projects, skills, gaps, employer view) + the Verified Capability overlay. **Now mounted as the "Resume analysis" tab on `/verify`** (decoupled from the disabled `/progress`). Project-only users get a drag-and-drop résumé upload box here.
- **Add manual project**: `POST /api/mirror/projects/add/` (NEW) + `auditApi.addManualProject` + the "verify a repo directly" form on `/verify`.
- **Public report page**: `frontend/app/audit/public/[auditId]/page.tsx` (exists).
- **Institution/cohort dashboards**: `frontend/app/(studio)/institution/*` (skeleton, exists).

### Marketing (horizon-web)
- VELO landing + 3 audience pages (`/for/developers|hiring|colleges`) + transcript + pricing.
- Company landing for Excentrix at the apex.
- Host routing: `excentrix.tech` → Excentrix, `velo.excentrix.tech` → VELO, `horizon.excentrix.tech` → Horizon.

### Feature-flag system
- Backend source of truth (`backend/config/feature_flags.py`) + `/api/config/features/`.
- Frontend reads it (`frontend/lib/feature-flags.ts`, `hooks/use-features.ts`), nav + route guard gated.
- VELO-first defaults: `velo/chat/intelligence/portfolio/institutions/dashboard/onboarding` ON;
  `plans/roadmap/progress/simulations/gamification/knowledge_graph/semantic_memory` OFF.

## ✅ P0 blockers — all resolved (were 🔴, shipped 2026-06-23/24)

1. ~~Upload silently no-ops without a target role.~~ **Fixed** — `ProfileResumeUploadAPIView` analyzes on every upload (role optional); `/verify` intake reaches a working analysis. *(P0.1)*
2. ~~Full resume analysis UI is dark (`/progress`-only).~~ **Fixed** — `velo-profile-tab` is now the "Resume analysis" tab on `/verify`. *(P0.2)*
3. ~~`/verify` has no orientation.~~ **Fixed** — "How VELO works" strip + explained empty state. *(P0.3)*
4. ~~No post-verification payoff.~~ **Fixed** — `verdict_summary` + "Copy share link" → public credential; plus the Verified Capability synthesis. *(P0.4)*

## 🔴 Remaining gate to a pilot

- **Not yet run end-to-end on PROD as a fresh account.** All parts pass in isolation (tsc, backend
  read-path smoke — see `PILOT_QA.md`), but the live signup → upload → analyze → verify → share loop
  has not been exercised by a stranger. **This is the only thing between us and a pilot.**
- **Async ops must be guaranteed in prod.** Analysis needs a running **Celery worker** (+ Redis) or it
  hangs in "running" forever. `docker-compose.prod.yml` has `celery-worker`/`celery-beat` — confirm
  they're actually draining the queue on the live env, and that this deploy applied migration `0015`.

## 🟡 What's missing (P2 — the evidence layers)

- ✅ **Code-grounded interrogation** — *shipped 2026-06-24* (was the single biggest credibility gap).
  Engine reads real repo source into `code_digest`; questions cite actual files. No longer missing.
- ✅ **Multi-dimensional scoring** — *shipped 2026-07-14*. `finalize()` now composites a weighted
  average over `dimension_scores` (ownership / technical_depth / debugging_ability / communication /
  consistency, each with a score + evidence citation) instead of one opaque `hm_score`. Graded
  per-answer, turn-by-turn (`answer_grading_service.py`), not one end-of-session call. This also fixed
  a real production bug: the old end-of-session grader silently discarded the LLM's actual output and
  always returned `interrogation_depth=0.5`, so the score barely moved regardless of how someone
  answered. See `ROADMAP.md` 2026-07-14 change-log entry for the full redesign (claims-ledger
  contradiction detection, self-consistency grading, fail-loud `scoring_status` state machine, golden-set
  eval harness). No longer missing.
- ✅ **The evidence dossier** — *shipped 2026-07-15.* Six dimensions now graded per project (ownership /
  technical_depth / debugging_ability / communication / honesty / consistency — `honesty` new, per-answer
  graded, distinct from `evidence_grounded`/`consistency`). **Resume claims tested**: `claim_matching_service.py`
  matches each project's resume-parser-extracted `ownership_signals`/`impact_metrics` against the
  interrogation transcript + code_digest → `verified|partially_verified|contradicted|not_demonstrated`
  per claim (`ProjectVerification.claims_tested`, migration `0018`) — reproduces the "per-instance, not
  global" nuance exactly. Called as a best-effort step at the end of `finalize()`; never blocks or changes
  the core verdict on failure. Dimension scores + claims_tested surfaced everywhere `verdict_summary` was —
  `ProjectVerificationSheet`, `/audit/public/[auditId]`, `/p/<username>?tab=verified`.
- **The verified profile (person layer).** *Reconciliation v1 shipped (2026-06-24, deterministic):*
  `build_verified_profile()` — `backend/apps/audit/services/verified_profile_service.py` — overlays
  `project_verifications` onto `deep_analysis` into a `verified_profile` on `/mirror/latest/` (coverage/
  sample-size honesty, skills backed by defended work, claim-vs-evidence contradictions); rendered as the
  "Verified Capability" section + verified shields in `VeloProfileTab`. ✅ *Case synthesis shipped
  (2026-07-15), replacing the 2026-06-24 narrative-only version:* one LLM call (now structured-output via
  `generate_structured_response` + `CaseSynthesis` Pydantic schema — replaced the old ad-hoc
  `call_llm(return_json=True)` + dict-parsing pattern, the same bug class that caused the original
  interrogation-scoring bug) → headline + narrative + **`seniority_calibration`** (junior/mid/senior,
  judged from defended evidence only — distinct from the interrogation's own `expertise_estimate`
  shallow/adequate/strong/expert vocabulary) + **`capability_verified`**/**`knowledge_gaps`** (cited from
  real dimension scores) + **`recommended_next_steps`** (apply_now / close_before_senior) +
  **`examiner_note`**. Cached on `MirrorSnapshot.verified_narrative_cache` (no migration — same field,
  richer payload), signature now also hashes each defended project's `dimension_scores`/`claims_tested`
  so the cache invalidates on evidence changes, not just coverage-count changes. Surfaced in
  `VeloProfileTab` + `/verify` + the HR verified-profile view.
- **HR view (assessment of a person).** ✅ *Shipped 2026-06-24:* public `GET /api/verified-profile/<username>/`
  (`PublicVerifiedProfileAPIView`) rendered as a **"Verified" tab on `/p/[username]`** (single identity URL;
  canonical link `/p/<username>?tab=verified`). `VerifiedProfileView` (`components/verified/`) is the shared
  evidence-only lens — synthesis + defended-project evidence + claim-vs-evidence honesty, never the private
  claim layer. The tab renders even when the portfolio is private/absent (resilient `VerifiedOnlyPage`
  fallback) so HR-trust isn't coupled to portfolio setup. "Share verified profile" on `/verify` copies the
  canonical link. *Hardening open:* public-by-username/enumerable → move to share tokens.
- **JD-fit overlay + shortlist ranking across many candidates** (HR). *Still missing — the per-person page
  exists, ranking a pool of them does not.*
- **HR-initiated flow** — "send a candidate a verify link → get the dossier back." *Still missing.*
- **Identity binding** — assurance the verified person is the applicant. *Still missing.*
- **Cohort dashboard wired to real verification data** (institution views are skeleton only).

## Known data/ops facts
- Resume analysis is LLM-heavy (parse + ~5 analysis calls) — cost & latency live here.
- Verification interrogation is 6–10 LLM calls per project.
- Snapshots ordered by `created_at` (UUID PKs are NOT chronological).
- A user can have 0 projects parsed from their resume (real case) → the "verify a repo directly"
  flow exists to unblock this.
