'use client';
import React from 'react';
import { motion } from 'framer-motion';

// Define the props for our Icon components
interface IconProps {
  className?: string;
}

// Information Icon SVG
const InfoIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Success Icon SVG
const SuccessIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Warning Icon SVG
const WarningIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

// Error Icon SVG
const ErrorIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Close Icon SVG
const CloseIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// Loading Spinner SVG
const LoadingSpinner: React.FC<IconProps> = ({ className }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// Define the types for the notification variants
export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'loading';

// Define the notification position types
export type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

// Define the props for the Notification component
interface NotificationProps {
  type: NotificationType;
  title: string;
  message?: string; // Message is now optional
  showIcon?: boolean; // New prop to control icon visibility
  duration?: number; // New prop for auto-dismissal duration in milliseconds
  onClose: () => void;
}

// A map to store styles and icons for each notification type
const notificationConfig = {
  info: {
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    borderColor: 'border-blue-200 dark:border-blue-800/50',
    iconColor: 'text-blue-500 dark:text-blue-400',
    icon: <InfoIcon className="h-6 w-6" />,
    gradient: 'from-blue-100/60 to-transparent dark:from-blue-900/20 dark:to-transparent',
  },
  success: {
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    borderColor: 'border-green-200 dark:border-green-800/50',
    iconColor: 'text-green-500 dark:text-green-400',
    icon: <SuccessIcon className="h-6 w-6" />,
    gradient: 'from-green-100/60 to-transparent dark:from-green-900/20 dark:to-transparent',
  },
  warning: {
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800/50',
    iconColor: 'text-yellow-500 dark:text-yellow-400',
    icon: <WarningIcon className="h-6 w-6" />,
    gradient: 'from-yellow-100/60 to-transparent dark:from-yellow-900/20 dark:to-transparent',
  },
  error: {
    bgColor: 'bg-red-50 dark:bg-red-950/20',
    borderColor: 'border-red-200 dark:border-red-800/50',
    iconColor: 'text-red-500 dark:text-red-400',
    icon: <ErrorIcon className="h-6 w-6" />,
    gradient: 'from-red-100/60 to-transparent dark:from-red-900/20 dark:to-transparent',
  },
  loading: { // New loading configuration
    bgColor: 'bg-gray-50 dark:bg-gray-950/20',
    borderColor: 'border-gray-200 dark:border-gray-800/50',
    iconColor: 'text-gray-500 dark:text-gray-400',
    icon: <LoadingSpinner className="h-6 w-6" />,
    gradient: 'from-gray-100/60 to-transparent dark:from-gray-900/20 dark:to-transparent',
  },
};

const Notification: React.FC<NotificationProps> = ({ type, title, message, showIcon = true, duration, onClose }) => {
  const config = notificationConfig[type];

  return (
    // Wrap with motion.div for animations and apply glassy styles with dark mode support
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      className={`relative w-full max-w-sm rounded-xl p-4 backdrop-blur-xl bg-white/15 dark:bg-black/15 border border-gray-300/60 dark:border-gray-700/60 overflow-hidden ring-1 ring-gray-200/40 dark:ring-gray-700/40 drop-shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105`}
    >
        <div className={`absolute top-0 left-0 h-full w-full bg-gradient-to-br ${config.gradient} opacity-50`}></div>
        <div className="relative z-10 flex items-center space-x-4">
            {showIcon && (
                <div className={`flex-shrink-0 ${config.iconColor}`}>
                    {config.icon}
                </div>
            )}
            <div className="flex-1">
                <p className="font-normal text-gray-900 dark:text-gray-100 text-lg">{title}</p>
                {message && (
                    <p className="text-sm text-gray-800 dark:text-gray-300 mt-1">{message}</p>
                )}
            </div>
            <button onClick={onClose} className="flex-shrink-0 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <CloseIcon className="h-5 w-5" />
            </button>
        </div>
        {duration && ( // Render progress bar only if duration is provided
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-300/50 dark:bg-gray-600/50 rounded-b-xl overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: duration / 1000, ease: "linear" }}
                    onAnimationComplete={() => onClose()} // Call onClose when progress bar animation completes
                    className={`h-full bg-gradient-to-r from-green-400 via-blue-400 to-sky-400 dark:from-green-500 dark:via-blue-500 dark:to-sky-500`}
                ></motion.div>
            </div>
        )}
    </motion.div>
  );
};

export default Notification;