# Developer profile 

A beautifully designed code window component that displays developer profile information in a realistic code editor interface. Features syntax highlighting, line numbers, window controls, and a dark theme with gradient effects perfect for portfolios and developer showcases.

## Preview

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/codeprofile/codeprofile.tsx`

## Basic Usage

After installation, import and use the component in your React application:

```tsx

function App() {
  return (

  );
}
```

## Customization

### Modifying Developer Data

You can easily customize the developer information by modifying the `coderData` object in the component:

```tsx
const coderData = {
  name: 'Your Name',
  role: 'Your Role',
  seniority: 'Your Level',
  location: 'Your Location',
  skills: [
    'React', 'Next.js', 'TypeScript', 'Node.js',
    // Add your skills here
  ],
};
```

### Styling Customization

The component uses Tailwind CSS classes for styling. You can customize:

#### Window Header Colors
```tsx
// Modify the window control buttons

```

#### Background Gradients
```tsx
// Customize the main gradient

// Modify the top border gradient

```

#### Syntax Highlighting Colors
```tsx
// Keywords (const, let, var)
const

// Variables and properties
coder

// Strings
{coderData.name}

// Arrays and skills
{skill}
```

## Component Structure

The CodeProfile component consists of several key parts:

1. **Window Header**: Contains the traffic light buttons and file name
2. **Code Content**: The main area with syntax-highlighted code
3. **Line Numbers**: Optional numbered lines for authenticity
4. **Background Effects**: Subtle blur effects for visual appeal
5. **Window Footer**: Status bar with file information

## Advanced Customization

### Adding Animation

You can enhance the component with animations:

```tsx
// Add fade-in animation

// Add typing animation for skills
{coderData.skills.map((skill, index) => (
  
    {skill}
  
))}
```

### Multiple Profiles

Create multiple profile variants:

```tsx
const profiles = [
  {
    name: 'Frontend Developer',
    skills: ['React', 'Vue', 'Angular'],
  },
  {
    name: 'Backend Developer',
    skills: ['Node.js', 'Python', 'Go'],
  },
];

// Render different profiles
{profiles.map((profile, index) => (
  
))}
```

---

**Component Path:** `codeprofile\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
