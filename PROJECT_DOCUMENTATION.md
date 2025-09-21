# Sera UI - Complete Project Documentation

<div align="center">
  <img width="1638" height="958" alt="Sera UI Screenshot" src="https://github.com/user-attachments/assets/ef7fe2e7-e085-4cfb-bbed-7f2e53c9bee6" />
  
  https://github.com/user-attachments/assets/a9472d3e-8994-4775-b82b-69334bd270a3


  <h2>🚀 Modern React Component Library</h2>
  <p><strong>Beautifully designed components you can copy and paste into your apps. Accessible. Customizable. Open Source.</strong></p>
  
  <a href="https://discord.gg/XqQkbTptvJ" target="_blank">
    <img src="https://img.shields.io/badge/Join%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="join-discord">
  </a>
  <a href="https://x.com/pimjoHQ" target="_blank">
    <img src="https://img.shields.io/badge/Ask%20on%20X-000000?style=for-the-badge&logo=x&logoColor=white" alt="ask-on-x">
  </a>
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Available Components](#available-components)
- [Development Workflow](#development-workflow)
- [Build System](#build-system)
- [Performance Optimizations](#performance-optimizations)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Sera UI** is a modern, high-performance React component library designed for developers who need beautiful, accessible, and customizable UI components. Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion, it provides 50+ animated components that are production-ready and easy to integrate.

### 💡 Why Sera UI?

> "I'm a JavaScript library creator from Bangladesh, not a professional designer. But after building several front-end projects, I realized I needed my own UI system to streamline everything."

Sera UI is born from real development needs — built by a developer, for developers.

### 🌐 Live Demo
- **Website**: [seraui.seraprogrammer.com](https://seraui.com)
- **Documentation**: [seraui.seraprogrammer.com/docs](https://seraui.com/docs)

---

## ✨ Features

- **🎨 Modern Design**: Clean and beautiful UI components with contemporary aesthetics
- **⚡ High Performance**: Built with performance and accessibility in mind
- **🧱 Easy to Customize**: Easily themeable with Tailwind CSS
- **🔄 Smooth Animations**: Powered by Framer Motion for fluid interactions
- **🧩 Icons Included**: Lucide React icons integrated out of the box
- **📱 Fully Responsive**: Mobile-first design approach
- **♿ Accessible**: WCAG compliant with proper ARIA attributes
- **🌙 Dark Mode**: Built-in dark/light theme support
- **📦 CLI Support**: Easy installation via CLI or manual copy-paste
- **🔧 TypeScript**: Full TypeScript support with type definitions

---

## 🛠 Technology Stack

### Core Technologies
- **Framework**: Next.js 15.3.2 (Static Export)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **Animation**: Framer Motion 12.x
- **Icons**: Lucide React 0.510.x
- **Build Tool**: Turbopack (Next.js)

### Key Dependencies
- **React**: 19.0.0 (Latest)
- **Radix UI**: For accessible primitives
- **Class Variance Authority**: For component variants
- **Clsx & Tailwind Merge**: For conditional styling
- **MDX**: For documentation
- **Shiki**: For syntax highlighting

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Bundle Analyzer**: Performance monitoring
- **Lighthouse**: Performance auditing
- **TSX**: TypeScript execution

---

## 📁 Project Structure

```
seraui/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (landing)/               # Landing page
│   │   ├── docs/                    # Documentation pages
│   │   │   ├── [component]/         # Individual component docs
│   │   │   │   ├── page.mdx         # Component documentation
│   │   │   │   ├── [component].tsx  # Component implementation
│   │   │   │   └── [component]-view.tsx # Demo component
│   │   ├── standalone/              # Standalone component previews
│   │   ├── sponsor/                 # Sponsorship page
│   │   ├── globals.css              # Global styles
│   │   ├── layout.tsx               # Root layout
│   │   └── not-found.tsx            # 404 page
│   ├── components/
│   │   ├── analytics/               # Analytics components
│   │   ├── core/                    # Core UI components
│   │   ├── docs/                    # Documentation components
│   │   ├── performance/             # Performance monitoring
│   │   ├── seo/                     # SEO components
│   │   ├── site/                    # Site-specific components
│   │   └── ui/                      # Reusable UI components
│   ├── config/                      # Configuration files
│   ├── constants/                   # App constants
│   ├── contexts/                    # React contexts
│   ├── hooks/                       # Custom hooks
│   ├── lib/                         # Utility libraries
│   └── scripts/                     # Build and automation scripts
├── public/
│   ├── registry/                    # Component registry JSON files
│   ├── docs-md/                     # Generated markdown docs
│   └── assets/                      # Static assets
├── package.json                     # Dependencies and scripts
├── next.config.ts                   # Next.js configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
├── components.json                  # Shadcn/ui configuration
└── README.md                        # Project documentation
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Basic knowledge of React, TypeScript, and Tailwind CSS
- Familiarity with MDX for documentation

### Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/seraui/seraui.git
   cd seraui
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` to view the documentation site.

### Using Components in Your Project

#### CLI Installation (Recommended)
```bash
# Using npm
npx shadcn@latest add "https://seraui.com/registry/button.json"

# Using pnpm
pnpm dlx shadcn@latest add "https://seraui.com/registry/button.json"

# Using yarn
yarn dlx shadcn@latest add "https://seraui.com/registry/button.json"

# Using bun
bunx shadcn@latest add "https://seraui.com/registry/button.json"
```

#### Manual Installation
1. Browse the component library and find what you need
2. Copy the component code from the documentation
3. Paste into your project and customize as needed

---

## 🧩 Available Components

### UI Components (Essential)
- **Button**: Multiple variants with loading states and animations
- **Card**: Flexible card layouts with hover effects
- **Badge**: Status indicators and labels
- **Tabs**: Classic and fancy tab implementations
- **Dropdown**: Context menus and select dropdowns
- **Navbar**: Navigation bars with responsive design
- **Footer**: Site footers with multiple layouts
- **Dock**: macOS-style dock navigation
- **Marquee**: Scrolling text and content

### Form Components
- **Login**: Authentication forms with validation
- **Signin**: Sign-in forms with social providers
- **Password**: Password inputs with strength indicators
- **Forgot Password**: Password recovery forms
- **Two-Step**: Two-factor authentication
- **Multi Selector**: Advanced multi-select inputs
- **Search**: Search inputs with autocomplete

### Animation Components
- **Flip Words**: Animated text transitions
- **Text Reveal**: Progressive text reveals
- **Sparkles Text**: Animated sparkle effects
- **Decrypting**: Matrix-style text decryption
- **Shimmer**: Loading shimmer effects
- **Loaders**: Various loading animations
- **Retro**: Retro-style animations

### Layout Components
- **Masonry**: Pinterest-style grid layouts
- **Bento Grid**: Modern grid layouts
- **Carousel**: Image and content carousels
- **Accordion**: Collapsible content sections
- **Divider**: Visual content separators

### Specialized Components
- **Modal/Dialog**: Accessible modal dialogs
- **Toast**: Notification toasts
- **Tooltip**: Contextual tooltips
- **Combo Box**: Searchable select inputs
- **Avatar**: User profile images
- **Alert**: Status and notification alerts
- **Checkbox**: Custom checkbox inputs

*Total: 50+ components and growing!*

---

## 🔧 Development Workflow

### Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Component Development
npm run generate:components    # Auto-generate component registry
npm run build:registry        # Build component registry
npm run watch:components      # Watch for component changes
npm run build:md             # Build markdown documentation

# Performance & Analysis
npm run build:analyze         # Analyze bundle size
npm run perf:audit           # Run Lighthouse audit
npm run perf:bundle          # Analyze bundle composition
npm run perf:optimize        # Optimize build output
```

### Adding New Components

1. **Create Component Folder**
   ```
   src/app/docs/[component-name]/
   ├── page.mdx                 # Documentation
   ├── [component-name].tsx     # Implementation
   └── [component-name]-view.tsx # Demo
   ```

2. **Update Navigation**
   Add to `src/constants/navigation.ts`

3. **Build Registry**
   ```bash
   npm run build:registry
   ```

### Component Development Guidelines

- Use TypeScript for type safety
- Follow existing patterns and naming conventions
- Use `cn()` utility for conditional classes
- Ensure accessibility with proper ARIA attributes
- Support both light and dark themes
- Include comprehensive documentation
- Add interactive demos

---

## 🏗 Build System

### Static Export Configuration
The project uses Next.js static export for optimal performance:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: "export",           // Static export
  trailingSlash: false,
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-icons",
    ],
    scrollRestoration: true,
  },
};
```

### Automated Build Process

1. **Component Generation**: Auto-generates component registry
2. **Markdown Processing**: Converts MDX to markdown for API access
3. **Bundle Optimization**: Splits chunks for optimal loading
4. **Performance Monitoring**: Integrated bundle analysis

### Registry System
Components are automatically registered in JSON format for CLI consumption:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "button",
  "title": "Button",
  "description": "A customizable button component...",
  "type": "registry:ui",
  "dependencies": [],
  "files": [...]
}
```

---

## ⚡ Performance Optimizations

### Bundle Optimization
- **Code Splitting**: Automatic chunk splitting for optimal loading
- **Tree Shaking**: Eliminates unused code from bundles
- **Package Optimization**: Optimized imports for major libraries
- **Static Export**: Pre-rendered pages for fastest loading

### Performance Monitoring
- **Bundle Analyzer**: Integrated webpack bundle analysis
- **Lighthouse Integration**: Automated performance auditing
- **Web Vitals**: Real-time performance metrics
- **Performance Monitor**: Custom performance tracking

### SEO & Accessibility
- **Meta Tags**: Comprehensive SEO meta tags
- **Structured Data**: JSON-LD structured data
- **Open Graph**: Social media optimization
- **Accessibility**: WCAG 2.1 AA compliance
- **Semantic HTML**: Proper HTML5 semantics

### Loading Optimizations
- **Image Optimization**: Custom image loader for static export
- **Font Optimization**: Optimized font loading with Geist
- **Resource Preloading**: Critical resource preloading
- **Lazy Loading**: Component and route-based lazy loading

---

## 🎨 Theming & Customization

### Tailwind CSS Integration
Sera UI is built on Tailwind CSS v4, providing:
- **CSS Variables**: Dynamic theming support
- **Dark Mode**: Built-in dark/light theme switching
- **Custom Colors**: Easily customizable color palette
- **Responsive Design**: Mobile-first responsive utilities

### Theme Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Custom color palette
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        // ... more colors
      },
      animation: {
        // Custom animations
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      }
    }
  }
}
```

### Component Customization
- **Variant System**: Class Variance Authority for component variants
- **CSS Variables**: Dynamic styling with CSS custom properties
- **Tailwind Merge**: Intelligent class merging for overrides
- **Conditional Styling**: CLSX for conditional class application

---

## 🧪 Testing & Quality Assurance

### Code Quality
- **TypeScript**: Full type safety and IntelliSense
- **ESLint**: Comprehensive linting rules
- **Prettier**: Consistent code formatting
- **Strict Mode**: React strict mode enabled

### Performance Testing
- **Lighthouse**: Automated performance audits
- **Bundle Analysis**: Regular bundle size monitoring
- **Web Vitals**: Core web vitals tracking
- **Load Testing**: Performance under various conditions

### Accessibility Testing
- **ARIA Compliance**: Proper ARIA attributes
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader**: Screen reader compatibility
- **Color Contrast**: WCAG color contrast compliance

---

## 🤝 Contributing

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-component`
3. Make your changes following the guidelines
4. Test thoroughly across different browsers and devices
5. Submit a pull request with detailed description

### Contribution Guidelines
- Follow existing code patterns and conventions
- Include comprehensive documentation
- Add interactive demos for new components
- Ensure accessibility compliance
- Test in both light and dark modes
- Update navigation and registry files

### Component Checklist
- [ ] TypeScript implementation with proper types
- [ ] Responsive design (mobile-first)
- [ ] Dark/light mode support
- [ ] Accessibility features (ARIA, keyboard navigation)
- [ ] Interactive documentation with examples
- [ ] Props table and usage examples
- [ ] Registry entry for CLI installation

---

## 📄 License & Legal

### MIT License
Sera UI is released under the MIT License, allowing:
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

### Copyright
Copyright (c) 2025 Sera UI. All rights reserved.

### Security
For security vulnerabilities, contact: [chello@seraui.com](mailto:chello@seraui.com)

---

## 🌟 Community & Support

### Get Help
- **Discord**: [Join our Discord server](https://discord.gg/XqQkbTptvJ)
- **Twitter/X**: [@pimjoHQ](https://x.com/pimjoHQ)
- **GitHub Discussions**: [Community discussions](https://github.com/seraui/seraui/discussions)
- **Issues**: [Report bugs](https://github.com/seraui/seraui/issues)

### Stay Updated
- **Product Hunt**: [Featured on Product Hunt](https://www.producthunt.com/products/sera-ui)
- **Newsletter**: Subscribe for updates and new components
- **Blog**: Development insights and tutorials

---

## 🚀 Roadmap

### Upcoming Features
- [ ] More animation components
- [ ] Advanced form components
- [ ] Data visualization components
- [ ] Mobile-specific components
- [ ] Component playground
- [ ] Figma design system
- [ ] Storybook integration
- [ ] Vue.js support

### Version History
- **v0.1.0**: Initial release with 50+ components
- **Future**: Continuous updates and new components

---

## 📊 Project Statistics

- **Components**: 50+ and growing
- **Dependencies**: Carefully curated for minimal bundle size
- **Bundle Size**: Optimized for performance
- **Browser Support**: Modern browsers (ES2017+)
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: 90+ Lighthouse score

---

<div align="center">
  <h2>🎉 Thank You!</h2>
  <p>Thank you for using Sera UI! We're excited to see what you build with it.</p>

  <p>
    <strong>Built with ❤️ by developers, for developers</strong>
  </p>

  <p>
    <a href="https://seraui.com">Visit Website</a> •
    <a href="https://github.com/seraui/seraui">GitHub</a> •
    <a href="https://discord.gg/XqQkbTptvJ">Discord</a>
  </p>
</div>