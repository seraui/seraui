import ComponentSEO from '@/components/seo/ComponentSEO'
import Breadcrumb from '@/components/seo/Breadcrumb'

interface ComponentTemplateProps {
  componentName: string
  description: string
  category?: string
  examples?: string[]
  relatedComponents?: string[]
  children: React.ReactNode
  installationCode?: string
  usageCode?: string
  propsTable?: Array<{
    prop: string
    type: string
    default?: string
    description: string
  }>
}

export function ComponentTemplate({
  componentName,
  description,
  category = 'UI Components',
  examples = [],
  relatedComponents = [],
  children,
  installationCode,
  usageCode,
  propsTable = []
}: ComponentTemplateProps) {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Documentation', url: '/docs' },
    { name: componentName, url: `/docs/${componentName.toLowerCase()}`, current: true }
  ]

  return (
    <>
      <ComponentSEO
        componentName={componentName}
        description={description}
        category={category}
        examples={examples}
        relatedComponents={relatedComponents}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        
        {/* Component Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {componentName} Component
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {description}
          </p>
          
          {/* Component Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              {category}
            </span>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
              React
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
              Tailwind CSS
            </span>
            <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 rounded-full text-sm font-medium">
              Framer Motion
            </span>
          </div>
        </header>

        {/* Component Demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Preview</h2>
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 bg-white dark:bg-zinc-900">
            {children}
          </div>
        </section>

        {/* Installation Section */}
        {installationCode && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Installation</h2>
            <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-4 overflow-x-auto">
              <pre className="text-zinc-100">
                <code>{installationCode}</code>
              </pre>
            </div>
          </section>
        )}

        {/* Usage Section */}
        {usageCode && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Usage</h2>
            <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-4 overflow-x-auto">
              <pre className="text-zinc-100">
                <code>{usageCode}</code>
              </pre>
            </div>
          </section>
        )}

        {/* Props Table */}
        {propsTable.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Props</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-zinc-200 dark:border-zinc-800">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-900">
                    <th className="border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-left font-semibold">
                      Prop
                    </th>
                    <th className="border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-left font-semibold">
                      Type
                    </th>
                    <th className="border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-left font-semibold">
                      Default
                    </th>
                    <th className="border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-left font-semibold">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {propsTable.map((prop, index) => (
                    <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                      <td className="border border-zinc-200 dark:border-zinc-800 px-4 py-3 font-mono text-sm">
                        {prop.prop}
                      </td>
                      <td className="border border-zinc-200 dark:border-zinc-800 px-4 py-3 font-mono text-sm text-blue-600 dark:text-blue-400">
                        {prop.type}
                      </td>
                      <td className="border border-zinc-200 dark:border-zinc-800 px-4 py-3 font-mono text-sm text-zinc-600 dark:text-zinc-400">
                        {prop.default || '-'}
                      </td>
                      <td className="border border-zinc-200 dark:border-zinc-800 px-4 py-3">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Related Components */}
        {relatedComponents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Related Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedComponents.map((component) => (
                <a
                  key={component}
                  href={`/docs/${component.toLowerCase()}`}
                  className="block p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                >
                  <h3 className="font-semibold text-blue-600 dark:text-blue-400">
                    {component}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    Explore the {component} component
                  </p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Section for SEO */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                How do I customize the {componentName} component?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                You can customize the {componentName} component by modifying the Tailwind CSS classes 
                or by passing custom props. All components are built with flexibility in mind.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Is the {componentName} component accessible?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Yes, all Sera UI components including {componentName} follow WCAG accessibility guidelines 
                and include proper ARIA attributes, keyboard navigation, and screen reader support.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Can I use {componentName} with TypeScript?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Absolutely! All Sera UI components are built with TypeScript and include full type definitions 
                for better development experience and type safety.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ComponentTemplate