import { useState } from 'react';
import { PencilIcon, ShareIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';

const Releases = () => {
  const [search, setSearch] = useState('');
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
    <div className="p-4">
      {/* Search and Filters */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          className="border p-2 rounded w-1/3"
        />
        <div className="flex space-x-4">
          <select className="border p-2 rounded">
            <option>Release Type</option>
            <option>Album</option>
            <option>EP</option>
            <option>Single</option>
          </select>
          <select className="border p-2 rounded">
            <option>Sort By Latest</option>
            <option>Sort By Oldest</option>
          </select>
          <select className="border p-2 rounded">
            <option>Filter By All</option>
            <option>Live</option>
            <option>Takedown</option>
            <option>Need Doc</option>
          </select>
        </div>
      </div>

      {/* Release Cards */}
      <div className="grid grid-cols-3 gap-6">
        {releases
          .filter((release) =>
            release.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((release, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-4">
              <img
                src={release.cover}
                alt={release.title}
                className="rounded mb-4 w-full"
              />
              <h3 className="text-lg font-semibold">{release.title}</h3>
              <p className="text-sm text-gray-500">{release.artist}</p>
              <div className="flex justify-between items-center mt-4">
                <span
                  className={`px-2 py-1 rounded ${
                    release.status === 'Live'
                      ? 'bg-green-100 text-green-600'
                      : release.status === 'Takedown'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {release.status}
                </span>
                <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  {release.type}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4 space-x-2">
                <button className="text-blue-500 flex items-center text-orange-500 hover:text-orange-600">
                  <PencilIcon className="w-5 h-5 mr-1" />
                </button>
                <button className="text-blue-500 flex items-center text-green-500 hover:text-green-600">
                  <ShareIcon className="w-5 h-5 mr-1" /> 
                </button>
                <button className="text-blue-500 flex items-center">
                  <EllipsisVerticalIcon className="w-5 h-5 mr-1" />
                </button>
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
  );
};

export default Releases;
