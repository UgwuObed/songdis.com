'use client'; 

import Layout from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import { BellIcon, ArrowDownRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation'; 

const Dashboard = () => {
  const router = useRouter();
  const [showLoginSuccessNotification, setShowLoginSuccessNotification] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('loginSuccess') === 'true') {
      setShowLoginSuccessNotification(true);
      setTimeout(() => setShowLoginSuccessNotification(false), 3000); 
    }
  }, []);

  return (
    <Layout>
      {/* Search Field and Profile Section at the top */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md fixed top-0 left-56 right-0 z-50">
        {/* Search Input */}
        <div className="flex-grow mr-6">
          <input
            type="text"
            placeholder="Search for any information"
            className="w-full h-12 px-4 text-sm text-gray-700 bg-gray-100 rounded-full shadow-sm focus:outline-none"
          />
        </div>

        {/* Right Section with Profile, Notification, and Logout */}
        <div className="flex items-center space-x-6">
          {/* Notification Bell Icon */}
          <BellIcon className="h-6 w-6 text-gray-600 cursor-pointer" />

          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            {/* Profile Name and Role */}
            <div>
              <p className="text-sm font-medium text-gray-800">Stelios James</p>
              <p className="text-xs text-gray-500">Artist</p>
            </div>
            {/* Profile Picture */}
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>

          {/* Logout Icon */}
          <ArrowDownRightIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
        </div>
      </div>

      {/* Login Success Notification */}
      {showLoginSuccessNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
          Login successful!
        </div>
      )}

      {/* Dashboard Content */}
      <div className="mt-20 px-6">
        <h1 className="text-2xl font-bold">Dashboard Page</h1>
        <p className="mt-2 text-gray-600">This is my dashboard content.</p>
      </div>
    </Layout>
  );
};
export default Dashboard;
