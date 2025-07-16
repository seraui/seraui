'use client';

import { User, Bot } from 'lucide-react';
import { StreamingText } from './StreamingText';
import type { ChatMessageProps } from '../types';

export const ChatMessage = ({ message, isLatest = false }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  const isStreaming = message.isStreaming && isLatest;

  return (
    <div className={`flex gap-3 p-4 ${isUser ? 'bg-blue-50 dark:bg-blue-900/10' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-blue-500 text-white' 
          : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
      }`}>
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {isUser ? 'You' : 'AI Assistant'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {isStreaming ? (
            <StreamingText text={message.content} speed={20} />
          ) : (
            message.content
          )}
        </div>
      </div>
    </div>
  );
};
