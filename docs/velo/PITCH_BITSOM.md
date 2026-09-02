# BITSOM VERTEX × H2S — Builders Pitch Fest 2026

**Submission — Excentrix (VELO)** · excentrix.tech · Bangalore, India

> Revised September 2026. All third-party statistics in this document are sourced; see the
> **Sources** block under each section. Pricing is set: hiring teams ₹100–200/verification;
> colleges an annual per-seat credit pack with a 12-verification/seat/year minimum at
> ₹100–150/verification. Still to add before submission: demo-video, docs, and GitHub links
> in the Supporting Material table.

---

## Startup Snapshot

### 1. What does your startup do?

Excentrix builds **VELO — a proof-of-work verification layer** for a world where AI can
generate a flawless repo, README, and résumé in an afternoon.

A developer submits a GitHub repository and a one-line claim about what they built. VELO runs
a **liveness check** to confirm the work is real and theirs, then an **AI examiner conducts an
adaptive interrogation** of 6–10 questions about their own code — probing harder wherever an
answer is vague or inconsistent. The output is a **defensibility score** and a **public,
shareable proof-of-work credential** with a full inspectable transcript.

The same engine serves three sides of one problem:

- **Developers** who want to prove they can defend what they built.
- **Hiring teams** who want a verdict before they spend an interview slot.
- **Colleges** who want to send graduates into placements with proof instead of claims.

### 2. What milestone best represents your progress so far?

**The full verification pipeline runs end-to-end in production, and college pilots are live.**

The verification flow — liveness, adaptive interrogation, grading, credential — runs
unattended in production on repositories it has never seen, validated against real public
GitHub repositories through the same authenticated API the product uses (verified scores of
0.88–0.90 across 9–13 adaptively generated questions per project).

On the ground:

- **Pilots running in 3 colleges, 50 seats each.**
- **Institutional MoUs in progress.**
- Pricing is live across all three segments.

The committed target for this financial year is to convert those pilots into signed cohorts
and scale toward **5 colleges × 300 seats** (1,500 verified graduates) ahead of placement
season.

- **Developers:** free first verification; ₹399/month for ongoing use.
- **Hiring teams:** pay-per-verification credit packs — **₹100–200 per verification** (volume-tiered).
- **Colleges:** per-seat credit packs, billed annually — **minimum 12 verifications per seat per
  year** at **₹100–150 per verification** (≈ **₹1,200–1,800 per seat per year**).

---

## Problem Understanding

### 1. What problem are you solving, and who experiences it most acutely?

Generative AI has made the signals hiring relied on for a decade — a clean repo, a polished
README, a well-written résumé, a busy commit history — **trivially fakeable**, and the volume
of AI-assisted applications has broken the filters built to handle them.

| Signal of the crisis | Data point | Source |
| --- | --- | --- |
| AI-driven application volume | LinkedIn now receives **~11,000 job applications per minute — up 45% YoY**, driven by AI submission tools | eWeek, 2025 |
| Recruiter overload | Applications per role up **111%**; applications *per recruiter* up **412%** (2025) | Greenhouse 2025 Workforce & Hiring Report |
| Fake profiles | By 2028, **1 in 4 (25%)** candidate profiles worldwide will be fake | Gartner, 2025 |
| Admitted interview fraud | **6%** of 3,000 surveyed candidates admitted to interview fraud (impersonation / proxy) | Gartner 2Q25 survey |
| Fabricated evidence | **28%** of job seekers admit using AI to generate fake work samples; **32%** claim AI skills they don't have | Greenhouse, 2025 |
| Credential distrust | **74%** of hiring managers are more worried about fake credentials and deepfakes than a year ago | Greenhouse, 2025 |
| Résumé embellishment | **64%** of workers admit lying about skills, experience or references at least once (up from 55% in 2022) | StandOut CV, 2024 |
| Assessment integrity | Cheating / fraud attempts on proctored coding assessments **more than doubled — 16% → 35%** — in 2025 | CodeSignal, 2025 |
| Employer response | **62%** of employers reject résumés that read as unpersonalised AI-generated templates | Resume Now, 2025 |

What **cannot** be generated is the ability to **defend work under questions that adapt to
your answers** — making real-time defensibility the one signal that still discriminates
between someone who built something and someone who prompted for it.

Felt most acutely by three groups:

