import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Hero Section
const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Title characters split animation
      const titleChars = titleRef.current?.textContent?.split("") || [];
      if (titleRef.current) {
        titleRef.current.innerHTML = titleChars
          .map(
            (char) =>
              `<span class="inline-block">${char === " " ? "&nbsp;" : char}</span>`
          )
          .join("");
      }

      tl.fromTo(
        titleRef.current?.children || [],
        {
          y: 100,
          opacity: 0,
          rotationX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          stagger: 0.02,
          duration: 1,
          delay: 0.5,
        }
      )
        .fromTo(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
          },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          {
            scale: 0,
            rotation: -180,
          },
          {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(2)",
          },
          "-=0.3"
        );

      // Scroll indicator animation
      gsap.to(scrollRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "power1.inOut",
      });

      // Parallax background elements
      gsap.to(".hero-bg-1", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 200,
        rotation: 45,
      });

      gsap.to(".hero-bg-2", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -150,
        rotation: -20,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const offset = 0; // Adjust if header is sticky
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12 relative overflow-hidden bg-background"
    >
      {/* Background elements */}
      <div className="hero-bg-1 absolute top-20 right-10 w-64 h-64 border-8 border-accent opacity-20 rotate-12" />
      <div className="hero-bg-2 absolute bottom-20 left-10 w-96 h-96 bg-secondary opacity-30 -rotate-6" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center">
          <h1
            ref={titleRef}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none mb-8"
            style={{ perspective: "1000px" }}
          >
            <span>LEARNING is BROKEN</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-3xl font-mono mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Students{" "}
            <span className="bg-accent px-2 py-1 font-black">don&apos;t fail</span>{" "}
            because they&apos;re lazy.
            <br />
            They fail because{" "}
            <span className="bg-secondary px-2 py-1 font-black">
              the system is rigged.
            </span>
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#waitlist"
              onClick={(e) => handleScroll(e, "#waitlist")}
              className="block w-full sm:w-auto"
            >
              <button className="group relative w-full sm:w-64 h-16 border-4 border-foreground bg-accent font-black text-lg shadow-[8px_8px_0px_hsl(var(--foreground))] hover:shadow-[4px_4px_0px_hsl(var(--foreground))] transition-all active:shadow-none active:translate-x-1 active:translate-y-1">
                JOIN WAITLIST
                <ArrowRight
                  className="inline ml-2 group-hover:translate-x-2 transition-transform"
                  size={20}
                />
              </button>
            </a>

            <a
              href="#problem"
              onClick={(e) => handleScroll(e, "#problem")}
              className="block w-full sm:w-auto"
            >
              <button className="w-full sm:w-64 h-16 border-4 border-foreground bg-background font-bold text-lg shadow-[8px_8px_0px_hsl(var(--foreground))] hover:bg-muted transition-all">
                LEARN MORE
              </button>
            </a>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        onClick={(e) => handleScroll(e, "#problem")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pt-10 cursor-pointer group"
      >
        <span className="font-mono text-xs tracking-widest group-hover:text-accent transition-colors">
          SCROLL
        </span>
        <ChevronDown size={24} className="group-hover:text-accent transition-colors" />
      </div>
    </section>
  );
};

export default Hero;