# Text highlighter 
The text highlighter component is a powerful tool that allows you to highlight specific text within a given text string. It is designed to be used in various scenarios, such as displaying search results, code snippets, or any other text-based content.

## Preview

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/text-highlighter/text-highlighter.tsx`

## How to Use

### Basic Usage

```tsx

export default function Example() {
  return (
    
      Welcome to Sera UI
    
  );
}
```

### Trigger Types

The component supports different trigger types for animations:

    In View
    Hover
    Auto
    Ref Control

    ```tsx
    
      This text highlights when it comes into view
    
    ```

    ```tsx
    
      This text highlights on hover
    
    ```

    ```tsx
    
      This text highlights automatically
    
    ```

    ```tsx
    import { useRef } from 'react';

    function Example() {
      const highlighterRef = useRef(null);

      return (
        <>
          
            Controlled text highlighting
          
           highlighterRef.current?.animate()}>
            Animate

      );
    }
    ```

### Highlight Directions

Control the direction of the highlight animation:

```tsx
// Left to right (default)
Left to right

// Right to left
Right to left

// Top to bottom
Top to bottom

// Bottom to top
Bottom to top
```

### Custom Colors

    CSS Colors
    Tailwind Classes

    ```tsx
    // Solid color
    
      Blue highlight

    // Gradient
    
      Gradient highlight
    
    ```

    ```tsx
    
      Tailwind gradient
    
    ```

### Animation Transitions

Customize the animation timing and easing:

```tsx

  Custom animation

```

### InView Options

Configure when the highlight triggers based on viewport intersection:

```tsx

  Advanced in-view highlighting

```

### Different HTML Elements

Use different HTML elements as the container:

```tsx
// As a heading
Highlighted Heading

// As a div

  Highlighted block content

// As a button

  Highlighted Button

```

---

**Component Path:** `text-highlighter/page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
