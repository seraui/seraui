# Divider

A versatile divider component for creating visual separation between content sections with customizable styles and orientations.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/divider/divider.tsx`

## Installation

    CLI
    Manual

    ```bash
npx shadcn@latest add divider.json
```

    Code available at: `src/app/docs/divider/divider.tsx`

## Features

- 🎨 **Multiple Variants**: Solid, dashed, dotted, and gradient styles
- 📐 **Flexible Orientation**: Horizontal and vertical dividers
- 🎯 **Customizable**: Adjustable thickness, color, and spacing
- ♿ **Accessible**: Proper ARIA attributes for screen readers
- 📱 **Responsive**: Works seamlessly across all device sizes

## Usage

### Basic Divider

```tsx

```

### With Custom Styling

```tsx

```

## Use Cases

### 1. Content Sections

Perfect for separating different content sections in articles or blog posts:

```tsx

    Introduction
    Welcome to our comprehensive guide...

    Getting Started
    Let's begin with the basics...

```

### 2. Navigation Menus

Separate navigation items or menu sections:

```tsx

  Home
  
  About
  
  Contact

```

### 3. Card Components

Create visual separation within cards:

```tsx

  User Profile
  john.doe@example.com

    Last Login
    2 hours ago

```

### 4. Form Sections

Organize form fields into logical groups:

```tsx

    Personal Information

    Address Details

```

### 5. Dashboard Widgets

Separate different metrics or widgets:

```tsx

    Total Users
    1,234

    Revenue
    $45,678

```

### 6. Comment Threads

Separate individual comments or replies:

```tsx

    John Doe
    Great article! Very informative.

    Jane Smith
    Thanks for sharing this resource.

```

### 7. Pricing Tables

Create clear separation between pricing tiers:

```tsx

    Basic
    $9/mo
    ...

    Pro
    $29/mo
    ...

```

## API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'solid' \| 'dashed' \| 'dotted' \| 'gradient'` | `'solid'` | Visual style of the divider |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction of the divider |
| `thickness` | `number` | `1` | Thickness in pixels |
| `color` | `string` | `'gray'` | Color of the divider |
| `opacity` | `number` | `1` | Opacity level (0-1) |
| `height` | `number` | - | Height for vertical dividers |
| `className` | `string` | - | Additional CSS classes |

## Best Practices

1. **Consistent Spacing**: Use consistent margins around dividers
2. **Semantic Usage**: Use dividers to enhance content hierarchy
3. **Accessibility**: Ensure sufficient color contrast
4. **Responsive Design**: Consider how dividers appear on mobile
5. **Visual Balance**: Don't overuse dividers - they should enhance, not clutter

## Examples in Real Applications

### E-commerce Product Page

```tsx

  Product Name
  $99.99

    Description
    Product description here...

    Customer Reviews
    {/* Reviews content */}

```

### Settings Panel

```tsx

    Account Settings
    {/* Account settings */}

    Privacy Settings
    {/* Privacy settings */}

    Notification Settings
    {/* Notification settings */}

```

---

**Component Path:** `divider\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
