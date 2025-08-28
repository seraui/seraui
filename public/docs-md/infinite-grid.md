# Infinite Grid 

A high-performance infinite scrolling grid component with smooth drag interactions, momentum physics, and optimized rendering. Perfect for creating photo galleries, image browsers, and infinite content displays with buttery-smooth user experience.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/infinite-grid/infinite-grid.tsx`

## Features

- **Infinite Scrolling**: Seamlessly browse through unlimited content
- **Drag to Scroll**: Intuitive mouse and touch drag interactions
- **Momentum Physics**: Realistic momentum and damping effects
- **Performance Optimized**: Virtual rendering for smooth performance
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Smooth Animations**: Hardware-accelerated transforms and transitions

## Usage Examples

### Basic Implementation

```tsx

const galleryData = [
  { id: 1, thumb_src: '/image1.jpg', title: 'Image 1' },
  { id: 2, thumb_src: '/image2.jpg', title: 'Image 2' },
  // ... more images
];

export default function Gallery() {
  return (

  );
}
```

### Custom Gallery Data

```tsx
interface GalleryItem {
  id?: number;
  thumb_src: string;
  title?: string;
  full_src?: string;
}

const customGallery: GalleryItem[] = [
  {
    id: 1,
    thumb_src: 'https://example.com/thumb1.jpg',
    full_src: 'https://example.com/full1.jpg',
    title: 'Beautiful Landscape'
  },
  // Add more items...
];
```

### Responsive Container

```tsx
export default function ResponsiveGallery() {
  return (

  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `gallery` | `GalleryItem[]` | Array of gallery items to display |

### GalleryItem Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | No | Unique identifier for the item |
| `thumb_src` | `string` | Yes | URL for the thumbnail image |
| `title` | `string` | No | Alt text and title for the image |
| `full_src` | `string` | No | URL for the full-size image |    

## Performance Tips

- **Image Optimization**: Use optimized images with appropriate sizes
- **Lazy Loading**: Images are automatically lazy-loaded for better performance
- **Virtual Rendering**: Only visible cards are rendered to maintain smooth performance
- **Hardware Acceleration**: Uses CSS transforms for smooth animations

---

**Component Path:** `infinite-grid\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
