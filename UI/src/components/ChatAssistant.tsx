import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, RefreshCw, MessageSquare, Paperclip, Mic, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { sendMessage, clearChat, addAttachment, clearAttachments, setRecording, addMessage } from '../store/chatSlice';
import type { AttachmentType } from '../types';

const ChatAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { messages, isLoading, attachments, isRecording } = useSelector((state: RootState) => state.chat);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && attachments.length === 0) return;

    // Add user message first
    dispatch(addMessage({
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
      attachments: attachments,
    }));

    const messageContent = {
      content: input,
      attachments: attachments,
    };

    await dispatch(sendMessage(messageContent));
    setInput('');
    dispatch(clearAttachments());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const attachment: AttachmentType = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
      };
      dispatch(addAttachment(attachment));
    });
  };

  const handleMicClick = () => {
    if (!isRecording) {
      dispatch(setRecording(true));
    } else {
      dispatch(setRecording(false));
    }
  };

  return (
    <div className="h-[calc(100vh-2rem)] mx-auto max-w-6xl px-2 sm:px-4 md:px-6">
      <div className="flex h-full flex-col rounded-lg bg-gray-800/50 shadow-lg backdrop-blur-sm border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-700/50 p-3 sm:p-4">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-indigo-500 animate-pulse"></div>
            <h3 className="text-base sm:text-lg font-semibold text-white">AI Learning Assistant</h3>
          </div>
          <button
            onClick={() => dispatch(clearChat())}
            className="rounded-md p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 transition-colors"
          >
            <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Messages */}
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
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
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

        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <div className="border-t border-gray-700/50 p-2 bg-gray-800/30">
            <div className="flex flex-wrap gap-2">
              {attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center space-x-2 bg-gray-700/50 rounded-lg px-2 py-1 sm:px-3"
                >
                  <Paperclip className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                  <span className="text-xs sm:text-sm text-gray-200 truncate max-w-[120px] sm:max-w-[150px]">
                    {attachment.name}
                  </span>
                  <button
                    onClick={() => dispatch(clearAttachments())}
                    className="text-gray-400 hover:text-gray-200"
                  >
                    <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-gray-700/50 p-3 sm:p-4 bg-gray-800/30">
          <div className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything about your studies..."
                className="w-full resize-none rounded-xl bg-gray-700/50 border border-gray-600/50 p-2 sm:p-3 text-sm sm:text-base text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 min-h-[2.5rem] max-h-32 transition-all duration-200"
                rows={1}
                style={{ height: Math.min(Math.max(input.split('\n').length, 1) * 24, 128) }}
              />
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 sm:p-3 rounded-xl text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 transition-colors"
                title="Attach file"
              >
                <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={handleMicClick}
                className={`p-2 sm:p-3 rounded-xl transition-colors ${
                  isRecording 
                    ? 'text-red-500 hover:text-red-400 bg-gray-700/50' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
                title={isRecording ? "Stop recording" : "Start recording"}
              >
                <Mic className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={handleSend}
                disabled={isLoading || (!input.trim() && attachments.length === 0)}
                className="rounded-xl bg-indigo-600 p-2 sm:p-3 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Send message"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-400 text-center">
            Press Enter to send, Shift + Enter for new line
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            multiple
          />
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;