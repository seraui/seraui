# Orbiting Skills 
A dynamic and visually appealing component that displays a set of skills or technologies in an orbiting pattern. Perfect for showcasing expertise, proficiency, or areas of interest in a creative and engaging way.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/orbiting/orbiting.tsx`

## Usage

Import and use the OrbitingSkills component in your React application:

```tsx

export default function Portfolio() {
  return (

  );
}
```

## Customization

The component comes with predefined skills configuration. To customize the skills, modify the `skillsConfig` array:

```tsx
const skillsConfig: SkillConfig[] = [
  // Inner Orbit
  {
    id: 'html',
    orbitRadius: 100,
    size: 40,
    speed: 1,
    iconType: 'html',
    phaseShift: 0,
    glowColor: 'cyan',
    label: 'HTML5'
  },
  // Add more skills...
];
```

## Configuration Options

Each skill object supports the following properties:

- `id`: Unique identifier for the skill
- `orbitRadius`: Distance from center (100 for inner, 180 for outer orbit)
- `size`: Icon size in pixels
- `speed`: Rotation speed (positive for clockwise, negative for counter-clockwise)
- `iconType`: Type of icon ('html', 'css', 'javascript', 'react', 'node', 'tailwind')
- `phaseShift`: Starting position offset in radians
- `glowColor`: Glow effect color ('cyan' or 'purple')
- `label`: Text displayed on hover

## Features

- **Responsive Design**: Adapts to different screen sizes
- **Interactive**: Hover effects with skill labels
- **Pause on Hover**: Animation pauses when hovering over the container
- **Smooth Animations**: Uses requestAnimationFrame for optimal performance
- **Customizable**: Easy to modify skills, colors, and orbit configurations
- **Accessible**: Includes proper hover states and visual feedback

## Styling

The component uses Tailwind CSS classes and can be customized by modifying:

- Background colors and gradients
- Glow effects and shadows
- Orbit path styling
- Icon sizes and spacing
- Animation timing and easing

---

**Component Path:** `orbiting\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
