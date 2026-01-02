'use client'

import React, { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { awardTokens } from '@/app/(frontend)/waitlist/actions'
import confetti from 'canvas-confetti'
import { cn } from '@/utilities/ui'

interface LikeButtonProps {
    postId: string
}

export function LikeButton({ postId }: LikeButtonProps) {
    const [isLiked, setIsLiked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // Check if already liked from localStorage
        const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]')
        setIsLiked(likedPosts.includes(postId))
    }, [postId])

    const handleLike = async () => {
        if (isLiked || isLoading) return

        const email = localStorage.getItem('waitlist_email')
        if (!email) {
            alert('Please join the waitlist to like posts!')
            return
        }

        setIsLoading(true)
        const result = await awardTokens(email, 'like', postId)

        if (result.success) {
            setIsLiked(true)

            // Save to localStorage
            const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]')
            likedPosts.push(postId)
            localStorage.setItem('liked_posts', JSON.stringify(likedPosts))

            // Confetti!
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#FFA500'],
            })
        } else if (result.error === 'Already rewarded for this activity') {
            setIsLiked(true)
        }

        setIsLoading(false)
    }

    return (
        <button
            onClick={handleLike}
            disabled={isLiked || isLoading}
            className={cn(
                "flex items-center gap-2 px-6 py-3 border-4 border-foreground font-black uppercase transition-all",
                isLiked
                    ? "bg-accent text-foreground cursor-not-allowed"
                    : "bg-background text-foreground hover:bg-accent hover:-translate-y-1 shadow-harsh"
            )}
        >
            <Heart
                className={cn("w-5 h-5", isLiked && "fill-current")}
            />
            <span className="text-sm">
                {isLiked ? 'Liked' : isLoading ? 'Liking...' : 'Like +2'}
            </span>
        </button>
    )
}
