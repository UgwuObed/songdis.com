import { useState } from 'react';

const Tabs = ({
  selectedTab,
  setSelectedTab,
  onCreateNew,
}: {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  onCreateNew: () => void;
}) => {
  const tabs = ['Releases', 'Create New', 'Tracks', 'Edit History'];

  return (
    <div className="border-b border-gray-200">
      <br />
      <ul className="flex space-x-4">
        {tabs.map((tab, idx) => (
          <li
            key={idx}
            className={`cursor-pointer py-2 px-4 ${
              selectedTab === tab ? 'border-b-2 border-red-500 font-bold' : 'text-gray-500'
            }`}
            onClick={() => {
              if (tab === 'Create New') {
                onCreateNew(); 
              } else {
                setSelectedTab(tab);
              }
            }}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
