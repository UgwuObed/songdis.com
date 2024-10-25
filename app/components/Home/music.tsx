'use client';

import React, { useState } from 'react';
import SidebarMenu from '../../components/Home/menu';
import SearchBar from '../../components/Home/search';
import Tabs from '../UploadMusic/tabs'; 
import UploadMusic from '../UploadMusic/upload';
import Releases from '../UploadMusic/releases';
import Tracks from '../UploadMusic/tracks';
import EditHistory from '../UploadMusic/history';


const Music = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState('Create New'); 

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <SidebarMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-48' : 'ml-16'}`}
        style={{ overflowX: 'hidden', width: '100vw' }}
      >
        <SearchBar />

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Manage Releases</h2>

          {/* Tabs */}
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

          {selectedTab === 'Create New' && <UploadMusic />}
          {selectedTab === 'Releases' && <Releases />}
          {selectedTab === 'Tracks' && <Tracks />}
          {selectedTab === 'Edit History' && <EditHistory />}

          {/* Add logic to render other components based on the selectedTab */}
        </div>
      </div>
    </div>
  );
};

export default Music;
