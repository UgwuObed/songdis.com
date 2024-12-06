import { useEffect, useState } from 'react';
import { PencilIcon, ShareIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { BASE_URL } from "../apiConfig";
import axios from 'axios';

const Releases = () => {
  const [search, setSearch] = useState('');
  const [releases, setReleases] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [isSelectingType, setIsSelectingType] = useState(false);

  const handleUploadClick = () => {
    setIsSelectingType(true);
  };

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/albums-ep`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        const filteredReleases = response.data.data.map((release: any) => ({
          release_title: release.release_title,
          primary_artist: release.primary_artist,
          upload_type: release.upload_type,
          album_art_url: release.album_art_url,
        }));

        setReleases(filteredReleases);
      } catch (error) {
        console.error('Error fetching albums/EPs:', error);
        setReleases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReleases();
  }, []);

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
      {loading ? (
        <p className="text-center text-gray-500">Loading releases...</p>
      ) : releases.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
         {releases
        .filter((release) =>
          release.release_title && release.release_title.toLowerCase().includes(search.toLowerCase())
        )
        .map((release, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-4">
            <img
              src={release.album_art_path}
              alt={release.release_title}
              className="rounded mb-4 w-full"
            />
            <h3 className="text-lg font-semibold">{release.release_title}</h3>
            <p className="text-sm text-gray-500">{release.primary_artist}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">
                {release.upload_type}
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
      ) : (
        <div className="text-center mt-10">
          <p className="text-gray-500">You don't have any releases yet.</p>
          <button 
          onClick={handleUploadClick}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Create New
          </button>
        </div>
      )}

      {/* Pagination */}
      {releases.length > 0 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button className="px-4 py-2 rounded bg-gray-200">1</button>
          <button className="px-4 py-2 rounded bg-gray-200">2</button>
          <button className="px-4 py-2 rounded bg-gray-200">3</button>
        </div>
      )}
    </div>
  );
};

export default Releases;
