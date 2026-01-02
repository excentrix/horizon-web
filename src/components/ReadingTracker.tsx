'use client'

import React, { useEffect, useState, useRef } from 'react'
import { awardTokens } from '@/app/(frontend)/waitlist/actions'
import { calculateReadingTime, getMinimumReadingTime } from '@/utilities/readingTime'
import confetti from 'canvas-confetti'

interface ReadingTrackerProps {
    postId: string
    content: string
}

export function ReadingTracker({ postId, content }: ReadingTrackerProps) {
    const [scrollProgress, setScrollProgress] = useState(0)
    const [hasAwarded, setHasAwarded] = useState(false)
    const startTimeRef = useRef<number>(Date.now())
    const estimatedReadingTime = calculateReadingTime(content)
    const minimumReadingTime = getMinimumReadingTime(estimatedReadingTime)

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight
            const scrollTop = window.scrollY
            const scrollable = documentHeight - windowHeight
            const progress = (scrollTop / scrollable) * 100

            setScrollProgress(Math.min(progress, 100))

            // Check if user has read the post (100% scroll + minimum time)
            checkReadingCompletion(progress)
        }

        const checkReadingCompletion = async (progress: number) => {
            if (hasAwarded || progress < 99) return

            const timeSpent = (Date.now() - startTimeRef.current) / 1000 // in seconds

            if (timeSpent >= minimumReadingTime) {
                const email = localStorage.getItem('waitlist_email')
                if (!email) return

                const result = await awardTokens(email, 'read', postId)

                if (result.success) {
                    setHasAwarded(true)

                    // Show confetti
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#FFD700', '#FFA500'],
                    })

                    // Optional: Show toast notification
                    console.log(`🎉 Earned ${result.rewarded} tokens for reading!`)
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Initial check

        return () => window.removeEventListener('scroll', handleScroll)
    }, [hasAwarded, postId, minimumReadingTime])

    return (
        <>
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
                <div
                    className="h-full bg-accent transition-all duration-150 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Reading Progress Indicator (optional) */}
            {scrollProgress > 10 && scrollProgress < 99 && (
                <div className="fixed bottom-4 right-4 px-3 py-2 bg-foreground text-background border-2 border-accent text-xs font-mono shadow-harsh z-40">
                    {Math.round(scrollProgress)}% read
                </div>
            )}
        </>
    )
}
