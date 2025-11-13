'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import type { Header } from '@/payload-types'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// gsap.registerPlugin(ScrollTrigger)

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Menu, X } from 'lucide-react'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()


  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav fade in on load
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      })

      // Logo glitch effect
      const glitchTimeline = gsap.timeline({ repeat: -1, repeatDelay: 5 })
      glitchTimeline
        .to(logoRef.current, { x: -2, duration: 0.05 })
        .to(logoRef.current, { x: 2, duration: 0.05 })
        .to(logoRef.current, { x: 0, duration: 0.05 })

      // Show/hide nav on scroll
      ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          if (self.direction === -1) {
            gsap.to(navRef.current, { y: 0, duration: 0.3 })
          } else if (self.progress > 0.05) {
            gsap.to(navRef.current, { y: -100, duration: 0.3 })
          }
        },
      })
    }, navRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (isOpen) {
      gsap.from(menuItemsRef.current, {
        x: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out',
      })
    }
  }, [isOpen])

  const navItems = [
    { label: 'PROBLEM', href: '#problem' },
    { label: 'SOLUTION', href: '#solution' },
    { label: 'HOW IT WORKS', href: '#how' },
    { label: 'JOIN WAITLIST', href: '#waitlist' },
  ]


  return (
    <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between">
        {/* <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <HeaderNav data={data} /> */}
        <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-background border-b-4 border-foreground"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center gap-2">
            {/* <div className="w-10 h-10 bg-foreground border-2 border-foreground relative overflow-hidden">
              <div className="absolute inset-0 bg-accent transform -skew-x-12" />
            </div> */}
            {/* <span className="text-2xl font-black tracking-tighter">EDTECH</span> */}
            <div className="flex items-center">
              <div className="border-4 border-foreground bg-secondary px-4 py-2 rotate-[-2deg] shadow-harsh">
                <span className="text-2xl font-black">HORIZON</span>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="font-mono text-sm font-bold hover:text-accent transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-12 h-12 border-4 border-foreground bg-secondary flex items-center justify-center"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 border-t-4 border-foreground pt-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                ref={(el) => (menuItemsRef.current[index] = el)}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 font-mono text-lg font-bold hover:bg-accent hover:text-background transition-colors px-4 border-b-2 border-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
      </div>
    </header>
  )
}
