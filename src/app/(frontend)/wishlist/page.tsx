'use client'

import React, { useEffect, useState } from 'react'
import { getReferralSettings, getWaitlistStatus, completeTask } from '@/app/(frontend)/waitlist/actions'
import { Waitlist, ReferralSetting } from '@/payload-types'
import { useRouter } from 'next/navigation'
import { Loader2, Check, Trophy, Zap, Users, Star, Copy } from 'lucide-react'
import { Media } from '@/components/Media'
import confetti from 'canvas-confetti'
import { cn } from '@/utilities/ui'

const BRAND_CONFETTI = ['#EC5B13', '#5858CC', '#FAEDCD']

export default function WishlistDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<Waitlist | null>(null)
  const [settings, setSettings] = useState<ReferralSetting | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [completingTask, setCompletingTask] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      const email = localStorage.getItem('waitlist_email')
      if (!email) {
        router.push('/')
        return
      }

      const [statusRes, settingsRes] = await Promise.all([getWaitlistStatus(email), getReferralSettings()])

      if (statusRes.success && statusRes.user) {
        setUser(statusRes.user as unknown as Waitlist)
      } else {
        router.push('/')
      }
      setSettings(settingsRes as unknown as ReferralSetting)
      setIsLoading(false)
    }

    init()
  }, [router])

  const copyToClipboard = () => {
    if (!user?.referralCode) return

    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const textToCopy = `${origin}?ref=${user.referralCode}`

    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
          confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.7 },
            colors: BRAND_CONFETTI,
          })
        })
        .catch(() => {
          // Fallback if clipboard API fails
          fallbackCopy(textToCopy)
        })
    } else {
      // Fallback for older browsers
      fallbackCopy(textToCopy)
    }
  }

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      document.execCommand('copy')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: BRAND_CONFETTI,
      })
    } catch (err) {
      console.error('Fallback copy failed:', err)
      alert('Could not copy to clipboard. Please copy manually: ' + text)
    }

    textArea.remove()
  }

  const handleTaskCompletion = async (taskSlug: string, link?: string | null) => {
    if (completingTask) return
    setCompletingTask(taskSlug)

    // If a link is provided, open it immediately in a new tab
    if (link) {
      window.open(link, '_blank')
    }

    // Simulate verification delay for effect
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const res = await completeTask(user?.email || '', taskSlug)

    if (res.success) {
      // Update local state
      setUser((prev) => {
        if (!prev) return null
        return {
          ...prev,
          tokens: res.tokens,
          completedTasks: [
            ...(prev.completedTasks || []),
            { taskSlug, completedAt: new Date().toISOString() },
          ],
        }
      })

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: BRAND_CONFETTI,
      })
    }

    setCompletingTask(null)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-indigo" />
      </div>
    )
  }

  // Token-based milestones (sorted by tokens required)
  const milestones =
    settings?.milestones?.sort(
      (a: { tokensRequired: number }, b: { tokensRequired: number }) => a.tokensRequired - b.tokensRequired,
    ) || []
  const nextMilestone = milestones.find((m: { tokensRequired: number }) => m.tokensRequired > (user?.tokens || 0))
  const progress = nextMilestone ? ((user?.tokens || 0) / nextMilestone.tokensRequired) * 100 : 100

  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const referralLink = `${origin}?ref=${user?.referralCode}`

  return (
    <main className="min-h-svh bg-background px-0 pb-20 pt-28 md:pt-36">
      <div className="container max-w-5xl">
        {/* Heading */}
        <div className="mb-12">
          <p className="eyebrow mb-4 flex items-center gap-2.5">
            <span className="eyebrow-dot" />
            waitlist dashboard
          </p>
          <h1 className="display-md">
            Welcome back{user?.name ? `, ${user.name}` : ''}.
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Earn tokens, climb the queue and unlock launch rewards.
          </p>
        </div>

        {/* Header Stats */}
        <div className="mb-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 flex items-center gap-2.5">
              <Trophy className="size-4 text-energy" />
              <h2 className="eyebrow">Total tokens</h2>
            </div>
            <p className="font-display text-5xl font-semibold tracking-tight text-ink">{user?.tokens || 0}</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 flex items-center gap-2.5">
              <Users className="size-4 text-indigo" />
              <h2 className="eyebrow">Referrals</h2>
            </div>
            <p className="font-display text-5xl font-semibold tracking-tight text-ink">{user?.referralCount || 0}</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 flex items-center gap-2.5">
              <Star className="size-4 text-energy" />
              <h2 className="eyebrow">Next reward</h2>
            </div>
            <p className="truncate font-display text-xl font-semibold tracking-tight text-ink">
              {nextMilestone?.reward || 'Max level reached'}
            </p>
            {nextMilestone && (
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo to-energy transition-all duration-500"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-14 md:grid-cols-2">
          {/* Left Column: Referral Hub */}
          <div className="space-y-12">
            <section>
              <h2 className="font-display mb-5 text-2xl font-semibold tracking-tight text-ink">Invite friends</h2>
              <div className="rounded-2xl border border-border bg-cream/50 p-6">
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  Earn{' '}
                  <span className="font-semibold text-energy">
                    {settings?.tokenValuePerReferral || 10} tokens
                  </span>{' '}
                  for every friend who joins with your link.
                </p>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-2">
                  <code className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap px-2 font-mono text-xs text-muted-foreground">
                    {referralLink}
                  </code>
                  <button onClick={copyToClipboard} className="btn-primary btn-md shrink-0">
                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display mb-5 text-2xl font-semibold tracking-tight text-ink">Milestones</h2>
              <ol className="space-y-3">
                {milestones.map((milestone, index) => {
                  const isUnlocked = (user?.tokens || 0) >= milestone.tokensRequired
                  return (
                    <li
                      key={index}
                      className={cn(
                        'flex items-center gap-4 rounded-2xl border p-4 transition-all',
                        isUnlocked ? 'border-energy/40 bg-energy/5' : 'border-border bg-card opacity-70',
                      )}
                    >
                      <div
                        className={cn(
                          'flex size-10 shrink-0 items-center justify-center rounded-full font-mono text-sm',
                          isUnlocked ? 'bg-energy text-white' : 'border border-border text-muted-foreground',
                        )}
                      >
                        {isUnlocked ? <Check className="size-4" strokeWidth={3} /> : index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-ink">{milestone.reward}</h3>
                        <p className="font-mono text-xs text-muted-foreground">
                          {milestone.tokensRequired} tokens required
                        </p>
                      </div>
                      {milestone.image && typeof milestone.image !== 'string' && (
                        <div className="size-14 overflow-hidden rounded-xl border border-border bg-background">
                          <Media resource={milestone.image} imgClassName="object-cover w-full h-full" />
                        </div>
                      )}
                    </li>
                  )
                })}
              </ol>
            </section>
          </div>

          {/* Right Column: Task Board */}
          <div>
            <section>
              <h2 className="font-display mb-2 text-2xl font-semibold tracking-tight text-ink">Earn tokens</h2>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                Complete tasks to earn tokens. Your referrer gets a{' '}
                <span className="font-semibold text-indigo">{settings?.referralBonusPercentage || 10}% bonus</span>{' '}
                when you do.
              </p>

              <div className="space-y-4">
                {settings?.tasks?.map((task) => {
                  const isCompleted = user?.completedTasks?.some((t) => t.taskSlug === task.slug)

                  return (
                    <div
                      key={task.slug}
                      className={cn(
                        'rounded-2xl border border-border p-6 transition-all',
                        isCompleted
                          ? 'bg-muted/60'
                          : 'bg-card hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-24px_hsl(var(--hz-ink)/0.25)]',
                      )}
                    >
                      <div className="mb-3 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-lg font-semibold tracking-tight text-ink">{task.title}</h3>
                          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-energy/10 px-2.5 py-0.5 font-mono text-xs font-medium text-energy">
                            <Zap className="size-3" />+{task.rewardTokens} tokens
                          </span>
                        </div>
                        {isCompleted && (
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-energy text-white">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        )}
                      </div>

                      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{task.description}</p>

                      {!isCompleted ? (
                        <button
                          onClick={() => handleTaskCompletion(task.slug, task.link)}
                          disabled={!!completingTask}
                          className="btn-ink btn-md w-full"
                        >
                          {completingTask === task.slug ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : task.verificationType === 'input' ? (
                            'Start task'
                          ) : (
                            'Complete'
                          )}
                        </button>
                      ) : (
                        <div className="w-full rounded-xl bg-background py-2.5 text-center font-mono text-xs text-muted-foreground">
                          Completed on{' '}
                          {user?.completedTasks?.find((t) => t.taskSlug === task.slug)?.completedAt
                            ? new Date(
                                user.completedTasks.find((t) => t.taskSlug === task.slug)!.completedAt,
                              ).toLocaleDateString()
                            : 'N/A'}
                        </div>
                      )}
                    </div>
                  )
                })}

                {(!settings?.tasks || settings.tasks.length === 0) && (
                  <div className="rounded-2xl border border-dashed border-border p-8 text-center font-mono text-sm text-muted-foreground">
                    No tasks available right now. Check back later!
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
