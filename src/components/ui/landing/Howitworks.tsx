'use client'
import { useEffect, useRef } from 'react'

import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// How It Works Section
const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const flowLineRef = useRef<SVGPathElement>(null)

  const steps = [
    {
      number: '01',
      title: 'TELL US YOUR GOALS',
      description:
        'Share what you want to achieve. The AI mentor breaks it down into bite-sized, actionable steps.',
      icon: '🎯',
    },
    {
      number: '02',
      title: 'GET PERSONALIZED TASKS',
      description:
        'Receive tailored learning tasks that adapt to your pace, style, and progress in real-time.',
      icon: '⚡',
    },
    {
      number: '03',
      title: 'BUILD & REFLECT',
      description:
        'Create real artifacts, reflect on what you learned, and get instant feedback that matters.',
      icon: '🛠️',
    },
    {
      number: '04',
      title: 'SHOWCASE GROWTH',
      description:
        'Your progress becomes a living portfolio. Share it with employers, mentors, or just yourself.',
      icon: '📈',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      // Flow line draw animation
      if (flowLineRef.current) {
        const pathLength = flowLineRef.current.getTotalLength()
        gsap.set(flowLineRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        })

        gsap.to(flowLineRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
          strokeDashoffset: 0,
          ease: 'none',
        })
      }

      // Steps animation
      stepsRef.current.forEach((step, index) => {
        if (!step) return

        // Step reveal
        gsap.from(step, {
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })

        // Icon bounce
        const icon = step.querySelector('.step-icon')
        gsap.from(icon, {
          scrollTrigger: {
            trigger: step,
            start: 'top 75%',
          },
          scale: 0,
          rotation: 360,
          duration: 0.8,
          delay: 0.3,
          ease: 'back.out(2)',
        })

        // Hover micro-interaction
        step.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.2,
            rotation: 10,
            duration: 0.3,
            ease: 'power2.out',
          })
        })

        step.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out',
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="how"
      ref={sectionRef}
      className="py-24 md:py-32 px-4 bg-background relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 2px, transparent 2px, transparent 20px)',
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-20 md:mb-32">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-2 h-24 bg-secondary" />
            <div>
              <p className="font-mono text-sm mb-4 tracking-widest">SECTION_03</p>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6">
                HOW IT
                <br />
                WORKS
              </h2>
              <p className="text-xl md:text-2xl font-mono max-w-2xl border-l-4 border-secondary pl-6">
                Simple flow. Powerful results.
              </p>
            </div>
          </div>
        </div>

        {/* Steps with connecting flow line */}
        <div className="relative">
          {/* SVG Flow Line - hidden on mobile */}
          <svg
            className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <path
              ref={flowLineRef}
              d="M 50 100 Q 200 200, 50 300 T 50 500 T 50 700 T 50 900"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="4"
              opacity="0.3"
            />
          </svg>

          {/* Steps */}
          <div className="space-y-24 md:space-y-32 relative" style={{ zIndex: 2 }}>
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="step-icon w-32 h-32 border-4 border-foreground bg-accent flex items-center justify-center text-6xl shadow-[8px_8px_0px_hsl(var(--foreground))]">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`flex-1 border-4 border-foreground bg-muted p-8 shadow-[8px_8px_0px_hsl(var(--foreground))] ${
                    index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                  }`}
                >
                  <div
                    className={`inline-block mb-4 ${
                      index % 2 === 0 ? '' : 'md:float-right md:ml-4'
                    }`}
                  >
                    <span className="text-6xl font-black text-accent opacity-30">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black mb-4 clear-both">{step.title}</h3>
                  <p className="text-base md:text-lg font-mono leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
