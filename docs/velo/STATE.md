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

### Frontend UI
- **`/verify`** (NEW, `frontend/app/(studio)/verify/page.tsx`) — VELO hub: resume intake, projects list, status, opens the interrogation. Doubles as the VELO dashboard.
- **`ProjectVerificationSheet`** (`frontend/components/mirror/ProjectVerificationSheet.tsx`) — the working interrogation flow (repos → check → adaptive Q&A → verdict).
- **`velo-profile-tab`** (`frontend/components/mirror/velo-profile-tab.tsx`) — renders the FULL resume analysis (ATS ring, breakdown, projects, skills, gaps, employer view) + the Verified Capability overlay. **Now mounted as the "Resume analysis" tab on `/verify`** (decoupled from the disabled `/progress`). Project-only users get a drag-and-drop résumé upload box here.
- **Add manual project**: `POST /api/mirror/projects/add/` (NEW) + `auditApi.addManualProject` + the "verify a repo directly" form on `/verify`.
- **Public report page**: `frontend/app/audit/public/[auditId]/page.tsx` (exists).
- **Institution/cohort dashboards**: `frontend/app/(studio)/institution/*` (skeleton, exists).

### Marketing (horizon-web)
- VELO landing + 3 audience pages (`/for/developers|hiring|colleges`) + transcript + pricing.
- Host routing: `excentrix.tech` → VELO, `horizon.excentrix.tech` → Horizon.

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
- **Multi-dimensional scoring.** `finalize()` produces one capability score (+ `hm_score` /
  `code_signature_score` / `consistency_score`, which are honesty/consistency-flavored). Still no clean
  ownership / judgment / debugging / communication / seniority breakdown.
- **The evidence dossier.** Transcript + dimension scores + green/red flags + recommendation, surfaced
  on the result and the public page. (Partial: `verdict_summary` + the public credential page exist;
  the multi-dimensional breakdown does not.)
- **The verified profile (person layer).** *Reconciliation v1 shipped (2026-06-24, deterministic):*
  `build_verified_profile()` — `backend/apps/audit/services/verified_profile_service.py` — overlays
  `project_verifications` onto `deep_analysis` into a `verified_profile` on `/mirror/latest/` (coverage/
  sample-size honesty, skills backed by defended work, claim-vs-evidence contradictions); rendered as the
  "Verified Capability" section + verified shields in `VeloProfileTab`. *LLM narrative synthesis shipped
  (2026-06-24):* `_generate_narrative()` → cached honest headline + capability statement
  (`MirrorSnapshot.verified_narrative_cache`, migration `0015`), surfaced in `VeloProfileTab` + `/verify`.
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
