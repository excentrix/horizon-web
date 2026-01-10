'use client'

import React, { useState, useEffect } from 'react'
import { Share2, Check } from 'lucide-react'
import { awardTokens } from '@/app/(frontend)/waitlist/actions'
import confetti from 'canvas-confetti'

interface ShareButtonProps {
    postId: string
    postTitle: string
    postSlug: string
}

export function ShareButton({ postId, postTitle: _postTitle, postSlug }: ShareButtonProps) {
    const [isShared, setIsShared] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showCopied, setShowCopied] = useState(false)

    useEffect(() => {
        // Check if already shared from localStorage
        const sharedPosts = JSON.parse(localStorage.getItem('shared_posts') || '[]')
        setIsShared(sharedPosts.includes(postId))
    }, [postId])

    const handleShare = async () => {
        if (isLoading) return

        const email = localStorage.getItem('waitlist_email')
        if (!email) {
            alert('Please join the waitlist to share posts!')
            return
        }

        const origin = typeof window !== 'undefined' ? window.location.origin : ''
        const shareUrl = `${origin}/posts/${postSlug}`

        // Copy to clipboard
        try {
            await navigator.clipboard.writeText(shareUrl)
            setShowCopied(true)
            setTimeout(() => setShowCopied(false), 2000)
        } catch (_err) {
            // Fallback
            const textArea = document.createElement('textarea')
            textArea.value = shareUrl
            textArea.style.position = 'fixed'
            textArea.style.left = '-999999px'
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            textArea.remove()
            setShowCopied(true)
            setTimeout(() => setShowCopied(false), 2000)
        }

        // Award tokens (only first time)
        if (!isShared) {
            setIsLoading(true)
            const result = await awardTokens(email, 'share', postId)

            if (result.success) {
                setIsShared(true)

                // Save to localStorage
                const sharedPosts = JSON.parse(localStorage.getItem('shared_posts') || '[]')
                sharedPosts.push(postId)
                localStorage.setItem('shared_posts', JSON.stringify(sharedPosts))

                // Confetti!
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#FFD700', '#FFA500'],
                })
            } else if (result.error === 'Already rewarded for this activity') {
                setIsShared(true)
            }

            setIsLoading(false)
        }
    }

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 border-4 border-foreground bg-background text-foreground font-black uppercase hover:bg-accent hover:-translate-y-1 shadow-harsh transition-all"
        >
            {showCopied ? (
                <>
                    <Check className="w-5 h-5" />
                    <span className="text-sm">Copied!</span>
                </>
            ) : (
                <>
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm">
                        {isShared ? 'Share Again' : isLoading ? 'Sharing...' : 'Share +10'}
                    </span>
                </>
            )}
        </button>
    )
}
