# Radio Buttons

A collection of sleek, interactive, and fully customizable components — 

## Love React

An interactive heart-shaped reaction button with customizable colors and smooth animations — perfect for likes, favorites, or quick feedback.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/radio-buttons/love-react.tsx`

## Usage (Love React)

```tsx

export default function LoveReactView() {
  return (
    
      {/* Default */}

      {/* Custom Colors */}

  );
}
```

## Select Service

Dynamic, mini selectable toggle buttons with icons — ideal for choosing services, categories, or options in a fun and interactive way.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/radio-buttons/select-service.tsx`

## Usage (Select Service)

```tsx

const SelectServiceViewExample = () => {
  const [selected, setSelected] = useState('motorbike');

  const options = [
    { icon: Bike, text: 'Bicycle', value: 'bicycle' },
    { icon: Motorcycle, text: 'Motorbike', value: 'motorbike' },
    { icon: Car, text: 'Car', value: 'car' },
    { icon: TramFront, text: 'Train', value: 'train' },
  ];

  return (
    
      Choose Your Vehicle

  );
};

export default SelectServiceViewExample;
```

## Props

## Payment Method

A clean and minimal payment method selector that makes checkout experiences smooth, controlled, and professional.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/radio-buttons/PaymentMethod.tsx`

## Rate with Star

A fully interactive 1–5 star rating component with hover effects and real-time feedback — perfect for reviews, products, or services.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/radio-buttons/RateStar.tsx`

### Usage (Rate with Star)

```tsx

function App() {
  return (
    
      Rate this product:

  );
}

```

## Plan Toggle

A stylish toggle to switch between pricing plans (Free, Personal, Team, etc.) with a clear active state and smooth transitions.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/radio-buttons/PlanToggle.tsx`

### Usage (Plan Toggle)

```tsx
// Example: Make "Team" the active one
Free
Personal
Team
```

## Volume Toggle
A draggable, modern volume control slider designed with fluid animations — sleek, intuitive, and perfect for media players

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/radio-buttons/Volume.tsx`

## Pattern Lock

A mobile-style pattern lock screen for web apps — adds a unique and secure interactive experience with customizable nodes and lock values.

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/radio-buttons/PatternLock.tsx`

### Usage (Pattern Lock)

```tsx
"use client";

const PatternDemo = () => {
  const [savedPattern, setSavedPattern] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(null);

  return (
    
      🔐 Pattern Lock Demo

      {/* Step 1: Set Pattern */}
      
        Step 1: Set a Pattern
         {
            setSavedPattern(pattern);
            console.log("Saved Pattern:", pattern);
          }}
        />

      {/* Step 2: Unlock */}
      {savedPattern.length > 0 && (
        
          Step 2: Unlock
           {
              setIsUnlocked(success);
              console.log("Unlock status:", success);
            }}
          />

          {isUnlocked !== null && (
            
              {isUnlocked ? (
                ✅ Access Granted
              ) : (
                ❌ Access Denied
              )}
            
          )}
        
      )}
    
  );
};

export default PatternDemo;

```

### 🔒 PatternLock – Real World Usage

1.  **Register Pattern**  
    Use `mode="set"` → capture pattern with `onSetPattern` → save (hashed) in your DataBase.
    
2.  **Unlock**  
    Use `mode="unlock"` → pass saved pattern as `initialPattern` → check via `onUnlock`.
    
3.  **Security**
    
    -   Hash pattern before storing (like a password).
        
    -   Add retry limits to prevent brute force.
        
4.  **UI/UX**
    
    -   Works with mouse & touch.
        
    -   Add “reset pattern” flow if forgotten.
        
5.  **Enhance**
    
    -   Confirm twice when setting.
        
    -   Optionally increase grid size (e.g., 4×4) for stronger locks.

---

**Component Path:** `radio-buttons\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
