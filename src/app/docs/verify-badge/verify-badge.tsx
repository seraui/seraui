"use client";
import React from 'react';
import { cn } from '@/lib/utils';

// Custom SVG Icons for Verification Badges
const BasicVerifyIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 2L4 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4z" 
      fill="currentColor" 
      fillOpacity="0.1"
    />
    <path 
      d="M12 2L4 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      fill="none"
    />
    <path 
      d="m9 12 2 2 4-4" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const GoldVerifyIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <circle 
      cx="12" 
      cy="12" 
      r="11" 
      fill="url(#goldGradient)" 
      fillOpacity="0.2"
    />
    <circle 
      cx="12" 
      cy="12" 
      r="11" 
      stroke="url(#goldGradient)" 
      strokeWidth="1.5" 
      fill="none"
    />
    <path 
      d="M12 3.5L5.5 6.5v5.5c0 4.44 3.07 8.59 7.2 9.6 4.13-1.01 7.2-5.16 7.2-9.6V6.5l-6.5-3z" 
      fill="url(#goldGradient)" 
      fillOpacity="0.3"
    />
    <path 
      d="M12 3.5L5.5 6.5v5.5c0 4.44 3.07 8.59 7.2 9.6 4.13-1.01 7.2-5.16 7.2-9.6V6.5l-6.5-3z" 
      stroke="url(#goldGradient)" 
      strokeWidth="1.5" 
      fill="none"
    />
    <path 
      d="M8 10l1.5-2L12 9.5 14.5 8 16 10l-1 3H9l-1-3z" 
      fill="url(#goldGradient)" 
      fillOpacity="0.6"
    />
    <path 
      d="m9.5 13.5 1.5 1.5 3-3" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="25%" stopColor="#FFA500" />
        <stop offset="50%" stopColor="#FFD700" />
        <stop offset="75%" stopColor="#FFED4A" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
    </defs>
  </svg>
);

const PremiumVerifyIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <circle 
      cx="12" 
      cy="12" 
      r="11" 
      fill="url(#premiumGradient)" 
      fillOpacity="0.1"
    />
    <circle 
      cx="12" 
      cy="12" 
      r="11" 
      stroke="url(#premiumGradient)" 
      strokeWidth="2" 
      fill="none"
      strokeDasharray="2 2"
      className="animate-spin"
      style={{ animationDuration: '8s' }}
    />
    <path 
      d="M12 2L8 8h8l-4-6zM8 8l4 14 4-14H8z" 
      fill="url(#premiumGradient)" 
      fillOpacity="0.4"
    />
    <path 
      d="M12 2L8 8h8l-4-6zM8 8l4 14 4-14H8z" 
      stroke="url(#premiumGradient)" 
      strokeWidth="1.5" 
      fill="none"
    />
    <g fill="url(#premiumGradient)" fillOpacity="0.8">
      <circle cx="7" cy="5" r="0.8" />
      <circle cx="17" cy="5" r="0.8" />
      <circle cx="19" cy="12" r="0.8" />
      <circle cx="5" cy="12" r="0.8" />
      <circle cx="7" cy="19" r="0.8" />
      <circle cx="17" cy="19" r="0.8" />
    </g>
    <circle 
      cx="12" 
      cy="12" 
      r="3" 
      fill="url(#premiumGradient)" 
      fillOpacity="0.6"
    />
    <path 
      d="m10.5 12 1 1 2-2" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="premiumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="25%" stopColor="#A855F7" />
        <stop offset="50%" stopColor="#EC4899" />
        <stop offset="75%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  </svg>
);

// Verification Badge Types
type VerifyBadgeType = 'basic' | 'gold' | 'premium';

interface VerifyBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  type: VerifyBadgeType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  animate?: boolean;
}

