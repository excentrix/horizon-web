import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Solutions Section
const Solutions = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);

  const solutions = [
    {
      number: "01",
      title: "AI MENTOR",
      subtitle: "NOT A CHATBOT",
      description:
        "Proactive partner that actually gives a damn about your progress.",
      features: [
        "Simplifies goals → actionable plans",
        "Tracks progress & kills slip-ups",
        "Builds lasting habits (no BS)",
      ],
      accent: "secondary",
    },
    {
      number: "02",
      title: "PERSONALIZED",
      subtitle: "LEARNING PATH",
      description:
        "No content dumps. No fluff. Just what YOU need, when you need it.",
      features: [
        "Tailored tasks with reasoning",
        "Adapts after every attempt",
        "Industry-aligned practices",
      ],
      accent: "accent",
    },
    {
      number: "03",
      title: "HOLISTIC",
      subtitle: "GRADING",
      description:
        "Show growth, not just grades. Build a portfolio that proves your worth.",
      features: [
        "Timestamped artifacts & reflections",
        "Insights for mentors & employers",
        "Shareable outcome snapshot",
      ],
      accent: "secondary",
    },
    {
      number: "04",
      title: "REAL",
      subtitle: "COMMUNITY",
      description:
        "Peer learning > solo gamification. Connect with people who get it.",
      features: [
        "Safe circles for challenges",
        "Connect with alumni & experts",
        "Support when you need it",
      ],
      accent: "accent",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        rotation: -5,
        duration: 1,
        ease: "power3.out",
      });

      // Card animations
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const isEven = index % 2 === 0;

        // Main card reveal
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
          x: isEven ? -100 : 100,
          y: 50,
          opacity: 0,
          rotation: isEven ? -8 : 8,
          duration: 1.2,
          ease: "power4.out",
        });

        // Number reveal
        const number = card.querySelector(".solution-number");
        gsap.from(number, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          scale: 0,
          rotation: 180,
          duration: 0.8,
          delay: 0.3,
          ease: "back.out(2)",
        });

        // Features stagger
        const features = card.querySelectorAll(".feature-item");
        gsap.from(features, {
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
          },
          x: -30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.6,
          delay: 0.5,
          ease: "power2.out",
        });

        // Accent bar
        const accentBar = card.querySelector(".accent-bar");
        gsap.from(accentBar, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.8,
          delay: 0.4,
          ease: "power3.inOut",
        });

        // Hover micro-interaction
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Footer animation
      gsap.from(footerRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="solution"
      ref={sectionRef}
      className="py-24 md:py-32 px-4 bg-muted relative overflow-hidden"
    >
      {/* Minimal background elements */}
      <div className="absolute top-20 right-0 w-px h-full bg-foreground opacity-10" />
      <div className="absolute top-0 left-1/4 w-px h-full bg-foreground opacity-10" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-foreground opacity-10" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-20 md:mb-32">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-2 h-24 bg-foreground" />
            <div>
              <p className="font-mono text-sm mb-4 tracking-widest">
                SECTION_02
              </p>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6">
                HOW WE
                <br />
                FIX THIS
              </h2>
              <p className="text-xl md:text-2xl font-mono max-w-2xl border-l-4 border-foreground pl-6">
                Four pillars. Zero bullshit.
                <br />
                Built for students who want results.
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-16 md:space-y-24">
          {solutions.map((solution, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className={`relative ${
                index % 2 === 0 ? "md:mr-12" : "md:ml-12"
              }`}
            >
              <div className="border-4 border-foreground bg-background p-8 md:p-12 shadow-[12px_12px_0px_hsl(var(--foreground))] relative transition-shadow duration-300 hover:shadow-[16px_16px_0px_hsl(var(--foreground))]">
                {/* Large number - background */}
                <div className="solution-number absolute top-0 right-0 text-[200px] md:text-[300px] font-black leading-none opacity-5 select-none pointer-events-none">
                  {solution.number}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Header section */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="text-6xl md:text-8xl font-black tracking-tighter">
                        {solution.number}
                      </span>
                      <div>
                        <h3 className="text-3xl md:text-5xl font-black leading-none mb-1">
                          {solution.title}
                        </h3>
                        <p className="text-xl md:text-2xl font-black opacity-50">
                          {solution.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Accent bar */}
                    <div
                      className={`accent-bar h-2 bg-${solution.accent} w-32`}
                    />
                  </div>

                  {/* Description */}
                  <p className="text-lg md:text-xl font-mono mb-8 max-w-2xl leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-4">
                    {solution.features.map((feature, i) => (
                      <div
                        key={i}
                        className="feature-item flex items-start gap-4"
                      >
                        <div className="w-1 h-1 bg-foreground mt-3 flex-shrink-0" />
                        <p className="text-base md:text-lg font-mono">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Corner accent */}
                <div
                  className={`absolute bottom-0 right-0 w-16 h-16 bg-${solution.accent} border-4 border-foreground`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div ref={footerRef} className="mt-24 md:mt-32">
          <div className="border-4 border-foreground bg-foreground text-background p-8 md:p-12">
            <p className="font-mono text-xs md:text-sm mb-4 tracking-widest opacity-70">
              TECH_STACK
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div>
                <p className="font-black text-lg mb-1">WEB + WHATSAPP</p>
                <p className="font-mono text-xs opacity-70">
                  Platform agnostic
                </p>
              </div>
              <div>
                <p className="font-black text-lg mb-1">MULTILINGUAL</p>
                <p className="font-mono text-xs opacity-70">
                  Your language, your way
                </p>
              </div>
              <div>
                <p className="font-black text-lg mb-1">PRIVACY-FIRST</p>
                <p className="font-mono text-xs opacity-70">
                  Your data stays yours
                </p>
              </div>
              <div>
                <p className="font-black text-lg mb-1">RED-FLAG DETECT</p>
                <p className="font-mono text-xs opacity-70">
                  Mental health matters
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
