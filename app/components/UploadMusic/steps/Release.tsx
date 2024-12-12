import React from 'react';

const ReleaseStep = ({ uploadType, formState, setFormState }: any) => {
  return (
    <div className={`space-y-6 md:space-y-8 w-full max-w-4xl mx-auto p-4 ${
      uploadType === "Single" ? "items-start" : ""
    }`}>
      {/* Genre Selection Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Primary Genre
          </label>
          <div className="relative">
            <select
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 
                         text-gray-700 text-sm transition-colors duration-200
                         hover:border-gray-400 focus:border-red-500 focus:ring-2 
                         focus:ring-red-500 focus:ring-opacity-30 focus:outline-none
                         appearance-none"
              value={formState.primaryGenre}
              onChange={(e) => setFormState({ ...formState, primaryGenre: e.target.value })}
            >
              <option value="">Select Primary Genre</option>
              <option value="Afrobeats">Afrobeats</option>
              <option value="Reggae">Reggae</option>
              <option value="Dancehall">Dancehall</option>
              <option value="Pop">Pop</option>
              <option value="Rap">Rap</option>
              <option value="R&B">R&B</option>
              <option value="Electronic">Electronic</option>
              <option value="Soul">Soul</option>
              <option value="Jazz">Jazz</option>
              <option value="Rock">Rock</option>
              <option value="Classical">Classical</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Secondary Genre
          </label>
          <div className="relative">
            <select
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 
                         text-gray-700 text-sm transition-colors duration-200
                         hover:border-gray-400 focus:border-red-500 focus:ring-2 
                         focus:ring-red-500 focus:ring-opacity-30 focus:outline-none
                         appearance-none"
              value={formState.secondaryGenre}
              onChange={(e) => setFormState({ ...formState, secondaryGenre: e.target.value })}
            >
              <option value="">Select Secondary Genre</option>
              <option value="Afrobeats">Afrobeats</option>
              <option value="Reggae">Reggae</option>
              <option value="Dancehall">Dancehall</option>
              <option value="Pop">Pop</option>
              <option value="Rap">Rap</option>
              <option value="R&B">R&B</option>
              <option value="Electronic">Electronic</option>
              <option value="Soul">Soul</option>
              <option value="Jazz">Jazz</option>
              <option value="Rock">Rock</option>
              <option value="Classical">Classical</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Date Selection Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Release Date
          </label>
          <input
            type="date"
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 
                       text-gray-700 text-sm transition-colors duration-200
                       hover:border-gray-400 focus:border-red-500 focus:ring-2 
                       focus:ring-red-500 focus:ring-opacity-30 focus:outline-none"
            value={formState.releaseDate}
            onChange={(e) => setFormState({ ...formState, releaseDate: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Pre-Order Date
          </label>
          <input
            type="date"
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 
                       text-gray-700 text-sm transition-colors duration-200
                       hover:border-gray-400 focus:border-red-500 focus:ring-2 
                       focus:ring-red-500 focus:ring-opacity-30 focus:outline-none"
            value={formState.preorderDate}
            onChange={(e) => setFormState({ ...formState, preorderDate: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default ReleaseStep;