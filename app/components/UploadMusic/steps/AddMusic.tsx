import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, ScissorsIcon } from '@heroicons/react/24/outline';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMusicStep = ({ uploadType, formState, setFormState }: { uploadType: string; formState: any; setFormState: (state: any) => void }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [trackMetadata, setTrackMetadata] = useState({
    trackName: '',
    featuredArtist: '',
    producer: '',
    lyrics: '',
  });

  const audioFiles = formState.audioFiles || [];

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newTracks = Array.from(e.target.files).map((file) => ({
        file,
        trackName: file.name.replace(/\.[^/.]+$/, ''),
        featuredArtist: '',
        producer: '',
        lyrics: '',
        duration: '0:00',
      }));

      if (uploadType === 'Single') {
        if (newTracks.length > 1 || audioFiles.length > 0) {
          toast.error('Upload only one track for a single.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          return;
        }

        const singleTrack = newTracks[0];
        const audio = new Audio(URL.createObjectURL(singleTrack.file));
        audio.onloadedmetadata = () => {
          singleTrack.duration = formatDuration(audio.duration);
          setFormState({
            ...formState,
            audioFiles: [singleTrack],
            trackTitle: singleTrack.trackName,
          });
        };
      } else if (uploadType === 'Album/EP') {
        newTracks.forEach((track) => {
          const audio = new Audio(URL.createObjectURL(track.file));
          audio.onloadedmetadata = () => {
            track.duration = formatDuration(audio.duration);
            setFormState((prevState: { audioFiles: any }) => ({
              ...prevState,
              audioFiles: [...prevState.audioFiles, track],
            }));
          };
        });
      } else {
        toast.error('Track upload is not allowed for this release type.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  const handleEditTrack = (track: any, index: number) => {
    setCurrentTrack(index);
    setTrackMetadata({
      trackName: track.trackName,
      featuredArtist: track.featuredArtist || '',
      producer: track.producer || '',
      lyrics: track.lyrics || '',
    });
    setIsEditModalOpen(true);
  };

  const saveTrackMetadata = () => {
    const updatedTracks = [...audioFiles];
    if (currentTrack !== null) {
      updatedTracks[currentTrack] = {
        ...updatedTracks[currentTrack],
        ...trackMetadata,
      };
      setFormState({ ...formState, audioFiles: updatedTracks });
    }
    setIsEditModalOpen(false);
  };

  const removeTrack = (index: number) => {
    const updatedTracks = audioFiles.filter((_: any, i: number) => i !== index);
    setFormState({ ...formState, audioFiles: updatedTracks });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">Add Your Music</h2>

      {/* Toast Container */}
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
          <div className="mt-4">
            <button
              onClick={() => document.getElementById('audioFileInput')?.click()}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 mx-auto"
            >
              <PlusIcon className="w-5 h-5" />
              Choose {uploadType === 'Single' ? 'Track' : 'Tracks'}
            </button>
            <p className="mt-2 text-sm text-gray-500">Supported formats: MP3, WAV</p>
          </div>
        </div>

{/* Track List */}
{audioFiles.length > 0 && (
  <div className="mt-8 space-y-2">
    {audioFiles.map((track: any, index: number) => (
      <motion.div
        key={index}
        className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {/* Track Number */}
          <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
            {index + 1}
          </div>

          {/* Track Details */}
          <div>
            <h3 className="font-medium text-gray-900">{track.trackName}</h3>
            <p className="text-sm text-gray-500">Duration: {track.duration}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditTrack(track, index)}
            disabled={uploadType === 'Single'}
            className={`flex items-center p-2 rounded-full ${
              uploadType === 'Single'
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <PencilIcon className="w-4 h-4 mr-1" />
            Edit Metadata
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
        className="relative bg-white p-8 rounded-xl shadow-2xl max-w-3xl mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <button
          onClick={() => setIsEditModalOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 text-center">Edit Track Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Track Name</label>
              <input
                type="text"
                value={trackMetadata.trackName}
                onChange={(e) => setTrackMetadata({ ...trackMetadata, trackName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
            <label className="block text-sm text-gray-600 mb-1">
                Featured Artist(s)&nbsp;
                <span className="text-xs text-gray-500">(Separate names with commas)</span>
              </label>
              <input
                type="text"
                value={trackMetadata.featuredArtist}
                onChange={(e) => setTrackMetadata({ ...trackMetadata, featuredArtist: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
            <label className="block text-sm text-gray-600 mb-1">
                Producer(s)&nbsp;
                <span className="text-xs text-gray-500">(Separate names with commas)</span>
              </label>
              <input
                type="text"
                value={trackMetadata.producer}
                onChange={(e) => setTrackMetadata({ ...trackMetadata, producer: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Lyrics</label>
              <textarea
                value={trackMetadata.lyrics}
                onChange={(e) => setTrackMetadata({ ...trackMetadata, lyrics: e.target.value })}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={saveTrackMetadata}
              className="px-8 py-3 bg-red-500 text-white text-lg font-medium rounded-lg hover:bg-red-600 transition-colors"
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
