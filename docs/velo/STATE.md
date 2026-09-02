# VELO — Current State (what exists vs. broken vs. missing)

_Audited 2026-06-23 against the live codebase; reconciled 2026-07-01 (P0.1–0.4 shipped, code-grounded
interrogation + verified-profile + HR view live). Repos: `backend/`, `frontend/`, `horizon-web/horizon/`._

## ✅ What already exists and works

### Real full-loop QA run (backend/API)
- **2026-09-02 run**: `velo.qa.candidate@example.com` / `velo_qa_candidate` used a real uploaded résumé (`resume_source=async_upload`), completed analysis job `d2baa4a7-7d12-44f5-ae13-4c7a6e469c60`, ready mirror `b0bf71df-0474-4863-ba49-06996ad846d7`, and connected GitHub account `SidKarthik1437`.
- Verified real parsed project **Databeast** against real public repo `https://github.com/excentrix/databeast_server` through the same authenticated HTTP endpoints the frontend uses. Repo check passed, VELO generated code-grounded questions from `app.py`, eight answers were submitted through `/api/interrogations/<session_id>/answer/`, Celery graded the answers, and finalize returned `verified` with score `0.899`.
- Extended the same account to a multi-project profile on 2026-09-02: **QP AI** (`https://github.com/excentrix/QB_AI_POC`) verified at `0.903` after 9 generated questions; **Brain Tumor Segmentation** (`https://github.com/SidKarthik1437/BrainTumor`) verified at `0.883` after 13 generated questions; **Restoman** (`https://github.com/SidKarthik1437/restoman`, `https://github.com/SidKarthik1437/restoman-backend`) verified at `0.886` after 13 generated questions, with strong caveats about prototype/scaffold status.
- `/api/verified-profile/velo_qa_candidate/` now returns `verified_project_count=4`, `coverage=partial`, headline `Verified backend, data, ML development; honest about prototypes`, and a synthesis that distinguishes strong ownership/debugging from incomplete production hardening and unproven impact metrics.
- Public report APIs returned complete output: `/api/audits/2df5d36c-1839-40a7-b3cf-3c8e0355a2fa/public/` exposed the transcript, claims-tested rows, dimensions, and files analyzed; `/api/verified-profile/velo_qa_candidate/` returned the person-level verified profile with background-generated case synthesis.
- This proves the local configured backend/API path with real auth/GitHub/résumé/LLM/Celery. It does **not** replace a browser-based production stranger QA run.

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
- **Voice answer input** — *shipped 2026-09-03; realtime upgraded 2026-09-03:* candidates can
  answer by voice in `/verify/session`; microphone audio streams as 16 kHz PCM over
  `ws/audio/transcription/stream/` into Google Cloud Speech-to-Text, so interim/final transcript
  text appears while the candidate is still speaking. The older Gemini batch endpoint
  (`POST /api/interrogations/<session_id>/transcribe-answer/`) remains available as a fallback/test
  path; its Gemini API route uploads WAV and calls the current Interactions REST schema.
  The transcript is inserted into the existing text answer box for candidate review/editing before
  submission, so scoring still runs on the durable text transcript and the existing
  `AnswerEvaluation`/claims/dossier pipeline remains unchanged.

