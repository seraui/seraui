# FlipWords

A dynamic text animation component that smoothly transitions between different words with elegant spring animations and blur effects. Perfect for creating engaging hero sections and dynamic content displays.

## Preview

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/flipwords/flipwords.tsx`

## Features

- **Smooth Animations**: Powered by Framer Motion with spring physics for natural movement
- **Character-by-Character Animation**: Each letter animates individually for a sophisticated effect
- **Customizable Timing**: Adjustable duration between word transitions
- **Blur Effects**: Elegant blur transitions during word changes
- **TypeScript Support**: Fully typed for better development experience
- **Responsive Design**: Works seamlessly across all screen sizes
- **Dark Mode Compatible**: Adapts to light and dark themes

## Installation

    CLI
    Manual

    ```bash
npx shadcn@latest add flipwords.json
```

    Code available at: `src/app/docs/flipwords/flipwords.tsx`

## Usage

After installing the component, import it into your page or component file. The `FlipWords` component requires a `words` array and accepts optional `duration` and `className` props.

```tsx

export default function MyComponent() {
  return (
    
      I love{" "}
      
      {" "}amazing experiences
    
  );
}
```

## Examples

### Basic Usage

```tsx

```

### Custom Duration

```tsx

```

### Styled with Custom Classes

```tsx

```

## API Reference

## Animation Details

The FlipWords component uses sophisticated animation techniques:

### Entry Animation
- **Opacity**: Fades in from 0 to 1
- **Y Position**: Slides up from 10px offset
- **Spring Physics**: Uses stiffness: 150, damping: 15, mass: 0.8

### Exit Animation
- **Opacity**: Fades out to 0
- **Position**: Moves up (-40px) and right (40px)
- **Scale**: Scales up to 2x size
- **Blur**: Applies 8px blur effect
- **Spring Physics**: Uses stiffness: 200, damping: 20

### Character Animation
- **Individual Letters**: Each character animates independently
- **Staggered Timing**: Letters appear with 0.05s delay between each
- **Word Staggering**: Multiple words have 0.3s delay between them
- **Blur to Focus**: Characters start blurred and sharpen on entry

## Customization

### Styling

The component accepts a `className` prop for custom styling:

```tsx

```

### Animation Timing

Adjust the `duration` prop to control how long each word is displayed:

```tsx
// Fast transitions (1.5 seconds)

// Slow transitions (5 seconds)

```

## Dependencies

This component requires the following dependencies:

- **framer-motion**: For smooth animations and transitions
- **react**: React 18 or higher
- **clsx** or **tailwind-merge**: For conditional class names (via utils)

## Best Practices

1. **Word Length**: Keep words relatively similar in length for better visual consistency
2. **Duration**: Use 2-4 seconds for optimal readability
3. **Context**: Works best in hero sections, headings, and call-to-action areas
4. **Accessibility**: Consider users with motion sensitivity - provide reduced motion alternatives
5. **Performance**: Limit to 3-6 words for optimal performance

## Troubleshooting

### Common Issues

**Animation not working**: Ensure Framer Motion is properly installed and imported.

**Layout shifts**: Use consistent word lengths or set a fixed width container.

**Performance issues**: Reduce the number of words or increase duration for better performance.

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

The component gracefully degrades in older browsers by showing static text without animations.

---

**Component Path:** `flipwords\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
