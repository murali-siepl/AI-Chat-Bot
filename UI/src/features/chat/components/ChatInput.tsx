import React, { useState, useRef } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store';
import { sendMessage, addAttachment, setRecording } from '../../../store/chatSlice';
import type { AttachmentType } from '../../../types';

interface ChatInputProps {
  onSend: (content: string, attachments: AttachmentType[]) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { isRecording, attachments } = useSelector((state: RootState) => state.chat);

  const handleSend = () => {
    if (!input.trim() && attachments.length === 0) return;
    onSend(input, attachments);
    setInput('');
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
    dispatch(setRecording(!isRecording));
  };

  return (
    <div className="border-t border-gray-700/50 p-3 sm:p-4 bg-gray-800/30">
      <div className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <textarea
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyPress={handleKeyPress}
  placeholder="Ask anything about your studies..."
  className="w-full resize-none rounded-xl bg-gray-700/50 border border-gray-600/50 p-3 sm:p-4 text-sm sm:text-base text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 min-h-[4rem] max-h-16 overflow-y-auto transition-all duration-200"
  rows={2}
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
            disabled={!input.trim() && attachments.length === 0}
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
  );
};

export default ChatInput;