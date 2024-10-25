'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SidebarMenu from '../../components/Home/menu';
import SearchBar from '../../components/Home/search';


const Wallet = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [isLoading, setIsLoading] = useState(true); 
  const [showLoginSuccessNotification, setShowLoginSuccessNotification] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

 
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden"> 
      <SidebarMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-48' : 'ml-16'}`}
        style={{ overflowX: 'hidden', width: '100vw' }}
      >
         <SearchBar />


          {/* Wallet and Delivery Log */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Wallet Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">My Wallet</h2>
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg">
                <p className="text-2xl font-bold">$16,595.015</p>
                <p className="text-sm">Card Balance</p>
                <p className="text-sm mt-2">5282 3456 7890 1289</p>
                <p className="text-sm">09/25</p>
              </div>
              <div className="flex justify-between mt-4">
                <button className="bg-red-600 text-white py-2 px-4 rounded">Withdraw</button>
                <button className="bg-red-600 text-white py-2 px-4 rounded">Transfer</button>
              </div>
            </div>

            {/* Delivery Log Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Delivery Log</h2>
                <select className="text-sm border rounded p-1">
                  <option>14 Sep - 20 Sep</option>
                </select>
              </div>
              <ul className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <li key={item} className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <img src={`/assets/dashboard/release-${item}.png`} alt={`Cover ${item}`} className="w-8 h-8 rounded mr-2" />
                      <span>Cover Me</span>
                    </div>
                    <span>Apple Music (Direct)</span>
                    <span>Sat, 20 Sept 2024</span>
                    <span className="text-green-500">Completed</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Wallet;
