import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleMobileMenu } from './../store/uiSlice';
import { Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-900 text-white flex items-center justify-between px-4 py-3 shadow-md">
      <button onClick={() => dispatch(toggleMobileMenu())} className="md:hidden">
        <Menu className="h-6 w-6" />
      </button>
      <h1 className="text-lg font-semibold">AIaaS Learn</h1>
    </div>
  );
};

export default Navbar;
