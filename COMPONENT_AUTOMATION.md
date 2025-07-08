# Component Registry Automation ✨

This project now has **fully automated component registration**! You no longer need to manually add components to the `src/scripts/components.ts` file.

## How It Works

The system automatically:
1. Scans the `src/app/docs/` directory for component directories
2. Generates the `src/scripts/components.ts` file with all discovered components
3. Builds the registry JSON files for each component
4. Handles both single files and multi-file component directories

## Available Scripts

### 🔄 Build Registry (Manual)
```bash
npm run build:registry
```
Manually rebuilds the component registry from all components in the docs directory.

### 🚀 Generate Components (One-time)
```bash
npm run generate:components
```
Regenerates the entire component registry (same as build:registry but with additional logging).

### 👀 Watch Components (Automatic)
```bash
npm run watch:components
```
Starts a file watcher that automatically rebuilds the registry whenever you add or remove component directories.

## Adding New Components

### The Old Way (Manual) ❌
```typescript
// You used to have to manually add this to components.ts
{
  name: "my-new-component",
  title: "My New Component", 
  description: "A description...",
  path: "../app/docs/my-new-component",
  dependencies: [],
}
```

### The New Way (Automatic) ✅
1. Create a new directory in `src/app/docs/my-new-component/`
2. Add your component files (`.tsx` files)
3. Run `npm run build:registry` OR use the watcher with `npm run watch:components`
4. **That's it!** The component is automatically registered.

## Component Directory Structure

Each component directory should contain:
- Main component file (preferably named after the directory)
- Any additional component files
- `page.mdx` for documentation (optional)

Example:
```
src/app/docs/my-component/
├── my-component.tsx          # Main component (auto-detected)
├── my-component-view.tsx     # Additional variant
├── other-parts.tsx           # Other related components
└── page.mdx                  # Documentation
```

## Automatic Features

- **Auto-detection**: Scans `src/app/docs/` for component directories
- **Smart naming**: Converts kebab-case directory names to Title Case
- **Custom descriptions**: Has built-in descriptions for common component types
- **File handling**: Automatically includes all `.tsx` files from component directories
- **Path resolution**: Handles absolute paths correctly
- **Error handling**: Gracefully handles missing files or directories

## Excluded Directories

The following directories are automatically excluded from component registration:
- `installation`
- `hide-toc-example` 
- `tabs` (handled separately as core component)

## Development Workflow

### For Active Development
```bash
# Start the watcher in one terminal
npm run watch:components

# Start your dev server in another terminal  
npm run dev
```

Now whenever you create a new component directory, the registry will automatically rebuild!

### For Production Builds
```bash
npm run build:registry
npm run build
```

## Troubleshooting

If you encounter issues:

1. **Check paths**: Make sure your component directories are in `src/app/docs/`
2. **Verify files**: Ensure your component directories contain `.tsx` files
3. **Manual rebuild**: Run `npm run build:registry` to see detailed error messages
4. **Check console**: The build process shows which components were successfully processed

## Benefits

✅ **No more manual updates** to `components.ts`  
✅ **Automatic component discovery**  
✅ **Consistent naming and structure**  
✅ **Error handling and validation**  
✅ **Development workflow optimization**  
✅ **Reduced human error**  

The automation system makes it much easier to add new components and keeps your registry always up-to-date!
