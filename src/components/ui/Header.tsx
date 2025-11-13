'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string; description?: string }[]
}

const navigation: NavItem[] = [
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      {
        label: 'For Students',
        href: '/solutions/students',
        description: 'Personalized learning paths that adapt to you',
      },
      {
        label: 'For Educators',
        href: '/solutions/educators',
        description: 'Tools to enhance teaching effectiveness',
      },
      {
        label: 'For Institutions',
        href: '/solutions/institutions',
        description: 'Scalable solutions for educational organizations',
      },
    ],
  },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Case Studies', href: '/case-studies' },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Blog', href: '/blog', description: 'Latest insights and updates' },
      { label: 'Guides', href: '/resources/guides', description: 'In-depth learning guides' },
      { label: 'Templates', href: '/resources/templates', description: 'Ready-to-use resources' },
      { label: 'Videos', href: '/resources/videos', description: 'Visual learning content' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-background border-b-4 border-foreground"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div
              ref={logoRef}
              className="border-4 border-foreground bg-secondary px-4 py-2 rotate-[-2deg] shadow-harsh hover:rotate-0 transition-transform"
            >
              <span className="text-2xl font-black">HORIZON</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
              />
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="font-mono text-sm font-bold hover:text-accent transition-colors"
            >
              CONTACT
            </Link>
            <Link
              href="#waitlist"
              className="border-4 border-foreground bg-accent px-6 py-2 font-black shadow-harsh hover:shadow-harsh-sm transition-all"
            >
              JOIN WAITLIST
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-12 h-12 border-4 border-foreground bg-secondary flex items-center justify-center"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 border-t-4 border-foreground pt-4">
            <MobileMenu
              navigation={navigation}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
            <div className="mt-4 pt-4 border-t-2 border-foreground space-y-3">
              <Link
                href="/contact"
                className="block py-3 font-mono text-lg font-bold hover:bg-muted transition-colors px-4"
              >
                CONTACT
              </Link>
              <Link
                href="#waitlist"
                className="block border-4 border-foreground bg-accent py-3 font-black text-center shadow-harsh"
              >
                JOIN WAITLIST
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function NavItem({
  item,
  activeDropdown,
  setActiveDropdown,
}: {
  item: NavItem
  activeDropdown: string | null
  setActiveDropdown: (label: string | null) => void
}) {
  const hasChildren = item.children && item.children.length > 0
  const isActive = activeDropdown === item.label

  return (
    <div
      className="relative group"
      onMouseEnter={() => hasChildren && setActiveDropdown(item.label)}
      onMouseLeave={() => hasChildren && setActiveDropdown(null)}
    >
      <Link
        href={item.href}
        className="font-mono text-sm font-bold hover:text-accent transition-colors relative group/link flex items-center gap-1"
      >
        {item.label}
        {hasChildren && <ChevronDown size={16} className={isActive ? 'rotate-180' : ''} />}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover/link:w-full transition-all duration-300" />
      </Link>

      {/* Dropdown */}
      {hasChildren && isActive && (
        <div className="absolute top-full left-0 mt-4 w-72 border-4 border-foreground bg-background shadow-harsh z-50">
          {item.children!.map((child) => (
            <Link
              key={child.label}
              href={child.href}
              className="block p-4 hover:bg-accent hover:text-background transition-colors border-b-2 border-foreground last:border-b-0"
            >
              <div className="font-bold mb-1">{child.label}</div>
              {child.description && (
                <div className="text-xs font-mono opacity-70">{child.description}</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function MobileMenu({
  navigation,
  activeDropdown,
  setActiveDropdown,
}: {
  navigation: NavItem[]
  activeDropdown: string | null
  setActiveDropdown: (label: string | null) => void
}) {
  return (
    <div className="space-y-2">
      {navigation.map((item) => {
        const hasChildren = item.children && item.children.length > 0
        const isActive = activeDropdown === item.label

        return (
          <div key={item.label}>
            <div className="flex items-center justify-between">
              <Link
                href={item.href}
                className="flex-1 py-3 font-mono text-lg font-bold hover:bg-accent hover:text-background transition-colors px-4 border-b-2 border-foreground"
              >
                {item.label}
              </Link>
              {hasChildren && (
                <button
                  onClick={() => setActiveDropdown(isActive ? null : item.label)}
                  className="px-4 py-3 border-l-2 border-b-2 border-foreground"
                >
                  <ChevronDown size={20} className={isActive ? 'rotate-180' : ''} />
                </button>
              )}
            </div>

            {/* Mobile Dropdown */}
            {hasChildren && isActive && (
              <div className="bg-muted">
                {item.children!.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className="block py-3 px-8 hover:bg-accent hover:text-background transition-colors border-b border-foreground/20"
                  >
                    <div className="font-bold mb-1">{child.label}</div>
                    {child.description && (
                      <div className="text-xs font-mono opacity-70">{child.description}</div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
