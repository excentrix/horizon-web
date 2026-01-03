import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Us | Horizon',
    description: 'Inside the mission to build the most human learning OS on Earth.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children
}
