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
            <option value="Afrobeat">Afrobeat</option>
            <option value="Afropop">Afropop</option>
            <option value="Alternative">Alternative</option>
            <option value="Big Band">Big Band</option>
            <option value="Blues">Blues</option>
            <option value="Children's Music">Children's Music</option>
            <option value="Christian/Gospel">Christian/Gospel</option>
            <option value="Classical">Classical</option>
            <option value="Comedy">Comedy</option>
            <option value="Country">Country</option>
            <option value="Dance">Dance</option>
            <option value="Electronic">Electronic</option>
            <option value="Fitness & Workout">Fitness & Workout</option>
            <option value="Folk">Folk</option>
            <option value="French Pop">French Pop</option>
            <option value="German Folk">German Folk</option>
            <option value="German Pop">German Pop</option>
            <option value="Hip Hop/Rap">Hip Hop/Rap</option>
            <option value="Holiday">Holiday</option>
            <option value="J-Pop">J-Pop</option>
            <option value="Jazz">Jazz</option>
            <option value="K-Pop">K-Pop</option>
            <option value="Latin">Latin</option>
            <option value="Latin Urban">Latin Urban</option>
            <option value="Metal">Metal</option>
            <option value="New Age">New Age</option>
            <option value="Pop">Pop</option>
            <option value="Punk">Punk</option>
            <option value="R&B/Soul">R&B/Soul</option>
            <option value="Reggae">Reggae</option>
            <option value="Rock">Rock</option>
            <option value="Singer/Songwriter">Singer/Songwriter</option>
            <option value="Soundtrack">Soundtrack</option>
            <option value="Spoken Word">Spoken Word</option>
            <option value="Vocal">Vocal</option>
            <option value="World">World</option>
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
        <option value="Afrofusion">Afrofusion</option>
        <option value="Amapiano">Amapiano</option>
        <option value="Highlife">Highlife</option>
        <option value="Soukous">Soukous</option>
        <option value="Mbalax">Mbalax</option>
        <option value="Kwaito">Kwaito</option>
        <option value="Gnawa">Gnawa</option>
        <option value="Taarab">Taarab</option>
        <option value="Hip-Hop/Rap">Hip-Hop/Rap</option>
        <option value="R&B">R&B</option>
        <option value="Electronic">Electronic</option>
        <option value="Pop">Pop</option>
        <option value="Afrobeats">Afrobeats</option>
        <option value="Latin">Latin</option>
        <option value="Reggae">Reggae</option>
        <option value="Dancehall">Dancehall</option>
        <option value="Country">Country</option>
        <option value="Rock">Rock</option>
        <option value="Jazz">Jazz</option>
        <option value="Classical">Classical</option>
        <option value="World">World</option>
        <option value="Podcast">Podcast</option>
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
            Pre-Order Date(Optional)
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