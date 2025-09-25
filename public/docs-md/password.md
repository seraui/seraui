# Password Input Components 

Secure and user-friendly password input components with visibility toggle and optional strength validation. Perfect for authentication forms, registration pages, and any application requiring password input.

## Basic Password Input

A simple password input with visibility toggle functionality.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/password/password.tsx`

### Key Features
- **Toggle Visibility**: Click the eye icon to show/hide password
- **Clean Design**: Minimal and professional appearance
- **Accessibility**: Proper labeling and keyboard support
- **Responsive**: Adapts to container width

---

## Strong Password Input

An enhanced password input with real-time validation and strength requirements.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/password/strongPassword.tsx`

### Validation Rules
- **Minimum Length**: At least 8 characters
- **Numbers**: At least 1 numeric digit
- **Lowercase**: At least 1 lowercase letter
- **Uppercase**: At least 1 uppercase letter
- **Special Characters**: At least 1 special character

### Visual Indicators
- ✅ **Green checkmark**: Requirement met
- ❌ **Red X**: Requirement not met
- **Real-time feedback**: Updates as you type
- **Color-coded text**: Green for valid, muted for invalid

---

## Installation

You can add these components to your project using the CLI or by manually copying the code.

### Basic Password Input

    CLI
    Manual

    ```bash
npx shadcn@latest add password.json
```

    Code available at: `src/app/docs/password/password.tsx`

### Strong Password Input

    CLI
    Manual

    ```bash
npx shadcn@latest add strongPassword.json
```

    Code available at: `src/app/docs/password/strongPassword.tsx`

---

## Usage Examples

### Basic Implementation

After installation, import and use the components in your React application:

```tsx

function LoginForm() {
  return (

      Sign In
    
  );
}

function RegistrationForm() {
  return (

      Create Account
    
  );
}
```

### Custom Styling

Both components accept standard input props and can be customized:

```tsx

```

### Form Integration

Perfect for use with form libraries like React Hook Form:

```tsx

function SignUpForm() {
  const { register, handleSubmit, watch } = useForm();

  return (

        Sign Up

  );
}
```

---

## Component Props

### PasswordInput Props

      Prop
      Type
      Default
      Description

      placeholder
      string
      "Enter your password"
      Placeholder text for the input field.

      className
      string
      ""
      Additional CSS classes for the input container.

      disabled
      boolean
      false
      Whether the input is disabled.

      ...inputProps
      React.InputHTMLAttributes
      
      Any other standard input attributes (e.g., onChange, onFocus, autoComplete).

### StrongPasswordInput Props

      Prop
      Type
      Default
      Description

      placeholder
      string
      "Create a strong password"
      Placeholder text for the input field.

      className
      string
      ""
      Additional CSS classes for the input container.

      disabled
      boolean
      false
      Whether the input is disabled.

      ...inputProps
      React.InputHTMLAttributes
      
      Any other standard input attributes (e.g., onChange, onFocus, autoComplete).

---

## Accessibility Features

Both password components are built with accessibility in mind:

### Keyboard Navigation
- **Tab Navigation**: Navigate between input and toggle button using Tab key
- **Enter/Space**: Activate the visibility toggle button
- **Screen Reader Support**: Proper ARIA labels and descriptions

### ARIA Attributes
- `aria-label="Toggle password visibility"` on the toggle button
- Proper labeling for password requirements in Strong Password variant
- Semantic HTML structure for better screen reader compatibility

### Visual Indicators
- **High Contrast**: Clear visual distinction between states
- **Color Independence**: Information conveyed through icons, not just color
- **Focus States**: Visible focus indicators for keyboard users

---

## Customization

### Styling Customization

The components use Tailwind CSS classes that can be easily customized:

```tsx
// Custom input styling

// Custom validation colors

```

### Validation Rules Customization

For the Strong Password component, you can modify the validation rules in the source code:

```tsx
const validationRules = [
  { id: 'length', text: 'At least 12 characters', regex: /.{12,}/ },
  { id: 'number', text: 'At least 2 numbers', regex: /\d.*\d/ },
  // Add custom rules as needed
];
```

### Icon Customization

Replace the default eye icons with your preferred icons:

```tsx
// Replace EyeIcon and EyeOffIcon components with your custom icons
const CustomEyeIcon = ({ className }) => (
  
);
```

---

## Best Practices

### Security Considerations
- **Never log passwords**: Avoid logging password values in development or production
- **Use HTTPS**: Always transmit passwords over secure connections
- **Implement rate limiting**: Protect against brute force attacks
- **Hash passwords**: Use proper password hashing on the server side

### UX Recommendations
- **Clear requirements**: Use the Strong Password variant for registration forms
- **Progressive disclosure**: Show validation only after user starts typing
- **Helpful feedback**: Provide clear, actionable validation messages
- **Consistent placement**: Keep password fields in expected locations

### Form Integration
- **Proper autocomplete**: Use `autoComplete="current-password"` for login, `autoComplete="new-password"` for registration
- **Validation timing**: Validate on blur or after user stops typing, not on every keystroke
- **Error handling**: Provide clear error messages for failed validation

---

## Use Cases

### Login Forms
Use the basic `PasswordInput` for simple, clean login interfaces:
- Minimal visual clutter
- Quick password entry
- Standard visibility toggle

### Registration Forms
Use `StrongPasswordInput` for account creation:
- Guides users to create secure passwords
- Real-time validation feedback
- Reduces password-related support issues

### Password Change Forms
Use `StrongPasswordInput` when users update their passwords:
- Ensures new passwords meet security requirements
- Helps users understand password policies
- Improves overall account security

### Admin Interfaces
Both components work well in admin dashboards:
- Professional appearance
- Consistent with modern UI patterns
- Accessible for all users

---

**Component Path:** `password/page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
