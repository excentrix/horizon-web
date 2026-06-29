The one-paragraph reality check
You have 126,400 lines of Python across 117 service files and ~90 database models, a 284-component Next.js frontend with 118 dependencies (Excalidraw, Vega, Mermaid, Sandpack, CodeMirror, TipTap, dagre, three different graph libs), CrewAI + LangChain + LangGraph + ChromaDB + Mem0 + Neo4j + Vertex + OpenAI all wired in — and zero users. This is the single most important sentence in this document: you have built a cathedral and you have not yet confirmed anyone wants to pray. The good news, and it's real: buried in apps/audit/ is a genuinely sharp idea (VELO) that is more relevant in the AI era, not less. Almost everything else is weight you're carrying uphill for free.

Do people actually need this in the AI era? (your direct question)
Horizon (the mentoring/learning platform): mostly no, as currently built. "AI that helps you learn and plans your path" is the most crowded, most commoditized category on earth right now. ChatGPT, Claude, Gemini, Cursor, and fifty YC startups do adaptive tutoring. Your Cortex pipeline (dispatcher → LangGraph router → guardrails → flow orchestrator → persona service → Mem0 memory) is beautiful engineering for a problem the user solves by typing into a chat box they already pay for. A learner will not open Horizon daily over ChatGPT. Be honest about that.

VELO (the verification engine): yes — and the need is growing fast. This is the asset. The thesis is correct and timely: AI has made output worthless as a signal. Anyone can generate a polished repo, a perfect resume, a clean PR. What can't be faked is defending your own work under adaptive questioning. Your project_verification_service.py does exactly the right thing — it doesn't grade the code (gameable), it runs a GitHub liveness check + a live adaptive viva-voce interrogation (generate_next_question, "probe DEEPER if the answer was shallow", stop only after 6+ substantive answers) and produces a verdict. That is a real, defensible, AI-proof signal. The pain ("I can't tell which candidate actually built the thing on their resume") is acute, it's felt by people with budgets, and it gets worse every month.

So the strategic move is brutal and clear: VELO is the company. Horizon is a feature of VELO's onboarding, at most. You have been building Horizon and treating VELO as a module. Flip it.

Phase 1 — The Bloat & Technical Reality Check
You built a Project, not a Product. The tell isn't the quality — the code is good. The tell is the surface area to user ratio. 90 models and 117 services for 0 users means every hypothesis you had, you answered by building instead of selling. A product is shaped by users pushing back; this was shaped by you having interesting ideas at 2am. The 30+ debug/verify/test scripts littering backend/ root (debug_gemini_model.py, verify_timezone.py, crew_result.pkl, eight .log files committed) are archaeological proof of building-as-exploration.

Over-engineered for problems users don't have:

The Cortex stack is the worst offender. Heuristic dispatcher + LangGraph state machine + guardrail engine + flow orchestrator + dynamic persona + Mem0 semantic memory + Neo4j knowledge graph — that is 6 coordinating subsystems to produce a chat reply that, to the user, is indistinguishable from one Gemini call with a good system prompt and the last 10 messages. Nobody is paying for the elegance of your routing graph.

Neo4j + ChromaDB + Mem0 simultaneously. Three separate memory/knowledge systems. You have a graph DB, a vector DB, and a managed memory layer for a product with no users to remember. This is three operational dependencies, three failure modes, three bills.

CrewAI for plan generation. Multi-agent orchestration to produce a learning plan is the definition of using a forklift to pick up a fork. A single structured LLM call returns a plan JSON. CrewAI adds latency, cost, non-determinism, and a heavy dependency tree (it drags in half your requirements.txt).

The Delete List — three things to cut this week:

