"use client";

import React, { useState } from "react";
import Modal from "./modal";
import Button from "../button/button";

const FormModalView: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Contact form submitted!");
    setIsContactOpen(false);
  };

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle settings save
    alert("Settings saved!");
    setIsSettingsOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setIsContactOpen(true)} variant="default">
          Contact Form Modal
        </Button>
        <Button
          onClick={() => setIsSettingsOpen(true)}
          variant="default"
          className="bg-purple-500 hover:bg-purple-600"
        >
          Settings Form Modal
        </Button>
      </div>

      {/* Contact Form Modal */}
      <Modal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        title="Contact Us"
        size="lg"
      >
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Subject *
            </label>
            <select
              id="subject"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
            >
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="billing">Billing Question</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Message *
            </label>
            <textarea
              id="message"
              rows={4}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 resize-none"
              placeholder="Please describe your inquiry..."
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="newsletter"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="newsletter"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Subscribe to our newsletter for updates
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              onClick={() => setIsContactOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Send Message
            </Button>
          </div>
        </form>
      </Modal>

      {/* Settings Form Modal */}
      <Modal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="User Settings"
        size="lg"
      >
        <form onSubmit={handleSettingsSubmit} className="space-y-6">
          {/* Profile Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
              Profile Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="displayName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  defaultValue="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-100 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </div>

          {/* Notification Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
              Notification Preferences
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label
                    htmlFor="emailNotifications"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive updates via email
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="emailNotifications"
                  defaultChecked
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label
                    htmlFor="pushNotifications"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Push Notifications
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive browser notifications
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="pushNotifications"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label
                    htmlFor="marketingEmails"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Marketing Emails
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive promotional content
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="marketingEmails"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
              Privacy Settings
            </h3>
            <div>
              <label
                htmlFor="profileVisibility"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Profile Visibility
              </label>
              <select
                id="profileVisibility"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              onClick={() => setIsSettingsOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="bg-purple-500 hover:bg-purple-600"
            >
              Save Settings
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FormModalView;
