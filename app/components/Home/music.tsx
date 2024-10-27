'use client';

import React, { useState } from 'react';
import SidebarMenu from '../../components/Home/menu';
import SearchBar from '../../components/Home/search';
import Tabs from '../UploadMusic/tabs'; 
import UploadMusic from '../UploadMusic/upload';
import Releases from '../UploadMusic/releases';
import Tracks from '../UploadMusic/tracks';
import EditHistory from '../UploadMusic/history';
import { PlusIcon } from '@heroicons/react/24/outline';

const Music = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState('Releases'); 

  const handleUploadClick = () => {
    setSelectedTab('Create New');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <SidebarMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-48' : 'ml-16'}`}
        style={{ overflowX: 'hidden', width: '100vw' }}
      >
        <SearchBar />

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Manage Releases</h2>
            <button
              onClick={handleUploadClick}
              className="flex items-center bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition text-sm"
            >
              <PlusIcon className="h-4 w-4 mr-1" /> 
              Create New
            </button>
          </div>

          {/* Tabs */}
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

          {selectedTab === 'Create New' && <UploadMusic />}
          {selectedTab === 'Releases' && <Releases />}
          {selectedTab === 'Tracks' && <Tracks />}
          {selectedTab === 'Edit History' && <EditHistory />}

        </div>
      </div>
    </div>
  );
};

export default Music;
