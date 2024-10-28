import { useState } from 'react';
import SidebarMenu from '../../components/Home/menu';
import SearchBar from '../../components/Home/search';
import { PlusIcon } from '@heroicons/react/24/outline';

const Link = () => {
  const [search, setSearch] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [releases] = useState([
    { title: 'Timeless', artist: 'Davido', status: 'Live', type: 'Album', cover: '/assets/dashboard/release-1.jpeg' },
    { title: 'Bumbum', artist: 'Kdiv', status: 'Live', type: 'Single', cover: '/assets/dashboard/release-5.jpeg' },
    { title: 'Timeless', artist: 'Davido', status: 'Live', type: 'EP', cover: '/assets/dashboard/release-3.jpeg' },
    { title: 'Timeless', artist: 'Davido', status: 'Takedown', type: 'Album', cover: '/assets/dashboard/release-4.jpeg' },
    { title: 'Chrome', artist: 'Zinoleesky', status: 'Need Doc', type: 'Album', cover: '/assets/dashboard/release-2.jpeg' },
    { title: 'Twice As Tall', artist: 'Burna Boy', status: 'Live', type: 'Album', cover: '/assets/dashboard/release-6.jpeg' },
  ]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <SidebarMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-48' : 'ml-16'} p-4`}
        style={{ overflowX: 'hidden', width: '100vw' }}
      >
        <SearchBar />

        <div className="bg-white p-6  max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Release Links</h2>
            <p className="text-gray-600">Share your music across the web with pre-save campaign links and release links</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6 gap-4">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
              className="border p-2 rounded w-full sm:w-1/3"
            />
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <select className="border p-2 rounded w-full sm:w-auto">
                <option>Release Type</option>
                <option>Album</option>
                <option>EP</option>
                <option>Single</option>
              </select>
              <select className="border p-2 rounded w-full sm:w-auto">
                <option>Sort By Latest</option>
                <option>Sort By Oldest</option>
              </select>
              <select className="border p-2 rounded w-full sm:w-auto">
                <option>Filter By All</option>
                <option>Live</option>
                <option>Takedown</option>
                <option>Need Doc</option>
              </select>
            </div>
          </div>

          {/* Release Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {releases
              .filter((release) => release.title.toLowerCase().includes(search.toLowerCase()))
              .map((release, index) => (
                <div key={index} className="bg-white shadow rounded-lg p-4">
                  <img
                    src={release.cover}
                    alt={release.title}
                    className="rounded mb-4 w-full"
                  />
                  <h3 className="text-lg font-semibold">{release.title}</h3>
                  <p className="text-sm text-gray-500">{release.artist}</p>
                  <div className="flex justify-between items-center mt-4 space-x-2">
                    <button className="text-blue-500">Copy</button>
                    <button className="text-blue-500">Edit</button>
                  </div>
                </div>
              ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button className="px-4 py-2 rounded bg-gray-200">1</button>
            <button className="px-4 py-2 rounded bg-gray-200">2</button>
            <button className="px-4 py-2 rounded bg-gray-200">3</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Link;
