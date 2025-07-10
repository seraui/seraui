import { useState, useCallback } from 'react';
import { createClient } from '../ai/client';
import type { AIChatMessage } from '../types';

export const useAIChat = (model: string = 'deepseek-r1') => {
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const client = createClient('pollinations', { defaultModel: model });

  const sendMessage = useCallback(async (userMessage: string) => {
    const userChatMessage: AIChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userChatMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Create AI message placeholder for streaming
      const aiMessageId = (Date.now() + 1).toString();
      const aiChatMessage: AIChatMessage = {
        id: aiMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true
      };

      setMessages(prev => [...prev, aiChatMessage]);

      // Prepare messages for AI
      const chatMessages = messages.concat(userChatMessage).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Add system message for context
      const systemMessage = {
        role: 'system' as const,
        content: `You are an AI assistant helping with React development in a live code runner environment. 
        The user has access to TailwindCSS, Lucide icons, and Framer Motion. 
        Provide helpful, concise responses about React, JavaScript, CSS, and coding in general.
        If the user asks for code, provide clean, working examples that would work in the React Code Runner.`
      };

      const response = await client.chat.completions.create({
        model,
        messages: [systemMessage, ...chatMessages],
        stream: true,
        temperature: 0.7,
        max_tokens: 1000
      });

      let fullContent = '';

      // Handle streaming response
      for await (const chunk of response) {
        if (chunk.choices && chunk.choices[0] && chunk.choices[0].delta && chunk.choices[0].delta.content) {
          const content = chunk.choices[0].delta.content;
          fullContent += content;
          
          // Update the AI message with streaming content
          setMessages(prev => prev.map(msg => 
            msg.id === aiMessageId 
              ? { ...msg, content: fullContent, isStreaming: true }
              : msg
          ));
        }
      }

      // Mark streaming as complete
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, isStreaming: false }
          : msg
      ));

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      
      // Remove the placeholder AI message on error
      setMessages(prev => prev.filter(msg => msg.role !== 'assistant' || msg.content !== ''));
    } finally {
      setIsLoading(false);
    }
  }, [messages, model, client]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    clearError
  };
};
