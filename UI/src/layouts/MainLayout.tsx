import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-gray-900 p-6">
            <Outlet />  {/* This will render the child routes */}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
