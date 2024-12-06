'use client';

import React, { SetStateAction, useState } from 'react';
import SidebarMenu from '../../components/Home/menu';

const Managment = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [subscriptionPlan, setSubscriptionPlan] = useState(null); 
  const plans = [
    { name: 'Starter', price: 'NGN 2,000/month', features: ['Access to starter content'] },
    { name: 'Growth', price: 'NGN 5,000/month', features: ['Access to growth content', 'Priority support'] },
    { name: 'Professional', price: 'NGN 10,000/month', features: ['All features', 'Priority support'] },
  ];
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
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-4 flex flex-col md:flex-row items-center justify-between w-full">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Subscribe to Get Access</h2>
            <p className="text-gray-500">Choose a plan and enjoy exclusive content</p>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Subscription Plans</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`p-4 border rounded-md transition cursor-pointer ${
                  subscriptionPlan === plan.name ? 'border-red-500 bg-red-100' : 'border-gray-300'
                }`}
                onClick={() => setSubscriptionPlan(plan.name as unknown as SetStateAction<null>)}
              >
                <h3 className="text-lg font-bold text-gray-700">{plan.name}</h3>
                <p className="text-gray-500">{plan.price}</p>
                <ul className="mt-2 text-sm text-gray-600">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="mt-1">
                      - {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Confirmation */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Confirm Your Subscription</h3>

          {subscriptionPlan ? (
            <div className="text-center">
              <p className="text-gray-700 mb-4">
                You have selected the <strong>{subscriptionPlan}</strong> plan.
              </p>
              <button
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
                onClick={() => alert('Subscription successful!')}
              >
                Subscribe Now
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">
              Please select a subscription plan to proceed.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Managment;
