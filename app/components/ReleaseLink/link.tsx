import { SetStateAction, useState } from 'react';
import SidebarMenu from '../../components/Home/menu';
import SearchBar from '../../components/Home/search';
import { PlusIcon, ClipboardIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const Link = () => {
  const [search, setSearch] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeReleaseIndex, setActiveReleaseIndex] = useState(null);
  const [editingLinkIndex, setEditingLinkIndex] = useState(null); 
  const [releases, setReleases] = useState([
    { title: 'Timeless', artist: 'Davido', status: 'Live', type: 'Album', cover: '/assets/dashboard/release-1.jpeg', links: [{ platform: 'Apple Music', url: 'https://apple.com' }, { platform: 'Spotify', url: 'https://spotify.com' }, { platform: 'YouTube', url: 'https://youtube.com' }, { platform: 'Deezer', url: 'https://deezer.com' }]},
    { title: 'Bumbum', artist: 'Kdiv', status: 'Live', type: 'Single', cover: '/assets/dashboard/release-5.jpeg', links: [{ platform: 'YouTube', url: 'https://youtube.com' }, { platform: 'Deezer', url: 'https://deezer.com' }]},
    { title: 'Timeless', artist: 'Davido', status: 'Live', type: 'EP', cover: '/assets/dashboard/release-3.jpeg', links: [{ platform: 'Apple Music', url: 'https://apple.com' }, { platform: 'Spotify', url: 'https://spotify.com' }, { platform: 'YouTube', url: 'https://youtube.com' }, { platform: 'Deezer', url: 'https://deezer.com' }]},
    { title: 'Timeless', artist: 'Davido', status: 'Takedown', type: 'Album', cover: '/assets/dashboard/release-4.jpeg', links: [{ platform: 'Apple Music', url: 'https://apple.com' }, { platform: 'Spotify', url: 'https://spotify.com' }, { platform: 'YouTube', url: 'https://youtube.com' }, { platform: 'Deezer', url: 'https://deezer.com' }]},
    { title: 'Chrome', artist: 'Zinoleesky', status: 'Need Doc', type: 'Album', cover: '/assets/dashboard/release-2.jpeg', links: [{ platform: 'Apple Music', url: 'https://apple.com' }, { platform: 'Spotify', url: 'https://spotify.com' }, { platform: 'YouTube', url: 'https://youtube.com' }, { platform: 'Deezer', url: 'https://deezer.com' }]},
    { title: 'Twice As Tall', artist: 'Burna Boy', status: 'Live', type: 'Album', cover: '/assets/dashboard/release-6.jpeg', links: [{ platform: 'Apple Music', url: 'https://apple.com' }, { platform: 'Spotify', url: 'https://spotify.com' }, { platform: 'YouTube', url: 'https://youtube.com' }, { platform: 'Deezer', url: 'https://deezer.com' }]},
  ]);

  const [newPlatform, setNewPlatform] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [editPlatform, setEditPlatform] = useState(''); 
  const [editUrl, setEditUrl] = useState(''); 
  const [useCustomPlatform, setUseCustomPlatform] = useState(false);


  const popularPlatforms = [
    { name: 'Spotify', urlPrefix: 'https://spotify.com/' },
    { name: 'Apple Music', urlPrefix: 'https://apple.com/' },
    { name: 'YouTube Music', urlPrefix: 'https://music.youtube.com/' },
    { name: 'SoundCloud', urlPrefix: 'https://soundcloud.com/' },
    { name: 'Deezer', urlPrefix: 'https://www.deezer.com/' },
  ];

  const handleSearch = (event: { target: { value: SetStateAction<string>; }; }) => setSearch(event.target.value);

  const openModal = (index: number) => setActiveReleaseIndex(index as unknown as SetStateAction<null>);
  const closeModal = () => setActiveReleaseIndex(null);

  const openEditLinkModal = (linkIndex: number) => {
    if (activeReleaseIndex !== null) {
      const linkToEdit = releases[activeReleaseIndex].links[linkIndex];
      setEditPlatform(linkToEdit.platform);
      setEditUrl(linkToEdit.url);
      setEditingLinkIndex(linkIndex as unknown as SetStateAction<null>);
    }
  };
  const closeEditLinkModal = () => setEditingLinkIndex(null);

  const addLink = () => {
    if (newPlatform && newUrl && activeReleaseIndex !== null) {
      const updatedReleases = [...releases];
      updatedReleases[activeReleaseIndex].links.push({ platform: newPlatform, url: newUrl });
      setReleases(updatedReleases);
      setNewPlatform('');
      setNewUrl('');
      setUseCustomPlatform(false); 
    }
  };

  const saveEditedLink = () => {
    if (editPlatform && editUrl && activeReleaseIndex !== null && editingLinkIndex !== null) {
      const updatedReleases = [...releases];
      updatedReleases[activeReleaseIndex].links[editingLinkIndex] = { platform: editPlatform, url: editUrl };
      setReleases(updatedReleases);
      closeEditLinkModal();
    }
  };

  const deleteLink = (releaseIndex: number, linkIndex: number) => {
    const updatedReleases = [...releases];
    updatedReleases[releaseIndex].links = updatedReleases[releaseIndex].links.filter((_, i) => i !== linkIndex);
    setReleases(updatedReleases);
  };

  // Filter releases based on search term
  const filteredReleases = releases.filter((release) =>
    release.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <SidebarMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-48' : 'ml-16'} p-4 overflow-auto`}>
        {/* <SearchBar /> */}

        <div className="bg-white p-6 max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Release Links</h2>
            <p className="text-gray-600">Share your music across the web with pre-save campaign links and release links</p>
          </div>

          <input
            type="text"
            placeholder="Search releases..."
            value={search}
            onChange={handleSearch}
            className="border p-2 rounded w-full sm:w-1/3 mb-6"
          />

          {/* Conditional rendering based on search results */}
          {filteredReleases.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReleases.map((release, index) => (
                <div key={index} className="bg-white shadow rounded-lg p-4">
                  <img src={release.cover} alt={release.title} className="rounded mb-4 w-full" />
                  <h3 className="text-lg font-semibold">{release.title}</h3>
                  <p className="text-sm text-gray-500">{release.artist}</p>
                  <div className="flex justify-between items-center mt-4 space-x-2">
                    <button className="flex items-center text-green-500 hover:text-green-600">
                      <ClipboardIcon className="w-5 h-5 mr-1" />
                    </button>
                    <button onClick={() => openModal(index)} className="flex items-center text-orange-500 hover:text-orange-600">
                      <PencilIcon className="w-5 h-5 mr-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            No releases found for &quot;{search}&quot;. Try a different search term.
          </div>          
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button className="px-4 py-2 rounded bg-gray-200">1</button>
            <button className="px-4 py-2 rounded bg-gray-200">2</button>
            <button className="px-4 py-2 rounded bg-gray-200">3</button>
          </div>
        </div>

        {/* Modal for Managing Links */}
        {activeReleaseIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white rounded-lg p-6 w-3/4 h-3/4 overflow-y-auto">
              <h3 className="text-xl font-semibold mb-4">Manage Links for {releases[activeReleaseIndex].title}</h3>

              <div className="flex flex-col gap-4 mb-4">
                {releases[activeReleaseIndex].links.map((link, linkIndex) => (
                  <div key={linkIndex} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <span className="font-semibold">{link.platform}</span>
                      <p className="text-sm text-gray-500">{link.url}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openEditLinkModal(linkIndex)} className="text-blue-500">
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button onClick={() => deleteLink(activeReleaseIndex, linkIndex)} className="text-red-500">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Link Section */}
              <div className="flex flex-col mb-4 gap-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={useCustomPlatform}
                    onChange={() => setUseCustomPlatform(!useCustomPlatform)}
                    className="form-checkbox"
                  />
                  <span>Use custom platform</span>
                </label>

                {!useCustomPlatform ? (
                  <select
                    onChange={(e) => {
                      const selectedPlatform = popularPlatforms.find(p => p.name === e.target.value);
                      if (selectedPlatform) {
                        setNewPlatform(selectedPlatform.name);
                        setNewUrl(selectedPlatform.urlPrefix);
                      }
                    }}
                    className="border p-2 rounded w-full"
                    defaultValue=""
                  >
                    <option value="" disabled>Select Popular Platform</option>
                    {popularPlatforms.map((platform) => (
                      <option key={platform.name} value={platform.name}>{platform.name}</option>
                    ))}
                  </select>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Platform Name"
                      value={newPlatform}
                      onChange={(e) => setNewPlatform(e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                  </>
                )}
                <button onClick={addLink} className="bg-red-500 text-white rounded px-4 py-2">Add</button>
              </div>

              <button onClick={closeModal} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">Close</button>
            </div>
          </div>
        )}

        {/* Edit Link Modal */}
        {editingLinkIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white rounded-lg p-6 w-1/2 overflow-y-auto">
              <h3 className="text-xl font-semibold mb-4">Edit Link</h3>

              <div className="flex flex-col gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Platform Name"
                  value={editPlatform}
                  onChange={(e) => setEditPlatform(e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  placeholder="URL"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <button onClick={saveEditedLink} className="bg-blue-500 text-white rounded px-4 py-2">Save</button>
              </div>

              <button onClick={closeEditLinkModal} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Link;
