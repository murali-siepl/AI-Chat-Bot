import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageSquare, Loader2 } from 'lucide-react';
import type { AppDispatch, RootState } from '../../store';
import { sendMessage, clearAttachments, addMessage } from '../../store/chatSlice';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import type { AttachmentType } from '../../types';

const ChatAssistant: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { messages, isLoading, attachments } = useSelector((state: RootState) => state.chat);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string, attachments: AttachmentType[]) => {
    dispatch(addMessage({
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
      attachments,
    }));

    const messageContent = { content, attachments };
    await dispatch(sendMessage(messageContent));
    dispatch(clearAttachments());
  };

  return (
    <div className="h-[calc(100vh-2rem)] mx-auto max-w-[90rem] px-2 sm:px-4 md:px-6">
      <div className="flex h-full flex-col rounded-lg bg-gray-800/50 shadow-lg backdrop-blur-sm border border-gray-700">
        <ChatHeader />
        
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 sm:space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-400">
              <MessageSquare className="h-10 w-10 sm:h-12 sm:w-12 mb-2 text-gray-500" />
              <p className="text-base sm:text-lg font-medium">Welcome to AI Learning Assistant</p>
              <p className="text-xs sm:text-sm max-w-md px-4">
                Ask me anything about your studies, assignments, or learning materials. I'm here to help!
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-xs sm:text-sm">AI is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatAssistant;