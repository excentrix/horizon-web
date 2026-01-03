import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Community | Horizon',
    description: 'Join a tribe of high-agency engineering students.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children
}
