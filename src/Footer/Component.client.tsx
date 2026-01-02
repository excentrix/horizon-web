'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Twitter, Linkedin, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react'
import type { Settings } from '@/payload-types'

gsap.registerPlugin(ScrollTrigger)

interface FooterClientProps {
    settings: Settings
}

export function FooterClient({ settings }: FooterClientProps) {
    const footerRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(footerRef.current, {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 95%',
                    toggleActions: 'play none none reverse',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })
        }, footerRef)

        return () => ctx.revert()
    }, [])

    // Get social links from settings
    const socialLinks = settings?.social || {}
    const hasSocialLinks = Object.values(socialLinks).some(link => link)

    return (
        <footer ref={footerRef} className="bg-background text-foreground py-16 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="border-4 border-foreground bg-secondary px-4 py-2 rotate-[-2deg] shadow-harsh inline-block mb-4">
                            <span className="text-2xl font-black text-foreground">HORIZON</span>
                        </div>
                        <p className="font-mono text-sm mb-4 max-w-sm">
                            Breaking the barriers of traditional education. Building the future of personalized
                            learning.
                        </p>
                        {hasSocialLinks && (
                            <div className="flex gap-4">
                                {socialLinks.twitter && (
                                    <SocialLink href={socialLinks.twitter} icon={<Twitter size={20} />} label="Twitter" />
                                )}
                                {socialLinks.linkedin && (
                                    <SocialLink href={socialLinks.linkedin} icon={<Linkedin size={20} />} label="LinkedIn" />
                                )}
                                {socialLinks.instagram && (
                                    <SocialLink href={socialLinks.instagram} icon={<Instagram size={20} />} label="Instagram" />
                                )}
                                {socialLinks.facebook && (
                                    <SocialLink href={socialLinks.facebook} icon={<Facebook size={20} />} label="Facebook" />
                                )}
                                {socialLinks.youtube && (
                                    <SocialLink href={socialLinks.youtube} icon={<Youtube size={20} />} label="YouTube" />
                                )}
                                {socialLinks.discord && (
                                    <SocialLink href={socialLinks.discord} icon={<MessageCircle size={20} />} label="Discord" />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Solutions */}
                    <div>
                        <h3 className="font-black text-lg mb-4">SOLUTIONS</h3>
                        <ul className="space-y-2 font-mono text-sm">
                            <FooterLink href="/solutions/students">For Students</FooterLink>
                            <FooterLink href="/solutions/educators">For Educators</FooterLink>
                            <FooterLink href="/solutions/institutions">For Institutions</FooterLink>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-black text-lg mb-4">RESOURCES</h3>
                        <ul className="space-y-2 font-mono text-sm">
                            <FooterLink href="/blog">Blog</FooterLink>
                            <FooterLink href="/case-studies">Case Studies</FooterLink>
                            <FooterLink href="/resources/guides">Guides</FooterLink>
                            <FooterLink href="/resources/videos">Videos</FooterLink>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-black text-lg mb-4">COMPANY</h3>
                        <ul className="space-y-2 font-mono text-sm">
                            <FooterLink href="/about">About Us</FooterLink>
                            <FooterLink href="/pricing">Pricing</FooterLink>
                            <FooterLink href="/contact">Contact</FooterLink>
                            <FooterLink href="/careers">Careers</FooterLink>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t-2 border-background pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-mono text-sm opacity-70">
                        © 2025 Horizon by Excentrix. Built different.
                    </p>
                    <div className="flex gap-6 font-mono text-sm">
                        <Link href="/legal/privacy" className="hover:text-accent transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/legal/terms" className="hover:text-accent transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
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
            className="w-10 h-10 border-2 border-background flex items-center justify-center hover:bg-accent hover:text-foreground hover:border-accent transition-all"
        >
            {icon}
        </a>
    )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="hover:text-accent transition-colors">
                {children}
            </Link>
        </li>
    )
}
