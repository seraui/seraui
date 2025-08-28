# Search Component 

A beautiful and interactive search component with gradient borders, keyboard shortcuts, and recent search functionality. Perfect for command palettes, global search interfaces, and application navigation.

## Features

- **Keyboard Shortcuts**: Built-in Ctrl+K (Cmd+K on Mac) support for quick access
- **Recent Searches**: Displays and manages recent search history with clear functionality
- **Gradient Border**: Eye-catching gradient border with glow effects
- **Dark Mode**: Full support for light and dark themes
- **Responsive Design**: Adapts to different screen sizes and layouts
- **Real-time Filtering**: Instant search results as you type
- **Accessible**: Proper focus management and keyboard navigation
- **Customizable Icons**: Includes custom SVG icons for popular services

## Basic Example

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/search/search.tsx`

## Usage

After installing the component, you can use it in your React application:

```tsx

function App() {
  return (

  );
}
```

## Keyboard Shortcuts

The search component includes built-in keyboard shortcuts for enhanced user experience:

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` / `Cmd+K` | Focus the search input |
| `Escape` | Clear search input (when focused) |
| `Enter` | Select highlighted search result |

## Customization

### Search Data Structure

The component uses a predefined data structure for search items:

```tsx
interface SearchItemType {
  id: number;
  name: string;
  icon: React.ReactNode;
  notification: string;
  color: string;
}
```

### Custom Search Items

You can customize the search items by modifying the `recentSearches` array:

```tsx
const customSearches: SearchItemType[] = [
  {
    id: 1,
    name: 'Custom App',
    icon: ,
    notification: '5 Updates',
    color: '#FF6B6B'
  },
  // Add more items...
];
```

# Installation

    CLI
    Manual

    ```bash
npx shadcn@latest add search.json
```

    Code available at: `src/app/docs/search/search.tsx`

## Dependencies

This component requires the following dependencies:

```bash
npm install lucide-react
```

## Component Props

 void",
      default: "undefined",
      description: "Callback function called when search term changes",
      required: false,
    },
    {
      name: "onItemSelect",
      type: "(item: SearchItemType) => void",
      default: "undefined",
      description: "Callback function called when a search item is selected",
      required: false,
    },
  ]}
/>

## Styling

The component uses Tailwind CSS classes and includes:

- **Gradient borders** with purple, orange, and pink colors
- **Backdrop blur** effects for a modern glass-morphism look
- **Hover animations** with scale transforms
- **Shadow effects** that respond to theme changes
- **Responsive spacing** that adapts to screen sizes

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## Accessibility

The search component follows accessibility best practices:

- **Keyboard Navigation**: Full keyboard support with proper focus management
- **ARIA Labels**: Appropriate ARIA attributes for screen readers
- **Focus Indicators**: Clear visual focus indicators
- **Semantic HTML**: Uses proper HTML elements for better accessibility

---

**Component Path:** `search\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