// Badge Configuration
const badgeConfig = {
  basic: {
    icon: BasicVerifyIcon,
    label: 'Verified',
    colors: {
      bg: 'bg-blue-50/80 dark:bg-blue-900/20',
      border: 'border-blue-200/50 dark:border-blue-600/30',
      text: 'text-blue-700 dark:text-blue-300',
      glow: 'shadow-blue-500/20',
    },
  },
  gold: {
    icon: GoldVerifyIcon,
    label: 'Gold Verified',
    colors: {
      bg: 'bg-yellow-50/80 dark:bg-yellow-900/20',
      border: 'border-yellow-300/50 dark:border-yellow-600/30',
      text: 'text-yellow-700 dark:text-yellow-300',
      glow: 'shadow-yellow-500/30',
    },
  },
  premium: {
    icon: PremiumVerifyIcon,
    label: 'Premium Verified',
    colors: {
      bg: 'bg-purple-50/80 dark:bg-purple-900/20',
      border: 'border-purple-300/50 dark:border-purple-600/30',
      text: 'text-purple-700 dark:text-purple-300',
      glow: 'shadow-purple-500/30',
    },
  },
};

// Size configurations
const sizeConfig = {
  xs: {
    badge: 'px-2 py-1 text-xs',
    icon: 'w-3 h-3',
    gap: 'gap-1',
  },
  sm: {
    badge: 'px-2.5 py-1.5 text-xs',
    icon: 'w-4 h-4',
    gap: 'gap-1.5',
  },
  md: {
    badge: 'px-3 py-2 text-sm',
    icon: 'w-5 h-5',
    gap: 'gap-2',
  },
  lg: {
    badge: 'px-4 py-2.5 text-base',
    icon: 'w-6 h-6',
    gap: 'gap-2',
  },
  xl: {
    badge: 'px-5 py-3 text-lg',
    icon: 'w-7 h-7',
    gap: 'gap-2.5',
  },
};

// Main VerifyBadge Component
const VerifyBadge = React.forwardRef<HTMLDivElement, VerifyBadgeProps>(({
  type,
  size = 'md',
  showLabel = true,
  animate = true,
  className,
  ...props
}, ref) => {
  const config = badgeConfig[type];
  const sizes = sizeConfig[size];
  const IconComponent = config.icon;

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-all duration-300',
        'backdrop-blur-md border shadow-lg',
        animate && 'hover:scale-105 hover:shadow-xl hover:rotate-1',
        sizes.badge,
        sizes.gap,
        config.colors.bg,
        config.colors.border,
        config.colors.text,
        config.colors.glow,
        className
      )}
      role={props.onClick ? 'button' : undefined}
      tabIndex={props.onClick ? 0 : undefined}
      {...props}
    >
      <IconComponent className={sizes.icon} />
      {showLabel && <span className="font-semibold">{config.label}</span>}
    </div>
  );
});
VerifyBadge.displayName = 'VerifyBadge';

// Icon-only variant
const VerifyIcon = React.forwardRef<HTMLDivElement, Omit<VerifyBadgeProps, 'showLabel'>>((props, ref) => (
  <VerifyBadge {...props} showLabel={false} ref={ref} />
));
VerifyIcon.displayName = 'VerifyIcon';

// Floating Badge variant
interface FloatingVerifyBadgeProps extends VerifyBadgeProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}
const FloatingVerifyBadge = React.forwardRef<HTMLDivElement, FloatingVerifyBadgeProps>(({
  position = 'top-right',
  className,
  ...props
}, ref) => {
  const positionClasses = {
    'top-right': 'absolute -top-1 -right-1',
    'top-left': 'absolute -top-1 -left-1',
    'bottom-right': 'absolute -bottom-1 -right-1',
    'bottom-left': 'absolute -bottom-1 -left-1',
  };

  return (
    <VerifyBadge
      ref={ref}
      {...props}
      className={cn(positionClasses[position], 'z-10', className)}
    />
  );
});
FloatingVerifyBadge.displayName = 'FloatingVerifyBadge';

export { VerifyBadge, VerifyIcon, FloatingVerifyBadge };