import { NextResponse } from 'next/server'

// RSS Feed for better SEO and content discovery
export async function GET() {
  const baseUrl = 'https://seraui.seraprogrammer.com'
  const currentDate = new Date().toISOString()

  // Component categories for RSS feed
  const components = [
    { name: 'Button', description: 'Interactive button components with animations', category: 'UI Components' },
    { name: 'Card', description: 'Flexible card components for content display', category: 'UI Components' },
    { name: 'Tabs', description: 'Accessible tab components with smooth transitions', category: 'UI Components' },
    { name: 'Modal', description: 'Accessible modal and dialog components', category: 'UI Components' },
    { name: 'Carousel', description: 'Responsive carousel and slider components', category: 'Interactive Components' },
    { name: 'Login', description: 'Beautiful login form components', category: 'Form Components' },
    { name: 'Hero', description: 'Stunning hero section components', category: 'Layout Components' },
    { name: 'Pricing', description: 'Professional pricing table components', category: 'Layout Components' },
    { name: 'Testimonial', description: 'Social proof testimonial components', category: 'Layout Components' },
    { name: 'Animation', description: 'Text animation and effect components', category: 'Animation Components' }
  ]

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Sera UI - Modern React Component Library</title>
    <description>Latest updates and components from Sera UI - the modern React component library with 50+ animated components built with Tailwind CSS and Framer Motion.</description>
    <link>${baseUrl}</link>
    <language>en-US</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <pubDate>${currentDate}</pubDate>
    <ttl>1440</ttl>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/logo.svg</url>
      <title>Sera UI</title>
      <link>${baseUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
    
    <item>
      <title>Sera UI v1.0.0 - Modern React Component Library Launch</title>
      <description>Introducing Sera UI, a comprehensive React component library with 50+ animated components built with Tailwind CSS and Framer Motion. Free, open-source, and production-ready.</description>
      <link>${baseUrl}</link>
      <guid isPermaLink="true">${baseUrl}</guid>
      <pubDate>${currentDate}</pubDate>
      <category>React Components</category>
      <content:encoded><![CDATA[
        <p>We're excited to announce the launch of Sera UI, a modern React component library designed for developers who want beautiful, accessible, and performant UI components.</p>
        <h3>What's Included:</h3>
        <ul>
          <li>50+ animated React components</li>
          <li>Built with Tailwind CSS and Framer Motion</li>
          <li>Full TypeScript support</li>
          <li>Dark mode support</li>
          <li>Accessibility compliant</li>
          <li>Copy-paste ready components</li>
        </ul>
        <p>Perfect for Next.js applications and modern web development.</p>
      ]]></content:encoded>
    </item>

    ${components.map(component => `
    <item>
      <title>${component.name} Component - Sera UI</title>
      <description>${component.description} - Free React component built with Tailwind CSS and Framer Motion.</description>
      <link>${baseUrl}/docs/${component.name.toLowerCase()}</link>
      <guid isPermaLink="true">${baseUrl}/docs/${component.name.toLowerCase()}</guid>
      <pubDate>${currentDate}</pubDate>
      <category>${component.category}</category>
      <content:encoded><![CDATA[
        <p>${component.description}</p>
        <p>Features:</p>
        <ul>
          <li>Fully responsive design</li>
          <li>Dark mode support</li>
          <li>Accessibility compliant</li>
          <li>TypeScript support</li>
          <li>Copy-paste ready</li>
        </ul>
        <p>View the ${component.name} component documentation and examples at <a href="${baseUrl}/docs/${component.name.toLowerCase()}">${baseUrl}/docs/${component.name.toLowerCase()}</a></p>
      ]]></content:encoded>
    </item>
    `).join('')}

    <item>
      <title>Installation Guide - Getting Started with Sera UI</title>
      <description>Learn how to install and set up Sera UI in your React or Next.js project. Step-by-step installation guide with examples.</description>
      <link>${baseUrl}/docs/installation</link>
      <guid isPermaLink="true">${baseUrl}/docs/installation</guid>
      <pubDate>${currentDate}</pubDate>
      <category>Documentation</category>
      <content:encoded><![CDATA[
        <p>Get started with Sera UI in minutes. Our installation guide covers everything you need to know to integrate Sera UI into your project.</p>
        <h3>Quick Start:</h3>
        <ol>
          <li>Install dependencies</li>
          <li>Configure Tailwind CSS</li>
          <li>Copy components</li>
          <li>Start building</li>
        </ol>
        <p>Compatible with React 18+, Next.js 13+, and modern build tools.</p>
      ]]></content:encoded>
    </item>
  </channel>
</rss>`

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}