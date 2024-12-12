import React from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadFile } from "../../../utils/cloudinaryUpload";

const DetailsStep = ({ formState, setFormState, uploadType }: any) => {
  const [loading, setLoading] = React.useState(false); 

  const handleUpload = async (file = formState.albumArt) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      try {
        const response = await uploadFile(formData);
        if (response?.secure_url) {
          setFormState((prevState: any) => ({
            ...prevState,
            albumArt: response.secure_url,
          }));
          toast.success("Artwork uploaded successfully!");
        } else {
          toast.error("Failed to retrieve upload URL.");
        }
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Error uploading file. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Album Art Upload */}
      <div className="flex flex-col items-center space-y-4">
        <label className="text-sm text-gray-600">Upload Album Art (JPEG, PNG)</label>
        <p className="text-xs text-gray-500 text-center">Minimum 3000x3000 size</p>
        <div className="w-32 h-32 sm:w-48 sm:h-48 bg-gray-100 border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center relative">
          {!formState.albumArtPreview ? (
            <div>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={async (e) => {
                  const file = e.target.files?.[0] || null;
                  if (file) {
                    const previewURL = URL.createObjectURL(file);
                    setFormState((prevState: any) => ({
                      ...prevState,
                      albumArt: file,
                      albumArtPreview: previewURL,
                    }));
                    await handleUpload(file);
                  }
                }}
              />
              <span className="text-gray-500 text-xs sm:text-sm">Click to upload</span>
            </div>
          ) : (
            <img
              src={formState.albumArtPreview}
              alt="Album Art Preview"
              className="w-full h-full rounded object-cover"
            />
          )}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
              <div className="loader w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      {/* Details Fields */}
      <div className="col-span-2 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Track Title or Release Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {uploadType === "Album/EP" ? "Release Name" : "Track Title"}
            </label>
            <input
              type="text"
              placeholder={`Enter ${uploadType === "Album/EP" ? "Release Name" : "Track Title"}`}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
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
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              value={formState.primaryArtist}
              onChange={(e) => setFormState({ ...formState, primaryArtist: e.target.value })}
            />
          </div>
        </div>

        {/* Additional Fields */}
        {uploadType !== 'Album/EP' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Featured Artist (Separate with commas)
              </label>
              <input
                type="text"
                placeholder="Enter Featured Artist(s)"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                value={formState.featuredArtists}
                onChange={(e) => setFormState({ ...formState, featuredArtists: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Producer (Separate with commas)</label>
              <input
                type="text"
                placeholder="Enter Producer(s)"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                value={formState.producers}
                onChange={(e) => setFormState({ ...formState, producers: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Explicit Content and Mood */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Explicit Content</label>
            <select
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              value={formState.explicitContent}
              onChange={(e) => setFormState({ ...formState, explicitContent: e.target.value })}
            >
              <option value="" disabled>Select an option</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Mood</label>
            <select
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              value={formState.mood}
              onChange={(e) => setFormState({ ...formState, mood: e.target.value })}
            >
              <option value="" disabled>Select Mood</option>
              <option value="Calm">Calm</option>
              <option value="Happy">Happy</option>
              <option value="Energetic">Energetic</option>
              <option value="Sad">Sad</option>
              <option value="Romantic">Romantic</option>
              <option value="Angry">Angry</option>
            </select>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default DetailsStep;
