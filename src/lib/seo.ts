import type { Metadata } from 'next'

export const siteOrigins = {
  excentrix: 'https://all.excentrix.tech',
  horizon: 'https://horizon.excentrix.tech',
  velo: 'https://excentrix.tech',
  flowstate: 'https://flowstate.excentrix.tech',
  colcord: 'https://colcord.excentrix.tech',
} as const

export type ProductKey = keyof typeof siteOrigins

type EntityConfig = {
  name: string
  alternateName?: string
  description: string
  category: string
  keywords: string[]
}

export const productEntities: Record<ProductKey, EntityConfig> = {
  excentrix: {
    name: 'Excentrix',
    alternateName: 'Excentrix AI',
    description:
      'Excentrix builds capability infrastructure for education and work: proof-of-work verification, adaptive learning, live presentation intelligence, and university operating systems.',
    category: 'TechnologyCompany',
    keywords: [
      'AI education infrastructure',
      'capability infrastructure',
      'proof of capability platform',
      'education AI products',
    ],
  },
  horizon: {
    name: 'Horizon',
    alternateName: 'Horizon by Excentrix',
    description:
      'Horizon is an AI mentorship and adaptive learning platform that builds a living model of each learner, creates daily learning plans, and turns work into verifiable skill evidence.',
    category: 'EducationalApplication',
    keywords: [
      'AI mentor for students',
      'adaptive learning platform',
      'AI grading platform',
      'student learning roadmap',
    ],
  },
  velo: {
    name: 'VELO',
    alternateName: 'VELO by Excentrix',
    description:
      'VELO is a proof-of-work verification engine for technical hiring, developer portfolios, and college placements. It verifies whether a person can defend the project they claim to have built.',
    category: 'BusinessApplication',
    keywords: [
      'proof of work verification',
      'developer verification',
      'technical hiring assessment',
      'AI-proof hiring',
    ],
  },
  flowstate: {
    name: 'Flowstate',
    alternateName: 'Flowstate by Excentrix',
    description:
      'Flowstate is live presentation software for educators and trainers, combining deck authoring, presenter intelligence, audience signals, and phone-based room control.',
    category: 'EducationalApplication',
    keywords: [
      'presentation software for educators',
      'interactive lecture software',
      'live classroom presentation tool',
    ],
  },
  colcord: {
    name: 'Colcord',
    alternateName: 'Colcord by Excentrix',
    description:
      'Colcord is a campus operating system for universities, unifying academic records, communication, campus life, career services, digital identity, and institutional intelligence.',
    category: 'EducationalApplication',
    keywords: [
      'university management platform India',
      'campus operating system',
      'student lifecycle platform',
      'higher education software',
    ],
  },
}

export function absoluteUrl(product: ProductKey, path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${siteOrigins[product]}${normalized === '/' ? '' : normalized}`
}

export function productMetadata(
  product: ProductKey,
  {
    title,
    description,
    path = '/',
    keywords = [],
  }: {
    title: string
    description: string
    path?: string
    keywords?: string[]
  },
): Metadata {
  const entity = productEntities[product]
  const url = absoluteUrl(product, path)

  return {
    metadataBase: new URL(siteOrigins[product]),
    title,
    description,
    keywords: [...entity.keywords, ...keywords],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: entity.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@excentrix',
    },
  }
}

export function organizationJsonLd(product: ProductKey) {
  const origin = siteOrigins[product]
  const entity = productEntities[product]

  return {
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    name: product === 'excentrix' ? 'Excentrix' : entity.name,
    alternateName: entity.alternateName,
    url: origin,
    logo: `${siteOrigins.excentrix}/favicon/web-app-manifest-512x512.png`,
    description: entity.description,
    sameAs: ['https://www.linkedin.com/company/excentrix', 'https://twitter.com/excentrix'],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@excentrix.tech',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: 'en',
    },
  }
}

export function websiteJsonLd(product: ProductKey) {
  const origin = siteOrigins[product]
  const entity = productEntities[product]

  return {
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: origin,
    name: entity.name,
    publisher: { '@id': `${origin}/#organization` },
  }
}

export function softwareJsonLd(product: ProductKey) {
  const origin = siteOrigins[product]
  const entity = productEntities[product]

  return {
    '@type': 'SoftwareApplication',
    '@id': `${origin}/#software`,
    name: entity.name,
    alternateName: entity.alternateName,
    applicationCategory: entity.category,
    operatingSystem: 'Web',
    url: origin,
    description: entity.description,
    keywords: entity.keywords.join(', '),
    publisher: { '@id': `${siteOrigins.excentrix}/#organization` },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Pilot access available through Excentrix.',
    },
  }
}

export function productGraph(product: ProductKey) {
  const graph = [organizationJsonLd(product), websiteJsonLd(product)]

  if (product !== 'excentrix') {
    graph.unshift(organizationJsonLd('excentrix'))
    graph.push(softwareJsonLd(product))
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

export function faqJsonLd(id: string, faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function breadcrumbJsonLd(
  id: string,
  items: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': id,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
