# Liquid Glass Component 

A sophisticated glassmorphism React component that creates stunning liquid glass effects using advanced SVG filters. Features chromatic aberration, customizable distortion, and multiple visual variants for modern UI design.

## Preview

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/liquid-glass/liquid-glass.tsx`

## Features

- **Advanced SVG Filters**: Chromatic aberration and displacement mapping for realistic glass effects
- **Multiple Variants**: Subtle, default, bold, and ghost presets with customizable parameters
- **Responsive Design**: Automatically adapts to container size changes
- **Cross-browser Support**: Fallback rendering for browsers without SVG filter support
- **Dark Mode Compatible**: Automatic theme detection and appropriate styling
- **Accessibility**: Focus-visible states and proper ARIA support
- **TypeScript**: Full type safety with comprehensive prop interfaces

## Usage

### Basic Glass Button

```tsx

function App() {
  return (
     console.log('Clicked!')}
    >
      Click me
    
  );
}
```

## Variants

The component includes four built-in variants:

- **subtle**: Minimal glass effect with low opacity and gentle distortion
- **default**: Balanced glass effect suitable for most use cases
- **bold**: Strong glass effect with high saturation and pronounced distortion
- **ghost**: Transparent variant with minimal background opacity

## Props

### GlassButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'subtle' \| 'default' \| 'bold' \| 'ghost'` | `'default'` | Visual variant preset for the glass effect |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon'` | `'md'` | Button size variant |
| `children` | `React.ReactNode` | `undefined` | Button content |
| `onClick` | `MouseEventHandler` | `undefined` | Click event handler |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `className` | `string` | `''` | Additional CSS classes |
| `textClassName` | `string` | `'text-white font-semibold'` | CSS classes for button text |

## Browser Support

The component automatically detects browser capabilities and provides appropriate fallbacks:

- **Modern browsers**: Full SVG filter support with chromatic aberration
- **Safari/Firefox**: Backdrop filter fallback with blur and saturation
- **Legacy browsers**: Static glass appearance with border and shadow effects

## Performance Considerations

- SVG filters are GPU-accelerated in modern browsers
- ResizeObserver efficiently handles container size changes
- Memoized calculations prevent unnecessary re-renders
- Automatic cleanup of event listeners and observers

## Accessibility

- Focus-visible states for keyboard navigation
- Proper ARIA attributes for interactive elements
- High contrast support in fallback modes
- Screen reader compatible content structure

---

**Component Path:** `liquid-glass/page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
