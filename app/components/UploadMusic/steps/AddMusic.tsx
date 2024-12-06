import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
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

  const audioFiles: Track[] = formState.audioFiles || [];

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const updateFormState = (updatedTracks: Track[]) => {
    setFormState((prev: any) => ({ ...prev, audioFiles: updatedTracks }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
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
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">Add Your Music</h2>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Upload Area */}
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8">
        <div className="text-center">
          <input
            id="audioFileInput"
            type="file"
            className="hidden"
            multiple={uploadType === 'Album/EP'}
            accept=".mp3,.wav"
            onChange={handleFileChange}
          />
          <button
            onClick={() => document.getElementById('audioFileInput')?.click()}
            className={`px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            <PlusIcon className="w-5 h-5 inline" />
            {isLoading ? 'Uploading...' : `Choose ${uploadType === 'Single' ? 'Track' : 'Tracks'}`}
          </button>
          <p className="mt-2 text-sm text-gray-500">Supported formats: MP3, WAV</p>
        </div>

        {/* Track List */}
        {audioFiles.length > 0 && (
          <div className="mt-8 space-y-2">
            {audioFiles.map((track, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{track.trackName}</h3>
                    <p className="text-sm text-gray-500">Duration: {track.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditTrack(track, index)}
                    className={`p-2 rounded-full ${
                      uploadType === 'Single'
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                    disabled={uploadType === 'Single'}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeTrack(index)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <TrashIcon className="w-4 h-4" />
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
        className="w-full max-w-md mx-auto bg-white rounded-lg p-6"
      >
        <h3 className="text-xl font-semibold">Edit Track Metadata</h3>
        <div className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Track Name"
            value={trackMetadata.trackName || ''}
            onChange={(e) => setTrackMetadata({ ...trackMetadata, trackName: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Featured Artist"
            value={trackMetadata.featuredArtist || ''}
            onChange={(e) => setTrackMetadata({ ...trackMetadata, featuredArtist: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Producer"
            value={trackMetadata.producer || ''}
            onChange={(e) => setTrackMetadata({ ...trackMetadata, producer: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Lyrics"
            value={trackMetadata.lyrics || ''}
            onChange={(e) => setTrackMetadata({ ...trackMetadata, lyrics: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="px-4 py-2 text-gray-600 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveMetadata}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddMusicStep;
