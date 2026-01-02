'use client'

import React, { useState, useEffect } from 'react'
import { Type, Volume2, VolumeX, Minus, Plus, Settings2, X } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { getLexicalText } from '@/utilities/readingTime'

interface AccessibilityControlsProps {
    content: any
    onImage?: boolean
}

export function AccessibilityControls({ content, onImage = false }: AccessibilityControlsProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [fontSize, setFontSize] = useState(16)
    const [speechSynthesisUtterance, setSpeechSynthesisUtterance] = useState<SpeechSynthesisUtterance | null>(null)

    // Maximum and minimum font sizes
    const MAX_FONT_SIZE = 24
    const MIN_FONT_SIZE = 14

    useEffect(() => {
        // Initialize speech synthesis
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance()
            // Extract text from Lexical JSON
            const cleanText = getLexicalText(content)

            utterance.text = cleanText
            utterance.rate = 1
            utterance.pitch = 1

            utterance.onend = () => {
                setIsPlaying(false)
            }

            setSpeechSynthesisUtterance(utterance)
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.speechSynthesis.cancel()
            }
        }
    }, [content])

    // Font size handler
    useEffect(() => {
        const richTextContainer = document.querySelector('.payload-richtext') as HTMLElement
        if (richTextContainer) {
            richTextContainer.style.fontSize = `${fontSize}px`
            // Adjust line height relatively
            richTextContainer.style.lineHeight = `${fontSize * 1.6}px`
        }
    }, [fontSize])

    const toggleSpeech = () => {
        if (!speechSynthesisUtterance) return

        if (isPlaying) {
            window.speechSynthesis.cancel()
            setIsPlaying(false)
        } else {
            window.speechSynthesis.cancel() // Clear any existing
            window.speechSynthesis.speak(speechSynthesisUtterance)
            setIsPlaying(true)
        }
    }

    const changeFontSize = (delta: number) => {
        setFontSize(prev => {
            const newSize = prev + delta
            return Math.min(Math.max(newSize, MIN_FONT_SIZE), MAX_FONT_SIZE)
        })
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "flex items-center gap-2 text-sm transition-colors mt-2",
                    onImage ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
                )}
                title="Accessibility Settings"
            >
                <Settings2 className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider font-mono">Accessibility</span>
            </button>
        )
    }

    return (
        <div className={cn(
            "flex flex-wrap items-center gap-4 py-3 px-4 border backdrop-blur rounded-lg mt-4 animate-in fade-in slide-in-from-top-2",
            onImage
                ? "border-white/20 bg-black/40 text-white"
                : "border-border bg-card/80 text-card-foreground"
        )}>
            <div className="flex items-center gap-2 mr-auto">
                <span className={cn(
                    "text-xs font-mono uppercase tracking-wider",
                    onImage ? "text-white/70" : "text-muted-foreground"
                )}>Accessibility</span>
            </div>

            {/* Font Size Controls */}
            <div className={cn(
                "flex items-center gap-2 rounded-full px-3 py-1 border",
                onImage ? "bg-white/10 border-white/10" : "bg-muted border-border"
            )}>
                <Type className={cn("h-4 w-4", onImage ? "text-white/70" : "text-muted-foreground")} />
                <button
                    onClick={() => changeFontSize(-1)}
                    disabled={fontSize <= MIN_FONT_SIZE}
                    className={cn(
                        "p-1 hover:text-primary disabled:opacity-30 transition-colors",
                        onImage ? "text-white" : "text-foreground"
                    )}
                    aria-label="Decrease font size"
                >
                    <Minus className="h-3 w-3" />
                </button>
                <span className={cn("text-xs font-mono w-4 text-center", onImage ? "text-white" : "text-foreground")}>{fontSize}</span>
                <button
                    onClick={() => changeFontSize(1)}
                    disabled={fontSize >= MAX_FONT_SIZE}
                    className={cn(
                        "p-1 hover:text-primary disabled:opacity-30 transition-colors",
                        onImage ? "text-white" : "text-foreground"
                    )}
                    aria-label="Increase font size"
                >
                    <Plus className="h-3 w-3" />
                </button>
            </div>

            {/* TTS Control */}
            <button
                onClick={toggleSpeech}
                className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wide transition-all border",
                    isPlaying
                        ? "bg-primary text-primary-foreground animate-pulse border-primary"
                        : (onImage
                            ? "bg-white/10 hover:bg-white/20 border-white/10 text-white"
                            : "bg-muted hover:bg-muted/80 border-border text-foreground")
                )}
            >
                {isPlaying ? (
                    <>
                        <VolumeX className="h-4 w-4" />
                        <span>Stop</span>
                    </>
                ) : (
                    <>
                        <Volume2 className="h-4 w-4" />
                        <span>Listen</span>
                    </>
                )}
            </button>

            {/* Close Button */}
            <button
                onClick={() => setIsOpen(false)}
                className={cn(
                    "ml-2 p-1 rounded-full transition-colors",
                    onImage
                        ? "text-white/70 hover:text-white hover:bg-white/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                aria-label="Close settings"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    )
}
