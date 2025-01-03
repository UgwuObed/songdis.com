import React from 'react';
import { XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const ProfileLimitModal = ({ isOpen, onClose, onUpgrade }: { isOpen: boolean; onClose: () => void; onUpgrade: () => void }) => {
  if (!isOpen) return null;

  const handleUpgradeClick = () => {
    onClose();
    onUpgrade();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40 p-4">
      <div className="bg-white rounded-lg max-w-md w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Profile Limit Reached
          </h2>
          
          {/* Content */}
          <div className="mt-4 space-y-4">
            <p className="text-sm text-gray-500">
              You've reached the maximum number of artist profiles allowed on your current plan.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="font-medium text-sm">Available upgrades:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>Growth Plan: Add up to 3 artist profiles</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>Professional Plan: Unlimited artist profiles</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Not now
          </button>
          <button
            onClick={handleUpgradeClick}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center gap-2"
          >
            View Plans
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileLimitModal;