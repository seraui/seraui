# Verify Badge

A customizable verification badge component featuring SVG icons, glassmorphism effects, and variants for basic, gold, and premium statuses for profile, statement, and more verification types.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/verify-badge/verify-badge.tsx`

{/* Optional */}
#### Verify Profile

    *Interactive component preview available in the web version.*} />

## Usage

```tsx

export function Example() {
  return (

  );
}
```

## Props

 void",
    description: "Callback function triggered on badge click"
  },
  {
    name: "position",
    type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'",
    default: "'top-right'",
    description: "Floating position for the badge"
  }
]} />

## Accessibility

- Semantic `div` with `role="button"` and `tabIndex` for clickable badges
- ARIA-compatible for screen readers
- Keyboard navigation support with `onClick`

## Styling

- Uses Tailwind CSS for responsive design
- Supports dark mode with `dark:` classes
- Glassmorphic effects with `backdrop-blur-md`
- Smooth hover animations with `transition-all`

---

**Component Path:** `verify-badge/page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
