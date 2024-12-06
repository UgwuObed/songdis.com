import React from "react";
import { uploadFile } from '../../../utils/cloudinaryUpload';

const DetailsStep = ({ formState, setFormState, uploadType }: any) => {
  const [alert, setAlert] = React.useState<{ type: string; message: string } | null>(null);

  const handleUpload = async () => {
    if (formState.albumArt) {
      const formData = new FormData();
      formData.append("file", formState.albumArt);

      try {
        const response = await uploadFile(formData); 
        if (response?.secure_url) {
          setFormState({
            ...formState,
            albumArt: response.secure_url,
          });
          setAlert({ type: "success", message: "Artwork uploaded!" });
        } else {
          setAlert({ type: "error", message: "Failed to retrieve upload URL." });
        }
      } catch (error) {
        console.error("Upload failed:", error);
        setAlert({ type: "error", message: "Error uploading file. Please try again." });
      }
    }
  };

  const AlertPopup = ({ type, message }: { type: string; message: string }) => (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-80 p-4 rounded-md ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      <p>{message}</p>
    </div>
  );

  React.useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div className="grid grid-cols-3 gap-8">
      {/* Album Art Upload */}
      <div className="flex flex-col items-center space-y-4">
        <label className="text-sm text-gray-600">Upload Album Art (JPEG, PNG)</label>
        <p className="text-sm text-black-200">Minimum 3000x3000 size</p>
        <div className="w-48 h-48 bg-gray-100 border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center relative">
          {!formState.albumArtPreview ? (
            <div>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    albumArt: e.target.files?.[0] || null,
                    albumArtPreview: e.target.files?.[0]
                      ? URL.createObjectURL(e.target.files[0])
                      : '',
                  })
                }
              />
              <span className="text-gray-500 text-sm">Click to upload</span>
            </div>
          ) : (
            <img
              src={formState.albumArtPreview}
              alt="Album Art Preview"
              className="w-full h-full rounded object-cover"
            />
          )}
        </div>
        <button
          className={`px-4 py-2 rounded bg-red-500 text-white ${
            !formState.albumArt ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleUpload}
          disabled={!formState.albumArt}
        >
          Upload
        </button>
      </div>

      {/* Details Fields */}
      <div className="col-span-2 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Track Title or Release Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {uploadType === "Album/EP" ? "Release Name" : "Track Title"}
            </label>
            <input
              type="text"
              placeholder={`Enter ${uploadType === "Album/EP" ? "Release Name" : "Track Title"}`}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={uploadType === "Album/EP" ? formState.releaseTitle : formState.trackTitle}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  [uploadType === "Album/EP" ? "releaseTitle" : "trackTitle"]: e.target.value,
                })
              }
            />
          </div>

          {/* Artist Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Artist Name</label>
            <input
              type="text"
              placeholder="Enter Artist Name"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formState.primaryArtist}
              onChange={(e) => setFormState({ ...formState, primaryArtist: e.target.value })}
            />
          </div>
        </div>

        {/* Conditionally Render Featured Artists and Producer */}
        {uploadType !== 'Album/EP' && (
          <div className="grid grid-cols-2 gap-6">
            {/* Featured Artists */}
            <div>
              <div className="relative flex items-center">
                <label className="block text-sm text-gray-600 mb-1">
                  Featured Artist&nbsp;
                  <span className="text-xs text-gray-500">(Separate names with commas)</span>
                </label>
                <div
                  className="ml-2 flex items-center text-xs text-red-400 cursor-help"
                  title="Suggestion: Use commas to separate names. '&' will not separate names."
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M12 4.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z"
                    />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                placeholder="Enter Featured Artist(s)"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formState.featuredArtists}
                onChange={(e) => setFormState({ ...formState, featuredArtists: e.target.value })}
              />
            </div>

            {/* Producer */}
            <div>
              <div className="relative flex items-center">
                <label className="block text-sm text-gray-600 mb-1">
                  Producer&nbsp;
                  <span className="text-xs text-gray-500">(Separate names with commas)</span>
                </label>
                <div
                  className="ml-2 flex items-center text-xs text-red-400 cursor-help"
                  title="Suggestion: Use commas to separate names. '&' will not separate names."
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M12 4.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z"
                    />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                placeholder="Enter Producer(s)"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formState.producers}
                onChange={(e) => setFormState({ ...formState, producers: e.target.value })}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Explicit Content */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Explicit Content</label>
            <select
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formState.explicitContent}
              onChange={(e) => setFormState({ ...formState, explicitContent: e.target.value })}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          {/* Mood */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Mood</label>
            <select
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formState.mood}
              onChange={(e) => setFormState({ ...formState, mood: e.target.value })}
            >
              <option value="" disabled>
                Select Mood
              </option>
              <option value="Calm">Calm</option>
              <option value="Happy">Happy</option>
              <option value="Energetic">Energetic</option>
              <option value="Sad">Sad</option>
              <option value="Romantic">Romantic</option>
              <option value="Angry">Angry</option>
            </select>
          </div>
        </div>
                {/* Display Alert */}
                {alert && <AlertPopup type={alert.type} message={alert.message} />}
      </div>
    </div>
  );
};

export default DetailsStep;
