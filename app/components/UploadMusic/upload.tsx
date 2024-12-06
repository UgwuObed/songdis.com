import React, { useState } from "react";
import { motion } from "framer-motion";
import DetailsStep from "./steps/Details";
import AddMusicStep from "./steps/AddMusic";
import ReleaseStep from "./steps/Release";
import PlatformStep from "./steps/Platform";
import MetadataStep from "./steps/Metadata";
import { BASE_URL } from "../apiConfig";
// import router, { useRouter } from "next/router"; 
import { useRouter } from 'next/navigation'; 
import SuccessModal from "./success";
import axios from "axios";

const UploadMusic = ({ uploadType }: { uploadType: "Single" | "Album/EP" }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState<boolean>(false);
  

  const [formState, setFormState] = useState({
    trackTitle: "",
    primaryArtist: "",
    hasFeaturedArtist: false,
    featuredArtists: "",
    producers: "",
    explicitContent: "",
    audioFiles: [],
    releaseTitle: "",
    primaryGenre: "",
    secondaryGenre: "",
    releaseDate: "",
    preorderDate: "",
    albumArt: null as File | null,
    albumArtPreview: "",
    platforms: [] as string[],
    lyrics: "",
    upcCode: "",
    mood: "",
    trackMetadata: [{ name: "", lyrics: "", credits: "", producers: "", featured_artists: "" }],
  });

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("track_title", formState.trackTitle);
    formData.append("primary_artist", formState.primaryArtist);
    if (uploadType === 'Album/EP') {
      formState.audioFiles.forEach((track: any, index: number) => {
        formData.append(`tracks[${index}][track_title]`, track.trackName);
        formData.append(`tracks[${index}][audio_file_path]`, track.audioFileUrl);
        formData.append(`tracks[${index}][featured_artists]`, track.featuredArtist || '');
        formData.append(`tracks[${index}][producers]`, track.producer || '');
        formData.append(`tracks[${index}][lyrics]`, track.lyrics || '');
      });
    } else if (uploadType === 'Single') {
      formData.append('track_title', formState.trackTitle);

      if (formState.audioFiles.length > 0 && typeof formState.audioFiles[0] === 'object' && 'audioFileUrl' in formState.audioFiles[0]) {
        formData.append('audio_file_path[]', (formState.audioFiles[0] as { audioFileUrl: string }).audioFileUrl);
      }
    }
    formData.append("release_title", formState.releaseTitle || "");
    formData.append("primary_genre", formState.primaryGenre);
    formData.append("secondary_genre", formState.secondaryGenre);
    formData.append("explicit_content", formState.explicitContent);
    formState.platforms.forEach((platform: string) => {
      formData.append("platforms[]", platform); 
    });
    formData.append("upload_type", uploadType);
    formData.append("release_date", formState.releaseDate);
    formData.append("pre_order_date", formState.preorderDate || "");
    formData.append("featured_artists", formState.featuredArtists);
    formData.append("producers", formState.producers);
    formData.append("lyrics", formState.lyrics);
    formData.append("upc_code", formState.upcCode || "");
    formData.append("genres_moods", formState.mood);
    if (formState.albumArt) {
      formData.append("album_art_url", formState.albumArt);
    } 

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/api/upload-music`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      setIsSuccessModalVisible(true);
    } catch (error: any) {
      console.error("Error uploading music:", error);
      const backendErrors = error.response?.data?.errors;

      if (backendErrors) {
        const errorMessages = Object.entries(backendErrors)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(", ") : String(messages)}`)
          .join("\n");

        setError(errorMessages);
      } else {
        setError(error.response?.data?.message || "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalVisible(false);
    router.push("/dashboard"); 
  };
  
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));

  const stepTitles = ["Details", "Add Music", "Release", "Platform", "Metadata"];

  return (
    <motion.div
      className="bg-white text-black p-8 rounded-lg max-w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-xl font-bold mb-6 flex justify-center">
        Upload {uploadType === "Single" ? "Single Track" : "Album/EP"}
      </h2>

      {/* Stepper */}
      <div className="flex justify-between items-center mb-8">
        {stepTitles.map((title, index) => (
          <div
            key={index}
            className={`flex-1 flex flex-col items-center ${index + 1 <= step ? "text-red-500" : "text-gray-500"}`}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center border-2 rounded-full ${
                index + 1 <= step ? "border-red-500" : "border-gray-500"
              }`}
            >
              {index + 1}
            </div>
            <span className="text-sm mt-2">{title}</span>
          </div>
        ))}
      </div>

      {/* Step Components */}
      {step === 1 && <DetailsStep uploadType={uploadType} formState={formState} setFormState={setFormState} />}
      {step === 2 && <AddMusicStep uploadType={uploadType} formState={formState} setFormState={setFormState} />}
      {step === 3 && <ReleaseStep uploadType={uploadType} formState={formState} setFormState={setFormState} />}
      {step === 4 && <PlatformStep formState={formState} setFormState={setFormState} />}
      {step === 5 && <MetadataStep uploadType={uploadType} formState={formState} setFormState={setFormState} />}

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        {step === stepTitles.length ? (
          <button
            onClick={submitForm}
            disabled={isLoading}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
          >
            {isLoading ? "Uploading..." : "Submit"}
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Next Step
          </button>
        )}
          {/* Success Modal */}
      <SuccessModal isVisible={isSuccessModalVisible} onClose={closeSuccessModal} />
      </div>
      
    </motion.div>
  );
};
export default UploadMusic;
