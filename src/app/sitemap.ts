import type { MetadataRoute } from 'next'

// Component categories for better organization
const componentCategories = {
  'UI Components': [
    'accordion', 'badge', 'button', 'card', 'dropdown', 'tabs', 'tabs-classic', 'tabs-fancy',
    'toast', 'modal', 'tooltip', 'navbar', 'footer', 'dock', 'marquee'
  ],
  'Form Components': [
    'login', 'signin', 'password', 'forgotpassword', 'twostep', 'multiselector', 'search'
  ],
  'Animation Components': [
    'flipwords', 'textreveal', 'sparklestext', 'decrypting', 'shimmer', 'loaders', 'retro'
  ],
  'Layout Components': [
    'hero', 'pricing', 'testimonial', 'portfolio', 'teammember', 'waitlist', 'filetree', 'masonary'
  ],
  'Interactive Components': [
    'carousel', 'network', 'copybutton', 'colorpalette', 'gradient', 'fuzzy', 'magic', 'spotlightcard'
  ],
  'Specialized Components': [
    'nftmarketplace', 'amazongift', 'codeprofile', 'pattern', 'aurora', 'integrations', 'prompt'
  ]
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://seraui.seraprogrammer.com'
  const currentDate = new Date()
  
  // Core pages
  const corePages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs/installation`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  ]

  // Generate component pages dynamically
  const componentPages = Object.values(componentCategories)
    .flat()
    .map(component => ({
      url: `${baseUrl}/docs/${component}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: component === 'button' || component === 'card' || component === 'tabs' ? 0.8 : 0.7,
    }))

  // Category pages (if they exist)
  const categoryPages = Object.keys(componentCategories).map(category => ({
    url: `${baseUrl}/docs/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Tools and utilities
  const toolPages = [
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  ]

  // Blog/Article pages (if you add them later)
  const blogPages = [
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }
  ]

  // Additional important pages
  const additionalPages = [
    {
      url: `${baseUrl}/examples`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/showcase`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }
  ]

  return [
    ...corePages,
    ...componentPages,
    ...toolPages,
    ...additionalPages
  ]
}