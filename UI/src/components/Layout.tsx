import React, { useState } from 'react';
import { BookOpen, BarChart2, MessageSquare, FileText, Video, Settings, LogOut, Menu, X } from 'lucide-react';
import type { NavigationItem } from '../types';

const navigation: NavigationItem[] = [
  { name: 'AI Chat Assistant', href: '#', icon: MessageSquare, current: true },
  { name: 'Learning Dashboard', href: '/chat', icon: BookOpen, current: false },
  { name: 'Progress Analytics', href: '#', icon: BarChart2, current: false },
  { name: 'Study Materials', href: '#', icon: FileText, current: false },
  { name: 'Video Lessons', href: '#', icon: Video, current: false },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex h-screen">
        {/* Mobile menu button */}
        <div className="fixed top-0 left-0 z-40 md:hidden p-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 rounded-md"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open sidebar</span>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 z-30 md:hidden transition-opacity duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div 
            className="fixed inset-0 bg-gray-900/80" 
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className={`fixed inset-y-0 left-0 flex w-64 flex-col bg-gray-800 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex h-16 items-center justify-between px-4">
                <div className="flex items-center">
                  <MessageSquare className="h-8 w-8 text-indigo-400" />
                  <span className="ml-2 text-xl font-semibold text-white">AIaaS Learn</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-white rounded-md"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <nav className="mt-5 flex-1 space-y-1 px-2">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`${
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      } group flex items-center rounded-md px-2 py-2 text-sm font-medium`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon
                        className={`${
                          item.current ? 'text-indigo-400' : 'text-gray-400 group-hover:text-gray-300'
                        } mr-3 h-5 w-5 flex-shrink-0`}
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="flex flex-shrink-0 border-t border-gray-800 p-4">
                <button className="group block w-full flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-300 group-hover:text-white">
                          John Smith
                        </p>
                        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-400">
                          Student
                        </p>
                      </div>
                    </div>
                    <LogOut className="h-5 w-5 text-gray-400 group-hover:text-gray-300" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex w-64 flex-col">
            <div className="flex min-h-0 flex-1 flex-col border-r border-gray-800 bg-gray-800">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  <MessageSquare className="h-8 w-8 text-indigo-400" />
                  <span className="ml-2 text-xl font-semibold text-white">AIaaS Learn</span>
                </div>
                <nav className="mt-8 flex-1 space-y-1 px-2">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`${
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      } group flex items-center rounded-md px-2 py-2 text-sm font-medium`}
                    >
                      <item.icon
                        className={`${
                          item.current ? 'text-indigo-400' : 'text-gray-400 group-hover:text-gray-300'
                        } mr-3 h-5 w-5 flex-shrink-0`}
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="flex flex-shrink-0 border-t border-gray-800 p-4">
                <button className="group block w-full flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-300 group-hover:text-white">
                          John Smith
                        </p>
                        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-400">
                          Student
                        </p>
                      </div>
                    </div>
                    <LogOut className="h-5 w-5 text-gray-400 group-hover:text-gray-300" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-gray-900 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;