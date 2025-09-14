import React, { useState, useEffect, useRef, useCallback, useMemo, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  ArrowPathIcon,
  ClipboardDocumentIcon,
  TrashIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import geminiService from '../services/geminiService';

const ChatBot = ({ isOpen, setIsOpen }) => {
  const { getText } = useContext(LanguageContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [conversationId, setConversationId] = useState(() => uuidv4());
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Local storage key
  const storageKey = `mr_shitcoin_chat_${conversationId}`;

  // Initialize chat with welcome message and load history
  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Load messages from localStorage
        const savedMessages = localStorage.getItem(storageKey);
        if (savedMessages) {
          const parsedMessages = JSON.parse(savedMessages);
          setMessages(parsedMessages);
        } else {
          // Set welcome message
          const welcomeMessage = {
            id: uuidv4(),
            text: getText('chatbotTitle'),
            isBot: true,
            timestamp: new Date().toISOString(),
            status: 'delivered'
          };
          setMessages([welcomeMessage]);
        }
        
        // Initialize Gemini service
        geminiService.startChat();
      } catch (error) {
        console.error('Failed to initialize chat:', error);
        setError('Failed to initialize chat. Please refresh the page.');
      }
    };

    if (isOpen) {
      initializeChat();
    }
  }, [isOpen, conversationId, storageKey]);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey]);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Check if user has scrolled up
  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 10;
    setShowScrollButton(!isAtBottom);
  }, []);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  // Handle message submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isStreaming) return;

    const messageText = input.trim();
    setInput('');
    setError(null);

    try {
      // Validate and sanitize input
      const sanitizedInput = geminiService.sanitizeInput(messageText);
      
      // Check rate limit
      geminiService.checkRateLimit();

      // Add user message
      const userMessage = {
        id: uuidv4(),
        text: sanitizedInput,
        isBot: false,
        timestamp: new Date().toISOString(),
        status: 'delivered'
      };

      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);
      setIsTyping(true);

      // Create bot message placeholder
      const botMessageId = uuidv4();
      const botMessage = {
        id: botMessageId,
        text: '',
        isBot: true,
        timestamp: new Date().toISOString(),
        status: 'pending'
      };

      setMessages(prev => [...prev, botMessage]);
      setIsStreaming(true);

      // Send message to Gemini
      const response = await geminiService.sendMessage(
        sanitizedInput,
        (partialResponse) => {
          setMessages(prev => prev.map(msg =>
            msg.id === botMessageId
              ? { ...msg, text: partialResponse, status: 'streaming' }
              : msg
          ));
        }
      );

      // Update final message
      setMessages(prev => prev.map(msg => 
        msg.id === botMessageId 
          ? { ...msg, text: response.text, status: 'delivered' }
          : msg
      ));

    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.message);
      
      // Add error message
      const errorMessage = {
        id: uuidv4(),
        text: `❌ ${error.message}`,
        isBot: true,
        timestamp: new Date().toISOString(),
        status: 'error',
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      setIsStreaming(false);
      setTimeout(scrollToBottom, 100);
    }
  }, [input, isLoading, isStreaming, scrollToBottom]);

  // Clear chat history
  const handleClearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(storageKey);
    geminiService.clearChat();
    
    // Reset conversation
    const newConversationId = uuidv4();
    setConversationId(newConversationId);
    
    // Add new welcome message
    const welcomeMessage = {
      id: uuidv4(),
      text: "👋 Chat history cleared! How can I help you today?",
      isBot: true,
      timestamp: new Date().toISOString(),
      status: 'delivered'
    };
    setMessages([welcomeMessage]);
  }, [storageKey]);

  // Handle message regeneration
  const handleRegenerate = async (messageId) => {
    setError(null);
    
    try {
      setIsLoading(true);
      setIsTyping(true);
      
      // Find the message to regenerate
      const messageIndex = messages.findIndex(msg => msg.id === messageId);
      if (messageIndex === -1) return;

      // Update message status
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, text: '', status: 'pending' }
          : msg
      ));

      setIsStreaming(true);

      // Regenerate response
      const response = await geminiService.regenerateLastResponse(
        (partialResponse) => {
          setMessages(prev => prev.map(msg =>
            msg.id === messageId
              ? { ...msg, text: partialResponse, status: 'streaming' }
              : msg
          ));
        }
      );

      // Update final message
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, text: response.text, status: 'delivered', timestamp: new Date().toISOString() }
          : msg
      ));

    } catch (error) {
      console.error('Error regenerating message:', error);
      setError(error.message);
      
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, text: `❌ Failed to regenerate: ${error.message}`, status: 'error', isError: true }
          : msg
      ));
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      setIsStreaming(false);
    }
  };

  // Copy message to clipboard
  const handleCopyMessage = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;

      // Escape to close chat
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      // Ctrl/Cmd + Enter to send message
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleSubmit(e);
        return;
      }

      // Ctrl/Cmd + K to clear chat
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        handleClearChat();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, handleSubmit, handleClearChat, setIsOpen]);

  // Export chat history
  const handleExportChat = () => {
    const chatHistory = messages.map(msg => ({
      role: msg.isBot ? 'Assistant' : 'User',
      message: msg.text,
      timestamp: new Date(msg.timestamp).toLocaleString()
    }));

    const dataStr = JSON.stringify(chatHistory, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `mr-shitcoin-chat-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  // Handle conversation starter click
  const handleStarterClick = (starter) => {
    setInput(starter);
    inputRef.current?.focus();
  };

  // Conversation starters
  const conversationStarters = useMemo(() => 
    geminiService.getConversationStarters(), []
  );

  // Message component
  const MessageComponent = React.memo(({ message, onCopy, onRegenerate }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'} group`}
    >
      <div className={`
        relative max-w-[85%] md:max-w-[75%] sm:max-w-[95vw] p-4 rounded-2xl shadow-sm
        ${message.isBot
          ? 'bg-gray-100 dark:bg-dark-800 text-gray-800 dark:text-dark-100 mr-8'
          : 'bg-primary text-white ml-8'
        }
        ${message.isError ? 'bg-red-50 border border-red-200 text-red-800' : ''}
      `}>
        {/* Message content */}
        <div className="prose prose-sm max-w-none">
          {message.isBot && !message.isError ? (
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                code: ({ children, className }) => (
                  <code className={`px-1 py-0.5 bg-gray-200 dark:bg-dark-700 rounded text-xs ${className || ''}`}>
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-gray-200 dark:bg-dark-700 p-2 rounded text-xs overflow-x-auto">
                    {children}
                  </pre>
                )
              }}
            >
              {message.text}
            </ReactMarkdown>
          ) : (
            <p className="whitespace-pre-wrap">{message.text}</p>
          )}
        </div>

        {/* Message metadata */}
        <div className={`
          flex items-center justify-between mt-2 pt-2 border-t 
          ${message.isBot ? 'border-gray-200 dark:border-dark-700' : 'border-white/20'}
        `}>
          <span className={`text-xs ${message.isBot ? 'text-gray-500 dark:text-dark-400' : 'text-white/80'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          
          <div className="flex items-center space-x-1">
            {/* Status indicator */}
            {message.status === 'pending' && (
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            )}
            {message.status === 'streaming' && (
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            )}
            {message.status === 'delivered' && (
              <div className="w-2 h-2 bg-green-400 rounded-full" />
            )}
            {message.status === 'error' && (
              <div className="w-2 h-2 bg-red-400 rounded-full" />
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="absolute -top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center space-x-1 bg-white dark:bg-dark-800 rounded-full shadow-md p-1">
            <button
              onClick={() => onCopy(message.text)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-full transition-colors"
              title="Copy message"
              aria-label="Copy message"
            >
              <ClipboardDocumentIcon className="w-3 h-3 text-gray-600 dark:text-dark-300" />
            </button>
            
            {message.isBot && !message.isError && (
              <button
                onClick={() => onRegenerate(message.id)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-full transition-colors"
                title="Regenerate response"
                aria-label="Regenerate response"
                disabled={isLoading}
              >
                <ArrowPathIcon className="w-3 h-3 text-gray-600 dark:text-dark-300" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  ));

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg 
          bg-primary text-white hover:bg-primary-600
          transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20
          ${isOpen ? 'scale-0 pointer-events-none' : 'scale-100'}
        `}
        title="Chat with Mr Shitcoin's AI Assistant"
        aria-label="Open chat"
      >
        <ChatBubbleLeftRightIcon className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Chat Container */}
            <motion.div
              ref={chatContainerRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="
                fixed bottom-6 right-6 z-50
                w-80 md:w-[340px] h-[480px] max-h-[70vh]
                bg-white dark:bg-dark-900 rounded-2xl shadow-2xl
                flex flex-col overflow-hidden border border-gray-200 dark:border-dark-700
                max-md:bottom-0 max-md:right-0 max-md:left-0 max-md:w-[95vw] max-md:h-[70vh] max-md:rounded-none
                sm:max-w-[95vw] sm:max-h-[70vh]
              "
              role="dialog"
              aria-labelledby="chat-title"
              aria-describedby="chat-description"
            >
              {/* Header */}
              <div className="bg-primary text-white p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 id="chat-title" className="font-bold text-sm">
                      AI Trading Assistant
                    </h3>
                    <p className="text-xs text-white/80">
                      {isTyping ? 'AI is typing...' : 'Online'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Action buttons */}
                  <button
                    onClick={handleExportChat}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Export chat"
                    aria-label="Export chat history"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={handleClearChat}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Clear chat"
                    aria-label="Clear chat history"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Close chat"
                    aria-label="Close chat"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Container */}
              <div
                ref={messagesContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-dark-950"
                role="log"
                aria-live="polite"
                aria-label="Chat messages"
              >
                {/* Conversation starters */}
                {messages.length <= 1 && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 dark:text-dark-400 mb-3">
                      💡 Try asking about:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {conversationStarters.slice(0, 4).map((starter, index) => (
                        <button
                          key={index}
                          onClick={() => handleStarterClick(starter)}
                          className="
                            text-left p-3 bg-white dark:bg-dark-800 rounded-lg shadow-sm
                            hover:shadow-md transition-all duration-200 text-sm
                            border border-gray-200 dark:border-dark-700
                            hover:border-primary/30 group
                          "
                        >
                          <span className="text-gray-700 dark:text-dark-200 group-hover:text-primary">
                            {starter}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Messages */}
                {messages.map((message) => (
                  <MessageComponent
                    key={message.id}
                    message={message}
                    onCopy={handleCopyMessage}
                    onRegenerate={handleRegenerate}
                  />
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center space-x-2 mb-4"
                  >
                    <div className="bg-gray-200 dark:bg-dark-800 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Error display */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">⚠️ {error}</p>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Scroll to bottom button */}
              <AnimatePresence>
                {showScrollButton && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={scrollToBottom}
                    className="
                      absolute bottom-20 right-4 p-2 bg-primary text-white
                      rounded-full shadow-lg hover:bg-primary-600 transition-colors
                      focus:outline-none focus:ring-2 focus:ring-primary/20
                    "
                    title="Scroll to bottom"
                    aria-label="Scroll to bottom"
                  >
                    ↓
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700">
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                      placeholder="Ask about crypto trading, meme coins, or courses..."
                      className="
                        w-full p-3 border border-gray-300 dark:border-dark-600 rounded-xl
                        focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                        bg-gray-50 dark:bg-dark-800 text-gray-900 dark:text-dark-100
                        placeholder-gray-500 dark:placeholder-dark-400
                        resize-none min-h-[44px] max-h-32
                        sm:text-base sm:p-2
                      "
                      rows="1"
                      disabled={isLoading || isStreaming}
                      aria-label="Message input"
                    />
                    <p className="text-xs text-gray-500 dark:text-dark-400 mt-1">
                      Press Enter to send, Shift+Enter for new line
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading || isStreaming}
                    className="
                      p-3 bg-primary text-white rounded-xl hover:bg-primary-600
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20
                      min-h-[44px] min-w-[44px] flex items-center justify-center
                    "
                    title="Send message"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <PaperAirplaneIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;