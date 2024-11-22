import React from 'react';

type UploadTypeSelectionProps = {
  onSelect: (uploadType: 'Single' | 'Album/EP') => void;
};

const UploadTypeSelection: React.FC<UploadTypeSelectionProps> = ({ onSelect }) => {
  const [selectedType, setSelectedType] = React.useState<'Single' | 'Album/EP' | null>(null);

  return (
    <div className="flex flex-col items-center bg-white text-gray-800 p-10 rounded-lg space-y-6 shadow-md">
      <h2 className="text-3xl font-bold mb-4">Select Upload Type</h2>

      <div className="grid grid-cols-2 gap-8">
        {/* Song */}
        <div
          className={`flex flex-col items-center p-6 rounded-lg cursor-pointer transition-transform transform ${
            selectedType === 'Single' ? 'bg-red-100 border-2 border-red-500 scale-105' : 'bg-gray-100 border border-gray-300 hover:scale-105'
          }`}
          onClick={() => setSelectedType('Single')}
        >
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-8 h-8 text-white"
              viewBox="0 0 24 24"
            >
              <path d="M12 3L1 9l11 6 11-6L12 3zm0 7.5L4.5 9 12 13.5 19.5 9 12 10.5zm0 3L4.5 12 12 16.5 19.5 12 12 13.5z" />
            </svg>
          </div>
          <p className="text-lg font-semibold">Single</p>
        </div>

        {/* Album/EP */}
        <div
          className={`flex flex-col items-center p-6 rounded-lg cursor-pointer transition-transform transform ${
            selectedType === 'Album/EP' ? 'bg-yellow-100 border-2 border-yellow-500 scale-105' : 'bg-gray-100 border border-gray-300 hover:scale-105'
          }`}
          onClick={() => setSelectedType('Album/EP')}
        >
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-8 h-8 text-white"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16v16H4z" />
            </svg>
          </div>
          <p className="text-lg font-semibold">Album / EP</p>
        </div>
      </div>

      <button
        onClick={() => selectedType && onSelect(selectedType)}
        className={`mt-6 px-8 py-3 text-lg font-bold rounded-lg transition ${
          selectedType
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-gray-500 text-gray-300 cursor-not-allowed'
        }`}
        disabled={!selectedType}
      >
        Next
      </button>

      <div className="mt-4 text-sm text-gray-500">
        <p>Supported file types: MP3, WAV, FLAC, M4A, OGG</p>
        <p>Max file size: 250MB</p>
      </div>
    </div>
  );
};

export default UploadTypeSelection;
