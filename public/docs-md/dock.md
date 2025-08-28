# Dock 

A macOS-style dock component with smooth magnification animations and glassmorphism effects. Perfect for navigation bars, quick access toolbars, and application launchers with an elegant, interactive design.

## Preview

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/dock/dock.tsx`

## Installation

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/dock/simple-dock.tsx`

### Colorful Dock

A vibrant dock with gradient backgrounds and colorful icons for a more playful design.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/dock/colorful-dock.tsx`

### Minimal Dock

An ultra-minimal dock with no background, perfect for clean interfaces.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/dock/minimal-dock.tsx`

### Floating Dock

A floating dock with enhanced shadow effects and rounded corners.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/dock/floating-dock.tsx`

## Basic Usage Examples

### Simple Implementation

```tsx

```

### With Separator

```tsx

  {/* Separator */}

```

### With Click Handlers

```tsx

   console.log('Home clicked')}>

   alert('Action triggered!')}>

```

## API Reference

### Dock Component

### DockIcon Component

 void",
      description: "Optional click handler function",
      required: false,
    },
    {
      name: "mouseX",
      type: "MotionValue",
      description: "Internal prop for mouse tracking (automatically injected)",
      required: false,
    },
  ]}
/>

## Animation Properties

| Property | Value | Description |
|----------|-------|-------------|
| **Icon Size** | 36px | Default size of dock icons |
| **Magnification** | 60px | Maximum size when magnified |
| **Distance** | 140px | Mouse proximity distance for magnification |
| **Spring Config** | mass: 0.1, stiffness: 150, damping: 12 | Animation spring physics |

### Visual Effects
- **Backdrop Blur**: 16px blur effect with `backdrop-blur-lg` class
- **Glassmorphism**: Semi-transparent backgrounds (white/80% in light, black/50% in dark)
- **Border Styling**: Subtle borders with 10% opacity for depth
- **Rounded Corners**: 16px border radius for modern appearance

## Customization

### Styling the Dock Container

You can customize the dock's appearance by modifying the classes in the `Dock` component:

```tsx
// Custom gradient dock

// Solid color dock

// Minimal transparent dock

```

### Icon Styling

Style your icons with consistent classes for best results:

```tsx

```

### Theme Integration

The component automatically adapts to your theme system using CSS classes:

```tsx

const [isDark, setIsDark] = useState(false);

// Theme toggle icon
 setIsDark(!isDark)}>
  {isDark ? (
    
  ) : (
    
  )}

```

### Color Variations

Create different color schemes for your dock:

```tsx
// Blue theme dock

// Green theme dock

// Purple theme dock

```

## Accessibility

The dock component follows accessibility best practices:

- **Keyboard Navigation**: All dock icons are focusable and can be activated with Enter or Space
- **Screen Reader Support**: Proper semantic HTML with meaningful link text
- **ARIA Labels**: Use `aria-label` or `title` attributes for better screen reader experience
- **Focus Management**: Clear focus indicators for keyboard users
- **Color Contrast**: Ensure sufficient contrast ratios for text and icons

```tsx

```

## Use Cases

### Application Launcher
Perfect for creating desktop-style application launchers:

```tsx

```

### Navigation Bar
Use as a primary navigation component:

```tsx

```

### Quick Actions Toolbar
Ideal for frequently used actions:

```tsx

```

### macOS-Style Desktop
Perfect for creating desktop environments or OS interfaces:

```tsx

```

## Troubleshooting

### Common Issues

**Magnification not working**: Ensure Framer Motion is properly installed and the `mouseX` prop is being passed correctly to `DockIcon` components.

**Icons not displaying**: Check that your icon components are properly imported and have the correct className props.

**Performance issues**: If you have many icons, consider optimizing by reducing the number of animated elements or adjusting spring physics values.

**Theme not switching**: Verify that your theme provider is properly configured and the dark/light mode classes are applied correctly.

### Performance Optimization

For better performance with many dock icons:

```tsx
// Reduce spring stiffness for smoother animation
const width = useSpring(widthSync, { mass: 0.2, stiffness: 100, damping: 15 });

// Optimize distance calculation
const iconDistance = 100; // Smaller distance for less computation
```

### Browser Compatibility

The dock component works in all modern browsers that support:
- CSS backdrop-filter (for glassmorphism effects)
- Framer Motion animations
- CSS transforms and transitions

For older browsers, consider providing fallbacks:

```tsx
// Fallback for browsers without backdrop-filter support
className="bg-white/80 dark:bg-black/50 [backdrop-filter:blur(16px)] supports-[backdrop-filter]:bg-white/60"
```

---

**Component Path:** `dock\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
