# VELO — Product & Strategy (the north star)

## The thesis

AI made *output* worthless as a signal. Anyone can generate a polished repo, a clean PR, a
flawless resume in an afternoon. The decade-old hiring signal ("look at what they built") is dead.

**What can't be faked is defending your own work under adaptive questioning.** VELO measures that.
It is not an endorsement (endorsements are cheap and ignored). **It is evidence** — the raw material
a decision-maker uses to make their own judgment.

## The reframe that shapes everything: ownership, not authorship

"Nobody writes code by hand anymore" is true and it means **"did your fingers type this?" is the
wrong question.** Everyone uses Copilot/Cursor/Claude. The question that matters:

> **Are you the architect, or just the prompter?**

AI-padding isn't bad because AI wrote the code. It's bad because the person **can't reason about,
debug, extend, or own** what they shipped. VELO measures ownership of understanding and judgment —
the thing that survives AI. We do **not** try to prove "a human typed this."

## The altitude model (the core architecture insight)

A project is the **atom of evidence**. But nobody makes a decision at the atomic level:

| Altitude | Unit | Who decides here |
|---|---|---|
| **Atom** | One verified project (dossier + transcript + dimension scores) | — (raw evidence) |
| **Profile** | A person, across their verifications | Candidate (self) + **HR** |
| **Aggregate** | A cohort / talent pool | **College** + enterprise HR |

The company's real job: **turn verified projects into a verified _person_, and verified persons
into a verified _pool_.** We have the atom. The value lives in the layers above it.

## What VELO measures (the dimensions)

Everything HR needs collapses into one question: *"If I drop this person into my codebase, are
they a net contributor or a net drain?"* That decomposes into:

| Dimension | The question it answers |
|---|---|
| **Ownership depth** | Can they explain *their own* implementation choices? (anti-padding core) |
| **Technical judgment** | Tradeoffs, alternatives, "why not X?" |
| **Debugging / failure reasoning** | "What breaks at 10×? How would you fix it?" |
| **Honesty signal** | Did they admit gaps or bluff? *(the secret weapon — bluffers are the most expensive bad hires)* |
| **Communication** | Can they explain it to a teammate? |
| **Seniority calibration** | At what difficulty did they hold up? |

## What verification *means* to each audience

| | Meaning | Core value |
|---|---|---|
| **HR** | "I can skip my first technical screen — or I know exactly where this person is weak before I spend an engineer's hour." | Time saved + bad-hire risk down |
| **Student** | "Proof I can reason about what I built, in a market where my resume is identical to 500 others." | Differentiation + access past the resume wall |
| **College** | "A measurable, employer-trusted outcome for placements + a feedback loop on what our grads can defend." | Placement leverage + outcome data |

## Critical decisions VELO unlocks per audience

**HR (needs project → person-for-role):**
- Skip-the-screen / focused-screen / reject
- Where to aim the interview (probe what VELO flagged, skip what it proved)
- Level & comp calibration
- Risk handling (suspicious/bluffing → scrutiny or pass)
- Rank the shortlist

**Candidate (needs project → verified profile):**
- Which projects to lead with
- Mid vs. senior roles (apply at the level they held up at)
- What to improve before interviewing *(→ Horizon/learning re-enters here)*
- How to differentiate

**College (needs project → student → cohort):**
- Remediation targeting (who needs help, in which dimension)
- Placement showcasing (which verified students to which recruiters)
- Curriculum decisions (cohort-wide weakness → fix the program)
- Bulk recruiter pitch ("40 verified candidates")
- Program proof for marketing/accreditation

## Two trust surfaces (design around this)

1. **HR-initiated** (HR sends a verify link, picks the project/JD, sees the full dossier *including
   failures*, identity-bound). **High trust. This is the paid B2B product.**
2. **Candidate-shared badge** (selection-biased — they only show passes). **Lower trust; it's a
   top-of-funnel filter that buys a screen, not an offer.** This is B2C marketing.

**Lead B2B with HR-initiated verification.**

## The cherry-picking trap

A candidate verifies their one good project and hides the rest. Defenses (need all three):
1. HR-initiated picks the project (removes candidate selection bias).
2. Sample-size honesty in the dossier ("1 project — limited sample" vs. "4 projects, consistent").
3. Resume-claim coverage — verify the claims *on their resume*, not a vacuum-chosen project.

## Credibility model (how an unknown startup's verdict comes to mean something)

Credibility cannot come from authority on day 1. It comes from **transparency**:

1. **Show your work, don't ask for faith.** The transcript + the code we pulled are right there;
   HR re-judges in 2 minutes. **Auditable, not authoritative.**
2. **Calibrate honestly — fail people.** If everyone passes, a pass is worthless. Publish the bar.
3. **Tamper-evidence + identity.** If it can be proxied/gamed, it's dead.
4. **Outcome data is the endgame.** Log from user #1 → eventually "VELO-verified hires had lower
   early attrition / higher manager ratings." That correlation converts VELO from interesting to required.
5. **Methodology in the open.** Publish the rubric and the limitations.

One-line thesis: **VELO is a trustworthy _presenter of evidence_ on day 1, and becomes an
_authority_ over time as outcome data accumulates.**

## ✅ The core credibility gap — closed (2026-06-24)

The interrogation used to see only repo **metadata + README + the candidate's description** — it
didn't read the code, so a smooth talker could defend a project conceptually without having built it.
**This is now fixed:** the engine reads the repo's actual source into a bounded `code_digest` and asks
**implementation-specific questions that cite real files** (confirmed end-to-end). This was the single
change that converts VELO from novelty to paid-grade, and it's done.

**Remaining depth (still P2):** multi-dimensional scoring (ownership / judgment / debugging / seniority
rather than one score) and the full evidence dossier. And the honest ceiling on coverage: the digest
reads the **default branch of public repos only** (`public_repo` OAuth scope) — private-repo support is
an open decision (see ROADMAP).
