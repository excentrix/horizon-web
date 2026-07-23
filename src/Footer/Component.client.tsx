'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Twitter, Linkedin, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react'
import type { Setting } from '@/payload-types'

import { HorizonMark } from '@/components/Logo/HorizonLogo'
import { ExcentrixFooter } from '@/components/excentrix/ExcentrixFooter'

interface FooterClientProps {
  settings: Setting
}

const columns = [
  {
    title: 'product',
    links: [
      { label: 'AI Mentor', href: '/features/ai-mentor' },
      { label: 'Adaptive Learning', href: '/adaptive-learning' },
      { label: 'Holistic Grading', href: '/features/holistic-grading' },
      { label: 'AI Grading', href: '/ai-grading' },
      { label: 'Community', href: '/features/community' },
      { label: 'Flowstate', href: 'https://flowstate.excentrix.tech' },
      { label: 'Colcord', href: 'https://colcord.excentrix.tech' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'solutions',
    links: [
      { label: 'For Students', href: '/solutions/students' },
      { label: 'For Educators', href: '/solutions/educators' },
      { label: 'For Institutions', href: '/solutions/institutions' },
      { label: 'VELO Proof of Work', href: 'https://velo.excentrix.tech/use-cases/proof-of-work-verification' },
      { label: 'Case Studies', href: '/case-studies' },
    ],
  },
  {
    title: 'resources',
    links: [
      { label: 'Blog', href: '/posts' },
      { label: 'Guides', href: '/resources/guides' },
      { label: 'Videos', href: '/resources/videos' },
      { label: 'Search', href: '/search' },
    ],
  },
  {
    title: 'company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export function FooterClient({ settings }: FooterClientProps) {
  const pathname = usePathname()
  const isExcentrixBlog = pathname.startsWith('/posts')
  const socialLinks = settings?.social || {}
  const hasSocialLinks = Object.values(socialLinks).some((link) => link)

  if (isExcentrixBlog) {
    return (
      <ExcentrixFooter
        homeHref="https://excentrix.tech"
        sectionHrefPrefix="https://excentrix.tech/"
      />
    )
  }

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-background">
      <div className="container pb-12 pt-16 md:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-foreground"
              aria-label="Horizon — home"
            >
              <HorizonMark className="size-8 text-energy" />
              <span className="font-display text-2xl font-semibold lowercase tracking-tight text-ink">
                horizon
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The AI mentor that knows you. A living learning plan that adapts every day — and proof
              of skill you can show anyone.
            </p>
            {hasSocialLinks && (
              <div className="mt-6 flex gap-2">
                {socialLinks.twitter && (
                  <SocialLink
                    href={socialLinks.twitter}
                    icon={<Twitter size={16} />}
                    label="Twitter"
                  />
                )}
                {socialLinks.linkedin && (
                  <SocialLink
                    href={socialLinks.linkedin}
                    icon={<Linkedin size={16} />}
                    label="LinkedIn"
                  />
                )}
                {socialLinks.instagram && (
                  <SocialLink
                    href={socialLinks.instagram}
                    icon={<Instagram size={16} />}
                    label="Instagram"
                  />
                )}
                {socialLinks.facebook && (
                  <SocialLink
                    href={socialLinks.facebook}
                    icon={<Facebook size={16} />}
                    label="Facebook"
                  />
                )}
                {socialLinks.youtube && (
                  <SocialLink
                    href={socialLinks.youtube}
                    icon={<Youtube size={16} />}
                    label="YouTube"
                  />
                )}
                {socialLinks.discord && (
                  <SocialLink
                    href={socialLinks.discord}
                    icon={<MessageCircle size={16} />}
                    label="Discord"
                  />
                )}
              </div>
            )}
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="eyebrow mb-4">{col.title}</h3>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-foreground/80 transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Horizon by Excentrix. Every learner deserves a mentor.</p>
          <div className="flex gap-6">
            <Link href="/legal/privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link href="/legal/terms" className="transition-colors hover:text-ink">
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Oversize watermark wordmark, clipped at the baseline */}
      <div aria-hidden="true" className="pointer-events-none select-none">
        <p className="font-display -mb-[0.34em] text-center text-[22vw] font-semibold lowercase leading-none tracking-tight text-ink/[0.06]">
          horizon
        </p>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-foreground/40 hover:text-ink"
    >
      {icon}
    </a>
  )
}
