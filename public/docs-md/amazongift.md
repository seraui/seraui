# Amazon Gift Card 

A beautifully designed gift card component with realistic scratch-off effect, frosted glass styling, and interactive elements. Perfect for promotional campaigns, reward systems, and e-commerce applications.

## Preview

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/amazongift/amazongift.tsx`

## Installation

You can add this component to your project using the CLI or by manually copying the code.

    CLI
    Manual

    ```bash
npx shadcn@latest add amazongift.json
```

    Code available at: `src/app/docs/amazongift/amazongift.tsx`

## Basic Usage

After installation, import and use the component in your React application:

```tsx

function App() {
  return (

  );
}
```

## Component Structure

The Amazon Gift Card component consists of several key visual elements:

### 1. Card Container
- Rounded card with shadow and border
- Responsive padding and max-width constraints
- Dark mode compatible background colors

### 2. Decorative Punch Hole
- Top-centered punch hole detail for authenticity
- Custom clip-path for realistic shape
- Subtle border and background styling

### 3. Header Section
- Gift card title and description
- Centered layout with proper typography
- Responsive text sizing

### 4. Frosted Glass Section
- Backdrop-blur effect for modern appearance
- Contains gift card value and code input
- Subtle border and shadow effects

### 5. Scratch-Off Effect
- Interactive peeling sticker illusion
- Chevron pattern background
- 3D shadow effects for depth
- Angled clip-path for realistic peel

### 6. CTA Button
- Purple gradient with glow effect
- Hover state transitions
- Full-width responsive design

## Customization

### Gift Card Value

Modify the gift card amount and currency:

```tsx

  Amazon.com
  $50 {/* Change amount */}

```

### Brand Customization

Update the brand name and styling:

```tsx

  Your Brand $100 Gift Card

  YourBrand.com
  $100

```

### Color Scheme

Customize the purple theme colors:

```tsx
// Button styling

// Glow effect
style={{
  boxShadow: '0 0 25px rgba(59, 130, 246, 0.5), 0 5px 15px -5px rgba(59, 130, 246, 0.4)',
}}

// Focus ring
className="focus-within:ring-blue-500/50 dark:focus-within:ring-blue-400/50"
```

### Coupon Code Placeholder

Update the default coupon code format:

```tsx

```

## Advanced Features

### Dynamic Gift Card Values

Create dynamic gift cards with different values:

```tsx
const GiftCardWithValue = ({ amount, currency = '$' }) => {
  return (
    
      Amazon.com
      {currency}{amount}
    
  );
};
```

### Code Generation

Implement automatic coupon code generation:

```tsx
const generateCouponCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments = [];

  for (let i = 0; i  {
  if (!couponCode.trim()) {
    alert('Please enter a valid coupon code');
    return;
  }

  // Static version - no server API needed
  // You can integrate with external services like Stripe, PayPal, etc.
  if (couponCode === 'SERA2025') {
    alert('Demo coupon accepted! In production, integrate with your payment provider.');
  } else {
    alert('Invalid coupon code. Try: SERA2025');
  }
};
```

---

**Component Path:** `amazongift/page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
