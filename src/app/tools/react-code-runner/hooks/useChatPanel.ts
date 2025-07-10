import { useState, useEffect } from 'react';

export const useChatPanel = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  // Apply text hiding styles when chat is open
  useEffect(() => {
    if (isChatOpen) {
      // Add CSS class to hide text content in editor and preview
      document.body.classList.add('chat-panel-open');
    } else {
      document.body.classList.remove('chat-panel-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('chat-panel-open');
    };
  }, [isChatOpen]);

  return {
    isChatOpen,
    toggleChat,
    openChat,
    closeChat
  };
};
