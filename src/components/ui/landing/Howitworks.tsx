import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// How It Works Section
const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const finalDotRef = useRef<HTMLDivElement>(null);
  const dataStreamRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: "01",
      title: "TELL US YOUR GOALS",
      description:
        "Share what you want to achieve. The AI mentor breaks it down into bite-sized, actionable steps.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
          <circle cx="50" cy="50" r="8" fill="currentColor" />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="20"
            stroke="currentColor"
            strokeWidth="4"
          />
          <line
            x1="50"
            y1="50"
            x2="75"
            y2="50"
            stroke="currentColor"
            strokeWidth="4"
          />
        </svg>
      ),
    },
    {
      number: "02",
      title: "GET PERSONALIZED TASKS",
      description:
        "Receive tailored learning tasks that adapt to your pace, style, and progress in real-time.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M 30 50 L 45 65 L 70 35"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="15"
            y="15"
            width="70"
            height="70"
            rx="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
        </svg>
      ),
    },
    {
      number: "03",
      title: "BUILD & REFLECT",
      description:
        "Create real artifacts, reflect on what you learned, and get instant feedback that matters.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect
            x="20"
            y="40"
            width="25"
            height="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
          <rect
            x="55"
            y="25"
            width="25"
            height="55"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
          <line
            x1="20"
            y1="85"
            x2="80"
            y2="85"
            stroke="currentColor"
            strokeWidth="4"
          />
        </svg>
      ),
    },
    {
      number: "04",
      title: "SHOWCASE GROWTH",
      description:
        "Your progress becomes a living portfolio. Share it with employers, mentors, or just yourself.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polyline
            points="20,80 35,60 50,70 65,40 80,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="15"
            y1="85"
            x2="85"
            y2="85"
            stroke="currentColor"
            strokeWidth="4"
          />
          <line
            x1="15"
            y1="15"
            x2="15"
            y2="85"
            stroke="currentColor"
            strokeWidth="4"
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Timeline progress bar
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          {
            scaleY: 0,
          },
          {
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top center",
              end: "bottom center+=200",
              scrub: 1,
            },
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
          }
        );
      }

      // Intelligent CTA attention system
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "top 85%",
        onEnter: () => {
          // Data stream effect - binary code flowing down
          if (dataStreamRef.current) {
            const streamItems = dataStreamRef.current.children;
            gsap.fromTo(
              streamItems,
              {
                y: -200,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 0.6,
                duration: 1.5,
                stagger: 0.08,
                ease: "power1.inOut",
                onComplete: () => {
                  // Fade out data stream
                  gsap.to(streamItems, {
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.03,
                  });
                },
              }
            );
          }

          // Grid activation - spreading from center
          if (gridRef.current) {
            const gridCells = gridRef.current.children;
            gsap.fromTo(
              gridCells,
              {
                opacity: 0,
                scale: 0.5,
              },
              {
                opacity: 0.15,
                scale: 1,
                duration: 0.8,
                stagger: {
                  from: "center",
                  amount: 0.6,
                },
                ease: "power2.out",
              }
            );
          }

          // Final dot pulses precisely
          const dotTl = gsap.timeline();
          dotTl.to(finalDotRef.current, {
            scale: 1.8,
            duration: 0.3,
            ease: "power2.out",
          });
          dotTl.to(finalDotRef.current, {
            scale: 1,
            duration: 0.4,
            ease: "elastic.out(1, 0.5)",
          });

          // Concentric rings emanate from dot
          const rings = finalDotRef.current?.parentElement?.querySelectorAll('.ring');
          if (rings) {
            gsap.fromTo(
              rings,
              {
                scale: 0.5,
                opacity: 0.8,
              },
              {
                scale: 3,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power2.out",
              }
            );
          }

          // CTA reveals with precision
          const ctaTl = gsap.timeline({ delay: 0.4 });
          
          // Corner brackets draw in
          const brackets = ctaRef.current?.querySelectorAll('.bracket');
          if (brackets) {
            ctaTl.fromTo(
              brackets,
              {
                scale: 0,
                opacity: 0,
              },
              {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                stagger: 0.08,
                ease: "back.out(2)",
              }
            );
          }

          // Main box builds up
          const ctaMain = ctaRef.current?.querySelector('.cta-main');
          if (ctaMain) {
            ctaTl.fromTo(
              ctaMain,
              {
                scaleY: 0,
                opacity: 0,
              },
              {
                scaleY: 1,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
              },
              "-=0.2"
            );
          }

          // Text types in effect
          const textElements = ctaRef.current?.querySelectorAll('.cta-text');
          if (textElements) {
            ctaTl.fromTo(
              textElements,
              {
                opacity: 0,
                x: -20,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.4,
                stagger: 0.15,
                ease: "power2.out",
              }
            );
          }

          // Subtle breathing animation
          gsap.to(ctaRef.current, {
            scale: 1.02,
            duration: 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 2,
          });

          // Status indicators blink in sequence
          const indicators = ctaRef.current?.querySelectorAll('.status-indicator');
          if (indicators) {
            gsap.to(indicators, {
              opacity: 1,
              duration: 0.3,
              stagger: 0.2,
              repeat: -1,
              repeatDelay: 3,
              ease: "power1.inOut",
            });
          }
        },
      });

      // Steps animation
      stepsRef.current.forEach((step, index) => {
        if (!step) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        // Step reveal
        tl.fromTo(
          step,
          {
            x: index % 2 === 0 ? -200 : 200,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          }
        );

        // Icon animation
        const iconContainer = step.querySelector(".icon-container");
        tl.fromTo(
          iconContainer,
          {
            scale: 0,
            rotation: 180,
          },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        );

        // SVG path drawing
        const paths = step.querySelectorAll(
          "path, line, polyline, circle, rect"
        );
        paths.forEach((path) => {
          const length = (path as SVGGeometryElement).getTotalLength?.() || 0;
          if (length > 0) {
            tl.fromTo(
              path,
              {
                strokeDasharray: length,
                strokeDashoffset: length,
              },
              {
                strokeDashoffset: 0,
                duration: 1,
                ease: "power2.inOut",
              },
              "-=0.4"
            );
          }
        });

        // Hover effect
        const onMouseEnter = () => {
          gsap.to(iconContainer, {
            scale: 1.15,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const onMouseLeave = () => {
          gsap.to(iconContainer, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        step.addEventListener("mouseenter", onMouseEnter);
        step.addEventListener("mouseleave", onMouseLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how"
      ref={sectionRef}
      className="py-24 md:py-32 px-4 bg-muted relative overflow-hidden"
    >
      {/* Diagonal stripes background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 2px, transparent 2px, transparent 40px)",
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-20 md:mb-32 text-center">
          <p className="font-mono text-sm mb-4 tracking-widest">SECTION_03</p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6">
            HOW IT
            <br />
            WORKS
          </h2>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-1 w-20 bg-secondary" />
            <p className="text-xl md:text-2xl font-mono">
              Simple flow. Powerful results.
            </p>
            <div className="h-1 w-20 bg-secondary" />
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Central timeline line - extends to CTA */}
          <div
            className="hidden md:block absolute left-1/2 top-0 w-1 bg-foreground opacity-20 -translate-x-1/2"
            style={{ height: "calc(100% + 280px)" }}
          />

          {/* Progress indicator - extends to CTA */}
          <div
            ref={progressRef}
            className="hidden md:block absolute left-1/2 top-0 w-1 bg-accent -translate-x-1/2 origin-top"
            style={{ height: "calc(100% + 280px)" }}
          />

          {/* Steps */}
          <div className="space-y-24 md:space-y-32">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) stepsRef.current[index] = el;
                }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content box */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0
                      ? "md:text-right md:pr-12"
                      : "md:text-left md:pl-12"
                  }`}
                >
                  <div className="inline-block bg-background border-4 border-foreground p-8 md:p-10 shadow-[8px_8px_0px_hsl(var(--foreground))] max-w-md">
                    <div className="font-mono text-sm text-accent mb-2 tracking-widest">
                      STEP {step.number}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black mb-4">
                      {step.title}
                    </h3>
                    <p className="font-mono text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Icon (center on timeline) */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="icon-container w-28 h-28 md:w-32 md:h-32 bg-accent border-4 border-foreground flex items-center justify-center p-6 shadow-[8px_8px_0px_hsl(var(--foreground))]">
                    <div className="text-background w-full h-full">
                      {step.icon}
                    </div>
                  </div>

                  {/* Connector dots */}
                  <div
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-1 bg-foreground ${
                      index % 2 === 0 ? "right-full" : "left-full"
                    }`}
                  >
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-accent border-2 border-foreground rounded-full ${
                        index % 2 === 0 ? "-right-1" : "-left-1"
                      }`}
                    />
                  </div>
                </div>

                {/* Spacer for layout balance */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA - connected to timeline */}
        <div className="mt-32 text-center relative">
          {/* Data stream - binary code flowing down */}
          <div
            ref={dataStreamRef}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 -top-52 pointer-events-none font-mono text-xs text-accent opacity-0"
          >
            {['01001100', '01000101', '01000001', '01010010', '01001110'].map((binary, i) => (
              <div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                style={{ top: `${i * 40}px` }}
              >
                {binary}
              </div>
            ))}
          </div>

          {/* Technical grid that activates */}
          <div
            ref={gridRef}
            className="absolute -inset-20 pointer-events-none"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gridTemplateRows: 'repeat(6, 1fr)',
              gap: '1px',
            }}
          >
            {[...Array(48)].map((_, i) => (
              <div
                key={i}
                className="border border-foreground opacity-0"
              />
            ))}
          </div>

          {/* Final connection dot with concentric rings */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 -top-20 z-20">
            <div
              ref={finalDotRef}
              className="w-6 h-6 bg-accent border-4 border-foreground rounded-full relative z-10"
            />
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="ring absolute inset-0 w-6 h-6 border-2 border-accent rounded-full opacity-0"
              />
            ))}
          </div>

          <div ref={ctaRef} className="inline-block relative">
            {/* Corner brackets with technical precision */}
            <div className="bracket absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-accent opacity-0" />
            <div className="bracket absolute -top-4 -right-4 w-8 h-8 border-t-4 border-r-4 border-accent opacity-0" />
            <div className="bracket absolute -bottom-4 -left-4 w-8 h-8 border-b-4 border-l-4 border-accent opacity-0" />
            <div className="bracket absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-accent opacity-0" />

            {/* Status indicators */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              <div className="status-indicator w-2 h-2 bg-accent rounded-full opacity-0" />
              <div className="status-indicator w-2 h-2 bg-accent rounded-full opacity-0" />
              <div className="status-indicator w-2 h-2 bg-accent rounded-full opacity-0" />
            </div>

            <div className="cta-main border-4 border-foreground bg-background p-2 relative overflow-hidden shadow-[8px_8px_0px_hsl(var(--foreground))] opacity-0">
              <div className="border-4 border-foreground bg-accent px-12 py-6 relative">
                <div className="cta-text font-black text-2xl md:text-3xl mb-2 relative z-10 opacity-0">
                  READY TO BEGIN?
                </div>
                <div className="cta-text flex items-center justify-center gap-3 relative z-10 opacity-0">
                  <div className="w-2 h-2 bg-foreground" />
                  <div className="font-mono text-sm tracking-widest">
                    INITIALIZE_LEARNING
                  </div>
                  <div className="w-2 h-2 bg-foreground" />
                </div>

                {/* Subtle tech pattern overlay */}
                <div className="absolute inset-0 opacity-5">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 4px)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
