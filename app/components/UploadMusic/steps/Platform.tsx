import React from 'react';

const PlatformStep = ({ formState, setFormState }: any) => {
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
    'Soundcloud',
    'Audiomack',
  ];

  const togglePlatform = (platform: string) => {
    const updatedPlatforms = formState.platforms.includes(platform)
      ? formState.platforms.filter((p: string) => p !== platform)
      : [...formState.platforms, platform];
    
    setFormState({
      ...formState,
      platforms: updatedPlatforms,
    });
  };

  const selectAllPlatforms = () => {
    const allPlatformsMessage = 'All platforms, including over 400+ additional distribution channels';
    setFormState({
      ...formState,
      platforms: [...platformOptions, allPlatformsMessage],
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 md:space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Select Distribution Platforms
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Choose where you want your music to be available
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {platformOptions.map((platform) => (
          <div
            key={platform}
            className="relative flex items-center space-x-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-red-200 transition-colors duration-200"
          >
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={formState.platforms.includes(platform)}
                onChange={() => togglePlatform(platform)}
                className="w-4 h-4 text-red-500 border-gray-300 rounded 
                           focus:ring-red-500 focus:ring-offset-0 focus:ring-2
                           cursor-pointer transition-colors duration-200"
              />
            </div>
            <label className="flex-1 text-sm font-medium text-gray-700 cursor-pointer">
              {platform}
            </label>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <button
          onClick={selectAllPlatforms}
          className="w-full bg-red-500 text-white font-medium py-3 px-4 
                     rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 
                     focus:ring-red-500 focus:ring-offset-2 transform 
                     transition-all duration-200 active:scale-[0.98]
                     shadow-sm hover:shadow-md"
        >
          Select All 400+ Platforms
        </button>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            By selecting all, your music will be distributed to all platforms listed above and 
            <span className="font-medium text-gray-700"> over 400+ additional channels</span>. 
            This ensures maximum reach for your music.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlatformStep;