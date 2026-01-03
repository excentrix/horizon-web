'use client'

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SocialProof = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const testimonials = [
    {
      name: "Rahul K.",
      college: "IIT Bombay",
      message: "Finally something that understands I don't want to watch 10h lectures. The AI mentor is legit.",
      time: "10:42 AM",
    },
    {
      name: "Priya S.",
      college: "VIT Vellore",
      message: "The holistic grading helped me land my internship. They looked at my projects, not just CGPA.",
      time: "2:15 PM",
    },
    {
      name: "Arjun M.",
      college: "SRM University",
      message: "Community challenges are addictive. Learned more in 2 weeks than last semester.",
      time: "9:30 AM",
    },
    {
      name: "Sneha R.",
      college: "BITS Pilani",
      message: "Excentrix actually makes engineering fun again. Wish I had this in first year.",
      time: "4:20 PM",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.7)",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 bg-background relative overflow-hidden border-t-4 border-foreground"
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            DON&apos;T JUST TAKE
            <br />
            <span className="bg-accent px-2">OUR WORD</span> FOR IT
          </h2>
          <p className="text-xl font-mono text-muted-foreground">
            Join hundreds of students already transforming their careers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="bg-card border-2 border-foreground p-4 rounded-lg shadow-[4px_4px_0px_hsl(var(--foreground))] relative"
            >
              {/* WhatsApp style header */}
              <div className="flex items-center gap-3 mb-3 border-b border-border pb-2">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center font-bold text-xs">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm leading-none">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground">{t.college}</p>
                </div>
                <MessageCircle className="ml-auto w-4 h-4 text-green-500" />
              </div>

              {/* Message body */}
              <div className="bg-muted/50 p-3 rounded-md mb-2 relative">
                <p className="text-sm leading-relaxed">{t.message}</p>
                {/* Tail */}
                <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-muted/50 border-l-[10px] border-l-transparent" />
              </div>

              {/* Time */}
              <div className="text-right">
                <span className="text-[10px] text-muted-foreground">{t.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