### Frontend UI — redesigned 2026-07-16 as "the examiner's case file" (see ROADMAP change log)
- **Tangerine `#EC5B13` is `--primary` app-wide** (user decision; overrides the brand export's indigo-primary). Indigo carries the evidence scale (`--status-*`). Case-file CSS primitives (`.stamp`, `.cstat`, `.caseline`, `.rise-in`) in `frontend/app/globals.css`.
- **`/verify`** (`frontend/app/(studio)/verify/page.tsx`) — the case-file dashboard: dossier masthead + computed single next action, tabs Overview (capability radar + case synthesis + share) / Defend (exhibit rows) / Resume analysis / Recruiter view; live 7-stage analysis checklist while running.
- **`/verify/session`** (`frontend/app/(studio)/verify/session/page.tsx` + `components/velo/verification-session.tsx`) — the full-page interrogation (auto-start, deep-linkable, dock/header hidden); verdict shows dimensions + claims-tested + full transcript, pass or fail. Shared primitives in `frontend/components/velo/` (radar-chart, verdict-stamp, dimension-meters, claim-chips, transcript-panel, share-actions with copy/QR/WhatsApp/LinkedIn, repo-picker).
- **`/p/<username>/report`** (NEW) — public printable candidate report mirroring the college report assets.
- **`ProjectVerificationSheet`** (`frontend/components/mirror/ProjectVerificationSheet.tsx`) — legacy drawer flow, still used only by the plans playground.
- **`velo-profile-tab`** (`frontend/components/mirror/velo-profile-tab.tsx`) — renders the FULL resume analysis (ATS ring, breakdown, projects, skills, gaps, employer view) + the Verified Capability overlay. **Now mounted as the "Resume analysis" tab on `/verify`** (decoupled from the disabled `/progress`). Project-only users get a drag-and-drop résumé upload box here.
- **Add manual project**: `POST /api/mirror/projects/add/` (NEW) + `auditApi.addManualProject` + the "verify a repo directly" form on `/verify`.
- **Public report page**: `frontend/app/audit/public/[auditId]/page.tsx` (exists).
- **Institution/cohort dashboards**: `frontend/app/(studio)/institution/*`. The general HQ admin
  system (`apps/institutions`) and readiness-score institution views were already real, not skeleton
  — this entry was stale. As of 2026-09-03, a **"Verification" tab** (`institution/verification/`)
  wires the HQ admin system to real defended-evidence data (coverage/seniority distribution, avg
  dimension scores, "claimed, never probed" skills, per-student drill-down) via new
  `institution_verification_service.py` + `/api/audits/institutions/verification/*`, org-scoped and
  HQ-superuser-browsable via `?org=`. **Cohort-level analytics & reporting** shipped the same day:
  a "VELO Verification" section on `/institution/reports` (bucketed dimension-score distributions +
  a deterministic playbook + CSV export), scoped via `CohortMembership` (`build_verification_cohort_report`),
  gated by a new shared `_resolve_cohort_for_request` (also de-duplicated 3 existing inline checks in
  `apps/institutions/views.py`) — see ROADMAP change log. **Standalone printable/PDF cohort report**
  also shipped 2026-09-03: `/institution/reports/cohort/<id>/print`, matching the shape of the
  marketing samples (`docs/velo/assets/sample-cohort-report.html`) — masthead, deterministic verdict
  headline, placement-ready KPI, a named showcase shortlist (verified students to send recruiters,
  each linking to their live profile), split train-on/showcase-now recommendations, `window.print()`
  → PDF (same mechanism as `/p/<username>/report`). Nothing left open on the reporting side beyond
  program-quality metrics.

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
- **The verified profile (person layer).** *Reconciliation v1 shipped (2026-06-24, deterministic);
  skill promotion rebuilt on real evidence (2026-09-02):* `build_verified_profile()` —
  `backend/apps/audit/services/verified_profile_service.py` — overlays `project_verifications` onto
  `deep_analysis` into a `verified_profile` on `/mirror/latest/` (coverage/sample-size honesty, claim-vs-
  evidence contradictions); rendered as the "Verified Capability" section + verified shields in
  `VeloProfileTab`. **Skills are promoted only from `AnswerEvaluation.skills_demonstrated`** (per-answer
  LLM judgment of what was actually substantiated, canonicalized against a new `SkillTag` vocabulary —
  `apps/audit/services/skill_tags.py`) — **not** from a verified project's declared tech-stack list
  (the old `proven_by_tech` behavior, which promoted any claimed skill in scope regardless of whether the
  interrogation ever asked about it). A claimed-but-never-probed skill is surfaced honestly as
  `claimed_unverified_skills` instead of silently promoted. Question generation now tags a
  `skills_targeted` per question (`interrogation_state.question_skills`), feeding grading's
  `skills_demonstrated` judgment. ✅ *Case synthesis shipped
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
  `VeloProfileTab` + `/verify` + the HR verified-profile view. **`seniority_calibration` now has a
  cross-candidate reference distribution** (2026-09-02): `SeniorityCalibrationSample` (one row per
  candidate, upserted) + `apps/audit/services/calibration_stats_service.py` compute percentile buckets +
  level distribution, cached and refreshed nightly by a Celery beat task; the profile output gains a
  deterministic (non-LLM) `calibration_reference` with a real percentile, and the synthesis prompt is fed
  distribution summary stats so the LLM's own junior/mid/senior judgment is anchored instead of made in a
  vacuum. Cold-start guarded (`MIN_CALIBRATION_SAMPLES=20`) — `insufficient_data` until enough profiles
  exist; backend-only so far, no frontend surfacing yet. **Golden-set eval harness added for the
  case-synthesis call itself** (`apps/audit/tests/eval/test_case_synthesis_golden_set.py`), the same
  real-LLM/gated discipline the interrogation-grading harness already had, verified passing against a real
  Gemini call.
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
- ✅ **Cohort dashboard wired to real verification data** — *shipped 2026-09-03.* Org-level (not yet
  cohort-level — no FK path from audit models to `Cohort` today) "Verification" tab in the HQ admin
  system. See the "Institution/cohort dashboards" entry above + ROADMAP change log. *Still open:*
  cohort-level filtering, recruiter-facing showcase view.

## Known data/ops facts
- Resume analysis is LLM-heavy (parse + ~5 analysis calls) — cost & latency live here.
- Verification interrogation is 6–10 LLM calls per project.
- Snapshots ordered by `created_at` (UUID PKs are NOT chronological).
- A user can have 0 projects parsed from their resume (real case) → the "verify a repo directly"
  flow exists to unblock this.
