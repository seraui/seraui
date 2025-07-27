'use client'
import React, { MouseEvent, ReactNode, ReactElement, useState } from 'react';

// Enhanced Icons
const XIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const LoadingIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} animate-spin`}>
        <path d="M21 12a9 9 0 11-6.219-8.56"/>
    </svg>
);

// Enhanced Types
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type BadgeShape = 'rounded' | 'pill' | 'square' | 'circle';
type BadgeAnimation = 'none' | 'pulse' | 'bounce' | 'float' | 'glow' | 'shake' | 'rotate' | 'scale' | 'gradient-shift';
type BadgePosition = 'static' | 'absolute' | 'fixed' | 'sticky';

// Enhanced Badge Props Interface
interface BadgeBaseProps {
  children: ReactNode;
  size?: BadgeSize;
  shape?: BadgeShape;
  animation?: BadgeAnimation;
  position?: BadgePosition;

  // Icons and Content
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  badge?: string | number; 
  loading?: boolean;

  // Styling
  className?: string;
  style?: React.CSSProperties;

  // Glass/Blur Effects
  blur?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  opacity?: number;

  // Shadow and Glow
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';
  glow?: boolean;

  // Animation Options
  animationDuration?: 'fast' | 'normal' | 'slow';

  // Interactive States
  disabled?: boolean;
  active?: boolean;

  // Events
  onDismiss?: (event: MouseEvent<HTMLButtonElement>) => void;
  onHover?: (event: MouseEvent<HTMLElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
  role?: string;


  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  zIndex?: number;
}


type BadgeActionProps = 
  | ({ onClick: (event: MouseEvent<HTMLButtonElement>) => void; href?: never; } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>)
  | ({ href: string; onClick?: never; } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)
  | ({ href?: undefined; onClick?: undefined } & React.HTMLAttributes<HTMLDivElement>);


export type BadgeProps = BadgeBaseProps & BadgeActionProps;


export const Badge = React.forwardRef<HTMLElement, BadgeProps>(({
  children,
  size = 'md',
  shape = 'rounded',
  animation = 'none',
  position = 'static',
  iconLeft,
  iconRight,
  badge,
  loading = false,
  className = '',
  style = {},
  blur = 'none',
  opacity,
  shadow = 'none',
  glow = false,
  animationDuration = 'normal',
  disabled = false,
  active = false,
  onDismiss,
  onHover,
  onFocus,
  onClick,
  href,
  top,
  right,
  bottom,
  left,
  zIndex,
  ...props
}, ref) => {

  const [isDismissed, setIsDismissed] = useState(false);

  // Handle dismiss functionality
  const handleDismiss = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsDismissed(true);
    onDismiss?.(event);
  };

  // Don't render if dismissed
  if (isDismissed) return null;

  // Enhanced Size Styles
  const sizeStyles: Record<BadgeSize, string> = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
    xl: 'px-5 py-2.5 text-lg',
    '2xl': 'px-6 py-3 text-xl',
  };

  // Enhanced Icon Sizes
  const iconSizeStyles: Record<BadgeSize, string> = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
    '2xl': 'w-7 h-7',
  };

  // Shape Styles
  const shapeStyles: Record<BadgeShape, string> = {
    rounded: 'rounded-full',
    pill: 'rounded-full',
    square: 'rounded-md',
    circle: 'rounded-full aspect-square',
  };

  // Animation Styles
  const animationStyles: Record<BadgeAnimation, string> = {
    none: '',
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    float: 'animate-float',
    glow: 'animate-glow',
    shake: 'animate-shake',
    rotate: 'animate-spin',
    scale: 'hover:scale-110 transition-transform',
    'gradient-shift': 'animate-gradient-x',
  };

  // Animation Duration Styles
  const durationStyles: Record<string, string> = {
    fast: 'duration-150',
    normal: 'duration-300',
    slow: 'duration-500',
  };

  // Shadow Styles
  const shadowStyles: Record<string, string> = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
    inner: 'shadow-inner',
  };

  // Blur Styles
  const blurStyles: Record<string, string> = {
    none: '',
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
    '2xl': 'backdrop-blur-2xl',
    '3xl': 'backdrop-blur-3xl',
  };

  // Position Styles
  const positionStyles: Record<BadgePosition, string> = {
    static: 'static',
    absolute: 'absolute',
    fixed: 'fixed',
    sticky: 'sticky',
  };

  // Get icon size based on badge size
  const iconSize = iconSizeStyles[size];

 
  const baseClasses = [
    'inline-flex items-center justify-center font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    sizeStyles[size],
    shapeStyles[shape],
    animationStyles[animation],
    durationStyles[animationDuration],
    shadowStyles[shadow],
    blurStyles[blur],
    positionStyles[position],
    !className ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    active ? 'ring-2 ring-offset-2' : '',
    glow ? 'shadow-lg' : '',
    loading ? 'cursor-wait' : '',
    className
  ].filter(Boolean).join(' ');

  // Add positioning styles if needed
  const positioningStyles: React.CSSProperties = {
    ...style,
    ...(top !== undefined && { top }),
    ...(right !== undefined && { right }),
    ...(bottom !== undefined && { bottom }),
    ...(left !== undefined && { left }),
    ...(zIndex !== undefined && { zIndex }),
    ...(opacity !== undefined && { opacity }),
  };

  const finalClassName = baseClasses;
  const finalStyle = positioningStyles;

  // Render different components based on props
  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={finalClassName}
        style={finalStyle}
        onMouseEnter={onHover}
        onFocus={onFocus}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {loading ? (
          <LoadingIcon className={iconSize} />
        ) : (
          iconLeft && <span className="mr-1.5">{React.cloneElement(iconLeft, { className: iconSize } as React.HTMLAttributes<HTMLElement>)}</span>
        )}
        <span className="truncate">{children}</span>
        {!loading && iconRight && <span className="ml-1.5">{React.cloneElement(iconRight, { className: iconSize } as React.HTMLAttributes<HTMLElement>)}</span>}
        {badge && (
          <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
            {badge}
          </span>
        )}
        {onDismiss && (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={handleDismiss}
            className="ml-1.5 -mr-1 flex-shrink-0 rounded-full p-0.5 hover:bg-black/10 focus:outline-none"
          >
            <XIcon className={iconSize} />
          </button>
        )}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={onClick}
        className={finalClassName}
        style={finalStyle}
        onMouseEnter={onHover}
        onFocus={onFocus}
        disabled={disabled || loading}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {loading ? (
          <LoadingIcon className={iconSize} />
        ) : (
          iconLeft && <span className="mr-1.5">{React.cloneElement(iconLeft, { className: iconSize } as React.HTMLAttributes<HTMLElement>)}</span>
        )}
        <span className="truncate">{children}</span>
        {!loading && iconRight && <span className="ml-1.5">{React.cloneElement(iconRight, { className: iconSize } as React.HTMLAttributes<HTMLElement>)}</span>}
        {badge && (
          <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
            {badge}
          </span>
        )}
        {onDismiss && (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={handleDismiss}
            className="ml-1.5 -mr-1 flex-shrink-0 rounded-full p-0.5 hover:bg-black/10 focus:outline-none"
          >
            <XIcon className={iconSize} />
          </button>
        )}
      </button>
    );
  }

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={finalClassName}
      style={finalStyle}
      onMouseEnter={onHover}
      onFocus={onFocus}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    >
      {loading ? (
        <LoadingIcon className={iconSize} />
      ) : (
        iconLeft && <span className="mr-1.5">{React.cloneElement(iconLeft, { className: iconSize } as React.HTMLAttributes<HTMLElement>)}</span>
      )}
      <span className="truncate">{children}</span>
      {!loading && iconRight && <span className="ml-1.5">{React.cloneElement(iconRight, { className: iconSize } as React.HTMLAttributes<HTMLElement>)}</span>}
      {badge && (
        <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
          {badge}
        </span>
      )}
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={handleDismiss}
          className="ml-1.5 -mr-1 flex-shrink-0 rounded-full p-0.5 hover:bg-black/10 focus:outline-none"
        >
          <XIcon className={iconSize} />
        </button>
      )}
    </div>
  );
});

Badge.displayName = 'Badge';