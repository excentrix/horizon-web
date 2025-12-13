'use client'

import React, { useEffect, useRef } from 'react'
import PageHero from '@/components/ui/PageHero'
import Waitlist from '@/components/ui/landing/Waitlist'
import { Brain, Target, Zap, MessageSquare, Clock, Shield, TrendingUp, Sparkles, ArrowRight, Check, X } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AIMentorPage() {
  const heroContentRef = useRef<HTMLDivElement>(null)
  const problemRef = useRef<HTMLDivElement>(null)
  const solutionRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const comparisonRef = useRef<HTMLDivElement>(null)
  const howItWorksRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content reveal
      if (heroContentRef.current) {
        gsap.from(heroContentRef.current.children, {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.3,
        })
      }

      // Problem section
      if (problemRef.current) {
        const painPoints = problemRef.current.querySelectorAll('.pain-point')
        gsap.from(painPoints, {
          scrollTrigger: {
            trigger: problemRef.current,
            start: 'top 75%',
          },
          x: -100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        })
      }

      // Solution highlight
      if (solutionRef.current) {
        gsap.from(solutionRef.current.querySelector('.solution-box'), {
          scrollTrigger: {
            trigger: solutionRef.current,
            start: 'top 70%',
          },
          scale: 0.8,
          opacity: 0,
          duration: 1,
          ease: 'back.out(1.7)',
        })
      }

      // Features grid
      if (featuresRef.current) {
        const cards = featuresRef.current.querySelectorAll('.feature-card')
        cards.forEach((card, index) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
            y: 80,
            opacity: 0,
            rotation: index % 2 === 0 ? -5 : 5,
            duration: 0.8,
            ease: 'power3.out',
          })
        })
      }

      // Comparison table
      if (comparisonRef.current) {
        const rows = comparisonRef.current.querySelectorAll('.comparison-row')
        gsap.from(rows, {
          scrollTrigger: {
            trigger: comparisonRef.current,
            start: 'top 75%',
          },
          x: -50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        })
      }

      // How it works timeline
      if (howItWorksRef.current) {
        const steps = howItWorksRef.current.querySelectorAll('.workflow-step')
        steps.forEach((step, index) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
            },
          })

          tl.from(step, {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          }).from(
            step.querySelector('.step-number'),
            {
              scale: 0,
              rotation: 360,
              duration: 0.6,
              ease: 'back.out(2)',
            },
            '-=0.4'
          )
        })
      }

      // Benefits cards
      if (benefitsRef.current) {
        const benefits = benefitsRef.current.querySelectorAll('.benefit-card')
        gsap.set(benefits, { opacity: 1, y: 0 })
        gsap.from(benefits, {
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: 'top 75%',
          },
          y: 60,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <PageHero
        title="AI MENTOR"
        subtitle="24/7 personalized learning companion that adapts to your pace"
        variant="gradient"
      />

      {/* Hero Supporting Content */}
      <section className="py-16 md:py-20 px-4 bg-background border-b-4 border-foreground">
        <div className="container mx-auto max-w-5xl">
          <div ref={heroContentRef} className="space-y-8 text-center">
            <p className="text-2xl md:text-4xl font-black leading-tight">
              Stop waiting for office hours.
              <br />
              Start learning at your own speed.
            </p>
            <p className="text-lg md:text-xl font-mono opacity-80 max-w-3xl mx-auto">
              An intelligent system that understands your questions, learns your preferences, and delivers explanations exactly when you need them.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 md:py-32 px-4 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <div className="inline-block border-4 border-foreground bg-secondary px-6 py-2 mb-6">
              <span className="font-black text-sm tracking-widest text-foreground">THE REALITY</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Learning support is broken
            </h2>
          </div>

          <div ref={problemRef} className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="pain-point border-4 border-foreground bg-background p-8 md:p-10 shadow-[8px_8px_0px_hsl(var(--foreground))] hover:border-secondary transition-colors duration-300 cursor-pointer group">
              <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center mb-6 font-black text-2xl group-hover:bg-secondary group-hover:text-foreground transition-colors duration-300">
                01
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4">Limited Availability</h3>
              <p className="text-lg font-mono leading-relaxed opacity-90">
                Professors have hundreds of students. TAs juggle multiple courses. Office hours fill up instantly. You are left stuck when confusion strikes at midnight.
              </p>
            </div>

            <div className="pain-point border-4 border-foreground bg-background p-8 md:p-10 shadow-[8px_8px_0px_hsl(var(--foreground))] hover:border-accent transition-colors duration-300 cursor-pointer group">
              <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center mb-6 font-black text-2xl group-hover:bg-accent group-hover:text-foreground transition-colors duration-300">
                02
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4">Generic Explanations</h3>
              <p className="text-lg font-mono leading-relaxed opacity-90">
                YouTube tutorials assume one learning style. Textbooks provide one explanation. Neither adapts to your specific gaps or background knowledge.
              </p>
            </div>

            <div className="pain-point border-4 border-foreground bg-background p-8 md:p-10 shadow-[8px_8px_0px_hsl(var(--foreground))] hover:border-secondary transition-colors duration-300 cursor-pointer group">
              <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center mb-6 font-black text-2xl group-hover:bg-secondary group-hover:text-foreground transition-colors duration-300">
                03
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4">Fear of Judgment</h3>
              <p className="text-lg font-mono leading-relaxed opacity-90">
                Asking the same question twice feels embarrassing. Admitting confusion in front of peers creates anxiety. Silent struggling becomes the default.
              </p>
            </div>

            <div className="pain-point border-4 border-foreground bg-background p-8 md:p-10 shadow-[8px_8px_0px_hsl(var(--foreground))] hover:border-accent transition-colors duration-300 cursor-pointer group">
              <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center mb-6 font-black text-2xl group-hover:bg-accent group-hover:text-foreground transition-colors duration-300">
                04
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4">Slow Feedback Loop</h3>
              <p className="text-lg font-mono leading-relaxed opacity-90">
                Post a question, wait hours or days for a response. By then, momentum is lost and context is forgotten. Learning grinds to a halt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section ref={solutionRef} className="py-20 md:py-32 px-4 bg-background relative overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 border-8 border-accent opacity-10 rotate-12 hidden lg:block" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary opacity-5 -rotate-6 hidden lg:block" />

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="solution-box border-4 border-foreground bg-accent p-12 md:p-16 shadow-[16px_16px_0px_hsl(var(--foreground))]">
            <div className="flex items-start gap-6 mb-8">
              <ArrowRight size={48} className="flex-shrink-0 text-foreground" strokeWidth={3} />
              <h2 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
                AI Mentor solves all four problems
              </h2>
            </div>
            <p className="text-xl md:text-2xl font-mono text-foreground leading-relaxed max-w-3xl">
              An always-available, judgment-free learning companion that delivers instant, personalized explanations calibrated to your exact level of understanding.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 md:py-32 px-4 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <div className="inline-block border-4 border-foreground bg-secondary px-6 py-2 mb-6">
              <span className="font-black text-sm tracking-widest text-foreground">CORE CAPABILITIES</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              What makes it powerful
            </h2>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="feature-card border-4 border-foreground bg-background p-8 md:p-10 relative overflow-hidden group hover:bg-secondary transition-all duration-300 cursor-pointer">
              <div className="absolute top-0 left-0 w-2 h-full bg-secondary group-hover:w-full transition-all duration-300 -z-10" />
              <Brain className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <h3 className="text-2xl md:text-3xl font-black mb-4">Contextual Understanding</h3>
              <p className="text-lg font-mono leading-relaxed mb-6">
                Analyzes your question, identifies knowledge gaps, and delivers explanations that build on what you already know.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check size={20} className="flex-shrink-0 mt-1" strokeWidth={3} />
                  <span className="font-mono text-sm">Natural language processing</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="flex-shrink-0 mt-1" strokeWidth={3} />
                  <span className="font-mono text-sm">Pattern recognition</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="flex-shrink-0 mt-1" strokeWidth={3} />
                  <span className="font-mono text-sm">Adaptive complexity</span>
                </li>
              </ul>
            </div>

            <div className="feature-card border-4 border-foreground bg-background p-8 md:p-10 relative overflow-hidden group hover:bg-accent transition-all duration-300 cursor-pointer">
              <div className="absolute top-0 left-0 w-2 h-full bg-accent group-hover:w-full transition-all duration-300 -z-10" />
              <Target className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <h3 className="text-2xl md:text-3xl font-black mb-4">Personalized Roadmaps</h3>
              <p className="text-lg font-mono leading-relaxed mb-6">
                Creates custom learning paths based on your goals, current knowledge, and preferred learning style.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check size={20} className="flex-shrink-0 mt-1" strokeWidth={3} />
                  <span className="font-mono text-sm">Goal-based planning</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="flex-shrink-0 mt-1" strokeWidth={3} />
                  <span className="font-mono text-sm">Progress tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="flex-shrink-0 mt-1" strokeWidth={3} />
                  <span className="font-mono text-sm">Dynamic adjustments</span>
                </li>
              </ul>
            </div>

            <div className="feature-card border-4 border-foreground bg-background p-8 md:p-10 relative overflow-hidden group hover:bg-accent transition-all duration-300 cursor-pointer">
              <div className="absolute top-0 left-0 w-2 h-full bg-accent group-hover:w-full transition-all duration-300 -z-10" />
              <Zap className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <h3 className="text-2xl md:text-3xl font-black mb-4">Instant Response</h3>
              <p className="text-lg font-mono leading-relaxed mb-6">
                Get comprehensive explanations in seconds, not hours. Maintain learning momentum without disruption.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check size={20} className="flex-shrink-0 mt-1" strokeWidth={3} />
                  <span className="font-mono text-sm">Sub-second response time</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="flex-shrink-0 mt-1" strokeWidth={3} />
                  <span className="font-mono text-sm">Multi-format explanations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="flex-shrink-0 mt-1" strokeWidth={3} />
                  <span className="font-mono text-sm">Interactive examples</span>
                </li>
              </ul>
            </div>

            <div className="feature-card border-4 border-foreground bg-background p-8 md:p-10 relative overflow-hidden group hover:bg-secondary transition-all duration-300 cursor-pointer">
              <div className="absolute top-0 left-0 w-2 h-full bg-secondary group-hover:w-full transition-all duration-300 -z-10" />
              <MessageSquare className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <h3 className="text-2xl md:text-3xl font-black mb-4">Continuous Learning</h3>
              <p className="text-lg font-mono leading-relaxed mb-6">
                The system learns from every interaction, becoming increasingly effective at supporting your unique learning journey.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check size={20} className="flex-shrink-0 mt-1" strokeWidth={3} />
                  <span className="font-mono text-sm">Preference adaptation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="flex-shrink-0 mt-1" strokeWidth={3} />
                  <span className="font-mono text-sm">Style recognition</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="flex-shrink-0 mt-1" strokeWidth={3} />
                  <span className="font-mono text-sm">Feedback integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 md:py-32 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Traditional vs AI Mentor
            </h2>
            <p className="text-xl font-mono opacity-80">
              See the difference in learning support
            </p>
          </div>

          <div ref={comparisonRef} className="border-4 border-foreground bg-background overflow-hidden shadow-[12px_12px_0px_hsl(var(--foreground))]">
            {/* Header */}
            <div className="grid grid-cols-3 bg-foreground text-background border-b-4 border-background">
              <div className="p-6 font-black">FEATURE</div>
              <div className="p-6 font-black border-l-4 border-background">TRADITIONAL</div>
              <div className="p-6 font-black border-l-4 border-background bg-secondary text-foreground">AI MENTOR</div>
            </div>

            {/* Rows */}
            <div className="comparison-row grid grid-cols-3 border-b-4 border-foreground hover:bg-muted transition-colors">
              <div className="p-6 font-mono font-bold">Availability</div>
              <div className="p-6 border-l-4 border-foreground">
                <div className="flex items-center gap-2 text-red-600">
                  <X size={20} strokeWidth={3} />
                  <span className="font-mono text-sm">Limited hours</span>
                </div>
              </div>
              <div className="p-6 border-l-4 border-foreground">
                <div className="flex items-center gap-2 text-green-600">
                  <Check size={20} strokeWidth={3} />
                  <span className="font-mono text-sm font-bold">24/7 access</span>
                </div>
              </div>
            </div>

            <div className="comparison-row grid grid-cols-3 border-b-4 border-foreground hover:bg-muted transition-colors">
              <div className="p-6 font-mono font-bold">Response Time</div>
              <div className="p-6 border-l-4 border-foreground">
                <div className="flex items-center gap-2 text-red-600">
                  <X size={20} strokeWidth={3} />
                  <span className="font-mono text-sm">Hours to days</span>
                </div>
              </div>
              <div className="p-6 border-l-4 border-foreground">
                <div className="flex items-center gap-2 text-green-600">
                  <Check size={20} strokeWidth={3} />
                  <span className="font-mono text-sm font-bold">Instant</span>
                </div>
              </div>
            </div>

            <div className="comparison-row grid grid-cols-3 border-b-4 border-foreground hover:bg-muted transition-colors">
              <div className="p-6 font-mono font-bold">Personalization</div>
              <div className="p-6 border-l-4 border-foreground">
                <div className="flex items-center gap-2 text-red-600">
                  <X size={20} strokeWidth={3} />
                  <span className="font-mono text-sm">One size fits all</span>
                </div>
              </div>
              <div className="p-6 border-l-4 border-foreground">
                <div className="flex items-center gap-2 text-green-600">
                  <Check size={20} strokeWidth={3} />
                  <span className="font-mono text-sm font-bold">Fully adaptive</span>
                </div>
              </div>
            </div>

            <div className="comparison-row grid grid-cols-3 border-b-4 border-foreground hover:bg-muted transition-colors">
              <div className="p-6 font-mono font-bold">Question Limit</div>
              <div className="p-6 border-l-4 border-foreground">
                <div className="flex items-center gap-2 text-red-600">
                  <X size={20} strokeWidth={3} />
                  <span className="font-mono text-sm">Time constrained</span>
                </div>
              </div>
              <div className="p-6 border-l-4 border-foreground">
                <div className="flex items-center gap-2 text-green-600">
                  <Check size={20} strokeWidth={3} />
                  <span className="font-mono text-sm font-bold">Unlimited</span>
                </div>
              </div>
            </div>

            <div className="comparison-row grid grid-cols-3 hover:bg-muted transition-colors">
              <div className="p-6 font-mono font-bold">Judgment</div>
              <div className="p-6 border-l-4 border-foreground">
                <div className="flex items-center gap-2 text-red-600">
                  <X size={20} strokeWidth={3} />
                  <span className="font-mono text-sm">Potential anxiety</span>
                </div>
              </div>
              <div className="p-6 border-l-4 border-foreground">
                <div className="flex items-center gap-2 text-green-600">
                  <Check size={20} strokeWidth={3} />
                  <span className="font-mono text-sm font-bold">Zero judgment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 px-4 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <div className="inline-block border-4 border-foreground bg-accent px-6 py-2 mb-6">
              <span className="font-black text-sm tracking-widest text-foreground">THE PROCESS</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              How it works
            </h2>
            <p className="text-xl font-mono opacity-80 max-w-3xl">
              Four simple steps to breakthrough understanding
            </p>
          </div>

          <div ref={howItWorksRef} className="space-y-12 md:space-y-20">
            <div className="workflow-step flex flex-col md:flex-row items-start gap-8">
              <div className="step-number flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-secondary border-4 border-foreground flex items-center justify-center shadow-[6px_6px_0px_hsl(var(--foreground))]">
                <span className="text-3xl md:text-4xl font-black text-foreground">1</span>
              </div>
              <div className="flex-1 border-4 border-foreground bg-background p-8 md:p-10 shadow-[8px_8px_0px_hsl(var(--foreground))]">
                <h3 className="text-2xl md:text-3xl font-black mb-4">Ask Your Question</h3>
                <p className="text-lg font-mono leading-relaxed opacity-90 mb-4">
                  Type your question in natural language. No need for technical precision or formal structure. The system understands intent and context.
                </p>
                <div className="border-l-4 border-secondary pl-4">
                  <p className="font-mono text-sm opacity-70">
                    Example: "I understand loops but not recursion. Can you explain?"
                  </p>
                </div>
              </div>
            </div>

            <div className="workflow-step flex flex-col md:flex-row-reverse items-start gap-8">
              <div className="step-number flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-accent border-4 border-foreground flex items-center justify-center shadow-[6px_6px_0px_hsl(var(--foreground))]">
                <span className="text-3xl md:text-4xl font-black text-foreground">2</span>
              </div>
              <div className="flex-1 border-4 border-foreground bg-background p-8 md:p-10 shadow-[8px_8px_0px_hsl(var(--foreground))]">
                <h3 className="text-2xl md:text-3xl font-black mb-4">Receive Tailored Explanation</h3>
                <p className="text-lg font-mono leading-relaxed opacity-90 mb-4">
                  Get an explanation calibrated to your current understanding. Includes examples, visualizations, and analogies that resonate with your background.
                </p>
                <div className="border-l-4 border-accent pl-4">
                  <p className="font-mono text-sm opacity-70">
                    Adapts complexity, format, and depth based on your level
                  </p>
                </div>
              </div>
            </div>

            <div className="workflow-step flex flex-col md:flex-row items-start gap-8">
              <div className="step-number flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-secondary border-4 border-foreground flex items-center justify-center shadow-[6px_6px_0px_hsl(var(--foreground))]">
                <span className="text-3xl md:text-4xl font-black text-foreground">3</span>
              </div>
              <div className="flex-1 border-4 border-foreground bg-background p-8 md:p-10 shadow-[8px_8px_0px_hsl(var(--foreground))]">
                <h3 className="text-2xl md:text-3xl font-black mb-4">Explore Further</h3>
                <p className="text-lg font-mono leading-relaxed opacity-90 mb-4">
                  Ask follow-up questions, request alternative explanations, or dive deeper into specific aspects. The conversation maintains full context.
                </p>
                <div className="border-l-4 border-secondary pl-4">
                  <p className="font-mono text-sm opacity-70">
                    Unlimited iterations until concept clicks
                  </p>
                </div>
              </div>
            </div>

            <div className="workflow-step flex flex-col md:flex-row-reverse items-start gap-8">
              <div className="step-number flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-accent border-4 border-foreground flex items-center justify-center shadow-[6px_6px_0px_hsl(var(--foreground))]">
                <span className="text-3xl md:text-4xl font-black text-foreground">4</span>
              </div>
              <div className="flex-1 border-4 border-foreground bg-background p-8 md:p-10 shadow-[8px_8px_0px_hsl(var(--foreground))]">
                <h3 className="text-2xl md:text-3xl font-black mb-4">Build Mastery</h3>
                <p className="text-lg font-mono leading-relaxed opacity-90 mb-4">
                  Track your progress, revisit previous concepts, and build on your growing knowledge base. The system remembers your learning journey.
                </p>
                <div className="border-l-4 border-accent pl-4">
                  <p className="font-mono text-sm opacity-70">
                    Complete learning history and progress metrics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 md:py-32 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Why students choose Horizon
            </h2>
          </div>

          <div ref={benefitsRef} className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="benefit-card border-4 border-foreground bg-muted p-6 md:p-8 flex flex-col items-center text-center hover:bg-secondary hover:text-foreground transition-all cursor-pointer group shadow-[6px_6px_0px_hsl(var(--foreground))] hover:shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <Clock className="w-12 h-12 md:w-16 md:h-16 mb-4 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <h3 className="text-xl md:text-2xl font-black mb-3">Always Available</h3>
              <p className="font-mono text-sm opacity-90">
                2 AM or 2 PM. Study sessions never pause for support.
              </p>
            </div>

            <div className="benefit-card border-4 border-foreground bg-muted p-6 md:p-8 flex flex-col items-center text-center hover:bg-accent hover:text-foreground transition-all cursor-pointer group shadow-[6px_6px_0px_hsl(var(--foreground))] hover:shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <Shield className="w-12 h-12 md:w-16 md:h-16 mb-4 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <h3 className="text-xl md:text-2xl font-black mb-3">Judgment Free</h3>
              <p className="font-mono text-sm opacity-90">
                Ask the same question 100 times. Zero embarrassment.
              </p>
            </div>

            <div className="benefit-card border-4 border-foreground bg-muted p-6 md:p-8 flex flex-col items-center text-center hover:bg-secondary hover:text-foreground transition-all cursor-pointer group shadow-[6px_6px_0px_hsl(var(--foreground))] hover:shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <TrendingUp className="w-12 h-12 md:w-16 md:h-16 mb-4 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <h3 className="text-xl md:text-2xl font-black mb-3">Faster Progress</h3>
              <p className="font-mono text-sm opacity-90">
                Maintain momentum. No waiting for answers.
              </p>
            </div>

            <div className="benefit-card border-4 border-foreground bg-muted p-6 md:p-8 flex flex-col items-center text-center hover:bg-accent hover:text-foreground transition-all cursor-pointer group shadow-[6px_6px_0px_hsl(var(--foreground))] hover:shadow-[8px_8px_0px_hsl(var(--foreground))]">
              <Sparkles className="w-12 h-12 md:w-16 md:h-16 mb-4 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <h3 className="text-xl md:text-2xl font-black mb-3">Personalized</h3>
              <p className="font-mono text-sm opacity-90">
                Explanations that match your exact level.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Waitlist />
    </main>
  )
}