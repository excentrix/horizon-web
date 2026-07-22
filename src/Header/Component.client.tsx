'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X, ArrowUpRight } from 'lucide-react'

import { HorizonWordmark } from '@/components/Logo/HorizonLogo'
import { ExcentrixWordmark } from '@/components/excentrix/ExcentrixWordmark'

gsap.registerPlugin(ScrollTrigger)

const navItems = [
  { label: 'ai mentor', href: '/features/ai-mentor' },
  { label: 'grading', href: '/features/holistic-grading' },
  { label: 'community', href: '/features/community' },
  { label: 'blog', href: '/posts' },
  { label: 'about', href: '/about' },
]

const excentrixBlogNavItems = [
  { label: 'what we build', href: 'https://excentrix.tech/#build' },
  { label: 'principles', href: 'https://excentrix.tech/#principles' },
  { label: 'offers', href: 'https://excentrix.tech/#offers' },
  { label: 'blog', href: '/posts' },
]

export const HeaderClient: React.FC = () => {
  const pathname = usePathname()
  const isExcentrixBlog = pathname.startsWith('/posts')
  const [isOpen, setIsOpen] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Surface the dashboard link once the visitor is on the waitlist
  useEffect(() => {
    setHasJoined(!!localStorage.getItem('waitlist_email'))
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen && overlayRef.current) {
      const links = overlayRef.current.querySelectorAll('[data-overlay-link]')
      gsap.fromTo(
        links,
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.6, ease: 'power3.out', delay: 0.1 },
      )
    }
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -72, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15 },
      )

      ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          setScrolled(self.scroll() > 24)
          if (self.direction === -1 || self.scroll() < 80) {
            gsap.to(navRef.current, { y: 0, duration: 0.3, overwrite: 'auto' })
          } else if (self.progress > 0.02) {
            gsap.to(navRef.current, { y: -88, duration: 0.3, overwrite: 'auto' })
          }
        },
      })
    }, navRef)

    return () => ctx.revert()
  }, [])

  const allItems = isExcentrixBlog
    ? excentrixBlogNavItems
    : [...navItems, ...(hasJoined ? [{ label: 'dashboard', href: '/wishlist' }] : [])]
  const ctaHref = isExcentrixBlog
    ? 'https://excentrix.tech/#pilot'
    : hasJoined
      ? '/wishlist'
      : '/#waitlist'
  const ctaLabel = isExcentrixBlog
    ? 'Start a pilot'
    : hasJoined
      ? 'Your dashboard'
      : 'Join the waitlist'

  return (
    <header className="relative z-50">
      <nav
        ref={navRef}
        aria-label="Main"
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled && !isOpen
            ? 'border-b border-border bg-background/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container flex h-16 items-center justify-between md:h-[4.5rem]">
          <Link
            href={isExcentrixBlog ? 'https://excentrix.tech' : '/'}
            aria-label={isExcentrixBlog ? 'Excentrix home' : 'Horizon — home'}
            className="group relative z-50 text-foreground"
          >
            {isExcentrixBlog ? (
              <ExcentrixWordmark
                markClassName="text-energy transition-transform duration-500 group-hover:-translate-y-0.5"
                textClassName="text-ink"
              />
            ) : (
              <HorizonWordmark markClassName="text-energy transition-transform duration-500 group-hover:-translate-y-0.5" />
            )}
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 lg:flex">
            {allItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[0.9375rem] font-medium lowercase tracking-tight transition-colors hover:text-ink ${
                  pathname === item.href ||
                  (item.href === '/posts' && pathname.startsWith('/posts'))
                    ? 'text-ink'
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href={ctaHref} className="btn-primary btn-md">
              {ctaLabel}
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="relative z-50 flex size-11 items-center justify-center rounded-full border border-border bg-background text-foreground lg:hidden"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="grain fixed inset-0 z-40 flex flex-col bg-background pt-24 lg:hidden"
        >
          <nav aria-label="Mobile" className="container flex flex-1 flex-col gap-1">
            {allItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-overlay-link
                className="font-display border-b border-border py-4 text-4xl font-semibold lowercase tracking-tight text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="container pb-10" data-overlay-link>
            <Link
              href={ctaHref}
              onClick={() => setIsOpen(false)}
              className="btn-primary btn-lg w-full"
            >
              {ctaLabel}
              <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
