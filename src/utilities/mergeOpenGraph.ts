import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'The AI mentor that knows you. A living learning plan that adapts every day — and proof of skill you can show anyone.',
  images: [
    {
      url: `${getServerSideURL()}/api/og?title=${encodeURIComponent('The AI mentor that knows you')}`,
      width: 1200,
      height: 630,
    },
  ],
  siteName: 'Horizon',
  title: 'Horizon — The AI mentor that knows you',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
