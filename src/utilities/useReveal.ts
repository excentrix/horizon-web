'use client'

import { useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scroll-triggered entrance for any descendants marked with [data-reveal].
 * Elements sharing a numeric data-reveal value are staggered as one group.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-reveal]')
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay: Number(el.dataset.reveal || 0) * 0.12,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        )
      })
    }, scope)

    return () => ctx.revert()
  }, [scope])
}
