'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  GraduationCap,
  BadgeCheck,
  MessageSquare,
  Network,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { ColcordPilotDialog } from './ColcordPilotDialog'

gsap.registerPlugin(ScrollTrigger)

const modules = [
  {
    name: 'Academic Management',
    Icon: BookOpen,
    body: 'Course registration, grade tracking, assignments, planning, and academic records in one workspace.',
    details: ['Course registration', 'Assignment tracking', 'Grade visibility'],
  },
  {
    name: 'Communication Hub',
    Icon: MessageSquare,
    body: 'A single channel for students, faculty, administrators, alumni, and parents to stay aligned.',
    details: ['Announcements', 'Faculty updates', 'Role-based messages'],
  },
  {
    name: 'Campus Life',
    Icon: CalendarDays,
    body: 'Events, communities, activities, and campus notifications connected to student identity.',
    details: ['Campus events', 'Clubs and communities', 'Activity updates'],
  },
  {
    name: 'Career Services',
    Icon: BriefcaseBusiness,
    body: 'Career workflows that connect students, alumni, mentors, and institutional placement teams.',
    details: ['Mentorship', 'Opportunities', 'Placement support'],
  },
  {
    name: 'Digital Identity',
    Icon: BadgeCheck,
    body: 'Unified profiles that follow every user across academic, campus, and alumni touchpoints.',
    details: ['Student profile', 'Access control', 'Institution identity'],
  },
  {
    name: 'Analytics Dashboard',
    Icon: BarChart3,
    body: 'Institutional visibility across operations, academics, engagement, and student progress.',
    details: ['Operations monitor', 'Progress insights', 'Reporting'],
  },
]

const people = [
  {
    name: 'Students',
    body: 'Complete academic journey management from enrollment to graduation.',
    points: ['Course management', 'Assignment tracking', 'Campus events', 'Peer networking'],
  },
  {
    name: 'Faculty',
    body: 'Teaching tools and administrative workflows that reduce platform switching.',
    points: ['Course creation', 'Student management', 'Research tools', 'Collaboration'],
  },
  {
    name: 'Administration',
    body: 'Institutional oversight with unified operations and data-driven insights.',
    points: ['Operations monitor', 'Analytics dashboard', 'Resource planning', 'Reporting'],
  },
  {
    name: 'Alumni',
    body: 'A lifelong connection with alma mater, mentors, students, and opportunities.',
    points: ['Networking events', 'Mentorship programs', 'Career services', 'Giving back'],
  },
  {
    name: 'Parents',
    body: 'Progress updates and campus visibility without fragmented communication.',
    points: ['Academic updates', 'Campus notifications', 'Event calendar', 'Communication'],
  },
]

function EcosystemGraphic() {
  return (
    <div className="relative mx-auto aspect-[1.42] w-full max-w-xl" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--hz-cream)/0.13),transparent_58%)]" />
      {[
        'left-[3%] top-[34%] h-[18%] w-[28%] bg-cream',
        'left-[3%] top-[55%] h-[10%] w-[28%] border border-cream/20',
        'left-[36%] top-[22%] h-[17%] w-[28%] border border-cream/20',
        'left-[36%] top-[44%] h-[30%] w-[28%] bg-cream',
        'left-[69%] top-[18%] h-[22%] w-[28%] bg-cream',
        'left-[69%] top-[44%] h-[11%] w-[28%] border border-cream/20',
        'left-[69%] top-[59%] h-[18%] w-[28%] border border-cream/20',
      ].map((classes, index) => (
        <div
          key={classes}
          data-colcord-block
          className={`absolute ${classes} transition-transform duration-300`}
          style={{ transitionDelay: `${index * 35}ms` }}
        />
      ))}
      <div className="absolute left-[31%] top-[48%] h-px w-[38%] bg-cream/20" />
      <div className="absolute left-[50%] top-[38%] h-[38%] w-px bg-cream/20" />
    </div>
  )
}

