import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { 
  BookOpen, BarChart2, MessageSquare, 
  FileText, Video, LogOut, X, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { toggleMobileMenu, toggleSidebar } from './../store/uiSlice';
import { RootState } from '../store';
import { logout } from '../store/authSlice';

// ✅ Sidebar Navigation Links
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BookOpen },
  { name: 'AI Chat Assistant', href: '/chat', icon: MessageSquare },
  { name: 'Progress Analytics', href: '/analytics', icon: BarChart2 },
  { name: 'Study Materials', href: '/materials', icon: FileText },
  { name: 'Video Lessons', href: '/videos', icon: Video },
];

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { isMobileMenuOpen, isSidebarCollapsed } = useSelector((state: RootState) => state.ui);

  return (
    <>
      {/* ✅ Mobile Sidebar */}
      <div className={`fixed inset-0 z-30 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="fixed inset-0 bg-gray-900/80" onClick={() => dispatch(toggleMobileMenu())} />
        <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 transform transition-transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <SidebarContent mobile onClose={() => dispatch(toggleMobileMenu())} />
        </div>
      </div>

      {/* ✅ Desktop Sidebar */}
      <div className={`hidden md:flex transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="flex w-full flex-col bg-gray-800 border-r border-gray-800">
          <SidebarContent collapsed={isSidebarCollapsed} />
        </div>
      </div>
    </>
  );
};

// ✅ Sidebar Content Component
interface SidebarContentProps {
  mobile?: boolean;
  onClose?: () => void;
  collapsed?: boolean;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ mobile, onClose, collapsed }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col h-full">
      {/* ✅ Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <MessageSquare className="h-8 w-8 text-indigo-400" />
          {!collapsed && <span className="ml-2 text-xl font-semibold text-white">AIaaS Learn</span>}
        </div>
        <button onClick={mobile ? onClose : () => dispatch(toggleSidebar())} className="text-gray-400 hover:text-white">
          {mobile ? <X className="h-6 w-6" /> : collapsed ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
        </button>
      </div>

      {/* ✅ Navigation Links */}
      <nav className="mt-5 flex-1 space-y-1 px-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} flex items-center rounded-md px-2 py-2 text-sm font-medium`
            }
            onClick={mobile ? onClose : undefined}
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-300" />
            {!collapsed && item.name}
          </NavLink>
        ))}
      </nav>

      {/* ✅ Logout Section */}
      <div className="border-t border-gray-800 p-4">
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to log out?')) {
              dispatch(logout());
            }
          }}
          className="flex items-center justify-between w-full text-gray-300 hover:text-white"
        >
          {!collapsed && <span>{user?.name || 'User'}</span>}
          <LogOut className="h-5 w-5 text-gray-400 group-hover:text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
