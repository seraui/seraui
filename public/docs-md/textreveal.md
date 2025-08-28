# Text Reveal Animation 

A beautiful text reveal animation component that creates a smooth, word-by-word reveal effect with blur and fade transitions. Perfect for hero sections, quotes, and attention-grabbing text content.

## Preview

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/textreveal/textreveal.tsx`

## Features

- ✨ **Smooth Animation**: Word-by-word reveal with staggered timing
- 🌫️ **Blur Effect**: Elegant blur-to-clear transition for each word
- 🎯 **Customizable**: Easy to modify timing, text, and styling
- � **Responsive**: Works perfectly on all screen sizes
- ⚡ **Performance**: Optimized with Framer Motion for smooth 60fps animations
- 🎨 **Flexible**: Supports any text content and styling

## Installation

You can add this component to your project using the CLI or by manually copying the code.

    CLI
    Manual

    ```bash
npx shadcn@latest add textreveal.json
```

    Code available at: `src/app/docs/textreveal/textreveal.tsx`

## Dependencies

This component requires `framer-motion` for animations. Install it if you haven't already:

```bash
npm install framer-motion
```

## Basic Usage

Import and use the TextReveal component in your React application:

```tsx

export default function App() {
  return (

  );
}
```

## Customization

### Custom Text Content

You can easily customize the text content by modifying the `textToAnimate` variable:

```tsx
const textToAnimate = "Your custom message goes here. Make it inspiring and memorable.";
```

### Animation Timing

Adjust the animation timing by modifying these values:

```tsx
// Container animation timing
const containerVariants = {
  visible: (i = 1) => ({
    transition: {
      staggerChildren: 0.1,    // Time between each word
      delayChildren: 0.04 * i  // Initial delay
    },
  }),
};

// Individual word animation
const childVariants = {
  visible: {
    transition: {
      duration: 0.8,        // Animation duration per word
      ease: "easeInOut",    // Easing function
    },
  },
};
```

### Styling Options

Customize the appearance by modifying the className and styles:

```tsx
// Main container styling

// Individual word spacing

```

## Advanced Examples

### Hero Section Implementation

```tsx
export function HeroSection() {
  return (

          Get Started

  );
}
```

### Quote Display

```tsx
export function InspirationalQuote() {
  return (

          — Anonymous

  );
}
```

## Animation Properties

## Browser Support

This component works in all modern browsers that support:
- CSS `filter: blur()`
- CSS Flexbox
- ES6+ JavaScript features
- Framer Motion (React 16.8+)

## Performance Tips

- The component automatically optimizes animations for 60fps
- Uses `transform` and `filter` properties for hardware acceleration
- Minimal DOM manipulation for smooth performance
- Consider using `will-change: transform` for very long text content

## Accessibility

The component maintains accessibility by:
- Preserving text content for screen readers
- Not interfering with keyboard navigation
- Maintaining semantic HTML structure
- Supporting reduced motion preferences (can be enhanced with `prefers-reduced-motion`)

## Troubleshooting

**Animation not working?**
- Ensure `framer-motion` is properly installed
- Check that the component is wrapped in a client component (`'use client'`)
- Verify CSS classes are available in your styling system

**Performance issues?**
- Reduce the number of words for very long text
- Adjust `staggerChildren` timing for faster reveals
- Consider using `transform3d` for better GPU acceleration

---

**Component Path:** `textreveal\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
