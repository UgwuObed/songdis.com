'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SidebarMenu from '../../components/Home/menu';

const Wallet = () => {
  const router = useRouter();
  const [balance, setBalance] = useState({
    pendingPayout: 0,
    readyToWithdraw: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <SidebarMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      {/* Main Content Area */}
      <div
        className={`flex flex-col transition-all duration-300 ${
          isSidebarOpen ? 'ml-[200px]' : 'ml-[50px]'
        } flex-grow h-full`}
        style={{ overflowX: 'hidden' }}
      >
        {/* Profile and Account Details */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-4 flex flex-col md:flex-row items-center justify-between w-full">
          <div>
            {/* <h2 className="text-lg font-semibold text-gray-700">NEHEMIAH MELODY</h2>
            <p className="text-gray-500">Access Bank - 0692527883</p> */}
          </div>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition mt-4 md:mt-0">
            Update account details
          </button>
        </div>

        {/* Wallet Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Balance</h2>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="p-4 border rounded-md">
              <p className="text-gray-500">Pending payout</p>
              <p className="text-2xl font-bold">NGN {balance.pendingPayout}</p>
            </div>
            <div className="p-4 border rounded-md">
              <p className="text-gray-500">Ready to withdraw</p>
              <p className="text-2xl font-bold text-green-600">NGN {balance.readyToWithdraw}</p>
            </div>
          </div>

          <button
            className={`w-full py-2 rounded-lg transition ${
              balance.readyToWithdraw > 0 ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-700 cursor-not-allowed'
            }`}
            disabled={balance.readyToWithdraw === 0}
          >
            Withdraw funds
          </button>
        </div>

        {/* Transactions */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Transactions</h3>

          {transactions.length === 0 ? (
            <p className="text-center text-gray-500 py-10">You do not have any transactions</p>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2">Date</th>
                  <th className="text-left px-4 py-2">Description</th>
                  <th className="text-right px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction: { date: string; description: string; amount: number }, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{transaction.date}</td>
                    <td className="px-4 py-2">{transaction.description}</td>
                    <td className="px-4 py-2 text-right">NGN {transaction.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
