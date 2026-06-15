import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: '#F6F3EA', color: '#1E1E1E' }}>
      {/* Sidebar - contains everything: nav, user profile, logout, breadcrumb, mobile toggle */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="flex-1 w-full px-6 lg:px-10 xl:px-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;