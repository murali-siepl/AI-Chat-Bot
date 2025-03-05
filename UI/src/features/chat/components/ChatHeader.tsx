import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { clearChat } from '../../../store/chatSlice';

const ChatHeader: React.FC = () => {
  const dispatch = useDispatch();

  return (
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
  );
};

export default ChatHeader;