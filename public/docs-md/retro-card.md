# Retro Card

A nostalgic card component with a retro aesthetic featuring bold borders, vibrant colors, and interactive shadow effects.

## Features

- **Retro Design**: Bold black borders with vibrant accent colors
- **Interactive Shadows**: Hover effects that expand the shadow and lift the card
- **Flexible Content**: Supports any React children
- **Accessible**: Built with proper semantic HTML and keyboard navigation
- **Customizable**: Extends standard div props for easy customization

## Installation

    CLI
    Manual

    ```bash
npx shadcn@latest add retroCard.json
```

    Code available at: `src/app/docs/retro-card/retro-card.tsx`

## Usage

### Basic Usage

```tsx

export default function Example() {
  return (
    
      Hello Retro World!
      This is a basic retro card.
    
  );
}
```

### With Custom Styling

```tsx

    CUSTOM CARD
    With additional styling

```

## Examples

### Basic Examples

Perfect for simple content display, statistics, and status indicators. These examples show the fundamental usage patterns.

```tsx
// Simple Content Card

      HELLO WORLD

      A simple retro card with basic content.

// Stats Card

    1,337
    
      USERS ONLINE

    ↑ 12% from yesterday

```

### Form Examples

Ideal for authentication interfaces and data collection forms with retro styling.

```tsx
// Login Form

      LOGIN

        Email

      Access System

```

### Profile & Info Cards

Great for displaying user information, product details, and notifications with retro flair.

```tsx
// User Profile Card

        JD

      JOHN DOE
      
        Full Stack Developer

      📧 john@dev.com

```

### Gaming & Interactive

Perfect for retro gaming interfaces, scoreboards, and terminal-style displays.

```tsx
// Terminal-style Card

    $ system --status
    
      CPU: 45% usage
      RAM: 2.1GB / 8GB
      DISK: 156GB free
      NET: Connected

      █

```

### Interactive Features

Showcase hover effects, interactive buttons, and progress indicators.

```tsx
// Progress Card

    LOADING...

      67% Complete

```

## Use Cases

### 1. Login Forms
Perfect for creating retro-styled authentication interfaces with a nostalgic computing feel. The bold borders and monospace fonts create an authentic terminal-like experience.

### 2. Dashboard Cards
Use for displaying metrics, stats, or information in a retro dashboard layout. The bright accent colors make important data stand out.

### 3. Product Showcases
Great for highlighting products or features with a unique vintage aesthetic. The card's distinctive style draws attention to key content.

### 4. Notification Cards
Ideal for alerts, messages, or status updates with retro styling. The visual design makes notifications feel less intrusive and more engaging.

### 5. Profile Cards
Display user information, team members, or contact details with retro flair. Perfect for developer portfolios or team pages.

### 6. Game UI Elements
Perfect for retro gaming interfaces, scoreboards, or game menus. The aesthetic matches classic arcade and computer game designs.

## Props

## Styling

The RetroCard uses a distinctive visual style:

- **Border**: 2px solid black border
- **Background**: Bright green (#00ff84) accent with white content area
- **Shadow**: Dynamic shadow that grows on hover (4px → 8px)
- **Animation**: Smooth transitions with slight upward movement on hover
- **Typography**: Works best with monospace fonts for authentic retro feel

## Accessibility

- Supports keyboard navigation
- Maintains proper focus states
- Compatible with screen readers
- Follows semantic HTML structure

## Browser Support

Works in all modern browsers that support CSS transforms and transitions.

---

**Component Path:** `retro-card\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
