# Magic Card

A stunning profile card component with an interactive glowing border effect that follows your mouse cursor. Features a modern design with cover image, profile picture, user stats, skills, and a magical hover animation that creates a beautiful gradient border.

## Features

- ✨ **Interactive Glowing Border**: Border follows mouse movement with smooth gradient animation
- 🎯 **Customizable**: Easy to customize colors, content, and styling

## Preview

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/magic/magiccard.tsx`

## Installation

## Usage

The MagicCard component consists of two main parts:

1. **MagicContainer**: The wrapper that provides the glowing border effect
2. **Card Content**: Your custom content inside the container

### Basic Usage

```tsx

function MyProfileCard() {
  return (

        {/* Your card content here */}
        
          Your Name
          Your description

  );
}
```

### Advanced Usage with Full Profile Card

```tsx
'use client';

export default function ProfileCard() {
  return (

          {/* Cover Image */}

          {/* Profile Content */}
          
            {/* Profile Image */}

            {/* User Info */}

                Your Name
              
              @username
              
                Your bio description here

  );
}
```

## Customization

### Changing the Glow Colors

You can customize the gradient colors by modifying the `background` style in the MagicContainer:

```tsx
// Custom colors
background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, 
  #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, transparent 80%)`
```

### Adjusting the Glow Size

Modify the circle size in the radial gradient:

```tsx
// Larger glow (500px instead of 350px)
background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, 
  #9E7AFF, #38bdf8, #FF5C5C, #FE8BBB, transparent 80%)`
```

### Custom Border Radius

Change the border radius by modifying the className:

```tsx

  {/* content */}

```

## Examples

### Social Media Profile Card

Perfect for displaying user profiles with stats, bio, and social links.

### Portfolio Card

Great for showcasing work with images, descriptions, and skills.

### Product Card

Ideal for e-commerce with product images, prices, and action buttons.

---

**Component Path:** `magic\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
