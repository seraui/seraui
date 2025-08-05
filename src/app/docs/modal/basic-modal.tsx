"use client";

import React, { useState } from "react";
import Modal from "./modal";

const BasicModalView: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Open Basic Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Basic Modal"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            This is a basic modal example. You can put any content here. The
            modal will close when you click the X button, press ESC, or click
            outside the modal.
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BasicModalView;
