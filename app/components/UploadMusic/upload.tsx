import React, { useState } from "react";
import { motion } from "framer-motion";
import DetailsStep from "./steps/Details";
import AddMusicStep from "./steps/AddMusic";
import ReleaseStep from "./steps/Release";
import PlatformStep from "./steps/Platform";
import MetadataStep from "./steps/Metadata";

const UploadMusic = ({ uploadType }: { uploadType: "Single" | "Album/EP" }) => {
  const [step, setStep] = useState(1);

  const [formState, setFormState] = useState({
    trackTitle: "",
    primaryArtist: "",
    hasFeaturedArtist: false,
    featuredArtists: "",
    producers: "",
    explicitContent: "",
    audioFiles: [] as File[],  
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
    trackMetadata: [{ name: "", lyrics: "", credits: "" }]
  });

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
            className={`flex-1 flex flex-col items-center ${
              index + 1 <= step ? "text-red-500" : "text-gray-500"
            }`}
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

      {step === 1 && <DetailsStep uploadType={uploadType} formState={formState} setFormState={setFormState} />}
      {step === 2 && <AddMusicStep uploadType={uploadType} formState={formState} setFormState={setFormState} />}
      {step === 3 && <ReleaseStep uploadType={uploadType} formState={formState} setFormState={setFormState} />}
      {step === 4 && <PlatformStep formState={formState} setFormState={setFormState} />}
      {step === 5 && <MetadataStep formState={formState} setFormState={setFormState} />}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          {step === stepTitles.length ? "Submit" : "Next Step"}
        </button>
      </div>
    </motion.div>
  );
};
export default UploadMusic;
