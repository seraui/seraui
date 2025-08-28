# 3D Carousel 

A stunning 3D carousel component that displays items in a rotating circular layout with smooth animations and perspective effects. Perfect for showcasing products, images, or any content in an engaging three-dimensional presentation.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/3d-carousel/3d-carousel.tsx`

## Usage

```tsx
 import ThreeDCarousel from "@/components/ui/3d-carousel";

export default function BasicCarouselPage() {
  return (

  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `ReactNode[]` | `[]` | Array of items to display in the carousel |
| `autoRotate` | `boolean` | `true` | Whether the carousel should auto-rotate |
| `rotationSpeed` | `number` | `3000` | Speed of auto-rotation in milliseconds |
| `perspective` | `number` | `1000` | CSS perspective value for 3D effect |

---

**Component Path:** `3d-carousel\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
