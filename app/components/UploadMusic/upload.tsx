import { useState } from 'react';
import { motion } from 'framer-motion';

const UploadMusic = () => {
  const [step, setStep] = useState(1);
  const [platforms, setPlatforms] = useState<string[]>([]);

  const platformOptions = [
    'Spotify', 'Apple Music', 'Amazon Music', 'Tidal', 'Deezer', 
    'YouTube Music', 'Pandora', 'TikTok', 'Instagram/Facebook', 'Shazam'
  ];

  const togglePlatform = (platform: string) => {
    setPlatforms((prevPlatforms) =>
      prevPlatforms.includes(platform)
        ? prevPlatforms.filter((p) => p !== platform)
        : [...prevPlatforms, platform]
    );
  };

  const selectAllPlatforms = () => {
    setPlatforms([...platformOptions]);
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => Math.max(1, prevStep - 1));

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
            <input type="text" className={inputStyle} placeholder="Enter Track Title" />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Primary Artist(s)</label>
            <input type="text" className={inputStyle} placeholder="Enter Primary Artist Name" />
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
            <select className={inputStyle}>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Audio File (WAV)</label>
            <input type="file" accept=".wav" className={inputStyle} />
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
            <input type="text" className={inputStyle} placeholder="Enter Release Title" />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Primary Genre</label>
            <select className={inputStyle}>
              <option>Select Genre</option>
              {/* Add genre options here */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Secondary Genre</label>
            <select className={inputStyle}>
              <option>Select Secondary Genre</option>
              {/* Add genre options here */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Release Date</label>
            <input type="date" className={inputStyle} />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Album Artwork (JPG/PNG)</label>
            <input type="file" accept=".jpg,.png" className={inputStyle} />
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
            <textarea className={`${inputStyle} resize-none`} placeholder="Enter Lyrics"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Songwriter Splits</label>
            <input type="text" className={inputStyle} placeholder="Enter Songwriter Splits" />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Credits</label>
            <textarea className={`${inputStyle} resize-none`} placeholder="Enter Credits"></textarea>
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
            <button onClick={() => alert('Music Submitted!')} className="w-full bg-green-500 text-white py-2 ml-2 rounded-lg hover:bg-green-600 transition ease-in-out">Submit</button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UploadMusic;
