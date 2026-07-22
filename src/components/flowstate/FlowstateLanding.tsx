'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code2,
  Globe,
  MessageSquareText,
  Minus,
  MonitorPlay,
  Pin,
  Plus,
  Smartphone,
  Users,
  Waves,
  Zap,
} from 'lucide-react'
import { FlowstatePilotDialog } from './FlowstatePilotDialog'

gsap.registerPlugin(ScrollTrigger)

const surfaces = [
  {
    id: 'studio',
    num: '01',
    label: 'Studio',
    title: 'Write the deck your way.',
    body: 'HTML slides, Markdown speaker notes, and a visual theme editor without the constraints of a point-and-click builder. Import existing decks or start from a template.',
    bullets: [
      'HTML slide editor with live preview',
      'Markdown speaker notes per section',
      'Visual theme controls with no CSS required',
      'One-click HTML import from any source',
    ],
    Icon: Code2,
  },
  {
    id: 'stage',
    num: '02',
    label: 'Stage',
    title: 'Run the room with full intelligence.',
    body: 'Fullscreen presenter view with a live overlay that shows audience questions, confusion signals, and pace reactions without leaving the slide.',
    bullets: [
      'Live question queue by slide',
      'Audience confusion and clarity signals',
      'Pin, defer, or dismiss questions on-stage',
      'Fullscreen keyboard navigation',
    ],
    Icon: MonitorPlay,
  },
  {
    id: 'remote',
    num: '03',
    label: 'Remote',
    title: 'Control from your phone, no app needed.',
    body: 'Open a URL on any phone with no install. Navigate slides, read synced speaker notes, and see what slide the room is on.',
    bullets: [
      'URL-based access from any phone or tablet',
      'Speaker notes sync to the current slide',
      'Next and previous slide controls',
      'Connected status indicator',
    ],
    Icon: Smartphone,
  },
  {
    id: 'classroom',
    num: '04',
    label: 'Classroom',
    title: 'Audience participation, slide by slide.',
    body: "Participants follow the live session, react when they're confused, and submit questions tied to the exact slide where it happened.",
    bullets: [
      'Real-time slide sync with the presenter',
      'Confused, Clear, and Slower reactions',
      'Anonymous or named question submission',
      'Questions linked to slide index',
    ],
    Icon: MessageSquareText,
  },
]

const features = [
  {
    Icon: Zap,
    title: 'Zero-latency slide sync',
    body: 'All surfaces update in under 200ms through one live session state. No polling, no stale presenter view.',
  },
  {
    Icon: MessageSquareText,
    title: 'Slide-linked questions',
    body: 'Every question is stamped with the exact slide index, so you know what they asked and when they got stuck.',
  },
  {
    Icon: Pin,
    title: 'Live moderation queue',
    body: 'Pin the best question to the stage overlay, defer it, or mark it answered without breaking your flow.',
  },
  {
    Icon: Waves,
    title: 'Real-time pace signals',
    body: 'Confused, Clear, and Slower reactions aggregate per slide so you know when to slow down.',
  },
  {
    Icon: Smartphone,
    title: 'Phone remote with notes',
    body: 'Open a URL on your phone. Navigate slides and read synced speaker notes at the same time.',
  },
  {
    Icon: BarChart3,
    title: 'Post-session insights',
    body: 'Review the slides that caused the most confusion, unanswered questions, and participant drop-off.',
  },
]

const useCases = [
  {
    Icon: Users,
    label: 'College educators',
    body: 'Engineering and AI lectures where confusion tracking matters.',
  },
  {
    Icon: Zap,
    label: 'Corporate trainers',
    body: 'Learning sessions and technical onboarding at scale.',
  },
  {
    Icon: Globe,
    label: 'Startup founders',
    body: 'Investor demos and product walkthroughs that need live Q&A.',
  },
  {
    Icon: Code2,
    label: 'Developer advocates',
    body: 'Technical talks where code, pace, and audience questions all matter.',
  },
]

