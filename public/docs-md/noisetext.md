# Noise Text

Enhance your UI with elegant noise-text effects — a combination of a blurred glass background and subtle static overlay, creating a modern and stylish design.

## Preview & Code

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/noisetext/noisetext.tsx`

## Usage

```tsx

export default function NoisetextView() {
  return (

        SERA UI

  );
}
```

## Component Code

```tsx
"use client";

const NoiseText = ({
  children,
  className = "",
}: React.PropsWithChildren) => (
  
    {/* noise overlay */}

    {/* actual payload */}
    
      {children}

);

export default NoiseText;
```

## Customization Tip

To increase or decrease the noise visibility, modify the `opacity` in the inline style:

```tsx
style={{ opacity: 0.1 }} // More visible static
style={{ opacity: 0.02 }} // More subtle effect
```

## Ideal Use Cases

- Glassmorphism UI components
- Highlighting dynamic titles or headings
- Futuristic or playful design aesthetics

---

**Component Path:** `noisetext\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
