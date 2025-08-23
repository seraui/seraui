# Two-Step Verification

A secure and user-friendly two-step verification component with a 5-digit code input interface. Features automatic focus management, paste support, and elegant Mac-style design with dark mode compatibility.

## Preview

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/twostep/twostep.tsx`

## Installation

You can add this component to your project using the CLI or by manually copying the code.

    CLI
    Manual

    ```bash
npx shadcn@latest add twostep.json
```

    Code available at: `src/app/docs/twostep/twostep.tsx`

## Basic Usage

After installation, import and use the component in your React application:

```tsx

function App() {
  return (

  );
}
```

## Component Structure

The two-step verification component consists of several key elements:

### 1. Mac-Style Card Design
- Clean white/dark card with rounded corners and shadow
- Mac-style window controls (red, yellow, green dots)
- Responsive padding and layout

### 2. Logo Display
- Customizable logo with glow effect
- Fallback placeholder if image fails to load
- Responsive sizing for different screen sizes

### 3. Input Fields
- 5 individual input fields for verification code
- Auto-focus progression as user types
- Numeric-only input validation
- Visual focus states and hover effects

### 4. Smart Interactions
- **Auto-advance**: Moves to next field when digit is entered
- **Backspace navigation**: Returns to previous field when backspacing on empty field
- **Paste handling**: Intelligently distributes pasted codes across fields
- **Focus management**: Automatically focuses first field on mount

## Customization

### Styling

The component uses Tailwind CSS classes and can be customized by modifying the className properties:

```tsx
// Custom card styling

// Custom input styling

```

### Logo Customization

Replace the default logo by modifying the image source:

```tsx

```

### Phone Number Display

Customize the masked phone number display:

```tsx

  We've sent a 5 digit code to **********{yourPhoneNumber.slice(-3)}

```

## Advanced Features

### Code Validation

Add validation logic to handle the complete verification code:

```tsx
const handleCodeComplete = (completeCode: string) => {
  if (completeCode.length === 5) {
    // Validate the code
    verifyCode(completeCode);
  }
};

// Monitor code state changes
useEffect(() => {
  const completeCode = code.join('');
  if (completeCode.length === 5) {
    handleCodeComplete(completeCode);
  }
}, [code]);
```

### Resend Functionality

Implement the resend code functionality:

```tsx
const handleResendCode = async () => {
  try {
    await resendVerificationCode();
    // Reset the input fields
    setCode(new Array(5).fill(''));
    // Focus first input
    inputRefs.current[0]?.focus();
  } catch (error) {
    console.error('Failed to resend code:', error);
  }
};
```

---

**Component Path:** `twostep\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
