const MetadataStep = ({ formState, setFormState }: any) => {
    return (
      <div>
        <h2 className="text-lg font-semibold mb-6 text-gray-600">Additional Information</h2>
        <div className="mb-4">
          <label className="block text-sm text-gray-600">Lyrics</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-red-500 resize-none"
            placeholder="Enter Lyrics"
            value={formState.lyrics}
            onChange={(e) => setFormState({ ...formState, lyrics: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600">UPC Code</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-red-500"
            placeholder="Enter UPC Code"
            value={formState.upcCode}
            onChange={(e) => setFormState({ ...formState, upcCode: e.target.value })}
          />
        </div>
      </div>
    );
  };
  
  export default MetadataStep;
  