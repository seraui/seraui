'use client'

import React from 'react';
import Notification, { NotificationPosition, NotificationType } from './toast';
import { AnimatePresence } from 'framer-motion';

// Define the notification item interface
interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  message?: string;
  showIcon?: boolean;
  duration?: number;
}

export default function ToastView() {
    // We'll keep a state for dynamically added notifications
    const [notifications, setNotifications] = React.useState<NotificationItem[]>([]);
    const nextIdRef = React.useRef(1); // To generate unique IDs for new notifications

    const addNotification = (type: NotificationType, title: string, message?: string, showIcon?: boolean, duration?: number) => {
        const newNotification: NotificationItem = {
            id: nextIdRef.current++,
            type,
            title,
            message,
            showIcon,
            duration,
        };
        setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    };

    // New function for loading with timing system
    const addLoadingWithSuccess = (loadingTitle: string, loadingMessage: string, successTitle: string, successMessage: string, loadingDuration: number = 3000) => {
        const loadingId = nextIdRef.current++;
        
        // Add loading notification
        const loadingNotification: NotificationItem = {
            id: loadingId,
            type: 'loading',
            title: loadingTitle,
            message: loadingMessage,
            showIcon: true,
        };
        
        setNotifications((prevNotifications) => [...prevNotifications, loadingNotification]);
        
        // After loading duration, replace with success notification
        setTimeout(() => {
            setNotifications((prevNotifications) => 
                prevNotifications.map(notification => 
                    notification.id === loadingId 
                        ? {
                            ...notification,
                            type: 'success',
                            title: successTitle,
                            message: successMessage,
                            duration: 4000, // Success notification duration
                        }
                        : notification
                )
            );
        }, loadingDuration);
    };

    const handleClose = (id: number) => {
        setNotifications((prevNotifications) => prevNotifications.filter(n => n.id !== id));
    };

    // State to manage the current position
    const [position, setPosition] = React.useState<NotificationPosition>('bottom-right');

    // Function to get Tailwind CSS classes based on position
    const getPositionClasses = (currentPosition: NotificationPosition) => {
        switch (currentPosition) {
            case 'top-left':
                return 'top-4 left-4';
            case 'top-right':
                return 'top-4 right-4';
            case 'bottom-left':
                return 'bottom-4 left-4';
            case 'bottom-right':
                return 'bottom-4 right-4';
            case 'top-center':
                return 'top-4 left-1/2 -translate-x-1/2'; // Centered horizontally at the top
            case 'bottom-center':
                return 'bottom-4 left-1/2 -translate-x-1/2'; // Centered horizontally at the bottom
            default:
                return 'top-4 right-4'; // Default to top-right
        }
    };

  return (
    <div className="relative min-h-screen p-4">
      {/* Notifications container - Fixed positioning */}
      <div className={`fixed p-4 space-y-2 w-full max-w-sm z-50 ${getPositionClasses(position)}`}>
        <AnimatePresence>
          {/* Render dynamically added notifications */}
          {notifications.map((notification) => (
              <Notification
                  key={notification.id}
                  type={notification.type}
                  title={notification.title}
                  message={notification.message}
                  showIcon={notification.showIcon}
                  duration={notification.duration}
                  onClose={() => handleClose(notification.id)}
              />
          ))}
        </AnimatePresence>
      </div>

      {/* Controls to add new notifications */}
      <div className="mt-20 p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">Test Notifications</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            <button
                onClick={() => addNotification('success', 'Success!', 'Operation completed successfully.', true, 3000)}
                className="px-3 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-600 dark:hover:bg-green-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Success (3s)
            </button>
            <button
                onClick={() => addNotification('info', 'Info Message', 'Here is some general information.', true, 4000)}
                className="px-3 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Info (4s)
            </button>
            <button
                onClick={() => addNotification('warning', 'Warning!', 'This is a warning without an icon.', false, 5000)}
                className="px-3 py-2 bg-yellow-500 dark:bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Warning (5s)
            </button>
            <button
                onClick={() => addNotification('error', 'Error!', 'An error occurred.', true, 6000)}
                className="px-3 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-600 dark:hover:bg-red-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Error (6s)
            </button>
            <button
                onClick={() => addNotification('loading', 'Loading...', 'Please wait a moment.', true)}
                className="px-3 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-600 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Loading
            </button>
            <button
                onClick={() => addNotification('success', 'Simple Success', undefined, true, 3000)}
                className="px-3 py-2 bg-green-700 dark:bg-green-800 text-white rounded-lg text-sm font-medium hover:bg-green-800 dark:hover:bg-green-900 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Simple Success
            </button>
            <button
                onClick={() => addNotification('info', 'Just Info', undefined, false)}
                className="px-3 py-2 bg-blue-700 dark:bg-blue-800 text-white rounded-lg text-sm font-medium hover:bg-blue-800 dark:hover:bg-blue-900 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Info (No Icon)
            </button>
            <button
                onClick={() => addNotification('error', 'Critical Error!', 'This is a critical error that requires immediate attention. It will not auto-close.', true)}
                className="px-3 py-2 bg-red-800 dark:bg-red-900 text-white rounded-lg text-sm font-medium hover:bg-red-900 dark:hover:bg-red-950 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Critical Error
            </button>
            <button
                onClick={() => addNotification('success', 'Payment Success', 'Your payment of $99.99 has been processed successfully.', true, 4000)}
                className="px-3 py-2 bg-emerald-500 dark:bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Payment Success
            </button>
            <button
                onClick={() => addNotification('info', 'System Update', 'New features are available. Check them out!', true, 5000)}
                className="px-3 py-2 bg-indigo-500 dark:bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                System Update
            </button>
            <button
                onClick={() => addNotification('warning', 'Storage Warning', 'You are running low on storage space.', true, 7000)}
                className="px-3 py-2 bg-orange-500 dark:bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-600 dark:hover:bg-orange-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Storage Warning
            </button>
            <button
                onClick={() => addNotification('error', 'Connection Lost', 'Internet connection has been lost. Trying to reconnect...', true, 8000)}
                className="px-3 py-2 bg-rose-500 dark:bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-600 dark:hover:bg-rose-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Connection Lost
            </button>
            <button
                onClick={() => addNotification('loading', 'Uploading Files', 'Please wait while we upload your files...', true)}
                className="px-3 py-2 bg-purple-500 dark:bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-600 dark:hover:bg-purple-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Uploading Files
            </button>
            <button
                onClick={() => addNotification('success', 'Profile Updated', 'Your profile has been updated successfully.', false, 3000)}
                className="px-3 py-2 bg-teal-500 dark:bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-600 dark:hover:bg-teal-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Profile Updated
            </button>
            <button
                onClick={() => addNotification('info', 'Backup Complete', 'Your data has been backed up successfully.', true, 4000)}
                className="px-3 py-2 bg-cyan-500 dark:bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-600 dark:hover:bg-cyan-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Backup Complete
            </button>
            <button
                onClick={() => addNotification('warning', 'Battery Low', 'Your device battery is running low.', false, 6000)}
                className="px-3 py-2 bg-amber-500 dark:bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-600 dark:hover:bg-amber-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Battery Low
            </button>
            <button
                onClick={() => addNotification('error', 'Server Error', 'Unable to connect to server. Please try again later.', true, 10000)}
                className="px-3 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg text-sm font-medium hover:bg-red-700 dark:hover:bg-red-800 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Server Error
            </button>
            <button
                onClick={() => addNotification('loading', 'Processing Data', 'Analyzing your data...', true)}
                className="px-3 py-2 bg-slate-500 dark:bg-slate-600 text-white rounded-lg text-sm font-medium hover:bg-slate-600 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Processing Data
            </button>
            <button
                onClick={() => addNotification('success', 'Email Sent', 'Your email has been sent successfully.', true, 3000)}
                className="px-3 py-2 bg-lime-500 dark:bg-lime-600 text-white rounded-lg text-sm font-medium hover:bg-lime-600 dark:hover:bg-lime-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Email Sent
            </button>
            <button
                onClick={() => addNotification('info', 'New Message', 'You have received a new message from John Doe.', false, 5000)}
                className="px-3 py-2 bg-sky-500 dark:bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-600 dark:hover:bg-sky-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                New Message
            </button>
            <button
                onClick={() => addNotification('warning', 'Permission Required', 'This action requires additional permissions.', true, 7000)}
                className="px-3 py-2 bg-yellow-600 dark:bg-yellow-700 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 dark:hover:bg-yellow-800 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Permission Required
            </button>
            <button
                onClick={() => addNotification('error', 'Login Failed', 'Invalid username or password. Please try again.', true, 8000)}
                className="px-3 py-2 bg-red-700 dark:bg-red-800 text-white rounded-lg text-sm font-medium hover:bg-red-800 dark:hover:bg-red-900 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Login Failed
            </button>
            <button
                onClick={() => addNotification('success', 'Download Complete', 'File "document.pdf" has been downloaded successfully.', true, 4000)}
                className="px-3 py-2 bg-violet-500 dark:bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-600 dark:hover:bg-violet-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Download Complete
            </button>
            <button
                onClick={() => addNotification('info', 'Sync in Progress', 'Syncing your data with the cloud...', true, 6000)}
                className="px-3 py-2 bg-fuchsia-500 dark:bg-fuchsia-600 text-white rounded-lg text-sm font-medium hover:bg-fuchsia-600 dark:hover:bg-fuchsia-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Sync in Progress
            </button>
            <button
                onClick={() => addNotification('warning', 'Maintenance Mode', 'System will be under maintenance for 2 hours.', false, 10000)}
                className="px-3 py-2 bg-orange-600 dark:bg-orange-700 text-white rounded-lg text-sm font-medium hover:bg-orange-700 dark:hover:bg-orange-800 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Maintenance Mode
            </button>
            <button
                onClick={() => addNotification('error', 'API Rate Limit', 'Too many requests. Please wait 5 minutes.', true, 12000)}
                className="px-3 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg text-sm font-medium hover:bg-red-700 dark:hover:bg-red-800 transition-all duration-200 hover:scale-105 shadow-md"
            >
                API Rate Limit
            </button>
            <button
                onClick={() => addNotification('loading', 'Generating Report', 'Creating your monthly report...', true)}
                className="px-3 py-2 bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Generating Report
            </button>
            <button
                onClick={() => addNotification('success', 'Settings Saved', 'Your preferences have been updated.', false, 3000)}
                className="px-3 py-2 bg-emerald-600 dark:bg-emerald-700 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 dark:hover:bg-emerald-800 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Settings Saved
            </button>
            <button
                onClick={() => addNotification('info', 'New Feature', 'Dark mode is now available! Try it out.', true, 8000)}
                className="px-3 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-200 hover:scale-105 shadow-md"
            >
                New Feature
            </button>
            <button
                onClick={() => addNotification('warning', 'Session Expiring', 'Your session will expire in 5 minutes.', true, 15000)}
                className="px-3 py-2 bg-amber-600 dark:bg-amber-700 text-white rounded-lg text-sm font-medium hover:bg-amber-700 dark:hover:bg-amber-800 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Session Expiring
            </button>
            <button
                onClick={() => addNotification('error', 'Database Error', 'Unable to save data. Please try again.', true, 9000)}
                className="px-3 py-2 bg-red-800 dark:bg-red-900 text-white rounded-lg text-sm font-medium hover:bg-red-900 dark:hover:bg-red-950 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Database Error
            </button>
            <button
                onClick={() => addNotification('loading', 'Installing Updates', 'Installing version 2.1.0...', true)}
                className="px-3 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-lg text-sm font-medium hover:bg-purple-700 dark:hover:bg-purple-800 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Installing Updates
            </button>
            <button
                onClick={() => addNotification('success', 'Account Verified', 'Your email has been verified successfully.', true, 4000)}
                className="px-3 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-700 dark:hover:bg-green-800 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Account Verified
            </button>
            <button
                onClick={() => addNotification('info', 'Backup Started', 'Starting automatic backup process...', false, 5000)}
                className="px-3 py-2 bg-cyan-600 dark:bg-cyan-700 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 dark:hover:bg-cyan-800 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Backup Started
            </button>
            <button
                onClick={() => addNotification('warning', 'Low Memory', 'System memory is running low.', true, 7000)}
                className="px-3 py-2 bg-yellow-700 dark:bg-yellow-800 text-white rounded-lg text-sm font-medium hover:bg-yellow-800 dark:hover:bg-yellow-900 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Low Memory
            </button>
            <button
                onClick={() => addNotification('error', 'Network Timeout', 'Request timed out. Check your connection.', true, 10000)}
                className="px-3 py-2 bg-red-900 dark:bg-red-950 text-white rounded-lg text-sm font-medium hover:bg-red-950 dark:hover:bg-red-950 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Network Timeout
            </button>
            <button
                onClick={() => addNotification('loading', 'Compressing Files', 'Compressing your files for upload...', true)}
                className="px-3 py-2 bg-slate-600 dark:bg-slate-700 text-white rounded-lg text-sm font-medium hover:bg-slate-700 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Compressing Files
            </button>
            <button
                onClick={() => addNotification('success', 'Order Confirmed', 'Order #12345 has been confirmed and will ship soon.', true, 5000)}
                className="px-3 py-2 bg-lime-600 dark:bg-lime-700 text-white rounded-lg text-sm font-medium hover:bg-lime-700 dark:hover:bg-lime-800 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Order Confirmed
            </button>
            <button
                onClick={() => addNotification('info', 'Meeting Reminder', 'Team meeting starts in 10 minutes.', false, 8000)}
                className="px-3 py-2 bg-sky-600 dark:bg-sky-700 text-white rounded-lg text-sm font-medium hover:bg-sky-700 dark:hover:bg-sky-800 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Meeting Reminder
            </button>
            <button
                onClick={() => addNotification('warning', 'Plugin Outdated', 'Some plugins need to be updated for security.', true, 9000)}
                className="px-3 py-2 bg-orange-700 dark:bg-orange-800 text-white rounded-lg text-sm font-medium hover:bg-orange-800 dark:hover:bg-orange-900 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Plugin Outdated
            </button>
            <button
                onClick={() => addNotification('error', 'Payment Declined', 'Your payment was declined. Please check your card details.', true, 12000)}
                className="px-3 py-2 bg-rose-600 dark:bg-rose-700 text-white rounded-lg text-sm font-medium hover:bg-rose-700 dark:hover:bg-rose-800 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Payment Declined
            </button>
            <button
                onClick={() => addNotification('loading', 'Scanning System', 'Scanning for viruses and malware...', true)}
                className="px-3 py-2 bg-zinc-500 dark:bg-zinc-600 text-white rounded-lg text-sm font-medium hover:bg-zinc-600 dark:hover:bg-zinc-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Scanning System
            </button>
            <button
                onClick={() => addNotification('success', 'Password Changed', 'Your password has been updated successfully.', true, 4000)}
                className="px-3 py-2 bg-teal-600 dark:bg-teal-700 text-white rounded-lg text-sm font-medium hover:bg-teal-700 dark:hover:bg-teal-800 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Password Changed
            </button>
            <button
                onClick={() => addNotification('info', 'Cache Cleared', 'Browser cache has been cleared successfully.', false, 3000)}
                className="px-3 py-2 bg-blue-800 dark:bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-900 dark:hover:bg-blue-950 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Cache Cleared
            </button>
            <button
                onClick={() => addNotification('warning', 'Disk Space', 'Only 5GB of disk space remaining.', true, 10000)}
                className="px-3 py-2 bg-amber-700 dark:bg-amber-800 text-white rounded-lg text-sm font-medium hover:bg-amber-800 dark:hover:bg-amber-900 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Disk Space
            </button>
            <button
                onClick={() => addNotification('error', 'Service Unavailable', 'The service is temporarily unavailable.', true, 15000)}
                className="px-3 py-2 bg-red-950 dark:bg-red-950 text-white rounded-lg text-sm font-medium hover:bg-red-950 dark:hover:bg-red-950 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Service Unavailable
            </button>
            <button
                onClick={() => addLoadingWithSuccess(
                    'Processing Payment',
                    'Please wait while we process your payment...',
                    'Payment Successful',
                    'Your payment of $29.99 has been processed successfully!'
                )}
                className="px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Payment Processing
            </button>
            <button
                onClick={() => addLoadingWithSuccess(
                    'Uploading Files',
                    'Uploading 3 files to cloud storage...',
                    'Upload Complete',
                    'All files have been uploaded successfully!'
                )}
                className="px-3 py-2 bg-gradient-to-r from-green-500 to-teal-500 dark:from-green-600 dark:to-teal-600 text-white rounded-lg text-sm font-medium hover:from-green-600 hover:to-teal-600 dark:hover:from-green-700 dark:hover:to-teal-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                File Upload
            </button>
            <button
                onClick={() => addLoadingWithSuccess(
                    'Sending Email',
                    'Preparing and sending your email...',
                    'Email Sent',
                    'Your email has been delivered successfully!'
                )}
                className="px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600 text-white rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-600 dark:hover:from-orange-700 dark:hover:to-red-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Send Email
            </button>
            <button
                onClick={() => addLoadingWithSuccess(
                    'Generating Report',
                    'Creating your monthly analytics report...',
                    'Report Ready',
                    'Your report has been generated and is ready to download!'
                )}
                className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-600 dark:to-blue-600 text-white rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-blue-600 dark:hover:from-indigo-700 dark:hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Generate Report
            </button>
            <button
                onClick={() => addLoadingWithSuccess(
                    'Installing Updates',
                    'Installing version 2.1.0...',
                    'Update Complete',
                    'System has been updated successfully!'
                )}
                className="px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Install Update
            </button>
            <button
                onClick={() => addLoadingWithSuccess(
                    'Backing Up Data',
                    'Creating backup of your important files...',
                    'Backup Complete',
                    'Your data has been backed up successfully!'
                )}
                className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-600 dark:to-blue-600 text-white rounded-lg text-sm font-medium hover:from-cyan-600 hover:to-blue-600 dark:hover:from-cyan-700 dark:hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Backup Data
            </button>
            <button
                onClick={() => addLoadingWithSuccess(
                    'Processing Order',
                    'Validating and processing your order...',
                    'Order Processed',
                    'Your order has been processed and confirmed!'
                )}
                className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600 text-white rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-green-600 dark:hover:from-emerald-700 dark:hover:to-green-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Process Order
            </button>
            <button
                onClick={() => addLoadingWithSuccess(
                    'Syncing Data',
                    'Synchronizing your data with the cloud...',
                    'Sync Complete',
                    'All your data has been synchronized!'
                )}
                className="px-3 py-2 bg-gradient-to-r from-violet-500 to-purple-500 dark:from-violet-600 dark:to-purple-600 text-white rounded-lg text-sm font-medium hover:from-violet-600 hover:to-purple-600 dark:hover:from-violet-700 dark:hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Sync Data
            </button>
            <button
                onClick={() => addLoadingWithSuccess(
                    'Compressing Files',
                    'Compressing files for faster upload...',
                    'Compression Complete',
                    'Files have been compressed and are ready!'
                )}
                className="px-3 py-2 bg-gradient-to-r from-slate-500 to-gray-500 dark:from-slate-600 dark:to-gray-600 text-white rounded-lg text-sm font-medium hover:from-slate-600 hover:to-gray-600 dark:hover:from-slate-700 dark:hover:to-gray-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
                Compress Files
            </button>
        </div>
      </div>

      {/* Position controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-3 rounded-xl shadow-lg flex flex-wrap justify-center gap-1 z-40 border border-gray-200/50 dark:border-gray-700/50">
          <button
              onClick={() => setPosition('top-left')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${position === 'top-left' ? 'bg-blue-500 dark:bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
          >
              Top Left
          </button>
          <button
              onClick={() => setPosition('top-center')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${position === 'top-center' ? 'bg-blue-500 dark:bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
          >
              Top Center
          </button>
          <button
              onClick={() => setPosition('top-right')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${position === 'top-right' ? 'bg-blue-500 dark:bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
          >
              Top Right
          </button>
          <button
              onClick={() => setPosition('bottom-left')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${position === 'bottom-left' ? 'bg-blue-500 dark:bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
          >
              Bottom Left
          </button>
          <button
              onClick={() => setPosition('bottom-center')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${position === 'bottom-center' ? 'bg-blue-500 dark:bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
          >
              Bottom Center
          </button>
          <button
              onClick={() => setPosition('bottom-right')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${position === 'bottom-right' ? 'bg-blue-500 dark:bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
          >
              Bottom Right
          </button>
      </div>
    </div>
  );
}
