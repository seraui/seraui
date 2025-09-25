# ComboBox Component 

A powerful and accessible combobox component that combines an input field with a dropdown list. Features include real-time filtering, keyboard navigation, and customizable options. Perfect for searchable select inputs and autocomplete functionality.

## Preview

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/combo-box/combo-box-view.tsx`

## Installation

    CLI
    Manual

    ```bash
npx shadcn@latest add combo-box.json
```

    Code available at: `src/app/docs/combo-box/combo-box.tsx`

## Basic Usage

After installation, import and use the ComboBox component in your React application:

```tsx

function App() {
  const options = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

  const handleSelect = (option: string | null) => {
    console.log("Selected:", option);
  };

  return (

  );
}
```

## API Reference

### Props

| Prop          | Type                               | Default                 | Description                                         |
| ------------- | ---------------------------------- | ----------------------- | --------------------------------------------------- |
| `options`     | `string[]`                         | `[]`                    | Array of options to display in the dropdown         |
| `placeholder` | `string`                           | `"Select an option..."` | Placeholder text for the input field                |
| `onSelect`    | `(option: string \| null) => void` | `undefined`             | Callback function called when an option is selected |

### ComboBoxProps Interface

```tsx
interface ComboBoxProps {
  options: string[];
  placeholder?: string;
  onSelect?: (option: string | null) => void;
}
```

## Features

### 🔍 Real-time Filtering

The component automatically filters options based on user input, providing instant search results.

### 🎯 Click Outside to Close

Dropdown automatically closes when clicking outside the component area.

### 🎨 Modern Design

Clean, modern interface with smooth transitions and hover effects.

### 📱 Responsive

Fully responsive design that works across all device sizes.

### ⌨️ Keyboard Accessible

Full keyboard navigation support with focus management.

## Component Structure

The ComboBox component consists of several key elements:

### 1. Input Field

- Text input with real-time filtering
- Customizable placeholder text
- Focus management and styling
- Clear visual feedback

### 2. Dropdown Toggle

- Chevron icon that rotates based on state
- Click to toggle dropdown visibility
- Smooth animation transitions

### 3. Options Dropdown

- Filtered list of selectable options
- Hover and focus states for better UX
- Scrollable when content exceeds max height
- "No options found" message when filter returns empty

### 4. State Management

- Input value tracking
- Dropdown open/close state
- Selected option state
- Filtered options based on input

## Customization

### Styling

The component uses Tailwind CSS classes. Customize the appearance by modifying the classes:

```tsx
// Custom input styling

// Custom dropdown styling

  {/* Options */}

```

### Custom Option Rendering

Extend the component to support custom option objects:

```tsx
interface CustomOption {
  id: string;
  label: string;
  value: string;
  icon?: string;
}

// Modified component to handle object options
const options: CustomOption[] = [
  { id: "1", label: "React.js", value: "react", icon: "⚛️" },
  { id: "2", label: "Vue.js", value: "vue", icon: "💚" },
  // ... more options
];
```

### Color Themes

Customize colors to match your brand:

```tsx
// Dark theme variant

// Success theme

// Error theme

```

## Advanced Examples

### With Form Integration

Integrate with form libraries like React Hook Form:

```tsx

function FormExample() {
  const { control, handleSubmit } = useForm();
  const options = ["Option 1", "Option 2", "Option 3"];

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    
       (
          
        )}
      />
      Submit
    
  );
}
```

### Async Data Loading

Handle asynchronous option loading:

```tsx

function AsyncComboBox() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/options");
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error("Failed to fetch options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  if (loading) {
    return Loading options...;
  }

  return (
     console.log("Selected:", option)}
    />
  );
}
```

### Multi-Select Variant

Extend for multi-select functionality:

```tsx

function MultiSelectComboBox({ options }: { options: string[] }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    
       !selectedOptions.includes(opt))}
        onSelect={handleSelect}
        placeholder="Add more options..."
      />

      {/* Selected options display */}
      
        {selectedOptions.map((option) => (
          
            {option}
             handleSelect(option)}
              className="ml-1 text-blue-600 hover:text-blue-800"
            >
              ×

        ))}

  );
}
```

## Accessibility

The ComboBox component follows accessibility best practices:

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Focus Management**: Clear focus indicators and logical tab order
- **Role Attributes**: Semantic roles for better screen reader support
- **High Contrast**: WCAG compliant color combinations

### Keyboard Shortcuts

| Key             | Action                         |
| --------------- | ------------------------------ |
| `Tab`           | Navigate to/from the component |
| `Enter`         | Select highlighted option      |
| `Escape`        | Close dropdown                 |
| `Arrow Up/Down` | Navigate through options       |
| `Type`          | Filter options in real-time    |

## Browser Support

The ComboBox component is compatible with all modern browsers:

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+

## Performance Considerations

### Optimization Tips

1. **Large Option Lists**: Consider virtualization for 100+ options
2. **Debounced Filtering**: Add debouncing for API-based filtering
3. **Memoization**: Use `React.memo` for expensive option rendering
4. **Lazy Loading**: Load options on-demand when possible

```tsx
// Example with debounced filtering

const debouncedFilter = useMemo(
  () =>
    debounce((value: string) => {
      // Perform expensive filtering operation
    }, 300),
  []
);
```

## Troubleshooting

### Common Issues

**Dropdown not closing on outside click**

- Ensure the component is properly mounted
- Check for event listener conflicts

**Options not filtering correctly**

- Verify the `options` prop is passed correctly
- Check the filtering logic in `useEffect`

**Styling issues**

- Ensure Tailwind CSS is properly configured
- Check for CSS conflicts with existing styles

**Performance issues with large lists**

- Consider implementing virtual scrolling
- Add debouncing to the filter function
- Use `React.memo` for option items

---

**Component Path:** `combo-box/page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
