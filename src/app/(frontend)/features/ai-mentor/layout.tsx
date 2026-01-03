import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AI Mentor | Horizon',
    description: 'Your personalized AI learning companion for engineering.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children
}
