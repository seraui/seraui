'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import Button from '@/app/docs/button/button';
import type { ChatInputProps } from '../types';

export const ChatInput = ({ onSendMessage, isLoading, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-white dark:bg-zinc-900">
      <div className="flex gap-2">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about React, coding, or request code modifications..."
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            rows={2}
            disabled={isLoading || disabled}
          />
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <Button
            type="submit"
            disabled={!message.trim() || isLoading || disabled}
            size="sm"
            iconLeft={isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          >
            Send
          </Button>
        </div>
      </div>
    </form>
  );
};
