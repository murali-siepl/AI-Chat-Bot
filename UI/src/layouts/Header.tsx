import React from 'react';
import { Menu } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleMobileMenu } from '../store/uiSlice';

const Header: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="flex h-16 items-center justify-between px-4">
        <button
          onClick={() => dispatch(toggleMobileMenu())}
          className="md:hidden text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

export default Header;