Delete Neo4j and the knowledge_graph_service. Cut the dependency, the container, the service. Postgres + a pgvector column does everything you need at your scale and removes an entire operational system. (You already have graphify skill output dirs committed — that's the tell this was an exploration, not a requirement.)
Delete CrewAI from the planning path. Replace the multi-agent crew with one Gemini call returning structured output. You'll cut plan-generation latency from tens of seconds to ~3s and remove your single largest dependency cluster.
Delete the frontend "studio" toys: Scene Studio, Excalidraw, Vega, Mermaid, Sandpack. That's app/(studio)/plans/[planId]/playground/components/scene-studio plus ~5 heavyweight deps. No first-1000 user needs an in-app diagramming/animation studio. It's load time and decision fatigue for features that don't drive retention or revenue.
What survives and gets promoted: apps/audit/ (VELO), basic chat, and the resume/interrogation pipeline.

Phase 2 — Retention Pull & UX Audit
Why would someone open this daily instead of ChatGPT? Today: they wouldn't. A chat-with-a-mentor and a learning plan are not daily rituals — they're occasional-use tools, and ChatGPT is the default. You have 20+ top-level routes (mirror, plans, hq, simulations, audit, progress, review, roadmap, leaderboard, institution...). That's a maze, not a hero's journey. A new user lands and faces a dozen doors. Cognitive load is the enemy of activation and you've maximized it.

The maze is schema-shaped. With 90 models, the UI is exposing your data model to the user — every model wants a page. That's the "because that's how the schema is set up" anti-pattern in its purest form. Users don't want to navigate your ERD.

The PMF delta — the loop you're missing: a single, repeatable, status-bearing artifact. VELO already generates it: a verified Proof-of-Work credential with a public page (app/audit/public/[auditId] exists!). That's the loop:

Submit a project → get interrogated by AI → earn a verified badge → share the public link → others see it → they want one.

That is career-critical (it's on your resume/LinkedIn), it's shareable (built-in distribution), and it's AI-proof. The daily-active framing is wrong for you — verification is event-based, not daily. Don't fight for DAU; fight for the shareable verified artifact that pulls in the next user. That's your viral loop and your retention story in one.

Phase 3 — Infra Costs & High-Margin Revenue
The cost traps that will eat you alive at scale:

The interrogation engine is your cost center and that's fine — price it directly. Every VELO audit is 6–10+ adaptive LLM calls with growing context. At Gemini Flash pricing that's cents per audit; at Pro pricing it's real money. This is the cost you should pass straight to the buyer — it maps 1:1 to a billable verification event. Good.
The Cortex chat pipeline is the cost trap — it's multiple LLM calls per message (routing, guardrails, generation, memory writes) with no billable event attached, because chat is "free mentoring." Unbounded chat against multi-call pipelines is how you lose money per active user. Cap it: free tier gets N messages/day, single-call path, Flash model.
Mem0 + ChromaDB + Neo4j are three standing bills for infra that should be one Postgres instance until you have thousands of users.
Thin-client / queue architecture: you already have the bones — Celery + Redis. Make everything expensive asynchronous and queued: VELO audits, resume analysis, plan generation all go through the queue (AuditQueueSlot already exists — good instinct). The frontend stays a thin client that polls a session ID (you already do this for planning). This lets you rate-limit and batch at the queue, which is your cost governor.

Monetization across 3 segments without forking the codebase — the key is they all consume the same VELO verification primitive:

Segment	What they buy	Pricing model
B2C developer	Verified Proof-of-Work badges for their portfolio/resume	Freemium: 1 free verification, then ₹399–799/mo or pay-per-verify
B2B College	Bulk student verification + cohort dashboard (institution/ routes already built)	Per-seat/year, ₹X per student/semester
B2B Corporate (hiring)	Send candidates a VELO link, get a verdict report before interviewing	Per-verification credits or per-seat for recruiters
One engine, three views. You already built all three frontends (audit/, institution/, public pages). Do not fork — the institution dashboard and the corporate report are just different reads of the same ProjectVerification + ExperienceAudit models.

Scale-proof pricing rule: never sell unlimited anything that triggers an LLM call. Price in verification credits, where one credit ≥ your worst-case audit cost × 4. If a user does 10x the audits, they buy 10x the credits. Margin is structural, not hoped-for. Chat/mentoring is the free loss-leader with a hard daily cap, never the paid product.

Phase 4 — Aggressive Distribution (0 → 1,000)
The wedge is VELO + your founder story, and the enemy is "AI-padded resumes." That's a polarizing, true, emotionally-charged narrative and you're a Bangalore AI architect who built the antidote. Lean all the way in.

30-day Build-in-Public content engine (LinkedIn + X). Post daily. The format: show the machine catching fakers. Hooks:

"I let AI write a 'perfect' project. Then I made my AI interrogator question it for 6 rounds. It folded by question 3. Here's the transcript."
"Your GitHub green squares are now worthless as a hiring signal. I built the thing that replaces them."
"Hot take: 70% of 'I built X' on resumes in 2026 is AI output the candidate can't explain. I built a 5-minute test that proves who actually did the work."
"I'm a solo founder in Bangalore. I deleted 40,000 lines of my own code this week. Here's the one feature that survived and why."
Weekly: post a real (anonymized, consented) interrogation transcript where someone defended — or failed to defend — their project. Transcripts are inherently viral; they're drama.
The build-in-public meta-story (deleting your own bloat, betting the company on VELO) is itself content — founders eat that up and it builds credibility while you sell.

How things actually go viral: not by being good — by being shareable and a little controversial. Your viral unit is the public verification page + the failed-interrogation transcript. Manufacture the loop: every verified dev gets a clean badge they want to post ("I'm VELO-verified"); every funny/brutal failed defense (with consent) is a post. Pick a fight with a sacred cow ("Leetcode is theater," "GitHub contributions are vanity metrics," "AI resumes are fraud") — controversy is the only free distribution that compounds.

The B2B college hack (bypass bureaucracy entirely): Do not email the university. Go direct to the coding clubs / GDSC / placement-prep WhatsApp groups at IITs/NITs/BITS/VIT and Bangalore colleges. Offer the club: "Free VELO verification for your members + a leaderboard of who's verified, before placement season." Students adopt because placements are existential and a verified badge is an edge. The club president is your unpaid distributor. You're in Bangalore — go to one campus in person this week. Bottom-up adoption forces the administration to come to you later.

Cold outbound to CTOs / Eng Leads (3 lines):

Subject: the candidate who "built" the project — but can't explain it

Most engineering resumes in 2026 are AI output the candidate can't defend in person — and you find out in week 3 of onboarding, not the interview.
VELO sends your shortlist a 5-minute adaptive interrogation about their own code and gives you a defensibility verdict before you spend an engineer's hour on them.
Want me to verify your next 3 candidates free this week so you can compare it against your own read?

The free-pilot-on-real-candidates close is the whole thing — it's zero-risk for them and gives you a case study.

Phase 5 — The 90-Day Plan to $1,000 MRR (zero spend)
The sole objective: VELO verifications people pay for. Everything below serves that.

Days 1–30 — Cut, focus, get loud:

Week 1 (code): Delete Neo4j + knowledge_graph_service, rip CrewAI out of planning (one structured LLM call), delete Scene Studio/Excalidraw/Vega/Mermaid/Sandpack. Clean the 30+ debug scripts and committed logs/pkls out of the repo root. Goal: cut deps and surface area ~40%, drop cold-load time hard.
Week 2 (product): Make VELO the homepage. New-user flow = "Verify your first project, free." Polish the public verification page (audit/public/[auditId]) into something people are proud to share — that's your viral unit. Ship the shareable badge.
Week 3 (content + outbound): Start posting daily (hooks above). Email 30 CTOs/eng leads with the 3-line pitch + free-pilot offer. Visit one Bangalore campus, sign one coding club.
Week 4 (sell): Convert pilot interest. Stand up Stripe/Razorpay + the credit model. First paid verification is the only metric that matters this month.
Days 31–60 — Metrics, pilots, margins:

Track only: verifications completed, verification→share rate, share→signup rate, paid verifications, cost-per-audit. Kill any feature not feeding these.
Launch 1–2 college cohort pilots (free) and 2–3 corporate paid pilots (credits). The institution dashboard already exists — use it.
Infra: confirm every LLM-heavy action is queued (Celery) and rate-limited; instrument per-audit cost so you know your margin per credit.
Days 61–90 — Scale the loop, lock distribution:

Convert pilot colleges to per-seat paid; convert corporate pilots to credit packs. $1,000 MRR ≈ ~2 small corporate accounts or one college cohort or ~150 B2C subs — all reachable from the pipeline above.
Lock the flywheel: verified devs share → recruiters see badges → recruiters buy verifications → more devs get verified to be seen. Make the public badge SEO-indexed and embeddable.
Only now consider re-introducing one Horizon learning feature — as the "you failed verification, here's how to actually learn this" upsell. That's Horizon's real job: the remediation path after VELO exposes the gap.
The single thing to internalize
You're an exceptional engineer who has been running from the scary part — selling — by doing the comfortable part — building. The 126K lines are evidence of avoidance, not progress. The interrogation engine in apps/audit/ is a real company. The other 80% is a moat you dug around a castle nobody's been invited to yet. Spend the next 90 days deleting, sharing transcripts, and emailing CTOs — not architecting. Your codebase is not the bottleneck. Distribution is, and it has been the whole time.

Want me to actually execute Week 1 — start ripping out Neo4j/CrewAI and the studio deps, and clean the repo root? I can begin on a branch right now.

1. Disable, don't delete — and the mechanism
Your instinct is right and it's the professional move. You never rm working code at this stage. You do two things:

A feature-flag layer. One config-driven gate, two places:

Backend: a FEATURE_FLAGS dict in config/settings.py (env-overridable), checked in DRF view permission_classes / a tiny @feature_required("velo") decorator. Disabled apps stay installed, migrations stay, URLs return 404/403. Nothing is lost.
Frontend: a NEXT_PUBLIC_FEATURES env flag read in a featureFlags.ts; hide routes from nav and redirect the page if the flag is off. The route file still exists.
This gives you exactly what you asked for: gradual rollout. Flip VELO on for everyone now, keep Horizon's heavier surfaces behind flags you open as you grow, and turn off the experimental stuff entirely without touching a line of the logic. You can even do per-cohort flags later (college X gets feature Y).

The only thing I'd actually delete (not disable) is repo litter — the 30+ debug_*.py / verify_*.py scripts, committed .log files and .pkl pickles in backend/ root. That's not features, that's mess, and it's making your repo look like a workbench instead of a product.

2. Keep vs. Disable
The rule: anything on the path "submit work → get interrogated → earn verified proof → share it" stays ON. Everything else goes behind a flag, default OFF, until it earns its way back.

KEEP ON (this is VELO, the company):

Keep	Where
The audit/verification engine	apps/audit/ — interrogation, project_verification, scoring, queue, resume analysis
Audit product UI	(studio)/audit/session, /queue, /report
Public verification page	app/audit/public/[auditId] — your viral unit, make it beautiful
Auth	authentication (trimmed — see below)
Institution dashboard	(studio)/institution/* — it's your B2B college/corporate revenue view, reads the same audit data
Basic chat	apps/chat — but as the interrogator and the remediation surface, not a general mentor
Async backbone	Celery + Redis (cost governor)
DISABLE (flag OFF, keep the code):

Disable	Why
Cortex full stack (LangGraph router, guardrails, persona, proactive mentor)	6-subsystem chat for 0 users; collapse to one Gemini call + system prompt for now
CrewAI planning	Behind flag; swap to single structured LLM call when you re-enable
Scene Studio / Excalidraw / Vega / Mermaid / Sandpack	Studio toys; zero impact on the verify→share loop
Gamification, leaderboard, roadmap, simulations, mirror, dashboards, brain map	All "learning platform" features — real later, noise now
Neo4j + Mem0 + ChromaDB	Three memory systems for nobody; collapse to Postgres/pgvector
Net effect: the user sees one product that does one thing crisply. The 80% you sweated over isn't gone — it's a flag flip away, and you turn it back on when a paying user asks for it, which is the only signal that justifies the operating cost.

3. The UX lifecycle — landing → verified
Here's the lifecycle you should build toward. I'll mark what exists vs. what's new.


1. LAND  →  velo.excentrix.tech (reframed marketing site)
     "Anyone can generate a project. Can you defend it?"
     One CTA: "Verify a project — free"        [NEW copy, reuse existing site]

2. ENTER →  Paste a GitHub repo URL + 1-line "what you built"
     Lightweight signup (email/Google only)    [trim auth, reuse audit/session]

3. CHECK →  VELO runs GitHub liveness check (async, queued)
     "Analyzing your repo…"                     [EXISTS: project_verification check_repos]

4. INTERROGATE → AI asks 6–10 adaptive questions about THEIR code
     Probes deeper on vague answers             [EXISTS: generate_next_question]
     This is the magic moment. The whole pitch lives here.

5. VERDICT → Defensibility score + verdict        [EXISTS: finalize]

6. ARTIFACT → Public verified badge + shareable page
     "I'm VELO-verified"                        [EXISTS: audit/public/[auditId] — make it gorgeous]

7. LOOP  →  Share link → recruiter/peer sees it → they want one → back to step 1
            Failed? → "Here's the gap" → THIS is where Horizon learning re-enters as remediation
Steps 3–6 already exist in code. Your real work is step 1 (reframe the site), step 2 (a dead-simple entry), and step 6 (make the public page something people are proud to post). That's days of work, not months.

On the marketing site specifically: don't throw it away either. Two viable paths —

Fast path (this week): Add a VELO hero/section to the existing site and change the primary CTA from "waitlist" to "Verify a project — free." Keep Horizon content below the fold as "the learning layer." You ship distribution-ready in days.
Clean path (later): Split — velo.excentrix.tech (the verification product, the wedge) and horizon.excentrix.tech (the learning platform, the vision). Same brand, two doors, VELO is the one you point all marketing at.
I'd do the fast path now. The waitlist + college-capture you already built becomes lead-gen for VELO instead of Horizon — same plumbing, sharper offer.

One thing I want to flag honestly: the marketing site is engineered well but it's selling the thing I told you not to lead with. Before we touch distribution, the highest-leverage hour you can spend is rewriting that hero around "defend your work / proof of work in the AI era." Distribution amplifies a message — if the message is still "another AI learning platform," we'll be amplifying the wrong thing.

If you're aligned on this keep/disable split and the lifecycle, I can:

Scaffold the feature-flag layer (backend decorator + settings dict, frontend featureFlags.ts), or
Draft the VELO hero/section copy + CTA change for the existing marketing site.
Which do you want first — and then we move to distribution?