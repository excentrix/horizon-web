import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Problem Section
const Problem = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const painPointsRef = useRef<(HTMLDivElement | null)[]>([]);

  const stats = [
    {
      number: "73%",
      label: "Drop out or switch careers",
      sublabel: "Within first 2 years",
    },
    {
      number: "45%",
      label: "Feel unprepared",
      sublabel: "For real-world work",
    },
    {
      number: "2.1x",
      label: "Higher anxiety",
      sublabel: "Than previous generation",
    },
  ];

  const painPoints = [
    {
      title: "GENERIC CONTENT",
      desc: "One-size-fits-all lectures that ignore your actual needs and learning style.",
    },
    {
      title: "ZERO ACCOUNTABILITY",
      desc: "No one checks if you're actually learning or just cramming for exams.",
    },
    {
      title: "SURFACE METRICS",
      desc: "Grades that measure memorization, not real skill or understanding.",
    },
    {
      title: "ISOLATED LEARNING",
      desc: "Stuck in your own bubble with no real peer support or mentorship.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
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

      // Stats counter animation
      statsRef.current.forEach((stat, index) => {
        if (!stat) return;

        const numberEl = stat.querySelector(".stat-number");
        if (!numberEl) return;

        const endValue = numberEl.textContent || "0";
        const numericValue = parseFloat(endValue.replace(/[^0-9.]/g, ""));
        
        const suffix = endValue.includes("%")
          ? "%"
          : endValue.includes("x")
          ? "x"
          : "";

        // Create timeline for this stat
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Set initial state and animate card appearance
        tl.fromTo(
          stat,
          {
            scale: 0,
            rotation: 180,
            opacity: 0,
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "back.out(2)",
          }
        );

        // Animate number counting (starts right after card animation begins)
        const counterObj = { value: 0 };
        tl.to(
          counterObj,
          {
            value: numericValue,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: function () {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const currentValue = (this.targets()[0] as any).value;
              if (suffix === "x") {
                numberEl.textContent = currentValue.toFixed(1) + suffix;
              } else {
                numberEl.textContent = Math.round(currentValue) + suffix;
              }
            },
          },
          "-=0.5" // Start 0.5s before the card animation finishes
        );
      });

      // Pain points reveal with glitch effect
      painPointsRef.current.forEach((point, index) => {
        if (!point) return;

        gsap.from(point, {
          scrollTrigger: {
            trigger: point,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
        });

        // Glitch on hover
        point.addEventListener("mouseenter", () => {
          const tl = gsap.timeline();
          tl.to(point, { x: -5, duration: 0.05 })
            .to(point, { x: 5, duration: 0.05 })
            .to(point, { x: 0, duration: 0.05 });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="py-24 md:py-32 px-4 bg-muted relative overflow-hidden"
    >
      {/* Minimal grid background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 40px)",
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-20 md:mb-32">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-2 h-24 bg-accent" />
            <div>
              <p className="font-mono text-sm mb-4 tracking-widest">
                SECTION_01
              </p>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6">
                THE
                <br />
                PROBLEM
              </h2>
              <p className="text-xl md:text-2xl font-mono max-w-2xl border-l-4 border-accent pl-6">
                Traditional education is failing students at an alarming rate.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 md:mb-32">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) statsRef.current[index] = el;
              }}
              className="border-4 border-foreground bg-background p-8 shadow-[8px_8px_0px_hsl(var(--foreground))] hover:shadow-[12px_12px_0px_hsl(var(--foreground))] transition-all cursor-pointer"
            >
              <div className="stat-number text-5xl md:text-6xl font-black mb-2 text-accent">
                {stat.number}
              </div>
              <div className="text-lg font-black mb-1">{stat.label}</div>
              <div className="font-mono text-sm opacity-60">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

        {/* Pain Points */}
        <div>
          <h3 className="text-3xl md:text-4xl font-black mb-8 flex items-center gap-4">
            <div className="w-12 h-1 bg-foreground" />
            WHY THIS HAPPENS
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {painPoints.map((point, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) painPointsRef.current[index] = el;
                }}
                className="border-4 border-foreground bg-background p-6 md:p-8 relative overflow-hidden group cursor-pointer"
              >
                {/* Hover accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

                <h4 className="text-xl md:text-2xl font-black mb-3">
                  {point.title}
                </h4>
                <p className="font-mono text-sm md:text-base leading-relaxed">
                  {point.desc}
                </p>

                {/* Corner marker */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-l-4 border-t-4 border-foreground" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
