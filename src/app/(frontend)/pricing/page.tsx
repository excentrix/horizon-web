import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Coming Soon | Horizon',
    description: 'This feature is currently under development.',
}

export default function StubPage() {
    return (
        <div className="container py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
            <div className="border-4 border-foreground bg-secondary px-8 py-4 rotate-[-2deg] shadow-harsh mb-8">
                <h1 className="text-4xl md:text-6xl font-black text-foreground">COMING SOON</h1>
            </div>
            <p className="text-xl md:text-2xl font-mono max-w-2xl">
                We are working hard to bring this feature to life. Stay tuned for updates.
            </p>
        </div>
    )
}
