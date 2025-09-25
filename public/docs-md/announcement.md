# Announcement 

A versatile announcement component that displays important messages with different visual styles and states. Perfect for notifications, alerts, and call-to-action messages.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/announcement/announcement-view.tsx`

## Installation

    CLI
    Manual

    ```bash
npx shadcn@latest add announcement.json
```

    Code available at: `src/app/docs/announcement/announcement.tsx`

## Usage

```tsx

function AnnouncementView() {
  return (
        
          New feature added
        
  );
}
```

## Features

- Multiple variants (default, success, error, warning, info, gradient)
- Dark mode support
- Keyboard accessibility
- Disabled state
- Click interactions
- Smooth animations and transitions

## variant
The visual style variant of the announcement. Can be one of the following:

- `"default"`: Default style
- `"success"`: Success style
- `"error"`: Error style
- `"warning"`: Warning style
- `"info"`: Info style
- `"gradient"`: Gradient style

```tsx

  New feature added

  Update successful

  Action failed

  Please check input

  For your information

  Announcing Gradients!

  Disabled state

```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default"` \| `"success"` \| `"error"` \| `"warning"` \| `"info"` \| `"gradient"` | `"default"` | The visual style variant of the announcement |
| `children` | `React.ReactNode` | - | The content to display inside the announcement |
| `onClick` | `(e: React.MouseEvent \| React.KeyboardEvent) => void` | - | Callback function triggered when the announcement is clicked |
| `className` | `string` | `""` | Additional CSS classes to apply to the component |
| `disabled` | `boolean` | `false` | Whether the announcement is disabled and non-interactive |

---

**Component Path:** `announcement/page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
