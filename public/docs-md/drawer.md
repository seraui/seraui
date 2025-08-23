# Drawer

A flexible, animated drawer component that slides in from any side of the screen. Built with Framer Motion for smooth animations and supports keyboard navigation.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/drawer/drawer.tsx`

## Description

The Drawer component provides a modal-like interface that slides in from the top, bottom, left, or right side of the screen. It features a semi-transparent overlay, smooth animations, and accessibility features like keyboard navigation (ESC to close).

## Features

- **Multi-directional**: Slides from top, bottom, left, or right
- **Smooth animations**: Powered by Framer Motion
- **Keyboard accessible**: ESC key to close
- **Click outside to close**: Overlay interaction
- **Responsive design**: Adapts to different screen sizes
- **Dark mode support**: Built-in dark theme compatibility

## Usage

### Basic Example

```tsx

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
       setIsOpen(true)}>
        Open Drawer

            Drawer Title
            
              This is a description of what this drawer contains.

            {/* Your content here */}

             setIsOpen(false)}>
              Cancel
            
             setIsOpen(false)}>
              Save

  );
}
```

### Different Sides

```tsx
// Right side (default)

// Left side

// Top

// Bottom

```

### Form Example

```tsx

      Edit Profile
      
        Make changes to your profile here.

          Name

          Email

       setIsOpen(false)}>
        Cancel
      
       setIsOpen(false)}>
        Save Changes

```

## API Reference

### Drawer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Controls whether the drawer is open |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when drawer open state changes |
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"right"` | Which side the drawer slides from |
| `children` | `ReactNode` | - | Drawer content components |

### Components

- **`DrawerOverlay`**: Semi-transparent background overlay
- **`DrawerContent`**: Main drawer panel with close button
- **`DrawerHeader`**: Header section for title and description
- **`DrawerTitle`**: Drawer title heading
- **`DrawerDescription`**: Subtitle or description text
- **`DrawerFooter`**: Footer section for action buttons

## Use Cases

- **Navigation menus**: Mobile-friendly side navigation
- **Forms**: Edit profiles, settings, or create new items
- **Details panels**: Show additional information without leaving the page
- **Filters**: Search and filter options in a slide-out panel
- **Shopping cart**: E-commerce cart sidebar
- **Notifications**: Slide-in notification panels

---

**Component Path:** `drawer\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
