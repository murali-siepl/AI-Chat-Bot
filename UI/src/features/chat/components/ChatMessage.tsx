import React from 'react';
import { Paperclip } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../../../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`group relative max-w-[90%] sm:max-w-[85%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
          message.sender === 'user'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-700/50 text-gray-100'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.attachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center space-x-2 text-xs sm:text-sm">
                <Paperclip className="h-3 w-3 sm:h-4 sm:w-4" />
                <a
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline truncate max-w-[200px] sm:max-w-[300px]"
                >
                  {attachment.name}
                </a>
              </div>
            ))}
          </div>
        )}
        <span className="mt-1 text-xs opacity-0 group-hover:opacity-75 transition-opacity absolute bottom-0 right-0 -mb-5 text-gray-500">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;