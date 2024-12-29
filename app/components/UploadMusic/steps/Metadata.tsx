import TermsAndConditionsModal from '../../../components/Auth/terms';

const MetadataStep = ({ 
  formState, 
  setFormState, 
  uploadType 
}: { 
  formState: any; 
  setFormState: any; 
  uploadType: "Single" | "Album/EP" 
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6 text-gray-600">Additional Information</h2>
      
      {/* Existing fields */}
      {uploadType === "Single" && (
        <div className="mb-4">
          <label className="block text-sm text-gray-600">Lyrics</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-red-500 resize-none"
            placeholder="Enter Lyrics"
            value={formState.lyrics}
            onChange={(e) => setFormState({ ...formState, lyrics: e.target.value })}
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm text-gray-600">UPC Code (Optional)</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-red-500"
          placeholder="Enter UPC Code"
          value={formState.upcCode}
          onChange={(e) => setFormState({ ...formState, upcCode: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600">ISRC Code (Optional)</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-red-500"
          placeholder="Enter ISRC Code"
          value={formState.isrcCode}
          onChange={(e) => setFormState({ ...formState, isrcCode: e.target.value })}
        />
      </div>

      {/* Add Terms Checkbox */}
      <div className="flex items-start mt-6">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            checked={formState.termsAccepted || false}
            onChange={(e) => setFormState({
              ...formState,
              termsAccepted: e.target.checked
            })}
            className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
          />
        </div>
        <div className="ml-3">
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the <TermsAndConditionsModal /> of SongDis distribution service.
            By checking this box, I confirm that I have read and understood the terms.
          </label>
        </div>
      </div>
    </div>
  );
};

export default MetadataStep;