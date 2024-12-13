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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'md:ml-48' : 'md:ml-16'}
      } transition-all duration-300 ease-in-out overflow-hidden`}>
        <SidebarMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>
  
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Search Bar */}
        {/* <div className="p-4 bg-white shadow-sm">
          <SearchBar />
        </div> */}
  
        {/* Content Section */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full p-6 overflow-y-auto">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6 mt-10">
            <h1 className="text-1xl font-bold text-gray-900 ">
                Manage Releases
              </h1>

              <button
                onClick={handleUploadClick}
                className="inline-flex items-center px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                New
              </button>
            </div>
  
            {/* Show Type Selection or Tabs */}
            {isSelectingType ? (
              <div className="w-full max-w-4xl mx-auto">
                <UploadTypeSelection onSelect={handleTypeSelection} />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Tabs */}
                <Tabs
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                  onCreateNew={handleUploadClick} 
                />
  
                {/* Render Tab Content */}
                <div className="w-full">
                {/* Render Tab Content */}
                {selectedTab === 'Create New' && <UploadMusic uploadType={uploadType} />}
                {selectedTab === 'Releases' && <Releases />}
                {selectedTab === 'Tracks' && <Tracks />}
                {selectedTab === 'Edit History' && <EditHistory />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  };
  
  export default Music;
