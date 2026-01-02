import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { calculateReadingTime, formatReadingTime, getLexicalText } from './readingTime'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  if (image && typeof image === 'object' && 'url' in image) {
    const serverUrl = getServerSideURL()
    const ogUrl = image.sizes?.og?.url

    return ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return null
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const serverUrl = getServerSideURL()
  let ogImage = getImageURL(doc?.meta?.image)

  // Use dynamic OG image as fallback if no meta image is set
  if (!ogImage) {
    const title = doc?.title ? encodeURIComponent(doc?.title) : 'Horizon'
    let readTimeParams = ''
    
    if (doc && 'content' in doc && doc.content) {
       const text = getLexicalText(doc.content)
       const seconds = calculateReadingTime(text)
       readTimeParams = `&readTime=${encodeURIComponent(formatReadingTime(seconds))}`
    }
    
    ogImage = `${serverUrl}/api/og?title=${title}${readTimeParams}`
  }

  const title = doc?.meta?.title 
    ? (doc.meta.title.includes('| Horizon') ? doc.meta.title : `${doc.meta.title} | Horizon`) 
    : (doc?.title ? `${doc.title} | Horizon` : 'Horizon')

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    twitter: {
        card: 'summary_large_image',
        title,
        description: doc?.meta?.description || '',
        images: ogImage ? [ogImage] : undefined,
    },
    title,
  }
}
