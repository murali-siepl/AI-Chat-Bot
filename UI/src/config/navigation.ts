import { NavigationItem } from '../types';
import { BookOpen, BarChart2, MessageSquare, FileText, Video } from 'lucide-react';

export const navigation: NavigationItem[] = [
  { name: 'AI Chat Assistant', href: '#', icon: MessageSquare, current: true },
  { name: 'Learning Dashboard', href: '#', icon: BookOpen, current: false },
  { name: 'Progress Analytics', href: '#', icon: BarChart2, current: false },
  { name: 'Study Materials', href: '#', icon: FileText, current: false },
  { name: 'Video Lessons', href: '#', icon: Video, current: false },
];