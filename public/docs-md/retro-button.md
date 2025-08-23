# Retro Button Components

A comprehensive collection of retro-styled button components with hard shadows, vibrant colors, and smooth hover animations. Perfect for modern applications with a nostalgic twist.

## Installation

```bash
npm install class-variance-authority
```

    CLI
    Manual

    ```bash
npx shadcn@latest add retroButton.json
```

    Code available at: `src/app/docs/retro-button/retro-btn.tsx`

## Basic Usage

```tsx

export default function MyComponent() {
  return (
    
      Click me!
    
  );
}
```

## API Reference

### Props

### Variants

- **default**: Primary action button with bright green background and hard shadow
- **secondary**: Alternative styling with gray background
- **outline**: Transparent button with colored border that fills on hover
- **link**: Minimal styling for text-based actions

### Sizes

- **sm**: Small button (px-4 py-2, text-sm)
- **md**: Medium button (px-6 py-2.5, text-base)
- **lg**: Large button (px-8 py-4, text-lg)
- **icon**: Square button for icons (h-12 w-12)

## Examples

### Default Buttons

Primary action buttons with the signature retro styling and hard shadow effects.

```tsx

export default function DefaultButtons() {
  return (
    
      Large Button
      Medium Button
      Small Button
      Disabled
    
  );
}
```

### Secondary Buttons

Alternative styling for secondary actions with gray background.

```tsx

export default function SecondaryButtons() {
  return (
    
      Large Secondary
      Medium Secondary
      Small Secondary
      Disabled
    
  );
}
```

### Outline Buttons

Transparent buttons with colored borders that fill on hover.

```tsx

export default function OutlineButtons() {
  return (
    
      Large Outline
      Medium Outline
      Small Outline
      Disabled
    
  );
}
```

### Icon Buttons

Square buttons designed specifically for icons and single actions.

```tsx

const StarIcon = () => (

);

export default function IconButtons() {
  return (

  );
}
```

### Link Buttons

Minimal styling for text-based actions and navigation.

```tsx

export default function LinkButtons() {
  return (
    
      Primary Link
      Disabled Link
    
  );
}
```

### Loading States

Interactive buttons with loading spinners and disabled states during async operations.

```tsx

export default function LoadingButtons() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (

        {isLoading ? "Loading..." : "Click to Load"}

        {isLoading ? "Processing..." : "Process Data"}

  );
}
```

### Buttons with Icons

Combining icons with text for enhanced user experience and visual clarity.

```tsx

const DownloadIcon = () => (

);

export default function ButtonsWithIcons() {
  return (

        Download File

        Add to Favorites

  );
}
```

### Form Actions

Common button combinations used in forms and dialogs.

```tsx

export default function FormButtons() {
  return (

        Submit Form

        Cancel

        Reset Form

  );
}
```

### Size Comparison

All available button sizes side by side for easy comparison.

```tsx

export default function SizeComparison() {
  return (
    
      Small
      Medium
      Large

  );
}
```

### Interactive Demo

Try clicking these buttons to see the retro hover and click animations in action.

## Styling

The retro button uses a hard shadow effect that moves when hovered, creating a distinctive 3D appearance. The color scheme features:

- **Primary Color**: `#00ff84` (bright green)
- **Text Color**: `#000000` (black on light backgrounds)
- **Border**: `2px solid #000000` (black border)
- **Shadow**: `4px 4px 0px 0px #000000` (hard black shadow)

### Dark Mode Support

The component automatically adapts to dark mode with white shadows instead of black ones.

## Accessibility

- All buttons include proper ARIA labels when used as icon buttons
- Focus states are clearly visible
- Disabled states are properly communicated to screen readers
- Color contrast meets WCAG guidelines

## Best Practices

1. Use `variant="default"` for primary actions
2. Use `variant="secondary"` for secondary actions
3. Use `variant="outline"` for less prominent actions
4. Use `variant="link"` for navigation or text-based actions
5. Always provide `aria-label` for icon-only buttons
6. Use the `loading` prop for async operations
7. Combine with icons using the `gap-2` className for proper spacing

---

**Component Path:** `retro-button\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
