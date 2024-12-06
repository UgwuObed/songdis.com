import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, ScissorsIcon } from '@heroicons/react/24/outline';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import { uploadFile } from '../../../utils/cloudinaryUpload';
import 'react-toastify/dist/ReactToastify.css';

const AddMusicStep = ({ uploadType, formState, setFormState }: { uploadType: string; formState: any; setFormState: (state: any) => void }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);
  const [trackMetadata, setTrackMetadata] = useState({
    trackName: '',
    featuredArtist: '',
    producer: '',
    lyrics: '',
    audioFile: null,
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
          });
          return;
        }
        const singleTrack = newTracks[0];
        handleUpload(singleTrack);
      } else if (uploadType === 'Album/EP') {
        newTracks.forEach((track) => handleUpload(track));
      } else {
        toast.error('Track upload is not allowed for this release type.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };

  const handleUpload = async (track: any) => {
    const formData = new FormData();
    formData.append("file", track.file);
  
    try {
      const response = await uploadFile(formData);
      console.log('Upload response:', response); // Logs the full response object
  
      if (response?.secure_url) {
        console.log('Secure URL:', response.secure_url); // Logs the secure_url
  
        const updatedTrack = {
          ...track,
          audioFileUrl: response.secure_url,  // Add the secure_url here
        };
  
        // Update duration once the audio is loaded
        const audio = new Audio(response.secure_url);
        audio.onloadedmetadata = () => {
          updatedTrack.duration = formatDuration(audio.duration);
  
          // Update the formState with the new track
          setFormState((prevState: any) => {
            const updatedState = {
              ...prevState,
              audioFiles: [...prevState.audioFiles, updatedTrack],
            };
            console.log('Updated FormState:', updatedState); // Log the updated formState
            return updatedState;
          });
          
          // Show success alert
          setAlert({ type: "success", message: "Track uploaded successfully!" });
        };
      } else {
        setAlert({ type: "error", message: "Failed to retrieve upload URL." });
      }
    } catch (error) {
      console.error("Upload failed:", error); // Logs the error in case of failure
      setAlert({ type: "error", message: "Error uploading file. Please try again." });
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

  const handleEditTrack = (track: any, index: number) => {
    if (uploadType === 'Single') {
      toast.error('Editing metadata is not available for single track uploads.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
  
    setCurrentTrack(index);
    setTrackMetadata({
      trackName: track.trackName,
      featuredArtist: track.featuredArtist || '',
      producer: track.producer || '',
      lyrics: track.lyrics || '',
      audioFile: track.audioFile || '',
    });
    setIsEditModalOpen(true);
  };
  

  const removeTrack = (index: number) => {
    const updatedTracks = audioFiles.filter((_: any, i: number) => i !== index);
    setFormState({ ...formState, audioFiles: updatedTracks });
  };

  const handleSaveMetadata = () => {
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

  const handleAudioFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      
      if (audioFiles.length > 0) {
        toast.error('Only one track is allowed for a single upload.', {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }
  
      const track = {
        file: selectedFile,
        trackName: selectedFile.name.replace(/\.[^/.]+$/, ''),
        featuredArtist: '',
        producer: '',
        lyrics: '',
        duration: '0:00',
      };
  
      handleUpload(track);
    }
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
            name="audio_file"
            className="hidden"
            multiple={uploadType === 'Album/EP'}
            accept=".mp3,.wav"
            onChange={uploadType === 'Single' ? handleAudioFileChange : handleFileChange}
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
        contentLabel="Edit Track Metadata"
        className="w-1/2 mx-auto p-8 bg-white rounded-lg shadow-lg"
      >
        <h3 className="text-xl font-semibold mb-4">Edit Track Metadata</h3>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Track Name"
            value={trackMetadata.trackName}
            onChange={(e) => setTrackMetadata({ ...trackMetadata, trackName: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Featured Artist"
            value={trackMetadata.featuredArtist}
            onChange={(e) =>
              setTrackMetadata({ ...trackMetadata, featuredArtist: e.target.value })
            }
          />
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Producer"
            value={trackMetadata.producer}
            onChange={(e) => setTrackMetadata({ ...trackMetadata, producer: e.target.value })}
          />
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Lyrics"
            value={trackMetadata.lyrics}
            onChange={(e) => setTrackMetadata({ ...trackMetadata, lyrics: e.target.value })}
          />
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="px-6 py-2 text-gray-600 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveMetadata}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Save
          </button>
        </div>
      </Modal>
                      {/* Display Alert */}
                      {alert && <AlertPopup type={alert.type} message={alert.message} />}
    </div>
  );
};

export default AddMusicStep;
