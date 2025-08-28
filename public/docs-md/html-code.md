# HTML Code Tabs 

A powerful and customizable component for displaying HTML code with live preview and syntax highlighting. Perfect for documentation, tutorials, and showcasing HTML/CSS examples.

## Demo

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/html-code/html-code.tsx`

## Features

- **Live Preview**: Renders HTML in an iframe with Tailwind CSS support
- **Syntax Highlighting**: Beautiful code highlighting using Shiki
- **Copy to Clipboard**: One-click code copying functionality
- **Responsive Design**: Works seamlessly across all device sizes
- **Dark Theme**: GitHub Dark theme for code display
- **TypeScript Support**: Fully typed for better development experience

## Usage

### Basic Usage

```tsx

export default function MyComponent() {
  const htmlCode = `
  Hello World
  This is a sample HTML content.
`;

  return ;
}
```

### Custom Title and Filename

```tsx

```

### With Custom Styling

```tsx

```

### Complex HTML Example

```tsx
const complexHtml = `

        Company retreats
        Incredible accommodation for your team
        Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.

`;

;
```

## Examples

### Basic Button

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/html-code/html-code.tsx`

## Component Structure

The component consists of several sub-components:

- **HtmlCodeTabs**: Main wrapper component
- **CodeTabs**: Tab management and layout
- **Preview**: Live HTML preview with iframe
- **CodeView**: Code display with syntax highlighting
- **HtmlRenderer**: HTML rendering with Tailwind CSS support
- **CodeEditor**: Syntax highlighting and copy functionality

## Props

  | **Prop** | **Type** | **Default** | **Description** |
  |---------------|------------|-----------------|-----------------------------------------------------------|
  | `htmlContent` | `string` | — | The HTML content to display and preview
  (required) | | `title` | `string` | `"Demo"` | Title for the preview tab | |
  `fileName` | `string` | `"index.html"` | Filename to display in the code tab |
  | `className` | `string` | `""` | Additional CSS classes for the container |

## Features in Detail

### Live Preview

- Renders HTML in a sandboxed iframe
- Includes Tailwind CSS CDN for styling
- Transparent background support
- Responsive design with grid background

### Code Display

- Syntax highlighting using Shiki with GitHub Dark theme
- Line numbers for better readability
- Copy to clipboard functionality with visual feedback
- Hover effects for better user experience

### Responsive Design

- Mobile-first approach
- Adaptive sizing for different screen sizes
- Optimized for both desktop and mobile viewing

## Styling

The component uses a dark theme by default with:

- GitHub Dark syntax highlighting
- Dark background containers
- Blue accent colors
- Smooth transitions and hover effects

You can customize the appearance by:

- Passing custom `className` props
- Modifying the CSS classes in the component
- Overriding the default styles with your own CSS

## Browser Support

- Modern browsers with ES6+ support
- iframe sandbox support required for preview
- CSS Grid and Flexbox support needed for layout

## Dependencies

- React 18+
- Lucide React (for icons)
- Shiki (for syntax highlighting)
- Tailwind CSS (for styling)

The component dynamically imports Shiki to keep the initial bundle size small.

---

**Component Path:** `html-code\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
