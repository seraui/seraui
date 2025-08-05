"use client";

import React, { useState } from "react";
import Modal from "./modal";
import Button from "../button/button";

const SizeVariantsView: React.FC = () => {
  const [isSmallOpen, setIsSmallOpen] = useState(false);
  const [isMediumOpen, setIsMediumOpen] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(false);
  const [isXLOpen, setIsXLOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => setIsSmallOpen(true)}
          variant="default"
          className="bg-green-500 hover:bg-green-600"
        >
          Small Modal
        </Button>
        <Button onClick={() => setIsMediumOpen(true)} variant="default">
          Medium Modal
        </Button>
        <Button
          onClick={() => setIsLargeOpen(true)}
          variant="default"
          className="bg-purple-500 hover:bg-purple-600"
        >
          Large Modal
        </Button>
        <Button
          onClick={() => setIsXLOpen(true)}
          variant="default"
          className="bg-indigo-500 hover:bg-indigo-600"
        >
          Extra Large Modal
        </Button>
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
            <Button
              onClick={() => setIsSmallOpen(false)}
              variant="secondary"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setIsSmallOpen(false)}
              variant="default"
              className="bg-green-500 hover:bg-green-600"
              size="sm"
            >
              Confirm
            </Button>
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
            <Button onClick={() => setIsMediumOpen(false)} variant="default">
              Got it
            </Button>
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
            <Button
              onClick={() => setIsLargeOpen(false)}
              variant="default"
              className="bg-purple-500 hover:bg-purple-600"
            >
              Close
            </Button>
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
            <Button
              onClick={() => setIsXLOpen(false)}
              variant="default"
              className="bg-indigo-500 hover:bg-indigo-600"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SizeVariantsView;