function OperationsMock() {
  return (
    <div className="overflow-hidden border border-cream/10 bg-cream/5">
      <div className="flex items-center justify-between border-b border-cream/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-cream" />
          <span className="size-2 rounded-full bg-cream/35" />
          <span className="size-2 rounded-full bg-cream/35" />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/60">
          institutional overview
        </p>
      </div>
      <div className="grid gap-px bg-cream/10 md:grid-cols-[0.84fr_1.16fr]">
        <div className="bg-ink p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/60">today</p>
          <h3 className="mt-5 font-display text-4xl font-semibold leading-none tracking-tight text-cream">
            12,480
          </h3>
          <p className="mt-2 text-sm text-cream/70">active campus records</p>
          <div className="mt-8 space-y-3">
            {['Course registrations', 'Faculty updates', 'Parent notifications'].map(
              (label, index) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.13em] text-cream/60">
                    <span>{label}</span>
                    <span>{[84, 71, 56][index]}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-cream/10">
                    <div
                      className="h-full rounded-full bg-cream"
                      style={{ width: `${[84, 71, 56][index]}%` }}
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
        <div className="bg-ink p-6">
          <div className="grid gap-px bg-cream/10 sm:grid-cols-2">
            {[
              ['Academic', 'Course add/drop window closing'],
              ['Campus', '42 events scheduled this week'],
              ['Career', '18 alumni mentor slots open'],
              ['Admin', 'Resource planning report ready'],
            ].map(([label, body]) => (
              <div key={label} className="bg-ink p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/50">
                  {label}
                </p>
                <p className="mt-3 text-sm leading-6 text-cream/80">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ColcordLanding() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reducedMotion) return

      gsap.fromTo(
        '[data-colcord-hero]',
        { y: 28, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1 },
      )

      gsap.fromTo(
        '[data-colcord-block]',
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power2.out', stagger: 0.07, delay: 0.25 },
      )

      gsap.utils.toArray<HTMLElement>('[data-colcord-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 26, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.72,
            ease: 'power2.out',
            scrollTrigger: { trigger: element, start: 'top 84%', once: true },
          },
        )
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="bg-ink text-cream" data-theme="dark">
      <section className="relative isolate min-h-screen overflow-hidden border-b border-cream/10 pt-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_36%,hsl(var(--hz-cream)/0.08),transparent_35%)]" />
        <div className="container grid min-h-[calc(100svh-5rem)] items-center gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p
              data-colcord-hero
              className="mb-8 inline-flex items-center gap-3 border border-cream/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-cream/60"
            >
              <span className="size-1.5 rounded-full bg-cream/55" />
              Unified education ecosystem
            </p>
            <h1
              data-colcord-hero
              className="max-w-4xl font-display text-6xl font-semibold leading-none tracking-tight text-cream md:text-8xl"
            >
              One Platform.
              <br />
              <span className="text-cream">One Ecosystem</span>
            </h1>
            <p
              data-colcord-hero
              className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/60 md:text-xl"
            >
              A comprehensive digital platform connecting students, faculty, administrators, alumni,
              and parents through seamless technology integration.
            </p>
            <div data-colcord-hero className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ColcordPilotDialog>
                <button type="button" className="btn-cream btn-lg">
                  Request pilot
                  <ArrowRight className="size-5" />
                </button>
              </ColcordPilotDialog>
              <a
                href="#modules"
                className="btn-ghost btn-lg border-cream/25 text-cream hover:bg-cream/10"
              >
                Explore modules
              </a>
            </div>
          </div>

          <div data-colcord-hero>
            <EcosystemGraphic />
          </div>
        </div>
      </section>

      <section id="modules" className="border-b border-cream/10 py-24 md:py-32">
        <div className="container">
          <div className="mb-14 max-w-3xl" data-colcord-reveal>
            <p className="eyebrow mb-5 flex items-center gap-2.5 text-cream/50">
              <span className="eyebrow-dot bg-cream" />
              Platform modules
            </p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-cream md:text-6xl">
              Comprehensive functionality for every university operation.
            </h2>
          </div>

          <div
            className="grid gap-px border-y border-cream/10 bg-cream/10 md:grid-cols-3"
            data-colcord-reveal
          >
            {modules.map(({ Icon, name, body, details }) => (
              <article key={name} className="group bg-ink p-7 transition-colors hover:bg-cream/5">
                <Icon className="mb-8 size-7 text-cream" />
                <h3 className="font-display text-2xl font-semibold tracking-tight text-cream">
                  {name}
                </h3>
                <p className="mt-4 min-h-24 text-sm leading-6 text-cream/60">{body}</p>
                <ul className="mt-6 space-y-2">
                  {details.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-cream/75">
                      <Check className="size-4 text-cream" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="people" className="border-b border-cream/10 py-24 md:py-32">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div data-colcord-reveal>
              <p className="eyebrow mb-5 flex items-center gap-2.5 text-cream/50">
                <span className="eyebrow-dot bg-cream" />
                Built for everyone
              </p>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-cream md:text-6xl">
                Tailored experiences for every member of the university ecosystem.
              </h2>
            </div>

            <div className="grid gap-px border border-cream/10 bg-cream/10" data-colcord-reveal>
              {people.map((group) => (
                <div key={group.name} className="grid gap-px bg-cream/10 md:grid-cols-[0.55fr_1fr]">
                  <div className="bg-ink p-6">
                    <h3 className="font-display text-3xl font-semibold tracking-tight text-cream">
                      {group.name}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-cream/60">{group.body}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-px bg-cream/10">
                    {group.points.map((point) => (
                      <div key={point} className="bg-ink px-5 py-4 text-sm text-cream/75">
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="challenge" className="border-b border-cream/10 py-24 md:py-32">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div data-colcord-reveal>
            <p className="eyebrow mb-5 flex items-center gap-2.5 text-cream/50">
              <span className="eyebrow-dot bg-cream" />
              The challenge
            </p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-cream md:text-6xl">
              Multiple disconnected systems create operational drag.
            </h2>
            <div className="mt-8 space-y-4 text-lg leading-relaxed text-cream/60">
              <p>Students manage dozens of platforms for basic university functions.</p>
              <p>Faculty are pulled into administrative complexity.</p>
              <p>Administrators lack unified institutional insight.</p>
            </div>
          </div>
          <div data-colcord-reveal>
            <OperationsMock />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div
          className="container grid gap-px border-y border-cream/10 bg-cream/10 md:grid-cols-3"
          data-colcord-reveal
        >
          {[
            { Icon: Network, value: '01', label: 'Unified ecosystem' },
            { Icon: ShieldCheck, value: '02', label: 'Role-aware access' },
            { Icon: GraduationCap, value: '03', label: 'Student journey continuity' },
          ].map(({ Icon, value, label }) => (
            <div key={label} className="bg-ink p-8">
              <Icon className="mb-10 size-8 text-cream" />
              <p className="font-display text-5xl font-semibold leading-none text-cream">{value}</p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-cream/60">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="pilot"
        className="grain relative overflow-hidden border-t border-cream/10 bg-cream py-24 text-ink md:py-32"
        data-theme="light"
      >
        <div className="container relative z-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div data-colcord-reveal>
            <p className="eyebrow mb-5 flex items-center gap-2.5">
              <span className="eyebrow-dot" />
              University infrastructure
            </p>
            <h2 className="max-w-4xl font-display text-4xl font-semibold tracking-tight !text-ink md:text-6xl">
              The operating system for India’s next generation of universities.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Colcord unifies academic records, communication, campus life, career services,
              identity, and institutional intelligence into one coordinated ecosystem.
            </p>
          </div>
          <ColcordPilotDialog>
            <button type="button" data-colcord-reveal className="btn-ink btn-lg">
              Request a pilot
              <ArrowRight className="size-5" />
            </button>
          </ColcordPilotDialog>
        </div>
      </section>
    </div>
  )
}
