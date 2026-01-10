'use client'

import React, { useEffect, useRef } from "react";
import Link from 'next/link'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Linkedin,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";


gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lineBlocks = titleRef.current?.querySelectorAll('.line-block');

      if (lineBlocks && lineBlocks.length > 0) {
        lineBlocks.forEach(line => {
          const chars = line.textContent?.split("") || [];
          line.innerHTML = chars
            .map(
              (char) =>
                `<span class="char inline-block">${char === " " ? "&nbsp;" : char}</span>`
            )
            .join("");
        });
      }

      gsap.fromTo(
        titleRef.current?.querySelectorAll('.char') || [],
        {
          y: 80,
          opacity: 0,
          rotationX: -80,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          stagger: 0.02,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        metaRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.6,
          ease: "power3.out",
        }
      );

      statsRef.current.forEach((stat, index) => {
        if (!stat) return;
        gsap.fromTo(
          stat,
          {
            scale: 0,
            rotation: index % 2 === 0 ? -10 : 10,
            opacity: 0,
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.8 + index * 0.1,
            ease: "back.out(2)",
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-32 md:pt-40 pb-20 md:pb-28 px-4 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 60px)",
          }}
        />
        <div className="absolute -left-10 top-10 w-32 h-32 bg-secondary border-4 border-foreground rotate-3 shadow-[12px_12px_0px_hsl(var(--foreground))]" />
        <div className="absolute -right-16 bottom-10 w-48 h-48 bg-accent border-4 border-foreground -rotate-6 shadow-[12px_12px_0px_hsl(var(--foreground))]" />
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap items-center gap-4 text-sm font-mono">
            <span className="px-3 py-1 border-2 border-foreground bg-secondary shadow-harsh">
              ABOUT_US
            </span>
            <span className="px-3 py-1 border-2 border-foreground bg-background shadow-harsh">
              INSIDE THE HORIZON TRIBE
            </span>
          </div>

          <div className="max-w-5xl">
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight"
            >
              <span className="line-block block whitespace-nowrap">Building the most</span>
              <span className="line-block block whitespace-nowrap">human learning</span>
              <span className="line-block block whitespace-nowrap">OS on Earth.</span>
            </h1>
          </div>

          <div ref={metaRef} className="space-y-6 max-w-3xl">
            <p className="text-lg md:text-xl leading-relaxed">
              We started Horizon after living the gaps in education ourselves.
              The plan: blend high-agency communities, brutal accountability,
              and science-backed learning so people actually grow.
            </p>
            <div className="flex flex-wrap gap-3 font-mono text-sm">
              <span className="px-3 py-2 border-2 border-foreground bg-muted shadow-harsh">
                REMOTE-FIRST
              </span>
              <span className="px-3 py-2 border-2 border-foreground bg-secondary shadow-harsh">
                BUILT BY EDU + PRODUCT PEOPLE
              </span>
              <span className="px-3 py-2 border-2 border-foreground bg-background shadow-harsh">
                LEARNERS OVER LECTURES
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-2">
            {[
              { label: "FOUNDED", value: "2025" },
              { label: "TRIBE", value: "4 BUILDERS" },
              { label: "LEARNERS SUPPORTED", value: "2,400+" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                ref={(el) => { if (el) statsRef.current[index] = el }}
                className="p-6 border-4 border-foreground bg-card shadow-[10px_10px_0px_hsl(var(--foreground))]"
              >
                <p className="font-mono text-xs tracking-widest mb-2">
                  {stat.label}
                </p>
                <p className="text-3xl font-black">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Story = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            y: 80,
            opacity: 0,
            rotation: index % 2 === 0 ? -4 : 4,
          },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.9,
            ease: "power3.out",
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    {
      title: "WE FELT THE FRACTURE",
      copy: "We were the students who excelled on paper but felt unready in the real world. Horizon is our answer to the gap between memorization and mastery.",
      tag: "ORIGIN",
    },
    {
      title: "COMMUNITY AS CODE",
      copy: "Our product is equal parts technology and ritual. Daily check-ins, live build sessions, and peer review loops keep momentum raw and real.",
      tag: "CADENCE",
    },
    {
      title: "DATA WITH A SOUL",
      copy: "We instrument progress but never reduce people to dashboards. Reflection prompts, mentor notes, and artifacts capture the story behind the metrics.",
      tag: "PRINCIPLE",
    },
  ];

  return (
    <section
      id="story"
      ref={sectionRef}
      className="py-24 md:py-32 px-4 bg-muted relative overflow-hidden border-y-4 border-foreground"
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 50px)",
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 space-y-12">
        <div className="flex items-start gap-4">
          <div className="w-2 h-24 bg-accent" />
          <div>
            <p className="font-mono text-sm mb-3 tracking-widest">SECTION_01</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-none mb-4">
              WHY WE EXIST
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed">
              Education should feel like shipping real work, not passing tests.
              We build experiences that force practice, reflection, and
              community accountability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              ref={(el) => { if (el) cardsRef.current[index] = el }}
              className="p-6 border-4 border-foreground bg-card shadow-[10px_10px_0px_hsl(var(--foreground))] flex flex-col gap-4"
            >
              <span className="px-3 py-1 border-2 border-foreground bg-secondary font-mono text-xs shadow-harsh">
                {item.tag}
              </span>
              <h3 className="text-2xl font-black leading-tight">
                {item.title}
              </h3>
              <p className="text-base leading-relaxed">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Mission = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pillarsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      pillarsRef.current.forEach((pillar) => {
        if (!pillar) return;
        gsap.fromTo(
          pillar,
          {
            x: -40,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: pillar,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: <Zap size={22} />,
      title: "HIGH-TENSION LEARNING",
      desc: "Live build weeks, anti-fluff prompts, and real deliverables. The work is loud and public on purpose.",
    },
    {
      icon: <Sparkles size={22} />,
      title: "HUMAN SUPPORT LOOPS",
      desc: "Mentors, peer squads, and async feedback that focuses on signal, not spam. No one moves alone.",
    },
    {
      icon: <Target size={22} />,
      title: "OUTCOME-FIRST METRICS",
      desc: "Shipping velocity, reflective depth, and readiness scores replace grades. We care about what sticks.",
    },
  ];

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="py-24 md:py-32 px-4 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-24 h-24 bg-secondary border-4 border-foreground rotate-6 shadow-[10px_10px_0px_hsl(var(--foreground))]" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent border-4 border-foreground -rotate-3 shadow-[10px_10px_0px_hsl(var(--foreground))]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 space-y-12">
        <div className="flex items-start gap-4">
          <div className="w-2 h-24 bg-secondary" />
          <div>
            <p className="font-mono text-sm mb-3 tracking-widest">SECTION_02</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-none mb-4">
              HOW WE OPERATE
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed">
              A brutalist stack for learning that keeps momentum high and
              quality higher.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              ref={(el) => { if (el) pillarsRef.current[index] = el }}
              className="p-6 border-4 border-foreground bg-muted shadow-[10px_10px_0px_hsl(var(--foreground))] space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 border-2 border-foreground bg-background flex items-center justify-center shadow-harsh">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-black">{pillar.title}</h3>
              </div>
              <p className="text-base leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Founders = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            y: 60,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const founders = [
    {
      name: "Siddharth Karthikeyan",
      role: "Co-founder / CEO",
      background:
        "Obsessed with how tech, design, and community come together. Strategic force turning ambiguity into action, driving momentum, and defining the roadmap. ",
      linkedin: "https://www.linkedin.com/in/sid-karthik",
      focus: "Vision, product strategy, operations",
    },
    {
      name: "Siri TC",
      role: "Co-founder / COO",
      background:
        "Creative strategist building the brand, driving hands-on execution, and keeping the engine moving forward. Translating identity into momentum and growth.",
      linkedin: "https://www.linkedin.com/in/siri-tc",
      focus: "Marketing, branding, growth",
    },
    {
      name: "Bhargav P Raj",
      role: "Co-founder / CTO",
      background:
        "Relentless tech mind shaping systems, solving chaos, and building what’s next. Leading the technical architecture and R&D for AI systems.",
      linkedin: "https://www.linkedin.com/in/bhargav-p-raj",
      focus: "Technology, AI engineering, product development",
    },
  ];

  return (
    <section
      id="founders"
      ref={sectionRef}
      className="py-24 md:py-32 px-4 bg-muted relative overflow-hidden border-y-4 border-foreground"
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 40px)",
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 space-y-12">
        <div className="flex items-start gap-4">
          <div className="w-2 h-24 bg-foreground" />
          <div>
            <p className="font-mono text-sm mb-3 tracking-widest">SECTION_03</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-none mb-4">
              MEET THE FOUNDERS
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed">
              A crew of builders who have shipped products, taught live, and
              coached thousands.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              ref={(el) => { if (el) cardsRef.current[index] = el }}
              className="p-6 border-4 border-foreground bg-card shadow-[10px_10px_0px_hsl(var(--foreground))] flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-mono tracking-widest text-muted-foreground uppercase">
                    {founder.role}
                  </p>
                  <h3 className="text-2xl font-black uppercase leading-tight">
                    {founder.name}
                  </h3>
                </div>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 border-2 border-foreground bg-secondary flex items-center justify-center shadow-harsh hover:-translate-y-1 transition-transform shrink-0"
                  aria-label={`LinkedIn profile for ${founder.name}`}
                >
                  <Linkedin size={20} />
                </a>
              </div>
              <p className="text-base leading-relaxed">{founder.background}</p>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-2 py-1 border-2 border-foreground bg-muted shadow-harsh uppercase">
                  FOCUS
                </span>
                <span className="uppercase">{founder.focus}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-card",
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-24 px-4 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="contact-card border-4 border-foreground bg-secondary shadow-[12px_12px_0px_hsl(var(--foreground))] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-mono text-sm tracking-widest mb-2">SECTION_04</p>
            <h3 className="text-3xl md:text-4xl font-black leading-tight mb-3">
              Want to jam with us?
            </h3>
            <p className="text-lg max-w-2xl">
              Drop us a line for partnerships, press, or if you want to build
              the future of learning with us.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-4 border-4 border-foreground bg-background font-black text-lg shadow-[8px_8px_0px_hsl(var(--foreground))] hover:shadow-[4px_4px_0px_hsl(var(--foreground))] transition-all text-center"
            >
              BACK TO PRODUCT
            </Link>
            <Link
              href="#founders"
              className="w-full sm:w-auto px-6 py-4 border-4 border-foreground bg-foreground text-background font-black text-lg shadow-[8px_8px_0px_hsl(var(--foreground))] hover:shadow-[4px_4px_0px_hsl(var(--foreground))] transition-all flex items-center justify-center gap-2"
            >
              MEET US <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="pt-20">
        <Hero />
        <Story />
        <Mission />
        <Founders />
        <Contact />

      </main>
    </div>
  );
};

export default About;
