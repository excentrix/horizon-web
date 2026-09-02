import type { MetadataRoute } from 'next'
import { siteOrigins } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/payload/'],
    },
    sitemap: [
      `${siteOrigins.excentrix}/sitemap.xml`,
      `${siteOrigins.excentrix}/pages-sitemap.xml`,
      `${siteOrigins.excentrix}/posts-sitemap.xml`,
    ],
  }
}
