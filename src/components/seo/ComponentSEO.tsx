import { componentSchema, breadcrumbSchema } from '@/lib/schema'

interface ComponentSEOProps {
  componentName: string
  description: string
  category?: string
  examples?: string[]
  relatedComponents?: string[]
}

export function ComponentSEO({ 
  componentName, 
  description, 
  category = 'UI Components',
  relatedComponents = []
}: ComponentSEOProps) {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Documentation', url: '/docs' },
    { name: componentName, url: `/docs/${componentName.toLowerCase()}` }
  ]

  const structuredData = {
    component: componentSchema(componentName, description, category),
    breadcrumb: breadcrumbSchema(breadcrumbs),
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `How to use ${componentName} component?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The ${componentName} component can be easily integrated into your React application. Simply copy the component code and paste it into your project. ${description}`
          }
        },
        {
          "@type": "Question",
          "name": `Is ${componentName} component responsive?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Yes, all Sera UI components including ${componentName} are fully responsive and work seamlessly across all device sizes.`
          }
        },
        {
          "@type": "Question",
          "name": `Does ${componentName} support dark mode?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Yes, ${componentName} component supports both light and dark themes out of the box using Tailwind CSS dark mode classes.`
          }
        }
      ]
    }
  }

  return (
    <>
      {/* Component Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.component)
        }}
      />
      
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.breadcrumb)
        }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.faq)
        }}
      />

      {/* Preload related components for better UX */}
      {relatedComponents.map(component => (
        <link
          key={component}
          rel="prefetch"
          href={`/docs/${component.toLowerCase()}`}
        />
      ))}
    </>
  )
}

export default ComponentSEO