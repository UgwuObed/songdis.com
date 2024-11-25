const PlatformStep = ({ formState, setFormState }: any) => {
    const platformOptions = [
      "Spotify",
      "Apple Music",
      "Amazon Music",
      "Tidal",
      "Deezer",
      "YouTube Music",
      "Pandora",
      "TikTok",
      "Instagram/Facebook",
      "Shazam",
    ];
  
    const togglePlatform = (platform: string) => {
      setFormState({
        ...formState,
        platforms: formState.platforms.includes(platform)
          ? formState.platforms.filter((p: string) => p !== platform)
          : [...formState.platforms, platform],
      });
    };
  
    const selectAllPlatforms = () => setFormState({ ...formState, platforms: [...platformOptions] });
  
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Select Distribution Platforms</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {platformOptions.map((platform) => (
            <div key={platform} className="flex items-center">
              <input
                type="checkbox"
                checked={formState.platforms.includes(platform)}
                onChange={() => togglePlatform(platform)}
                className="mr-2"
              />
              <label className="text-sm text-gray-700">{platform}</label>
            </div>
          ))}
        </div>
        <button
          onClick={selectAllPlatforms}
          className="w-full bg-red-500 text-white py-2 mt-4 rounded-md hover:bg-red-600 transition ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Select All Platforms
        </button>
      </div>
    );
  };
  
  export default PlatformStep;
  