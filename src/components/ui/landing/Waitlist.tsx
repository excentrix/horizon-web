'use client'

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CollegeCombobox } from "@/components/ui/CollegeCombobox";
import { joinWaitlist, getReferralSettings } from "@/app/(frontend)/waitlist/actions";
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Waitlist Section
const Waitlist = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    // Check if user already signed up
    const savedEmail = localStorage.getItem('waitlist_email');
    if (savedEmail) {
      setAlreadyJoined(true);
    }

    // Check URL for referral code
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get('ref');
      if (ref) {
        setReferralCode(ref);
      }
    }

    return () => ctx.revert();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('college', college);
    formData.append('name', email.split('@')[0]); // Fallback name
    if (referralCode) {
      formData.append('referralCode', referralCode);
    }

    try {
      const result = await joinWaitlist(null, formData);

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.success && result.user) {
        // Save to localStorage
        localStorage.setItem('waitlist_email', result.user.email);

        // Fire confetti
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FFA500', '#ffffff'],
        });

        // Redirect to dashboard after brief delay
        setTimeout(() => {
          router.push('/wishlist');
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="waitlist"
      ref={sectionRef}
      className="py-24 md:py-32 px-4 bg-foreground text-background relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-10 right-10 w-64 h-64 border-8 border-background opacity-10 rotate-12" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-background opacity-5 -rotate-6" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div ref={formRef} className="text-center">
          {alreadyJoined ? (
            // Already joined state
            <>
              <div className="w-24 h-24 mx-auto mb-6 border-4 border-background bg-accent flex items-center justify-center text-5xl shadow-[4px_4px_0px_hsl(var(--background))]">
                ✓
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-none">
                YOU&apos;RE ALREADY IN!
              </h2>
              <p className="text-xl md:text-2xl font-mono mb-8 max-w-2xl mx-auto">
                You&apos;ve already joined the waitlist. Head to your dashboard to track your progress, earn tokens, and invite friends.
              </p>

              <button
                onClick={() => router.push('/wishlist')}
                className="inline-flex items-center gap-3 h-16 px-12 border-4 border-background bg-accent text-foreground font-black text-lg shadow-[8px_8px_0px_hsl(var(--background))] hover:shadow-[4px_4px_0px_hsl(var(--background))] transition-all active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                GO TO DASHBOARD
                <ArrowRight className="w-6 h-6" />
              </button>
            </>
          ) : (
            // Signup form
            <>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
                READY TO
                <br />
                BREAK FREE?
              </h2>

              <p className="text-xl md:text-2xl font-mono mb-12 max-w-2xl mx-auto">
                Join the waitlist and be among the first to experience learning
                that actually works.
              </p>

              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="w-full flex flex-col gap-4 mb-8">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    disabled={isLoading}
                    className="w-full h-16 px-6 border-4 border-background bg-foreground text-background font-mono text-lg placeholder:text-background placeholder:opacity-50 focus:outline-none focus:ring-4 focus:ring-accent disabled:opacity-50"
                  />

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <CollegeCombobox
                        value={college}
                        onChange={setCollege}
                        placeholder="Select your college"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value)}
                        placeholder="Referral Code (Optional)"
                        disabled={isLoading}
                        className="w-full h-16 px-6 border-4 border-background bg-foreground text-background font-mono text-lg placeholder:text-background placeholder:opacity-50 focus:outline-none focus:ring-4 focus:ring-accent disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="h-16 px-12 border-4 border-background bg-accent text-foreground font-black text-lg shadow-[8px_8px_0px_hsl(var(--background))] hover:shadow-[4px_4px_0px_hsl(var(--background))] transition-all active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "JOINING..." : "JOIN NOW"}
                  </button>
                </div>

                {error && <p className="text-red-500 font-mono mb-4">{error}</p>}

                <p className="font-mono text-sm opacity-70">
                  No spam. No BS. Just updates on launch and early access.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Waitlist;
