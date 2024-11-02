import { ChangeEvent, SetStateAction, useState } from 'react';
import SidebarMenu from '../../components/Home/menu';
import { PlusIcon, ClipboardIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const Link = () => {
  const [search, setSearch] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeReleaseIndex, setActiveReleaseIndex] = useState<number | null>(null);
  const [editingLinkIndex, setEditingLinkIndex] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [releases, setReleases] = useState([
    { title: 'Timeless', artist: 'Davido', status: 'Live', type: 'Album', cover: '/assets/dashboard/release-1.jpeg', links: [{ platform: 'Apple Music', url: 'https://apple.com' }, { platform: 'Spotify', url: 'https://spotify.com' }, { platform: 'YouTube', url: 'https://youtube.com' }, { platform: 'Deezer', url: 'https://deezer.com' }]},
    { title: 'Bumbum', artist: 'Kdiv', status: 'Live', type: 'Single', cover: '/assets/dashboard/release-5.jpeg', links: [{ platform: 'YouTube', url: 'https://youtube.com' }, { platform: 'Deezer', url: 'https://deezer.com' }]},
    { title: 'Timeless', artist: 'Davido', status: 'Live', type: 'EP', cover: '/assets/dashboard/release-3.jpeg', links: [{ platform: 'Apple Music', url: 'https://apple.com' }, { platform: 'Spotify', url: 'https://spotify.com' }, { platform: 'YouTube', url: 'https://youtube.com' }, { platform: 'Deezer', url: 'https://deezer.com' }]},
    { title: 'Timeless', artist: 'Davido', status: 'Takedown', type: 'Album', cover: '/assets/dashboard/release-4.jpeg', links: [{ platform: 'Apple Music', url: 'https://apple.com' }, { platform: 'Spotify', url: 'https://spotify.com' }, { platform: 'YouTube', url: 'https://youtube.com' }, { platform: 'Deezer', url: 'https://deezer.com' }]},
    { title: 'Chrome', artist: 'Zinoleesky', status: 'Need Doc', type: 'Album', cover: '/assets/dashboard/release-2.jpeg', links: [{ platform: 'Apple Music', url: 'https://apple.com' }, { platform: 'Spotify', url: 'https://spotify.com' }, { platform: 'YouTube', url: 'https://youtube.com' }, { platform: 'Deezer', url: 'https://deezer.com' }]},
    { title: 'Twice As Tall', artist: 'Burna Boy', status: 'Live', type: 'Album', cover: '/assets/dashboard/release-6.jpeg', links: [{ platform: 'Apple Music', url: 'https://apple.com' }, { platform: 'Spotify', url: 'https://spotify.com' }, { platform: 'YouTube', url: 'https://youtube.com' }, { platform: 'Deezer', url: 'https://deezer.com' }]},
  ]);

  const [newRelease, setNewRelease] = useState({
    title: '',
    artist: '',
    type: 'Single',
    song: '',
    cover: '',
    releaseDate: '',
  });

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

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => setSearch(event.target.value);

  const handleCreateRelease = () => {
    const defaultLinks = popularPlatforms.map(platform => ({
      platform: platform.name,
      url: platform.urlPrefix,
    }));

    const updatedReleases = [...releases, { ...newRelease, status: 'Live', links: defaultLinks }];
    setReleases(updatedReleases);
    setIsCreateModalOpen(false);
    setNewRelease({
      title: '',
      artist: '',
      type: 'Single',
      song: '',
      cover: '',
      releaseDate: '',
    });
  };

  const openModal = (index: number) => setActiveReleaseIndex(() => index);  const closeModal = () => setActiveReleaseIndex(null);

  const openEditLinkModal = (linkIndex: number) => {
    if (activeReleaseIndex !== null) {
      const linkToEdit = releases[activeReleaseIndex].links[linkIndex];
      setEditPlatform(linkToEdit.platform);
      setEditUrl(linkToEdit.url);
      setEditingLinkIndex(linkIndex);
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

  const filteredReleases = releases.filter((release) =>
    release.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleCoverUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewRelease({ ...newRelease, cover: imageUrl });
    }
  };

  const deleteRelease = (index: number) => {
    setReleases(releases.filter((_, i) => i !== index));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const releasesPerPage = 6;
  const indexOfLastRelease = currentPage * releasesPerPage;
  const indexOfFirstRelease = indexOfLastRelease - releasesPerPage;
  const currentReleases = releases.slice(indexOfFirstRelease, indexOfLastRelease);
  const totalPages = Math.ceil(releases.length / releasesPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-[1500px]">
      <SidebarMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-48' : 'ml-16'} p-4 overflow-auto`}>
        <div className="bg-white p-6 max-w-7xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold">Release Links</h2>
              <p className="text-gray-600">Share your music across the web with pre-save campaign links and release links</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-red-500 text-white px-4 py-2 rounded flex items-center space-x-2"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Create New Link</span>
            </button>
          </div>

          <input
            type="text"
            placeholder="Search releases..."
            value={search}
            onChange={handleSearch}
            className="border p-2 rounded w-full sm:w-1/3 mb-6"
          />

          {filteredReleases.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReleases.map((release, index) => (
                <div key={index} className="bg-white shadow rounded-lg p-4">
                  <img src={release.cover} alt={release.title} className="rounded mb-4 w-full h-64 object-cover" />

                  <h3 className="text-lg font-semibold">{release.title}</h3>
                  <p className="text-sm text-gray-500">{release.artist}</p>
                  <div className="flex justify-between items-center mt-4 space-x-2">
                    <button className="flex items-center text-green-500 hover:text-green-600">
                      <ClipboardIcon className="w-5 h-5 mr-1" />
                    </button>
                    <button onClick={() => openModal(index)} className="flex items-center text-orange-500 hover:text-orange-600">
                      <PencilIcon className="w-5 h-5 mr-1" />
                    </button>
                    <button onClick={() => deleteRelease(index)} className="flex items-center text-red-500 hover:text-red-600">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">No releases found for &quot{search}&quot. Try a different search term.</div>
          )}
        </div>
      </div>

      {/* Create New Release Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-6 w-3/4 max-w-md">
            <h3 className="text-xl font-semibold mb-4">Create New Release Link</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                <input
                  type="file"
                  onChange={handleCoverUpload}
                  className="mt-1 block w-full border rounded-md p-2"
                />
                {newRelease.cover && <img src={newRelease.cover} alt="Cover Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />}
              </div>
          
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={newRelease.type}
                  onChange={(e) => setNewRelease({ ...newRelease, type: e.target.value })}
                  className="mt-1 block w-full border rounded-md p-2"
                >
                  <option value="Single">Single</option>
                  <option value="Album">Album</option>
                  <option value="EP">EP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Song</label>
                <select
                  value={newRelease.song}
                  onChange={(e) => setNewRelease({ ...newRelease, song: e.target.value })}
                  className="mt-1 block w-full border rounded-md p-2"
                >
                  <option value="Single">Bumbum</option>
                  <option value="Album">Love Ass</option>
                  <option value="EP">Ekebe</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Release Date</label>
                <input
                  type="date"
                  value={newRelease.releaseDate}
                  onChange={(e) => setNewRelease({ ...newRelease, releaseDate: e.target.value })}
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border rounded-md text-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateRelease}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  disabled={!newRelease.title || !newRelease.artist || !newRelease.cover}
                >
                  Create Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

      <div className="flex justify-center mt-6 space-x-3">
  <button onClick={goToPreviousPage} disabled={currentPage === 1} className="px-3 py-1 rounded bg-gray-200">
    Previous
  </button>
  <span>{currentPage} of {totalPages}</span>
  <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-3 py-1 rounded bg-gray-200">
    Next
  </button>
</div>
    </div>
  );
};

export default Link;
