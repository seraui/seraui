# Card Component

A beautifully designed, responsive card component perfect for login forms, user authentication, and content containers. Features modern styling with dark mode support, form validation, and social authentication options.

## Preview

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/card/card-view.tsx`

## Installation

    CLI
    Manual

    ```bash
npx shadcn@latest add card.json
```

    Code available at: `src/app/docs/card/card.tsx`

## Basic Usage

After installation, import and use the card component in your React application:

```tsx

function App() {
  return (

  );
}
```

## Component Structure

The card component includes several key elements:

### 1. Card Container
- Responsive width with maximum constraints
- Modern styling with borders and shadows
- Dark mode color adaptation
- Rounded corners for a polished look

### 2. Header Section
- **Title**: Clear, prominent heading
- **Sign Up Link**: Secondary action for new users
- **Description**: Helpful context text for users

### 3. Form Elements
- **Email Input**: Properly labeled with placeholder text
- **Password Input**: Secure input with forgot password link
- **Form Validation**: Built-in styling for focus and error states

### 4. Action Buttons
- **Primary Login**: Main call-to-action button
- **Social Authentication**: Google sign-in with branded icon
- **Responsive Design**: Full-width buttons on mobile

## Customization

### Styling

The card component uses Tailwind CSS classes for styling. You can customize the appearance by modifying the classes:

```tsx
// Custom card styling

  {/* Card content */}

```

### Colors

Customize the color scheme to match your brand:

```tsx
// Custom color scheme

  {/* Content with blue theme */}

```

### Form Fields

Add or modify form fields as needed:

```tsx
// Additional form fields

    Username

```

## Accessibility

The card component follows accessibility best practices:

- **Semantic HTML**: Proper form structure with labels and inputs
- **ARIA Labels**: Screen reader friendly element descriptions
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: WCAG compliant color combinations in both themes

## Dark Mode Support

The component automatically adapts to your application's theme:

```tsx
// Dark mode classes are automatically applied

  {/* Content adapts to theme */}

```

## Integration Examples

### With Form Libraries

Integrate with popular form libraries like React Hook Form:

```tsx

function LoginForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    
      {/* Modified card with form integration */}
    
  );
}
```

### With Authentication

Connect to authentication providers:

```tsx

function AuthCard() {
  const handleGoogleSignIn = () => {
    signIn('google');
  };

  return (
    
  );
}
```

## Best Practices

1. **Responsive Design**: Always test the card on different screen sizes
2. **Form Validation**: Implement proper client and server-side validation
3. **Loading States**: Add loading indicators for form submissions
4. **Error Handling**: Display clear error messages for failed attempts
5. **Security**: Use HTTPS and proper authentication flows
6. **Performance**: Optimize images and minimize bundle size

---

**Component Path:** `card\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
