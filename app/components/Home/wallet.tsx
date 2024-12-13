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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <div className={`${isSidebarOpen ? 'md:ml-48' : 'md:ml-16'} transition-all duration-300 ease-in-out overflow-hidden`}>
        <SidebarMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>
      <div
        className={`flex flex-col transition-all duration-300 md:${
          isSidebarOpen ? 'ml-[200px]' : 'ml-[50px]'
        } ml-0 flex-grow h-full`}
        style={{ overflowX: 'hidden' }}
      >
        {/* Profile and Account Details */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 flex flex-col md:flex-row items-center justify-between w-full">
          <div>
            {/* Profile details */}
          </div>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition mt-4 md:mt-0">
            Update account details
          </button>
        </div>

        {/* Payment Information */}
        <div className="bg-blue-50 p-4 md:p-6 rounded-lg shadow-md mb-6 w-full">
          <p className="text-sm md:text-base text-blue-600">
            Payments are sent once your earnings reach <strong>$50</strong>. Processing starts after the 15th of each month, and you can withdraw anytime after.
          </p>
        </div>

        {/* Wallet Overview */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6 w-full">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Balance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <div className="p-4 border rounded-md">
              <p className="text-gray-500">Pending payout</p>
              <p className="text-2xl font-bold">USD {balance.pendingPayout}</p>
            </div>
            <div className="p-4 border rounded-md">
              <p className="text-gray-500">Ready to withdraw</p>
              <p className="text-2xl font-bold text-green-600">USD {balance.readyToWithdraw}</p>
            </div>
          </div>
          <button
            className={`w-full py-2 rounded-lg transition ${
              balance.readyToWithdraw > 0
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-300 text-gray-700 cursor-not-allowed'
            }`}
            disabled={balance.readyToWithdraw === 0}
          >
            Withdraw funds
          </button>
        </div>

        {/* Transactions */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full overflow-x-auto">
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
