import React from "react";

const SuccessModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">Upload Successful!</h2>
        <p>Your music has been uploaded successfully.</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