1. **Technical hiring managers and recruiters**, buried in near-identical AI-polished
   applications, who can no longer use a portfolio as a reliable pre-interview filter.
2. **College placement cells** under pressure to deliver outcomes for a cohort whose project
   claims employers increasingly discount.
3. **Developers themselves**, who did the work but have no way to prove it stands apart from
   AI-padded peers.

**Sources:**
[eWeek — 11,000 applications/minute](https://www.eweek.com/news/ai-job-applications-linkedin/) ·
[Greenhouse 2025 Workforce & Hiring Report](https://www.greenhouse.com/blog/greenhouse-2025-workforce-hiring-report) ·
[Gartner — 1 in 4 fake by 2028 (via HR Dive)](https://www.hrdive.com/news/fake-job-candidates-ai/757126/) ·
[Gartner 2Q25 candidate-fraud survey](https://www.gartner.com/en/newsroom/press-releases/2025-07-31-gartner-survey-shows-just-26-percent-of-job-applicants-trust-ai-will-fairly-evaluate-them) ·
[CodeSignal — assessment fraud doubled in 2025](https://codesignal.com/newsroom/press-releases/codesignal-detection-systems-identify-and-stop-record-high-cheating-attempts-as-assessment-fraud-more-than-doubled-in-2025/) ·
[StandOut CV — resume-lie survey](https://www.hrotoday.com/news/over-half-of-employees-report-lying-on-resumes/) ·
[Resume Now — AI applicant report](https://www.resume-now.com/job-resources/careers/ai-applicant-report)

### 2. What evidence validates that this is a meaningful problem worth solving?

- **Both sides have stopped trusting the pipeline.** HireRight's 2025 Global Benchmark Report
  found **more than 75% of employers globally uncovered candidate discrepancies** during
  background screening in the prior 12 months. Gartner found **only 26% of applicants** trust
  AI will evaluate them fairly, while Greenhouse found **70% of hiring managers** trust AI to
  make faster, better decisions and **only 8% of job seekers** call it fair — trust is
  collapsing from both directions at once.
- **The threat is already operational, not hypothetical.** The US Department of Justice has
  reported **300+ US companies, including members of the Fortune 500**, infiltrated by fake
  (state-sponsored) job applicants using AI scripts, voice clones and deepfakes.
- **Founder-led discovery.** Partners **Siddharth Karthikeyan** and **Shrisai** have engaged
  directly with builder communities, including the **IIT Guwahati AI Builders meetup**, where
  the same concern surfaced repeatedly from people evaluating technical talent: portfolios and
  résumés no longer separate signal from noise the way they used to.
- **Structural reality in India.** AICTE approved **14.90 lakh B.Tech seats for 2024–25**,
  of which **12.53 lakh were filled** (15.98 lakh approved for 2025–26). The **India Skills
  Report 2025** puts overall graduate employability at **54.81%** and engineering-graduate
  employability at **71.5%** — yet the **Unstop Talent Report 2025** found **83% of 2024
  engineering graduates** were still without a job or internship. Roughly a million graduates
  a year enter a market where their project claims are already discounted and they have no
  credible way to prove otherwise.

**Sources:**
[HireRight 2025 Global Benchmark Report](https://www.hireright.com/company/newsroom/hireright-survey-finds-88-percent-of-employers-have-found-a-misrepresentati) ·
[Gartner — 26% of applicants trust AI](https://www.gartner.com/en/newsroom/press-releases/2025-07-31-gartner-survey-shows-just-26-percent-of-job-applicants-trust-ai-will-fairly-evaluate-them) ·
[Greenhouse — AI trust crisis (70% vs 8%)](https://www.greenhouse.com/newsroom/an-ai-trust-crisis-70-of-hiring-managers-trust-ai-to-make-faster-and-better-hiring-decisions-only-8-of-job-seekers-call-it-fair) ·
[Greenhouse — candidate fraud & DOJ 300 companies](https://www.greenhouse.com/blog/what-is-candidate-fraud-and-how-can-recruiters-prevent-it) ·
[AICTE B.Tech seats 2024–25 (India Education Diary)](https://indiaeducationdiary.in/aicte-data-reveals-surge-in-btech-seats-for-2024-25-south-india-holds-over-40/) ·
[India Skills Report 2025 (Wheebox, PDF)](https://wheebox.com/assets/pdf/ISR_Report_2025.pdf) ·
[Unstop Talent Report 2025 — 83% without job/internship (via Sakshi Education)](https://education.sakshi.com/en/engineering/education-news/engineering-talent-gap-71-employable-only-17-hired-183130)

---

## Customer & Market

### 1. Who is your ideal customer, and who makes the buying decision?

| Segment | Buyer | Buying motion |
| --- | --- | --- |
| **Developers** | The developer themselves | Self-serve; free first verification → ₹399/mo |
| **Hiring teams** | Technical hiring manager, recruiter, or TA lead | Credit pack — **₹100–200 per candidate verified** |
| **Colleges** | Training & Placement Officer or Department Head | Annual per-seat credit pack — **min 12 verifications/seat/year @ ₹100–150** (≈ ₹1,200–1,800/seat/year) |

Developers are the **bottom-up entry point** — they verify their work, share the credential,
and pull hiring teams and colleges in. Hiring teams are the **primary revenue side**. Colleges
are the **institutional anchor** that drives cohort-scale adoption.

### 2. How large is the opportunity you are targeting?

**TAM — Total Addressable Market**

| Layer | Sizing basis | Source |
| --- | --- | --- |
| Global candidate skills assessment | **USD 2.86B (2024)**, ~**11.3% CAGR** to 2034 (→ ~USD 8.4B) | Polaris Market Research |
| Adjacent — coding interview platforms | **~USD 450M (2024) → USD 1.8B (2033)**, 14.9% CAGR | DataHorizzon Research |
| India technical hiring | FY26 white-collar hiring **+8% YoY** (strongest in 3 years); **AI/ML roles +45%**; fresher hiring **+16% YoY** | Naukri JobSpeak, 2026 |
| India graduate pipeline | **~12.5 lakh B.Tech students enrolled per cycle** across AICTE-approved institutions | AICTE, 2024–25 |

**SAM — Serviceable Addressable Market (practical 3-year reach in India)**

A grounded scale-up from the Year-1 pilot base, not a top-down slice of TAM:

| Segment | 3-year serviceable scenario | Annual recurring |
| --- | --- | --- |
| **Colleges** | ~40 institutions × ~300 seats = **12,000 seats** × 12 verifications/seat/year × ~₹125 | **~₹1.5–2.0 Cr/yr** |
| **Hiring teams** | ~50 recurring accounts × ~800 verifications/year × ~₹150 | **~₹0.4–0.6 Cr/yr** |
| **Developers** | ~4,000–6,000 paying subscribers × ₹399/mo | **~₹1.9–2.9 Cr/yr** |
| **India SAM** | | **~₹3.5–5.0 Cr/yr recurring** |

International developer self-serve (portable credential, priced at ₹399/mo parity) is upside on
top of this and not counted in the figure.

**SOM — Serviceable Obtainable Market (current financial year)**

The committed pilot target this financial year is **5 colleges × 300 seats each**. The
hiring-team and developer lines below are opportunistic — inbound and community-led, not
sales targets we are staffing for yet.

| Segment | Basis | Volume | Revenue |
| --- | --- | --- | --- |
| **Colleges** *(committed target)* | **5 institutions × 300 seats = 1,500 seats** | 1,500 × 12 = **18,000 verifications** @ ₹100–150 | **₹18–27 lakh** |
| Hiring teams *(opportunistic)* | inbound pilot accounts off the college reference base | ~3,000–4,500 verifications @ ₹100–200 | ₹4–9 lakh |
| Developers *(opportunistic)* | community-led free-tier; 3–5% convert | 300–500 subs × ₹399/mo | ₹7–12 lakh |
| **FY revenue target** | | | **≈ ₹30–48 lakh (~₹0.3–0.5 Cr)** |

The **5-college / 300-seat cohort** is the whole plan for the year — ~60% of target revenue,
1,500 verified graduates as proof of the model, and the reference base that makes the
hiring-team and wider institutional sales possible next year.

**Sources:**
[Polaris Market Research — candidate skills assessment market](https://www.polarismarketresearch.com/industry-analysis/candidate-skills-assessment-market) ·
[DataHorizzon — coding interview platform market](https://datahorizzonresearch.com/coding-interview-platform-market-46279) ·
[Naukri JobSpeak 2026](https://www.naukri.com/blog/naukri-jobspeak-white-collar-hiring-grows-6-in-june-2026-ai-ml-and-fresher-hiring-lead-the-charge/) ·
[AICTE enrolment 2024–25 (India Education Diary)](https://indiaeducationdiary.in/aicte-data-reveals-surge-in-btech-seats-for-2024-25-south-india-holds-over-40/)

### 3. Unit economics (working model, to be validated in pilots)

| Line | Assumption | Note |
| --- | --- | --- |
| Cost / verification | **₹15–40** | ~10 interrogation LLM calls + grading + repo parse at current model pricing; to be measured at volume |
| Revenue / paid developer | **₹399/mo** | live; >85% gross margin even at 2–3 verifications/month — inference is the only material COGS |
| Contribution / hiring verification | **₹60–185** per verification | priced ₹100–200 against ₹15–40 cost → ~75–90% margin |
| Contribution / college seat | **~₹1,000–1,600** per seat/year | ₹1,200–1,800 priced against ~₹180–480 cost for the 12-verification minimum |
| Free-tier cost | 1 free verification/user = **₹15–40 CAC-equivalent** | the acquisition cost of the bottom-up motion |

The cost-sensitive surface is the **free tier at scale** (10,000 verifications ≈ ₹1.5–4L of
inference). This is treated as a marketing line, capped at one free verification per account,
with abuse controls on the liveness layer.

---

## Solution Overview

### 1. What is your solution, and how does it solve the identified problem?

VELO replaces static portfolio review with a **live, adaptive interrogation of a candidate's
own work**. Every follow-up question is generated from the candidate's previous answer rather
than pulled from a fixed bank — so it cannot be pre-written for or gamed the way a portfolio,
take-home test, or AI-generated project can. It directly tests the one thing generative AI
cannot yet fake: **real-time defensibility of your own decisions**.

### 2. Core capabilities

- **Repo + claim intake:** a GitHub repo and a one-line claim about what was built.
- **Liveness and authenticity check:** confirms the repository is real, owned by the
  candidate, and consistent with the claim — before any questioning begins (mechanism below).
- **Adaptive AI interrogation:** 6–10 questions on the candidate's own code, each conditioned
  on the previous answer, probing deeper wherever a response is vague or surface-level.
- **Rubric-based defensibility scoring & credential:** a public, verifiable proof-of-work
  credential with a full transcript recruiters can inspect themselves. (Calibration against
  real hiring outcomes is a post-pilot goal, not a current claim.)
- **Side-specific tooling:**
  - *Hiring teams:* candidate verification links, comparison views, shortlist dashboards.
  - *Colleges:* cohort onboarding, batch-level dashboards, placement-readiness reporting.

### 3. Measurable value

| Stakeholder | Value delivered |
| --- | --- |
| **Developers** | A shareable, public, inspectable credential that differentiates them from AI-padded peers |
| **Hiring teams** | A defensibility verdict *before* an interview slot is spent — less time lost screening candidates whose portfolios don't reflect their own understanding |
| **Colleges** | Cohort-level, placement-ready proof and a batch readiness dashboard — data-driven leverage with recruiters |

---

## Technology & AI Architecture

### 1. End-to-end flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          VELO Verification Flow                          │
├──────────────────────────────────────────────────────────────────────────┤
│  ① INTAKE            Candidate submits repo URL + one-line claim         │
│                         ↓                                                │
│  ② LIVENESS /        GitHub OAuth ownership + signed challenge ·         │
│     AUTHENTICITY     provenance signals scored · claim-vs-code check     │
│                         ↓                                                │
│  ③ ADAPTIVE          AI examiner generates each question from code +     │
│     INTERROGATION    prior answer · deeper on weak answers · 6–10 Qs     │
│                         ↓                                                │
│  ④ DEFENSIBILITY     Rubric-based evaluation of transcript against       │
│     SCORING          the codebase · score + confidence flag             │
│                         ↓                                                │
│  ⑤ CREDENTIAL &      Public shareable page · hiring comparison views ·   │
│     DISTRIBUTION     college cohort reports                              │
└──────────────────────────────────────────────────────────────────────────┘
```
*(An image version of this diagram is in the submission pack.)*

**Liveness / authenticity mechanism.** Ownership is proven by an authenticated **GitHub OAuth
grant plus a signed challenge** (token or commit). Provenance signals — commit cadence and
authorship distribution, force-push / squash history, issue and PR discussion, dependency and
scaffold fingerprints — are scored to flag repositories that were **bulk-generated or
transplanted** rather than iteratively built. Claim consistency checks the one-line claim
against the actual code surface. All of this runs **before** the interrogation, so a fabricated
or borrowed repo is caught at the gate.

### 2. What role does AI play?

AI is **the examiner itself**, not a supporting feature:

- It **authors each interrogation question in real time** from the specific codebase and the
  candidate's previous answer.
- It **decides when an answer is vague enough** to warrant a deeper follow-up — a unique
  question tree per session.
- It **contributes to the defensibility verdict**, scoring response quality against the code's
  actual implementation.

The question tree is *generated*, not *selected* — which is what makes the assessment
resistant to memorised or pre-written answers.

---

## Competitive Advantage

### 1. Alternatives today

| Alternative | What it tests | Limitation |
| --- | --- | --- |
| **Automated coding assessments** (HackerRank, CodeSignal) | Isolated, generic coding problems | Doesn't test whether a candidate can defend a project they *claim* to have built — and assessment fraud itself doubled to 35% in 2025 |
| **AI interviewers / vetting marketplaces** (Mercor, Micro1, Karat) | Structured or AI-led interviews, often feeding their own talent marketplace | Assess general capability or role-fit; they don't verify a claim to have built a *specific shipped project*, and the result is locked to their marketplace, not a portable credential the candidate owns |
| **Résumés, certifications, GitHub metrics** | Static signals | Generative AI has made all of these easy to fake or pad |
| **Live panel technical interviews** | Can probe defensibility | Slow, expensive, inconsistent across interviewers — impossible at cohort scale |
| **VELO** | **Whether a person can defend their own shipped work, under questions that adapt to them specifically, in ~15 minutes** | Scalable, consistent, produces a reusable credential the candidate carries |

That the "AI evaluates engineers" category now supports companies like **Mercor (~USD 10B
valuation, ~USD 450M ARR)** and **Micro1 (~USD 500M valuation)** is validation that the space
is real and investable — VELO occupies the specific, unclaimed slot of *verifying a claim
about a specific piece of shipped work*.

### 2. If a foundation-model provider shipped this feature tomorrow, why do you still win?

A foundation model could offer the underlying capability of asking adaptive questions about
code — but that is **not the product**. The moat is the workflow and trust layer around it:

1. **Liveness / authenticity verification** — the step that happens *before* any questioning.
2. **A defensibility scoring methodology** — a rubric and process, not a raw model output.
3. **A public, independently-checkable credential format** — the artifact that travels with
   the candidate.
4. **A three-sided standard** connecting developers, hiring teams, and colleges. *(This
   network is what we are building, not something we already have — but it is the durable
   moat once established, and a raw model API does not replicate it.)*

**Sources:**
[CNBC — Mercor $10B valuation](https://www.cnbc.com/2025/10/27/ai-hiring-startup-mercor-funding.html) ·
[TechCrunch — Micro1 $500M valuation](https://techcrunch.com/2025/09/12/micro1-a-competitor-to-scale-ai-raises-funds-at-500m-valuation/)

---

## Vision & Roadmap

### 1. Three-year growth plan

The engine is one flywheel: **colleges** create a supply of verified graduates → placement
cells hand those credentials to recruiters → **hiring teams (HR)** adopt VELO to filter, then
start *requesting* it from every candidate → **developers** verify themselves to keep up. We
seed the college side first because it produces the credential volume that pulls HR in.

| | **Year 1 — this FY** | **Year 2** | **Year 3** |
| --- | --- | --- | --- |
| **Colleges** | **5 pilots × 300 seats** = 1,500 verified graduates; measure placement-outcome lift vs the rest of each cohort | 15–20 institutions (~5–6k seats); renew Year-1 pilots on the outcome data | ~40 institutions (~12k seats); VELO issued alongside the degree at anchor colleges |
| **Hiring teams (HR)** | First **inbound** HR pilots off the verified-graduate base — recruiters filtering the pilot cohorts | 15–25 **recurring** credit-based accounts (product cos, GCCs, staffing); "send me your VELO link" enters JD language | ~50 recurring accounts; VELO credential a standard pre-interview ask in partner pipelines |
| **Developers** | 10k community-led free verifications; early free→paid conversion | 1,500–2,500 paying subscribers pulled in by HR demand | 4,000–6,000 paying subscribers; international self-serve opens |
| **Recurring revenue** | ≈ ₹0.3–0.5 Cr | ≈ ₹1.2–1.8 Cr | ≈ ₹3.5–5.0 Cr |
| **Engine work** | Harden interrogation + liveness against gaming | Comparison / shortlist dashboards for HR at account scale; calibrate scoring against Year-1 hiring outcomes | Longitudinal / multi-project profiles; team-level verification |

Year 3 lands on the **SAM figure** above (~₹3.5–5 Cr/yr recurring in India), with
international developer self-serve as upside on top.

### 2. Long-term vision

To become the **default trust layer for technical work** in a world saturated with
AI-generated output — where a verifiable, defensible proof-of-work credential is the standard
**developers** put on a résumé, what **hiring teams** ask for before an interview, and what
**colleges** issue alongside a degree.

---

## Team

### 1. Why is your team positioned to solve this?

The team has **shipped production software before** — across AI systems, cloud infrastructure,
and institutional/education tooling, including exam and IQAC-automation platforms that sit
close to how colleges evaluate and certify student outcomes. That prior work was not
commercialised; **VELO is Excentrix's first deliberate go-to-market effort.** What it gives
the team is domain insight into institutional evaluation plus a demonstrated ability to ship
complex systems end-to-end — the VELO production pipeline being the current example.

The group pairs **deep technical AI/ML and infrastructure capability** with **direct exposure
to the hiring and placement ecosystem**, sitting at the intersection of the three markets
VELO serves.

### 2. Team

**Siddharth Karthikeyan** — Technical & AI Systems. Leads the technical architecture behind
VELO — the adaptive interrogation engine, the liveness verification pipeline, and the
defensibility scoring method. Prior: satellite anomaly detection with ISRO; real-time AQI
prediction at IIIT-A; shipped university exam and IQAC-automation platforms that cut 2–3-month
result cycles to instant, auditable ones. AI/ML SME training faculty and students across
Indian universities.

**Shrisai** — GTM & Partnerships. Owns go-to-market and institutional partnerships — the
commercial motion across developer self-serve, hiring-team sales, and college placement-cell
relationships — plus the business model and positioning.

**Sidhanti Patil** — Growth & Product. Second-time founder; owns growth and product. Selected
for Longhash Ventures Cohort 9. Built as a founding engineer at blockchain and medtech
startups and won SIH 2023 — a builder's eye on product and a fast hand on go-to-market.

**Bhargav P Raj** — AI & Infrastructure. Shipped applied AI at IBM — a retrieval-grounded
conversational agent over OpenSearch and a multi-agent system on the watsonx Orchestrate ADK,
including a transformation engine that pairs a deterministic parser (structural correctness)
with a model-driven interpretive layer.

**Siri TC** — COO & Design. Runs operations and compliance, and owns how VELO looks and feels.
App development and product design at Schneider Electric; ex-IIIT-A apprentice on real-time
WQI analysis and prediction.

---

## Why BITSoM Vertex?

### 1. Why have you applied?

For **structured support in converting three distinct customer motions** — developer
self-serve, hiring-team sales, and college institutional sales — **into one coherent
go-to-market and business model.** Specifically:

- **Enterprise validation pathways** to pilot VELO with real hiring teams and corporate buyers.
- **Mentorship and Silicon Valley frameworks** (via LENZ) to build the institutional
  credibility enterprise and college buyers require before committing at scale.
- **Access to the BITS Pilani alumni network and BITSoM MBA student venture teams** for
  market research, BD, and distribution support.

### 2. Which challenge is currently limiting growth?

**Bridging a prosumer/developer-led entry point to enterprise- and institution-grade sales:**
converting free-tier developer usage into the recurring credit-based and per-seat revenue that
the model depends on — and building the credibility those buyers require before they commit at
cohort or pipeline scale. BITSoM Vertex's enterprise validation pathways and mentor network
are directly aligned with closing this gap.

---

## Supporting Material

| Resource | Link |
| --- | --- |
| **Deployed Product** | app.excentrix.tech/verify |
| **Product Demo Video** (3–5 min) | *⟨add link — required before submission⟩* |
| **Website** | excentrix.tech |
| **GitHub Repository** | *⟨add link or mark N/A⟩* |
| **Product Documentation** | *⟨add link⟩* |
| **Contact** | hello@excentrix.tech |

---

> **Submitted by Siddharth Karthikeyan & Shrisai — Partners, Excentrix**
> *Builders Pitch Fest 2026 · BITSoM Vertex × H2S*
