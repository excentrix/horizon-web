'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import { awardTokens } from '@/app/(frontend)/waitlist/actions'
import confetti from 'canvas-confetti'

interface Comment {
  id: string
  author: string
  content: string
  createdAt: string
}

interface CommentSectionProps {
  postId: string
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`)
      if (response.ok) {
        const data = await response.json()
        setComments(data.comments || [])
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setIsLoading(false)
    }
  }, [postId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const email = localStorage.getItem('waitlist_email')
    if (!email) {
      alert('Please join the waitlist to comment!')
      return
    }

    if (!newComment.trim()) return

    setIsSubmitting(true)

    try {
      // Submit comment
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          email,
          content: newComment,
        }),
      })

      if (response.ok) {
        // Award tokens
        const tokenResult = await awardTokens(email, 'comment', postId)

        if (tokenResult.success) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FFA500'],
          })
        }

        // Refresh comments
        setNewComment('')
        await fetchComments()
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
      alert('Failed to submit comment')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-[48rem] mx-auto mt-16 border-t-4 border-foreground pt-8">
      <h3 className="text-3xl font-black mb-6 flex items-center gap-3">
        <MessageCircle className="w-8 h-8" />
        COMMENTS
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts... (Earn +15 tokens!)"
          rows={4}
          className="w-full p-4 border-4 border-foreground bg-background text-foreground font-mono resize-none focus:outline-none focus:ring-4 focus:ring-accent"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting || !newComment.trim()}
          className="mt-4 flex items-center gap-2 px-6 py-3 border-4 border-foreground bg-accent text-foreground font-black uppercase hover:-translate-y-1 shadow-harsh transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          <span>{isSubmitting ? 'Posting...' : 'Post Comment +15'}</span>
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-center font-mono opacity-50">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-center font-mono opacity-50">No comments yet. Be the first!</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 border-2 border-foreground bg-secondary/10"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-black">{comment.author}</span>
                <span className="text-xs font-mono opacity-50">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="font-mono text-sm">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
