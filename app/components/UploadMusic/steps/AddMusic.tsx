import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import { uploadFile } from '../../../utils/cloudinaryUpload';
import 'react-toastify/dist/ReactToastify.css';

interface AddMusicStepProps {
  uploadType: 'Single' | 'Album/EP';
  formState: any;
  setFormState: (state: any) => void;
}

interface Track {
  file: File;
  trackName: string;
  featuredArtist: string;
  producer: string;
  lyrics: string;
  duration: string;
  audioFileUrl?: string;
}

const AddMusicStep: React.FC<AddMusicStepProps> = ({
  uploadType,
  formState,
  setFormState,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [trackMetadata, setTrackMetadata] = useState<Partial<Track>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const audioFiles: Track[] = formState.audioFiles || [];

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const updateFormState = (updatedTracks: Track[]) => {
    setFormState((prev: any) => ({ ...prev, audioFiles: updatedTracks }));
  };

  const handleFileChange = async (files: FileList | null) => {
    if (!files) return;

    const newTracks: Track[] = Array.from(files).map((file) => ({
      file,
      trackName: file.name.replace(/\.[^/.]+$/, ''),
      featuredArtist: '',
      producer: '',
      lyrics: '',
      duration: '0:00',
    }));

    if (uploadType === 'Single' && (newTracks.length > 1 || audioFiles.length > 0)) {
      toast.error('Only one track is allowed for a single upload.');
      return;
    }

    setIsLoading(true);

    try {
      const uploadedTracks = await Promise.all(
        newTracks.map(async (track) => {
          const formData = new FormData();
          formData.append('file', track.file);

          const response = await uploadFile(formData);
          if (response?.secure_url) {
            const audio = new Audio(response.secure_url);
            await new Promise((resolve) => (audio.onloadedmetadata = resolve));
            return {
              ...track,
              audioFileUrl: response.secure_url,
              duration: formatDuration(audio.duration),
            };
          }
          throw new Error('Upload failed');
        })
      );

      updateFormState([...audioFiles, ...uploadedTracks]);
      toast.success(`${uploadedTracks.length} track(s) uploaded successfully!`);
    } catch (error) {
      toast.error('Error uploading files. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleEditTrack = (track: Track, index: number) => {
    if (uploadType === 'Single') return;
    setCurrentTrackIndex(index);
    setTrackMetadata(track);
    setIsEditModalOpen(true);
  };

  const handleSaveMetadata = () => {
    if (currentTrackIndex === null) return;

    const updatedTracks = [...audioFiles];
    updatedTracks[currentTrackIndex] = {
      ...updatedTracks[currentTrackIndex],
      ...trackMetadata,
    };

    updateFormState(updatedTracks);
    setIsEditModalOpen(false);
    toast.success('Track metadata updated successfully!');
  };

  const removeTrack = (index: number) => {
    const updatedTracks = audioFiles.filter((_, i) => i !== index);
    updateFormState(updatedTracks);
    toast.info('Track removed.');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 md:space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Add Your Music</h2>
        <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
          {uploadType}
        </span>
      </div>

      <ToastContainer />

      {/* Upload Area */}
      <div
        className={`relative bg-gray-50 border-2 border-dashed rounded-xl p-6 md:p-8 transition-colors duration-200
          ${isDragging ? 'border-red-500 bg-red-50' : 'border-gray-300'}
          ${isLoading ? 'opacity-50' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <MusicalNoteIcon className="w-8 h-8 text-red-500" />
          </div>
          <input
            id="audioFileInput"
            type="file"
            className="hidden"
            multiple={uploadType === 'Album/EP'}
            accept=".mp3,.wav"
            onChange={(e) => handleFileChange(e.target.files)}
          />
          <div>
            <button
              onClick={() => document.getElementById('audioFileInput')?.click()}
              className={`px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 
                         transition-all duration-200 transform hover:scale-105 
                         shadow-sm hover:shadow-md ${isLoading ? 'cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              <PlusIcon className="w-5 h-5 inline-block mr-2" />
              {isLoading ? 'Uploading...' : `Choose ${uploadType === 'Single' ? 'Track' : 'Tracks'}`}
            </button>
            <p className="mt-3 text-sm text-gray-500">
              Drag and drop your files here or click to browse
            </p>
            <p className="text-xs text-gray-400">Supported formats: MP3, WAV</p>
          </div>
        </div>

        {/* Track List */}
        {audioFiles.length > 0 && (
          <div className="mt-8 space-y-3">
            {audioFiles.map((track, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-between p-4 bg-white rounded-lg border 
                         border-gray-200 hover:border-red-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full 
                                flex items-center justify-center font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{track.trackName}</h3>
                    <p className="text-sm text-gray-500">
                      Duration: {track.duration}
                      {track.featuredArtist && ` • Feat. ${track.featuredArtist}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditTrack(track, index)}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      uploadType === 'Single'
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                    disabled={uploadType === 'Single'}
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => removeTrack(index)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 
                             rounded-lg transition-colors duration-200"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Metadata Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="w-full max-w-lg mx-auto mt-20 bg-white rounded-xl p-6 shadow-xl"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center"
      >
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800">Edit Track Metadata</h3>
            <p className="text-sm text-gray-500 mt-1">Update track information</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Track Name</label>
              <input
                type="text"
                value={trackMetadata.trackName || ''}
                onChange={(e) => setTrackMetadata({ ...trackMetadata, trackName: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Featured Artist</label>
              <input
                type="text"
                value={trackMetadata.featuredArtist || ''}
                onChange={(e) => setTrackMetadata({ ...trackMetadata, featuredArtist: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Producer</label>
              <input
                type="text"
                value={trackMetadata.producer || ''}
                onChange={(e) => setTrackMetadata({ ...trackMetadata, producer: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Lyrics</label>
              <textarea
                value={trackMetadata.lyrics || ''}
                onChange={(e) => setTrackMetadata({ ...trackMetadata, lyrics: e.target.value })}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 
                       transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveMetadata}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                       transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddMusicStep;