# Video Gallery

A modern, interactive video gallery component featuring a responsive grid layout, category filtering, search functionality, and a modal with video playback.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/video-gallery/Video-Gallery.tsx`

## Accessibility

- Semantic HTML with appropriate ARIA roles for interactive elements (e.g., `role="button"` for clickable cards and buttons).
- Full keyboard navigation support for opening/closing modals, navigating projects, and toggling search (`/` key, arrow keys, `Esc`, `Space`, etc.).
- Screen reader compatibility with descriptive labels for buttons and modals.
- High-contrast visuals and focus states for accessibility.

## Styling

- Utilizes **Tailwind CSS** for responsive, utility-first styling.
- Supports **dark mode** with `dark:` classes for seamless theme integration.
- Implements **glassmorphism** effects using `backdrop-blur-sm` for modal and button overlays.
- Smooth animations powered by **Framer Motion** for card hovers, modal transitions, and search bar interactions.
- Responsive grid layout with Tailwind’s `grid-cols-*` for varying screen sizes.
- Gradient backgrounds and hover effects for enhanced visual appeal.

## Features

- **Category Filtering**: Filter projects by categories like Documentary, Wedding, Travel, and Film.
- **Search Functionality**: Real-time search with animated input expansion.
- **Modal Video Playback**: Displays videos in a modal with autoplay support for YouTube and Vimeo.
- **Keyboard Navigation**: Navigate projects with arrow keys, toggle fullscreen with `F`, share with `S`, and close with `Esc`.
- **Fullscreen Mode**: Toggle fullscreen video playback for an immersive experience.
- **Error Handling**: Fallback for unavailable thumbnails with a clean placeholder.
- **Responsive Design**: Adapts to various screen sizes with a flexible grid and modal layout.

---

**Component Path:** `video-gallery\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
