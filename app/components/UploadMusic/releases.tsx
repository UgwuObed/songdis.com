import { useEffect, useState } from 'react';
import UploadTypeSelection from '../UploadMusic/type';
import { PencilIcon, ShareIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { BASE_URL } from "../apiConfig";
import axios from 'axios';

const Releases = () => {
  const [search, setSearch] = useState('');
  const [releases, setReleases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSelectingType, setIsSelectingType] = useState(false);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const handleUploadClick = () => {
    setIsSelectingType(true);
  };

  const handleTypeSelection = (type: string) => {
    console.log(`Selected type: ${type}`);
    setIsSelectingType(false);
  };

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/music`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        const filteredReleases = response.data.data.data.map((release: any) => ({
          track_title: release.track_title,
          primary_artist: release.primary_artist,
          upload_type: release.upload_type,
          album_art_path: release.album_art_url,
          status: release.status, 
        }));
console.log(filteredReleases);
        setReleases(filteredReleases);
      } catch (error) {
        console.error('Error fetching releases:', error);
        setReleases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReleases();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value);

  return (
    <div className="p-2 sm:p-4">
      {isSelectingType ? (
        <UploadTypeSelection onSelect={handleTypeSelection} />
      ) : (
        <>
          {/* Search and Filters */}
          <div className="flex flex-col space-y-4 mb-6 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
            <div className="w-full sm:w-1/3">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearch}
                className="border p-2 rounded w-full"
              />
            </div>
            
            {/* Mobile Filter Toggle */}
            <button 
              className="sm:hidden bg-gray-100 p-2 rounded"
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
            >
              {isFiltersVisible ? 'Hide Filters' : 'Show Filters'}
            </button>

            {/* Filters - responsive */}
            <div className={`flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4 ${isFiltersVisible ? 'block' : 'hidden sm:flex'}`}>
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

          {/* Release Cards - responsive grid */}
          {loading ? (
            <p className="text-center text-gray-500">Loading releases...</p>
          ) : releases.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {releases
                .filter((release) =>
                  release.track_title && release.track_title.toLowerCase().includes(search.toLowerCase())
                )
                .map((release, index) => (
                  <motion.div
                    key={index}
                    className="bg-white shadow rounded-lg p-3 sm:p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative">
                      <img
                        src={release.album_art_path}
                        alt={release.track_title}
                        className="rounded mb-3 w-full h-40 sm:h-48 object-cover"
                      />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold truncate">{release.track_title}</h3>
                    <p className="text-sm text-gray-500 truncate">{release.primary_artist}</p>
                    <div className="flex justify-between items-center mt-3 sm:mt-4">
                      <span className="text-xs sm:text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        {release.upload_type}
                      </span>
                      <div className="flex justify-between items-center mt-3 sm:mt-4">
                  <span
                    className={`text-xs sm:text-sm px-2 py-1 rounded ${
                      release.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : release.status === 'complete'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {release.status}
                  </span>
                 </div>
                    </div>
                    <div className="flex justify-between items-center mt-3 sm:mt-4 space-x-2">
                      <button className="text-orange-500 hover:text-orange-600 p-1">
                        <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button className="text-green-500 hover:text-green-600 p-1">
                        <ShareIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button className="text-blue-500 p-1">
                        <EllipsisVerticalIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          ) : (
            <div className="text-center mt-8 sm:mt-10">
              <p className="text-gray-500">You don't have any releases yet.</p>
              <button
                onClick={handleUploadClick}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Create New
              </button>
            </div>
          )}

          {/* Pagination - responsive */}
          {releases.length > 0 && (
            <div className="flex justify-center items-center mt-6 sm:mt-8 space-x-2">
              <button className="px-3 py-1 sm:px-4 sm:py-2 rounded bg-gray-200">1</button>
              <button className="px-3 py-1 sm:px-4 sm:py-2 rounded bg-gray-200">2</button>
              <button className="px-3 py-1 sm:px-4 sm:py-2 rounded bg-gray-200">3</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Releases;