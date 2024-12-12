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
  const tabs = ['Releases', 'Create New', 'Edit History'];

  return (
    <div className="border-b border-gray-200">
      <ul className="flex overflow-x-auto whitespace-nowrap space-x-2 md:space-x-4 p-2 md:p-4">
        {tabs.map((tab, idx) => (
          <li
            key={idx}
            className={`cursor-pointer py-2 px-4 rounded-md transition ${
              selectedTab === tab
                ? 'border-b-2 border-red-500 font-bold text-red-500'
                : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
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
