"use client";

import React, { useState } from "react";
import Modal from "./modal";
import Button from "../button/button";

const BasicModalView: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Button onClick={() => setIsOpen(true)} variant="default">
        Open Basic Modal
      </Button>

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
            <Button onClick={() => setIsOpen(false)} variant="secondary">
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BasicModalView;
