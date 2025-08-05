"use client";

import React, { useState } from "react";
import Modal from "./modal";

const SizeVariantsView: React.FC = () => {
  const [isSmallOpen, setIsSmallOpen] = useState(false);
  const [isMediumOpen, setIsMediumOpen] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(false);
  const [isXLOpen, setIsXLOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setIsSmallOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Small Modal
        </button>
        <button
          onClick={() => setIsMediumOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Medium Modal
        </button>
        <button
          onClick={() => setIsLargeOpen(true)}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
        >
          Large Modal
        </button>
        <button
          onClick={() => setIsXLOpen(true)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
        >
          Extra Large Modal
        </button>
      </div>

      {/* Small Modal */}
      <Modal
        isOpen={isSmallOpen}
        onClose={() => setIsSmallOpen(false)}
        title="Small Modal (sm)"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Perfect for confirmations and simple alerts. Max width: 448px
            (28rem).
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsSmallOpen(false)}
              className="px-3 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsSmallOpen(false)}
              className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>

      {/* Medium Modal */}
      <Modal
        isOpen={isMediumOpen}
        onClose={() => setIsMediumOpen(false)}
        title="Medium Modal (md)"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Default size, good for most content. Max width: 512px (32rem).
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
              Sample Content
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This is the standard modal size that works well for most use cases
              including forms, notifications, and general content.
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setIsMediumOpen(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </Modal>

      {/* Large Modal */}
      <Modal
        isOpen={isLargeOpen}
        onClose={() => setIsLargeOpen(false)}
        title="Large Modal (lg)"
        size="lg"
      >
        <div className="space-y-6">
          <p className="text-gray-700 dark:text-gray-300">
            Great for detailed information and forms. Max width: 672px (42rem).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Feature 1
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Large modals provide more space for complex layouts and detailed
                information.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Feature 2
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Perfect for multi-column layouts and comprehensive forms.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setIsLargeOpen(false)}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Extra Large Modal */}
      <Modal
        isOpen={isXLOpen}
        onClose={() => setIsXLOpen(false)}
        title="Extra Large Modal (xl)"
        size="xl"
      >
        <div className="space-y-6">
          <p className="text-gray-700 dark:text-gray-300">
            Best for complex layouts and extensive content. Max width: 896px
            (56rem).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
                  Item {item}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Extra large modals can accommodate extensive content and
                  complex data presentations.
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setIsXLOpen(false)}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SizeVariantsView;
