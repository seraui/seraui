# Number Ticker 
A smooth animated number counter component that animates from 0 to any target value with customizable formatting and styling.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/ticker/ticker.tsx`

## Usage

```tsx

export default function Example() {
  return (
    
  )
}
```

## Props

        Prop
        Type
        Default
        Description

        value
        number
        –
        The target number to animate to

        duration
        number
        2000
        Animation duration in milliseconds

        delay
        number
        0
        Delay before animation starts in milliseconds

        decimalPlaces
        number
        0
        Number of decimal places to display

        prefix
        string
        ""
        Text to display before the number (e.g. `$`, `€`)

        suffix
        string
        ""
        Text to display after the number (e.g. `%`, `+`, `K`)

        className
        string
        ""
        Additional CSS classes for styling

        onComplete
        function
        –
        Callback function called when animation completes

## Examples

### Basic Counter
```tsx

```

### Currency Display
```tsx

```

### Percentage with Callback
```tsx
 console.log('Animation complete!')}
/>
```

---

**Component Path:** `ticker\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
