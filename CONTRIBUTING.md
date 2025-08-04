# 👋 Contributing to **Seraui**

Welcome to **Seraui**! This guide provides step-by-step instructions for contributing high-quality React components to our design system.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Basic knowledge of React, TypeScript, and Tailwind CSS
- Familiarity with MDX for documentation

### Setup Instructions

1. **Fork & Clone the Repository**

  ```bash
  git clone https://github.com/YOUR_USERNAME/seraui.git
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

## 📁 Understanding the Project Structure

```
seraui/
├── src/
│   ├── app/
│   │   ├── docs/                    # Documentation pages
│   │   │   ├── button/              # Example: Button component
│   │   │   │   ├── page.mdx         # Main documentation page
│   │   │   │   ├── button.tsx       # Component implementation
│   │   │   │   └── button-view.tsx  # Demo/preview component
│   │   │   └── [component]/         # Other components follow same pattern
│   │   └── layout.tsx               # Root layout
│   ├── components/
│   │   ├── site/                    # Documentation site components
│   │   │   ├── code-block.tsx       # Code syntax highlighting
│   │   │   ├── component-renderer.tsx # Component preview renderer
│   │   │   └── tabs.tsx             # Tab navigation
│   │   └── ui/                      # Shared UI components
│   ├── constants/
│   │   └── navigation.ts            # Sidebar navigation configuration
│   ├── lib/
│   │   ├── utils.ts                 # Utility functions (cn, etc.)
│   │   └── code.ts                  # Code extraction for examples
│   └── ...
├── public/
│   └── registry/                    # Component registry JSON files
└── package.json
```

## 🎨 Adding a New Component

Follow these steps to add a new component to Seraui:

### Step 1: Create Component Folder

1. Navigate to `src/app/docs/`
2. Create a folder with your component name (e.g., `button`)
3. Create these files:
  ```
  src/app/docs/button/
  ├── page.mdx            # Documentation
  ├── button.tsx          # Component
  └── button-view.tsx     # Demo
  ```

### Step 2: Create Documentation Page

Create `page.mdx`:

````mdx
import { CodeBlock } from "@/components/site/code-block";
import { ComponentRenderer } from "@/components/site/component-renderer";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/site/tabs.tsx";
import ButtonView from "./button-view";

# Button

A customizable button component with ripple effects.

<Tabs defaultValue="preview">
  <TabsList>
   <TabsTrigger value="preview">Preview</TabsTrigger>
   <TabsTrigger value="code">Code</TabsTrigger>
  </TabsList>
  <TabsContent value="preview">
   <ComponentRenderer component={<ButtonView />} />
  </TabsContent>
  <TabsContent value="code">
   <CodeBlock filePath="src/app/docs/button/button.tsx" />
  </TabsContent>
</Tabs>

## Usage

```tsx
import Button from "./button";

export function Example() {
  return <Button variant="outline">Click me</Button>;
}
```

## Props

| Prop      | Type                                | Default     | Description        |
| --------- | ----------------------------------- | ----------- | ------------------ |
| `variant` | `'default' \| 'outline' \| 'ghost'` | `'default'` | Button style       |
| `size`    | `'sm' \| 'default' \| 'lg'`         | `'default'` | Button size        |
| `loading` | `boolean`                           | `false`     | Show loading state |
````

### Step 3: Create Component

Create `button.tsx`:

```tsx
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, loading, ...props }, ref) => {
   const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-200 hover:bg-slate-100",
    ghost: "hover:bg-slate-100"
   };

   const sizes = {
    sm: "h-9 px-3 text-sm",
    default: "h-10 px-4",
    lg: "h-11 px-8"
   };

   return (
    <button
      className={cn(
       "inline-flex items-center justify-center rounded-md font-medium transition-colors",
       "focus:outline-none disabled:opacity-50",
       variants[variant],
       sizes[size],
       className
      )}
      disabled={loading}
      ref={ref}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
   );
  }
);

Button.displayName = "Button";
export default Button;
```

### Step 4: Create Demo Component

Create `button-view.tsx`:

```tsx
import Button from "./button";

export default function ButtonView() {
  return (
   <div className="flex gap-4 justify-center p-8">
    <Button variant="default">Default</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button loading>Loading</Button>
   </div>
  );
}
```

### Step 5: Add to Navigation

Update `src/constants/navigation.ts`:

```typescript
{
  label: 'Button',
  href: '/docs/button',
  badge: "New" // or "Updated"
}
```

## 🧪 Testing Your Component

### Essential Tests

1. Run `npm run dev` and navigate to `http://localhost:3000/docs/button`
2. Test all variants and states
3. Check responsive design
4. Test light/dark modes
5. Verify accessibility with screen readers

### Code Quality

- Use TypeScript for type safety
- Follow existing patterns
- Use `cn()` utility for classes
- Add proper ARIA labels
- Test in all major browsers

## 📝 Documentation Standards

### Required Elements

- Clear description
- Interactive preview
- Copy-paste ready code
- Props table with types
- Usage examples

### Code Example Format

```typescript
// ✅ Good - Complete example
import Button from './button'

export function Example() {
  return <Button variant="outline">Click me</Button>
}

// ❌ Bad - Incomplete
<Button>Click</Button>
```

## 🎯 Component Guidelines

### Code Standards

- Use `cn()` utility for conditional classes
- Forward refs for DOM access
- Use TypeScript interfaces
- Follow existing naming conventions

### Styling

- Use Tailwind CSS classes
- Support dark mode
- Ensure responsive design
- Smooth animations with `transition-*`

### Accessibility

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation
- Screen reader support

## 🔍 Before Submitting

### Checklist

- [ ] Works in light/dark mode
- [ ] All states tested (hover, focus, disabled)
- [ ] Responsive design
- [ ] TypeScript types correct
- [ ] Documentation complete
- [ ] Navigation updated
- [ ] No console errors

### Pull Request

- Descriptive title
- Include screenshots
- Describe functionality
- List breaking changes

## 💡 Tips

- Study existing components first
- Keep components simple and focused
- Consider edge cases
- Test on mobile devices
- Ask for feedback early

---

**Happy coding!** 🎉 Thank you for contributing to **Seraui**!
