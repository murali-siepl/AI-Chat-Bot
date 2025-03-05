export interface User {
  id: string;
  name: string;
  role: 'student' | 'parent' | 'teacher';
  email: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType;
  current: boolean;
}

export interface AttachmentType {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  attachments?: AttachmentType[];
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  attachments: AttachmentType[];
  isRecording: boolean;
}