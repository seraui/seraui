# GlitchVault Card 

A dynamic interactive component that creates a matrix-style glitch effect on hover. Perfect for adding cyberpunk aesthetics to profiles, cards, and interactive elements.

### Profile Card
A sleek profile card with cyan glitch effects perfect for showcasing team members or user profiles.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/glitchvault/glitchvault-view.tsx`

### Project Card
A notification-style card with red glitch effects, ideal for status updates or project announcements.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/glitchvault/glitchvault-card.tsx`

## Installation

You can add this component to your project using the CLI or by manually copying the code.

    CLI
    Manual

    Code available at: `src/app/docs/glitchvault/glitchvault.tsx`

## Basic Usage

```tsx

export default function MyComponent() {
  return (

        Your Content Here
        Any content can go inside the GlitchVault

  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to display inside the component |
| `className` | `string` | - | Additional CSS classes for styling |
| `glitchColor` | `string` | `"#0AF0F0"` | Hex color for the glitch effect |
| `glitchRadius` | `number` | `120` | Radius of the mouse interaction area |
| `performanceMode` | `"high" \| "balanced" \| "low"` | `"balanced"` | Performance optimization level |
| `disabled` | `boolean` | `false` | Disable the glitch effect |
| `theme` | `"light" \| "dark" \| "auto"` | - | Theme variant (future feature) |

## Examples

### Different Colors
```tsx
// Cyan glitch effect (default)

  Cyan Effect

// Red glitch effect

  Red Effect

// Green glitch effect

  Green Effect

```

### Performance Modes
```tsx
// High performance mode (more responsive)

  High Performance

// Low performance mode (better for mobile)

  Low Performance

```

### Disabled State
```tsx
// Disable the glitch effect

  No Glitch Effect

```

---

**Component Path:** `glitchvault/page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
