'use client'

import React, { useEffect, useState } from 'react'
import { getReferralSettings, getWaitlistStatus, completeTask } from '@/app/(frontend)/waitlist/actions'
import { useRouter } from 'next/navigation'
import { Loader2, Copy, Check, Trophy, Zap, Users, Star } from 'lucide-react'
import { Media } from '@/components/Media'
import confetti from 'canvas-confetti'
import { cn } from '@/utilities/ui'

export default function WishlistDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [settings, setSettings] = useState<any>(null)
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

            const [statusRes, settingsRes] = await Promise.all([
                getWaitlistStatus(email),
                getReferralSettings(),
            ])

            if (statusRes.success) {
                setUser(statusRes.user)
            } else {
                router.push('/')
            }
            setSettings(settingsRes)
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
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                    confetti({
                        particleCount: 30,
                        spread: 50,
                        origin: { y: 0.7 },
                        colors: ['#FFD700', '#FFA500'],
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
                colors: ['#FFD700', '#FFA500'],
            })
        } catch (err) {
            console.error('Fallback copy failed:', err)
            alert('Could not copy to clipboard. Please copy manually: ' + text)
        }

        textArea.remove()
    }

    const handleTaskCompletion = async (taskSlug: string, type: string) => {
        if (completingTask) return
        setCompletingTask(taskSlug)

        // Simulate verification delay for effect
        await new Promise(resolve => setTimeout(resolve, 1000))

        const res = await completeTask(user.email, taskSlug)

        if (res.success) {
            // Update local state
            setUser((prev: any) => ({
                ...prev,
                tokens: res.tokens,
                completedTasks: [...(prev.completedTasks || []), { taskSlug, completedAt: new Date().toISOString() }]
            }))

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            })
        }

        setCompletingTask(null)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-foreground" />
            </div>
        )
    }

    // Token-based milestones (sorted by tokens required)
    const milestones = settings?.milestones?.sort((a: any, b: any) => a.tokensRequired - b.tokensRequired) || []
    const nextMilestone = milestones.find((m: any) => m.tokensRequired > (user?.tokens || 0))
    const progress = nextMilestone
        ? ((user?.tokens || 0) / nextMilestone.tokensRequired) * 100
        : 100

    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const referralLink = `${origin}?ref=${user?.referralCode}`

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-5xl">

                {/* Header Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 border-4 border-foreground bg-card shadow-[8px_8px_0px_hsl(var(--foreground))]">
                        <div className="flex items-center gap-3 mb-2">
                            <Trophy className="w-6 h-6 text-accent" />
                            <h3 className="font-mono text-sm tracking-widest uppercase">Total Tokens</h3>
                        </div>
                        <p className="text-5xl font-black">{user?.tokens || 0}</p>
                    </div>

                    <div className="p-6 border-4 border-foreground bg-card shadow-[8px_8px_0px_hsl(var(--foreground))]">
                        <div className="flex items-center gap-3 mb-2">
                            <Users className="w-6 h-6 text-accent" />
                            <h3 className="font-mono text-sm tracking-widest uppercase">Referrals</h3>
                        </div>
                        <p className="text-5xl font-black">{user?.referralCount || 0}</p>
                    </div>

                    <div className="p-6 border-4 border-foreground bg-card shadow-[8px_8px_0px_hsl(var(--foreground))]">
                        <div className="flex items-center gap-3 mb-2">
                            <Star className="w-6 h-6 text-accent" />
                            <h3 className="font-mono text-sm tracking-widest uppercase">Next Reward</h3>
                        </div>
                        <p className="text-xl font-bold truncate">{nextMilestone?.reward || 'Max Level Reached'}</p>
                        {nextMilestone && (
                            <div className="w-full h-4 border-2 border-foreground bg-muted mt-2 relative">
                                <div
                                    className="h-full bg-accent transition-all duration-500"
                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">

                    {/* Left Column: Referral Hub */}
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                                <Users className="w-8 h-8" />
                                INVITE FRIENDS
                            </h2>
                            <div className="p-6 border-4 border-foreground bg-secondary/10 relative overflow-hidden">
                                <p className="text-lg mb-4 font-mono">
                                    Earn <span className="font-bold text-accent">{settings?.tokenValuePerReferral || 10} tokens</span> for every friend who joins.
                                </p>
                                <div className="bg-background p-2 border-4 border-foreground flex items-center gap-2">
                                    <code className="flex-1 font-mono text-sm overflow-hidden text-ellipsis whitespace-nowrap px-2">
                                        {referralLink}
                                    </code>
                                    <button
                                        onClick={copyToClipboard}
                                        className="px-4 py-2 bg-accent text-foreground font-black uppercase hover:brightness-110 transition-all active:scale-95"
                                    >
                                        {copied ? "COPIED!" : "COPY"}
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                                <Trophy className="w-8 h-8" />
                                MILESTONES
                            </h2>
                            <div className="space-y-4">
                                {milestones.map((milestone: any, index: number) => {
                                    const isUnlocked = (user?.tokens || 0) >= milestone.tokensRequired
                                    return (
                                        <div
                                            key={index}
                                            className={cn(
                                                "flex items-center gap-4 p-4 border-4 transition-all",
                                                isUnlocked
                                                    ? "border-accent bg-accent/10 shadow-[4px_4px_0px_hsl(var(--accent))]"
                                                    : "border-foreground/20 opacity-60 grayscale"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-12 h-12 border-2 border-foreground flex items-center justify-center text-xl font-black shrink-0",
                                                isUnlocked ? "bg-accent text-foreground" : "bg-transparent text-foreground"
                                            )}>
                                                {isUnlocked ? "✓" : index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-lg">{milestone.reward}</h4>
                                                <p className="text-sm font-mono opacity-70">{milestone.tokensRequired} Tokens Required</p>
                                            </div>
                                            {milestone.image && typeof milestone.image !== 'string' && (
                                                <div className="w-16 h-16 border-2 border-foreground overflow-hidden bg-background">
                                                    <Media resource={milestone.image} imgClassName="object-cover w-full h-full" />
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Task Board */}
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                                <Zap className="w-8 h-8" />
                                EARN TOKENS
                            </h2>
                            <p className="mb-6 text-lg opacity-80">
                                Complete tasks to earn tokens. Your referrer gets a <span className="font-bold text-accent">{settings?.referralBonusPercentage || 10}% bonus</span> when you complete these!
                            </p>

                            <div className="space-y-4">
                                {settings?.tasks?.map((task: any) => {
                                    const isCompleted = user?.completedTasks?.some((t: any) => t.taskSlug === task.slug)

                                    return (
                                        <div
                                            key={task.slug}
                                            className={cn(
                                                "p-6 border-4 border-foreground transition-all relative",
                                                isCompleted ? "bg-muted opacity-80" : "bg-card hover:translate-x-1 hover:-translate-y-1 shadow-[8px_8px_0px_hsl(var(--foreground))]"
                                            )}
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-black mb-1">{task.title}</h3>
                                                    <span className="inline-block px-2 py-1 bg-accent text-foreground text-xs font-black uppercase border-2 border-foreground">
                                                        +{task.rewardTokens} Tokens
                                                    </span>
                                                </div>
                                                {isCompleted && (
                                                    <div className="w-8 h-8 bg-green-500 border-2 border-foreground flex items-center justify-center text-white rounded-full">
                                                        <Check size={16} strokeWidth={4} />
                                                    </div>
                                                )}
                                            </div>

                                            <p className="text-sm mb-6 font-mono opacity-80">{task.description}</p>

                                            {!isCompleted ? (
                                                <button
                                                    onClick={() => handleTaskCompletion(task.slug, task.verificationType)}
                                                    disabled={!!completingTask}
                                                    className="w-full py-3 bg-foreground text-background font-black uppercase hover:bg-foreground/90 transition-colors disabled:opacity-50"
                                                >
                                                    {completingTask === task.slug ? (
                                                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                                    ) : (
                                                        task.verificationType === 'input' ? "Start Task" : "Complete"
                                                    )}
                                                </button>
                                            ) : (
                                                <div className="w-full py-3 bg-muted text-foreground font-mono text-center text-sm border-2 border-foreground/10">
                                                    Completed on {new Date(user.completedTasks.find((t: any) => t.taskSlug === task.slug).completedAt).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}

                                {(!settings?.tasks || settings.tasks.length === 0) && (
                                    <div className="p-8 border-4 border-foreground border-dashed text-center opacity-50 font-mono">
                                        No tasks available right now. Check back later!
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        </div>
    )
}
