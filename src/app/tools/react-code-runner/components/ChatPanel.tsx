'use client';

import { useEffect, useRef } from 'react';
import { X, MessageSquare, Trash2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/app/docs/button/button';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useAIChat } from '../hooks/useAIChat';
import type { ChatPanelProps } from '../types';

export const ChatPanel = ({ isOpen, onToggle, currentModel }: ChatPanelProps) => {
  const { messages, isLoading, error, sendMessage, clearChat, clearError } = useAIChat(currentModel);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 'min(400px, 40vw)', opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex flex-col bg-white dark:bg-zinc-900 border-l border-r border-border overflow-hidden min-w-0"
          style={{ maxWidth: '400px', minWidth: '300px' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-white">
                  AI Chat Assistant
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Using {currentModel}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <Button
                  onClick={clearChat}
                  variant="outline"
                  size="sm"
                  iconLeft={<Trash2 className="w-4 h-4" />}
                >
                  Clear
                </Button>
              )}
              <Button
                onClick={onToggle}
                variant="outline"
                size="sm"
                iconLeft={<X className="w-4 h-4" />}
              >
                Close
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Start a conversation
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                  Ask me anything about React, coding, or request help with your code!
                </p>
              </div>
            ) : (
              <div className="space-y-0">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isLatest={index === messages.length - 1}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
                    Chat Error
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    {error}
                  </p>
                  <button
                    onClick={clearError}
                    className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 mt-2 underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <ChatInput
            onSendMessage={sendMessage}
            isLoading={isLoading}
            disabled={!!error}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
