import React from 'react';
import { InboxIcon } from '@heroicons/react/24/outline';

const History = ({ message = "Nothing here yet" }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <InboxIcon className="text-gray-400 mb-4" style={{ width: '84px', height: '84px' }} />
      <h2 className="text-2xl font-semibold text-gray-700">{message}</h2>
      <p className="text-gray-500 mt-2">Check back later for updates.</p>
    </div>
  );
};

export default History;
