# Glow Button

A visually striking button component with an animated glow effect that creates an engaging hover interaction. Perfect for call-to-action buttons and highlighting important actions in your interface.

## Description

The Glow Button features a subtle glow animation that intensifies on hover, creating a modern and interactive user experience. The component maintains accessibility standards while providing eye-catching visual feedback.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/glow-button/glow-button.tsx`

## Customization

### Adding New Color Variants

You can easily add new color variants by extending the `variants` object in the component. Each variant requires both light and dark theme configurations.

```tsx
const variants = {
  // Existing variants...
  purple: {
    light: {
      outerGlow: "rgba(147, 51, 234, 0.4)",
      blobGlow: "rgba(147, 51, 234, 0.6)",
      blobHighlight: "#a855f7",
      blobShadow: "rgba(147, 51, 234, 0.25)",
      innerGlow: "rgba(147, 51, 234, 0.1)",
      innerHighlight: "rgba(196, 181, 253, 0.15)",
      outerBg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)",
      innerBg: "linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)",
      textColor: "#581c87",
    },
    dark: {
      outerGlow: "rgba(255, 230, 255, 0.35)",
      blobGlow: "rgba(128, 0, 255, 0.5)",
      blobHighlight: "#bf40bf",
      blobShadow: "rgba(128, 0, 255, 0.18)",
      innerGlow: "rgba(128, 0, 255, 0.07)",
      innerHighlight: "rgba(191, 64, 191, 0.1)",
      outerBg: "radial-gradient(circle 80px at 80% -10%, #ffffff, #181b1b)",
      innerBg: "radial-gradient(circle 80px at 80% -50%, #777777, #0f1111)",
      textColor: "#ffffff",
    },
  },
};
```

### Color Properties Explained

Each variant contains the following customizable properties:

- **outerGlow**: The outer shadow/glow effect around the button
- **blobGlow**: The main glow color for the animated blob effect
- **blobHighlight**: The highlight color within the blob gradient
- **blobShadow**: The shadow cast by the glow blob
- **innerGlow**: Subtle inner glow effect
- **innerHighlight**: Inner highlight for depth
- **outerBg**: Background gradient for the button border
- **innerBg**: Background gradient for the button content area
- **textColor**: Text color for the button label

### Usage with Custom Colors

```tsx
// Using built-in variants
Click Me
Subscribe
Success

// After adding purple variant
Custom Purple
```

### TypeScript Interface Update

Don't forget to update the TypeScript interface when adding new variants:

```tsx
interface GlowButtonProps {
  children: React.ReactNode;
  variant?: "blue" | "pink" | "green" | "purple"; // Add your new variant here
}
```

---

**Component Path:** `glow-button\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
