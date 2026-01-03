import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Holistic Grading | Horizon',
    description: 'Understand your progress beyond just grades.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children
}
