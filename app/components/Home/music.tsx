'use client';

import React, { useState } from 'react';
import SidebarMenu from '../../components/Home/menu';
import SearchBar from '../../components/Home/search';
import Tabs from '../UploadMusic/tabs';
import UploadMusic from '../UploadMusic/upload';
import Releases from '../UploadMusic/releases';
import Tracks from '../UploadMusic/tracks';
import EditHistory from '../UploadMusic/history';
import UploadTypeSelection from '../UploadMusic/type';
import { PlusIcon } from '@heroicons/react/24/outline';

const Music = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState('Releases');
  const [isSelectingType, setIsSelectingType] = useState(false);
  const [uploadType, setUploadType] = useState<'Single' | 'Album/EP'>('Single');


  const handleUploadClick = () => {
    setIsSelectingType(true);
  };


  const handleTypeSelection = (type: 'Single' | 'Album/EP') => {
    setUploadType(type);
    setIsSelectingType(false);
    setSelectedTab('Create New');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <SidebarMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? 'ml-48' : 'ml-16'
        }`}
        style={{ overflowX: 'hidden', width: '100vw' }}
      >
        {/* Search Bar */}
        <SearchBar />

        {/* Content Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Header Section */}
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

          {/* Show Type Selection or Tabs */}
          {isSelectingType ? (
            <UploadTypeSelection onSelect={handleTypeSelection} />
          ) : (
            <>
              {/* Tabs */}
              <Tabs
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                onCreateNew={handleUploadClick} 
              />

              {/* Render Tab Content */}
              {selectedTab === 'Create New' && <UploadMusic uploadType={uploadType} />}
              {selectedTab === 'Releases' && <Releases />}
              {selectedTab === 'Tracks' && <Tracks />}
              {selectedTab === 'Edit History' && <EditHistory />}
            </>
          )}
        </div>
      </div>
    </div>
  );

};
export default Music;
