import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import axios from 'axios';



const UploadMusic = () => {
  const [step, setStep] = useState(1);
  const [trackTitle, setTrackTitle] = useState('');
  const [primaryArtist, setPrimaryArtist] = useState('');
  const [featuredArtists, setFeaturedArtists] = useState('');
  const [producers, setProducers] = useState('');
  const [explicitContent, setExplicitContent] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [releaseTitle, setReleaseTitle] = useState('');
  const [primaryGenre, setPrimaryGenre] = useState('');
  const [secondaryGenre, setSecondaryGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [albumArt, setAlbumArt] = useState<File | null>(null);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [lyrics, setLyrics] = useState('');
  const [songwriterSplits, setSongwriterSplits] = useState('');
  const [credits, setCredits] = useState('');
  const [genresMoods, setGenresMoods] = useState('');
  const [preOrderDate, setPreOrderDate] = useState('');
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
      formData.append('featured_artists', featuredArtists);
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
      formData.append('songwriter_splits', songwriterSplits);
      formData.append('credits', credits);
      formData.append('genres_moods', genresMoods);
      formData.append('pre_order_date', preOrderDate);

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
  const inputStyle = "w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition ease-in-out";

  return (
    <motion.div
      className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-700">Upload Your Music</h1>
        <div className="text-sm text-gray-500">Step {step} of 4</div>
      </motion.div>

      {/* Step 1: Track Information */}
      {step === 1 && (
        <motion.div>
          <h2 className="text-lg font-semibold mb-6 text-gray-600">Track Information</h2>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Track Title</label>
            <input type="text" className={inputStyle} placeholder="Enter Track Title" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Primary Artist(s)</label>
            <input type="text" className={inputStyle} placeholder="Enter Primary Artist Name" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Featured Artist(s)</label>
            <input type="text" className={inputStyle} placeholder="Enter Featured Artist Name(s)" />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Producer(s)</label>
            <input type="text" className={inputStyle} placeholder="Enter Producer Name(s)" />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Explicit Content</label>
            <select className={inputStyle} required>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Audio File (WAV)</label>
            <input type="file" accept=".wav" className={inputStyle} required />
          </div>
          <button onClick={nextStep} className="w-full bg-red-500 text-white py-2 mt-6 rounded-lg hover:bg-red-600 transition ease-in-out">Next</button>
        </motion.div>
      )}

      {/* Step 2: Release Details */}
      {step === 2 && (
        <motion.div>
          <h2 className="text-lg font-semibold mb-6 text-gray-600">Release Details</h2>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Release Title</label>
            <input type="text" className={inputStyle} placeholder="Enter Release Title" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Primary Genre</label>
            <select className={inputStyle} required>
              <option>Select Genre</option>
              <option>Afro Beat</option>
              <option>Hip Hop</option>
              <option>High Life</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Secondary Genre</label>
            <select className={inputStyle}>
              <option>Select Secondary Genre</option>
              <option>Afro Beats</option>
              <option>Afro Pop</option>
              <option>Afro House</option> 
              <option>Afro Jazz</option>
              <option>Afro Soul</option>
              <option>Afro Disco</option>
              <option>Afro Reggae</option>
              <option>Hip Hop/Rap</option>
              <option>Hip Hop/R&B</option>
              <option>High Life</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Release Date</label>
            <input type="date" className={inputStyle} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Album Artwork (JPG/PNG)</label>
            <input type="file" accept=".jpg,.png" className={inputStyle} required />
          </div>
          <div className="flex justify-between">
            <button onClick={prevStep} className="w-full bg-gray-200 text-gray-700 py-2 mr-2 rounded-lg hover:bg-gray-300 transition ease-in-out">Prev</button>
            <button onClick={nextStep} className="w-full bg-red-500 text-white py-2 ml-2 rounded-lg hover:bg-red-600 transition ease-in-out">Next</button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Distribution Preferences */}
      {step === 3 && (
        <motion.div>
          <h2 className="text-lg font-semibold mb-6 text-gray-600">Distribution Preferences</h2>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Select Platforms</label>
            <div className="grid grid-cols-2 gap-2 mb-4">
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
            <button onClick={selectAllPlatforms} className="w-full bg-blue-200 text-blue-700 py-2 mt-2 rounded-lg hover:bg-blue-300 transition ease-in-out">Select All</button>
          </div>
          <div className="flex justify-between">
            <button onClick={prevStep} className="w-full bg-gray-200 text-gray-700 py-2 mr-2 rounded-lg hover:bg-gray-300 transition ease-in-out">Prev</button>
            <button onClick={nextStep} className="w-full bg-red-500 text-white py-2 ml-2 rounded-lg hover:bg-red-600 transition ease-in-out">Next</button>
          </div>
        </motion.div>
      )}

      {/* Step 4: Additional Information */}
      {step === 4 && (
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
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Pre-order Date (Optional)</label>
            <input type="date" className={inputStyle} />
          </div>
          <div className="flex justify-between">
            <button onClick={prevStep} className="w-full bg-gray-200 text-gray-700 py-2 mr-2 rounded-lg hover:bg-gray-300 transition ease-in-out">Prev</button>
            <button onClick={handleSubmit} className="w-full bg-green-500 text-white py-2 ml-2 rounded-lg hover:bg-green-600 transition ease-in-out">Submit</button>
          </div>
        </motion.div>
      )}
       {/* Modal for success/error messages */}
       <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div
          className={`p-6 rounded-lg shadow-lg ${
            modalType === 'success' ? 'bg-green-100' : 'bg-red-100'
          }`}
        >
          <h2
            className={`text-lg font-semibold ${
              modalType === 'success' ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {modalType === 'success' ? 'Success' : 'Error'}
          </h2>
          <p className="text-gray-800 mt-2">{modalMessage}</p>
          <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </Modal>
    </motion.div>
  );
}

export default UploadMusic;