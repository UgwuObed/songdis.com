import { useEffect, useState } from 'react';
import UploadTypeSelection from '../UploadMusic/type';
import { PencilIcon, ShareIcon, EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from "../apiConfig";
import axios from 'axios';

interface Track {
  id: number;
  track_title: string;
  primary_artist: string;
  featured_artists: string | null;
  producers: string | null;
  release_title: string | null;
  upload_type: string;
  album_art_url: string;
  status: string;
  release_date: string;
}

interface GroupedRelease {
  release_title: string | null;
  primary_artist: string;
  upload_type: string;
  album_art_url: string;
  status: string;
  release_date: string;
  tracks: Track[];
}

const TrackListModal = ({ release, onClose }: { release: GroupedRelease; onClose: () => void }) => (
  <motion.div 
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div 
      className="bg-white rounded-lg max-w-2xl w-full p-6 relative"
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      onClick={e => e.stopPropagation()}
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <XMarkIcon className="w-6 h-6" />
      </button>

      <div className="flex items-start space-x-6">
        <motion.img
          src={release.album_art_url}
          alt={release.release_title || ''}
          className="w-48 h-48 object-cover rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{release.release_title}</h2>
          <p className="text-gray-600 mt-1">{release.primary_artist}</p>
          <div className="flex space-x-3 mt-2">
            <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">
              {release.upload_type}
            </span>
            {/* <span className={`text-sm px-2 py-1 rounded ${
              release.status === 'Pending' ? 'bg-yellow-500 text-white' :
              release.status === 'Delivered' ? 'bg-red-500 text-white' :
              release.status === 'Live' ? 'bg-green-500 text-white' :
              release.status === 'NeedDoc' ? 'bg-orange-500 text-white' :
              'bg-gray-400 text-white'
            }`}>
              {release.status}
            </span> */}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Track List</h3>
        <div className="space-y-3">
          {release.tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="font-medium">{index + 1}. {track.track_title}</span>
                  {track.featured_artists && (
                    <span className="text-gray-500 ml-2">ft. {track.featured_artists}</span>
                  )}
                  {track.producers && (
                    <p className="text-sm text-gray-500 mt-1">Produced by {track.producers}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <ShareIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Releases = () => {
  const [search, setSearch] = useState('');
  const [releases, setReleases] = useState<GroupedRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSelectingType, setIsSelectingType] = useState(false);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedRelease, setSelectedRelease] = useState<GroupedRelease | null>(null);

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

        const tracksData: Track[] = response.data.data.data;
        const groupedByRelease: { [key: string]: Track[] } = {};

        tracksData.forEach((track) => {
          const key = track.release_title || `single_${track.id}`;
          if (!groupedByRelease[key]) {
            groupedByRelease[key] = [];
          }
          groupedByRelease[key].push(track);
        });

        const formattedReleases: GroupedRelease[] = Object.values(groupedByRelease).map(tracks => ({
          release_title: tracks[0].release_title,
          primary_artist: tracks[0].primary_artist,
          upload_type: tracks[0].upload_type,
          album_art_url: tracks[0].album_art_url,
          status: tracks[0].status,
          release_date: tracks[0].release_date,
          tracks: tracks
        }));

        setReleases(formattedReleases);
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

  const filteredReleases = releases
    .filter(release => {
      const searchLower = search.toLowerCase();
      const matchesSearch = 
        (release.release_title?.toLowerCase().includes(searchLower) || false) ||
        release.tracks.some(track => track.track_title.toLowerCase().includes(searchLower));
      
      const matchesType = selectedType === 'All' || release.upload_type === selectedType;
      const matchesStatus = statusFilter === 'All' || release.status === statusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      }
      return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
    });

  return (
    <div className="p-2 sm:p-4">
      <AnimatePresence>
        {selectedRelease && (
          <TrackListModal 
            release={selectedRelease} 
            onClose={() => setSelectedRelease(null)} 
          />
        )}
      </AnimatePresence>

      {isSelectingType ? (
        <UploadTypeSelection onSelect={handleTypeSelection} />
      ) : (
        <>
          <div className="flex flex-col space-y-4 mb-6 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
            <div className="w-full sm:w-1/3">
              <input
                type="text"
                placeholder="Search releases or tracks..."
                value={search}
                onChange={handleSearch}
                className="border p-2 rounded w-full"
              />
            </div>
            
            <button 
              className="sm:hidden bg-gray-100 p-2 rounded"
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
            >
              {isFiltersVisible ? 'Hide Filters' : 'Show Filters'}
            </button>

            <div className={`flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4 ${isFiltersVisible ? 'block' : 'hidden sm:flex'}`}>
              <select 
                className="border p-2 rounded"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">Release Type</option>
                <option value="Album">Album</option>
                <option value="EP">EP</option>
                <option value="Single">Single</option>
              </select>
              <select 
                className="border p-2 rounded"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Sort By Latest</option>
                <option value="oldest">Sort By Oldest</option>
              </select>
              <select 
                className="border p-2 rounded"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">Filter By All</option>
                <option value="Live">Live</option>
                <option value="Pending">Pending</option>
                <option value="Delivered">Delivered</option>
                <option value="NeedDoc">Need Doc</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading releases...</p>
          ) : filteredReleases.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredReleases.map((release, index) => (
                <motion.div
                  key={index}
                  className="bg-white shadow rounded-lg p-3 sm:p-4 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedRelease(release)}
                >
                  <div className="relative">
                    <img
                      src={release.album_art_url}
                      alt={release.release_title || release.tracks[0].track_title}
                      className="rounded mb-3 w-full h-40 sm:h-48 object-cover"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold truncate">
                    {release.release_title || release.tracks[0].track_title}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">{release.primary_artist}</p>
                  
                  {release.tracks.length > 1 && (
                    <div className="mt-2 text-sm text-gray-600">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{release.tracks.length} tracks</span>
                        <span className="text-xs text-gray-400">
                          Release: {new Date(release.release_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-3 sm:mt-4">
                    <span className="text-xs sm:text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      {release.upload_type}
                    </span>
                    <span
                      className={`text-xs sm:text-sm px-2 py-1 rounded ${
                        release.status === 'Pending'
                          ? 'bg-yellow-500 text-white'
                          : release.status === 'Delivered'
                          ? 'bg-red-500 text-white'
                          : release.status === 'Live'
                          ? 'bg-green-500 text-white'
                          : release.status === 'NeedDoc'
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-400 text-white'
                      }`}
                    >
                      {release.status}
                    </span>
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
              <p className="text-gray-500">No releases found matching your criteria.</p>
              <button
                onClick={handleUploadClick}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Create New
              </button>
            </div>
          )}

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