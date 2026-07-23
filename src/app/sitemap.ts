import type { MetadataRoute } from 'next'
import { absoluteUrl, siteOrigins } from '@/lib/seo'

const now = new Date()

const routes = [
  absoluteUrl('excentrix'),
  absoluteUrl('excentrix', '/posts'),
  absoluteUrl('excentrix', '/ai-education-infrastructure'),
  absoluteUrl('excentrix', '/capability-infrastructure'),
  absoluteUrl('horizon'),
  absoluteUrl('horizon', '/features/ai-mentor'),
  absoluteUrl('horizon', '/features/holistic-grading'),
  absoluteUrl('horizon', '/features/community'),
  absoluteUrl('horizon', '/solutions/students'),
  absoluteUrl('horizon', '/solutions/educators'),
  absoluteUrl('horizon', '/solutions/institutions'),
  absoluteUrl('horizon', '/adaptive-learning'),
  absoluteUrl('horizon', '/ai-grading'),
  absoluteUrl('velo'),
  absoluteUrl('velo', '/for/developers'),
  absoluteUrl('velo', '/for/hiring'),
  absoluteUrl('velo', '/for/colleges'),
  absoluteUrl('velo', '/use-cases/proof-of-work-verification'),
  absoluteUrl('velo', '/use-cases/ai-proof-hiring'),
  absoluteUrl('velo', '/use-cases/project-verification'),
  absoluteUrl('velo', '/compare/coding-tests'),
  absoluteUrl('velo', '/compare/hackerrank'),
  absoluteUrl('velo', '/compare/codility'),
  absoluteUrl('flowstate'),
  absoluteUrl('flowstate', '/presentation-software-for-educators'),
  absoluteUrl('colcord'),
  absoluteUrl('colcord', '/campus-operating-system'),
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((url) => ({
    url,
    lastModified: now,
    changeFrequency: url === siteOrigins.excentrix ? 'weekly' : 'monthly',
    priority: url === siteOrigins.velo || url === siteOrigins.horizon ? 1 : 0.8,
  }))
}
