const exchange = [
  {
    role: 'velo',
    text: 'Your README says the rate limiter is “token bucket”. Walk me through what happens when two requests arrive in the same millisecond on different servers.',
  },
  {
    role: 'you',
    text: 'Each server has its own bucket in memory, so they’d both be allowed — the limit is per-instance, not global.',
  },
  {
    role: 'velo',
    text: 'So the limit you advertise as “100/min” isn’t actually enforced globally. What would you change to make it global, and what’s the cost?',
  },
  {
    role: 'you',
    text: 'Move the counter to Redis with an atomic INCR + expiry. Cost is a network hop per request and a Redis dependency on the hot path.',
  },
  {
    role: 'velo',
    text: 'Good — that’s a real answer, not a memorised one. Moving on.',
    verdict: true,
  },
]

export function VeloTranscript() {
  return (
    <section className="bg-background py-28 md:py-36">
      <div className="container max-w-4xl">
        <p className="eyebrow mb-6 flex items-center gap-2.5">
          <span className="eyebrow-dot" />
          what an interrogation looks like
        </p>
        <h2 className="mb-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
          You can’t pre-write your way through it.
        </h2>
        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Every question adapts to your last answer. Vague replies get probed harder. This is a real
          exchange about a side project’s rate limiter.
        </p>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border bg-cream/40 px-5 py-3">
            <span className="size-2.5 rounded-full bg-energy/70" />
            <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              live verification · session #4127
            </span>
          </div>
          <div className="flex flex-col gap-5 p-6 md:p-8">
            {exchange.map((m, i) => (
              <div
                key={i}
                className={m.role === 'velo' ? 'max-w-[85%]' : 'max-w-[85%] self-end'}
              >
                <p
                  className={
                    'mb-1.5 font-mono text-[10px] uppercase tracking-wide ' +
                    (m.role === 'velo' ? 'text-indigo' : 'text-energy')
                  }
                >
                  {m.role === 'velo' ? 'VELO' : 'Candidate'}
                </p>
                <div
                  className={
                    'rounded-2xl px-4 py-3 text-sm leading-relaxed ' +
                    (m.role === 'velo'
                      ? 'bg-muted text-ink'
                      : 'bg-indigo text-[hsl(42_71%_96%)]')
                  }
                >
                  {m.text}
                </div>
                {m.verdict && (
                  <p className="mt-2 font-mono text-xs text-muted-foreground">
                    ✓ Defended · contributes to a verified proof-of-work credential
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
