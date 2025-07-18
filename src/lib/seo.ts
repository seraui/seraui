import type { Metadata } from 'next'

interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  noindex?: boolean
  nofollow?: boolean
  ogImage?: string
  twitterImage?: string
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  category?: string
  tags?: string[]
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    noindex = false,
    nofollow = false,
    ogImage = '/og-image.png',
    twitterImage,
    authors = ['Sera UI Team'],
    category = 'technology',
    tags = []
  } = config

  const baseUrl = 'https://seraui.seraprogrammer.com'
  const fullTitle = title.includes('Sera UI') ? title : `${title} | Sera UI`
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : undefined

  return {
    title: fullTitle,
    description,
    keywords: [...keywords, ...tags].join(', '),
    authors: authors.map(name => ({ name })),
    creator: 'Sera UI Team',
    publisher: 'Sera UI',
    category,
    
    // Robots
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Canonical URL
    alternates: canonicalUrl ? {
      canonical: canonicalUrl
    } : undefined,

    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: 'Sera UI',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
          type: 'image/png',
        }
      ],
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: '@sera_ui',
      site: '@sera_ui',
      images: [twitterImage || ogImage],
    },

    // Additional metadata
    other: {
      'theme-color': '#3b82f6',
      'color-scheme': 'dark light',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'Sera UI',
      'application-name': 'Sera UI',
      'msapplication-TileColor': '#3b82f6',
      'msapplication-config': '/browserconfig.xml',
    },
  }
}

// Component-specific metadata generator
export function generateComponentMetadata(componentName: string, description: string, category: string = 'UI Components'): Metadata {
  const title = `${componentName} Component - React Tailwind CSS`
  const enhancedDescription = `${description} Copy-paste React component built with Tailwind CSS and Framer Motion. Free, open-source, and production-ready.`
  
  const keywords = [
    `${componentName} component`,
    `React ${componentName}`,
    `Tailwind ${componentName}`,
    `${componentName} React component`,
    `animated ${componentName}`,
    `${componentName} UI component`,
    'React components',
    'Tailwind CSS components',
    'Framer Motion',
    'TypeScript components',
    'copy paste components',
    'free React components',
    'open source UI library',
    'modern UI components',
    'responsive components',
    'accessible components',
    'dark mode components'
  ]

  return generateMetadata({
    title,
    description: enhancedDescription,
    keywords,
    canonical: `/docs/${componentName.toLowerCase()}`,
    category: 'technology',
    tags: [category, 'React', 'Tailwind CSS', 'Components']
  })
}

// Blog/Article metadata generator
export function generateArticleMetadata(
  title: string, 
  description: string, 
  publishedTime: string,
  modifiedTime?: string,
  authors: string[] = ['Sera UI Team'],
  tags: string[] = []
): Metadata {
  return {
    ...generateMetadata({
      title,
      description,
      publishedTime,
      modifiedTime,
      authors,
      tags
    }),
    openGraph: {
      ...generateMetadata({
        title,
        description,
        publishedTime,
        modifiedTime,
        authors,
        tags
      }).openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors,
      tags,
    }
  }
}

// Generate JSON-LD structured data
export function generateStructuredData(type: 'component' | 'article' | 'faq' | 'howto', data: Record<string, unknown>) {
  const baseUrl = 'https://seraui.seraprogrammer.com'
  
  switch (type) {
    case 'component':
      return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: `${data.name} Component`,
        description: data.description,
        programmingLanguage: 'TypeScript',
        runtimePlatform: 'React',
        codeRepository: 'https://github.com/seraprogrammer/sera-ui',
        license: 'https://opensource.org/licenses/MIT',
        author: {
          '@type': 'Organization',
          name: 'Sera UI Team'
        },
        isPartOf: {
          '@type': 'SoftwareApplication',
          name: 'Sera UI',
          url: baseUrl
        }
      }
    
    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        author: {
          '@type': 'Organization',
          name: 'Sera UI Team'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Sera UI',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.svg`
          }
        },
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime || data.publishedTime,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}${data.url}`
        }
      }
    
    default:
      return null
  }
}

// SEO-friendly URL slug generator
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

// Meta tags for specific pages
export const defaultKeywords = [
  'React components',
  'UI library',
  'Tailwind CSS',
  'Framer Motion',
  'TypeScript',
  'Next.js',
  'animated components',
  'modern UI',
  'open source',
  'free components',
  'copy paste components',
  'responsive design',
  'accessible components',
  'dark mode',
  'component library',
  'design system',
  'web development',
  'frontend',
  'JavaScript',
  'CSS',
  'HTML',
  'web components',
  'React hooks',
  'custom components',
  'UI kit',
  'design tokens',
  'component documentation',
  'developer tools',
  'web design',
  'user interface',
  'user experience',
  'mobile responsive',
  'cross browser',
  'performance optimized',
  'SEO friendly',
  'production ready'
]