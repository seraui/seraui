# 3D Card Component

A highly customizable 3D card component with interactive hover effects, glow animations, and parallax transformations.

## Examples

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/threed-card/threed-card.tsx`

## Features

- **3D Rotation Effects**: Smooth mouse-following rotation on X and Y axes
- **Dynamic Glow**: Radial gradient glow that follows mouse position
- **Shadow Animation**: Realistic shadow that responds to card rotation
- **Parallax Content**: Optional 3D depth effect for card content
- **Background Images**: Support for dynamic background images with hover transitions
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance Optimized**: Uses React.memo and useCallback for optimal rendering

## How to Use

### Basic Usage

```tsx

function MyComponent() {
  return (

        Card Title
        Card content goes here

  );
}
```

### With Image Content

```tsx

function ImageCard() {
  return (

  );
}
```

### Advanced Configuration

```tsx

function AdvancedCard() {
  return (

        Premium Card
        Enhanced 3D effects

  );
}
```

### Minimal Configuration

```tsx

function MinimalCard() {
  return (

        Simple 3D card with minimal effects

  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | Content to be rendered inside the card |
| className | string | '' | Additional CSS classes for the card container |
| maxRotation | number | 10 | Maximum rotation angle in degrees (0-45 recommended) |
| glowOpacity | number | 0.2 | Opacity of the glow effect (0-1) |
| shadowBlur | number | 30 | Blur radius for the card shadow in pixels |
| parallaxOffset | number | 40 | 3D depth offset for content in pixels |
| transitionDuration | string | '0.6s' | CSS transition duration for animations |
| backgroundImage | string \| null | null | URL for background image that appears on hover |
| enableGlow | boolean | true | Enable/disable the radial glow effect |
| enableShadow | boolean | true | Enable/disable the dynamic shadow effect |
| enableParallax | boolean | true | Enable/disable the 3D parallax effect for content |

---

**Component Path:** `threed-card\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
