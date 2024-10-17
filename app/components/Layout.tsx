import SidebarMenu from './Home/menu'; 
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      {/* Sidebar Menu */}
      {/* <SidebarMenu /> */}
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;