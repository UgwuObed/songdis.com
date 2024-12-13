import { useEffect, useState } from 'react';
import UploadTypeSelection from '../UploadMusic/type';
import SidebarMenu from '../../components/Home/menu';
import { PencilIcon, ShareIcon, EllipsisVerticalIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { BASE_URL } from '../apiConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Link = () => {
  const [search, setSearch] = useState('');
  const [releases, setReleases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSelectingType, setIsSelectingType] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleUploadClick = () => setIsSelectingType(true);

  const handleTypeSelection = (type: string) => {
    console.log(`Selected type: ${type}`);
    setIsSelectingType(false);
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard!');
  };

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/music`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });

        const filteredReleases = response.data.data.data.map((release: any) => ({
          track_title: release.track_title,
          primary_artist: release.primary_artist,
          upload_type: release.upload_type,
          album_art_path: release.album_art_url,
          link: release.link,
        }));

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

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />


      <ToastContainer />
      
      {/* Main Content */}
      <div
        className={`flex-grow p-4 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'md:ml-48' : 'ml-0'
        }`}
      >
        {isSelectingType ? (
          <UploadTypeSelection onSelect={handleTypeSelection} />
        ) : (
          <>
            {/* Search and Filters */}
            <div className="flex flex-col space-y-4 mb-6 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mt-10">
              <div className="w-full sm:w-1/3">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={handleSearch}
                  className="border p-2 rounded w-full"
                />
              </div>
            </div>

            {/* Release Cards */}
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
                      className="bg-white shadow-lg rounded-lg p-3 sm:p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <img
                        src={release.album_art_path}
                        alt={release.track_title}
                        className="rounded-lg mb-3 w-full h-40 sm:h-48 object-cover"
                      />
                      <h3 className="text-base sm:text-lg font-semibold truncate">{release.track_title}</h3>
                      <p className="text-sm text-gray-500 truncate">{release.primary_artist}</p>
                      <div className="flex justify-between items-center mt-3 sm:mt-4">
                        <span className="text-xs sm:text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">
                          {release.upload_type}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3 sm:mt-4 space-x-2">
                        <button className="text-orange-500 hover:text-orange-600 p-1">
                          <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                          className="text-green-500 hover:text-green-600 p-1"
                          onClick={() => handleCopyLink(release.link)}
                        >
                          <ClipboardIcon className="w-4 h-4 sm:w-5 sm:h-5" />
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
          </>
        )}
      </div>
    </div>
  );
};

export default Link;
