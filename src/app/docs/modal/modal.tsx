import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
}) => {
  // Handle body scroll and pointer events
  useEffect(() => {
    if (isOpen) {
      // Store original values
      const originalOverflow = document.body.style.overflow;
      const originalPointerEvents = document.body.style.pointerEvents;

      // Apply modal styles
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";

      // Cleanup on modal close or unmount
      return () => {
        document.body.style.overflow = originalOverflow || "";
        document.body.style.pointerEvents = originalPointerEvents || "";
      };
    }
  }, [isOpen]);

  // Handle escape key - only when modal is open
  useEffect(() => {
    if (!isOpen) return; // Early return if modal is closed

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Add listener only when modal is open
    document.addEventListener("keydown", handleEscape);

    // Cleanup when modal closes or component unmounts
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto">
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 backdrop-blur-sm",
          "bg-black/50 dark:bg-black/70"
        )}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={cn(
          "relative rounded-lg shadow-xl w-full mx-4 max-h-[90vh] overflow-auto",
          "bg-white dark:bg-gray-900",
          "border-0 dark:border dark:border-gray-700",
          sizeClasses[size]
        )}
      >
        {title && (
          <div
            className={cn(
              "flex items-center justify-between p-4 border-b",
              "border-gray-200 dark:border-gray-700"
            )}
          >
            <h3
              className={cn(
                "text-lg font-semibold",
                "text-gray-900 dark:text-white"
              )}
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              className={cn(
                "p-1 rounded-md transition-colors",
                "text-gray-400 hover:text-gray-600",
                "dark:text-gray-400 dark:hover:text-gray-200",
                "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