const pricingPlans = [
  {
    name: 'Free',
    price: 'INR 0',
    period: 'forever',
    description: 'For individual educators getting started.',
    cta: 'Request pilot',
    defaultInterest: 'Flowstate educator pilot',
    items: [
      '3 decks',
      'Up to 50 classroom participants',
      'All 4 surfaces',
      'Realtime sync',
      'Flowstate branding on classroom',
    ],
  },
  {
    name: 'Pro',
    price: 'INR 299',
    period: '/month',
    description: 'For active educators and independent trainers.',
    cta: 'Request Pro',
    defaultInterest: 'Flowstate training pilot',
    highlight: true,
    badge: 'Most popular',
    items: [
      'Unlimited decks',
      '500 classroom participants',
      'All 4 surfaces',
      'Post-session reports',
      'No Flowstate branding',
      'Priority support',
    ],
  },
  {
    name: 'Institutional',
    price: 'INR 4,999',
    period: '/month',
    description: 'For colleges, training institutes, and teams.',
    cta: 'Contact us',
    defaultInterest: 'Flowstate institutional pilot',
    items: [
      '20 instructor seats',
      'Unlimited participants',
      'Department analytics',
      'SSO / custom domain',
      'White-label option',
      'Dedicated support',
    ],
  },
]

const faqs = [
  {
    q: 'What kind of presentations is Flowstate built for?',
    a: 'Flowstate is built for live sessions such as college lectures, corporate training, startup demos, technical workshops, onboarding sessions, and developer talks.',
  },
  {
    q: 'Do participants need to install anything?',
    a: 'No. Participants open a URL or scan a QR code in the browser. They follow the slides, react, and ask questions without installing an app.',
  },
  {
    q: 'How is this different from Mentimeter or Slido?',
    a: 'Those tools handle engagement only. Flowstate combines deck authoring, presenter stage, phone remote control, and audience participation in one connected system.',
  },
  {
    q: 'How does the phone remote work?',
    a: 'The presenter opens a URL or scans a QR code from Studio. The phone joins the same live session and shows navigation controls plus synced speaker notes.',
  },
  {
    q: 'Is my deck content stored securely?',
    a: 'Decks are stored with authenticated owner access. Institutional pilots can add SSO, custom domains, and stricter deployment controls.',
  },
]

function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-x-[-12%] top-[-12%] h-[56%] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--hz-energy)/0.13),transparent_64%)] blur-3xl" />
      <div className="absolute left-[-10%] top-[18%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--hz-indigo)/0.11),transparent_66%)] blur-3xl" />
      <div className="absolute right-[-8%] top-[32%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--hz-cream)/0.8),transparent_67%)] blur-3xl" />
      <div className="absolute inset-0 opacity-80">
        <div className="absolute inset-x-0 top-[18%] h-px bg-[linear-gradient(90deg,transparent,hsl(var(--hz-ink)/0.12),transparent)]" />
        <div className="absolute inset-x-0 top-[36%] h-px bg-[linear-gradient(90deg,transparent,hsl(var(--hz-ink)/0.06),transparent)]" />
        <div className="absolute inset-x-0 top-[54%] h-px bg-[linear-gradient(90deg,transparent,hsl(var(--hz-ink)/0.08),transparent)]" />
        <div className="absolute inset-y-0 left-[18%] w-px bg-[linear-gradient(180deg,transparent,hsl(var(--hz-ink)/0.1),transparent)]" />
        <div className="absolute inset-y-0 left-[50%] w-px bg-[linear-gradient(180deg,transparent,hsl(var(--hz-ink)/0.06),transparent)]" />
        <div className="absolute inset-y-0 right-[20%] w-px bg-[linear-gradient(180deg,transparent,hsl(var(--hz-ink)/0.08),transparent)]" />
      </div>
      <div className="absolute inset-x-[8%] top-[20%] h-[46%] rounded-2xl border border-border bg-card/55 [mask-image:radial-gradient(circle_at_center,black_45%,transparent_90%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_30%,hsl(var(--background))_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-[linear-gradient(to_bottom,transparent,hsl(var(--background)))]" />
    </div>
  )
}

