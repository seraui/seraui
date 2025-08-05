"use client";

import React, { useState } from "react";
import Modal from "./modal";
import Button from "../button/button";

const ConfirmationModalView: React.FC = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  const handleDelete = () => {
    // Handle delete action
    alert("Item deleted successfully!");
    setIsDeleteOpen(false);
  };

  const handleLogout = () => {
    // Handle logout action
    alert("Logged out successfully!");
    setIsLogoutOpen(false);
  };

  const handleReset = () => {
    // Handle reset action
    alert("Settings reset to default!");
    setIsResetOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setIsDeleteOpen(true)} variant="destructive">
          Delete Item
        </Button>
        <Button
          onClick={() => setIsLogoutOpen(true)}
          variant="default"
          className="bg-orange-500 hover:bg-orange-600"
        >
          Logout
        </Button>
        <Button
          onClick={() => setIsResetOpen(true)}
          variant="default"
          className="bg-yellow-500 hover:bg-yellow-600"
        >
          Reset Settings
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Item"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="h-10 w-10 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Are you sure?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This action cannot be undone. This will permanently delete the
                item and remove all associated data.
              </p>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-300">
                  <strong>Warning:</strong> This is a destructive action that
                  cannot be reversed.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button onClick={() => setIsDeleteOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="destructive">
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        title="Confirm Logout"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="h-10 w-10 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Logout Confirmation
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to logout? You will need to sign in again
                to access your account.
              </p>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-md p-3">
            <p className="text-sm text-orange-700 dark:text-orange-300">
              Any unsaved changes will be lost. Make sure to save your work
              before logging out.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <Button onClick={() => setIsLogoutOpen(false)} variant="secondary">
              Stay Logged In
            </Button>
            <Button
              onClick={handleLogout}
              variant="default"
              className="bg-orange-500 hover:bg-orange-600"
            >
              Logout
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reset Settings Confirmation Modal */}
      <Modal
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        title="Reset Settings"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="h-10 w-10 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Reset All Settings
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                This will restore all settings to their default values. Your
                personal data and files will not be affected.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              The following will be reset:
            </h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• Theme preferences</li>
              <li>• Notification settings</li>
              <li>• Display options</li>
              <li>• Privacy settings</li>
              <li>• Keyboard shortcuts</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-3">
            <Button onClick={() => setIsResetOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleReset}
              variant="default"
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              Reset Settings
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmationModalView;
