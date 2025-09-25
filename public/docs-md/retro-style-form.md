# Retro Form

A dynamic, retro-styled form component for React and Next.js, featuring customizable fields, built-in validation, and a nostalgic design with Lucide icons and Tailwind CSS.
## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/retro-style-form/RetroForm.tsx`

## Usage

The `RetroForm` component is highly customizable and supports various field types (`text`, `email`, `password`, `tel`, `date`, `select`). Below is an example for a registration form:
```tsx
"use client";

const fieldConfigs: Record = {
  register: [
    { name: 'username', type: 'text', label: 'USERNAME', icon: 'user', required: true, section: 'BASIC INFO' },
    { name: 'email', type: 'email', label: 'EMAIL', icon: 'mail', required: true },
    { name: 'phoneNumber', type: 'tel', label: 'PHONE NUMBER', icon: 'phone', section: 'CONTACT INFO' },
    { name: 'password', type: 'password', label: 'PASSWORD', icon: 'lock', required: true, section: 'SECURITY' },
    { name: 'confirmPassword', type: 'password', label: 'CONFIRM PASSWORD', icon: 'lock', required: true },
    {
      name: 'gender',
      type: 'select',
      label: 'GENDER',
      icon: 'user',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
      ],
    },
  ],
  profile: [
    { name: 'username', type: 'text', label: 'USERNAME', icon: 'user', required: true, section: 'BASIC INFO' },
    { name: 'email', type: 'email', label: 'EMAIL', icon: 'mail', required: true },
    { name: 'phoneNumber', type: 'tel', label: 'PHONE NUMBER', icon: 'phone', section: 'CONTACT INFO' },
    { name: 'birthDate', type: 'date', label: 'BIRTH DATE', icon: 'calendar' },
  ],
  login: [
    { name: 'email', type: 'email', label: 'EMAIL', icon: 'mail', required: true },
    { name: 'password', type: 'password', label: 'PASSWORD', icon: 'lock', required: true },
  ],
};

interface RetroFormViewProps {
  formType: FormType;
}

// Use modal or toast notification for better feedback!
const RetroFormView: React.FC = ({ formType }) => {
  // Handle form submission
  const handleSubmit = useCallback((data: RetroFormData) => {
    console.log(`${formType.toUpperCase()} FORM DATA:`, data);
    // Add your submission logic here (e.g., API call)
  }, [formType]);

  return (

  );
};

export default RetroFormExample;
```

## Props

) => void",
    description: "Callback function triggered on form submission with form data.",
    default: "None (required)"
  },
  {
    name: "title",
    type: "string",
    description: "Main title of the form.",
    default: "Conditional: 'SIGN IN' (login), 'REGISTER' (register), 'UPDATE PROFILE' (profile)"
  },
  {
    name: "subtitle",
    type: "string",
    description: "Subtitle text below the form title.",
    default: "Conditional: 'Welcome Back!' (login), 'Join the Retro Club!' (register), 'Update Your Info!' (profile)"
  },
  {
    name: "buttonText",
    type: "string",
    description: "Text for the submit button.",
    default: "Conditional: 'LOGIN' (login), 'SUBMIT' (register/profile)"
  },
  {
    name: "showOTP",
    type: "boolean",
    description: "Enables OTP verification for the phone number field. Note: OTP functionality is a placeholder and requires integration with an external service (e.g., Twilio).",
    default: "false"
  }
]} />

## Field Config

## Accessibility

- Semantic `input` and `select` elements with `aria-label` and `aria-required` attributes.
- ARIA live regions (`aria-live="polite"`) for error and success messages to ensure screen reader compatibility.
- Full keyboard navigation support for inputs, buttons, and select elements (via `Enter` and `Space` keys).
- Visible asterisks for required fields and high-contrast styling for readability.
- Error states with subtle shake animations and success states with green borders.

## Styling

- Uses Tailwind CSS for responsive grid layouts and retro aesthetics.
- Dark mode support with gradient backgrounds (purple-blue-indigo).
- 3D effects with `transform-gpu`, `box-shadow`, and perspective for a nostalgic look.
- Smooth hover and focus animations using `transition-all` and cubic-bezier curves.
- Theming support with a `theme` object for primary, success, and error colors.

## Notes

- The OTP functionality (`showOTP`) is a placeholder and logs to the console. For production, integrate with an OTP service like Twilio or Firebase.
- For large forms, consider using `react-hook-form` for optimized state management and validation.
- Styles are Tailwind-specific but can be extracted to a CSS module for non-Tailwind projects.

---

**Component Path:** `retro-style-form/page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