function SurfaceMock({ surfaceId }: { surfaceId: string }) {
  if (surfaceId === 'studio') {
    return (
      <div className="h-[30rem] overflow-hidden rounded-2xl border border-cream/15 bg-ink shadow-[0_40px_120px_hsl(var(--hz-ink)/0.28)]">
        <div className="flex h-14 items-center justify-between border-b border-cream/10 px-5">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-energy" />
            <span className="size-2 rounded-full bg-cream/70" />
            <span className="size-2 rounded-full bg-indigo" />
            <span className="ml-3 font-mono text-[11px] text-cream/90">Studio / AI Systems Week 04</span>
          </div>
          <span className="rounded-full border border-energy/25 bg-energy/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-energy">
            Saved
          </span>
        </div>
        <div className="grid h-[calc(30rem-3.5rem)] md:grid-cols-[3.75rem_1fr_0.92fr]">
          <aside className="hidden border-r border-cream/10 bg-cream/[0.06] p-2 md:block">
            {[1, 2, 3, 4, 5].map((slide) => (
              <div
                key={slide}
                className={`mb-2 rounded-md border px-2 py-2.5 text-center font-mono text-[10px] ${
                  slide === 4
                    ? 'border-energy/45 bg-energy/15 text-energy'
                    : 'border-cream/18 text-cream/75'
                }`}
              >
                {String(slide).padStart(2, '0')}
              </div>
            ))}
          </aside>
          <div className="border-b border-cream/10 p-4 md:border-b-0 md:border-r">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/80">
                slide html
              </p>
              <span className="rounded bg-cream/12 px-2 py-1 font-mono text-[10px] text-cream/80">
                4 / 18
              </span>
            </div>
            <div className="space-y-1.5 font-mono text-[10px] leading-4">
              <p className="text-indigo">&lt;section class=&quot;<span className="text-energy">slide split</span>&quot;&gt;</p>
              <p className="pl-4 text-cream/80">&lt;eyebrow&gt;optimization&lt;/eyebrow&gt;</p>
              <p className="pl-4 text-cream/90">&lt;h1&gt;Gradient Descent&lt;/h1&gt;</p>
              <p className="pl-4 text-cream/80">&lt;ul class=&quot;<span className="text-energy">steps</span>&quot;&gt;</p>
              <p className="pl-8 text-cream/80">&lt;li&gt;measure loss&lt;/li&gt;</p>
              <p className="pl-8 text-cream/80">&lt;li&gt;move against slope&lt;/li&gt;</p>
              <p className="pl-8 text-cream/80">&lt;li&gt;repeat&lt;/li&gt;</p>
              <p className="pl-4 text-cream/80">&lt;/ul&gt;</p>
              <p className="text-indigo">&lt;/section&gt;</p>
            </div>
            <div className="mt-4 rounded-lg border border-cream/18 bg-cream/[0.1] p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream/80">
                speaker notes
              </p>
              <p className="mt-2 text-[11px] leading-4 text-cream/80">
                Pause after the first animation. Ask: what happens if the step size is too large?
              </p>
            </div>
          </div>
          <div className="bg-background p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                live preview
              </p>
              <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                16:9
              </span>
            </div>
            <div className="relative h-[20.25rem] overflow-hidden rounded-lg border border-border bg-ink p-5 text-cream">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-energy">
                optimization
              </p>
              <h3 className="mt-7 font-display text-3xl font-semibold leading-none tracking-tight">
                Gradient Descent
              </h3>
              <div className="mt-7 space-y-2">
                {['Measure loss', 'Move against slope', 'Repeat'].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 text-xs text-cream/90">
                    <span className="flex size-5 items-center justify-center rounded-full bg-cream/10 font-mono text-[9px] text-energy">
                      {index + 1}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
              <div className="absolute right-5 top-5 size-16 rounded-full border border-energy/35 bg-energy/10" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (surfaceId === 'stage') {
    return (
      <div className="relative h-[30rem] overflow-hidden rounded-2xl border border-cream/15 bg-ink shadow-[0_40px_120px_hsl(var(--hz-ink)/0.28)]">
        <div className="flex h-14 items-center justify-between border-b border-cream/10 px-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/90">
            Stage / presenting now
          </p>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/90">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-energy" />
              Live
            </span>
            <span>Slide 04</span>
          </div>
        </div>
        <div className="relative h-[18.5rem] bg-background p-8">
          <div className="absolute left-6 top-6 rounded-full border border-border bg-card px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            AI Systems
          </div>
          <div className="flex h-full flex-col justify-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-energy">optimization</p>
            <h3 className="mt-5 max-w-lg font-display text-6xl font-semibold leading-none tracking-tight text-ink">
              Gradient Descent
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Minimizing the loss function step by step.
            </p>
          </div>
          <div className="absolute bottom-5 left-6 right-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
            {[
              ['12', 'confused'],
              ['41', 'clear'],
              ['5', 'slower'],
            ].map(([value, label]) => (
              <div key={label} className="bg-card px-4 py-3">
                <p className="font-display text-2xl font-semibold leading-none text-ink">{value}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid h-[calc(30rem-3.5rem-18.5rem)] border-t border-cream/10 lg:grid-cols-[1fr_17rem]">
          <div className="space-y-2 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/80">
              next notes
            </p>
            <p className="text-xs leading-5 text-cream/80">
              Explain why a smaller learning rate may converge slowly but avoids overshooting.
            </p>
          </div>
          <div className="border-t border-cream/10 p-4 lg:border-l lg:border-t-0">
            <div className="rounded-lg border border-energy/25 bg-energy/10 p-3">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-energy">
                <span className="size-1.5 rounded-full bg-energy" />
                pinned question
              </div>
              <p className="mt-2 text-xs leading-5 text-cream/90">
                Can you re-explain why the learning rate matters?
              </p>
              <div className="mt-3 flex gap-2">
                <span className="rounded bg-cream/12 px-2 py-1 text-[10px] text-cream/75">Answer</span>
                <span className="rounded bg-cream/12 px-2 py-1 text-[10px] text-cream/80">Defer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (surfaceId === 'remote') {
    return (
      <div className="flex h-[30rem] items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_center,hsl(var(--hz-energy)/0.12),transparent_58%)] p-5">
        <div className="relative h-[28.5rem] w-[15.5rem] rounded-[2.45rem] border-[9px] border-ink bg-ink shadow-[0_40px_120px_hsl(var(--hz-ink)/0.28)]">
          <span className="absolute left-1/2 top-2 z-10 h-1 w-16 -translate-x-1/2 rounded-full bg-cream/20" />
          <span className="absolute -right-[12px] top-28 h-14 w-1 rounded-r bg-ink" />
          <div className="h-full overflow-hidden rounded-[1.8rem] bg-ink">
          <div className="border-b border-cream/10 px-4 pb-4 pt-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-cream">AI Systems Week 04</p>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-cream/90">
                  <span className="size-1.5 rounded-full bg-energy" />
                  Connected - Slide 4
                </div>
              </div>
              <span className="rounded-full border border-cream/22 px-2 py-1 font-mono text-[10px] text-cream/90">
                12:41
              </span>
            </div>
          </div>
          <div className="space-y-3 p-4">
            <div className="rounded-lg border border-energy/25 bg-energy/10 p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-energy">
                current section
              </p>
              <p className="mt-1 text-sm font-semibold text-cream">Gradient Descent</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-cream/10">
                <div className="h-full w-[42%] rounded-full bg-energy" />
              </div>
            </div>
            <div className="rounded-lg border border-cream/18 bg-cream/[0.1] p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/80">
                speaker notes
              </p>
              <p className="mt-2 text-[11px] leading-4 text-cream/80">
                Ask the room what a too-large step would do before revealing the animation.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center font-mono text-[9px] uppercase tracking-[0.08em]">
              {['prev', 'blackout', 'timer'].map((label) => (
                <button key={label} className="rounded-lg border border-cream/18 bg-cream/[0.1] px-1 py-2.5 text-cream/80">
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 border-t border-cream/10 p-3">
            <button className="flex size-10 items-center justify-center rounded-full border border-cream/18 bg-cream/10 text-cream/80">
              <ChevronLeft className="size-4" />
            </button>
            <button className="flex h-10 flex-1 items-center justify-center rounded-full bg-indigo text-xs font-semibold text-white">
              Next slide
            </button>
          </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[30rem] overflow-hidden rounded-2xl border border-cream/15 bg-ink shadow-[0_40px_120px_hsl(var(--hz-ink)/0.28)]">
      <div className="flex h-14 items-center justify-between border-b border-cream/10 px-5">
        <div>
          <p className="text-sm font-semibold text-cream">AI Systems Week 04</p>
          <p className="mt-1 text-[11px] text-cream/90">Following presenter - Slide 4</p>
        </div>
        <span className="rounded-full border border-energy/25 bg-energy/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-energy">
          live
        </span>
      </div>
      <div className="grid h-[calc(30rem-3.5rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-cream/10 bg-background p-5 lg:border-b-0 lg:border-r">
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-energy">
              optimization
            </p>
            <h3 className="mt-8 font-display text-3xl font-semibold leading-none tracking-tight text-ink">
              Gradient Descent
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Minimizing loss step by step.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ['12', 'confused'],
              ['41', 'clear'],
              ['5', 'slower'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border border-border bg-card p-3 text-center">
                <p className="font-display text-2xl font-semibold leading-none text-ink">{value}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3 p-5">
          <div className="grid grid-cols-2 gap-2">
            <button className="rounded-lg border border-energy/25 bg-energy/10 py-3 text-xs font-medium text-energy">
              Confused
            </button>
            <button className="rounded-lg border border-indigo/25 bg-indigo/10 py-3 text-xs font-medium text-indigo">
              Clear
            </button>
            <button className="col-span-2 rounded-lg border border-cream/18 bg-cream/[0.1] py-3 text-xs font-medium text-cream/90">
              Slower, please
            </button>
          </div>
          <div className="rounded-lg border border-cream/18 bg-cream/[0.1] p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/80">
              ask a question
            </p>
            <p className="mt-2 min-h-10 text-xs leading-5 text-cream/90">
              Why does the learning rate change the final result?
            </p>
            <button className="mt-3 w-full rounded-full bg-cream px-4 py-2.5 text-sm font-semibold text-ink">
              Submit question
            </button>
          </div>
          <div className="rounded-lg border border-cream/18 bg-cream/[0.1] p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/80">
              answered live
            </p>
            <p className="mt-2 text-xs leading-5 text-cream/90">
              “Can we visualize the slope?” pinned on slide 03.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border py-5">
      <button
        className="flex w-full items-center justify-between gap-4 text-left"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="text-base font-medium text-ink">{q}</span>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-ink">
          {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
        </span>
      </button>
      {open && <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{a}</p>}
    </div>
  )
}

export function FlowstateLanding() {
  const pageRef = useRef<HTMLDivElement>(null)
  const surfacesRef = useRef<HTMLDivElement>(null)
  const [activeSurface, setActiveSurface] = useState(0)
  const surface = surfaces[activeSurface] ?? surfaces[0]
  const ActiveIcon = surface.Icon

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reducedMotion) return

      gsap.fromTo(
        '[data-flow-hero]',
        { y: 28, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.1 },
      )

      gsap.utils.toArray<HTMLElement>('[data-flow-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.72,
            ease: 'power2.out',
            scrollTrigger: { trigger: element, start: 'top 84%', once: true },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('[data-flow-stagger]').forEach((element) => {
        gsap.fromTo(
          Array.from(element.children),
          { y: 22, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: element, start: 'top 85%', once: true },
          },
        )
      })

      if (surfacesRef.current && window.innerWidth >= 1024) {
        ScrollTrigger.create({
          trigger: surfacesRef.current,
          pin: true,
          start: 'top top',
          end: '+=240%',
          scrub: 0.45,
          onUpdate: (self) => {
            const nextIndex = Math.min(
              surfaces.length - 1,
              Math.floor(self.progress * surfaces.length),
            )
            setActiveSurface(nextIndex)
          },
        })
      }
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="overflow-x-hidden bg-background text-foreground">
      <section
        className="grain relative flex min-h-screen items-center overflow-hidden"
        aria-label="Hero"
      >
        <HeroScene />
        <div className="container relative z-10 flex flex-col items-center py-28 text-center sm:py-32">
          <div
            data-flow-hero
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 backdrop-blur"
          >
            <span className="size-1.5 rounded-full bg-energy" />
            <span className="eyebrow">Live Presentation OS</span>
          </div>

          <h1 data-flow-hero className="display-xl max-w-5xl text-ink">
            Build the deck.
            <br />
            <span className="text-energy">Run the room.</span>
          </h1>

          <p
            data-flow-hero
            className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            Flowstate connects deck authoring, presenter stage controls, phone remote, and classroom
            Q&A in one real-time system. No stack stitching. No context switching.
          </p>

          <div data-flow-hero className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <FlowstatePilotDialog>
              <button type="button" className="btn-primary btn-lg">
                Request pilot
                <ArrowRight className="size-4" />
              </button>
            </FlowstatePilotDialog>
            <a href="#surfaces" className="btn-ghost btn-lg">
              See how it works
            </a>
          </div>

          <div
            data-flow-hero
            className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3"
          >
            {[
              { value: '4', label: 'Connected surfaces' },
              { value: '1', label: 'Live session state' },
              { value: '0', label: 'Context switches' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex items-end justify-center gap-3 bg-card px-7 py-6 text-center"
              >
                <span className="font-display text-4xl font-semibold tracking-tight text-ink">
                  {value}
                </span>
                <span className="pb-1 text-sm text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground/50">
          <ChevronDown className="size-5" />
        </div>
      </section>

      <section className="border-y border-border bg-card" aria-label="What Flowstate replaces">
        <div className="container py-6">
          <div
            data-flow-stagger
            className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground"
          >
            {['Mentimeter', 'Slido', 'Clicker remotes', 'Google Slides live Q&A'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="h-px w-4 bg-border" />
                <span>{item}</span>
              </div>
            ))}
            <div className="inline-flex items-center gap-2 rounded-full border border-energy/20 bg-energy/10 px-4 py-1.5">
              <span className="size-1.5 rounded-full bg-energy" />
              <span className="text-[0.8125rem] font-semibold text-energy">
                Replaced by Flowstate
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32" aria-label="The problem with current slide tools">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <div data-flow-reveal>
              <p className="eyebrow flex items-center gap-2.5">
                <span className="eyebrow-dot" />
                The problem
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                Slide tools stop when the session starts.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Every tool in your stack manages the deck. None of them manage the live moment: what
                the audience is thinking, whether they are following, and what they need you to
                revisit.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink">
                Flowstate is built for what happens after you hit play.
              </p>
            </div>

            <div
              data-flow-reveal
              className="overflow-hidden border border-border bg-card shadow-[0_30px_100px_hsl(var(--hz-ink)/0.08)]"
            >
              <div className="grid grid-cols-2 border-b border-border">
                <div className="border-r border-border px-5 py-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Standard stack
                </div>
                <div className="bg-energy/10 px-5 py-4 font-mono text-xs uppercase tracking-[0.18em] text-energy">
                  Flowstate
                </div>
              </div>
              {[
                ['Slides in Google Slides', 'Deck authoring built in'],
                ['Clicker for navigation', 'Phone remote with notes'],
                ['Mentimeter for Q&A', 'Classroom mode included'],
                ['No audience signal', 'Confused and Clear reactions'],
                ['No session data', 'Post-session insights'],
                ['Four disconnected tools', 'One live session'],
              ].map(([before, after]) => (
                <div key={before} className="grid grid-cols-2 border-t border-border text-sm">
                  <div className="flex items-center gap-3 border-r border-border px-5 py-4 text-muted-foreground">
                    <span className="opacity-40">x</span>
                    <span>{before}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-energy/[0.03] px-5 py-4 text-foreground">
                    <Check className="size-4 shrink-0 text-energy" />
                    <span>{after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="surfaces"
        ref={surfacesRef}
        className="relative lg:h-screen"
        aria-label="The four surfaces of Flowstate"
      >
        <div className="container flex min-h-screen items-center py-12 lg:py-20">
          <div className="grid w-full gap-10 border border-border bg-card p-6 shadow-[0_40px_140px_hsl(var(--hz-ink)/0.1)] sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:p-12">
            <div className="flex flex-col justify-center">
              <div className="mb-8 flex gap-2">
                {surfaces.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSurface(index)}
                    aria-label={`View ${item.label}`}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: index === activeSurface ? '2.75rem' : '0.85rem',
                      background:
                        index === activeSurface ? 'hsl(var(--hz-energy))' : 'hsl(var(--border))',
                    }}
                  />
                ))}
              </div>

              <div className="mb-5 inline-flex w-fit items-center gap-3 rounded-full border border-border bg-background/70 px-4 py-2">
                <ActiveIcon className="size-4 text-energy" />
                <span className="eyebrow text-energy">
                  {surface.num} / {surface.label}
                </span>
              </div>

              <h2 className="max-w-xl font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                {surface.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {surface.body}
              </p>

              <ul className="mt-7 space-y-3">
                {surface.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-energy" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex items-center gap-3">
                <button
                  onClick={() => setActiveSurface((value) => Math.max(0, value - 1))}
                  disabled={activeSurface === 0}
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors disabled:opacity-40"
                  aria-label="Previous surface"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={() =>
                    setActiveSurface((value) => Math.min(surfaces.length - 1, value + 1))
                  }
                  disabled={activeSurface === surfaces.length - 1}
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors disabled:opacity-40"
                  aria-label="Next surface"
                >
                  <ChevronRight className="size-4" />
                </button>
                <span className="text-sm text-muted-foreground">Scroll or click to explore</span>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-2xl border border-border bg-background/80 p-3 sm:p-4">
                <SurfaceMock surfaceId={surface.id} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-card py-24 sm:py-32" aria-label="Flowstate features">
        <div className="container">
          <div className="max-w-2xl" data-flow-reveal>
            <p className="eyebrow flex items-center gap-2.5">
              <span className="eyebrow-dot" />
              Capabilities
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              Everything the live moment demands.
            </h2>
          </div>

          <div
            data-flow-stagger
            className="mt-14 grid gap-px border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map(({ Icon, title, body }) => (
              <article key={title} className="bg-card p-7">
                <div className="mb-5 flex size-10 items-center justify-center rounded-full bg-energy/10 text-energy">
                  <Icon className="size-[18px]" />
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32" aria-label="How Flowstate works">
        <div className="container">
          <div className="max-w-2xl" data-flow-reveal>
            <p className="eyebrow flex items-center gap-2.5">
              <span className="eyebrow-dot" />
              How it works
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              From deck to live session in three steps.
            </h2>
          </div>

          <div
            data-flow-stagger
            className="mt-14 grid gap-px border-y border-border bg-border md:grid-cols-3"
          >
            {[
              {
                step: '1',
                title: 'Write your deck in Studio',
                body: 'Add HTML slides, write Markdown speaker notes, and set a theme. Import your existing slides or start from scratch.',
              },
              {
                step: '2',
                title: 'Share two links',
                body: 'One QR code for your phone remote. One link for participants. Both connect to the same live session automatically.',
              },
              {
                step: '3',
                title: 'Present with full room intelligence',
                body: 'Navigate from your phone, see audience confusion signals in real time, and manage the Q&A queue without leaving the stage.',
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="bg-background p-7">
                <div className="mb-5 flex size-10 items-center justify-center rounded-full border border-energy/25 bg-energy/10 text-sm font-semibold text-energy">
                  {step}
                </div>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-cream/40 py-16" aria-label="Who uses Flowstate">
        <div className="container">
          <p className="mb-8 text-center font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Built for
          </p>
          <div
            data-flow-stagger
            className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
          >
            {useCases.map(({ Icon, label, body }) => (
              <div key={label} className="bg-card p-6">
                <Icon className="mb-4 size-5 text-energy" />
                <p className="text-base font-semibold text-ink">{label}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 sm:py-32" aria-label="Flowstate pricing">
        <div className="container">
          <div className="text-center" data-flow-reveal>
            <p className="eyebrow flex items-center justify-center gap-2.5">
              <span className="eyebrow-dot" />
              Pricing
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              Start free. Scale when you need to.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              Every plan runs the same connected surfaces. No feature branches, no paywalled core
              functionality.
            </p>
          </div>

          <div
            data-flow-stagger
            className="mt-12 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-3"
          >
            {pricingPlans.map(
              ({
                name,
                price,
                period,
                description,
                cta,
                defaultInterest,
                highlight,
                badge,
                items,
              }) => (
                <div
                  key={name}
                  className={`relative flex min-h-[32rem] flex-col bg-card p-7 ${
                    highlight
                      ? 'bg-energy text-cream shadow-[0_28px_90px_hsl(var(--hz-energy)/0.22)]'
                      : ''
                  }`}
                >
                  {badge && (
                    <div className="mb-4 w-fit rounded-full border border-cream/35 bg-cream/15 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-cream">
                      {badge}
                    </div>
                  )}
                  <p
                    className={`font-display text-2xl font-semibold tracking-tight ${highlight ? 'text-white' : 'text-ink'} `}
                  >
                    {name}
                  </p>
                  <div className="mt-4 flex items-end gap-1">
                    <span
                      className={`font-display text-4xl font-semibold tracking-tight ${
                        highlight ? 'text-cream' : 'text-ink'
                      }`}
                    >
                      {price}
                    </span>
                    <span
                      className={`pb-1 text-sm ${highlight ? 'text-cream/75' : 'text-muted-foreground'}`}
                    >
                      {period}
                    </span>
                  </div>
                  <p
                    className={`mt-3 text-sm leading-6 ${highlight ? 'text-cream/90' : 'text-muted-foreground'}`}
                  >
                    {description}
                  </p>

                  <div className={`my-6 h-px ${highlight ? 'bg-cream/28' : 'bg-border'}`} />

                  <ul className="flex-1 space-y-3">
                    {items.map((item) => (
                      <li
                        key={item}
                        className={`flex items-center gap-3 text-sm ${
                          highlight ? 'text-cream/90' : 'text-muted-foreground'
                        }`}
                      >
                        <Check
                          className={`size-4 shrink-0 ${highlight ? 'text-cream' : 'text-energy'}`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <FlowstatePilotDialog defaultInterest={defaultInterest}>
                    <button
                      type="button"
                      className={
                        highlight
                          ? 'btn-cream btn-lg mt-8 justify-center'
                          : 'btn-ghost btn-lg mt-8 justify-center'
                      }
                    >
                      {cta}
                      <ArrowRight className="size-4" />
                    </button>
                  </FlowstatePilotDialog>
                </div>
              ),
            )}
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            All prices in Indian Rupees. Enterprise pricing and annual discounts are available.
          </p>
        </div>
      </section>

      <section id="faq" className="bg-card py-24 sm:py-32" aria-label="Frequently asked questions">
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-[0.42fr_0.58fr]">
            <div data-flow-reveal>
              <p className="eyebrow flex items-center gap-2.5">
                <span className="eyebrow-dot" />
                FAQ
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                Questions you probably have.
              </h2>
              <p className="mt-4 text-sm text-muted-foreground">
                Can&apos;t find the answer?{' '}
                <a href="mailto:hello@excentrix.tech" className="underline hover:text-ink">
                  Email us
                </a>
                .
              </p>
            </div>
            <div data-flow-reveal className="border border-border bg-background px-6 py-3 sm:px-8">
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="pilot"
        className="grain relative overflow-hidden bg-ink py-28 text-cream sm:py-36"
        data-theme="dark"
        aria-label="Get started with Flowstate"
      >
        <div className="container relative z-10">
          <div data-flow-reveal className="text-center">
            <p className="eyebrow mb-6 flex items-center justify-center text-cream/60">
              <span className="eyebrow-dot" />
              &nbsp;Get started
            </p>
            <h2 className="mx-auto max-w-4xl font-display text-5xl font-semibold leading-none tracking-tight text-cream md:text-7xl">
              Presentation software built for what happens{' '}
              <span className="text-energy">after you hit play.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/70">
              Authoring, delivery, engagement, and insights in one system.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <FlowstatePilotDialog>
                <button type="button" className="btn-cream btn-lg">
                  Request pilot
                  <ArrowRight className="size-5" />
                </button>
              </FlowstatePilotDialog>
              <a
                href="mailto:hello@excentrix.tech?subject=Flowstate%20demo"
                className="btn-ghost btn-lg border-cream/25 text-cream hover:bg-cream/10"
              >
                Talk to Excentrix
                <ArrowUpRight className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
