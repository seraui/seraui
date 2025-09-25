# Badges 
A comprehensive collection of 30+ customizable and interactive badge components with stunning glassy effects, animations, and modern styling.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/badge/badge-view.tsx`

## Installation

You can add this component to your project using the CLI or by manually copying the code.

    CLI
    Manual

    ```bash
npx shadcn@latest add badge.json
```

    Code available at: `src/app/docs/badge/badge.tsx`

## Usage
after installing the component, import it into your page or component file. The `Badge`
component is the main component that you will use. It has many props that you can use to customize it.

```tsx

const BadgeView = () => {
  return (
    <>
      Badge
    
  )
}
```

## Props

The Badge component accepts the following props for comprehensive customization:

) => void",
    description: "Callback when dismiss button is clicked"
  },
  {
    name: "onHover",
    type: "(event: MouseEvent) => void",
    description: "Callback when badge is hovered"
  },
  {
    name: "onFocus",
    type: "(event: React.FocusEvent) => void",
    description: "Callback when badge receives focus"
  },
  {
    name: "onClick",
    type: "(event: MouseEvent) => void",
    description: "Makes badge clickable as a button"
  },
  {
    name: "href",
    type: "string",
    description: "Makes badge a link to the specified URL"
  },
  {
    name: "top",
    type: "string | number",
    description: "Top position for absolute/fixed positioned badges"
  },
  {
    name: "right",
    type: "string | number",
    description: "Right position for absolute/fixed positioned badges"
  },
  {
    name: "bottom",
    type: "string | number",
    description: "Bottom position for absolute/fixed positioned badges"
  },
  {
    name: "left",
    type: "string | number",
    description: "Left position for absolute/fixed positioned badges"
  },
  {
    name: "zIndex",
    type: "number",
    description: "Z-index for layering positioned badges"
  },
  {
    name: "aria-label",
    type: "string",
    description: "Accessibility label for screen readers"
  },
  {
    name: "aria-describedby",
    type: "string",
    description: "ID of element that describes the badge"
  },
  {
    name: "role",
    type: "string",
    description: "ARIA role for accessibility"
  }
]} />

### Examples

Here are some examples of how to use different props:

```tsx
// Basic badge with size and shape

  Large Pill Badge

// Badge with icons and animation
}
  iconRight={}
  animation="pulse"
  glow
>
  Premium Feature

// Dismissible badge with notification count
 console.log('Dismissed')}
  className="bg-red-100 text-red-800"
>
  Notifications

// Clickable badge with glass effect
 alert('Clicked!')}
  blur="md"
  shadow="lg"
  className="bg-white/20 backdrop-blur-md"
>
  Click Me

// Positioned badge

  New

```

---

**Component Path:** `badge/page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
