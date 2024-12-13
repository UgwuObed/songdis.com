'use client';

import React, { useState } from 'react';
import { BellIcon, ArrowDownRightIcon } from '@heroicons/react/24/outline';


const SearchBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex-grow mr-6">
        {/* <input
          type="text"
          placeholder="Search for any information"
          className="w-full h-12 px-4 text-sm text-gray-700 bg-gray-100 rounded-full shadow-sm focus:outline-none"
        /> */}
      </div>
      <div className="flex items-center space-x-6">
        <BellIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-sm font-medium text-gray-800">Stelios James</p>
            {/* <p className="text-xs text-gray-500">Artist</p> */}
          </div>
          <img src="https://via.placeholder.com/40" alt="Profile" className="w-10 h-10 rounded-full" />
        </div>
        {/* <ArrowDownRightIcon className="h-6 w-6 text-gray-600 cursor-pointer" /> */}
      </div>
    </div>
  );
};

export default SearchBar;
