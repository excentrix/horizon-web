import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Horizon — The AI mentor that knows you',
    short_name: 'Horizon',
    description:
      'An adaptive AI mentor that builds a living model of how you learn and turns it into a daily plan — with spaced repetition, diagnostic skips and a verified skill portfolio.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDF8EC',
    theme_color: '#EC5B13',
    icons: [
      {
        src: '/favicon/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/favicon/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
