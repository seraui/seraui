# Toast 
A modern, customizable toast notification system with support for multiple types, positions, and animations. Features automatic dismissal, progress bars, and seamless dark mode integration.

## Preview

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/toast/toast-view.tsx`

## Installation

You can add this component to your project using the CLI or by manually copying the code.

    CLI
    Manual

    ```bash
npx shadcn@latest add toast.json
```

    Code available at: `src/app/docs/toast/toast.tsx`

## Basic Usage

### Simple Toast Notifications

```tsx

// Success notification
 console.log('Closed')}
/>

// Error notification
 console.log('Closed')}
/>
```

### Available Notification Types

- **`success`** - Green notification for successful operations
- **`error`** - Red notification for errors and failures
- **`warning`** - Yellow notification for warnings
- **`info`** - Blue notification for informational messages
- **`loading`** - Gray notification with spinning animation

## Advanced Usage

### Toast Manager Hook

Create a custom hook for easy toast management:

```tsx

export function useToast() {
  const [notifications, setNotifications] = useState([]);
  const nextIdRef = useRef(1);

  const addToast = (type: NotificationType, title: string, message?: string, duration?: number) => {
    const id = nextIdRef.current++;
    const newToast = {
      id,
      type,
      title,
      message,
      showIcon: true,
      duration,
    };

    setNotifications(prev => [...prev, newToast]);
  };

  const removeToast = (id: number) => {
    setNotifications(prev => prev.filter(toast => toast.id !== id));
  };

  const success = (title: string, message?: string, duration = 3000) =>
    addToast('success', title, message, duration);

  const error = (title: string, message?: string, duration = 5000) =>
    addToast('error', title, message, duration);

  const warning = (title: string, message?: string, duration = 4000) =>
    addToast('warning', title, message, duration);

  const info = (title: string, message?: string, duration = 4000) =>
    addToast('info', title, message, duration);

  const loading = (title: string, message?: string) =>
    addToast('loading', title, message);

  return {
    notifications,
    success,
    error,
    warning,
    info,
    loading,
    removeToast,
  };
}
```

### Usage with Hook

```tsx
function MyComponent() {
  const { notifications, success, error, warning, info, loading, removeToast } = useToast();

  const handleSubmit = async () => {
    try {
      loading('Processing...', 'Please wait');

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      success('Success!', 'Data saved successfully');
    } catch (err) {
      error('Error!', 'Failed to save data');
    }
  };

  return (
    
      Submit

      {/* Toast Container */}
      
        {notifications.map(toast => (
           removeToast(toast.id)}
          />
        ))}

  );
}
```

### Loading with Success Transition

For operations that show loading state and then success:

```tsx
const handlePayment = () => {
  const loadingId = addToast('loading', 'Processing Payment', 'Please wait...');

  // Simulate payment processing
  setTimeout(() => {
    // Replace loading with success
    setNotifications(prev =>
      prev.map(toast =>
        toast.id === loadingId
          ? { ...toast, type: 'success', title: 'Payment Successful!', duration: 4000 }
          : toast
      )
    );
  }, 3000);
};
```

## Positioning

### Available Positions

```tsx
type NotificationPosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';
```

### Position Styling

```tsx
const getPositionClasses = (position: NotificationPosition) => {
  switch (position) {
    case 'top-left': return 'top-4 left-4';
    case 'top-right': return 'top-4 right-4';
    case 'top-center': return 'top-4 left-1/2 -translate-x-1/2';
    case 'bottom-left': return 'bottom-4 left-4';
    case 'bottom-right': return 'bottom-4 right-4';
    case 'bottom-center': return 'bottom-4 left-1/2 -translate-x-1/2';
    default: return 'bottom-4 right-4';
  }
};
```

## Styling & Customization

### Custom Colors

```tsx
// Custom notification with different colors

```

### Dark Mode Support

The component automatically supports dark mode with Tailwind's `dark:` prefix:

```tsx
// Dark mode classes are included by default
className="bg-white/80 dark:bg-gray-900/80 border-gray-200/50 dark:border-gray-700/50"
```

## Best Practices

### 1. **Keep Messages Concise**
```tsx
// ✅ Good
success('Saved!', 'Your changes have been saved');

// ❌ Avoid
success('Success!', 'Your changes have been successfully saved to the database and are now available for all users');
```

### 2. **Use Appropriate Durations**
```tsx
// Quick success messages
success('Saved!', undefined, 2000);

// Important errors - longer duration
error('Connection Failed', 'Please check your internet connection', 8000);

// Loading - no auto-dismiss
loading('Processing...', 'This may take a few minutes');
```

### 3. **Provide Context**
```tsx
// ✅ Good - provides context
error('Upload Failed', 'File size exceeds 10MB limit');

// ❌ Avoid - too generic
error('Error', 'Something went wrong');
```

### 4. **Use Icons Appropriately**
```tsx
// ✅ Good - success with icon
success('Payment Complete', 'Transaction processed successfully', 4000);

// ✅ Good - simple info without icon
info('New message', undefined, 3000);
```

### 5. **Handle Multiple Notifications**
```tsx
// Limit concurrent notifications
const MAX_NOTIFICATIONS = 3;

const addToast = (type, title, message) => {
  if (notifications.length >= MAX_NOTIFICATIONS) {
    // Remove oldest notification
    setNotifications(prev => prev.slice(1));
  }
  // Add new notification
  setNotifications(prev => [...prev, newToast]);
};
```

## Common Use Cases

### Form Submissions
```tsx
const handleFormSubmit = async (data) => {
  try {
    loading('Submitting...', 'Please wait');
    await submitForm(data);
    success('Success!', 'Form submitted successfully');
  } catch (error) {
    error('Error!', error.message);
  }
};
```

### File Uploads
```tsx
const handleFileUpload = async (file) => {
  const loadingId = loading('Uploading...', 'Please wait');

  try {
    await uploadFile(file);
    // Replace loading with success
    success('Upload Complete!', 'File uploaded successfully');
  } catch (error) {
    error('Upload Failed', error.message);
  }
};
```

### API Calls
```tsx
const fetchData = async () => {
  try {
    loading('Loading...', 'Fetching data');
    const data = await api.getData();
    success('Data Loaded', `${data.length} items loaded`);
  } catch (error) {
    error('Failed to Load', 'Please try again later');
  }
};
```

## Props Reference

        Prop
        Type
        Default
        Description

        `type`
        'success' | 'error' | 'warning' | 'info' | 'loading'
        -
        Notification type

        `title`
        string
        -
        Main notification text

        `message`
        string
        -
        Optional description

        `showIcon`
        boolean
        true
        Whether to show the type icon

        `duration`
        number
        -
        Auto-dismiss duration in ms

        `onClose`
        () =&gt; void
        -
        Callback when notification is closed

## Accessibility

- **Screen Reader Support**: Proper ARIA labels and roles
- **Keyboard Navigation**: Close button is keyboard accessible
- **Focus Management**: Maintains focus context
- **Color Contrast**: Meets WCAG guidelines for text contrast
- **Motion Preferences**: Respects `prefers-reduced-motion`

## Performance Tips

1. **Limit Concurrent Notifications**: Don't show too many at once
2. **Use Appropriate Durations**: Balance visibility with user experience
3. **Cleanup Timeouts**: Clear timeouts when components unmount
4. **Memoize Callbacks**: Use `useCallback` for `onClose` handlers
5. **Virtual Scrolling**: For many notifications, consider virtualization

---

**Component Path:** `toast/page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
