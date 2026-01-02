'use client'

import React, { useEffect, useState } from 'react'
import { getWaitlistStatus } from '@/app/(frontend)/waitlist/actions'
import { Trophy } from 'lucide-react'
import Link from 'next/link'
import confetti from 'canvas-confetti'

export function TokenTracker() {
    const [tokens, setTokens] = useState<number | null>(null)
    const [previousTokens, setPreviousTokens] = useState<number | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const checkUser = async () => {
            const email = localStorage.getItem('waitlist_email')
            if (!email) {
                setIsVisible(false)
                return
            }

            const status = await getWaitlistStatus(email)
            if (status.success && status.user) {
                const currentTokens = status.user.tokens || 0

                // Check if tokens increased (trigger confetti)
                if (previousTokens !== null && currentTokens > previousTokens) {
                    confetti({
                        particleCount: 50,
                        spread: 60,
                        origin: { y: 0.1, x: 0.9 },
                        colors: ['#FFD700', '#FFA500'],
                    })
                }

                setPreviousTokens(currentTokens)
                setTokens(currentTokens)
                setIsVisible(true)
            }
        }

        checkUser()

        // Poll for token updates every 10 seconds
        const interval = setInterval(checkUser, 10000)
        return () => clearInterval(interval)
    }, [previousTokens])

    if (!isVisible || tokens === null) return null

    return (
        <Link
            href="/wishlist"
            className="flex items-center gap-2 px-4 py-2 border-2 border-foreground bg-accent text-foreground shadow-harsh hover:-translate-y-1 transition-transform font-black"
        >
            <Trophy className="w-5 h-5" />
            <span className="text-sm">{tokens}</span>
            <span className="text-xs uppercase tracking-wider hidden sm:inline">Tokens</span>
        </Link>
    )
}
