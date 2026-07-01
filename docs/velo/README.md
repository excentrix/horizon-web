# VELO — Single Source of Truth

This folder is the reference for everything VELO. If you're lost, start here.

> **What is VELO?** A truth-as-a-service verification engine. It proves a developer can
> *defend and reason about* the work they claim — in an AI era where output is free and
> ownership is the only signal left. VELO is the company; Horizon (learning) is downstream.

## The docs

| File | What it answers | When to read it |
|---|---|---|
| [PRODUCT.md](./PRODUCT.md) | What VELO *is*, the altitude model, what each audience gets, the credibility model | To understand the strategy / north star |
| [STATE.md](./STATE.md) | What exists today vs. what's broken vs. what's missing (with file paths) | To know where the code actually stands |
| [ROADMAP.md](./ROADMAP.md) | The phased, incremental build plan with checklists | To know what to build next and track progress |
| [DISTRIBUTION.md](./DISTRIBUTION.md) | The funnel that feeds pilots & trials + channels + credibility doctrine + funnel instrumentation | When P0 is done and we go get users |
| [PILOT_QA.md](./PILOT_QA.md) | The fresh-account QA checklist + per-audience pilot script | Before running a pilot — it's the last P0 gate |
| [CONTENT.md](./CONTENT.md) | The 30-day build-in-public content engine (calendar + drafted hero posts + video script) | When executing distribution |
| [VOICE.md](./VOICE.md) | Brand voice + messaging guide (so generated content sounds like Sid) + the script, two ways | Before generating any content |
| [CHANNELS.md](./CHANNELS.md) | Founder-led account architecture + the platform-native dialect table + cadence | Deciding what goes where |
| [SEO_GEO.md](./SEO_GEO.md) | The owned blog layer — SEO + GEO (AI-search) strategy, keyword map, first 10 pillar posts | Building the durable/compounding channel |
| `../../REALITY_CHECK.md` | The original brutal audit (turn-1 analysis) | Background / why we pivoted to VELO |

## The priority order (do not reorder without a reason written here)

1. **P0 — Core loop production-ready.** Resume analysis + project verification work end-to-end, the UI
   is seamless, it's deployed. **Code-complete; the only gate left is a fresh-account QA run on prod**
   (see STATE.md 🔴 + `PILOT_QA.md`). *(See ROADMAP P0.)*
2. **P1 — Distribution.** The funnel through which pilots & trials happen. *(See DISTRIBUTION.md.)*
3. **P2 — The evidence layers.** ✅ *Done:* code-grounded interrogation, the verified profile (person
   layer) + LLM synthesis, the HR "assessment of a person" view. *Still open:* multi-dimensional dossier
   scores, HR-initiated flow + shortlist ranking, cohort views. The depth that makes VELO *paid-grade*.

## How to keep this current

- When you finish a task, tick it in ROADMAP.md and add a dated note.
- When the code changes materially, update STATE.md.
- When strategy shifts, update PRODUCT.md and note why.
- Keep one rule: **a stranger should be able to read these five files and understand the whole thing.**

_Last updated: 2026-07-01 — P0.1–0.4 shipped, code-grounded interrogation + verified profile + HR view live; P0 gate now = fresh-account QA on prod._
