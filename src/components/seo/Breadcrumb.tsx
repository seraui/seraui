import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  name: string
  url: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav 
      className={`flex items-center space-x-2 text-sm text-zinc-600 dark:text-zinc-400 ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => (
          <li 
            key={item.url} 
            className="flex items-center"
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            <meta itemProp="position" content={String(index + 1)} />
            
            {index === 0 && (
              <Home className="w-4 h-4 mr-1" aria-hidden="true" />
            )}
            
            {item.current ? (
              <span 
                className="font-medium text-zinc-900 dark:text-zinc-100"
                itemProp="name"
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.url}
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                itemProp="item"
              >
                <span itemProp="name">{item.name}</span>
              </Link>
            )}
            
            {index < items.length - 1 && (
              <ChevronRight 
                className="w-4 h-4 mx-2 text-zinc-400" 
                aria-hidden="true" 
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb