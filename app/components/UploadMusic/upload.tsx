import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import axios from 'axios';

const UploadMusic = () => {
  const [step, setStep] = useState(1);
  const [trackTitle, setTrackTitle] = useState('');
  const [primaryArtist, setPrimaryArtist] = useState('');
  const [hasFeaturedArtist, setHasFeaturedArtist] = useState(false);
  const [featuredArtists, setFeaturedArtists] = useState('');
  const [producers, setProducers] = useState('');
  const [explicitContent, setExplicitContent] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [releaseTitle, setReleaseTitle] = useState('');
  const [primaryGenre, setPrimaryGenre] = useState('');
  const [secondaryGenre, setSecondaryGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [preorderDate, setPreorderDate] = useState('');
  const [albumArt, setAlbumArt] = useState<File | null>(null); 
  const [albumArtPreview, setAlbumArtPreview] = useState(""); 

  const handleAlbumArtUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAlbumArt(file);
      setAlbumArtPreview(URL.createObjectURL(file));
    }
  };

  const [platforms, setPlatforms] = useState<string[]>([]);
  const [lyrics, setLyrics] = useState('');
  const [upcCode, setUpcCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');

  const platformOptions = [
    'Spotify',
    'Apple Music',
    'Amazon Music',
    'Tidal',
    'Deezer',
    'YouTube Music',
    'Pandora',
    'TikTok',
    'Instagram/Facebook',
    'Shazam',
  ];

  const togglePlatform = (platform: string) => {
    setPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const selectAllPlatforms = () => setPlatforms([...platformOptions]);


  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('track_title', trackTitle);
      formData.append('primary_artist', primaryArtist);
      if (hasFeaturedArtist) formData.append('featured_artists', featuredArtists);
      formData.append('producers', producers);
      formData.append('explicit_content', explicitContent);
      if (audioFile) formData.append('audio_file', audioFile);
      formData.append('release_title', releaseTitle);
      formData.append('primary_genre', primaryGenre);
      formData.append('secondary_genre', secondaryGenre);
      formData.append('release_date', releaseDate);
      if (albumArt) formData.append('album_art', albumArt);
      formData.append('platforms', JSON.stringify(platforms));
      formData.append('lyrics', lyrics);
      formData.append('upc_code', upcCode);

      await axios.post('/api/upload-music', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setModalMessage('Music uploaded successfully!');
      setModalType('success');
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error uploading music:', error);
      setModalMessage('Failed to upload music.');
      setModalType('error');
      setIsModalOpen(true);
    }
  };

  
  const closeModal = () => setIsModalOpen(false);

  const stepTitles = ['Details', 'Add Music', 'Release', 'Platform', 'Addtional Info'];

  const inputStyle =
    'w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300';

  return (
    <motion.div
      className="bg-white text-black p-8 rounded-lg max-w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Stepper */}
      <div className="flex justify-between items-center mb-8">
        {stepTitles.map((title, index) => (
          <div
            key={index}
            className={`flex-1 flex flex-col items-center ${
              index + 1 <= step ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center border-2 rounded-full ${
                index + 1 <= step ? 'border-red-500' : 'border-gray-500'
              }`}
            >
              {index + 1}
            </div>
            <span className="text-sm mt-2">{title}</span>
          </div>
        ))}
      </div>
{/* Step Content */}
{step === 1 && (
  <motion.div className="space-y-8">
    <div className="grid grid-cols-3 gap-8">
      {/* Album Art Upload Section */}
      <div className="flex flex-col items-center space-y-4">
        <label className="text-sm text-gray-600">Upload Album Art</label>
        <div className="w-48 h-48 bg-gray-100 border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center relative">
          {!albumArtPreview ? (
            <div>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleAlbumArtUpload}
              />
              <span className="text-gray-500 text-sm">Click to upload</span>
            </div>
          ) : (
            <img
              src={albumArtPreview}
              alt="Album Art Preview"
              className="w-full h-full rounded object-cover"
            />
          )}
        </div>
      </div>
      <div className="col-span-2 space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Track Title</label>
            <input
              type="text"
              placeholder="Enter Track Title"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={trackTitle}
              onChange={(e) => setTrackTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Primary Artist</label>
            <input
              type="text"
              placeholder="Enter Primary Artist Name"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={primaryArtist}
              onChange={(e) => setPrimaryArtist(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Featured Artist</label>
            <input
              type="text"
              placeholder="Enter Featured Artist"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={featuredArtists}
              onChange={(e) => setFeaturedArtists(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Producer</label>
            <input
              type="text"
              placeholder="Enter Producer Name"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={producers}
              onChange={(e) => setProducers(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Explicit Content</label>
            <select
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={explicitContent}
              onChange={(e) => setExplicitContent(e.target.value)}
            >
              <option value="" disabled>Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">UPC Code</label>
            <input
              type="text"
              placeholder="Enter UPC Code"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={upcCode}
              onChange={(e) => setUpcCode(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-end">
      <button
        onClick={nextStep}
        className="px-8 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Next Step
      </button>
    </div>
  </motion.div>
)}
      {step === 2 && (
  <motion.div className="space-y-8">
    <h2 className="text-1xl font-semibold text-gray-800">Add Your Music</h2>

    <div className="bg-gray-100 border-dashed border-2 border-gray-300 rounded-lg p-8 text-center relative">
      <p className="text-gray-600 text-sm mb-4">Browse for files or drag and drop them here</p>
      <button
        onClick={() => document.getElementById("audioFileInput")?.click()}
        className="px-4 py-2 bg-gray-200 text-sm text-gray-700 rounded hover:bg-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Choose File
      </button>
      <input
        id="audioFileInput"
        type="file"
        className="hidden"
        onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
      />
    </div>

    <div className="flex justify-between">
      <button
        onClick={prevStep}
        className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Back
      </button>
      <button
        onClick={nextStep}
        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Next Step
      </button>
    </div>

  </motion.div>
)}

{step === 3 && (
  <motion.div className="space-y-8">
    <div className="grid grid-cols-2 gap-8">
      {/* Left Section */}
      <div className="space-y-6">
        {/* Release Title */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Release Title</label>
          <input
            type="text"
            placeholder="Enter Release Title"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={releaseTitle}
            onChange={(e) => setReleaseTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Primary Genre</label>
          <select
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={primaryGenre}
            onChange={(e) => setPrimaryGenre(e.target.value)}
          >
            <option value="">Select Primary Genre</option>
            <option value="Afrobeats">Afrobeats</option>
            <option value="Reggae">Reggae</option>
            <option value="Dancehall">Dancehall</option>
            <option value="Pop">Pop</option>
            <option value="Rap">Rap</option>
            <option value="R&B">R&B</option>
            <option value="Electronic">Electronic</option>
            <option value="Soul">Soul</option>
            <option value="Jazz">Jazz</option>
            <option value="Rock">Rock</option>
            <option value="Classical">Classical</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {/* Secondary Genre */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Secondary Genre</label>
          <select
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={secondaryGenre}
            onChange={(e) => setSecondaryGenre(e.target.value)}
          >
            <option value="">Select Secondary Genre</option>
            <option value="Afrobeats">Afrobeats</option>
            <option value="Reggae">Reggae</option>
            <option value="Dancehall">Dancehall</option>
            <option value="Pop">Pop</option>
            <option value="Rap">Rap</option>
            <option value="R&B">R&B</option>
            <option value="Electronic">Electronic</option>
            <option value="Soul">Soul</option>
            <option value="Jazz">Jazz</option>
            <option value="Rock">Rock</option>
            <option value="Classical">Classical</option>
          </select>
        </div>

        {/* Release Date */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Release Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-8">
      {/* Pre-Order Date */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Pre-Order Date</label>
        <input
          type="date"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={preorderDate}
          onChange={(e) => setPreorderDate(e.target.value)}
        />
      </div>
    </div>

    <div className="flex justify-between mt-6">
      <button
        onClick={prevStep}
        className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Back
      </button>
      <button
        onClick={nextStep}
        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Next Step
      </button>
    </div>
  </motion.div>
)}

{step === 4 && (
  <motion.div className="space-y-8">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Select Distribution Platforms</h2>
    <div className="mb-4">
      <label className="block text-sm text-gray-600">Select Platforms</label>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {platformOptions.map((platform) => (
          <div key={platform} className="flex items-center">
            <input
              type="checkbox"
              checked={platforms.includes(platform)}
              onChange={() => togglePlatform(platform)}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">{platform}</label>
          </div>
        ))}
      </div>
      <button
        onClick={selectAllPlatforms}
        className="w-full bg-red-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Select All Platforms
      </button>
    </div>
    <div className="flex justify-between mt-6">
      <button
        onClick={prevStep}
        className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Back
      </button>
      <button
        onClick={nextStep}
        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Next Step
      </button>
    </div>
  </motion.div>
)}
  {/* Step 5: Additional Information */}
  {step === 5 && (
        <motion.div>
          <h2 className="text-lg font-semibold mb-6 text-gray-600">Additional Information</h2>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Lyrics</label>
            <textarea className={`${inputStyle} resize-none`} placeholder="Enter Lyrics" required></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Songwriter Splits</label>
            <input type="text" className={inputStyle} placeholder="Enter Songwriter Splits" />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Credits</label>
            <textarea className={`${inputStyle} resize-none`} placeholder="Enter Credits" required></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Genres & Moods</label>
            <input type="text" className={inputStyle} placeholder="Enter Genres & Moods" />
          </div>
          <div className="flex justify-between mt-6">
      <button
        onClick={prevStep}
        className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Back
      </button>
      <button
        onClick={nextStep}
        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Submit
      </button>
    </div>
    </motion.div>
  )}
    </motion.div>
  );
};
export default UploadMusic;