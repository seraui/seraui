'use client';
import React, { useCallback } from 'react';

interface ArrowUpRightIconProps {
  className?: string;
}

const ArrowUpRightIcon = React.memo(({ className }: ArrowUpRightIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-3.5 w-3.5 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
    aria-hidden="true"
    focusable="false"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
  </svg>
));

ArrowUpRightIcon.displayName = 'ArrowUpRightIcon';

type AnnouncementVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'gradient';

interface AnnouncementProps {
  variant?: AnnouncementVariant;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
  className?: string;
  disabled?: boolean;
}

const Announcement = React.memo(
  ({
    variant = 'default',
    children,
    onClick,
    className = '',
    disabled = false,
  }: AnnouncementProps) => {
    const baseClasses = `
    inline-flex 
    items-center 
    justify-center 
    space-x-2 
    font-medium 
    text-sm
    py-1.5 
    px-3.5 
    rounded-full 
    shadow-sm 
    hover:shadow-md 
    active:scale-[0.98]
    transition-all 
    duration-200 
    ease-in-out 
    border
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    cursor-pointer
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
  `;

    // Combined variant classes for both light and dark modes
    const variantClasses = {
      default:
        'bg-white text-gray-800 border-gray-200 hover:bg-gray-50 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900',
      success:
        'bg-green-50 text-green-800 border-green-200 hover:bg-green-100 focus:ring-green-500 dark:bg-green-900/30 dark:text-green-200 dark:border-green-800/50 dark:hover:bg-green-900/50 dark:focus:ring-green-400 dark:focus:ring-offset-gray-900',
      error:
        'bg-red-50 text-red-800 border-red-200 hover:bg-red-100 focus:ring-red-500 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800/50 dark:hover:bg-red-900/50 dark:focus:ring-red-400 dark:focus:ring-offset-gray-900',
      warning:
        'bg-yellow-50 text-yellow-800 border-yellow-200 hover:bg-yellow-100 focus:ring-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-800/50 dark:hover:bg-yellow-900/50 dark:focus:ring-yellow-400 dark:focus:ring-offset-gray-900',
      info: 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100 focus:ring-blue-500 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800/50 dark:hover:bg-blue-900/50 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900',
      gradient:
        'bg-gradient-to-r from-cyan-400 to-blue-500 text-white border-0 hover:shadow-lg focus:ring-cyan-300 focus:ring-offset-gray-100 dark:from-cyan-600 dark:to-blue-700 dark:focus:ring-cyan-400 dark:focus:ring-offset-gray-900 dark:hover:shadow-blue-700/50',
    };

    // Icon color classes specific to each variant
    const iconVariantClasses = {
      default: 'text-gray-600 dark:text-gray-400',
      success: 'text-green-600 dark:text-green-400',
      error: 'text-red-600 dark:text-red-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      info: 'text-blue-600 dark:text-blue-400',
      gradient: 'text-white',
    };

    // Handle keyboard interactions
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;

        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(e);
        }
      },
      [onClick, disabled]
    );

    return (
      <div
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        role={disabled ? 'alert' : 'button'}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
      >
        <span>{children}</span>
        <ArrowUpRightIcon className={iconVariantClasses[variant]} />
      </div>
    );
  }
);

Announcement.displayName = 'Announcement';
export default Announcement;
