# Dropdown Menu 

A flexible and accessible dropdown menu component with customizable triggers, items, and styling. Perfect for navigation menus, user profiles, settings panels, and action lists.

## Features

- **Accessible**: Built with proper ARIA attributes and keyboard navigation support
- **Customizable**: Flexible trigger and content options with full styling control
- **Click Outside**: Automatically closes when clicking outside the dropdown
- **Responsive**: Adapts to different screen sizes and positions
- **Dark Mode**: Full support for light and dark themes
- **Animations**: Smooth fade-in and zoom animations

## Basic Example

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/dropdown/dropdown.tsx`

## Simple Dropdown

A minimal dropdown example with basic menu items.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/dropdown/simple-dropdown.tsx`

## User Profile Dropdown

A comprehensive user profile dropdown with avatar, user info, and account actions.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/dropdown/user-profile-dropdown.tsx`

## Notification Dropdown

A notification center dropdown with badges and action items.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/dropdown/notification-dropdown.tsx`

## Installation

    CLI
    Manual

    ```bash
npx shadcn@latest add dropdown.json
```

    Code available at: `src/app/docs/dropdown/dropdown.tsx`

## Basic Usage

Here's how to use the dropdown component in your project:

```tsx

function MyComponent() {
  return (
    
          Open Menu
        
      }
    >
       console.log('Item 1')}>
        Item 1
      
       console.log('Item 2')}>
        Item 2

       console.log('Item 3')}>
        Item 3

  );
}
```

## API Reference

### DropdownMenu

The main dropdown container component.

      Prop
      Type
      Default
      Description

      children
      ReactNode
      -
      The dropdown menu items and content

      trigger
      ReactNode
      -
      The element that triggers the dropdown when clicked

### DropdownMenuItem

Individual menu item component.

      Prop
      Type
      Default
      Description

      children
      ReactNode
      -
      The content of the menu item

      onClick
      () =&gt; void
      -
      Function called when the item is clicked

      active
      boolean
      false
      Whether the item should appear in an active/highlighted state

### DropdownMenuSeparator

A visual separator between menu items.

      Prop
      Type
      Default
      Description

      -
      -
      -
      No props required

## Usage Guidelines

### Best Practices

- **Clear Triggers**: Use descriptive button text or recognizable icons for dropdown triggers
- **Logical Grouping**: Group related items together and use separators to create visual sections
- **Consistent Styling**: Maintain consistent styling across all dropdown instances in your application
- **Keyboard Navigation**: The component supports keyboard navigation out of the box
- **Mobile Friendly**: Ensure dropdown content is appropriately sized for mobile devices

### Accessibility

The dropdown component includes several accessibility features:

- **ARIA Attributes**: Proper `role`, `aria-orientation`, and `aria-expanded` attributes
- **Keyboard Support**: Navigate with arrow keys, close with Escape
- **Focus Management**: Proper focus handling when opening and closing
- **Screen Reader Support**: Semantic markup for assistive technologies

### Common Patterns

#### Navigation Menu
Use dropdowns for secondary navigation items or sub-menus.

#### User Account Menu
Perfect for user profile actions, settings, and sign-out functionality.

#### Action Menus
Ideal for context-sensitive actions like edit, delete, share, etc.

#### Filter/Sort Options
Great for providing filtering and sorting options in data tables or lists.

## Styling Customization

The dropdown uses Tailwind CSS classes and can be easily customized:

```tsx
// Custom dropdown with different styling

      Custom Trigger
    
  }
>
  {/* Menu items */}

```

The dropdown menu container uses these default classes:
- `origin-top-right absolute right-0 mt-2 w-64 rounded-2xl shadow-xl`
- `bg-white dark:bg-zinc-900`
- `ring-1 ring-black ring-opacity-5`
- `animate-in fade-in-0 zoom-in-95`

You can override these by modifying the component's CSS classes directly.

---

**Component Path:** `dropdown/page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
